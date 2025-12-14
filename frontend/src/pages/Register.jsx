import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

function SignupPage() {
    const { register } = useAuth(); 
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleFormSubmit = async (e) => {
        e.preventDefault(); 
        if (!fullName || !email || !password ) {
            setError("Please fill all required fields and upload an avatar.");
            return;
        }
        
        setError('');
        setLoading(true);

        try {
            await register({ fullName, email, password }); 
            alert('Signup successful! You will now be redirected to the login page.');
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed. Please try again.");
           
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-amber-50 via-amber-100 to-orange-50 flex items-center justify-center p-6 relative overflow-hidden">
            {/* Floating memory orbs */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-20 left-10 w-20 h-20 bg-linear-to-br from-amber-200/30 to-orange-200/30 rounded-full blur-xl animate-float-slow"></div>
                <div className="absolute top-1/2 right-20 w-32 h-32 bg-linear-to-br from-orange-200/40 to-amber-300/40 rounded-full blur-2xl animate-float-medium"></div>
                <div className="absolute bottom-32 left-1/4 w-24 h-24 bg-linear-to-br from-amber-300/50 to-orange-300/50 rounded-full blur-xl animate-float-fast"></div>
            </div>

            <div className="w-full max-w-md relative z-10">
                {/* Header Section */}
                <div className="text-center mb-12 group">
                    <div className="inline-block p-6 bg-linear-to-br from-amber-100 via-amber-200 to-orange-100 rounded-3xl shadow-2xl group-hover:scale-105 transition-all duration-700 hover:shadow-3xl mb-6 border border-amber-200/50 backdrop-blur-sm">
                        <svg className="w-16 h-16 text-amber-600 mx-auto mb-3 group-hover:scale-110 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                        </svg>
                    </div>
                    <h1 className="text-5xl font-black bg-linear-to-r from-amber-900 via-amber-800 to-orange-900 bg-clip-text text-transparent mb-3 leading-tight drop-shadow-lg">
                        Join MemoryLane
                    </h1>
                    <p className="text-xl text-amber-700 font-light tracking-wide">Start preserving your precious moments ✨</p>
                </div>

                {/* Form Card */}
                <div className="group relative bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-amber-200/40 hover:border-amber-300/60 p-10 hover:shadow-3xl transition-all duration-700 hover:-translate-y-2">
                    <div className="absolute inset-0 bg-linear-to-r from-amber-400/10 via-orange-400/5 to-amber-400/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    
                    <h2 className="text-3xl font-black bg-linear-to-r from-amber-900 to-orange-900 bg-clip-text text-transparent mb-8 text-center relative z-10">
                        Create Your Time Capsule
                    </h2>
                    
                    {error && (
                        <div className="relative bg-linear-to-r from-red-50/90 to-rose-50/90 border backdrop-blur-sm rounded-2xl p-6 mb-8 shadow-lg border-l-8 border-red-400/60">
                            <div className="absolute top-3 right-3 w-3 h-3 bg-red-400/80 rounded-full animate-ping"></div>
                            <p className="text-red-800 font-semibold text-base leading-relaxed relative z-10">{error}</p>
                        </div>
                    )}
                    
                    <form onSubmit={handleFormSubmit} className="space-y-6 relative z-10">
                        {/* Full Name Input */}
                        <div className="relative">
                            <label className="block text-sm font-bold text-amber-900 mb-3 tracking-wide">
                                Full Name
                            </label>
                            <div className="relative">
                                <input 
                                    type="text"
                                    placeholder="Your cherished name"
                                    onChange={(e) => setFullName(e.target.value)} 
                                    value={fullName}
                                    required
                                    className="w-full relative bg-white/60 border-2 border-amber-200/60 focus:border-amber-500 focus:ring-4 focus:ring-amber-200/40 p-5 rounded-2xl transition-all duration-500 outline-none backdrop-blur-sm hover:border-amber-300/80 font-semibold text-amber-900 placeholder-amber-500 hover:shadow-md shadow-sm"
                                />
                                <div className="absolute inset-0 bg-linear-to-r from-amber-400/10 to-orange-400/10 rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"></div>
                            </div>
                        </div>

                        {/* Email Input */}
                        <div className="relative">
                            <label className="block text-sm font-bold text-amber-900 mb-3 tracking-wide">
                                Email Address
                            </label>
                            <div className="relative">
                                <input 
                                    type="email" 
                                    placeholder="Enter your email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    required
                                    className="w-full relative bg-white/60 border-2 border-amber-200/60 focus:border-amber-500 focus:ring-4 focus:ring-amber-200/40 p-5 rounded-2xl transition-all duration-500 outline-none backdrop-blur-sm hover:border-amber-300/80 font-semibold text-amber-900 placeholder-amber-500 hover:shadow-md shadow-sm"
                                />
                                <div className="absolute inset-0 bg-linear-to-r from-amber-400/10 to-orange-400/10 rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"></div>
                            </div>
                        </div>
                        
                        {/* Password Input */}
                        <div className="relative">
                            <label className="block text-sm font-bold text-amber-900 mb-3 tracking-wide">
                                Password
                            </label>
                            <div className="relative">
                                <input 
                                    type="password"
                                    placeholder="Create a strong password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    required
                                    className="w-full relative bg-white/60 border-2 border-amber-200/60 focus:border-amber-500 focus:ring-4 focus:ring-amber-200/40 p-5 rounded-2xl transition-all duration-500 outline-none backdrop-blur-sm hover:border-amber-300/80 font-semibold text-amber-900 placeholder-amber-500 hover:shadow-md shadow-sm"
                                />
                                <div className="absolute inset-0 bg-linear-to-r from-amber-400/10 to-orange-400/10 rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"></div>
                            </div>
                        </div>
                        
                        {/* Submit Button */}
                        <button 
                            type="submit" 
                            disabled={loading}
                            className="group/btn relative w-full bg-linear-to-r from-amber-600 via-amber-500 to-orange-600 hover:from-amber-700 hover:via-amber-600 hover:to-orange-700 text-white px-8 py-5 rounded-2xl transition-all duration-500 font-bold text-lg shadow-2xl hover:shadow-3xl hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden mt-2"
                        >
                            <div className="absolute inset-0 bg-linear-to-r from-white/20 to-transparent -skew-x-12 -rotate-2 group-hover/btn:animate-shimmer pointer-events-none"></div>
                            {loading ? (
                                <span className="flex items-center justify-center gap-3 relative z-10">
                                    <div className="w-7 h-7 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    <span className="tracking-wide">Crafting Memories...</span>
                                </span>
                            ) : (
                                <span className="relative z-10 tracking-wide">Create Account ✨</span>
                            )}
                        </button>
                    </form>

                    {/* Login Link */}
                    <div className="mt-8 pt-8 border-t border-amber-200/50 text-center relative z-10">
                        <p className="text-amber-800 font-medium">
                            Already have an account?{' '}
                            <Link 
                                to="/login" 
                                className="font-bold bg-linear-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent hover:from-amber-700 hover:to-orange-700 transition-all duration-300 hover:underline relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-amber-500 after:transition-all after:duration-300 hover:after:w-full"
                            >
                                Return Home 🕰️
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Footer Text */}
                <div className="text-center mt-12 relative z-10">
                    <p className="text-amber-700 font-light text-lg tracking-wide drop-shadow-sm">
                        Your memories deserve to be preserved forever <span className="text-2xl">🕰️✨</span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default SignupPage;
