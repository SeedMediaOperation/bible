"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { routing } from "@/lib/i18n/routing";
import {UserFormData} from "@/types/auth";
import { alertService } from "@/lib/alertServices";
import { LoginFormSchema } from "@/utils/validateForm";

export default function LoginForm() {
  const [form, setForm] = useState<UserFormData>({
    username: '',
    password: '',
    remember: false,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof UserFormData, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof UserFormData, boolean>>>({});
  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const router = useRouter();

  // Live validation
  useEffect(() => {
    const result = LoginFormSchema.safeParse(form);
    setIsValid(result.success);

    const fieldErrors = result.success ? {} : result.error.flatten().fieldErrors;
    setErrors({
      username: fieldErrors.username?.[0],
      password: fieldErrors.password?.[0],
    });
  }, [form]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, checked } = event.target;
    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const result = LoginFormSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({
        username: fieldErrors.username?.[0],
        password: fieldErrors.password?.[0],
      });
      const firstError = Object.values(fieldErrors)[0]?.[0];
      alertService.error(firstError || "Validation failed");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
        credentials: "include",
      });

      if (!res.ok) {
         throw new Error("Invalid login");
      }

      alertService.success("Login Successful!");
      setTimeout(() => {
        router.push(`/${routing.defaultLocale}/dashboard`);
      }, 500);
    } catch (e) {
      alertService.error("Invalid username or password.");
      console.error(e);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="flex flex-col justify-center items-center w-full min-h-screen">
      <form
          onSubmit={handleSubmit}
          className="w-full max-w-md mx-auto mt-12 p-8 bg-white rounded-2xl shadow-xl space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-black">Login to Your Account</h2>

        {/* Username */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-black">Username</span>
          </label>
          <input
              name="username"
              type="text"
              value={form.username}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter your username"
              className={`input input-bordered w-full !text-white ${
                  touched.username && errors.username ? 'input-error' : ''
              }`}
          />
          {touched.username && errors.username && (
              <label className="label">
                <span className="label-text-alt text-red-500">{errors.username}</span>
              </label>
          )}
        </div>

        {/* Password */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-black">Password</span>
          </label>
          <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="••••••••"
              className={`input input-bordered w-full !text-white ${
                  touched.password && errors.password ? 'input-error' : ''
              }`}
          />
          {touched.password && errors.password && (
              <label className="label">
                <span className="label-text-alt text-red-500 text-wrap">{errors.password}</span>
              </label>
          )}
        </div>

        {/* Remember Me + Forgot Password */}
        <div className="flex justify-between items-center text-sm text-black">
          <label className="flex items-center gap-2">
            <input
                type="checkbox"
                name="remember"
                checked={form.remember}
                onChange={handleChange}
                className="checkbox checkbox-sm checkbox-primary"
                style={{ accentColor: '#50c9ee' }}
            />
            <span>Remember me</span>
          </label>
          <Link
              href={`/${routing.defaultLocale}/auth/forgot-password`}
              className="text-[#50c9ee] hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        {/* Submit Button */}
        <button
            type="submit"
            disabled={!isValid || loading}
            className={`py-2 w-full bg-[#50c9ee] text-white ${
                !isValid || loading ? 'bg-[#50c9ee] opacity-60 cursor-not-allowed' : 'btn bg-[#50c9ee] hover:bg-[#3bb5db]'
            }`}
        >
          {loading ?  <span className="loading loading-spinner"></span> : 'Login'}
        </button>

        {/* Signup Redirect */}
        <div className="text-center text-sm text-gray-500">
          Don&apos;t have an account?{' '}
          <Link
              href={`/${routing.defaultLocale}/auth/register`}
              className="text-[#50c9ee] hover:underline"
          >
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
}
