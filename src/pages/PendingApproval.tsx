import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

export function PendingApprovalPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <Card className="w-full max-w-sm text-center">
        <CardHeader>
          <CardTitle>Account Pending Approval</CardTitle>
          <CardDescription>
            Your account is currently under review by an administrator.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-2">
            You’ll receive an email notification once your account has been approved.
          </p>
          <p className="text-sm text-muted-foreground">
            Please check your inbox (and spam folder) for updates.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
