import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface DashboardTemplateProps {
  title: string
  description?: string
}

export function DashboardTemplate({ title, description }: DashboardTemplateProps) {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <p className="text-muted-foreground mb-8">
        {description || `Welcome to your ${title.toLowerCase()} dashboard.`}
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
