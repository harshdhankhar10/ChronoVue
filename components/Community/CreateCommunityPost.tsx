"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Image, Eye, EyeOff, Loader, Plus } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import Swal from 'sweetalert2';
import axios from 'axios';

interface CreatePostPageProps {
  spaceId: string;
  spaceName: string;
}

const categories = [
  'General',
  'Announcement',
  'Discussion',
  'Question',
  'Event',
  'Resource'
];

const coverImageTypes = [
  'None',
  'JPEG',
  'PNG', 
  'GIF',
  'WebP',
  'PDF',
  'Other'
];

export default function CreateCommunityPost({ spaceId, spaceName }: CreatePostPageProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('General');
  const [tags, setTags] = useState<string[]>([]);
  const [coverImageUrl, setCoverImageUrl] = useState('');
  const [coverImageType, setCoverImageType] = useState('None');
  const [isCommentsEnabled, setIsCommentsEnabled] = useState(true);
  const [status, setStatus] = useState<'DRAFT' | 'PUBLISHED'>('DRAFT');
  const [newTag, setNewTag] = useState('');

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log({
        title,
        content,
        category,
        tags,
        coverImage: coverImageUrl,
        coverImageType: coverImageType === 'None' ? '' : coverImageType,
        isCommentsEnabled,
        status,
        spaceId,
        readTime: Math.ceil(content.split(' ').length / 200)
      });

    } catch (error) {
      console.error('Error creating post:', error);
      alert('Failed to create post. Please try again.');
    } finally {
      setLoading(false);
    }
  };


  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('PUBLISHED');
    setLoading(true);
    try {
      const response = await axios.post('/api/community/post/create', {
        title,
        content,
        category,
        tags,
        communityId: spaceId,
        coverImageType: coverImageType === 'None' ? '' : coverImageType,
        coverImageUrl,
        isCommentsEnabled,
        status,
        readTime: Math.ceil(content.split(' ').length / 200)
      });

      if (response.status === 201) {
        Swal.fire({
          icon: 'success',
          title: 'Post Published',
          text: 'Your post has been published successfully.'
        }).then(()=>{
          router.push(`/community/posts/v/${response.data.slug}`);
        })
        
      }
    } catch (error:any) {
      console.error('Error publishing post:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.error || 'Failed to publish post. Please try again.'
      });
    }finally{
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Community
          </button>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-gray-900">Create Post</h1>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              {spaceName}
            </span>
          </div>
          <p className="text-gray-600">Share your thoughts with the {spaceName} community</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-6 text-gray-900">Post Details</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                </label>
                <Input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter your post title"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content *
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your post content here..."
                  rows={8}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                  required
                />
                <p className="text-sm text-gray-500 mt-2">
                  Estimated read time: {Math.ceil(content.split(' ').length / 200)} minutes
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-6 text-gray-900">Tags</h2>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="hover:text-blue-900 ml-1"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add a tag"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddTag();
                    }
                  }}
                />
                <Button
                  type="button"
                  variant={"outline"}
                  onClick={handleAddTag}
                  disabled={!newTag.trim()}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-6 text-gray-900">Post Settings</h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  {isCommentsEnabled ? (
                    <Eye className="h-5 w-5 text-green-600" />
                  ) : (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  )}
                  <div>
                    <p className="font-medium text-gray-900">Enable Comments</p>
                    <p className="text-sm text-gray-500">
                      Allow community members to comment on this post
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCommentsEnabled(!isCommentsEnabled)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    isCommentsEnabled ? 'bg-primary' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      isCommentsEnabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">
                  Add Attachments
                </label>
                
                <div className="flex gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-2">
                      File Type
                    </label>
                    <select
                      value={coverImageType}
                      onChange={(e) => setCoverImageType(e.target.value)}
                      className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                    >
                      {coverImageTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className='w-full'>
                    <label className="block text-xs font-medium text-gray-500 mb-2">
                      Image URL *
                    </label>
                    <div className="flex gap-2">
                      <Input
                        type="url"
                        value={coverImageUrl}
                        onChange={(e) => setCoverImageUrl(e.target.value)}
                        placeholder="https://example.com/image.jpg"
                        disabled={coverImageType === 'None'}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-6">
          
            <Button
              type="submit"
              onClick={handlePublish}
              disabled={loading || !title || !content}
            >
              {loading ? (
                <>
                  <Loader className="h-4 w-4 animate-spin mr-2" />
                  Publishing...
                </>
              ) : (
                'Publish Post'
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}