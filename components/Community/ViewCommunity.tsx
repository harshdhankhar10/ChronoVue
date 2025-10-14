"use client";
import React, { useEffect, useState } from "react";
import {
  Users,
  Calendar,
  Shield,
  BookOpen,
  Settings,
  Lock,
  Globe,
  Copy,
  CopyCheck,
  Plus,
  Eye,
  MessageCircle,
  ThumbsUp,
  Clock,
  Loader,
  Check,
  EllipsisVerticalIcon,
  X,
  CheckCheck
} from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import axios from "axios";
import Swal from "sweetalert2";


interface User {
  id: string;
  fullName: string | null;
  email: string;
}

interface CommunityMember {
  id: string;
  role: string;
  joinedAt: string;
  user: User;
  isApproved: Boolean;
}

interface Community {
  id: string;
  name: string;
  slug: string;
  description: string;
  coverImage: string | null;
  isPrivate: boolean;
  isVerified: boolean;
  category: string;
  rules: string[];
  owner: User;
  joinCode: string;
  memberCount: number;
  createdAt: string;
  recentActivities: { id: string; type: string; createdAt: string }[];
  members: CommunityMember[];
}

interface Post {
  id: string;
  title: string;
  slug: string;
  createdAt: Date;
  author: User;
  likes: any[]
  views: number;
  comments: any[];
  readTime: number;
  isCommentsEnabled: boolean;
  category: string;
  content: string;

}

interface ViewCommunityProps {
  community: Community;
  userId: string | undefined;
  posts: Post[];
}

const ViewCommunity: React.FC<ViewCommunityProps> = ({ community, userId, posts }) => {
  const [isMember, setIsMember] = useState(false);
  const [activeTab, setActiveTab] = useState("posts");
  const [isCopied, setIsCopied] = useState(false);
  const [isModalOpenForCommunityVerification, setIsModalOpenForCommunityVerification] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [isModalOpenForMembersInfo, setIsModalOpenForMembersInfo] = useState(false);
  const [selectedMemberInfoID, setSelectedMemberInfoID] = useState<string | null>(null);

  const handleJoinCommunity = async() => {
    setLoading(true);
    try {
      const response = await axios.post('/api/community/join-public', {
        communityId: community.id
      });
      if (response.status === 201) {
        Swal.fire({
          icon: 'success',
          title: 'Joined Community',
          text: 'You have successfully joined the community!',
        }).then(() => {
          router.refresh();
        });
      }
    } catch (error:any) {
      Swal.fire({
        icon: 'error',
        title: 'Error Joining Community',
        text: error.response?.data?.error || 'There was an error joining the community. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };
  const router = useRouter();
  const tabs = [
    { id: "posts", label: "Recent Posts" },
    { id: "members", label: "Members" },
    { id: "overview", label: "Community Overview" },
  ];

  const handleCopyJoinCode = () => {
    navigator.clipboard.writeText(community.joinCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };


  let isMemberOfCommunity = community.members.some(
    (member) => member.user.id === userId
  );

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-GB');
  }


  const handleSendOTPForCommunityVerification = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/api/community/verify', {
        communityId: community.id,
        email: community.owner.email
      });

      if (response.status === 201) {
        setLoading(false);
        setIsModalOpenForCommunityVerification(true);
      }

    } catch (error) {
      setLoading(false);
      console.error("Error sending OTP:", error);
    } finally {
      setLoading(false);
    }
  }

  const handleVerifyCommunity = async () => {
    setLoading(true);
    if (otp.length < 6) {
      alert("Please enter a valid 6-digit OTP.");
      return;
    }
    try {
      const response = await axios.patch('/api/community/verify', {
        communityId: community.id,
        otp
      });
      if (response.status === 201) {
        Swal.fire({
          icon: 'success',
          title: 'Community Verified',
          text: 'Your community has been verified successfully!',
        }).then(() => {
          router.refresh();
          setIsModalOpenForCommunityVerification(false);
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Verification Failed',
        text: 'There was an error verifying your community. Please try again.',
      });
    } finally {
      setOtp("");
      setLoading(false);
    }
  }

  const handleRemoveUserFromCommunity = async (communityId: string, memberId: string) => {
    setLoading(true);
    try {
      const response = await axios.post('/api/community/admin/remove-user', {
        communityId,
        memberId
      });

      if (response.status === 201) {
        Swal.fire({
          icon: 'success',
          title: 'Member Removed',
          text: response.data.message,
        }).then(() => {
          router.refresh();
          setIsModalOpenForMembersInfo(false);
        });
      }
    } catch (error: any) {
      Swal.fire({
        icon: 'error',
        title: 'Error Removing Member',
        text: error.response?.data?.error || 'There was an error removing the member. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleApproveMembership = async (memberId: string, isApproved: boolean) => {
    setLoading(true);
    try {
      const response = await axios.patch('/api/community/admin/approve-joining', {
        communityId: community.id,
        memberId,
        isApproved
      });

      if (response.status === 201) {
        Swal.fire({
          icon: 'success',
          title: 'Membership Updated',
          text: `Member has been ${isApproved ? 'approved' : 'denied'}.`,
        }).then(() => {
          router.refresh();
          setIsModalOpenForMembersInfo(false);
        });
      }
    } catch (error: any) {
      Swal.fire({
        icon: 'error',
        title: 'Error Updating Membership',
        text: error.response?.data?.error || 'There was an error updating the membership. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  }
  
  const handleLeaveCommunity = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/api/community/leave-community', {
        communityId: community.id
      });
      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Left Community',
          text: response.data.message,
        }).then(() => {
          router.push('/community');
        });
      }
    } catch (error: any) {
      Swal.fire({
        icon: 'error',
        title: 'Error Leaving Community',
        text: error.response?.data?.error || 'There was an error leaving the community. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b">
          <div className="px-4 py-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900">
                    {community.name}
                  </h1>
                  <span
                    className={`px-2 py-1 text-xs rounded ${community.isPrivate
                      ? "bg-orange-100 text-orange-800"
                      : "bg-green-100 text-green-800"
                      }`}
                  >
                    {community.isPrivate ? "Private" : "Public"}
                  </span>
                </div>

                <div className="flex items-center gap-6 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{community.memberCount} members</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>Created {community.createdAt}</span>
                  </div>
                  <div>
                    <span>By {community.owner.fullName}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                {!community.isVerified && userId === community.owner.id && (
                  <Button variant="destructive" onClick={handleSendOTPForCommunityVerification} disabled={loading || community.isVerified}>
                    {loading ? <Loader className="h-4 w-4 animate-spin" /> : "Verify Community"}
                  </Button>
                )}
                {isMemberOfCommunity ? (
                  <Button onClick={() => { router.push(`/community/posts/create?communityId=${community.id}`) }}
                    variant={"outline"}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Post
                  </Button>
                ) : (
                  <Button disabled={loading} 
                    onClick={handleJoinCommunity}
                  >
                    {loading ? <Loader className="h-4 w-4 animate-spin" /> : "Join Community"}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border-b">
          <div className=" px-4 flex items-center justify-between">
            <div className="flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === tab.id
                    ? "border-orange-600 text-orange-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            {activeTab === "posts" && (
              <div className="flex items-center justify-end">

                <div className="flex items-center gap-3">
                  <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500">
                    <option value="newest">Newest First</option>
                    <option value="popular">Most Popular</option>
                    <option value="commented">Most Commented</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className=" px- py-8">
          {activeTab === "posts" && (
            <div className="space-y-6">


              {posts.length === 0 ? (
                <div className="bg-white rounded-md border-2 border-dashed p-12 text-center">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No posts yet</h3>
                  <p className="text-gray-500 mb-6 max-w-md mx-auto">
                    This community hasn't started any discussions yet. Be the first to share your thoughts and get the conversation going.
                  </p>
                  <Button onClick={() => router.push(`/community/posts/create?communityId=${community.id}`)}>
                    Create First Post
                  </Button>
                </div>
              ) : (
                <div className="grid gap-6">
                  {posts.map((post) => (
                    <article
                      key={post.id}
                      className="bg-white rounded-xl border overflow-hidden"
                    >
                      <div className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center shadow-sm">
                              <span className="text-orange-700 font-bold text-lg">
                                {post.author.fullName!.charAt(0)}
                              </span>
                            </div>
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <Link href={`/community/posts/v/${post.slug}`}>
                                    <h3 className="font-semibold text-gray-900 text-lg leading-tight hover:text-primary cursor-pointer transition-colors">
                                      {post.title}
                                    </h3>
                                  </Link>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-gray-500">
                                  <span className="font-medium text-gray-700">{post.author.fullName}</span>
                                  <span>•</span>
                                  <span>{formatDate(new Date(post.createdAt))}</span>
                                  <span>•</span>
                                  <span><Clock className="h-4 w-4" /></span><span>{new Date(post.createdAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</span>
                                  <span>•</span>
                                  <span>{post.readTime} min read</span>
                                </div>
                              </div>

                              <span className="px-3 py-1 bg-gray-50 text-gray-700 text-sm rounded-full border font-medium capitalize">
                                {post.category}
                              </span>
                            </div>

                            <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3">
                              {post.content.substring(0, 250)}
                              {post.content.length > 250 && '...'}
                            </p>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-6 text-sm text-gray-500">
                                <div className="flex items-center gap-1.5">
                                  <ThumbsUp className="w-4 h-4" />
                                  <span>{post.likes.length} likes</span>
                                </div>
                                <div className="flex items-center gap-1.5">

                                  <Eye className="w-4 h-4" />
                                  <span>{post.views} views</span>
                                </div>

                                <div className="flex items-center gap-1.5">
                                  <MessageCircle className="w-4 h-4" />
                                  <span>{post.comments.length} comments</span>
                                </div>
                              </div>

                            </div>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "overview" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-lg border p-6">
                  <h2 className="text-xl font-semibold mb-4">
                    About this Community
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    {community.description}
                  </p>
                </div>

                <div className="bg-white rounded-lg border p-6 max-h-96 overflow-y-auto">
                  <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                    {community.recentActivities.length === 0 ? (
                      <div className="text-gray-500 text-center py-8">
                    No recent activity yet. Be the first to start a discussion!
                  </div>
                    ) : (
                      <div>
                        {community.recentActivities.map(activity => (
                          <div key={activity.id} className="border-b border-gray-200 py-4">
                            <p className="text-gray-800">{activity.type}</p>
                            <p className="text-gray-500 text-sm">{activity.createdAt}</p>
                          </div>
                        ))}
                      </div>
                    )}
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white rounded-lg border p-6">
                  <h3 className="font-semibold mb-4">Community Info</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Category</span>
                      <span className="font-medium capitalize">
                        {community.category}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Privacy</span>
                      <span className="font-medium flex items-center gap-1">
                        {community.isPrivate ? (
                          <>
                            <Lock className="h-4 w-4" />
                            Private
                          </>
                        ) : (
                          <>
                            <Globe className="h-4 w-4" />
                            Public
                          </>
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Members</span>
                      <span className="font-medium">{community.memberCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Created</span>
                      <span className="font-medium">
                        {community.createdAt}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">
                        Verified Status:{" "}
                      </span>
                      <span>
                        {community.isVerified ? (
                          <span className="text-green-600 font-medium flex items-center gap-1">
                            Verified
                          </span>
                        ) : (
                          <span className="text-red-600 font-medium flex items-center gap-1">
                            Not Verified
                          </span>
                        )}
                      </span>
                    </div>
                    {userId !== community.owner.id && isMemberOfCommunity && (
                    <Button variant={"destructive"}
                    onClick={handleLeaveCommunity} disabled={!isMemberOfCommunity || loading}>
                      {loading ? <Loader className="h-4 w-4 animate-spin" /> : "Leave Community"}
                    </Button>
                    )}
                  </div>
                </div>

                <div className="bg-white rounded-lg border p-6">
                  <h3 className="font-semibold mb-1">Join Code</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Share this code with others to invite them to the community.
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="font-mono bg-gray-100 px-3 py-2 rounded border flex-1">
                      {community.joinCode}
                    </span>
                    <button onClick={handleCopyJoinCode}>
                      {isCopied ? (
                        <CopyCheck className="h-5 w-5 text-primary" />
                      ) : (
                        <Copy className="h-5 w-5 text-gray-500 hover:text-primary" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-lg border p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <h3 className="font-semibold">Community Rules</h3>
                  </div>
                  <ul className="space-y-2">
                    {community.rules.map((rule, index) => (
                      <li
                        key={index}
                        className="text-sm text-gray-600 flex items-start gap-2"
                      >
                        <span className="text-orange-600 mt-1">•</span>
                        <span className="line-clamp-2">{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}


          {activeTab === "members" && (
            <div className="bg-white rounded-lg border p-6">
              <div className="flex items-center justify-between mb-6">

              <h2 className="text-xl font-semibold mb-6">
                Members ({community.memberCount})
            </h2>
              {userId === community.owner.id && (
              <div className="">
                <div className="flex items-center gap-6 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full">
                    </div>
                    <span className="text-sm text-gray-700 font-medium">
                      Approved Members: {community.members.filter(member => member.isApproved).length}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm text-gray-700 font-medium">
                      Pending Members: {community.members.filter(member => !member.isApproved).length}
                    </span>
                  </div>  
                </div>
              </div>
              )}
              </div>
              <div className="space-y-3">
                {community.members.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                        <span className="text-orange-600 font-semibold">
                          {member.user.fullName?.charAt(0).toUpperCase() || "U"}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">{member.user.fullName}</p>
                        <p className="text-sm text-gray-500">
                          {member.role.charAt(0).toUpperCase() +
                            member.role.slice(1).toLowerCase()}
                        </p>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500 flex items-center gap-4">
                      {userId === community.owner.id && (
                        <div>
                          {!member.isApproved && (
                            <div className="flex items-center gap-2">
                              <Button onClick={() => handleApproveMembership(member.user.id, true)} disabled={loading}>
                                {loading ? <Loader className="h-4 w-4 animate-spin" /> : "Approve"}
                              </Button>
                              <Button variant={"destructive"} className="ml-2" disabled={loading}
                                onClick={() => handleApproveMembership(member.user.id, false)}>
                                {loading ? <Loader className="h-4 w-4 animate-spin" /> : "Deny"}
                              </Button>
                            </div>
                          )}
                        </div>
                        
                      )}
                      {userId === community.owner.id && (
                        <div>
                          <span className="px-2 py-1 bg-gray-100 rounded-full text-xs font-medium">{member.user.email}</span>
                        </div>
                      )}
                      Joined {member.joinedAt}
                      {userId === community.owner.id && (
                        <button onClick={() => { setIsModalOpenForMembersInfo(true); setSelectedMemberInfoID(member.user.id); }}>
                          <EllipsisVerticalIcon className="h-5 w-5 text-gray-500 hover:text-gray-700 cursor-pointer" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>

      {isModalOpenForMembersInfo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-md p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Member Actions</h2>
            <p className="text-sm text-gray-500 mb-4">
              Select an action to perform on this member.
            </p>
            <div className="space-y-4">
              <Button variant="outline" className="w-full">
                View Stats
              </Button>
              <Button variant="outline" className="w-full">
                Promote to Admin
              </Button>
              <Button variant="destructive" className="w-full" disabled={loading}
                onClick={() => handleRemoveUserFromCommunity(community.id, selectedMemberInfoID!)}>
                {loading ? <Loader className="h-4 w-4 animate-spin" /> : "Remove from Community"}
              </Button>
            </div>
            <div className="flex justify-end mt-6">
              <Button variant="outline" onClick={() => setIsModalOpenForMembersInfo(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/*  Modal for Community Verification */}
      {isModalOpenForCommunityVerification && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Verify Your Community</h2>
            <p className="text-sm text-gray-500 mb-4 bg-yellow-50 p-3 rounded">
              We have sent a verification code to your registered email address.
            </p>
            <InputOTP maxLength={6} value={otp} onChange={setOtp} >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            <p className="text-sm text-gray-500 my-4">
              Didn't receive the code?{" "}
              <button className="text-orange-600 font-medium" onClick={handleSendOTPForCommunityVerification} disabled={loading || otp.length < 6}>
                Resend Code
              </button>
            </p>
            <div className="flex justify-end">
              <Button variant="outline" onClick={() => setIsModalOpenForCommunityVerification(false)}>
                Cancel
              </Button>
              <Button className="ml-2" onClick={handleVerifyCommunity} disabled={loading}>
                {loading ? <Loader className="h-4 w-4 animate-spin" /> : "Verify"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewCommunity;
