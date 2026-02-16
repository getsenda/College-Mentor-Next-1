'use client';

import { useState } from 'react';
import LoginForm from './loginform';


export default function AuthForms() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <img
            src="/logo.png"
            alt="CollegeMentor Logo"
            className="mx-auto mb-8 w-45 h-10"
          />
          <h1 className="text-2xl font-bold text-gray-900">
            {isLogin ? "Welcome back!" : "Create your account"}
          </h1>
          <p className="mt-2 text-gray-600">
            {isLogin 
              ? "Login to continue your journey" 
              : "Join thousands of students in their success journey"
            }
          </p>
        </div>

        {isLogin ? <LoginForm /> : <div>Register form coming soon</div>}

        <div className="text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-primary hover:text-primary/90 text-sm font-medium"
          >
            {isLogin 
              ? "Don't have an account? Sign up" 
              : "Already have an account? Login"
            }
          </button>
        </div>
      </div>
    </div>
  );
}