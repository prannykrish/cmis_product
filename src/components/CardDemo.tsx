import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

export function CardDemo() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const API_URL = import.meta.env.VITE_API_URL

  // --- SIGN UP HANDLER ---
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage("Creating account...")

    try {
      const res = await fetch(`${API_URL}/auth/signUp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
        }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Signup failed")

      // Store the pending email for verification
      localStorage.setItem("pendingEmail", email)
      setMessage("Redirecting to verification...")

      setTimeout(() => navigate("/verify"), 1000)
    } catch (err: any) {
      setMessage(`❌ ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  // --- LOGIN HANDLER ---
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage("Logging in...")

    try {
      const res = await fetch(`${API_URL}/auth/logIn`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Login failed")

      setMessage("✅ Login successful! Redirecting...")

      const role = data.user?.role

      // --- ROLE-BASED ROUTING ---
      if (role === "admin") {
        setTimeout(() => navigate("/dashboard/admin"), 1000)
      } else if (role === "student") {
        setTimeout(() => navigate("/dashboard/student"), 1000)
      } else if (role === "faculty") {
        setTimeout(() => navigate("/dashboard/faculty"), 1000)
      } else if (role === "alumni") {
        setTimeout(() => navigate("/dashboard/alumni"), 1000)
      } else if (role?.includes("industry")) {
        setTimeout(() => navigate(`/dashboard/${role}`), 1000)
      } else {
        // No assigned role → pending admin approval
        setTimeout(() => navigate("/pending-approval"), 1000)
      }
    } catch (err: any) {
      setMessage(`❌ ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <Tabs defaultValue="login" className="w-full max-w-sm">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>

        {/* LOGIN TAB */}
        <TabsContent value="login">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Login to your account</CardTitle>
              <CardDescription>Enter your email and password below.</CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleLogin}>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="m@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="login-password">Password</Label>
                    <Input
                      id="login-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                  </Button>
                </div>
              </form>

              {message && <p className="text-sm mt-3 text-center">{message}</p>}
            </CardContent>

            <CardFooter className="flex-col gap-2">
              <Button variant="outline" className="w-full">
                Login with Google
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* SIGNUP TAB */}
        <TabsContent value="signup">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Create an account</CardTitle>
              <CardDescription>Enter your details to sign up.</CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSignup}>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="m@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Signing up..." : "Sign Up"}
                  </Button>
                </div>
              </form>

              {message && <p className="text-sm mt-3 text-center">{message}</p>}
            </CardContent>

            <CardFooter className="flex-col gap-2">
              <Button variant="outline" className="w-full">
                Sign Up with Google
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
