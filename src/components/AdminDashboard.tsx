
import React, { useState } from 'react';
import { toast } from 'sonner';

// Define forum section type
interface ForumSection {
  id: string;
  title: string;
  description: string;
  order: number;
}

// Define forum post type
interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  sectionId: string;
  status: 'pending' | 'approved' | 'rejected';
}

const AdminDashboard = () => {
  // Sample initial data
  const [sections, setSections] = useState<ForumSection[]>([
    { id: '1', title: 'Announcements', description: 'Official team announcements', order: 1 },
    { id: '2', title: 'Tournaments', description: 'Tournament information and schedules', order: 2 },
    { id: '3', title: 'Discussions', description: 'General Valorant discussions', order: 3 },
  ]);
  
  const [posts, setPosts] = useState<ForumPost[]>([
    {
      id: '1',
      title: 'Welcome to Team Tragic Forums',
      content: 'Welcome to our community! Please read the rules before posting.',
      author: 'Admin',
      date: '2023-10-15',
      sectionId: '1',
      status: 'approved',
    },
    {
      id: '2',
      title: 'Looking for players to practice with',
      content: 'Hey everyone, I\'m looking for some players to practice with in custom games. Let me know if you\'re interested!',
      author: 'ValorantPlayer123',
      date: '2023-10-18',
      sectionId: '3',
      status: 'pending',
    },
    {
      id: '3',
      title: 'Upcoming Tournament This Weekend',
      content: 'We\'re excited to announce our participation in the VCT Qualifiers this weekend. Tune in to support the team!',
      author: 'Coach',
      date: '2023-10-20',
      sectionId: '2',
      status: 'pending',
    },
  ]);
  
  const [activeTab, setActiveTab] = useState('sections');
  const [editingSection, setEditingSection] = useState<ForumSection | null>(null);
  const [newSection, setNewSection] = useState<Partial<ForumSection>>({
    title: '',
    description: '',
  });
  
  // Functions for managing sections
  const handleAddSection = () => {
    if (!newSection.title || !newSection.description) {
      toast.error('Please fill in all fields');
      return;
    }
    
    const newSectionWithId: ForumSection = {
      id: Date.now().toString(),
      title: newSection.title,
      description: newSection.description,
      order: sections.length + 1,
    };
    
    setSections([...sections, newSectionWithId]);
    setNewSection({ title: '', description: '' });
    toast.success('Section added successfully');
  };
  
  const handleUpdateSection = () => {
    if (!editingSection) return;
    
    setSections(sections.map(section => 
      section.id === editingSection.id ? editingSection : section
    ));
    
    setEditingSection(null);
    toast.success('Section updated successfully');
  };
  
  const handleDeleteSection = (id: string) => {
    setSections(sections.filter(section => section.id !== id));
    toast.success('Section deleted successfully');
  };
  
  // Functions for managing posts
  const handleUpdatePostStatus = (id: string, status: 'approved' | 'rejected') => {
    setPosts(posts.map(post => 
      post.id === id ? { ...post, status } : post
    ));
    
    toast.success(`Post ${status === 'approved' ? 'approved' : 'rejected'}`);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-valorant-black to-valorant-darkGray text-white py-24 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <h2 className="text-3xl md:text-4xl font-valorant text-white">
            Admin Dashboard
          </h2>
          <p className="text-white/70 mt-2">
            Manage your forum content and user submissions
          </p>
        </div>
        
        {/* Admin Tabs */}
        <div className="mb-8 border-b border-white/10">
          <div className="flex space-x-1">
            <button
              onClick={() => setActiveTab('sections')}
              className={`py-3 px-6 font-medium ${
                activeTab === 'sections' 
                  ? 'text-valorant-red border-b-2 border-valorant-red' 
                  : 'text-white/70 hover:text-white'
              }`}
            >
              Manage Sections
            </button>
            <button
              onClick={() => setActiveTab('posts')}
              className={`py-3 px-6 font-medium ${
                activeTab === 'posts' 
                  ? 'text-valorant-red border-b-2 border-valorant-red' 
                  : 'text-white/70 hover:text-white'
              }`}
            >
              Moderate Posts
            </button>
          </div>
        </div>
        
        {/* Sections Management */}
        {activeTab === 'sections' && (
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 transition-all animate-fade-in">
            <h3 className="text-xl font-semibold mb-6">Forum Sections</h3>
            
            {/* Add New Section */}
            <div className="bg-white/5 rounded-lg p-4 mb-8">
              <h4 className="text-lg font-medium mb-4">Add New Section</h4>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-white/80 mb-2">Title</label>
                  <input
                    type="text"
                    value={newSection.title}
                    onChange={(e) => setNewSection({ ...newSection, title: e.target.value })}
                    className="form-input w-full"
                    placeholder="Section Title"
                  />
                </div>
                <div>
                  <label className="block text-white/80 mb-2">Description</label>
                  <input
                    type="text"
                    value={newSection.description}
                    onChange={(e) => setNewSection({ ...newSection, description: e.target.value })}
                    className="form-input w-full"
                    placeholder="Brief description"
                  />
                </div>
              </div>
              <button
                onClick={handleAddSection}
                className="bg-valorant-red text-white px-4 py-2 rounded-md hover:bg-valorant-red/80 transition-colors"
              >
                Add Section
              </button>
            </div>
            
            {/* Edit Section Modal */}
            {editingSection && (
              <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
                <div className="bg-valorant-darkGray rounded-lg p-6 w-full max-w-md">
                  <h3 className="text-xl font-semibold mb-4">Edit Section</h3>
                  <div className="mb-4">
                    <label className="block text-white/80 mb-2">Title</label>
                    <input
                      type="text"
                      value={editingSection.title}
                      onChange={(e) => setEditingSection({ ...editingSection, title: e.target.value })}
                      className="form-input w-full"
                    />
                  </div>
                  <div className="mb-6">
                    <label className="block text-white/80 mb-2">Description</label>
                    <input
                      type="text"
                      value={editingSection.description}
                      onChange={(e) => setEditingSection({ ...editingSection, description: e.target.value })}
                      className="form-input w-full"
                    />
                  </div>
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => setEditingSection(null)}
                      className="px-4 py-2 bg-white/10 text-white rounded-md hover:bg-white/20 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleUpdateSection}
                      className="px-4 py-2 bg-valorant-red text-white rounded-md hover:bg-valorant-red/80 transition-colors"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Sections List */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead className="bg-white/5">
                  <tr>
                    <th className="p-3 text-left">Title</th>
                    <th className="p-3 text-left">Description</th>
                    <th className="p-3 text-center">Order</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sections.map((section) => (
                    <tr key={section.id} className="border-t border-white/5 hover:bg-white/5 transition-colors">
                      <td className="p-3">{section.title}</td>
                      <td className="p-3 text-white/70">{section.description}</td>
                      <td className="p-3 text-center">{section.order}</td>
                      <td className="p-3 text-right">
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => setEditingSection(section)}
                            className="text-blue-400 hover:text-blue-300 transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteSection(section.id)}
                            className="text-valorant-red hover:text-valorant-red/80 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {/* Posts Moderation */}
        {activeTab === 'posts' && (
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 transition-all animate-fade-in">
            <h3 className="text-xl font-semibold mb-6">Post Moderation</h3>
            
            {/* Pending Posts */}
            <div className="mb-8">
              <h4 className="text-lg font-medium mb-4">Pending Posts</h4>
              {posts.filter(post => post.status === 'pending').length === 0 ? (
                <p className="text-white/70 italic">No pending posts to review</p>
              ) : (
                <div className="space-y-4">
                  {posts
                    .filter(post => post.status === 'pending')
                    .map(post => (
                      <div key={post.id} className="bg-white/5 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h5 className="font-medium">{post.title}</h5>
                            <p className="text-sm text-white/70">
                              By {post.author} • {post.date} • 
                              <span className="ml-1">
                                {sections.find(s => s.id === post.sectionId)?.title || 'Unknown Section'}
                              </span>
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleUpdatePostStatus(post.id, 'approved')}
                              className="px-3 py-1 text-sm bg-green-600/80 text-white rounded-md hover:bg-green-600 transition-colors"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleUpdatePostStatus(post.id, 'rejected')}
                              className="px-3 py-1 text-sm bg-valorant-red/80 text-white rounded-md hover:bg-valorant-red transition-colors"
                            >
                              Reject
                            </button>
                          </div>
                        </div>
                        <p className="text-white/90">{post.content}</p>
                      </div>
                    ))}
                </div>
              )}
            </div>
            
            {/* Approved & Rejected Posts */}
            <div>
              <h4 className="text-lg font-medium mb-4">All Posts</h4>
              <table className="w-full border-collapse">
                <thead className="bg-white/5">
                  <tr>
                    <th className="p-3 text-left">Title</th>
                    <th className="p-3 text-left">Author</th>
                    <th className="p-3 text-left">Section</th>
                    <th className="p-3 text-center">Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post) => (
                    <tr key={post.id} className="border-t border-white/5 hover:bg-white/5 transition-colors">
                      <td className="p-3">{post.title}</td>
                      <td className="p-3">{post.author}</td>
                      <td className="p-3">
                        {sections.find(s => s.id === post.sectionId)?.title || 'Unknown'}
                      </td>
                      <td className="p-3 text-center">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          post.status === 'approved' ? 'bg-green-600/20 text-green-400' :
                          post.status === 'rejected' ? 'bg-red-600/20 text-red-400' :
                          'bg-yellow-600/20 text-yellow-400'
                        }`}>
                          {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <div className="flex justify-end space-x-2">
                          {post.status === 'pending' && (
                            <>
                              <button
                                onClick={() => handleUpdatePostStatus(post.id, 'approved')}
                                className="text-green-400 hover:text-green-300 transition-colors"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => handleUpdatePostStatus(post.id, 'rejected')}
                                className="text-valorant-red hover:text-valorant-red/80 transition-colors"
                              >
                                Reject
                              </button>
                            </>
                          )}
                          {post.status !== 'pending' && (
                            <button className="text-valorant-red hover:text-valorant-red/80 transition-colors">
                              Delete
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
