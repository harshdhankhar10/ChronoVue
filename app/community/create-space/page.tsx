"use client"
import React, {useState} from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sparkles, Loader, Users, Globe, Lock, BookOpen, Target, Plus, X, Upload, Image } from "lucide-react"
import axios from "axios"
import Swal from "sweetalert2"
import { useRouter } from "next/navigation"

const categories = [
  { value: "technology", label: "Technology" },
  { value: "education", label: "Education" },
  { value: "career", label: "Career" },
  { value: "health", label: "Health & Fitness" },
  { value: "creative", label: "Creative Arts" },
  { value: "business", label: "Business" },
  { value: "science", label: "Science" },
  { value: "lifestyle", label: "Lifestyle" },
]

const predefinedRules = [
  "Be respectful to all members",
  "No spam or self-promotion",
  "Use appropriate language",
  "Report any issues to moderators"
];

export default function CreateSpacePage() {

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [rules, setRules] = useState<string[]>(predefinedRules);
  const [privacy, setPrivacy] = useState<"public" | "private">("public");
  const [newRule, setNewRule] = useState("");
  const router = useRouter();


  const handleAddRule = () => {
    if (newRule.trim() && !rules.includes(newRule.trim())) {
      setRules([...rules, newRule.trim()]);
      setNewRule("");
    }
  };
  const handleRemoveRule = (ruleToRemove: string) => {
    setRules(rules.filter(rule => rule !== ruleToRemove));
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('/api/community/create', {
        name,
        description,
        privacy,
        category,
        rules,
      });

      if(response.status === 201){
        Swal.fire({
          icon: 'success',
          title: 'Community Created',
          text: 'Your community space has been created successfully!',
        }).then(() => {
          router.push(`/community/v/${response.data.slug}`);
        });
      }
    } catch (error:any) {
      console.error("Error creating community space:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error?.response?.data?.error || 'An error occurred while creating the community space. Please try again.',
      });
    }finally{
      setLoading(false);
    }
  }



  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Create Your Space</h1>
          <p className="text-gray-600 text-lg">Build a community where people connect and grow together</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              <Card className="border border-gray-200 shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-semibold">
                    Basic Info
                  </CardTitle>
                  <CardDescription className="text-gray-600">Tell us about your community</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Community Name</label>
                    <Input 
                      value={name} 
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter a unique name" 
                      className="w-full" 
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea 
                      placeholder="What is this community about?"
                      rows={3}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select 
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
                      required
                    >
                      <option value="">Choose a category</option>
                      {categories.map((cat) => (
                        <option key={cat.value} value={cat.value}>{cat.label}</option>
                      ))}
                    </select>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-gray-200 shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-semibold">
                    Community Rules
                  </CardTitle>
                  <CardDescription className="text-gray-600">Set guidelines for members</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    {rules.map((rule, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-blue-400 transition-colors">
                        <div className="flex items-center space-x-3">
                          <BookOpen className="h-5 w-5 text-blue-500" />
                          <p className="text-sm">{rule}</p>
                        </div>
                        <button 
                          type="button"
                          onClick={() => handleRemoveRule(rule)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    <Input
                      value={newRule}
                      onChange={(e) => setNewRule(e.target.value)}
                      placeholder="Add a new rule"
                      className="flex-1"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddRule();
                        }
                      }}
                    />
                    <Button 
                      type="button" 
                      onClick={handleAddRule}
                      variant="outline"
                      disabled={!newRule.trim()}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="border border-gray-200 shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-semibold">
                    Community Images
                  </CardTitle>
                  <CardDescription className="bg-gray-100 p-4 rounded-md text-gray-600">
                    This feature is coming soon! You will be able to upload a logo and cover image for your community.
                  </CardDescription>
                 </CardHeader>
              </Card>

              <Card className="border border-gray-200 shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-semibold">
                    Privacy Settings
                  </CardTitle>
                  <CardDescription className="text-gray-600">Control who can join your community</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div 
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      privacy === "public" ? "border-blue-400 bg-blue-50" : "border-gray-200 hover:border-blue-400"
                    }`}
                    onClick={() => setPrivacy("public")}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Globe className="h-5 w-5 text-green-500" />
                        <div>
                          <p className="font-medium">Public Community</p>
                          <p className="text-sm text-gray-600">Anyone can discover and join</p>
                        </div>
                      </div>
                      <input 
                        type="radio" 
                        name="privacy" 
                        checked={privacy === "public"}
                        onChange={() => setPrivacy("public")}
                        className="h-4 w-4 text-blue-600" 
                      />
                    </div>
                  </div>
                  <div 
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      privacy === "private" ? "border-blue-400 bg-blue-50" : "border-gray-200 hover:border-blue-400"
                    }`}
                    onClick={() => setPrivacy("private")}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Lock className="h-5 w-5 text-orange-500" />
                        <div>
                          <p className="font-medium">Private Community</p>
                          <p className="text-sm text-gray-600">Only invited members can join</p>
                        </div>
                      </div>
                      <input 
                        type="radio" 
                        name="privacy" 
                        checked={privacy === "private"}
                        onChange={() => setPrivacy("private")}
                        className="h-4 w-4 text-blue-600" 
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="flex justify-end items-center mt-8 pt-6 border-t border-gray-200">

            <Button 
              type="submit" 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700 px-8 text-white"
              disabled={loading || !name || !description || !category}
            >
              {loading ? (
                <>
                  <Loader className="h-5 w-5 mr-2 animate-spin" />
                </>
              ) : (
                <>
                  Create Community Space
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}