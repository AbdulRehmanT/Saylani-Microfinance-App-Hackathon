"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";  // Import Axios

const LoanCalculator = ({ selectedCategory }) => {
  const loanDetails = {
    "Wedding Loans": {
      subcategories: ["Valima", "Furniture", "Valima Food", "Jahez"],
      maxLoan: 500000,
      loanPeriod: 3,
      initialDepositPercent: 0,
    },
    "Home Construction Loans": {
      subcategories: ["Structure", "Finishing", "Loan"],
      maxLoan: 1000000,
      loanPeriod: 5,
      initialDepositPercent: 0,
    },
    "Business Startup Loans": {
      subcategories: [
        "Buy Stall",
        "Advance Rent for Shop",
        "Shop Assets",
        "Shop Machinery",
      ],
      maxLoan: 1000000,
      loanPeriod: 5,
      initialDepositPercent: 0,
    },
    "Education Loans": {
      subcategories: ["University Fees", "Child Fees Loan"],
      maxLoan: "Based on requirement",
      loanPeriod: 4,
      initialDepositPercent: 0,
    },
  };

  const categoryDetails = loanDetails[selectedCategory];

  if (!categoryDetails) {
    return <p className="text-red-600">Selected category details are not available.</p>;
  }

  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [initialDeposit, setInitialDeposit] = useState(0);
  const [monthlyEMI, setMonthlyEMI] = useState(0);

  const url = process.env.NODE_ENV === 'development'
  ? 'http://localhost:4000'
  : 'https://saylani-microfinance-app-hackathon-backend.vercel.app';


  const calculateEMI = (loanAmount, initialDeposit) => {
    const annualInterestRate = 10;
    const monthlyInterestRate = annualInterestRate / 100 / 12;
    const loanPrincipal = loanAmount - initialDeposit;
    const totalPayments = categoryDetails.loanPeriod * 12;

    const emi =
      (loanPrincipal *
        monthlyInterestRate *
        Math.pow(1 + monthlyInterestRate, totalPayments)) /
      (Math.pow(1 + monthlyInterestRate, totalPayments) - 1);

    return emi;
  };

  useEffect(() => {
    if (loanAmount && initialDeposit >= 0) {
      const emi = calculateEMI(loanAmount, initialDeposit);
      setMonthlyEMI(emi);
    }
  }, [loanAmount, initialDeposit]);

  const handleLoanAmountChange = (e) => {
    const value = e.target.value;
    if (
      categoryDetails.maxLoan !== "Based on requirement" &&
      value > categoryDetails.maxLoan
    ) {
      setErrorMessage(
        `Loan amount should not exceed PKR ${categoryDetails.maxLoan.toLocaleString()}`
      );
    } else {
      setErrorMessage("");
      setLoanAmount(value);
    }
  };

  const handleInitialDepositChange = (e) => {
    const value = e.target.value;
    if (value < 0) {
      setErrorMessage("Initial deposit cannot be negative.");
    } else {
      setErrorMessage("");
      setInitialDeposit(value);
    }
  };

  const router = useRouter();
  const isLoggedIn = false;

  const handleApplyLoan = async () => {
    if (!selectedSubcategory || !loanAmount) {
      setErrorMessage("Please fill in all the details.");
      return;
    }
  
    try {
      // Making the POST request using axios
      const response = await axios.post(`${url}/api/v1/loan`, {
        selectedCategory,
        selectedSubcategory,
        loanAmount,
        initialDeposit,
        monthlyEMI,
      });
  
      // If the response is successful
      alert("Loan application saved successfully!");
      router.push("/registration");    // Redirect if needed
    } catch (error) {
      console.error("Error applying for loan:", error);
      if (error.response) {
        console.error("Error details:", error.response.data);
        setErrorMessage(error.response.data.message || "An error occurred while applying for the loan.");
      } else {
        setErrorMessage("An unknown error occurred.");
      }
    }
  };
  

  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-700 mb-4">Loan Calculator</h3>

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

      <div className="mt-6">
        <h4 className="font-semibold text-lg">Loan Details</h4>
        <p>
          Maximum Loan: PKR{" "}
          {categoryDetails.maxLoan === "Based on requirement"
            ? "No limit"
            : categoryDetails.maxLoan.toLocaleString()}
        </p>
        <p>Loan Period: {categoryDetails.loanPeriod} years</p>
      </div>

      {loanAmount && (
        <div className="mt-6 bg-gray-100 p-4 rounded-lg">
          <h4 className="font-semibold text-lg">Loan Breakdown</h4>
          <p>Loan Amount: PKR {loanAmount.toLocaleString()}</p>
          <p>Initial Deposit: PKR {initialDeposit.toLocaleString()}</p>
        </div>
      )}

      {monthlyEMI > 0 && (
        <div className="mt-4">
          <h4 className="font-semibold text-lg">Monthly EMI</h4>
          <p>PKR {monthlyEMI.toFixed(2)}</p>
        </div>
      )}

      <div className="mt-4">
        <button
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          disabled={
            !selectedSubcategory ||
            !loanAmount ||
            loanAmount > categoryDetails.maxLoan
          }
          onClick={handleApplyLoan}
        >
          Apply for Loan
        </button>
      </div>
    </div>
  );
};

export default LoanCalculator;
