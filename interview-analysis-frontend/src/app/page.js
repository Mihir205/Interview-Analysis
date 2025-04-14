"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/";
  };

  const handleDownloadBot = () => {
    const link = document.createElement("a");
    link.href = "/meeting_bot.exe";
    link.download = "meeting_bot.exe";
    link.click();
  };  

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-blue-600 font-bold text-xl">Interview Analyzer</span>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8 text-black">
                <Link href="/" className="border-blue-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">Home</Link>
                {user && (
                  <div className="welcome-text ml-4 flex items-center">
                    <span className="text-gray-700">Welcome, {user.name}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="hidden sm:flex sm:items-center">
              {user ? (
                <>
                  <Link href="/dashboard">
                    <button className="bg-green-500 text-white px-6 py-2 rounded-md shadow-md hover:scale-105 mr-4">Dashboard</button>
                  </Link>
                  <button onClick={handleLogout} className="bg-red-500 text-white px-6 py-2 rounded-md shadow-md hover:scale-105">Logout</button>
                </>
              ) : (
                <Link href="/signup">
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-md shadow-md hover:scale-105">Login/Sign Up</button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-extrabold text-gray-900">Interview Analysis System</h1>
            <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">Enhance your interview performance with our AI-powered analysis tool</p>
          </div>
          {/* Features Grid */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Automated Recording",
                description:
                  "Our intelligent bot seamlessly joins your online interviews and records the entire session without any manual setup.",
                bg: "bg-blue-50",
                border: "border-blue-100",
                iconBg: "bg-blue-600",
              },
              {
                title: "AI-Powered Analysis",
                description:
                  "Get insights on communication skills, body language, and technical responses with advanced AI analysis.",
                bg: "bg-purple-50",
                border: "border-purple-100",
                iconBg: "bg-purple-600",
              },
              {
                title: "Performance Improvement",
                description:
                  "Receive personalized feedback and actionable suggestions to improve your interview performance.",
                bg: "bg-green-50",
                border: "border-green-100",
                iconBg: "bg-green-600",
              },
            ].map((feature, index) => (
              <div key={index} className="pt-6">
                <div
                  className={`flow-root ${feature.bg} rounded-lg px-6 pb-8 shadow-lg ${feature.border} transform transition duration-300 hover:scale-105 hover:shadow-xl h-full`}
                >
                  <div className="-mt-6">
                    <div>
                      <span
                        className={`inline-flex items-center justify-center p-3 ${feature.iconBg} rounded-md shadow-lg transition-all duration-300 hover:rotate-12`}
                      >
                        <svg
                          className="h-6 w-6 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </span>
                    </div>
                    <h3 className="mt-8 text-xl font-bold text-gray-900 tracking-tight">
                      {feature.title}
                    </h3>
                    <p className="mt-5 text-base text-gray-600">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-semibold text-gray-900">Ready to start your interview analysis?</h2>
            <p className="mt-4 text-gray-600">Download the bot and join your interview sessions today.</p>
            <div className="mt-8">
              <button onClick={handleDownloadBot} className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:scale-105">Download the Bot</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}