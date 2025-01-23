import React from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Edit } from "lucide-react"

interface WardrobeItem {
  id: string
  title: string
  category: string
  type: string
  size: string
  brand: string
  color: string
  pattern: string
  season: string
  image_url: string
  // Add other properties as needed
}

interface ItemPopupProps {
  item: WardrobeItem
  isOpen: boolean
  onClose: () => void
}

export function ItemPopup({ item, isOpen, onClose }: ItemPopupProps) {
  const router = useRouter()

  const handleEdit = () => {
    router.push(`/edit-item/${item.id}`)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] p-0">
        <div className="flex h-[600px]">
          <div className="w-1/2 relative">
            <Image src={item.image_url || "/placeholder.svg"} alt={item.title} layout="fill" objectFit="cover" />
          </div>
          <div className="w-1/2 p-6 overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">{item.title}</DialogTitle>
            </DialogHeader>
            <div className="mt-4 space-y-4">
              <InfoItem label="Category" value={item.category} />
              <InfoItem label="Type" value={item.type} />
              <InfoItem label="Size" value={item.size} />
              <InfoItem label="Brand" value={item.brand} />
              <InfoItem label="Color" value={item.color} />
              <InfoItem label="Pattern" value={item.pattern} />
              <InfoItem label="Season" value={item.season} />
              {/* Add more item details here */}
            </div>
            <Button onClick={handleEdit} className="mt-6 w-full">
              <Edit className="mr-2 h-4 w-4" /> Edit Item
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="font-semibold">{label}:</span> {value}
    </div>
  )
}

