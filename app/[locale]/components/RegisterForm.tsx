"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { routing } from '@/lib/i18n/routing';
import { UserFormProps } from "@/types/auth";
import { alertService } from "@/lib/alertServices";
import { RegisterFormSchema } from '@/utils/validateForm';

interface FormState {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export default function SignupForm({ submit }: UserFormProps) {
    const [form, setForm] = useState<FormState>({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
    const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});
    const [isValid, setIsValid] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const result = RegisterFormSchema.safeParse(form);
        setIsValid(result.success);
        if (!result.success) {
            const fieldErrors = result.error.flatten().fieldErrors;
            setErrors({
                username: fieldErrors.username?.[0],
                email: fieldErrors.email?.[0],
                password: fieldErrors.password?.[0],
                confirmPassword: fieldErrors.confirmPassword?.[0],
            });
        } else {
            setErrors({});
        }
    }, [form]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const result = RegisterFormSchema.safeParse(form);
        if (!result.success) {
            const fieldErrors = result.error.flatten().fieldErrors;
            setErrors({
                username: fieldErrors.username?.[0],
                email: fieldErrors.email?.[0],
                password: fieldErrors.password?.[0],
                confirmPassword: fieldErrors.confirmPassword?.[0],
            });

            const firstError = Object.values(fieldErrors)[0]?.[0];
            alertService.error(firstError || "Validation failed");
            setLoading(false);
            return;
        }

        try {
            const { username, email, password } = form;
            const msg = await submit({ username, email, password });
            alertService.success(msg);
            setTimeout(()=>{
                router.push(`/${routing.defaultLocale}/auth/login`);
            },2000)
        } catch (error) {
            alertService.error('Something went wrong!');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center w-full min-h-screen">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md mx-auto mt-12 p-8 bg-white rounded-2xl shadow-xl space-y-6"
            >
                <h2 className="text-3xl font-bold text-center text-black">Create Your Account</h2>

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
                        placeholder="john_doe"
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

                {/* Email */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-black">Email</span>
                    </label>
                    <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="you@example.com"
                        className={`input input-bordered w-full !text-white ${
                            touched.email && errors.email ? 'input-error' : ''
                        }`}
                    />
                    {touched.email && errors.email && (
                        <label className="label">
                            <span className="label-text-alt text-red-500">{errors.email}</span>
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
                        placeholder="********"
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

                {/* Confirm Password */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-black">Confirm Password</span>
                    </label>
                    <input
                        name="confirmPassword"
                        type="password"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="********"
                        className={`input input-bordered w-full !text-white ${
                            touched.confirmPassword && errors.confirmPassword ? 'input-error' : ''
                        }`}
                    />
                    {touched.confirmPassword && errors.confirmPassword && (
                        <label className="label">
                            <span className="label-text-alt text-red-500">{errors.confirmPassword}</span>
                        </label>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={!isValid || loading}
                    className={`py-2 w-full text-white text-lg tracking-wide ${
                        !isValid || loading
                            ? 'bg-[#50c9ee] opacity-60 cursor-not-allowed'
                            : 'bg-[#50c9ee] hover:bg-[#3bb5db]'
                    }`}
                >
                    {loading ? <span className="loading loading-spinner"></span> : 'Sign Up'}
                </button>

                {/* Redirect to Log in */}
                <p className="text-center text-sm text-gray-500">
                    Already have an account?{' '}
                    <Link
                        href={`/${routing.defaultLocale}/auth/login`}
                        className="text-[#50c9ee] hover:underline"
                    >
                        Log in
                    </Link>
                </p>
            </form>
        </div>
    );
}
