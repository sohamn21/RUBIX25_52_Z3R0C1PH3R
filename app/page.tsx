"use client"

import { useState } from "react"
import WardrobeGallery from "../components/WardrobeGallery"
import AddItemForm from "../components/AddItemForm"
import OutfitSuggestions from "../components/OutfitSuggestions"
import WardrobeAnalytics from "../components/WardrobeAnalytics"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function Home() {
  const [filters, setFilters] = useState({
    category: "",
    color: "",
    season: "",
  })

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold text-center my-8">Fashion AI Wardrobe Assistant</h1>
      <Tabs defaultValue="wardrobe">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="wardrobe">Wardrobe</TabsTrigger>
          <TabsTrigger value="add">Add Item</TabsTrigger>
          <TabsTrigger value="outfits">Outfit Suggestions</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="wardrobe">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <Label htmlFor="category">Category</Label>
              <Select onValueChange={(value) => handleFilterChange("category", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="shirt">Shirt</SelectItem>
                  <SelectItem value="pants">Pants</SelectItem>
                  <SelectItem value="dress">Dress</SelectItem>
                  <SelectItem value="shoes">Shoes</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="color">Color</Label>
              <Input
                type="text"
                id="color"
                placeholder="Enter color"
                onChange={(e) => handleFilterChange("color", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="season">Season</Label>
              <Select onValueChange={(value) => handleFilterChange("season", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="All Seasons" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Seasons</SelectItem>
                  <SelectItem value="spring">Spring</SelectItem>
                  <SelectItem value="summer">Summer</SelectItem>
                  <SelectItem value="autumn">Autumn</SelectItem>
                  <SelectItem value="winter">Winter</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <WardrobeGallery filters={filters} />
        </TabsContent>
        <TabsContent value="add">
          <AddItemForm />
        </TabsContent>
        <TabsContent value="outfits">
          <OutfitSuggestions />
        </TabsContent>
        <TabsContent value="analytics">
          <WardrobeAnalytics />
        </TabsContent>
      </Tabs>
    </div>
  )
}

