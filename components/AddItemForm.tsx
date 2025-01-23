"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import { Camera, Pencil } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"

export default function AddItemForm() {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    type: "",
    size: "",
    brand: "",
    source: "",
    isSecondhand: false,
    purchasePrice: "",
    purchaseDate: new Date(),
    purpose: "",
    seasons: "",
    occasion: "",
    mainColor: "",
    additionalColors: "",
    pattern: "",
    primaryMaterial: "",
    secondaryMaterials: "",
    style: "",
    embellishments: "",
    designDetails: "",
    personalTags: "",
    notes: "",
    image: null as File | null,
  })

  const handleImageCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      // Here you would typically show a video preview and capture button
      // For simplicity, we'll just use the file input for now
    } catch (err) {
      console.error("Error accessing camera:", err)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const form = new FormData()

    // Add all form fields to FormData
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) {
        if (key === "purchaseDate") {
          form.append(key, value.toISOString())
        } else if (key === "isSecondhand") {
          form.append(key, value.toString())
        } else {
          form.append(key, value)
        }
      }
    })

    try {
      const response = await fetch("/api/wardrobe", {
        method: "POST",
        body: form,
      })

      if (!response.ok) {
        throw new Error("Failed to save item")
      }

      // Reset form after successful submission
      setFormData({
        title: "",
        category: "",
        type: "",
        size: "",
        brand: "",
        source: "",
        isSecondhand: false,
        purchasePrice: "",
        purchaseDate: new Date(),
        purpose: "",
        seasons: "",
        occasion: "",
        mainColor: "",
        additionalColors: "",
        pattern: "",
        primaryMaterial: "",
        secondaryMaterials: "",
        style: "",
        embellishments: "",
        designDetails: "",
        personalTags: "",
        notes: "",
        image: null,
      })
    } catch (error) {
      console.error("Error saving item:", error)
      // You might want to show an error message to the user here
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 dark">
      <Card className="bg-background">
        <CardHeader>
          <CardTitle>General Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <div className="flex gap-2">
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
              <Button variant="outline" size="icon">
                <Pencil className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select onValueChange={(value) => setFormData({ ...formData, category: value, type: "" })}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tops">Tops</SelectItem>
                <SelectItem value="bottoms">Bottoms</SelectItem>
                <SelectItem value="dresses">Dresses</SelectItem>
                <SelectItem value="outerwear">Outerwear</SelectItem>
                <SelectItem value="shoes">Shoes</SelectItem>
                <SelectItem value="accessories">Accessories</SelectItem>
                <SelectItem value="bags">Bags</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Type</Label>
            <Select onValueChange={(value) => setFormData({ ...formData, type: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {formData.category === "tops" && (
                  <>
                    <SelectItem value="tshirt">T-Shirt</SelectItem>
                    <SelectItem value="shirt">Shirt</SelectItem>
                    <SelectItem value="blouse">Blouse</SelectItem>
                    <SelectItem value="sweater">Sweater</SelectItem>
                  </>
                )}
                {formData.category === "bottoms" && (
                  <>
                    <SelectItem value="jeans">Jeans</SelectItem>
                    <SelectItem value="pants">Pants</SelectItem>
                    <SelectItem value="shorts">Shorts</SelectItem>
                    <SelectItem value="skirt">Skirt</SelectItem>
                  </>
                )}
                {formData.category === "dresses" && (
                  <>
                    <SelectItem value="casual">Casual Dress</SelectItem>
                    <SelectItem value="formal">Formal Dress</SelectItem>
                    <SelectItem value="cocktail">Cocktail Dress</SelectItem>
                  </>
                )}
                {formData.category === "outerwear" && (
                  <>
                    <SelectItem value="jacket">Jacket</SelectItem>
                    <SelectItem value="coat">Coat</SelectItem>
                    <SelectItem value="blazer">Blazer</SelectItem>
                  </>
                )}
                {formData.category === "shoes" && (
                  <>
                    <SelectItem value="sneakers">Sneakers</SelectItem>
                    <SelectItem value="boots">Boots</SelectItem>
                    <SelectItem value="sandals">Sandals</SelectItem>
                    <SelectItem value="heels">Heels</SelectItem>
                    <SelectItem value="flats">Flats</SelectItem>
                  </>
                )}
                {formData.category === "accessories" && (
                  <>
                    <SelectItem value="jewelry">Jewelry</SelectItem>
                    <SelectItem value="bag">Bag</SelectItem>
                    <SelectItem value="hat">Hat</SelectItem>
                    <SelectItem value="scarf">Scarf</SelectItem>
                  </>
                )}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="size">Size</Label>
            <div className="flex gap-2">
              <Input
                id="size"
                value={formData.size}
                onChange={(e) => setFormData({ ...formData, size: e.target.value })}
              />
              <Button variant="outline" size="icon">
                <Pencil className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-background">
        <CardHeader>
          <CardTitle>Origin</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="brand">Brand</Label>
            <div className="flex gap-2">
              <Input
                id="brand"
                value={formData.brand}
                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
              />
              <Button variant="outline" size="icon">
                <Pencil className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="source">Source</Label>
            <Select onValueChange={(value) => setFormData({ ...formData, source: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="retail">Retail Store</SelectItem>
                <SelectItem value="online">Online Shop</SelectItem>
                <SelectItem value="thrift">Thrift Store</SelectItem>
                <SelectItem value="gift">Gift</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="secondhand"
              checked={formData.isSecondhand}
              onCheckedChange={(checked) => setFormData({ ...formData, isSecondhand: checked as boolean })}
            />
            <Label htmlFor="secondhand">Secondhand / Thrifted / Vintage</Label>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-background">
        <CardHeader>
          <CardTitle>Purchase Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="purchasePrice">Purchase Price</Label>
            <div className="flex gap-2">
              <Input
                id="purchasePrice"
                type="number"
                value={formData.purchasePrice}
                onChange={(e) => setFormData({ ...formData, purchasePrice: e.target.value })}
              />
              <Button variant="outline" size="icon">
                <Pencil className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Purchase Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  {formData.purchaseDate ? format(formData.purchaseDate, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={formData.purchaseDate}
                  onSelect={(date) => date && setFormData({ ...formData, purchaseDate: date })}
                />
              </PopoverContent>
            </Popover>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-background">
        <CardHeader>
          <CardTitle>Usage Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="purpose">Purpose</Label>
            <Select onValueChange={(value) => setFormData({ ...formData, purpose: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select purpose" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="casual">Casual</SelectItem>
                <SelectItem value="work">Work</SelectItem>
                <SelectItem value="formal">Formal</SelectItem>
                <SelectItem value="sport">Sport</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="seasons">Seasons</Label>
            <Select onValueChange={(value) => setFormData({ ...formData, seasons: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select seasons" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="spring">Spring</SelectItem>
                <SelectItem value="summer">Summer</SelectItem>
                <SelectItem value="autumn">Autumn</SelectItem>
                <SelectItem value="winter">Winter</SelectItem>
                <SelectItem value="all">All Seasons</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="occasion">Occasion</Label>
            <Select onValueChange={(value) => setFormData({ ...formData, occasion: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select occasion" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="everyday">Everyday</SelectItem>
                <SelectItem value="work">Work</SelectItem>
                <SelectItem value="party">Party</SelectItem>
                <SelectItem value="special">Special Event</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-background">
        <CardHeader>
          <CardTitle>Visual Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="mainColor">Main Color</Label>
            <Select onValueChange={(value) => setFormData({ ...formData, mainColor: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select main color" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="black">Black</SelectItem>
                <SelectItem value="white">White</SelectItem>
                <SelectItem value="red">Red</SelectItem>
                <SelectItem value="blue">Blue</SelectItem>
                <SelectItem value="green">Green</SelectItem>
                <SelectItem value="yellow">Yellow</SelectItem>
                <SelectItem value="purple">Purple</SelectItem>
                <SelectItem value="pink">Pink</SelectItem>
                <SelectItem value="brown">Brown</SelectItem>
                <SelectItem value="gray">Gray</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="additionalColors">Additional Colors</Label>
            <Select onValueChange={(value) => setFormData({ ...formData, additionalColors: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select additional colors" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="black">Black</SelectItem>
                <SelectItem value="white">White</SelectItem>
                <SelectItem value="red">Red</SelectItem>
                <SelectItem value="blue">Blue</SelectItem>
                <SelectItem value="green">Green</SelectItem>
                <SelectItem value="yellow">Yellow</SelectItem>
                <SelectItem value="purple">Purple</SelectItem>
                <SelectItem value="pink">Pink</SelectItem>
                <SelectItem value="brown">Brown</SelectItem>
                <SelectItem value="gray">Gray</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="pattern">Pattern</Label>
            <Select onValueChange={(value) => setFormData({ ...formData, pattern: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select pattern" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="solid">Solid</SelectItem>
                <SelectItem value="striped">Striped</SelectItem>
                <SelectItem value="plaid">Plaid</SelectItem>
                <SelectItem value="floral">Floral</SelectItem>
                <SelectItem value="polkadot">Polka Dot</SelectItem>
                <SelectItem value="geometric">Geometric</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-background">
        <CardHeader>
          <CardTitle>Material Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="primaryMaterial">Primary Material</Label>
            <Select onValueChange={(value) => setFormData({ ...formData, primaryMaterial: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select primary material" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cotton">Cotton</SelectItem>
                <SelectItem value="polyester">Polyester</SelectItem>
                <SelectItem value="wool">Wool</SelectItem>
                <SelectItem value="silk">Silk</SelectItem>
                <SelectItem value="linen">Linen</SelectItem>
                <SelectItem value="leather">Leather</SelectItem>
                <SelectItem value="denim">Denim</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="secondaryMaterials">Secondary Materials</Label>
            <Select onValueChange={(value) => setFormData({ ...formData, secondaryMaterials: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select secondary materials" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cotton">Cotton</SelectItem>
                <SelectItem value="polyester">Polyester</SelectItem>
                <SelectItem value="wool">Wool</SelectItem>
                <SelectItem value="silk">Silk</SelectItem>
                <SelectItem value="linen">Linen</SelectItem>
                <SelectItem value="leather">Leather</SelectItem>
                <SelectItem value="denim">Denim</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-background">
        <CardHeader>
          <CardTitle>Style Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="style">Style</Label>
            <Select onValueChange={(value) => setFormData({ ...formData, style: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="casual">Casual</SelectItem>
                <SelectItem value="formal">Formal</SelectItem>
                <SelectItem value="streetwear">Streetwear</SelectItem>
                <SelectItem value="vintage">Vintage</SelectItem>
                <SelectItem value="bohemian">Bohemian</SelectItem>
                <SelectItem value="minimalist">Minimalist</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="embellishments">Embellishments</Label>
            <Select onValueChange={(value) => setFormData({ ...formData, embellishments: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select embellishments" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="sequins">Sequins</SelectItem>
                <SelectItem value="beads">Beads</SelectItem>
                <SelectItem value="embroidery">Embroidery</SelectItem>
                <SelectItem value="applique">Applique</SelectItem>
                <SelectItem value="studs">Studs</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="designDetails">Design Details</Label>
            <Select onValueChange={(value) => setFormData({ ...formData, designDetails: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select design details" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ruffles">Ruffles</SelectItem>
                <SelectItem value="pleats">Pleats</SelectItem>
                <SelectItem value="pockets">Pockets</SelectItem>
                <SelectItem value="buttons">Buttons</SelectItem>
                <SelectItem value="zippers">Zippers</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-background">
        <CardHeader>
          <CardTitle>Personal Tags & Notes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="personalTags">Personal Tags</Label>
            <Input
              id="personalTags"
              value={formData.personalTags}
              onChange={(e) => setFormData({ ...formData, personalTags: e.target.value })}
              placeholder="Add personal tags"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <div className="flex gap-2">
              <Input
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Add text here"
              />
              <Button variant="outline" size="icon">
                <Pencil className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-background">
        <CardHeader>
          <CardTitle>Image Upload</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Button type="button" variant="outline" className="h-32" onClick={handleImageCapture}>
              <Camera className="h-6 w-6 mr-2" />
              Take Photo
            </Button>
            <div className="relative h-32">
              <Input
                type="file"
                accept="image/*"
                capture="environment"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) {
                    setFormData({ ...formData, image: file })
                  }
                }}
              />
              <Button variant="outline" className="w-full h-full">
                Upload Image
              </Button>
            </div>
          </div>
          {formData.image && (
            <div className="relative w-full h-48">
              <img
                src={URL.createObjectURL(formData.image) || "/placeholder.svg"}
                alt="Preview"
                className="w-full h-full object-cover rounded-lg"
              />
              <Button
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2"
                onClick={() => setFormData({ ...formData, image: null })}
              >
                Remove
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Button type="submit" className="w-full">
        Save Item
      </Button>
    </form>
  )
}

