'use client'
import UserProfile from '../../components/UserProfile'
import { notFound } from 'next/navigation'
import { use } from 'react'

export default function UserPage({ params }) {
  const { userId } = use(params)
  
  if (!userId || isNaN(userId)) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">User Profile</h1>
            <p className="text-gray-500 mt-1">Viewing details for user #{userId}</p>
          </div>

          {/* Profile Card Container */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <UserProfile userId={userId} />
          </div>

          {/* Optional Back Button */}
          <div className="mt-6">
            <button 
              onClick={() => window.history.back()} 
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
            >
              ← Back to users list
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}