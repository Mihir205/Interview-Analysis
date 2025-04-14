// signup/page.js
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone_number: "",
    password: "",
    confirm_password: "",
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "email":
        if (!/\S+@\S+\.\S+/.test(value)) error = "Invalid email format.";
        break;
      case "phone_number":
        if (!/^\d{10}$/.test(value)) error = "Phone number must be 10 digits.";
        break;
      case "password":
        if (value.length < 8) error = "Password must be at least 8 characters.";
        break;
      case "confirm_password":
        if (value !== form.password) error = "Passwords do not match.";
        break;
      default:
        break;
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(errors).some((error) => error) || Object.values(form).some((val) => val === "")) {
      alert("Please fix errors before submitting.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone_number: form.phone_number,
          password: form.password,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        localStorage.setItem("user", JSON.stringify(data.user));
        router.push("/dashboard");
      } else {
        alert(data.error);
      }
    } catch (err) {
      alert("An error occurred. Try again later.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-gray-900 text-center">Signup</h2>
        <form className="mt-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 font-medium">Name</label>
            <input
              name="name"
              placeholder="Enter your name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full mt-2 px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 text-black"
            />
          </div>

          <div className="mt-4">
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full mt-2 px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 text-black"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          <div className="mt-4">
            <label className="block text-gray-700 font-medium">Phone Number</label>
            <input
              type="tel"
              name="phone_number"
              placeholder="Enter your phone number"
              value={form.phone_number}
              onChange={handleChange}
              required
              className="w-full mt-2 px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 text-black"
            />
          </div>

          <div className="mt-4">
            <label className="block text-gray-700 font-medium">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full mt-2 px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 text-black"
            />
          </div>

          <div className="mt-4">
            <label className="block text-gray-700 font-medium">Confirm Password</label>
            <input
              type="password"
              name="confirm_password"
              placeholder="Confirm your password"
              value={form.confirm_password}
              onChange={handleChange}
              required
              className="w-full mt-2 px-4 py-2 border rounded-lg focus:ring focus:ring-blue-200 text-black"
            />
          </div>

          <button className="w-full mt-6 px-4 py-2 bg-blue-500 text-white font-medium rounded-lg shadow-md hover:bg-blue-600 transition">
            Register
          </button>
          <p className="text-center text-gray-600 mt-4">
            Have an account? <Link href="/login" className="text-blue-500 hover:underline">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
