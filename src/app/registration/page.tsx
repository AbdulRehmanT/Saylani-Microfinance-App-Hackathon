"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const Registration = () => {
  const [cnic, setCnic] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const url = process.env.NODE_ENV === 'development'
  ? 'http://localhost:4000'
  : 'https://saylani-microfinance-app-hackathon-backend.vercel.app';


  const router = useRouter();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // Simple validation
    if (!cnic || !email || !name) {
      setErrorMessage("All fields are required.");
      return;
    }

    try {
      // Send registration details to backend
      const response = await axios.post(`${url}/api/v1/register`, {
        cnic,
        email,
        name,
      });

      // If registration is successful
      alert(response.data.message);
      router.push("/loan-request"); // Redirect to loan request page
    } catch (error: unknown) {
      console.error("Error during registration:", error);

      // Type guard for AxiosError
      if (axios.isAxiosError(error)) {
        // Now that we know it's an AxiosError, we can safely access `response`
        setErrorMessage(error.response?.data.message || "Registration failed.");
      } else {
        setErrorMessage("An unknown error occurred.");
      }
    }
  };

  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-700 mb-4">Registration</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm text-gray-600">CNIC</label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            value={cnic}
            maxLength={13}
            onChange={(e) => setCnic(e.target.value)}
            placeholder="Enter CNIC"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-600">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-600">Name</label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Name"
          />
        </div>

        {errorMessage && <p className="text-red-600">{errorMessage}</p>}

        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Registration;
