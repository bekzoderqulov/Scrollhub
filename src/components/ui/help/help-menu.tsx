"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/Librory/button"
import { Card } from "@/components/ui/Librory/card"
import { Input } from "@/components/ui/Librory/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/Librory/accordion"

interface HelpMenuProps {
  onClose: () => void
}

interface HelpQuestion {
  id: string
  question: string
  timestamp: string
}

export default function HelpMenu({ onClose }: HelpMenuProps) {
  const [question, setQuestion] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    if (!question.trim()) return

    // Create new question object
    const newQuestion = {
      id: Date.now().toString(),
      question: question.trim(),
      timestamp: new Date().toISOString(),
    }

    // Get existing questions from localStorage
    const existingQuestions = JSON.parse(localStorage.getItem("helpQuestions") || "[]")

    // Add new question
    const updatedQuestions = [...existingQuestions, newQuestion]

    // Save to localStorage
    localStorage.setItem("helpQuestions", JSON.stringify(updatedQuestions))

    // Clear the input field and show success message
    setQuestion("")
    setSubmitted(true)

    // Close the modal after 2 seconds
    setTimeout(() => {
      onClose()
    }, 2000)
  }

  if (submitted) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
        <Card className="w-full max-w-md p-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Thank You!</h2>
          <p className="text-gray-600">Your question has been submitted. We'll get back to you soon.</p>
        </Card>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <Card className="w-full max-w-2xl max-h-[80vh] overflow-y-auto p-6 relative">
        <Button variant="ghost" size="icon" className="absolute top-2 right-2" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
        <h2 className="text-2xl font-bold mb-4">ScholarHub Site Guide</h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="structure">
            <AccordionTrigger>Site Structure</AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc pl-4">
                <li>Header: Navigation and call-to-action</li>
                <li>Hero Section: Main message and video</li>
                <li>Universities: Showcase of partner institutions</li>
                <li>Features: Key offerings of the SAT prep program</li>
                <li>Top Achievers: Testimonials from successful students</li>
                <li>Course Program: Detailed curriculum overview</li>
                <li>Expert Coach: Introduction to the instructor</li>
                <li>Sign Up Section: Registration for free demo lesson</li>
                <li>FAQs: Common questions and answers</li>
                <li>Footer: Additional navigation and contact information</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="capabilities">
            <AccordionTrigger>Site Capabilities</AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc pl-4">
                <li>View comprehensive information about SAT preparation services</li>
                <li>Watch promotional video about the program</li>
                <li>Explore detailed course curriculum</li>
                <li>Read testimonials from successful students</li>
                <li>Learn about the expert coach</li>
                <li>Sign up for a free demo lesson</li>
                <li>Access frequently asked questions</li>
                <li>Contact ScholarHub through provided channels</li>
                <li>Navigate to social media profiles</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="actions">
            <AccordionTrigger>Available Actions</AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc pl-4">
                <li>Start a free trial</li>
                <li>Book a free trial lesson</li>
                <li>Sign up for the SAT preparation program</li>
                <li>Navigate through different sections of the page</li>
                <li>Open and close this help menu</li>
                <li>Expand/collapse FAQ items</li>
                <li>View course program details</li>
                <li>Access contact information</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <div className="mt-6">
          <Input
            placeholder="Type your question here..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="mb-4"
          />
          <Button className="w-full bg-[#143054] text-white" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </Card>
    </div>
  )
}

