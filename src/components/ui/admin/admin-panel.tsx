"use client";

import type * as React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Librory/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Librory/card";
import { Input } from "@/components/ui/Librory/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Librory/tabs";
import { Label } from "@/components/ui/Librory/label";
import {
  Plus,
  Trash,
  Save,
  User,
  FileText,
  MessageSquare,
  PenTool,
  FileIcon,
  School,
  Users,
  HelpCircle,
  Edit,
  Award,
  LogOut,
  Menu,
  ArrowLeft,
} from "lucide-react";

// Remove the unused FormData interface
// interface FormData {
//   fullName: string;
//   email: string;
//   phoneNumber: string;
// }

interface University {
  name: string;
  imageUrl: string;
}

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface Achiever {
  name: string;
  image: string;
  satScore: string;
  scholarship: string;
  quote: string;
}

interface CourseMonth {
  title: string;
  content: string;
}

interface FAQ {
  question: string;
  answer: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

interface AdminPanelProps {
  onBack: () => void;
}

interface HelpQuestion {
  id: string;
  question: string;
  timestamp: string;
}

interface FormSubmission {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  timestamp: string;
}

interface HeroContent {
  title: string;
  subtitle: string;
  bulletPoints: string[];
  ctaText: string;
  videoUrl: string;
}

interface CoachContent {
  title: string;
  description: string;
  imageUrl: string;
  stats: Array<{
    value: string;
    label: string;
  }>;
}

const AdminPanel = ({ onBack }: AdminPanelProps) => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [universities, setUniversities] = useState<University[]>([]);
  const [newUniversity, setNewUniversity] = useState<University>({ name: "", imageUrl: "" });
  const [features, setFeatures] = useState<Feature[]>([]);
  const [newFeature, setNewFeature] = useState<Feature>({ icon: "FileText", title: "", description: "" });
  const [achievers, setAchievers] = useState<Achiever[]>([]);
  const [newAchiever, setNewAchiever] = useState<Achiever>({
    name: "",
    image: "",
    satScore: "",
    scholarship: "",
    quote: "",
  });
  const [courseMonths, setCourseMonths] = useState<CourseMonth[]>([]);
  const [newCourseMonth, setNewCourseMonth] = useState<CourseMonth>({ title: "", content: "" });
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [newFAQ, setNewFAQ] = useState<FAQ>({ question: "", answer: "" });
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState<User>({ id: "", name: "", email: "", role: "User" });
  const [formSubmissions, setFormSubmissions] = useState<FormSubmission[]>([]);
  const [heroContent, setHeroContent] = useState<HeroContent>({
    title: "Join Our 1000+ Students Earning Full-Scholarships.",
    subtitle: "SCORE 1500+ IN SAT WITH SCHOLARHUB",
    bulletPoints: [
      "$50M+ scholarships won by our students",
      "98 study at Ivy League Universities",
      "100+ scored 1500+ in SAT",
    ],
    ctaText: "Book Your Free Trial Lesson",
    videoUrl: "",
  });
  const [coachContent, setCoachContent] = useState<CoachContent>({
    title: "Meet Your Expert Coach:",
    description:
      "Meet AbdulAziz—a seasoned SAT coach with a proven track record. With years of hands-on experience and a personalized approach, he's helped over 2,600 students achieve top scores and secure full scholarships to prestigious universities.",
    imageUrl: "./src/components/ui/image/412.svg",
    stats: [
      { value: "2.6K+", label: "Happy Students" },
      { value: "100+", label: "Students with 1500+ SAT score" },
      { value: "$50M+", label: "Scholarships won by students" },
      { value: "146+", label: "Students with full scholarship" },
    ],
  });
  const [adminUser] = useState<{ name: string; email: string; role: string }>({
    name: "Admin User",
    email: "admin@gmail.com",
    role: "Administrator",
  });
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [helpQuestions, setHelpQuestions] = useState<HelpQuestion[]>([]);

  useEffect(() => {
    // Load all data from localStorage on component mount
    const loadData = () => {
      const storedUniversities = JSON.parse(localStorage.getItem("universities") || "[]");
      const storedFeatures = JSON.parse(localStorage.getItem("features") || "[]");
      const storedAchievers = JSON.parse(localStorage.getItem("achievers") || "[]");
      const storedCourseMonths = JSON.parse(localStorage.getItem("courseMonths") || "[]");
      const storedFAQs = JSON.parse(localStorage.getItem("faqs") || "[]");
      const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
      const storedFormSubmissions = JSON.parse(localStorage.getItem("formSubmissions") || "[]");
      const storedHelpQuestions = JSON.parse(localStorage.getItem("helpQuestions") || "[]");
      const storedHeroContent = JSON.parse(localStorage.getItem("heroContent") || "null");
      const storedCoachContent = JSON.parse(localStorage.getItem("coachContent") || "null");

      setUniversities(storedUniversities.length ? storedUniversities : [
        { name: "UC Davis", imageUrl: "./src/components/ui/image/image 2.svg" },
        { name: "Harvard University", imageUrl: "/placeholder.svg?height=80&width=200" },
      ]);

      setFeatures(storedFeatures.length ? storedFeatures : [
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
      ]);

      setAchievers(storedAchievers.length ? storedAchievers : [
        {
          name: "Full Name 1",
          image: "./src/components/ui/image/1234.svg",
          satScore: "1540",
          scholarship: "316,000",
          quote: "Lorem ipsum dolor sit amet consectetur. Consectetur pretium aliquet nisi nullam vulputate ultrices hendrerit dictumst dolor scelerisque vestibulum faucibus quis.",
        },
      ]);

      setCourseMonths(storedCourseMonths.length ? storedCourseMonths : [
        {
          title: "Month 1: SAT Grammar & Pre-Algebra",
          content: "Here, we'll discuss effective study strategies, time management techniques, and how to create a personalized study plan that works best for you.",
        },
      ]);

      setFaqs(storedFAQs.length ? storedFAQs : [
        {
          question: "Is it a digital course?",
          answer: "Yes, our course is fully digital and accessible online, allowing you to learn at your own pace from anywhere.",
        },
      ]);

      setUsers(storedUsers);
      setFormSubmissions(storedFormSubmissions);
      setHelpQuestions(storedHelpQuestions);
      if (storedHeroContent) setHeroContent(storedHeroContent);
      if (storedCoachContent) setCoachContent(storedCoachContent);
    };

    loadData();

    // Set up storage event listener
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key && ["universities", "features", "achievers", "courseMonths", "faqs", "users", "formSubmissions", "helpQuestions", "heroContent", "coachContent"].includes(e.key)) {
        loadData();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const showStatus = (type: "success" | "error", text: string) => {
    setStatusMessage({ type, text });
    setTimeout(() => setStatusMessage(null), 3000);
  };

  // Университеты
  const handleAddUniversity = () => {
    if (newUniversity.name && newUniversity.imageUrl) {
      const updatedUniversities = [...universities, newUniversity];
      setUniversities(updatedUniversities);
      localStorage.setItem("universities", JSON.stringify(updatedUniversities));
      setNewUniversity({ name: "", imageUrl: "" });
      showStatus("success", "University added successfully!");
    } else {
      showStatus("error", "Please fill in all university fields");
    }
  };

  const handleRemoveUniversity = (index: number) => {
    const updatedUniversities = universities.filter((_, i) => i !== index);
    setUniversities(updatedUniversities);
    localStorage.setItem("universities", JSON.stringify(updatedUniversities));
    showStatus("success", "University removed successfully!");
  };

  // Фичи
  const handleAddFeature = () => {
    if (newFeature.title && newFeature.description) {
      const updatedFeatures = [...features, newFeature];
      setFeatures(updatedFeatures);
      localStorage.setItem("features", JSON.stringify(updatedFeatures));
      setNewFeature({ icon: "FileText", title: "", description: "" });
      showStatus("success", "Feature added successfully!");
    } else {
      showStatus("error", "Please fill in all feature fields");
    }
  };

  const handleRemoveFeature = (index: number) => {
    const updatedFeatures = features.filter((_, i) => i !== index);
    setFeatures(updatedFeatures);
    localStorage.setItem("features", JSON.stringify(updatedFeatures));
    showStatus("success", "Feature removed successfully!");
  };

  // Достижения
  const handleAddAchiever = () => {
    if (newAchiever.name && newAchiever.satScore) {
      const updatedAchievers = [...achievers, newAchiever];
      setAchievers(updatedAchievers);
      localStorage.setItem("achievers", JSON.stringify(updatedAchievers));
      setNewAchiever({ name: "", image: "", satScore: "", scholarship: "", quote: "" });
      showStatus("success", "Achiever added successfully!");
    } else {
      showStatus("error", "Please fill in required achiever fields");
    }
  };

  const handleRemoveAchiever = (index: number) => {
    const updatedAchievers = achievers.filter((_, i) => i !== index);
    setAchievers(updatedAchievers);
    localStorage.setItem("achievers", JSON.stringify(updatedAchievers));
    showStatus("success", "Achiever removed successfully!");
  };

  // Курсовая программа
  const handleAddCourseMonth = () => {
    if (newCourseMonth.title && newCourseMonth.content) {
      const updatedCourseMonths = [...courseMonths, newCourseMonth];
      setCourseMonths(updatedCourseMonths);
      localStorage.setItem("courseMonths", JSON.stringify(updatedCourseMonths));
      setNewCourseMonth({ title: "", content: "" });
      showStatus("success", "Course month added successfully!");
    } else {
      showStatus("error", "Please fill in all course month fields");
    }
  };

  const handleRemoveCourseMonth = (index: number) => {
    const updatedCourseMonths = courseMonths.filter((_, i) => i !== index);
    setCourseMonths(updatedCourseMonths);
    localStorage.setItem("courseMonths", JSON.stringify(updatedCourseMonths));
    showStatus("success", "Course month removed successfully!");
  };

  // FAQs
  const handleAddFAQ = () => {
    if (newFAQ.question && newFAQ.answer) {
      const updatedFAQs = [...faqs, newFAQ];
      setFaqs(updatedFAQs);
      localStorage.setItem("faqs", JSON.stringify(updatedFAQs));
      setNewFAQ({ question: "", answer: "" });
      showStatus("success", "FAQ added successfully!");
    } else {
      showStatus("error", "Please fill in all FAQ fields");
    }
  };

  const handleRemoveFAQ = (index: number) => {
    const updatedFAQs = faqs.filter((_, i) => i !== index);
    setFaqs(updatedFAQs);
    localStorage.setItem("faqs", JSON.stringify(updatedFAQs));
    showStatus("success", "FAQ removed successfully!");
  };

  // Пользователи
  const handleAddUser = () => {
    if (newUser.name && newUser.email) {
      const updatedUser = { ...newUser, id: Date.now().toString() };
      const updatedUsers = [...users, updatedUser];
      setUsers(updatedUsers);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      setNewUser({ id: "", name: "", email: "", role: "User" });
      showStatus("success", "User added successfully!");
    } else {
      showStatus("error", "Please fill in required user fields");
    }
  };

  const handleRemoveUser = (id: string) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    showStatus("success", "User removed successfully!");
  };

  // Hero Section
  const handleHeroChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setHeroContent((prev) => ({ ...prev, [name]: value }));
  };

  const handleBulletPointChange = (index: number, value: string) => {
    const updatedBulletPoints = [...heroContent.bulletPoints];
    updatedBulletPoints[index] = value;
    setHeroContent((prev) => ({ ...prev, bulletPoints: updatedBulletPoints }));
  };

  const handleSaveHero = () => {
    localStorage.setItem("heroContent", JSON.stringify(heroContent));
    showStatus("success", "Hero content saved successfully!");
  };

  // Coach Section
  const handleCoachChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCoachContent((prev) => ({ ...prev, [name]: value }));
  };

  const handleCoachStatChange = (index: number, field: string, value: string) => {
    const updatedStats = [...coachContent.stats];
    updatedStats[index] = { ...updatedStats[index], [field]: value };
    setCoachContent((prev) => ({ ...prev, stats: updatedStats }));
  };

  const handleSaveCoach = () => {
    localStorage.setItem("coachContent", JSON.stringify(coachContent));
    showStatus("success", "Coach content saved successfully!");
  };

  // Form Submissions
  const handleRemoveSubmission = (id: string) => {
    const updatedSubmissions = formSubmissions.filter((s) => s.id !== id);
    setFormSubmissions(updatedSubmissions);
    localStorage.setItem("formSubmissions", JSON.stringify(updatedSubmissions));
    showStatus("success", "Submission removed successfully!");
  };

  // Help Questions
  const handleRemoveQuestion = (id: string) => {
    const updatedQuestions = helpQuestions.filter((q) => q.id !== id);
    setHelpQuestions(updatedQuestions);
    localStorage.setItem("helpQuestions", JSON.stringify(updatedQuestions));
    showStatus("success", "Question removed successfully!");
  };

  const handleLogout = () => {
    showStatus("success", "Logged out successfully!");
    setTimeout(() => {
      localStorage.removeItem("loggedInUser");
      window.location.href = "/";
    }, 1000);
  };

  const handleBack = () => {
    onBack(); // This will set showAdminPanel to false in the parent component
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const iconComponents: Record<string, React.ReactNode> = {
    FileText: <FileText className="h-5 w-5" />,
    MessageSquare: <MessageSquare className="h-5 w-5" />,
    PenTool: <PenTool className="h-5 w-5" />,
    FileIcon: <FileIcon className="h-5 w-5" />,
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Status Message */}
      {statusMessage && (
        <div
          className={`fixed bottom-4 right-4 z-50 px-4 py-2 rounded-md shadow-lg ${
            statusMessage.type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"
          }`}
        >
          {statusMessage.text}
        </div>
      )}

      {/* Admin Header */}
      <header className="bg-blue-800 text-white shadow-md fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-2 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-white hover:bg-blue-700"
              onClick={toggleSidebar}
            >
              <Menu className="h-6 w-6" />
            </Button>
            <h1 className="text-lg sm:text-2xl font-bold">ScholarHub Admin</h1>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <Button variant="ghost" size="sm" className="text-white hover:bg-blue-700" onClick={handleBack}>
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline ml-2">Back</span>
            </Button>
            <div className="hidden sm:flex items-center space-x-2">
              <span className="text-sm">{adminUser.name}</span>
              <span className="text-xs bg-blue-700 px-2 py-0.5 rounded">{adminUser.role}</span>
            </div>
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-700 rounded-full flex items-center justify-center">
              {adminUser.name.charAt(0).toUpperCase()}
            </div>
            <Button variant="ghost" size="sm" className="text-white hover:bg-blue-700" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline ml-2">Logout</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main content with sidebar */}
      <div className="flex mt-16">
        {/* Sidebar with tabs */}
        <div
          className={`bg-white shadow-lg min-h-[calc(100vh-64px)] fixed top-16 left-0 overflow-y-auto transition-all duration-300 z-40
            ${isSidebarOpen ? "w-64 pt-4" : "w-0"} md:w-64 md:static md:pt-0`}
        >
          <Tabs
            defaultValue="dashboard"
            className="w-full"
            value={activeTab}
            onValueChange={setActiveTab}
            orientation="vertical"
          >
            <TabsList className="flex flex-col p-2 bg-transparent mt-[200px]">
              <TabsTrigger
                value="dashboard"
                className="justify-start px-4 py-2 text-blue-600 hover:bg-blue-50 transition-colors rounded text-sm w-full"
                onClick={() => setIsSidebarOpen(false)}
              >
                <Users className="h-4 w-4 mr-2" /> Dashboard
              </TabsTrigger>
              <TabsTrigger
                value="hero"
                className="justify-start px-4 py-2 text-blue-600 hover:bg-blue-50 transition-colors rounded text-sm w-full"
                onClick={() => setIsSidebarOpen(false)}
              >
                <Edit className="h-4 w-4 mr-2" /> Hero Section
              </TabsTrigger>
              <TabsTrigger
                value="universities"
                className="justify-start px-4 py-2 text-blue-600 hover:bg-blue-50 transition-colors rounded text-sm w-full"
                onClick={() => setIsSidebarOpen(false)}
              >
                <School className="h-4 w-4 mr-2" /> Universities
              </TabsTrigger>
              <TabsTrigger
                value="features"
                className="justify-start px-4 py-2 text-blue-600 hover:bg-blue-50 transition-colors rounded text-sm w-full"
                onClick={() => setIsSidebarOpen(false)}
              >
                <FileText className="h-4 w-4 mr-2" /> Features
              </TabsTrigger>
              <TabsTrigger
                value="achievers"
                className="justify-start px-4 py-2 text-blue-600 hover:bg-blue-50 transition-colors rounded text-sm w-full"
                onClick={() => setIsSidebarOpen(false)}
              >
                <Award className="h-4 w-4 mr-2" /> Top Achievers
              </TabsTrigger>
              <TabsTrigger
                value="course"
                className="justify-start px-4 py-2 text-blue-600 hover:bg-blue-50 transition-colors rounded text-sm w-full"
                onClick={() => setIsSidebarOpen(false)}
              >
                <PenTool className="h-4 w-4 mr-2" /> Course Program
              </TabsTrigger>
              <TabsTrigger
                value="coach"
                className="justify-start px-4 py-2 text-blue-600 hover:bg-blue-50 transition-colors rounded text-sm w-full"
                onClick={() => setIsSidebarOpen(false)}
              >
                <User className="h-4 w-4 mr-2" /> Coach
              </TabsTrigger>
              <TabsTrigger
                value="faqs"
                className="justify-start px-4 py-2 text-blue-600 hover:bg-blue-50 transition-colors rounded text-sm w-full"
                onClick={() => setIsSidebarOpen(false)}
              >
                <HelpCircle className="h-4 w-4 mr-2" /> FAQs
              </TabsTrigger>
              <TabsTrigger
                value="users"
                className="justify-start px-4 py-2 text-blue-600 hover:bg-blue-50 transition-colors rounded text-sm w-full"
                onClick={() => setIsSidebarOpen(false)}
              >
                <Users className="h-4 w-4 mr-2" /> Users
              </TabsTrigger>
              <TabsTrigger
                value="help-questions"
                className="justify-start px-4 py-2 text-blue-600 hover:bg-blue-50 transition-colors rounded text-sm w-full"
                onClick={() => setIsSidebarOpen(false)}
              >
                <MessageSquare className="h-4 w-4 mr-2" /> Help Questions
              </TabsTrigger>
              <TabsTrigger
                value="submissions"
                className="justify-start px-4 py-2 text-blue-600 hover:bg-blue-50 transition-colors rounded text-sm w-full"
                onClick={() => setIsSidebarOpen(false)}
              >
                <MessageSquare className="h-4 w-4 mr-2" /> Form Submissions
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Main content area */}
        <div className="flex-1 md:ml-64 p-4 sm:p-8 space-y-4">
          {statusMessage && (
            <div
              className={`fixed bottom-4 right-4 z-50 px-4 py-2 rounded-md shadow-lg ${
                statusMessage.type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"
              }`}
            >
              {statusMessage.text}
            </div>
          )}

          <Tabs defaultValue="dashboard" value={activeTab} className="space-y-6">
            <TabsContent value="dashboard">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
                  <CardHeader className="bg-blue-700 text-white rounded-t-lg p-4">
                    <CardTitle className="flex items-center text-base sm:text-lg">
                      <Users className="h-5 w-5 mr-2" /> Users
                    </CardTitle>
                    <span className="text-2xl font-bold">{users.length}</span>
                  </CardHeader>
                  <CardContent className="p-3 sm:p-6">
                    <p className="text-gray-600">Total registered users</p>
                    <Button
                      variant="outline"
                      className="w-full mt-4 border-blue-200 text-blue-700 hover:bg-blue-50"
                      onClick={() => setActiveTab("users")}
                    >
                      Manage Users
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
                  <CardHeader className="bg-blue-700 text-white rounded-t-lg p-4">
                    <CardTitle className="flex items-center text-base sm:text-lg">
                      <School className="h-5 w-5 mr-2" /> Universities
                    </CardTitle>
                    <span className="text-2xl font-bold">{universities.length}</span>
                  </CardHeader>
                  <CardContent className="p-3 sm:p-6">
                    <p className="text-gray-600">Partner universities</p>
                    <Button
                      variant="outline"
                      className="w-full mt-4 border-blue-200 text-blue-700 hover:bg-blue-50"
                      onClick={() => setActiveTab("universities")}
                    >
                      Manage Universities
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
                  <CardHeader className="bg-blue-700 text-white rounded-t-lg p-4">
                    <CardTitle className="flex items-center text-base sm:text-lg">
                      <Award className="h-5 w-5 mr-2" /> Achievers
                    </CardTitle>
                    <span className="text-2xl font-bold">{achievers.length}</span>
                  </CardHeader>
                  <CardContent className="p-3 sm:p-6">
                    <p className="text-gray-600">Top student achievers</p>
                    <Button
                      variant="outline"
                      className="w-full mt-4 border-blue-200 text-blue-700 hover:bg-blue-50"
                      onClick={() => setActiveTab("achievers")}
                    >
                      Manage Achievers
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
                  <CardHeader className="bg-blue-700 text-white rounded-t-lg p-4">
                    <CardTitle className="flex items-center text-base sm:text-lg">
                      <MessageSquare className="h-5 w-5 mr-2" /> Submissions
                    </CardTitle>
                    <span className="text-2xl font-bold">{formSubmissions.length}</span>
                  </CardHeader>
                  <CardContent className="p-3 sm:p-6">
                    <p className="text-gray-600">Form submissions</p>
                    <Button
                      variant="outline"
                      className="w-full mt-4 border-blue-200 text-blue-700 hover:bg-blue-50"
                      onClick={() => setActiveTab("submissions")}
                    >
                      View Submissions
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader className="bg-blue-700 text-white rounded-t-lg">
                    <CardTitle>Recent Form Submissions</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    {formSubmissions.length === 0 ? (
                      <p className="text-center text-gray-500 py-4">No submissions yet</p>
                    ) : (
                      <div className="space-y-4">
                        {formSubmissions.slice(0, 3).map((submission, index) => (
                          <div key={index} className="border-b pb-3 last:border-0">
                            <p className="font-medium">{submission.fullName}</p>
                            <p className="text-sm text-gray-600">{submission.email}</p>
                            <p className="text-sm text-gray-600">{submission.phoneNumber}</p>
                          </div>
                        ))}
                        {formSubmissions.length > 3 && (
                          <Button
                            variant="outline"
                            className="w-full mt-2 border-blue-200 text-blue-700 hover:bg-blue-50"
                            onClick={() => setActiveTab("submissions")}
                          >
                            View All Submissions
                          </Button>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader className="bg-blue-700 text-white rounded-t-lg">
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Button
                        className="bg-blue-600 hover:bg-blue-700 h-auto py-4 flex flex-col items-center"
                        onClick={() => setActiveTab("hero")}
                      >
                        <Edit className="h-6 w-6 mb-2" />
                        <span>Edit Hero</span>
                      </Button>
                      <Button
                        className="bg-green-600 hover:bg-green-700 h-auto py-4 flex flex-col items-center"
                        onClick={() => setActiveTab("universities")}
                      >
                        <School className="h-6 w-6 mb-2" />
                        <span>Add University</span>
                      </Button>
                      <Button
                        className="bg-purple-600 hover:bg-purple-700 h-auto py-4 flex flex-col items-center"
                        onClick={() => setActiveTab("achievers")}
                      >
                        <Award className="h-6 w-6 mb-2" />
                        <span>Add Achiever</span>
                      </Button>
                      <Button
                        className="bg-orange-600 hover:bg-orange-700 h-auto py-4 flex flex-col items-center"
                        onClick={() => setActiveTab("faqs")}
                      >
                        <HelpCircle className="h-6 w-6 mb-2" />
                        <span>Manage FAQs</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Hero Section Tab */}
            <TabsContent value="hero">
              <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="bg-blue-700 text-white rounded-t-lg">
                  <CardTitle>Edit Hero Section</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div>
                    <Label htmlFor="subtitle" className="text-blue-800 font-semibold">
                      Subtitle
                    </Label>
                    <Input
                      id="subtitle"
                      name="subtitle"
                      value={heroContent.subtitle}
                      onChange={handleHeroChange}
                      placeholder="Enter subtitle"
                      className="mt-2 border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="title" className="text-blue-800 font-semibold">
                      Main Title
                    </Label>
                    <Input
                      id="title"
                      name="title"
                      value={heroContent.title}
                      onChange={handleHeroChange}
                      placeholder="Enter main title"
                      className="mt-2 border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <Label className="text-blue-800 font-semibold">Bullet Points</Label>
                    {heroContent.bulletPoints.map((point, index) => (
                      <div key={index} className="flex gap-2 mt-2">
                        <Input
                          value={point}
                          onChange={(e) => handleBulletPointChange(index, e.target.value)}
                          placeholder={`Bullet point ${index + 1}`}
                          className="border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                    ))}
                  </div>
                  <div>
                    <Label htmlFor="ctaText" className="text-blue-800 font-semibold">
                      CTA Button Text
                    </Label>
                    <Input
                      id="ctaText"
                      name="ctaText"
                      value={heroContent.ctaText}
                      onChange={handleHeroChange}
                      placeholder="Enter CTA text"
                      className="mt-2 border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="videoUrl" className="text-blue-800 font-semibold">
                      Video URL
                    </Label>
                    <Input
                      id="videoUrl"
                      name="videoUrl"
                      value={heroContent.videoUrl}
                      onChange={handleHeroChange}
                      placeholder="Enter video URL"
                      className="mt-2 border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <Button onClick={handleSaveHero} className="bg-blue-600 hover:bg-blue-700">
                    <Save className="h-4 w-4 mr-2" /> Save Hero Content
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Universities Tab */}
            <TabsContent value="universities">
              <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="bg-blue-700 text-white rounded-t-lg">
                  <CardTitle>Manage Universities</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="universityName" className="text-blue-800 font-semibold">
                        University Name
                      </Label>
                      <Input
                        id="universityName"
                        value={newUniversity.name}
                        onChange={(e) => setNewUniversity({ ...newUniversity, name: e.target.value })}
                        placeholder="Enter university name"
                        className="mt-2 border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <Label htmlFor="universityImage" className="text-blue-800 font-semibold">
                        Image URL
                      </Label>
                      <Input
                        id="universityImage"
                        value={newUniversity.imageUrl}
                        onChange={(e) => setNewUniversity({ ...newUniversity, imageUrl: e.target.value })}
                        placeholder="Enter image URL"
                        className="mt-2 border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <Button onClick={handleAddUniversity} className="bg-green-500 hover:bg-green-600 mt-4">
                    <Plus className="h-4 w-4 mr-2" /> Add University
                  </Button>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                    {universities.map((university, index) => (
                      <Card key={index} className="border border-blue-100">
                        <CardContent className="p-4">
                          <div className="flex flex-col items-center space-y-2">
                            <div className="w-full h-24 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                              <img
                                src={university.imageUrl || "/placeholder.svg"}
                                alt={university.name}
                                className="max-h-full object-contain"
                                onError={(e) => {
                                  e.currentTarget.src = "/placeholder.svg?height=80&width=200";
                                }}
                              />
                            </div>
                            <h3 className="font-semibold text-blue-800">{university.name}</h3>
                            <Button
                              variant="destructive"
                              onClick={() => handleRemoveUniversity(index)}
                              className="w-full bg-red-500 hover:bg-red-600"
                            >
                              <Trash className="h-4 w-4 mr-2" /> Remove
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Features Tab */}
            <TabsContent value="features">
              <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="bg-blue-700 text-white rounded-t-lg">
                  <CardTitle>Manage Features</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="featureIcon" className="text-blue-800 font-semibold">
                        Icon
                      </Label>
                      <select
                        id="featureIcon"
                        value={newFeature.icon}
                        onChange={(e) => setNewFeature({ ...newFeature, icon: e.target.value })}
                        className="w-full mt-2 px-3 py-2 rounded-md border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="FileText">File Text</option>
                        <option value="MessageSquare">Message Square</option>
                        <option value="PenTool">Pen Tool</option>
                        <option value="FileIcon">File Icon</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="featureTitle" className="text-blue-800 font-semibold">
                        Title
                      </Label>
                      <Input
                        id="featureTitle"
                        value={newFeature.title}
                        onChange={(e) => setNewFeature({ ...newFeature, title: e.target.value })}
                        placeholder="Enter feature title"
                        className="mt-2 border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <Label htmlFor="featureDescription" className="text-blue-800 font-semibold">
                        Description
                      </Label>
                      <Input
                        id="featureDescription"
                        value={newFeature.description}
                        onChange={(e) => setNewFeature({ ...newFeature, description: e.target.value })}
                        placeholder="Enter feature description"
                        className="mt-2 border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <Button onClick={handleAddFeature} className="bg-green-500 hover:bg-green-600 mt-4">
                    <Plus className="h-4 w-4 mr-2" /> Add Feature
                  </Button>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                    {features.map((feature, index) => (
                      <Card key={index} className="border border-blue-100">
                        <CardContent className="p-4 flex flex-col items-center space-y-2">
                          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            {iconComponents[feature.icon as keyof typeof iconComponents]}
                          </div>
                          <h3 className="font-semibold text-blue-800">{feature.title}</h3>
                          <p className="text-sm text-gray-600 text-center">{feature.description}</p>
                          <Button
                            variant="destructive"
                            onClick={() => handleRemoveFeature(index)}
                            className="w-full bg-red-500 hover:bg-red-600"
                          >
                            <Trash className="h-4 w-4 mr-2" /> Remove
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Achievers Tab */}
            <TabsContent value="achievers">
              <Card>
                <CardHeader className="bg-blue-700 text-white">
                  <CardTitle>Manage Top Achievers</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <Label>Name</Label>
                      <Input
                        value={newAchiever.name}
                        onChange={(e) => setNewAchiever({ ...newAchiever, name: e.target.value })}
                        placeholder="Enter achiever's name"
                      />
                    </div>
                    <div>
                      <Label>Image URL</Label>
                      <Input
                        value={newAchiever.image}
                        onChange={(e) => setNewAchiever({ ...newAchiever, image: e.target.value })}
                        placeholder="Enter image URL"
                      />
                    </div>
                    <div>
                      <Label>SAT Score</Label>
                      <Input
                        value={newAchiever.satScore}
                        onChange={(e) => setNewAchiever({ ...newAchiever, satScore: e.target.value })}
                        placeholder="Enter SAT score"
                      />
                    </div>
                    <div>
                      <Label>Scholarship Amount</Label>
                      <Input
                        value={newAchiever.scholarship}
                        onChange={(e) => setNewAchiever({ ...newAchiever, scholarship: e.target.value })}
                        placeholder="Enter scholarship amount"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label>Quote</Label>
                      <Input
                        value={newAchiever.quote}
                        onChange={(e) => setNewAchiever({ ...newAchiever, quote: e.target.value })}
                        placeholder="Enter achiever's quote"
                      />
                    </div>
                  </div>
                  <Button onClick={handleAddAchiever} className="w-full bg-green-600 hover:bg-green-700">
                    <Plus className="h-4 w-4 mr-2" /> Add Achiever
                  </Button>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                    {achievers.map((achiever, index) => (
                      <Card key={index} className="p-4">
                        <div className="flex flex-col space-y-4">
                          <div className="w-full h-40 bg-gray-100 rounded-lg overflow-hidden">
                            <img
                              src={achiever.image || "/placeholder.svg"}
                              alt={achiever.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="font-semibold">{achiever.name}</h3>
                            <p className="text-sm text-blue-600">SAT Score: {achiever.satScore}</p>
                            <p className="text-sm text-purple-600">Scholarship: ${achiever.scholarship}</p>
                            <p className="text-sm text-gray-600 mt-2">{achiever.quote}</p>
                          </div>
                          <Button variant="destructive" onClick={() => handleRemoveAchiever(index)} className="w-full">
                            <Trash className="h-4 w-4 mr-2" /> Remove
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Course Program Tab */}
            <TabsContent value="course">
              <Card>
                <CardHeader className="bg-blue-700 text-white">
                  <CardTitle>Manage Course Program</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 gap-4 mb-6">
                    <div>
                      <Label>Month Title</Label>
                      <Input
                        value={newCourseMonth.title}
                        onChange={(e) => setNewCourseMonth({ ...newCourseMonth, title: e.target.value })}
                        placeholder="Enter month title"
                      />
                    </div>
                    <div>
                      <Label>Content</Label>
                      <Input
                        value={newCourseMonth.content}
                        onChange={(e) => setNewCourseMonth({ ...newCourseMonth, content: e.target.value })}
                        placeholder="Enter month content"
                      />
                    </div>
                  </div>
                  <Button onClick={handleAddCourseMonth} className="w-full bg-green-600 hover:bg-green-700">
                    <Plus className="h-4 w-4 mr-2" /> Add Course Month
                  </Button>
                  <div className="space-y-4 mt-6">
                    {courseMonths.map((month, index) => (
                      <Card key={index} className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold">{month.title}</h3>
                            <p className="text-sm text-gray-600 mt-2">{month.content}</p>
                          </div>
                          <Button variant="destructive" onClick={() => handleRemoveCourseMonth(index)} size="sm">
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Coach Tab */}
            <TabsContent value="coach">
              <Card>
                <CardHeader className="bg-blue-700 text-white">
                  <CardTitle>Manage Coach Section</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div>
                    <Label>Title</Label>
                    <Input
                      name="title"
                      value={coachContent.title}
                      onChange={handleCoachChange}
                      placeholder="Enter coach section title"
                    />
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Input
                      name="description"
                      value={coachContent.description}
                      onChange={handleCoachChange}
                      placeholder="Enter coach description"
                    />
                  </div>
                  <div>
                    <Label>Coach Image URL</Label>
                    <Input
                      name="imageUrl"
                      value={coachContent.imageUrl}
                      onChange={handleCoachChange}
                      placeholder="Enter coach image URL"
                    />
                  </div>
                  <div>
                    <Label>Statistics</Label>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      {coachContent.stats.map((stat, index) => (
                        <Card key={index} className="p-4">
                          <div className="space-y-2">
                            <div>
                              <Label>Value</Label>
                              <Input
                                value={stat.value}
                                onChange={(e) => handleCoachStatChange(index, "value", e.target.value)}
                                placeholder="Enter stat value"
                              />
                            </div>
                            <div>
                              <Label>Label</Label>
                              <Input
                                value={stat.label}
                                onChange={(e) => handleCoachStatChange(index, "label", e.target.value)}
                                placeholder="Enter stat label"
                              />
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                  <Button onClick={handleSaveCoach} className="w-full bg-blue-600 hover:bg-blue-700">
                    <Save className="h-4 w-4 mr-2" /> Save Coach Content
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* FAQs Tab */}
            <TabsContent value="faqs">
              <Card>
                <CardHeader className="bg-blue-700 text-white">
                  <CardTitle>Manage FAQs</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 gap-4 mb-6">
                    <div>
                      <Label>Question</Label>
                      <Input
                        value={newFAQ.question}
                        onChange={(e) => setNewFAQ({ ...newFAQ, question: e.target.value })}
                        placeholder="Enter FAQ question"
                      />
                    </div>
                    <div>
                      <Label>Answer</Label>
                      <Input
                        value={newFAQ.answer}
                        onChange={(e) => setNewFAQ({ ...newFAQ, answer: e.target.value })}
                        placeholder="Enter FAQ answer"
                      />
                    </div>
                  </div>
                  <Button onClick={handleAddFAQ} className="w-full bg-green-600 hover:bg-green-700">
                    <Plus className="h-4 w-4 mr-2" /> Add FAQ
                  </Button>
                  <div className="space-y-4 mt-6">
                    {faqs.map((faq, index) => (
                      <Card key={index} className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold">{faq.question}</h3>
                            <p className="text-sm text-gray-600 mt-2">{faq.answer}</p>
                          </div>
                          <Button variant="destructive" onClick={() => handleRemoveFAQ(index)} size="sm">
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Users Tab */}
            <TabsContent value="users">
              <Card>
                <CardHeader className="bg-blue-700 text-white">
                  <CardTitle>Manage Users</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div>
                      <Label>Name</Label>
                      <Input
                        value={newUser.name}
                        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                        placeholder="Enter user name"
                      />
                    </div>
                    <div>
                      <Label>Email</Label>
                      <Input
                        value={newUser.email}
                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                        placeholder="Enter user email"
                        type="email"
                      />
                    </div>
                    <div>
                      <Label>Role</Label>
                      <select
                        value={newUser.role}
                        onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                        className="w-full mt-2 px-3 py-2 rounded-md border border-gray-300"
                      >
                        <option value="User">User</option>
                        <option value="Admin">Admin</option>
                      </select>
                    </div>
                  </div>
                  <Button onClick={handleAddUser} className="w-full bg-green-600 hover:bg-green-700">
                    <Plus className="h-4 w-4 mr-2" /> Add User
                  </Button>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                    {users.map((user) => (
                      <Card key={user.id} className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                {user.name.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <h3 className="font-semibold">{user.name}</h3>
                                <p className="text-sm text-gray-600">{user.email}</p>
                              </div>
                            </div>
                            <span className="inline-block mt-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                              {user.role}
                            </span>
                          </div>
                          <Button variant="destructive" onClick={() => handleRemoveUser(user.id)} size="sm">
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Help Questions Tab */}
            <TabsContent value="help-questions">
              <Card>
                <CardHeader className="bg-blue-700 text-white">
                  <CardTitle>Help Questions</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  {helpQuestions.length === 0 ? (
                    <p className="text-center text-gray-500 py-4">No questions yet</p>
                  ) : (
                    <div className="space-y-4">
                      {helpQuestions.map((question) => (
                        <Card key={question.id} className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium">{question.question}</p>
                              <p className="text-sm text-gray-500">{new Date(question.timestamp).toLocaleString()}</p>
                            </div>
                            <Button variant="destructive" size="sm" onClick={() => handleRemoveQuestion(question.id)}>
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Form Submissions Tab */}
            <TabsContent value="submissions">
              <Card>
                <CardHeader className="bg-blue-700 text-white">
                  <CardTitle>Form Submissions</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  {formSubmissions.length === 0 ? (
                    <p className="text-center text-gray-500 py-4">No submissions yet</p>
                  ) : (
                    <div className="space-y-4">
                      {formSubmissions.map((submission) => (
                        <Card key={submission.id} className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium">{submission.fullName}</p>
                              <p className="text-sm text-gray-600">{submission.email}</p>
                              <p className="text-sm text-gray-600">{submission.phoneNumber}</p>
                              <p className="text-sm text-gray-500">{new Date(submission.timestamp).toLocaleString()}</p>
                            </div>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleRemoveSubmission(submission.id)}
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;