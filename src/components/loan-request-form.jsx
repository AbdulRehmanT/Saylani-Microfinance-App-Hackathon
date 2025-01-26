'use client'
import { useState } from "react";

const LoanRequestForm = () => {

  const url = process.env.NODE_ENV === 'development'
  ? 'http://localhost:4000'
  : 'https://saylani-microfinance-app-hackathon-backend.vercel.app';

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    loanAmount: "",
    loanCategory: "",
    guarantors: [
      { name: "", email: "", cnic: "", location: "" },
      { name: "", email: "", cnic: "", location: "" },
    ],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGuarantorChange = (index, e) => {
    const { name, value } = e.target;
    const newGuarantors = [...formData.guarantors];
    newGuarantors[index][name] = value;
    setFormData((prev) => ({ ...prev, guarantors: newGuarantors }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${url}/api/loanRequest`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Loan Request Submitted:", data);
        alert("Loan request submitted successfully!");
      } else {
        console.error("Error submitting loan request:", data);
        alert("Error submitting loan request.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error connecting to the server.");
    }
  };

  return (
    <section className="py-12">
      <div className="container mx-auto text-center">
        <h2 className="text-2xl font-semibold mb-6">Loan Request Form</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Personal Information */}
          <div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-lg w-full"
              placeholder="Full Name"
              required
            />
          </div>
          <div>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-lg w-full"
              placeholder="Phone Number"
              required
            />
          </div>
          <div>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-lg w-full"
              placeholder="Address"
              required
            />
          </div>

          {/* Guarantor Information */}
          {formData.guarantors.map((guarantor, index) => (
            <div key={index} className="border-t pt-4">
              <h3 className="text-lg font-semibold">Guarantor {index + 1}</h3>
              <input
                type="text"
                name="name"
                value={guarantor.name}
                onChange={(e) => handleGuarantorChange(index, e)}
                className="p-2 border border-gray-300 rounded-lg w-full"
                placeholder="Guarantor Name"
                required
              />
              <input
                type="email"
                name="email"
                value={guarantor.email}
                onChange={(e) => handleGuarantorChange(index, e)}
                className="p-2 border border-gray-300 rounded-lg w-full"
                placeholder="Guarantor Email"
                required
              />
              <input
                type="text"
                name="cnic"
                value={guarantor.cnic}
                onChange={(e) => handleGuarantorChange(index, e)}
                className="p-2 border border-gray-300 rounded-lg w-full"
                placeholder="Guarantor CNIC"
                required
              />
              <input
                type="text"
                name="location"
                value={guarantor.location}
                onChange={(e) => handleGuarantorChange(index, e)}
                className="p-2 border border-gray-300 rounded-lg w-full"
                placeholder="Guarantor Location"
                required
              />
            </div>
          ))}

          <div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default LoanRequestForm;
