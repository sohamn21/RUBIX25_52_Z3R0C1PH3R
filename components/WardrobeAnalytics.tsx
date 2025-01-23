"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Pie } from "recharts"

interface WardrobeItem {
  _id: string
  category: string
  color: string
  pattern: string
  season: string
  image_url: string
}

export default function WardrobeAnalytics() {
  const [items, setItems] = useState<WardrobeItem[]>([])

  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    const response = await fetch("/api/wardrobe")
    const data = await response.json()
    setItems(data)
  }

  const getCategoryCounts = () => {
    const counts: { [key: string]: number } = {}
    items.forEach((item) => {
      counts[item.category] = (counts[item.category] || 0) + 1
    })
    return Object.entries(counts).map(([name, value]) => ({ name, value }))
  }

  const getSeasonCounts = () => {
    const counts: { [key: string]: number } = {}
    items.forEach((item) => {
      counts[item.season] = (counts[item.season] || 0) + 1
    })
    return Object.entries(counts).map(([name, value]) => ({ name, value }))
  }

  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Items by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <Pie
            data={getCategoryCounts()}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Items by Season</CardTitle>
        </CardHeader>
        <CardContent>
          <Pie
            data={getSeasonCounts()}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#82ca9d"
            label
          />
        </CardContent>
      </Card>
    </div>
  )
}

