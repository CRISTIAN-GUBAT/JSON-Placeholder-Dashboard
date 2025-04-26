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

  if (usersLoading || postsLoading || commentsLoading) return <div>Loading chart data...</div>
  if (usersError || postsError || commentsError) return <div>Error loading chart data</div>

  const chartOptions = {
    chart: {
      type: 'bar',
      height: 350
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded'
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
      categories: ['Users', 'Posts', 'Comments']
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val
        }
      }
    }
  }

  const chartSeries = [{
    name: 'Count',
    data: [
      users?.length || 0,
      posts?.length || 0,
      comments?.length || 0
    ]
  }]

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-xl font-semibold mb-4">Data Overview</h3>
      <Chart
        options={chartOptions}
        series={chartSeries}
        type="bar"
        height={350}
      />
    </div>
  )
}