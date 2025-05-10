'use client'
import UserList from './components/UserList'
import Charts from './components/Charts'
import SearchFilter from './components/SearchFilter'
import { useState } from 'react'

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState<'users' | 'charts'>('users')
  
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">JSON Placeholder Dashboard</h1>
            <p className="text-sm text-gray-500 mt-1">Manage and visualize user data</p>
          </div>
          <div className="w-full md:w-64">
            <SearchFilter 
              searchTerm={searchTerm} 
              setSearchTerm={setSearchTerm} 
            />
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('users')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'users' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              User Directory
            </button>
            <button
              onClick={() => setActiveTab('charts')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'charts' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              Data Visualization
            </button>
          </nav>
        </div>
        
        {/* Main Content */}
        {activeTab === 'users' ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <h2 className="text-lg font-semibold text-gray-700">User Directory</h2>
            </div>
            <UserList searchTerm={searchTerm} />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <h2 className="text-lg font-semibold text-gray-700">Data Visualization</h2>
              </div>
              <div className="p-4">
                <Charts />
              </div>
            </div>
            
            {/* Optional: Add more cards/widgets here */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h3 className="font-medium text-gray-700 mb-2">Quick Stats</h3>
              <p className="text-sm text-gray-500">Dashboard overview coming soon</p>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}