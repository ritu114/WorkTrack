import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { usersModel } from '../data/mockData';
import bgImage from '../assets/login-bg.png';

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState('Employee');
  const [empId, setEmpId] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');

    // Find matching user from mock data
    const userToLogin = usersModel.find(u => u.id === empId && u.role === selectedRole);
    if (userToLogin) {
      // Mock successful login (ignore password string)
      login(userToLogin);
      navigate('/dashboard');
    } else {
      setLoginError('Invalid Employee ID or Role mismatch.');
    }
  };

  return (
    <div className="flex min-h-screen bg-[#05070A] overflow-hidden font-['Rajdhani'] selection:bg-teal-500/30 text-slate-300">

      {/* Left Side: Background Illustration */}
      <div className="hidden lg:block relative w-[60%] 2xl:w-[65%] bg-[#05070A]">
        <div
          className="absolute inset-0 bg-cover bg-left opacity-90 transition-transform duration-[20s] hover:scale-105 ease-linear"
          style={{ backgroundImage: `url(${bgImage})` }}
        >
          {/* Gradients to blend image seamlessly into the right side and bottom */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#05070A]/50 to-[#05070A]"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#05070A] via-transparent to-transparent"></div>
        </div>

        {/* Top Left Branding */}
        <div className="absolute top-12 left-12 z-10 p-8 sm:p-10 rounded-2xl bg-black/10 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.7)]">
          <div className="flex items-center gap-3">
            <span className="text-4xl font-black text-white font-['Orbitron'] tracking-[0.2em] relative drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
              Work<span className="text-teal-400 drop-shadow-[0_0_8px_rgba(45,212,191,0.5)]">Track</span>
            </span>
          </div>
          <div className="mt-16 max-w-md">
            <h1 className="text-3xl font-bold text-white tracking-[0.1em] font-['Orbitron'] leading-[1.3] drop-shadow-lg">
              Elevate your team's performance.
            </h1>
            <p className="mt-6 text-[16px] text-slate-200 tracking-wider font-light leading-relaxed drop-shadow-md">
              Connect your strategy to execution. Monitor real-time KPIs, assign dynamic tasks, and track outcomes effortlessly.
            </p>
          </div>
        </div>
      </div>

      {/* Right side: Form */}
      <div className="flex-1 flex flex-col justify-center items-center relative z-10 px-8 py-12 sm:px-12 lg:px-16 xl:px-20 bg-[#05070A]">

        {/* Mobile top text */}
        <div className="lg:hidden absolute top-8 left-8 flex items-center gap-3">
          <span className="text-2xl font-black text-white font-['Orbitron'] tracking-[0.2em]">
            Work<span className="text-teal-400">Track</span>
          </span>
        </div>

        <div className="w-full max-w-sm xl:max-w-md mt-16 lg:mt-0 xl:-ml-12 relative">

          <h2 className="text-3xl font-bold text-white mb-2 tracking-[0.2em] font-['Orbitron'] flex items-center">
            Welcome <span className="text-teal-400 ml-3">back</span>
          </h2>
          <p className="text-[13px] text-slate-400 tracking-wider mb-10">
            Sign in to access your customized dashboard.
          </p>

          <form onSubmit={handleLogin} className="w-full relative">

            {/* Account Role Input */}
            <div className="relative mb-8 pt-2">
              <div className="absolute -top-1 left-2 text-[10px] text-teal-400/80 font-['Rajdhani'] tracking-wider uppercase z-20 px-1 bg-[#05070A]">
                account role
              </div>
              <div
                className="relative group p-[1px] w-full sm:w-[90%]"
                style={{ clipPath: 'polygon(0 0, 95% 0, 100% 25%, 100% 100%, 5% 100%, 0 75%)' }}
              >
                <div className="absolute inset-0 bg-slate-700/80 group-hover:bg-teal-500/50 transition-colors duration-300"></div>
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="w-full h-12 bg-[#0A0D14] text-slate-300 font-['Rajdhani'] tracking-[0.1em] px-4 focus:outline-none appearance-none cursor-pointer relative z-10"
                  style={{ clipPath: 'polygon(0 0, 95% 0, 100% 25%, 100% 100%, 5% 100%, 0 75%)' }}
                >
                  <option value="Admin">Admin</option>
                  <option value="Manager">Manager</option>
                  <option value="Employee">Employee</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none z-20 text-teal-400/80 text-[10px]">
                  ▼
                </div>
              </div>
              <div className="absolute left-[10%] bottom-[-2px] w-[15%] h-[1px] bg-teal-400 opacity-40 shadow-[0_0_5px_#2dd4bf]"></div>
              <div className="absolute right-[5%] sm:right-[15%] top-1/2 w-1.5 h-1.5 rounded-full bg-slate-700 hidden sm:block"></div>
              <div className="absolute right-[-5%] top-1/2 h-px w-[10%] bg-slate-800 hidden sm:block"></div>
            </div>

            {/* Emp ID Input */}
            <div className="relative mb-8">
              <div className="absolute -top-3 left-2 text-[10px] text-teal-400/80 font-['Rajdhani'] tracking-wider uppercase z-20 px-1 bg-[#05070A]">
                emp id / user id
              </div>
              <div
                className="relative group p-[1px] w-full sm:w-[90%]"
                style={{ clipPath: 'polygon(0 0, 95% 0, 100% 25%, 100% 100%, 5% 100%, 0 75%)' }}
              >
                <div className="absolute inset-0 bg-slate-700/80 group-hover:bg-teal-500/50 focus-within:bg-teal-400/80 transition-colors duration-300"></div>
                <input
                  type="text"
                  value={empId}
                  onChange={(e) => setEmpId(e.target.value.toUpperCase())}
                  required
                  placeholder=""
                  className="w-full h-12 bg-[#0A0D14] text-slate-100 font-['Rajdhani'] tracking-[0.1em] px-4 focus:outline-none placeholder:text-slate-700 relative z-10"
                  style={{ clipPath: 'polygon(0 0, 95% 0, 100% 25%, 100% 100%, 5% 100%, 0 75%)' }}
                />
              </div>
              <div className="absolute left-[10%] bottom-[-2px] w-[15%] h-[1px] bg-teal-400 opacity-40 shadow-[0_0_5px_#2dd4bf]"></div>
              <div className="absolute left-[-2px] top-[15%] w-[1px] h-[30%] bg-teal-500/40"></div>
            </div>

            {/* Password Input */}
            <div className="relative mb-8">
              <div className="absolute -top-3 left-2 text-[10px] text-teal-400/80 font-['Rajdhani'] tracking-wider uppercase z-20 px-1 bg-[#05070A]">
                password
              </div>
              <div
                className="relative group p-[1px] w-full sm:w-[90%]"
                style={{ clipPath: 'polygon(0 0, 95% 0, 100% 25%, 100% 100%, 5% 100%, 0 75%)' }}
              >
                <div className="absolute inset-0 bg-slate-700/80 group-hover:bg-teal-500/50 focus-within:bg-teal-400/80 transition-colors duration-300"></div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder=""
                  className="w-full h-12 bg-[#0A0D14] text-slate-100 font-['Rajdhani'] tracking-[0.2em] px-4 focus:outline-none placeholder:text-slate-700 relative z-10"
                  style={{ clipPath: 'polygon(0 0, 95% 0, 100% 25%, 100% 100%, 5% 100%, 0 75%)' }}
                />
              </div>

              {/* Forgot password connection line simulation */}
              <div className="absolute right-[5%] sm:right-[10%] top-1/2 w-4 h-px bg-slate-700 hidden sm:block"></div>
              <div className="absolute right-0 sm:right-[5%] top-1/2 w-1 h-1 rounded-full bg-slate-500 hidden sm:block"></div>
              <div className="absolute right-2 sm:right-[-90px] top-[calc(50%-8px)] sm:block">
                <a href="#" className="text-[10px] text-slate-500 hover:text-teal-400 transition-colors tracking-widest uppercase cursor-pointer">forgot password?</a>
              </div>

              <div className="absolute left-[10%] bottom-[-2px] w-[15%] h-[1px] bg-teal-400 opacity-40 shadow-[0_0_5px_#2dd4bf]"></div>
            </div>

            {loginError && (
              <div className="mb-4 text-xs text-red-500 tracking-wider py-2 px-3 uppercase w-full sm:w-[90%] border-l-2 border-red-500/50 bg-[#150a0a]">
                {loginError}
              </div>
            )}

            {/* Remember me */}
            <div className="flex items-center gap-3 mb-8 ml-1 mt-6">
              <div className="relative flex items-center justify-center w-3.5 h-3.5 border border-slate-600 bg-[#0A0D14] transition-colors focus-within:border-teal-500">
                <input type="checkbox" id="remember" className="absolute opacity-0 w-full h-full cursor-pointer peer" />
                <svg className="w-2 h-2 text-teal-400 opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" viewBox="0 0 14 14" fill="none">
                  <path d="M1 7.5L4.5 11L13 2" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter" />
                </svg>
              </div>
              <label htmlFor="remember" className="text-[10px] text-slate-500 tracking-widest uppercase cursor-pointer hover:text-slate-300 select-none">
                remember me on this device
              </label>
            </div>

            {/* Login Button */}
            <div className="relative inline-block mt-2">
              <button
                type="submit"
                className="relative group p-[1px] pr-10 focus:outline-none"
              >
                {/* Border gradient effect */}
                <div
                  className="absolute inset-0 bg-slate-600 group-hover:bg-teal-400 transition-all duration-500"
                  style={{ clipPath: 'polygon(0 0, 85% 0, 100% 30%, 100% 100%, 15% 100%, 0 70%)' }}
                ></div>

                {/* Button background */}
                <div
                  className="relative bg-[#0A0D14] flex items-center h-10 px-8 disabled:opacity-50"
                  style={{ clipPath: 'polygon(0 0, 85% 0, 100% 30%, 100% 100%, 15% 100%, 0 70%)' }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <span className="text-[12px] font-['Orbitron'] font-medium tracking-[0.25em] text-slate-300 relative z-10 group-hover:text-white transition-colors">
                    LOGIN
                  </span>
                </div>
              </button>
              {/* Decorative detail next to button */}
              <div className="absolute top-0 right-0 h-10 w-2.5 border-r border-t border-slate-700 opacity-50 pointer-events-none group-hover:border-teal-500 transition-colors"></div>
            </div>
          </form>

          <div className="mt-16 text-[10px] tracking-widest uppercase text-slate-500 flex items-center gap-2">
            not using wxi yet?
            <a href="#" className="text-teal-500 hover:text-teal-400 border-b border-teal-500/30 hover:border-teal-400/80 pb-0.5 transition-colors">create an account</a>
          </div>

        </div>
      </div>
    </div>
  );
}

