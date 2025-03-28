"use client"

import * as React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/Librory/button"
import { Card } from "@/components/ui/Librory/card"
import { Input } from "@/components/ui/Librory/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/Librory/accordion"
import {
  Play,
  ChevronRight,
  Check,
  Instagram,
  Facebook,
  Youtube,
  FileText,
  MessageSquare,
  PenTool,
  FileIcon,
  QuoteIcon,
  ChevronDown,
  ChevronLeft,
  Pause,
} from "lucide-react"
import HelpMenu from "./help/help-menu"
import LoginModal from "./register-and-login/login-modal"
import AdminPanel from "./admin/admin-panel"

interface User {
  name: string
  email: string
  password: string
}

interface University {
  name: string
  imageUrl: string
}

interface Feature {
  icon: string
  title: string
  description: string
}

interface Achiever {
  name: string
  image: string
  satScore: string
  scholarship: string
  quote: string
}

interface CourseMonth {
  title: string
  content: string
}

interface FAQ {
  question: string
  answer: string
}

interface HeroContent {
  title: string
  subtitle: string
  bulletPoints: string[]
  ctaText: string
  videoUrl: string
}

interface CoachContent {
  title: string
  description: string
  imageUrl: string
  stats: Array<{
    value: string
    label: string
  }>
}

interface Country {
  name: string
  code: string
}

const countries: Country[] = [
  { name: "Uzbekistan", code: "+998" },
  { name: "United States", code: "+1" },
  { name: "United Kingdom", code: "+44" },
]

export default function Page() {
  // Add these state variables at the top of the component
  const [heroContent, setHeroContent] = useState<HeroContent>({
    title: "Join Our 1000+ Students Earning Full-Scholarships.",
    subtitle: "SCORE 1500+ IN SAT WITH SCHOLARHUB",
    bulletPoints: [
      "$50M+ scholarships won by our students",
      "98 study at Ivy League Universities",
      "100+ scored 1500+ in SAT",
    ],
    ctaText: "Book Your Free Trial Lesson",
    videoUrl: "./image/video.mp4",
  })
  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showControls, setShowControls] = useState(false);

  const handleMouseEnter = () => {
    setShowControls(true);
  };

  const handleMouseLeave = () => {
    setShowControls(false);
  };

  const handleVideoPlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVideoTimeUpdate = () => {
    if (videoRef.current) {
      const currentTime = videoRef.current.currentTime;
      const duration = videoRef.current.duration;
      setProgress((currentTime / duration) * 100);
    }
  };

  const handleSeek = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (videoRef.current) {
      const rect = event.currentTarget.getBoundingClientRect();
      const clickX = event.clientX - rect.left;
      const newTime = (clickX / rect.width) * videoRef.current.duration;
      videoRef.current.currentTime = newTime;
    }
  };

  const [coachContent, setCoachContent] = useState<CoachContent>({
    title: "Meet Your Expert Coach:",
    description:
      "Meet AbdulAziz—a seasoned SAT coach with a proven track record. With years of hands-on experience and a personalized approach, he's helped over 2,600 students achieve top scores and secure full scholarships to prestigious universities.",
    imageUrl: "./image/412.svg",
    stats: [
      { value: "2.6K+", label: "Happy Students" },
      { value: "100+", label: "Students with 1500+ SAT score" },
      { value: "$50M+", label: "Scholarships won by students" },
      { value: "146+", label: "Students with full scholarship" },
    ],
  })
  const [showHelpMenu, setShowHelpMenu] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [selectedCountry, setSelectedCountry] = useState(countries[0].code)
  const [phoneNumber, setPhoneNumber] = useState("")
  const [openMonth, setOpenMonth] = useState<number | null>(null)
  const [startIndex, setStartIndex] = useState(0)
  const [showDropdown, setShowDropdown] = useState(false)
  const [universities, setUniversities] = useState<University[]>([])
  const [features, setFeatures] = useState<Feature[]>([])
  const [achievers, setAchievers] = useState<Achiever[]>([])
  const [courseMonths, setCourseMonths] = useState<CourseMonth[]>([])
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [showAdminPanel, setShowAdminPanel] = useState(false)

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem("loggedInUser")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }

    // Function to load data from localStorage
    const loadData = () => {
      // Load universities - combine default with stored
      const storedUniversities = JSON.parse(localStorage.getItem("universities") || "[]")
      setUniversities([university, ...storedUniversities]) // Add default university first

      // Load features - combine default with stored
      const storedFeatures = JSON.parse(localStorage.getItem("features") || "[]")
      setFeatures([...featureList, ...storedFeatures]) // Add default features first

      // Load achievers - combine default with stored
      const storedAchievers = JSON.parse(localStorage.getItem("achievers") || "[]")
      setAchievers([...allAchievers, ...storedAchievers]) // Add default achievers first

      // Load course months - combine default with stored
      const storedCourseMonths = JSON.parse(localStorage.getItem("courseMonths") || "[]")
      setCourseMonths([...months, ...storedCourseMonths]) // Add default months first

      // Load FAQs - combine default with stored
      const storedFAQs = JSON.parse(localStorage.getItem("faqs") || "[]")
      setFaqs([
        {
          question: "Is it a digital course?",
          answer: "Yes, ScholarHub is a fully digital platform where students can study all question types that appear on the SAT exam. The platform offers a comprehensive and interactive learning experience designed for SAT preparation.",
        },
        {
          question: "What does the 4-month program cover?",
          answer: "The program covers over 100 topics, including Cross-Text Connections, Overall Structure, Rhetorical Synthesis, Circle Equations, Nonlinear Word Problems, Manipulating Functions, and more. ScholarHub's unique advantage lies in its AI-assisted mentoring, which allows students to ask questions and receive detailed answer explanations for any SAT question, both on and off the platform. Additionally, students can access up to 10 full-length practice tests to simulate the real SAT experience.",
        },
        {
          question: "How much does it cost?",
          answer: "The full 4-month program costs 3000 dirhams. Students have the flexibility to pay in four installments of 750 dirhams each.",
        },
        {
          question: "What can my child expect during the free trial class?",
          answer: "During the trial class, students will be introduced to the program through an overview of SAT Math, SAT Grammar, and SAT Reading. They will also participate in sample lessons from each section and gain access to practice questions for those lessons, providing a clear understanding of the ScholarHub experience.",
        },
        ...storedFAQs, // Add stored FAQs after default
      ]);
      

      // Load hero content - merge with defaults if exists
      const storedHeroContent = JSON.parse(localStorage.getItem("heroContent") || "null")
      if (storedHeroContent) {
        setHeroContent({
          ...heroContent, // Keep default values
          ...storedHeroContent, // Override with stored values
        })
      }

      // Load coach content - merge with defaults if exists
      const storedCoachContent = JSON.parse(localStorage.getItem("coachContent") || "null")
      if (storedCoachContent) {
        setCoachContent({
          ...coachContent, // Keep default values
          ...storedCoachContent, // Override with stored values
        })
      }
    }

    // Initial load
    loadData()

    // Set up storage event listener
    const handleStorageChange = (e: StorageEvent) => {
      if (
        e.key &&
        ["universities", "features", "achievers", "courseMonths", "faqs", "heroContent", "coachContent"].includes(e.key)
      ) {
        loadData()
      }
    }

    // Add event listener for storage changes
    window.addEventListener("storage", handleStorageChange)

    // Clean up
    return () => {
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [heroContent, coachContent])

  const handleLogin = (userData: User) => {
    setUser(userData)
    localStorage.setItem("loggedInUser", JSON.stringify(userData))
    setShowLoginModal(false)
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem("loggedInUser")
    setShowDropdown(false)
  }

  const handleNavigateToAdmin = () => {
    setShowAdminPanel(true)
    setShowDropdown(false)
  }

  const handlePrevious = () => {
    setStartIndex((prevIndex) => (prevIndex === 0 ? achievers.length - 4 : prevIndex - 1))
  }

  const handleNext = () => {
    setStartIndex((prevIndex) => (prevIndex + 1) % (achievers.length - 3))
  }

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    const fullPhoneNumber = `${selectedCountry} ${phoneNumber}`

    // Create new submission object
    const newSubmission = {
      id: Date.now().toString(),
      fullName: user?.name || "",
      email: user?.email || "",
      phoneNumber: fullPhoneNumber,
      timestamp: new Date().toISOString(),
    }

    // Get existing submissions from localStorage
    const existingSubmissions = JSON.parse(localStorage.getItem("formSubmissions") || "[]")

    // Add new submission
    const updatedSubmissions = [...existingSubmissions, newSubmission]

    // Save to localStorage
    localStorage.setItem("formSubmissions", JSON.stringify(updatedSubmissions))

    // Clear the form
    setPhoneNumber("")

    // Show success message
    alert("Thank you for your submission!")
  }

  const university: University = {
    name: "UC Davis",
    imageUrl: "/image/image 2.svg",
  }

  const featureList: Feature[] = [
    {
      icon: "FileText",
      title: "100+ SAT Video Lessons",
      description: "Structured step-by-step video lessons covering SAT Math & English for all skill levels.",
    },
    {
      icon: "MessageSquare",
      title: "2,500+ SAT Practice Questions",
      description: "Extensive SAT question bank with detailed solutions to build confidence and accuracy.",
    },
    {
      icon: "PenTool",
      title: "6 Full-Length Mock Exams",
      description: "Realistic SAT-style practice tests with detailed explanations and performance tracking.",
    },
    {
      icon: "FileIcon",
      title: "AI-Powered Real-Time Support",
      description: "Get instant guidance with our AI mentor, designed to enhance learning and retention.",
    },
  ]

  const allAchievers: Achiever[] = [
    {
      name: "Khumoyun Nasipkulov",
      image: "/image/IMG_3486.PNG",
      satScore: "1460",
      scholarship: "316,000",
      quote:
        "I attended the Coach Abdulaziz’s SAT program and really enjoyed it. Despite having very little time, I managed to complete the SAT English section in just one month with Abdulaziz’s help. In the end, I scored 1460, and I’m truly grateful for this course!",
    },
    {
      name: "Kamila Kadirova",
      image: "./image/IMG_3487.JPG",
      satScore: "1460",
      scholarship: "320,000",
      quote:
        "Scholars Hub’s SAT program transformed my academic abilities. The strategic lessons, expert guidance, and continuous support helped me achieve a competitive score and achieve a full-tuition scholarship to Wooster College in USA.",
    },
    {
      name: "Azambek Shermatov",
      image: "./image/odam.JPG",
      satScore: "1520",
      scholarship: "347,000",
      quote:
        "Scholar Hub’s comprehensive SAT program was the key to my academic success. Their structured curriculum, expert mentorship, and personalized feedback helped me secure a full-ride scholarship at Colby College.",
    },
    {
      name: "Munisa Mahamjonova",
      image: "./image/IMG_3488.JPG",
      satScore: "1460",
      scholarship: "200,000",
      quote:
        "When I started applying to universities, I realized that most Florida institutions require the SAT, so I needed to take the exam. After hearing great reviews about Mr. Abdulaziz, I decided to join his SAT course—and it was one of the best decisions I made, The knowledge and strategies he shared played a crucial role in helping me succeed on the SAT. Mr. Abdulaziz also guided students through the university application process, providing invaluable advice and assistance to his students.",
    },
    {
      name: "Ibrohim Iskandarov",
      image: "./image/IMG_4693.PNG",
      satScore: "1490",
      scholarship: "320,000",
      quote:
        "Hello! I’m Ibrohim, and currently I am a sophomore at NYU Abu Dhabi. I study computer science and applied mathematics. I attended SAT course back in spring 2023, and loved it! Abdulaiz, my teacher was extremely helpful and his explanations made it super easy to navigate through the complex reading questions. I got 1490, and wanted to thank the course for that.",
    },
  ]

  const visibleAchievers = [
    achievers[startIndex],
    achievers[(startIndex + 1) % achievers.length],
    achievers[(startIndex + 2) % achievers.length],
    achievers[(startIndex + 3) % achievers.length],
  ].filter(Boolean) // Ensure no undefined achievers are included

  const months: CourseMonth[] = [
    {
      title: "Month 1: Basic Grammar & Pre-Algebra",
      content:
        "Since all students start the program with different knowledge, our first priority is making students have the correct baseline knowledge by recovering topics from Basic Grammar and Pre-Algebra that they have forgotten.",
    },
    {
      title: "Month 2: SAT Grammar & SAT Algebra",
      content: "After ensuring baseline knowledge, we educate the student on SAT-level Grammar and Algebra concepts that will appear during the test. The knowledge here will account for half of the entire SAT. Students will also be given their first Mid-Course Practice Test.",
    },
    {
      title: "Month 3: SAT Reading & SAT Statistics ",
      content: "Here begins the real challenge: SAT Reading & SAT Statistics. Students learn strategies to tackle these difficult sections all while completing practice tests on a regular basis.",
    },
    {
      title: "Month 4: SAT Reading & SAT Geometry ",
      content:
        "Students study the hardest question types from the SAT Reading section while completing SAT Math with the Geometry section. The final month also includes a lot of practice tests with lessons dedicated to exam prep advice.",
    },
  ]

  const courseFeatures = [
    "4+2 months of SAT preparation",
    "100+ SAT Math & English lessons",
    "2500+ SAT practice questions",
    "10 realistic SAT practice tests",
    "Personalized learning approach",
    "Revolutionary AI-assisted support",
  ]

  if (showAdminPanel && user && user.email === "admin@gmail.com") {
    return <AdminPanel onBack={() => setShowAdminPanel(false)} />
  }

  const iconComponents: Record<string, React.ReactNode> = {
    FileText: <FileText className="h-6 w-6 text-blue-600" />,
    MessageSquare: <MessageSquare className="h-6 w-6 text-blue-600" />,
    PenTool: <PenTool className="h-6 w-6 text-blue-600" />,
    FileIcon: <FileIcon className="h-6 w-6 text-blue-600" />,
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">ScholarHub</h1>
          <div className="flex gap-4 items-center">
            <Button variant="outline" onClick={() => setShowHelpMenu(true)}>
              Need Help?
            </Button>
            {user ? (
              <div className="relative">
                <div
                  className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center cursor-pointer"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  {user.name.charAt(0).toUpperCase()}
                </div>
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-10">
                    <div className="px-4 py-2 text-black">{user.name}</div>
                    <div className="px-4 py-2 text-black">{user.email}</div>
                    {user.email === "admin@gmail.com" && (
                      <Button
                        onClick={handleNavigateToAdmin}
                        className="w-full text-left px-4 py-2 text-black bg-white hover:bg-gray-100"
                      >
                        Admin Panel
                      </Button>
                    )}
                    <Button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-black bg-white hover:bg-gray-100"
                    >
                      Logout
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <Button className="bg-[#143054] hover:bg-[#143054]/90 text-white" onClick={() => setShowLoginModal(true)}>
                Start a Free Trial <ChevronRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Help Menu */}
      {showHelpMenu && <HelpMenu onClose={() => setShowHelpMenu(false)} />}

      {/* Login Modal */}
      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} onLogin={handleLogin} />}

      {/* Promo Banner */}
      <div className="bg-green-100 text-center py-2">
        <p className="text-sm">
          GRAB YOUR SCHOOL VOICE EXCLUSIVE OFFER - 30% OFF <span className="font-bold cursor-pointer">Claim Offer</span>
        </p>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-blue-600 mb-4">{heroContent.subtitle}</p>
              <h2 className="text-4xl font-bold mb-6">{heroContent.title}</h2>
              <ul className="space-y-4 mb-8">
                {heroContent.bulletPoints.map((point, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="text-green-500" />
                    {point}
                  </li>
                ))}
              </ul>
              <Button
                size="lg"
                className="gap-2 bg-[#143054] hover:bg-[#143054]/90 text-white"
                onClick={() => scrollToSection("sat-success")}
              >
                {heroContent.ctaText}
                <ChevronRight className="h-4 w-4" />
              </Button>
              <p className="text-sm text-red-600 mt-4">🔥 Hurry only 12 spots left</p>
            </div>
            <div
              className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {heroContent.videoUrl ? (
                <div className="relative w-full h-full">
                  <video
                    ref={videoRef}
                    src={heroContent.videoUrl}
                    className="w-full h-full object-cover cursor-pointer"
                    onClick={handleVideoPlayPause}
                    onTimeUpdate={handleVideoTimeUpdate}
                  />
                  <div
                    className="absolute bottom-0 left-0 w-full h-2 bg-gray-300 cursor-pointer"
                    onClick={handleSeek}
                  >
                    <div
                      className="h-full bg-blue-600"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  {showControls && (
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute inset-0 m-auto rounded-full w-16 h-16"
                      onClick={handleVideoPlayPause}
                    >
                      {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
                    </Button>
                  )}
                </div>
              ) : (
                <Button variant="outline" size="icon" className="absolute inset-0 m-auto rounded-full w-16 h-16">
                  <Play className="h-8 w-8" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Universities Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-600 mb-8 text-2xl">Our students have been admitted to</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {universities.map((university, index) => (
              <div key={index} className="bg-white shadow-md hover:shadow-lg transition-shadow p-4 rounded-lg">
                <img
                  src={university.imageUrl || "/placeholder.svg"}
                  alt={university.name}
                  className="h-20 object-contain w-full"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section with Added Heading */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">The Most Comprehensive SAT Prep in the Middle East</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              ScholarHub's SAT Platform is a 4-month, expert-designed program that prepares students for every question
              type in SAT Math & English with structured learning, AI-driven support, and real exam simulations.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {features.map((feature, index) => {
              const Icon = iconComponents[feature.icon as keyof typeof iconComponents]
              return (
                <div key={index} className="bg-gray-50 p-6 rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">{Icon}</div>
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="text-center">
            <Button
              onClick={() => scrollToSection("sat-success")}
              className="bg-[#143054] hover:bg-[#143054]/90 text-white"
            >
              Book Your Free Trial Class
            </Button>
            <p className="text-sm text-red-600 mt-4">🔥 Hurry - Offer ends in 7 days</p>
          </div>
        </div>
      </section>

      {/* Top Achievers Section */}
      <section className="py-24 bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 className="text-3xl font-bold text-center mb-6">Our Top Achievers</h2> {/* Уменьшил mb-12 до mb-6 для большего пространства под текстом */}
    
    {/* Контейнер для стрелок под текстом, выровненных по правому краю */}
    <div className="flex justify-end mb-6">
      <Button
        onClick={handlePrevious}
        className="rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-gray-100 mr-2"
        variant="outline"
        size="icon"
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>
      <Button
        onClick={handleNext}
        className="rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-gray-100"
        variant="outline"
        size="icon"
      >
        <ChevronRight className="h-5 w-5" />
      </Button>
    </div>

    <div className="relative">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {visibleAchievers.map((achiever, index) => (
          <Card key={index} className="p-6">
            <div className="flex gap-4 mb-4">
              <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={achiever.image || "/placeholder.svg"}
                  alt={achiever.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">{achiever.name}</h3>
                <div className="space-y-1">
                  <div className="bg-blue-50 text-blue-700 text-sm px-2 py-0.5 rounded w-fit">
                    SAT Score: {achiever.satScore}
                  </div>
                  <div className="bg-purple-50 text-purple-700 text-sm px-2 py-0.5 rounded w-fit">
                    Scholarship: ${achiever.scholarship}
                  </div>
                </div>
              </div>
            </div>
            <div className="relative pl-6">
              <QuoteIcon className="absolute top-0 left-0 h-4 w-4 text-blue-500" />
              <p className="text-sm text-gray-600">{achiever.quote}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>

    <div className="text-center mt-12">
      <Button
        onClick={() => scrollToSection("sat-success")}
        className="bg-[#143054] hover:bg-[#143054]/90 text-white"
      >
        Book Your Free Trial Lesson
      </Button>
      <p className="text-sm text-red-600 mt-4">🔥 Hurry only 32 spots left</p>
    </div>
  </div>
</section>

      {/* Course Program Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="relative">
              <img
                src="./image/Group 3.svg"
                alt="Course Program"
                className="w-full rounded-lg shadow-lg"
              />
              <h2 className="absolute top-[-50px] left-2 text-3xl font-bold text-black drop-shadow-lg">
                Our Course Program
              </h2>
            </div>
            <div>
              <div className="space-y-2 mt-12">
                {courseMonths.map((month, index) => (
                  <div key={index} className="relative">
                    <button
                      onClick={() => setOpenMonth(openMonth === index ? null : index)}
                      className={`w-full px-4 py-4 text-left flex items-center justify-between rounded-lg hover:bg-gray-50 transition-colors ${
                        openMonth === index ? "bg-gray-50" : "bg-white"
                      }`}
                    >
                      <span className="text-lg font-semibold">{month.title}</span>
                      <ChevronDown
                        className={`w-5 h-5 transition-transform ${openMonth === index ? "transform rotate-180" : ""}`}
                      />
                    </button>
                    {openMonth === index && (
                      <div className="mt-2 p-4 bg-white rounded-lg shadow-lg border border-gray-100">
                        <p className="text-gray-600">{month.content}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expert Coach Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">{coachContent.title}</h2>
              <p className="text-gray-600 mb-8">{coachContent.description}</p>
              <div className="grid grid-cols-2 gap-8">
                {coachContent.stats.map((stat, index) => (
                  <div key={index}>
                    <h3 className="text-4xl font-bold text-blue-600">{stat.value}</h3>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img src={coachContent.imageUrl || "/placeholder.svg"} alt="Expert Coach" className="rounded-lg w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Sign Up Section */}
      <section id="sat-success" className="py-24 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold mb-4">Your SAT Success Starts Here</h2>
              <p className="text-gray-600 mb-8">
                Sign up for a free demo lesson today and claim your 30% Schoolvoice community discount.
              </p>
              <ul className="space-y-4">
                {courseFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Card className="p-6">
              <div className="bg-green-100 text-center py-1 px-4 rounded-full text-sm mb-6 w-fit mx-auto">
                30% FLAT DISCOUNT
              </div>
              <h3 className="text-xl font-semibold mb-6 text-center">Get access to your free lesson</h3>
              <form className="space-y-4" onSubmit={handleFormSubmit}>
                <Input placeholder="Full Name" className="bg-white border-gray-200" required />
                <Input type="email" placeholder="Email" className="bg-white border-gray-200" required />
                <div className="relative">
                  <select
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-transparent z-10"
                  >
                    {countries.map((country) => (
                      <option key={country.code} value={country.code}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                  <Input
                    placeholder="Phone Number"
                    className="bg-white border-gray-200 pl-[72px]"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-[#143054] hover:bg-[#143054]/90 text-white">
                  Get Started Now
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">FAQs</h2>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0A2647] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">ScholarHub</h3>
              <p className="text-sm text-gray-300 mb-4">Score High, Dream Big</p>
              <div className="flex gap-4">
                <a href="#" className="text-gray-300 hover:text-white">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-300 hover:text-white">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-300 hover:text-white">
                  <Youtube className="h-5 w-5" />
                </a>
              </div>
              <div className="flex pt-2">
                <p>Developed by</p>
                <a className="pl-1 hover:underline" href="https://www.shahnur.software/en">
                  ShahNur Software
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-bold mb-4">Navigation</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <a href="#" className="hover:text-white">
                    What we offer
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Our result
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Our Coach
                  </a>
                </li>
                <li>
                  <a href="#\" className="hover:text-white">
                    FAQs
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Contact Us</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>Phone number</li>
                <li>WhatsApp number</li>
                <li>8AM to 10PM</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">We accept</h3>
              <div className="flex gap-2">
                <img
                  src="./image/Frame 26086629.svg"
                  alt="Mastercard"
                  className="h-8 cursor-pointer"
                />
                <img src="./image/Frame 26086631.svg" alt="Visa" className="h-8 cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

