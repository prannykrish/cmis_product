import { BrowserRouter, Routes, Route } from "react-router-dom"
import { CardDemo } from "./components/CardDemo"
import { VerifyPage } from "./components/Verify"
import { PendingApprovalPage } from "./pages/PendingApproval"


// Dashboards
import { StudentDashboard } from "./pages/StudentDashboard"
import { FacultyDashboard } from "./pages/FacultyDashboard"
import { AdminDashboard } from "./pages/AdminDashboard"
import { IndustryExabyteDashboard } from "./pages/IndustryExabyteDashboard"
import { IndustryPetabyteDashboard } from "./pages/IndustryPetabyteDashboard"
import { IndustryTerabyteDashboard } from "./pages/IndustryTerabyteDashboard"
import { AlumniDashboard } from "./pages/AlumniDashboard"
import { AdminRequestsPage } from "@/pages/AdminRequestsPage"
import Layout from "@/components/layouts/DashboardLayout"


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth */}
        <Route path="/" element={<CardDemo />} />
        <Route path="/verify" element={<VerifyPage />} />
        <Route path="/pending-approval" element={<PendingApprovalPage />} />

        {/* Dashboards */}
        <Route path="/dashboard/student" element={<StudentDashboard />} />
        <Route path="/dashboard/faculty" element={<FacultyDashboard />} />
        
        <Route path="/dashboard/admin" element={<AdminDashboard />} />
<Route
  path="/dashboard/admin/requests"
  element={
    <Layout role="admin">
      <AdminRequestsPage />
    </Layout>
  }
/>
        <Route path="/dashboard/industry/exabyte" element={<IndustryExabyteDashboard />} />
        <Route path="/dashboard/industry/petabyte" element={<IndustryPetabyteDashboard />} />
        <Route path="/dashboard/industry/terabyte" element={<IndustryTerabyteDashboard />} />
        <Route path="/dashboard/alumni" element={<AlumniDashboard />} />
      </Routes>
    </BrowserRouter>
  )
}
