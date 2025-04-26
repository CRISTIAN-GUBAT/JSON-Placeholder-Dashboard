'use client'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useEffect, useRef } from 'react'
import Link from 'next/link' 
import dynamic from 'next/dynamic'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

export default function UserProfile({ userId }) {
  const mapContainer = useRef(null)
  const map = useRef(null)

  const { data: user, isLoading: userLoading, error: userError } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => 
      axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`)
        .then(res => res.data)
  })

  const { data: posts, isLoading: postsLoading, error: postsError } = useQuery({
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

  if (userLoading) return <div>Loading user...</div>
  if (userError) return <div>Error loading user</div>
  if (!user) return <div>User not found</div>

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Link href="/" className="text-primary hover:underline mb-4 inline-block">
        &larr; Back to users
      </Link>
        <div>
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <p className="text-gray-600">@{user.username}</p>
          <div className="mt-4 space-y-2">
            <p><span className="font-semibold">Email:</span> {user.email}</p>
            <p><span className="font-semibold">Phone:</span> {user.phone}</p>
            <p><span className="font-semibold">Website:</span> 
              <Link href={`http://${user.website}`} target="_blank" className="text-blue-500 hover:underline">
                {user.website}
              </Link>
            </p>
            <p><span className="font-semibold">Company:</span> {user.company.name}</p>
          </div>
        </div>
        
        <div className="h-64 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
          {user.address?.geo ? (
            <p>Map would display here with valid token</p>
          ) : (
            <p>No location data available</p>
          )}
        </div>
      </div>
      
      <div>
        <h3 className="text-xl font-semibold mb-4">Posts by {user.name}</h3>
        {postsLoading && <div>Loading posts...</div>}
        {postsError && <div>Error loading posts</div>}
        {posts && (
          <div className="space-y-4">
            {posts.map(post => (
              <div key={post.id} className="p-4 border rounded-lg">
                <h4 className="font-semibold">{post.title}</h4>
                <p className="text-gray-600">{post.body}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}