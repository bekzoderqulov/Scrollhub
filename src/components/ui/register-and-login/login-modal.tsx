"use client"

import * as React from "react"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/Librory/button"
import { Card } from "@/components/ui/Librory/card"
import { Input } from "@/components/ui/Librory/input"

interface User {
  name: string
  email: string
  password: string
}

interface LoginModalProps {
  onClose: () => void
  onLogin: (userData: User) => void
}

export default function LoginModal({ onClose, onLogin }: LoginModalProps) {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    // Clear form fields when switching between login and signup
    setEmail("")
    setPassword("")
    setName("")
    setConfirmPassword("")
    setError("")
  }, [isLogin])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (isLogin) {
      // Login process
      const users = JSON.parse(localStorage.getItem("users") || "[]")
      const user = users.find((u: User) => u.email === email && u.password === password)
      if (user) {
        onLogin(user)
      } else {
        setError("Invalid email or password")
      }
    } else {
      // Signup process
      if (password !== confirmPassword) {
        setError("Passwords do not match")
      } else {
        const users = JSON.parse(localStorage.getItem("users") || "[]")
        const existingUser = users.find((u: User) => u.email === email)
        if (existingUser) {
          setError("User with this email already exists")
        } else {
          const newUser = { name, email, password }
          users.push(newUser)
          localStorage.setItem("users", JSON.stringify(users))
          onLogin(newUser)
        }
      }
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <Card className="w-full max-w-md p-6 relative">
        <Button variant="ghost" size="icon" className="absolute top-2 right-2" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
        <h2 className="text-2xl font-bold mb-4">{isLogin ? "Login" : "Sign Up"}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <Input placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
          )}
          <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {!isLogin && (
            <Input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          )}
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button type="submit" className="w-full bg-[#143054] hover:bg-[#143054]/90 text-white">
            {isLogin ? "Login" : "Sign Up"}
          </Button>
        </form>
        <p className="mt-4 text-center text-sm">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <Button variant="link" onClick={() => setIsLogin(!isLogin)} className="p-0">
            {isLogin ? "Sign Up" : "Login"}
          </Button>
        </p>
      </Card>
    </div>
  )
}

