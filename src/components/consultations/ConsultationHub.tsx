// components/consultations/ConsultationHub.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Types for the component
type LegislationPreview = {
  id: string;
  title: string;
  jurisdiction: string;
};

type Reply = {
  id: string;
  content: string;
  authorName: string;
  authorType: string;
  authorVerified: boolean;
  createdAt: string;
  replies: Reply[];
};

type Comment = {
  id: string;
  content: string;
  authorName: string;
  authorType: string;
  authorVerified: boolean;
  createdAt: string;
  replies: Reply[];
};

type Consultation = {
  id: string;
  title: string;
  description: string;
  status: string;
  startDate: string;
  endDate: string;
  domain: string;
  region: string;
  legislation: LegislationPreview | null;
  comments: Comment[];
  _count: {
    comments: number;
  };
};

type FilterOptions = {
  status: string;
  domain: string;
  region: string;
};

type NewCommentData = {
  consultationId: string;
  content: string;
  authorName: string;
  authorType: string;
  parentId?: string;
};

// Helper component for rendering a comment
const CommentComponent = ({ 
  comment, 
  onReply,
  level = 0
}: { 
  comment: Comment | Reply; 
  onReply: (commentId: string) => void;
  level?: number;
}) => {
  return (
    <div className={`border-l-2 pl-4 ${level === 0 ? 'border-blue-400' : 'border-gray-200'} mb-4`}>
      <div className="flex justify-between items-start">
        <div className="flex items-center space-x-2">
          <span className="font-medium">{comment.authorName}</span>
          {comment.authorVerified && (
            <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          )}
          <span className={`text-xs px-2 py-0.5 rounded-full ${
            comment.authorType === 'Policymaker' ? 'bg-purple-100 text-purple-800' :
            comment.authorType === 'Academic' ? 'bg-blue-100 text-blue-800' :
            comment.authorType === 'Industry' ? 'bg-green-100 text-green-800' :
            comment.authorType === 'Civil Society' ? 'bg-orange-100 text-orange-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {comment.authorType}
          </span>
        </div>
        <span className="text-xs text-gray-500">
          {new Date(comment.createdAt).toLocaleDateString()}
        </span>
      </div>
      
      <div className="mt-2 text-gray-700">
        {comment.content}
      </div>
      
      <div className="mt-2">
        <button 
          className="text-sm text-blue-600 hover:text-blue-800"
          onClick={() => onReply(comment.id)}
        >
          Reply
        </button>
      </div>
      
      {'replies' in comment && comment.replies.length > 0 && (
        <div className="mt-4 ml-4">
          {comment.replies.map(reply => (
            <CommentComponent 
              key={reply.id} 
              comment={reply} 
              onReply={onReply}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Main component
export default function ConsultationHub() {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedConsultation, setSelectedConsultation] = useState<Consultation | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({
    status: '',
    domain: '',
    region: ''
  });
  
  // New comment state
  const [showCommentForm, setShowCommentForm] = useState<boolean>(false);
  const [replyToId, setReplyToId] = useState<string | null>(null);
  const [newComment, setNewComment] = useState<NewCommentData>({
    consultationId: '',
    content: '',
    authorName: '',
    authorType: 'Citizen'
  });
  
  // Available filter options (would come from API in a full implementation)
  const statusOptions = ['Open', 'Closed', 'Upcoming'];
  const domainOptions = ['Financial Services', 'Facial Recognition', 'Healthcare', 'Education', 'Public Sector', 'General AI Governance'];
  const regionOptions = ['East Africa', 'West Africa', 'North Africa', 'Southern Africa', 'Central Africa'];
  const authorTypeOptions = ['Policymaker', 'Academic', 'Industry', 'Civil Society', 'Citizen'];
  
  // Fetch consultations
  useEffect(() => {
    const fetchConsultations = async () => {
      setLoading(true);
      try {
        let url = '/api/consultations?';
        if (filters.status) url += `status=${filters.status}&`;
        if (filters.domain) url += `domain=${filters.domain}&`;
        if (filters.region) url += `region=${filters.region}&`;
        
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch consultations');
        
        const data = await response.json();
        setConsultations(data);
        
        // Set the first consultation as selected by default if available
        if (data.length > 0 && !selectedConsultation) {
          setSelectedConsultation(data[0]);
          setNewComment(prev => ({
            ...prev,
            consultationId: data[0].id
          }));
        }
      } catch (err) {
        setError('Failed to load consultations. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchConsultations();
  }, [filters]);
  
  // Handle filter changes
  const handleFilterChange = (filterType: keyof FilterOptions, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };
  
  // Handle consultation selection
  const handleSelectConsultation = (consultation: Consultation) => {
    setSelectedConsultation(consultation);
    setNewComment(prev => ({
      ...prev,
      consultationId: consultation.id
    }));
    setShowCommentForm(false);
    setReplyToId(null);
  };
  
  // Handle reply button click
  const handleReply = (commentId: string) => {
    setReplyToId(commentId);
    setShowCommentForm(true);
    setNewComment(prev => ({
      ...prev,
      content: '',
      parentId: commentId
    }));
  };
  
  // Handle new comment submission
  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newComment.content || !newComment.authorName || !newComment.authorType) {
      alert('Please fill all required fields');
      return;
    }
    
    try {
      const response = await fetch('/api/consultations', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newComment)
      });
      
      if (!response.ok) throw new Error('Failed to submit comment');
      
      // In a real implementation, we would reload the comments
      // For the MVP, we'll simulate adding the comment
      if (selectedConsultation) {
        const newCommentObj = {
          id: `temp-${Date.now()}`,
          content: newComment.content,
          authorName: newComment.authorName,
          authorType: newComment.authorType,
          authorVerified: false,
          createdAt: new Date().toISOString(),
          replies: []
        };
        
        if (replyToId) {
          // Add as a reply
          const updatedComments = selectedConsultation.comments.map(comment => {
            if (comment.id === replyToId) {
              return {
                ...comment,
                replies: [...comment.replies, newCommentObj]
              };
            }
            return comment;
          });
          
          setSelectedConsultation({
            ...selectedConsultation,
            comments: updatedComments
          });
        } else {
          // Add as a new comment
          setSelectedConsultation({
            ...selectedConsultation,
            comments: [newCommentObj, ...selectedConsultation.comments],
            _count: {
              comments: selectedConsultation._count.comments + 1
            }
          });
        }
      }
      
      // Reset form
      setNewComment({
        consultationId: selectedConsultation?.id || '',
        content: '',
        authorName: '',
        authorType: 'Citizen'
      });
      setShowCommentForm(false);
      setReplyToId(null);
      
    } catch (err) {
      console.error('Error submitting comment:', err);
      alert('Failed to submit comment. Please try again.');
    }
  };
  
  // Render loading state
  if (loading && consultations.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  // Render error state
  if (error && consultations.length === 0) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4">
        <p className="text-red-700">{error}</p>
        <button 
          className="mt-2 text-sm text-red-600 hover:text-red-800"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b">
        <h2 className="text-2xl font-bold text-gray-800">Policy Consultation Hub</h2>
        <p className="text-gray-600">Participate in shaping AI policies across Africa</p>
      </div>
      
      {/* Filters */}
      <div className="p-4 bg-gray-50 border-b">
        <div className="flex flex-wrap gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              className="block w-full p-2 border border-gray-300 rounded-md"
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
            >
              <option value="">All Statuses</option>
              {statusOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Domain</label>
            <select
              className="block w-full p-2 border border-gray-300 rounded-md"
              value={filters.domain}
              onChange={(e) => handleFilterChange('domain', e.target.value)}
            >
              <option value="">All Domains</option>
              {domainOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Region</label>
            <select
              className="block w-full p-2 border border-gray-300 rounded-md"
              value={filters.region}
              onChange={(e) => handleFilterChange('region', e.target.value)}
            >
              <option value="">All Regions</option>
              {regionOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {/* Main content - split view */}
      <div className="grid grid-cols-1 md:grid-cols-3">
        {/* Consultation list */}
        <div className="p-4 border-r md:col-span-1 h-[600px] overflow-y-auto">
          <h3 className="text-lg font-medium mb-4">Consultations ({consultations.length})</h3>
          
          {consultations.length === 0 ? (
            <p className="text-gray-500">No consultations found matching the selected filters.</p>
          ) : (
            <ul className="space-y-3">
              {consultations.map(consultation => (
                <li 
                  key={consultation.id}
                  className={`p-3 rounded-md cursor-pointer transition-colors ${
                    selectedConsultation?.id === consultation.id 
                      ? 'bg-blue-100 border-blue-300 border'
                      : 'hover:bg-gray-100'
                  }`}
                  onClick={() => handleSelectConsultation(consultation)}
                >
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium">{consultation.title}</h4>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      consultation.status === 'Open' ? 'bg-green-100 text-green-800' :
                      consultation.status === 'Closed' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {consultation.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {consultation.domain} · {consultation.region}
                  </p>
                  <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                    <span>
                      {consultation.status === 'Open' ? 
                        `Closes: ${new Date(consultation.endDate).toLocaleDateString()}` : 
                        `${consultation.status}: ${new Date(consultation.endDate).toLocaleDateString()}`
                      }
                    </span>
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                      </svg>
                      {consultation._count.comments}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        
        {/* Consultation details and comments */}
        <div className="p-6 md:col-span-2 h-[600px] overflow-y-auto">
          {selectedConsultation ? (
            <div>
              <div className="mb-6">
                <div className="flex justify-between items-start">
                  <h2 className="text-xl font-bold">{selectedConsultation.title}</h2>
                  <span className={`text-sm px-3 py-1 rounded-full ${
                    selectedConsultation.status === 'Open' ? 'bg-green-100 text-green-800' :
                    selectedConsultation.status === 'Closed' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {selectedConsultation.status}
                  </span>
                </div>
                
                <div className="mt-2 text-sm text-gray-600">
                  <span>{selectedConsultation.domain}</span>
                  <span className="mx-2">•</span>
                  <span>{selectedConsultation.region}</span>
                  {selectedConsultation.legislation && (
                    <>
                      <span className="mx-2">•</span>
                      <span>
                        Related to: 
                        <Link 
                          href={`/legislation/${selectedConsultation.legislation.id}`}
                          className="ml-1 text-blue-600 hover:text-blue-800"
                        >
                          {selectedConsultation.legislation.title}
                        </Link>
                      </span>
                    </>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-sm text-gray-500">Start Date</p>
                    <p className="font-medium">
                      {new Date(selectedConsultation.startDate).toLocaleDateString()}
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-sm text-gray-500">End Date</p>
                    <p className="font-medium">
                      {new Date(selectedConsultation.endDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <h3 className="text-lg font-medium mb-2">Description</h3>
                  <p className="text-gray-700">{selectedConsultation.description}</p>
                </div>
              </div>
              
              {/* Comment section */}
              <div className="mt-8">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Comments ({selectedConsultation._count.comments})</h3>
                  
                  {selectedConsultation.status === 'Open' && (
                    <button
                      className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
                      onClick={() => {
                        setShowCommentForm(!showCommentForm);
                        setReplyToId(null);
                        setNewComment({
                          consultationId: selectedConsultation.id,
                          content: '',
                          authorName: '',
                          authorType: 'Citizen'
                        });
                      }}
                    >
                      Add Comment
                    </button>
                  )}
                </div>
                
                {/* Comment form */}
                {showCommentForm && selectedConsultation.status === 'Open' && (
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-700 mb-3">
                      {replyToId ? 'Reply to Comment' : 'Add Your Comment'}
                    </h4>
                    
                    <form onSubmit={handleSubmitComment}>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Your Comment</label>
                        <textarea
                          className="w-full p-3 border border-gray-300 rounded-md h-24"
                          placeholder="Share your thoughts on this policy consultation..."
                          value={newComment.content}
                          onChange={(e) => setNewComment({...newComment, content: e.target.value})}
                          required
                        ></textarea>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                          <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded-md"
                            placeholder="Your name"
                            value={newComment.authorName}
                            onChange={(e) => setNewComment({...newComment, authorName: e.target.value})}
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Stakeholder Type</label>
                          <select
                            className="w-full p-2 border border-gray-300 rounded-md"
                            value={newComment.authorType}
                            onChange={(e) => setNewComment({...newComment, authorType: e.target.value})}
                            required
                          >
                            {authorTypeOptions.map(option => (
                              <option key={option} value={option}>{option}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      
                      <div className="flex justify-end space-x-2">
                        <button
                          type="button"
                          className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50"
                          onClick={() => {
                            setShowCommentForm(false);
                            setReplyToId(null);
                          }}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                )}
                
                {/* Comments list */}
                {selectedConsultation.comments.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <svg className="w-12 h-12 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                    </svg>
                    <p>No comments yet. Be the first to share your thoughts!</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {selectedConsultation.comments.map(comment => (
                      <CommentComponent 
                        key={comment.id} 
                        comment={comment} 
                        onReply={handleReply}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
              </svg>
              <p>Select a consultation to view details and participate</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Participation guide */}
      <div className="p-6 bg-blue-50 border-t">
        <h3 className="text-lg font-medium text-blue-800 mb-3">How to Participate Effectively</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center mb-3">
              <div className="bg-blue-100 rounded-full p-2 mr-3">
                <svg className="w-5 h-5 text-blue-700" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <h4 className="font-medium">Read the Full Documentation</h4>
            </div>
            <p className="text-sm text-gray-600">Review all policy documents before commenting to ensure your feedback is well-informed and relevant.</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center mb-3">
              <div className="bg-blue-100 rounded-full p-2 mr-3">
                <svg className="w-5 h-5 text-blue-700" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h4 className="font-medium">Be Specific and Constructive</h4>
            </div>
            <p className="text-sm text-gray-600">Focus on specific sections or provisions and offer alternative wording or approaches where possible.</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center mb-3">
              <div className="bg-blue-100 rounded-full p-2 mr-3">
                <svg className="w-5 h-5 text-blue-700" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
              </div>
              <h4 className="font-medium">Identify Your Perspective</h4>
            </div>
            <p className="text-sm text-gray-600">Clearly state your role and expertise when commenting to help contextualize your feedback for policymakers.</p>
          </div>
        </div>
      </div>
    </div>
  );
}