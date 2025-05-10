'use client'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Link from 'next/link'
import { FiUser, FiAlertTriangle, FiFrown, FiSearch } from 'react-icons/fi'

type User = {
  id: number
  name: string
  username: string
  email?: string
}

const fetchUsers = async (): Promise<User[]> => {
  const { data } = await axios.get('https://jsonplaceholder.typicode.com/users')
  return data
}

export default function UserList({ searchTerm = '' }) {
  const { data: users, isLoading, isError } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    staleTime: 1000 * 60 * 5 // 5 minutes
  })

  if (isLoading) return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="bg-white rounded-lg border border-gray-100 p-5 shadow-xs animate-pulse">
          <div className="h-5 bg-gray-100 rounded w-3/4 mb-3"></div>
          <div className="h-4 bg-gray-100 rounded w-1/2 mb-4"></div>
          <div className="h-3 bg-gray-100 rounded w-full mb-2"></div>
          <div className="h-3 bg-gray-100 rounded w-2/3"></div>
        </div>
      ))}
    </div>
  )

  if (isError) return (
    <div className="bg-white rounded-xl p-6 shadow-xs text-center max-w-md mx-auto">
      <div className="mx-auto w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-4">
        <FiAlertTriangle className="w-6 h-6 text-red-500" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">Error loading users</h3>
      <p className="text-gray-500 mb-4">We couldn't load the user data. Please try again.</p>
      <button
        onClick={() => window.location.reload()}
        className="w-full md:w-auto px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Retry
      </button>
    </div>
  )

  if (!users) return (
    <div className="bg-white rounded-xl p-6 shadow-xs text-center max-w-md mx-auto">
      <div className="mx-auto w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mb-4">
        <FiUser className="w-6 h-6 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">No users available</h3>
      <p className="text-gray-500">There are currently no users to display.</p>
    </div>
  )

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Showing</span>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700">
            {filteredUsers.length} {filteredUsers.length === 1 ? 'user' : 'users'}
          </span>
        </div>
      </div>

      {filteredUsers.length === 0 ? (
        <div className="bg-white rounded-xl p-8 shadow-xs text-center">
          <div className="mx-auto w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mb-4">
            <FiSearch className="w-6 h-6 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No matches found</h3>
          <p className="text-gray-500">
            No users found matching <span className="font-medium">"{searchTerm}"</span>
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredUsers.map((user) => (
            <Link 
              href={`/users/${user.id}`} 
              key={user.id}
              className="group"
            >
              <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-xs hover:shadow-sm transition-all h-full flex flex-col">
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors">
                    {user.name}
                  </h3>
                  <p className="text-indigo-500 text-sm mt-1">@{user.username}</p>
                  {user.email && (
                    <p className="text-gray-500 text-sm mt-3 truncate">
                      {user.email}
                    </p>
                  )}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                  <span className="text-xs text-gray-400">ID: {user.id}</span>
                  <span className="text-xs font-medium text-indigo-600 hover:text-indigo-700 transition-colors">
                    View profile →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}