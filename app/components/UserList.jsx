'use client'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Link from 'next/link'

const fetchUsers = async () => {
  const { data } = await axios.get('https://jsonplaceholder.typicode.com/users')
  return data
}

export default function UserList({ searchTerm = '' }) {
  const { data: users, isLoading, isError } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers
  })

  if (isLoading) return <div className="text-center py-8">Loading users...</div>
  if (isError) return <div className="text-center py-8 text-red-500">Error loading users</div>
  if (!users) return <div className="text-center py-8">No users found</div>

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Users</h2>
      {filteredUsers.length === 0 ? (
        <div className="text-center py-4">No users found matching "{searchTerm}"</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredUsers.map((user) => (
            <Link href={`/users/${user.id}`} key={user.id} className="block">
              <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <h3 className="font-semibold">{user.name}</h3>
                <p className="text-gray-600">@{user.username}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}