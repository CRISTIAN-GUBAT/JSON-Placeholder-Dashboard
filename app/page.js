'use client'
import UserList from './components/UserList'
import Charts from './components/Charts'
import SearchFilter from './components/SearchFilter'
import { useState } from 'react'

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <main className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">JSON Placeholder Dashboard</h1>
        <div className="w-64">
          <SearchFilter 
            searchTerm={searchTerm} 
            setSearchTerm={setSearchTerm} 
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <UserList searchTerm={searchTerm} />
        </div>
        <div>
          <Charts />
        </div>
      </div>
    </main>
  )
}