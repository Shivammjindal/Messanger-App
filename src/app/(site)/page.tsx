"use client"
import AuthForm from "./components/AuthForm";

export default function Home() {
    return (
      <div
        className="flex flex-col min-h-full justify-center items-center py-12 sm:px-6 lg:px-8 bg-gray-200 dark:text-slate-100 dark:bg-zinc-900"
      >
        <img 
          src="https://static-00.iconduck.com/assets.00/fb-messenger-icon-2048x2048-03u1m2s0.png" 
          alt="logo"
          className="h-14 w-14 sm:h-16 sm:w-16 md:h-20 md:w-20"
        />
        <h2 
          className="text-xl font-semibold tracking-tight my-[.6rem] sm:text-4xl sm:my-3"
        >Sign in to your Account</h2>
        <AuthForm/>
      </div>
    );
  }