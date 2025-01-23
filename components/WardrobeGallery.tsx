"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ItemPopup } from "./ItemPopup"

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

interface Filters {
  category: string
  color: string
  season: string
}

export default function WardrobeGallery({ filters }: { filters: Filters }) {
  const [items, setItems] = useState<WardrobeItem[]>([])
  const [selectedItem, setSelectedItem] = useState<WardrobeItem | null>(null)
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    const response = await fetch("/api/wardrobe")
    const data = await response.json()
    setItems(data)
  }

  const deleteItem = async (id: string) => {
    await fetch(`/api/wardrobe/${id}`, { method: "DELETE" })
    fetchItems()
  }

  const openItemPopup = (item: WardrobeItem) => {
    setSelectedItem(item)
    setIsPopupOpen(true)
  }

  const closeItemPopup = () => {
    setSelectedItem(null)
    setIsPopupOpen(false)
  }

  const saveItemChanges = async (updatedItem: WardrobeItem) => {
    await fetch(`/api/wardrobe/${updatedItem._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedItem),
    })
    fetchItems()
  }

  const filteredItems = items.filter(
    (item) =>
      (!filters.category || item.category === filters.category) &&
      (!filters.color || item.color.toLowerCase().includes(filters.color.toLowerCase())) &&
      (!filters.season || item.season === filters.season),
  )

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
      {filteredItems.map((item) => (
        <Card key={item._id} className="cursor-pointer" onClick={() => openItemPopup(item)}>
          <CardContent className="p-4">
            <img
              src={item.image_url || "/placeholder.svg"}
              alt={item.title}
              className="w-full h-48 object-cover mb-4 rounded-md"
            />
            <h3 className="font-bold">{item.title}</h3>
            <p>Category: {item.category}</p>
            <p>Type: {item.type}</p>
            <p>Color: {item.color}</p>
            <p>Pattern: {item.pattern}</p>
            <p>Season: {item.season}</p>
            <Button
              onClick={(e) => {
                e.stopPropagation()
                deleteItem(item._id)
              }}
              className="mt-4"
            >
              Delete
            </Button>
          </CardContent>
        </Card>
      ))}
      {selectedItem && (
        <ItemPopup item={selectedItem} isOpen={isPopupOpen} onClose={closeItemPopup} onSave={saveItemChanges} />
      )}
    </div>
  )
}

