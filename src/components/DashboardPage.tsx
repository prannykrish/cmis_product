import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function DashboardPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Welcome!</h2>
      <p className="text-muted-foreground mb-8">
        Welcome to your organization dashboard.
      </p>

      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Quick Access</CardTitle>
          <CardDescription>Access your main portal modules below.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="w-full bg-primary hover:bg-primary/90">
            Go to Portal
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
