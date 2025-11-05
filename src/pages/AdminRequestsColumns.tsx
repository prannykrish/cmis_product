import { useState } from "react"
import type { ColumnDef } from "@tanstack/react-table"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

export const columns = (refresh: () => void): ColumnDef<any>[] => [
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "created_at",
    header: "Date Requested",
    cell: ({ row }) => new Date(row.original.created_at).toLocaleString(),
  },
  {
    header: "Assign Role",
    cell: ({ row }) => {
      const roles = [
        "student",
        "faculty",
        "admin",
        "alumni",
        "industry_exabyte",
        "industry_petabyte",
        "industry_terabyte",
      ]

      const [selectedRole, setSelectedRole] = useState("")
      const [updating, setUpdating] = useState(false)
      const [message, setMessage] = useState("")

      const handleUpdate = async () => {
        if (!selectedRole) {
          setMessage("⚠️ Please select a role first.")
          return
        }

        setUpdating(true)
        setMessage("")

        try {
          const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/updateRole`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: row.original.email, role: selectedRole }),
          })
          if (!res.ok) throw new Error("Failed to update role")

          setMessage("✅ Updated!")
          refresh() // refresh table after success
        } catch (err) {
          console.error("Error updating role:", err)
          setMessage("❌ Failed to update.")
        } finally {
          setUpdating(false)
        }
      }

      return (
        <div className="flex items-center gap-2">
          <Select onValueChange={setSelectedRole}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              {roles.map((r) => (
                <SelectItem key={r} value={r}>
                  {r.charAt(0).toUpperCase() + r.slice(1).replace("_", " ")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            size="sm"
            className="bg-primary hover:bg-primary/90"
            disabled={updating}
            onClick={handleUpdate}
          >
            {updating ? "Updating..." : "Update"}
          </Button>

          {message && <p className="text-xs text-muted-foreground ml-2">{message}</p>}
        </div>
      )
    },
  },
]
