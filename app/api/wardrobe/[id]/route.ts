import { NextResponse } from "next/server"
import { MongoClient, ObjectId } from "mongodb"

const uri =
  process.env.MONGODB_URI ||
  "mongodb+srv://technospace899:OPZx2XScW1LEQDEs@cluster0.0kc0v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const client = new MongoClient(uri)

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    await client.connect()
    const database = client.db("wardrobe")
    const items = database.collection("items")
    const result = await items.updateOne({ _id: new ObjectId(params.id) }, { $set: body })
    return NextResponse.json(result)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "Failed to update wardrobe item" }, { status: 500 })
  } finally {
    await client.close()
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await client.connect()
    const database = client.db("wardrobe")
    const items = database.collection("items")
    const result = await items.deleteOne({ _id: new ObjectId(params.id) })
    return NextResponse.json(result)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "Failed to delete wardrobe item" }, { status: 500 })
  } finally {
    await client.close()
  }
}

