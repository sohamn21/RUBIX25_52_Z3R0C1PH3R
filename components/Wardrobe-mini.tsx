"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

export interface WardrobeItem {
  _id: string
  title: string
  category: string
  type: string
  color: string
  pattern: string
  season: string
  image_url: string
}

interface Props {
  filters: {
    category: string
    color: string
    season: string
  }
  onImageSelect?: (item: WardrobeItem) => void
  selectionMode?: boolean
}

export default function Wardrobemini({ filters, onImageSelect, selectionMode = false }: Props) {
  const [items, setItems] = useState<WardrobeItem[]>([])
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set())

  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    const response = await fetch("/api/wardrobe")
    const data = await response.json()
    setItems(data)
  }

  const toggleItemSelection = (item: WardrobeItem) => {
    if (onImageSelect) {
      onImageSelect(item)
    } else {
      const newSelected = new Set(selectedItems)
      if (newSelected.has(item._id)) {
        newSelected.delete(item._id)
      } else {
        newSelected.add(item._id)
      }
      setSelectedItems(newSelected)
    }
  }

  const filteredItems = items.filter(
    (item) =>
      (!filters.category || item.category === filters.category) &&
      (!filters.color || item.color.toLowerCase().includes(filters.color.toLowerCase())) &&
      (!filters.season || item.season === filters.season),
  )

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {filteredItems.map((item) => (
        <Card
          key={item._id}
          className={`cursor-pointer transition-transform hover:scale-105 ${
            selectedItems.has(item._id) ? "ring-2 ring-primary" : ""
          }`}
          onClick={() => toggleItemSelection(item)}
        >
          <CardContent className="p-2">
            <div className="relative">
              <img
                src={item.image_url || "/placeholder.svg"}
                alt={item.title}
                className="w-full aspect-square object-cover rounded-md"
              />
              {selectionMode && (
                <div className="absolute top-2 right-2">
                  <Checkbox checked={selectedItems.has(item._id)} onCheckedChange={() => toggleItemSelection(item)} />
                </div>
              )}
            </div>
            <div className="mt-2">
              <h3 className="font-medium truncate">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.category}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

