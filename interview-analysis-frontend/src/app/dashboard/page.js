"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Dashboard() {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    import("socket.io-client").then(({ default: io }) => {
      const newSocket = io("http://localhost:5000");
      setSocket(newSocket);

      newSocket.on("message", (msg) => {
        setMessages((prev) => [...prev, msg]);
      });

      return () => newSocket.disconnect();
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 p-6">
      <div className="w-full max-w-3xl mx-auto bg-white shadow-2xl rounded-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-6">
          <h1 className="text-3xl font-bold text-white text-center">Dashboard</h1>
          <p className="mt-2 text-blue-100 text-center">Live updates from the interview bot</p>
        </div>
        
        {/* Messages Section */}
        <div className="px-8 py-6">
          <div className="bg-blue-50 rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Live Messages</h2>
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">{messages.length} received</span>
            </div>
            <div className="mt-3 max-h-60 overflow-y-auto border border-blue-100 p-4 rounded-lg bg-white shadow-inner">
              {messages.length > 0 ? (
                <ul className="space-y-3">
                  {messages.map((msg, index) => (
                    <li key={index} className="p-3 bg-gradient-to-r from-gray-50 to-gray-100 border-l-4 border-blue-500 rounded-lg shadow-sm">
                      {msg}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="py-8 text-center">
                  <div className="inline-block p-4 rounded-full bg-blue-100 mb-3">
                    <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                    </svg>
                  </div>
                  <p className="text-gray-500">No messages yet...</p>
                  <p className="text-sm text-gray-400 mt-1">Messages will appear here once received</p>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="mt-8 grid grid-cols-3 gap-4">
            <Link href="/" className="flex flex-col items-center p-4 bg-gray-800 text-white font-medium rounded-lg shadow-md hover:bg-gray-900 transition group">
              <svg className="w-6 h-6 mb-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
              </svg>
              Home
            </Link>
            <Link href="/analysis" className="flex flex-col items-center p-4 bg-purple-600 text-white font-medium rounded-lg shadow-md hover:bg-purple-700 transition group">
              <svg className="w-6 h-6 mb-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
              Analysis
            </Link>
            <Link href="/login" className="flex flex-col items-center p-4 bg-red-500 text-white font-medium rounded-lg shadow-md hover:bg-red-600 transition group">
              <svg className="w-6 h-6 mb-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
              </svg>
              Logout
            </Link>
          </div>
        </div>
        
        {/* Footer */}
        <div className="bg-gray-50 px-8 py-4 border-t border-gray-100">
          <p className="text-center text-gray-500 text-sm">© {new Date().getFullYear()} Interview Bot Dashboard</p>
        </div>
      </div>
    </div>
  );
}