"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface WardrobeItem {
  _id: string
  category: string
  color: string
  pattern: string
  season: string
  image_url: string
}

export default function OutfitSuggestions() {
  const [items, setItems] = useState<WardrobeItem[]>([])
  const [outfit, setOutfit] = useState<WardrobeItem[]>([])

  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    const response = await fetch("/api/wardrobe")
    const data = await response.json()
    setItems(data)
  }

  const generateOutfit = () => {
    const categories = ["shirt", "pants", "shoes"]
    const newOutfit = categories
      .map((category) => {
        const categoryItems = items.filter((item) => item.category === category)
        return categoryItems[Math.floor(Math.random() * categoryItems.length)]
      })
      .filter(Boolean)
    setOutfit(newOutfit)
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Outfit Suggestions</h2>
      <Button onClick={generateOutfit}>Generate Outfit</Button>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {outfit.map((item) => (
          <Card key={item._id}>
            <CardContent className="p-4">
              <img
                src={item.image_url || "/placeholder.svg"}
                alt={item.category}
                className="w-full h-48 object-cover mb-4"
              />
              <h3 className="font-bold">{item.category}</h3>
              <p>Color: {item.color}</p>
              <p>Pattern: {item.pattern}</p>
              <p>Season: {item.season}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

