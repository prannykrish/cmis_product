import { useEffect, useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { DataTable } from "@/components/DataTable"
import { columns } from "./AdminRequestsColumns"

export function AdminRequestsPage() {
  const [users, setUsers] = useState<any[]>([])
  const API_URL = import.meta.env.VITE_API_URL

  // ✅ Fetch pending users from backend
  const fetchPendingUsers = async () => {
    try {
      const res = await fetch(`${API_URL}/auth/pendingUsers`)
      if (!res.ok) throw new Error("Failed to fetch pending users")
      const data = await res.json()
      setUsers(data)
    } catch (err) {
      console.error("Failed to fetch pending users:", err)
    }
  }

  useEffect(() => {
    fetchPendingUsers()
  }, [])

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Pending User Requests</CardTitle>
      </CardHeader>

      <CardContent>
        <DataTable columns={columns(fetchPendingUsers)} data={users} />
      </CardContent>
    </Card>
  )
}
