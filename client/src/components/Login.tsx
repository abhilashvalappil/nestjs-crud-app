import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import api from '../api';

function Login() {

  // State management for form data and validation
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  // Email validation regex pattern
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Handle input changes and clear errors when user starts typing
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validate form fields
  const validateForm = () => {
    const newErrors = {
      email: '',
      password: ''
    };

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return !newErrors.email && !newErrors.password;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    const user = await api.post('/users',formData)
    if(user){
      navigate('/home')
    }
    // Simulate API call
    setTimeout(() => {
      console.log('Login submitted:', formData);
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-violet-900 to-purple-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background effects for futuristic feel */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated particle field */}
        <div className="particle-field">
          <div className="particle particle-1"></div>
          <div className="particle particle-2"></div>
          <div className="particle particle-3"></div>
          <div className="particle particle-4"></div>
          <div className="particle particle-5"></div>
          <div className="particle particle-6"></div>
        </div>
        
        {/* Glowing orbs with sci-fi colors */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-400/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-magenta-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-3/4 w-64 h-64 bg-violet-400/10 rounded-full blur-2xl animate-pulse delay-500"></div>
        
        {/* Light rays effect */}
        <div className="light-rays">
          <div className="light-ray light-ray-1"></div>
          <div className="light-ray light-ray-2"></div>
          <div className="light-ray light-ray-3"></div>
        </div>
      </div>

      {/* Main login container */}
      <main className="relative w-full max-w-md">
        {/* Login card with glass morphism effect */}
        <div className="bg-slate-900/20 backdrop-blur-2xl border border-cyan-500/20 rounded-3xl shadow-[0_0_50px_rgba(6,182,212,0.1)] p-8 space-y-8 relative">
          {/* Subtle inner glow */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/5 via-transparent to-magenta-500/5 pointer-events-none"></div>
          
          {/* Header section */}
          <header className="text-center space-y-2 relative z-10">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-white to-magenta-400 bg-clip-text text-transparent tracking-tight">
              Welcome Back
            </h1>
            <p className="text-slate-300 text-sm">
              Sign in to access your account
            </p>
          </header>

          {/* Login form */}
          <form onSubmit={handleSubmit} className="space-y-6 relative z-10" noValidate>
            {/* Email input field */}
            <div className="space-y-2">
              <label 
                htmlFor="email" 
                className="block text-sm font-medium text-cyan-300"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-cyan-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  className={`
                    w-full pl-12 pr-4 py-3 
                    bg-slate-900/40 border rounded-xl 
                    text-white placeholder-slate-500
                    focus:outline-none focus:ring-2 focus:ring-cyan-400/60 focus:border-cyan-400/60
                    transition-all duration-200
                    ${errors.email 
                      ? 'border-red-400/60 focus:ring-red-400/60 focus:border-red-400/60' 
                      : 'border-violet-500/30 hover:border-cyan-400/40'
                    }
                  `}
                />
                {/* Glowing effect on focus */}
                <div className={`
                  absolute inset-0 rounded-xl pointer-events-none
                  ${!errors.email ? 'shadow-[0_0_0_1px_transparent] focus-within:shadow-[0_0_25px_rgba(6,182,212,0.4)]' : ''}
                `}></div>
              </div>
              {/* Email error message */}
              {errors.email && (
                <p className="text-red-300 text-xs mt-1 animate-fade-in">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password input field */}
            <div className="space-y-2">
              <label 
                htmlFor="password" 
                className="block text-sm font-medium text-cyan-300"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-cyan-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  className={`
                    w-full pl-12 pr-12 py-3 
                    bg-slate-900/40 border rounded-xl 
                    text-white placeholder-slate-500
                    focus:outline-none focus:ring-2 focus:ring-cyan-400/60 focus:border-cyan-400/60
                    transition-all duration-200
                    ${errors.password 
                      ? 'border-red-400/60 focus:ring-red-400/60 focus:border-red-400/60' 
                      : 'border-violet-500/30 hover:border-cyan-400/40'
                    }
                  `}
                />
                {/* Password visibility toggle */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
                {/* Glowing effect on focus */}
                <div className={`
                  absolute inset-0 rounded-xl pointer-events-none
                  ${!errors.password ? 'shadow-[0_0_0_1px_transparent] focus-within:shadow-[0_0_25px_rgba(6,182,212,0.4)]' : ''}
                `}></div>
              </div>
              {/* Password error message */}
              {errors.password && (
                <p className="text-red-300 text-xs mt-1 animate-fade-in">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Login button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`
                w-full py-3 px-4 rounded-lg font-semibold text-white
                bg-gradient-to-r from-cyan-400 to-blue-500
                hover:from-cyan-300 hover:to-blue-400
                focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:ring-offset-2 focus:ring-offset-transparent
                transform transition-all duration-200
                hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(6,182,212,0.6)] hover:animate-pulse-glow
                active:scale-[0.98]
                disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                ${isSubmitting ? 'animate-pulse' : ''}
              `}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Signing In...</span>
                </span>
              ) : (
                'Log In'
              )}
            </button>
          </form>

          {/* Footer links */}
          <footer className="pt-6 border-t border-violet-500/20 relative z-10">
            <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0 text-sm">
              <a 
                href="#forgot-password"
                className="text-cyan-300 hover:text-cyan-200 transition-colors hover:underline hover:glow-text"
              >
                Forgot password?
              </a>
              <p className="text-slate-300">
                Don't have an account?{' '}
                <a 
                  href="#signup"
                  className="text-magenta-300 hover:text-magenta-200 transition-colors hover:underline hover:glow-text"
                >
                  Sign up
                </a>
              </p>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}

export default Login;