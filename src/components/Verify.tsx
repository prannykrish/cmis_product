import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"

export function VerifyPage() {
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const navigate = useNavigate()
  const API_URL = import.meta.env.VITE_API_URL

  // ✅ Load the email saved after signup
  useEffect(() => {
    const savedEmail = localStorage.getItem("pendingEmail")
    if (savedEmail) {
      setEmail(savedEmail)
      console.log("Loaded email from localStorage:", savedEmail)
    } else {
      console.warn("No email found in localStorage — redirecting to signup")
      navigate("/signup") // optional fallback
    }
  }, [navigate])

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage("Verifying code...")

    try {
      const res = await fetch(`${API_URL}/auth/verifyEmail`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code: otp }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Verification failed")

      setMessage("✅ Email verified! Redirecting to dashboard...")
      localStorage.removeItem("pendingEmail") // cleanup
      setTimeout(() => navigate("/pending-approval"), 1500)
    } catch (err: any) {
      setMessage(`❌ ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Verify your email</CardTitle>
          <CardDescription>
            We’ve sent a 6-digit verification code to your email. Enter it below to complete signup.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleVerify} className="flex flex-col gap-6 items-center">
            <InputOTP maxLength={6} value={otp} onChange={setOtp}>
              <InputOTPGroup>
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <InputOTPSlot key={i} index={i} />
                ))}
              </InputOTPGroup>
            </InputOTP>

            <Button type="submit" className="w-full" disabled={loading || otp.length < 6}>
              {loading ? "Verifying..." : "Verify"}
            </Button>

            {message && <p className="text-sm text-center mt-2">{message}</p>}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
