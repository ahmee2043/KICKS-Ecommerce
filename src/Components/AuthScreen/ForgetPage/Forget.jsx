import React from 'react'
import { Link } from 'react-router-dom'

const Forget = () => {
  return (
    <div>
        <div className="flex flex-col items-center py-20">
            <h1 className="text-3xl font-bold mb-4">Forget Password</h1>
            <p className="text-gray-600 mb-6">Please enter your email to reset your password.</p>
            <form className="w-full max-w-sm">
            <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-3 border border-[#232321] rounded mb-4"
            />
            <button
                type="submit"
                className="w-full bg-[#232321] text-white p-3 rounded hover:bg-black transition-colors"
            >
                Reset Password
            </button>
            <p className="text-gray-600 mt-4">
                Remembered your password? <Link to="/Login" className="font-medium text-[#232321]">Login</Link>
            </p>
            </form>
        </div>
    </div>
  )
}

export default Forget
