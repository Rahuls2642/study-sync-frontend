import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { loginSchema } from "../validation/loginSchema";
import { useLogin } from "../hooks/useLogin";

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { mutate, isPending } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data) => {
    mutate(data, {
      onSuccess: () => {
        toast.success("Logged in successfully!");
      },
      onError: (error) => {
        toast.error(
          error.response?.data?.message || "Login failed. Please check your credentials."
        );
      },
    });
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-1.5 font-['Inter',sans-serif]">Log in</h2>
        <p className="text-sm text-gray-500 font-['Inter',sans-serif]">Welcome back to StudySync.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-0.5">
            Email Address
          </label>
          <input
            type="email"
            className={`w-full px-3 py-2 rounded-md border focus:ring-1 focus:outline-none transition-all text-sm ${
              errors.email
                ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                : "border-gray-200 focus:border-gray-400 focus:ring-gray-400"
            }`}
            placeholder="john@example.com"
            {...register("email")}
          />
          {errors.email && (
            <p className="mt-0.5 text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-0.5">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className={`w-full px-3 py-2 rounded-md border focus:ring-1 focus:outline-none transition-all text-sm ${
                errors.password
                  ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-200 focus:border-gray-400 focus:ring-gray-400"
              }`}
              placeholder="••••••••"
              {...register("password")}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.password && (
            <p className="mt-0.5 text-xs text-red-500">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full mt-2 py-2.5 px-4 bg-[#0a0f1c] text-white font-medium rounded-md hover:bg-black focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center space-x-2 text-sm"
        >
          {isPending ? (
            <>
              <Loader2 className="animate-spin" size={16} />
              <span>Logging in...</span>
            </>
          ) : (
            <>
              <span>Log in</span>
              <ArrowRight size={16} />
            </>
          )}
        </button>
      </form>

      <div className="my-4 flex items-center">
        <div className="flex-1 border-t border-gray-100"></div>
        <span className="px-3 text-xs text-gray-400">or</span>
        <div className="flex-1 border-t border-gray-100"></div>
      </div>

      <button
        type="button"
        className="w-full py-2 px-4 bg-white border border-gray-200 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-all flex items-center justify-center space-x-2 text-sm"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
        <span>Continue with Google</span>
      </button>

      <p className="mt-6 text-xs text-gray-400 leading-relaxed text-center">
        By logging in, you agree to our <a href="#" className="text-indigo-500 hover:underline">Terms of Service</a> and <a href="#" className="text-indigo-500 hover:underline">Privacy Policy</a>.
      </p>
    </div>
  );
};
