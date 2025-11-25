"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/lib/contexts/auth-context"
import { useRouter } from "next/navigation"
import { WelcomeScreen } from "@/components/welcome-screen"
import { Header } from "@/components/header"

export default function Home() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && !loading && user) {
      router.push("/catalog")
    }
  }, [user, loading, mounted, router])

  if (!mounted || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p>Cargando...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <WelcomeScreen onEnter={() => router.push("/catalog")} />
  }

  return (
    <>
      <Header />
      <main className="min-h-screen" />
    </>
  )
}
