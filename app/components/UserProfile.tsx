'use client'

import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useEffect, useRef } from 'react'
import Link from 'next/link' 
import dynamic from 'next/dynamic'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

interface UserProfileProps {
  userId: number;
}

export default function UserProfile({ userId }: UserProfileProps) {
  const mapContainer = useRef(null)
  const map = useRef(null)

  const { data: user, isLoading: userLoading, error: userError } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => 
      axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`)
        .then(res => res.data)
  })

  interface Post {
    id: number
    title: string
    body: string
  }

  const { data: posts, isLoading: postsLoading, error: postsError } = useQuery<Post[]>({
    queryKey: ['posts', userId],
    queryFn: () => 
      axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
        .then(res => res.data),
    enabled: !!userId
  })

  useEffect(() => {
    if (user?.address?.geo && !map.current) {
      // Initialize map if you have a valid token
      // map.current = new mapboxgl.Map({...})
    }
  }, [user])

  if (userLoading) return <div className="text-center py-8">Loading user...</div>
  if (userError) return <div className="text-center py-8 text-red-500">Error loading user</div>
  if (!user) return <div className="text-center py-8">User not found</div>

  return (
    <div className="container mx-auto px-4 py-8">
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link 
            href="/" 
            className="text-blue-600 hover:underline mb-4 inline-block transition-colors duration-200"
          >
            &larr; Back to users
          </Link>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
            <p className="text-gray-500">@{user.username}</p>
            
            <div className="mt-4 space-y-2 text-gray-700">
              <p><span className="font-semibold">Email:</span> {user.email}</p>
              <p><span className="font-semibold">Phone:</span> {user.phone}</p>
              <p>
                <span className="font-semibold">Website:</span> 
                <Link 
                  href={`http://${user.website}`} 
                  target="_blank" 
                  className="text-blue-500 hover:underline ml-1"
                >
                  {user.website}
                </Link>
              </p>
              <p><span className="font-semibold">Company:</span> {user.company.name}</p>
            </div>
          </div>
          
          <div className="h-64 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center border border-gray-200">
            {user.address?.geo ? (
              <p className="text-gray-500">Map would display here with valid token</p>
            ) : (
              <p className="text-gray-500">No location data available</p>
            )}
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Posts by {user.name}</h3>
          
          {postsLoading && <div className="text-center py-4">Loading posts...</div>}
          {postsError && <div className="text-center py-4 text-red-500">Error loading posts</div>}
          
          {posts && (
            <div className="space-y-4">
              {posts.map(post => (
                <div key={post.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <h4 className="font-semibold text-gray-800">{post.title}</h4>
                  <p className="text-gray-600 mt-2">{post.body}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}