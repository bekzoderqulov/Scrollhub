"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/Librory/button"
import { Card } from "@/components/ui/Librory/card"

interface User {
  name: string
  email: string
}

interface AccountMenuProps {
  user: User
  onLogout: () => void
}

export default function AccountMenu({ user, onLogout }: AccountMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="relative" ref={menuRef}>
      <Button className="w-10 h-10 rounded-full bg-blue-500 text-white font-bold" onClick={() => setIsOpen(!isOpen)}>
        {user.name[0].toUpperCase()}
      </Button>
      {isOpen && (
        <Card className="absolute right-0 mt-2 w-48 py-2 z-10">
          <div className="px-4 py-2 text-sm text-gray-700">
            <div>{user.name}</div>
            <div className="text-xs text-gray-500">{user.email}</div>
          </div>
          <Button
            variant="ghost"
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={onLogout}
          >
            Logout
          </Button>
        </Card>
      )}
    </div>
  )
}

