'use client'

export default function SearchFilter({ searchTerm, setSearchTerm }) {
  return (
    <input
      type="text"
      placeholder="Search users..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
    />
  )
}