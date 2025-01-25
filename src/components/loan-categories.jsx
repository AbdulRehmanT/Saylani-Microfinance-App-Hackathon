"use client";
import { useState } from "react";
import Link from "next/link"; // Ensure you import Link
import LoanCalculator from '@/components/loan-calculator'; // Import the LoanCalculator component

const LoanCategories = () => {
  const categories = [
    { name: "Wedding Loans" },
    { name: "Home Construction Loans" },
    { name: "Business Startup Loans" },
    { name: "Education Loans" }
  ];

  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <section className="py-12">
      <div className="container mx-auto text-center">
        <h2 className="text-2xl mb-8">Loan Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className="bg-gray-200 py-8 px-4 rounded-lg transition duration-300 border border-gray-300 cursor-pointer"
              onClick={() => setSelectedCategory(category.name)} // Set the category on click
            >
              <h3 className="text-lg">{category.name}</h3>
              <Link href="#">Get Loan</Link>
            </div>
          ))}
        </div>
        
        {/* Conditionally render Loan Calculator */}
        {selectedCategory && <LoanCalculator selectedCategory={selectedCategory} />}
      </div>
    </section>
  );
};

export default LoanCategories;
