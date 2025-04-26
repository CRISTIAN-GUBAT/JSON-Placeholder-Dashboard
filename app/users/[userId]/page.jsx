// app/users/[userId]/page.jsx
'use client'
import UserProfile from '../../components/UserProfile'
import { notFound } from 'next/navigation'
import { use } from 'react'

export default function UserPage({ params }) {
  // Properly unwrap the params promise
  const { userId } = use(params)
  
  if (!userId || isNaN(userId)) {
    notFound()
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <UserProfile userId={userId} />
    </div>
  )
}