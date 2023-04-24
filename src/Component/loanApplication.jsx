import React, { useState } from "react";

// Define a functional component for the loan application form
const LoanApplicationForm = () => {
  const [businessName, setBusinessName] = useState("");
  const [yearEstablished, setYearEstablished] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [preAssessment, setPreAssessment] = useState("");
  const [error, setError] = useState("");

  // Handler for submitting the loan application form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Call backend API to process loan application
    try {
      const response = await fetch("http://localhost:5030/loan-application", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          businessName,
          yearEstablished,
          loanAmount,
        }),
      });

      if (response.ok) {
        const { decision } = await response.json();
        setPreAssessment(decision);
        setError("");
      } else {
        setError("Failed to process loan application");
      }
    } catch (err) {
      setError("Failed to process loan application");
    }
  };

  return (
    <div>
      <h1>Business Loan Application</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Business Name:
          <input
            type="text"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
          />
        </label>
        <label>
          Year Established:
          <input
            type="text"
            value={yearEstablished}
            onChange={(e) => setYearEstablished(e.target.value)}
          />
        </label>
        <label>
          Loan Amount:
          <input
            type="text"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      {preAssessment && (
        <div>
          <h2>Pre-assessment Value: {preAssessment}</h2>
        </div>
      )}
      {error && (
        <div>
          <p style={{ color: "red" }}>{error}</p>
        </div>
      )}
    </div>
  );
};

export default LoanApplicationForm;
