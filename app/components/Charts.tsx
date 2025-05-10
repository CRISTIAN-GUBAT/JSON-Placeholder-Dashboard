'use client'

import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import dynamic from 'next/dynamic'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

export default function Charts() {
  const { data: users, isLoading: usersLoading, error: usersError } = useQuery({
    queryKey: ['users'],
    queryFn: () => axios.get('https://jsonplaceholder.typicode.com/users').then(res => res.data)
  })
  
  const { data: posts, isLoading: postsLoading, error: postsError } = useQuery({
    queryKey: ['posts'],
    queryFn: () => axios.get('https://jsonplaceholder.typicode.com/posts').then(res => res.data)
  })
  
  const { data: comments, isLoading: commentsLoading, error: commentsError } = useQuery({
    queryKey: ['comments'],
    queryFn: () => axios.get('https://jsonplaceholder.typicode.com/comments').then(res => res.data)
  })

  const chartOptions: ApexCharts.ApexOptions = {
    chart: {
      type: 'bar',
      height: 350,
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true
        }
      },
      fontFamily: 'Inter, sans-serif',
      background: 'transparent',
      foreColor: '#6b7280',
    },
    colors: ['#6366f1', '#8b5cf6', '#ec4899'], // Indigo, purple, pink
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        borderRadius: 8,
        distributed: false,
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: ['Users', 'Posts', 'Comments'],
      labels: {
        style: {
          fontSize: '14px',
          fontWeight: 600,
          colors: '#111827'
        }
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    },
    yaxis: {
      title: {
        text: 'Count',
        style: {
          fontSize: '14px',
          fontWeight: 600,
          color: '#111827'
        }
      },
      labels: {
        style: {
          colors: '#6b7280'
        }
      }
    },
    fill: {
      opacity: 1,
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: 'vertical',
        shadeIntensity: 0.3,
        gradientToColors: ['#6366f1', '#8b5cf6', '#ec4899'],
        inverseColors: false,
        opacityFrom: 0.8,
        opacityTo: 0.2,
      }
    },
    tooltip: {
      enabled: true,
      style: {
        fontSize: '12px',
        fontFamily: 'Inter, sans-serif'
      },
      theme: 'dark',
      y: {
        formatter: function (val) {
          return val.toString()
        }
      }
    },
    grid: {
      borderColor: '#f3f4f6',
      strokeDashArray: 4,
      xaxis: {
        lines: {
          show: false
        }
      },
      yaxis: {
        lines: {
          show: true
        }
      }
    },
    responsive: [{
      breakpoint: 640,
      options: {
        chart: {
          height: 300
        },
        plotOptions: {
          bar: {
            borderRadius: 6
          }
        }
      }
    }]
  }

  const chartSeries = [{
    name: 'Count',
    data: [
      users?.length || 0,
      posts?.length || 0,
      comments?.length || 0
    ]
  }]

  if (usersLoading || postsLoading || commentsLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center mb-4 text-sm text-gray-500 font-mono bg-gray-50 py-2 rounded-lg">use client</div>
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <div className="animate-pulse">
            <div className="h-6 w-1/3 bg-gray-200 rounded mb-4"></div>
            <div className="h-64 bg-gray-100 rounded-lg"></div>
            <div className="mt-6 grid grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-2">
                  <div className="h-4 w-16 bg-gray-200 rounded mx-auto"></div>
                  <div className="h-8 w-20 bg-gray-200 rounded mx-auto"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (usersError || postsError || commentsError) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <div className="text-center py-8">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 mb-4">
              <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">Failed to load chart data</h3>
            <p className="text-gray-500 mb-4">Please try again later</p>
            <button 
              onClick={() => window.location.reload()}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold text-gray-900">Data Overview</h3>
            <p className="text-sm text-gray-500">Statistics from JSONPlaceholder API</p>
          </div>
          <div className="flex space-x-4">
            <div className="flex items-center">
              <span className="w-3 h-3 rounded-full bg-indigo-500 mr-2"></span>
              <span className="text-xs font-medium text-gray-500">Count</span>
            </div>
          </div>
        </div>
        
        <div className="chart-container">
          <Chart
            options={chartOptions}
            series={chartSeries}
            type="bar"
            height={350}
          />
        </div>
        
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-indigo-50 rounded-lg transition-all hover:shadow-md">
            <p className="text-sm font-medium text-indigo-700 mb-1">Users</p>
            <p className="text-2xl font-bold text-gray-900">{users?.length || 0}</p>
            <p className="text-xs text-indigo-500 mt-1">+{Math.floor(users?.length / 10)}% from last week</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg transition-all hover:shadow-md">
            <p className="text-sm font-medium text-purple-700 mb-1">Posts</p>
            <p className="text-2xl font-bold text-gray-900">{posts?.length || 0}</p>
            <p className="text-xs text-purple-500 mt-1">+{Math.floor(posts?.length / 100)}% from last week</p>
          </div>
          <div className="p-4 bg-pink-50 rounded-lg transition-all hover:shadow-md">
            <p className="text-sm font-medium text-pink-700 mb-1">Comments</p>
            <p className="text-2xl font-bold text-gray-900">{comments?.length || 0}</p>
            <p className="text-xs text-pink-500 mt-1">+{Math.floor(comments?.length / 500)}% from last week</p>
          </div>
        </div>
      </div>
    </div>
  )
}