import React, { useState } from "react";
import { toast } from "react-hot-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email && newPassword) {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_DOMIN}/reset-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, newPassword }),
        }
      );

      const result = await response.json();
      toast(result.message);
    } else {
      toast.error("Please fill all fields");
    }
  };

  return (
    <div className="p-3 md:p-4">
      <div className="w-full max-w-sm bg-white m-auto flex flex-col p-4">
        <h2 className="text-center text-2xl font-bold">Reset Password</h2>
        <form className="w-full py-4 flex flex-col" onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button className="max-w-[150px] m-auto rounded-full w-full bg-green-500 hover:bg-green-600 cursor-pointer text-white text-xl font-medium text-center py-1 mt-4">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
