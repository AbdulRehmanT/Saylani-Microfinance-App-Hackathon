"use client";
import { useState, useEffect } from "react";

const LoanCalculator = ({ selectedCategory }) => {
  const [deposit, setDeposit] = useState('');
  const [loanPeriod, setLoanPeriod] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [loanBreakdown, setLoanBreakdown] = useState(null);

  const categories = [
    { 
      name: 'Wedding Loans', 
      maxLoan: 500000, 
      loanPeriod: 3, 
      subcategories: ['Valima', 'Furniture', 'Valima Food', 'Jahez']
    },
    { 
      name: 'Home Construction Loans', 
      maxLoan: 1000000, 
      loanPeriod: 5, 
      subcategories: ['Structure', 'Finishing', 'Loan']
    },
    { 
      name: 'Business Startup Loans', 
      maxLoan: 1000000, 
      loanPeriod: 5, 
      subcategories: ['Buy Stall', 'Advance Rent for Shop', 'Shop Assets', 'Shop Machinery']
    },
    { 
      name: 'Education Loans', 
      maxLoan: 'Based on requirement', 
      loanPeriod: 4, 
      subcategories: ['University Fees', 'Child Fees Loan']
    }
  ];

  const selectedCategoryData = categories.find(cat => cat.name === selectedCategory);

  useEffect(() => {
    setSelectedSubcategory(''); // Reset subcategory when category changes
  }, [selectedCategory]);

  const calculateLoan = () => {
    if (!selectedCategoryData) {
      // If selectedCategoryData is undefined, prevent further calculations
      return;
    }

    if (deposit && loanPeriod && selectedSubcategory) {
      // Ensure deposit is within the maxLoan limit for the selected category
      if (parseFloat(deposit) > selectedCategoryData.maxLoan) {
        alert(`Maximum loan limit for ${selectedCategory} is ${selectedCategoryData.maxLoan}`);
        return;
      }

      // Simple loan calculation without interest (deposit * loanPeriod)
      const totalLoan = parseFloat(deposit) * parseInt(loanPeriod);
      setLoanBreakdown({
        totalLoan: totalLoan.toFixed(2),
        monthlyPayment: (totalLoan / (loanPeriod * 12)).toFixed(2),
      });
    }
  };

  // If no category is selected, display a message and return
  if (!selectedCategoryData) {
    return <div className="text-center text-red-500">Please select a valid category to calculate the loan.</div>;
  }

  return (
    <section className="py-12">
      <div className="container mx-auto text-center">
        <h2 className="text-2xl font-semibold mb-6">Loan Calculator for {selectedCategory}</h2>

        {/* Subcategory Selection */}
        <div className="mb-6">
          <select
            value={selectedSubcategory}
            onChange={(e) => setSelectedSubcategory(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg mr-4"
          >
            <option value="">Select Subcategory</option>
            {selectedCategoryData.subcategories.map((sub, idx) => (
              <option key={idx} value={sub}>
                {sub}
              </option>
            ))}
          </select>
        </div>

        {/* Initial Deposit and Loan Period */}
        <div className="mb-6">
          <input
            type="number"
            className="p-2 border border-gray-300 rounded-lg mr-4"
            placeholder="Initial Deposit"
            value={deposit}
            onChange={(e) => setDeposit(e.target.value)}
          />
          <select
            className="p-2 border border-gray-300 rounded-lg"
            value={loanPeriod}
            onChange={(e) => setLoanPeriod(e.target.value)}
          >
            <option value="">Select Loan Period</option>
            <option value="3">3 years</option>
            <option value="5">5 years</option>
            <option value="4">4 years</option>
          </select>
        </div>

        {/* Calculate Button */}
        <button
          onClick={calculateLoan}
          className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Calculate Loan
        </button>

        {/* Display Loan Breakdown */}
        {loanBreakdown && (
          <div className="mt-8 p-4 border border-gray-300 rounded-lg">
            <h3 className="text-xl font-semibold">Loan Breakdown:</h3>
            <p>Total Loan: Rs {loanBreakdown.totalLoan}</p>
            <p>Monthly Payment: Rs {loanBreakdown.monthlyPayment}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default LoanCalculator;
