"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Clock,
  Eye,
  Loader,
  MessageCircle,
  Heart,
  Share,
  Bookmark,
  MoreHorizontal,
  X,
} from "lucide-react";
import Link from "next/link";
import axios from "axios";
import { Button } from "../ui/button";
import Swal from "sweetalert2";

interface User {
  id: string;
  fullName: string | null;
  email: string;
}

interface Space {
  id: string;
  name: string;
  slug: string;
  isPrivate: boolean;
}

interface Comment {
  id: string;
  content: string;
  createdAt: string;
  user: User;
}

interface Like {
  id: string;
  userId: string;
  user: {
    id: string;
    fullName: string | null ;
  };
}


  
interface Post {
  id: string;
  title: string;
  content: string;
  coverImage: string | null;
  createdAt: string;
  updatedAt: string;
  readTime: number;
  views: number;
  tags: string[];
  category: string;
  isCommentsEnabled: boolean;
  author: User;
  space: Space;
  comments: Comment[];
  likes: Like[];
  attachments: any[];
}

interface ViewCommunityPostProps {
  post: Post;
  userId: string | undefined;
}

const ViewCommunityPost: React.FC<ViewCommunityPostProps> = ({ post, userId }) => {
  const router = useRouter();
  let isPostAlreadyLiked = post.likes.some((like) => like.userId === userId);
  let isPostAlreadySaved = post.likes.some((like) => like.userId === userId);
  const [isLiked, setIsLiked] = useState(isPostAlreadyLiked);
  const [isSaved, setIsSaved] = useState(isPostAlreadySaved);
  const [showComments, setShowComments] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isModalOpenForReport, setIsModalOpenForReport] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [reportDetails, setReportDetails] = useState("");

  const handleLike = async () => {
    setIsLiked(!isLiked);
    try {
        const response = await axios.post("/api/community/post/like-dislike", {
            postId: post.id,
        });
        if (response.status === 201) {
            setIsLiked(!isLiked);
        }
    } catch (error) {
        console.log(error);
        setIsLiked(isLiked);
    }
  };

  const handleAddComments = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setLoading(true);
    try {
      const response = await axios.post("/api/community/post/comments", {
        postId: post.id,
        content: newComment,
      });
      if (response.status === 201) {
        setNewComment("");
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleReport = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("/api/community/post/report", {
        postId: post.id,
        reason: reportReason,
        details: reportDetails,
      });
      if (response.status === 201) {
        Swal.fire({
          title: "Reported!",
          text: "Your report has been submitted successfully.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          setIsModalOpenForReport(false);
          setReportReason("");
          setReportDetails("");
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleShare = () => {
    window.navigator.clipboard.writeText(window.location.href);
    Swal.fire({
      title: "Link Copied!",
      text: "The post link has been copied to your clipboard.",
      icon: "success",
      confirmButtonText: "OK",
    });
  };

  const handleSavePost = async () => {
    setIsSaved(!isSaved);
    setLoading(true);
    try {
      const response = await axios.post("/api/community/post/save", {
        postId: post.id,
      });
      if (response.status === 201) {
        Swal.fire({
          title: isSaved ? "Unsaved!" : "Saved!",
          text: isSaved ? "The post has been unsaved." : "The post has been saved.",
          icon: "success",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.back()}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <div>
                <button
                  onClick={() => router.push(`/community/${post.space.slug}`)}
                  className="text-orange-600 hover:text-orange-700 font-medium text-sm"
                >
                  {post.space.name}
                </button>
                <p className="text-xs text-gray-500">Community</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white rounded-xl border shadow-sm">
            <div className="p-8 pb-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center shadow-sm">
                    <span className="text-orange-700 font-bold text-lg">
                      {post.author.fullName!.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h2 className="font-semibold text-gray-900">
                      {post.author.fullName}
                    </h2>
                    <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                      <span>{formatDate(post.createdAt)}</span>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{post.readTime} min read</span>
                      </div>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        <span>{post.views} views</span>
                      </div>
                    </div>
                  </div>
                </div>
                {post.author.id === userId && (
                                    <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                  <MoreHorizontal
                    className="h-5 w-5"
                    onClick={() => setIsModalOpen(!isModalOpen)}
                  />
                  {isModalOpen && (
                    <div className="absolute  mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10 flex flex-col">
                      <Link
                        href={`/edit/${post.id}`}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Edit Post
                      </Link>
                      <Link
                        href={`/delete/${post.id}`}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Delete Post
                      </Link>
                      <span
                        onClick={() => setIsModalOpenForReport(true)}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                      >
                        Report Post
                      </span>
                    </div>
                  )}
                </button>
                )}
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
                {post.title}
              </h1>

              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-orange-50 text-orange-700 text-sm rounded-full border border-orange-200 font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {post.coverImage && (
              <div className="px-8 mb-8">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full rounded-lg object-cover max-h-96 shadow-sm"
                />
              </div>
            )}

            <div className="px-8 pb-8">
              <div className="prose prose-lg max-w-none">
                <div className="whitespace-pre-line text-gray-700 leading-relaxed text-lg">
                  {post.content}
                </div>
              </div>

              {post.attachments && post.attachments.length > 0 && (
                <div className="mt-8">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    Attachments
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {post.attachments.map((attachment, index) => (
                      <div
                        key={index}
                        className="border rounded-lg overflow-hidden"
                      >
                          <img
                            src={attachment.url === "" ? "/final_logo.png" : attachment.url}
                            alt={`Attachment ${index + 1}`}
                            className="w-full h-32 object-cover"
                          />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="px-8 py-6 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <Button variant={"outline"}
                    onClick={handleLike}
                    disabled={!userId}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      isLiked
                        ? "bg-orange-50 text-orange-600 border border-orange-200"
                        : "text-gray-600 hover:bg-gray-50 border border-gray-200"
                    }`}
                  >
                    <Heart
                      className={`h-5 w-5 ${isLiked ? "fill-current" : ""}`}
                    />
                    <span className="font-medium">
                      {post.likes.length + (isLiked && !isPostAlreadyLiked ? 1 : 0) - (!isLiked && isPostAlreadyLiked ? 1 : 0)}
                    </span>
                  </Button>

                  {post.isCommentsEnabled  ? (
                  <Button variant={"outline"}
                    onClick={() => setShowComments(!showComments)}
                    className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-50 border border-gray-200 rounded-lg transition-colors"
                  >
                    <MessageCircle className="h-5 w-5" />
                    <span className="font-medium">{post.comments.length}</span>
                  </Button>
                  ) : (
                    <Button variant={"outline"}
                    disabled
                    className="flex items-center gap-2 px-4 py-2 text-gray-400 bg-gray-100 border border-gray-200 rounded-lg transition-colors cursor-not-allowed"
                  >                    <MessageCircle className="h-5 w-5" />
                    <span className="font-medium">Comments Disabled</span>
                  </Button>
                  )}

                  <Button onClick={handleShare}
                  variant="outline" className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-50 border border-gray-200 rounded-lg transition-colors">
                    <Share className="h-5 w-5" />
                    <span className="font-medium">Share</span>
                  </Button>
                </div>

                <Button variant={"outline"} onClick={handleSavePost} disabled={loading || !userId}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-50 border border-gray-200 rounded-lg transition-colors">
                  <Bookmark className={`h-5 w-5 ${isSaved ? "fill-current text-primary" : ""}`} />
                 {loading ? (
                   <Loader className="h-5 w-5 animate-spin" />
                 ) : (
                     <span className="font-medium">{isSaved ? "Saved" : "Save"}</span>
                 )}
                </Button>
              </div>
            </div>

            {showComments && post.isCommentsEnabled && (
              <div className="border-t border-gray-100">
                <div className="p-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">
                    Comments ({post.comments.length})
                  </h3>

                  {post.isCommentsEnabled && (
                    <form onSubmit={handleAddComments} className="mb-8">
                      <div className="flex gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                            <span className="text-gray-600 text-sm font-medium">
                              Y
                            </span>
                          </div>
                        </div>
                        <div className="flex-1">
                          <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder={userId ? "Add a comment..." : "Login to add a comment"}
                            rows={3}
                            disabled={!userId || loading}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-vertical"
                          />
                          <div className="flex justify-end mt-2">
                            <Button
                              type="submit"
                              disabled={!newComment || loading || !userId}
                            >
                              {loading ? (
                                <Loader className="h-5 w-5 animate-spin" />
                              ) : (
                                <span>
                                    {userId ? "Post Comment" : "Login to Comment"}
                                </span>
                              )}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </form>
                  )}

                  <div className="space-y-6">
                    {post.comments.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        <MessageCircle className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                        <p>No comments yet. Be the first to comment!</p>
                      </div>
                    ) : (
                      post.comments.map((comment) => (
                        <div key={comment.id} className="flex gap-4">
                          <div className="flex-shrink-0">
                            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                              <span className="text-gray-600 text-sm font-medium">
                                {comment.user.fullName!.charAt(0)}
                              </span>
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="bg-gray-50 rounded-lg p-4">
                              <div className="flex items-center gap-2 mb-2">
                                <h4 className="font-semibold text-gray-900 text-sm">
                                  {comment.user.fullName}
                                </h4>
                                <span className="text-xs text-gray-500">
                                  {formatDate(comment.createdAt)}
                                </span>
                              </div>
                              <p className="text-gray-700 text-sm">
                                {comment.content}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Report Modal */}
      {isModalOpenForReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
          <div className="bg-white rounded-lg shadow-lg w-96 p-6">
            <div className="flex items-center justify-between ">
                <h2 className="text-xl font-semibold mb-4">Report Post</h2>
                <span>
                    <X className="h-5 w-5 text-gray-400 hover:text-gray-600 cursor-pointer" onClick={() => setIsModalOpenForReport(false)} />
                </span>
            </div>
            <form onSubmit={handleReport} className="space-y-4">
              <div>
                <label
                  htmlFor="reason"
                  className="block text-sm font-medium text-gray-700"
                >
                  Reason
                </label>
                <select
                  id="reason"
                    name="reason"
                    value={reportReason}
                    onChange={(e) => setReportReason(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
                  required
                >
                  <option value="" disabled>Select a reason</option>
                  <option value="Spam">Spam</option>
                  <option value="Inappropriate content">Inappropriate content</option>
                  <option value="Harassment">Harassment</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="details"
                  className="block text-sm font-medium text-gray-700 pb-1"
                >
                  Details
                </label>
                <textarea
                  id="details"
                  name="details"
                    value={reportDetails}
                  onChange={(e) => setReportDetails(e.target.value)}
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent resize-vertical"
                />
              </div>
              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={!reportReason || loading}
                >
                  {loading ? (
                    <Loader className="h-5 w-5 animate-spin" />
                  ) : (
                    "Submit Report"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewCommunityPost;
