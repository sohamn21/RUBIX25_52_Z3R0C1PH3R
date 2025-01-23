"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface GeneratedOutfit {
  id: string
  imageUrl: string
}

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

export default function GeneratedOutfits() {
  const [isLoading, setIsLoading] = useState(false)
  const [outfits, setOutfits] = useState<GeneratedOutfit[]>([])
  const [frontOutfit, setFrontOutfit] = useState<string | null>(null)
  const [wardrobeItems, setWardrobeItems] = useState<WardrobeItem[]>([])
  const [occasion, setOccasion] = useState("casual")
  const [purpose, setPurpose] = useState("comfort")
  const [weather, setWeather] = useState("sunny")

  const occasionOptions = ["casual", "work", "party", "formal", "date"]
  const purposeOptions = ["comfort", "professional", "stylish", "athletic", "elegant"]
  const weatherOptions = ["sunny", "rainy", "cold", "hot", "windy"]

  // Fetch wardrobe items from the database
  useEffect(() => {
    const fetchItems = async () => {
      console.log("Fetching wardrobe items from the database...")
      try {
        const response = await fetch("/api/wardrobe")
        if (!response.ok) {
          throw new Error(`Failed to fetch wardrobe items: ${response.statusText}`)
        }
        const data = await response.json()
        console.log("Wardrobe items fetched successfully:", data)
        setWardrobeItems(data)
      } catch (error) {
        console.error("Error fetching wardrobe items:", error)
      }
    }

    fetchItems()
  }, [])

  const generateOutfits = async () => {
    setIsLoading(true)
    console.log("Starting outfit generation...")

    try {
      const imageUrls = wardrobeItems.map(item => item.image_url)
      console.log("Image URLs prepared for Gemini API:", imageUrls)

      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.NEXT_PUBLIC_OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "model": "google/gemini-2.0-flash-thinking-exp-1219:free",
          "messages": [
            {
              "role": "user",
              "content": [
                {
                  "type": "text",
                  "text": `Considering the weather of ${weather}, I'd like suggestions for ${occasion} with a focus on ${purpose}.
                   Analyze these clothing items and suggest 1 random outfit combination. 
                   For the combination, provide only two image URLs (top and bottom) of the generated outfit. 
                   Image URLs: ${imageUrls.join(', ')}`
                },
                ...imageUrls.map(url => ({
                  "type": "image_url",
                  "image_url": { "url": url }
                }))
              ]
            }
          ]
        })
      })

      console.log("Gemini API response received")
      const data = await response.json()

      // Log the API response for debugging
      console.log('API Response:', data)

      if (!data.choices || !data.choices[0] || !data.choices[0].message) {
        throw new Error('Invalid API response structure: ' + JSON.stringify(data))
      }

      const aiResponse = data.choices[0].message.content
      console.log("AI Response Content:", aiResponse)

      // Parse the response to extract generated outfit image URLs
      const outfitImageUrls = aiResponse.match(/https?:\/\/[^\s]+/g) || []
      console.log("Generated Outfit Image URLs:", outfitImageUrls)

      // Map the generated image URLs to the `GeneratedOutfit` format
      const generatedOutfits = outfitImageUrls.map((url, index) => ({
        id: `outfit-${index + 1}`,
        imageUrl: url
      }))

      console.log("Generated Outfits:", generatedOutfits)
      setOutfits(generatedOutfits)
    } catch (error) {
      console.error("Error generating outfits:", error)
    } finally {
      console.log("Outfit generation process completed")
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <select
          value={occasion}
          onChange={(e) => setOccasion(e.target.value)}
          className="rounded-md border border-input bg-background px-3 py-2 text-sm"
        >
          {occasionOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt.charAt(0).toUpperCase() + opt.slice(1)}
            </option>
          ))}
        </select>

        <select
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
          className="rounded-md border border-input bg-background px-3 py-2 text-sm"
        >
          {purposeOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt.charAt(0).toUpperCase() + opt.slice(1)}
            </option>
          ))}
        </select>

        <select
          value={weather}
          onChange={(e) => setWeather(e.target.value)}
          className="rounded-md border border-input bg-background px-3 py-2 text-sm"
        >
          {weatherOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt.charAt(0).toUpperCase() + opt.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={generateOutfits}
        className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
      >
        Generate Outfits
      </button>

      <div className="relative min-h-[300px] sm:min-h-[400px] md:min-h-[500px]">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
            <div className="flex flex-col items-center space-y-4">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">Generating your perfect outfits...</p>
            </div>
          </div>
        ) : (
          <div className="relative h-full w-full">
            {outfits.length > 0 && (
              <div className="flex flex-col items-center sm:block">
                {outfits.map((outfit, index) => (
                  <div
                    key={outfit.id}
                    onClick={() => setFrontOutfit(outfit.id)}
                    className={cn(
                      "relative h-[250px] w-[250px]",
                      "sm:absolute sm:h-[300px] sm:w-[300px]",
                      "md:h-[400px] md:w-[400px]",
                      "overflow-hidden rounded-lg bg-background shadow-xl transition-all duration-300 cursor-pointer",
                      // Mobile view: Move first image to the left, second image to the right
                      index === 0 ? "self-start ml-4" : "self-end mr-4",
                      // Desktop view: Position images absolutely
                      index === 0
                        ? frontOutfit === outfit.id
                          ? "sm:left-0 sm:top-0 z-20"
                          : "sm:left-4 sm:top-4 z-10"
                        : frontOutfit === outfit.id
                          ? "sm:right-0 sm:top-0 z-20 -mt-32 sm:mt-0"
                          : "sm:right-4 sm:top-4 z-10 -mt-32 sm:mt-0",
                    )}
                  >
                    <Image
                      src={outfit.imageUrl || "/placeholder.svg"}
                      alt={`Generated outfit ${index + 1}`}
                      fill
                      className="object-cover transition-all duration-500 hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}