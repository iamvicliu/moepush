import { Channel, ChannelFormData } from "@/lib/db/schema/channels"

const API_URL = "/api/channels"

export async function getChannels() {
  const res = await fetch(API_URL)
  if (!res.ok) throw new Error("Failed to fetch channels")
  return res.json() as Promise<Channel[]>
}

export async function createChannel(data: Omit<ChannelFormData, "userId">) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error("Failed to create channel")
  return res.json() as Promise<Channel>
}

export async function updateChannel(id: string, data: Partial<ChannelFormData>) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error("Failed to update channel")
  return res.json() as Promise<Channel>
}

export async function deleteChannel(id: string) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  })
  if (!res.ok) throw new Error("Failed to delete channel")
} 