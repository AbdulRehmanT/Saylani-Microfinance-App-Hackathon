'use client'
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoanCalculator = ({ selectedCategory }) => {
  // Define loan categories and their properties
  const loanDetails = {
    "Wedding Loans": {
      subcategories: ["Valima", "Furniture", "Valima Food", "Jahez"],
      maxLoan: 500000, // PKR 5 Lakh
      loanPeriod: 3, // 3 years
      initialDepositPercent: 0, // No initial deposit
    },
    "Home Construction Loans": {
      subcategories: ["Structure", "Finishing", "Loan"],
      maxLoan: 1000000, // PKR 10 Lakh
      loanPeriod: 5, // 5 years
      initialDepositPercent: 0, // No initial deposit
    },
    "Business Startup Loans": {
      subcategories: ["Buy Stall", "Advance Rent for Shop", "Shop Assets", "Shop Machinery"],
      maxLoan: 1000000, // PKR 10 Lakh
      loanPeriod: 5, // 5 years
      initialDepositPercent: 0, // No initial deposit
    },
    "Education Loans": {
      subcategories: ["University Fees", "Child Fees Loan"],
      maxLoan: "Based on requirement", // No predefined limit
      loanPeriod: 4, // 4 years
      initialDepositPercent: 0, // No initial deposit
    },
  };

  // Get category details based on the selected category
  const categoryDetails = loanDetails[selectedCategory];

  if (!categoryDetails) {
    return <p className="text-red-600">Selected category details are not available.</p>;
  }

  // State hooks for loan calculator
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [initialDeposit, setInitialDeposit] = useState(0); // Initial deposit input
  const [monthlyEMI, setMonthlyEMI] = useState(0); // Monthly EMI

  // Handle loan amount changes and update the loan after deposit (no deposit logic now)
  const handleLoanAmountChange = (e) => {
    const value = e.target.value;
    if (categoryDetails.maxLoan !== "Based on requirement" && value > categoryDetails.maxLoan) {
      setErrorMessage(`Loan amount should not exceed PKR ${categoryDetails.maxLoan.toLocaleString()}`);
    } else {
      setErrorMessage("");
      setLoanAmount(value);
    }
  };

  // Handle initial deposit changes
  const handleInitialDepositChange = (e) => {
    const value = e.target.value;
    if (value < 0) {
      setErrorMessage("Initial deposit cannot be negative.");
    } else {
      setErrorMessage("");
      setInitialDeposit(value);
    }
  };

  // Function to calculate the EMI
  const calculateEMI = () => {
    // Assuming an annual interest rate of 10%
    const annualInterestRate = 10;
    const monthlyInterestRate = annualInterestRate / 100 / 12;
    const loanPrincipal = loanAmount - initialDeposit;
    const totalPayments = categoryDetails.loanPeriod * 12; // Loan period in months

    // EMI Calculation
    const emi = (loanPrincipal * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalPayments)) / (Math.pow(1 + monthlyInterestRate, totalPayments) - 1);

    setMonthlyEMI(emi);
  };

  // Use the Next.js router to redirect after form submission
  const router = useRouter();
  const handleApplyLoan = () => {
    router.push("/registration"); // Assuming the registration page is at /registration
  };

  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-700 mb-4">Loan Calculator</h3>

      {/* Subcategory Dropdown */}
      <div className="mb-4">
        <label className="block text-sm text-gray-600">Select Subcategory</label>
        <select
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          value={selectedSubcategory}
          onChange={(e) => setSelectedSubcategory(e.target.value)}
        >
          <option value="">Select Subcategory</option>
          {categoryDetails.subcategories.map((subcategory, index) => (
            <option key={index} value={subcategory}>
              {subcategory}
            </option>
          ))}
        </select>
      </div>

      {/* Loan Amount Input */}
      <div className="mb-4">
        <label className="block text-sm text-gray-600">Enter Loan Amount</label>
        <input
          type="number"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          placeholder="Enter Loan Amount"
          value={loanAmount}
          onChange={handleLoanAmountChange}
        />
        {errorMessage && <p className="text-red-600 text-sm mt-2">{errorMessage}</p>}
      </div>

      {/* Initial Deposit Input */}
      <div className="mb-4">
        <label className="block text-sm text-gray-600">Enter Initial Deposit (optional)</label>
        <input
          type="number"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          placeholder="Enter Initial Deposit (if any)"
          value={initialDeposit}
          onChange={handleInitialDepositChange}
        />
        {errorMessage && <p className="text-red-600 text-sm mt-2">{errorMessage}</p>}
      </div>

      {/* Display Loan Details */}
      <div className="mt-6">
        <h4 className="font-semibold text-lg">Loan Details</h4>
        <p>Maximum Loan: PKR {categoryDetails.maxLoan === "Based on requirement" ? "No limit" : categoryDetails.maxLoan.toLocaleString()}</p>
        <p>Loan Period: {categoryDetails.loanPeriod} years</p>
      </div>

      {/* EMI Calculation Section */}
      {loanAmount && (
        <div className="mt-6 bg-gray-100 p-4 rounded-lg">
          <h4 className="font-semibold text-lg">Loan Breakdown</h4>
          <p>Loan Amount: PKR {loanAmount.toLocaleString()}</p>
          <p>Initial Deposit: PKR {initialDeposit.toLocaleString()}</p>
          <button
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            onClick={calculateEMI}
          >
            Calculate EMI
          </button>
        </div>
      )}

      {/* Monthly EMI Display */}
      {monthlyEMI > 0 && (
        <div className="mt-4">
          <h4 className="font-semibold text-lg">Monthly EMI</h4>
          <p>PKR {monthlyEMI.toFixed(2)}</p>
        </div>
      )}

      {/* Apply Loan Button */}
      <div className="mt-4">
        <button
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          disabled={!selectedSubcategory || !loanAmount || loanAmount > categoryDetails.maxLoan}
          onClick={handleApplyLoan}
        >
          Apply for Loan
        </button>
      </div>
    </div>
  );
};

export default LoanCalculator;
