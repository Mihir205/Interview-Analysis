"use client";  
import { useState, useEffect } from "react";
import Link from "next/link";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

export default function Analysis() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const data = {
    labels: ["Interview 1", "Interview 2", "Interview 3"],
    datasets: [
      {
        label: "Performance",
        data: [85, 70, 90],
        backgroundColor: "rgba(75,192,192,0.4)",
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-6">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-center">Interview Analysis</h1>
        <p className="mt-2 text-gray-600 text-center">
          Performance insights from past interviews.
        </p>

        <div className="mt-6 p-6 bg-blue-50 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-800">Performance Chart</h2>
          {isClient ? <Bar data={data} /> : <p className="text-gray-500">Loading chart...</p>}
        </div>

        <div className="mt-6 flex justify-center space-x-6">
          <Link href="/" className="px-4 py-2 bg-gray-800 text-white rounded-lg shadow-md hover:bg-gray-900 transition">
            Home
          </Link>
          <Link href="/dashboard" className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition">
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}