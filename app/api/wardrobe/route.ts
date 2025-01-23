import { NextResponse } from "next/server"
import { MongoClient, ObjectId } from "mongodb"
import { cloudinary } from "@/utils/cloudinary"

const uri =
  process.env.MONGODB_URI ||
  "mongodb+srv://technospace899:OPZx2XScW1LEQDEs@cluster0.0kc0v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const client = new MongoClient(uri)

export async function GET() {
  try {
    await client.connect()
    const database = client.db("wardrobe")
    const items = database.collection("items")
    const result = await items.find({}).toArray()
    return NextResponse.json(result)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "Failed to fetch wardrobe items" }, { status: 500 })
  } finally {
    await client.close()
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const image = formData.get("image") as File | null
    let imageUrl = ""

    if (image) {
      try {
        // Convert the file to a buffer
        const bytes = await new Response(image).arrayBuffer()
        const buffer = Buffer.from(bytes)

        // Convert to base64
        const base64Image = buffer.toString("base64")
        const dataURI = `data:${image.type};base64,${base64Image}`

        // Upload to Cloudinary
        const uploadResponse = await cloudinary.uploader.upload(dataURI, {
          folder: "wardrobe",
        })
        imageUrl = uploadResponse.secure_url
      } catch (cloudinaryError) {
        console.error("Cloudinary upload error:", cloudinaryError)
        return NextResponse.json({ error: "Failed to upload image" }, { status: 500 })
      }
    }

    const item = {
      title: formData.get("title"),
      category: formData.get("category"),
      type: formData.get("type"),
      size: formData.get("size"),
      brand: formData.get("brand"),
      source: formData.get("source"),
      isSecondhand: formData.get("isSecondhand") === "true",
      purchasePrice: formData.get("purchasePrice"),
      purchaseDate: formData.get("purchaseDate"),
      purpose: formData.get("purpose"),
      seasons: formData.get("seasons"),
      occasion: formData.get("occasion"),
      mainColor: formData.get("mainColor"),
      additionalColors: formData.get("additionalColors"),
      pattern: formData.get("pattern"),
      primaryMaterial: formData.get("primaryMaterial"),
      secondaryMaterials: formData.get("secondaryMaterials"),
      style: formData.get("style"),
      embellishments: formData.get("embellishments"),
      designDetails: formData.get("designDetails"),
      personalTags: formData.get("personalTags"),
      notes: formData.get("notes"),
      image_url: imageUrl,
      created_at: new Date(),
    }

    await client.connect()
    const database = client.db("wardrobe")
    const items = database.collection("items")
    const result = await items.insertOne(item)
    return NextResponse.json(result)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "Failed to add wardrobe item" }, { status: 500 })
  } finally {
    await client.close()
  }
}

