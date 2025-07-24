'use client';

import { useEffect, useState } from 'react';
import { alertService } from "@/lib/alertServices";
import { ForgotPasswordSchema } from "@/utils/validateForm";

export default function ForgotPasswordForm() {
    const [form, setForm] = useState({ email: '' });
    const [touched, setTouched] = useState<{ email?: boolean }>({});
    const [errors, setErrors] = useState<{ email?: string }>({});
    const [isValid, setIsValid] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const result = ForgotPasswordSchema.safeParse(form);
        setIsValid(result.success);
    }, [form]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name } = e.target;
        setTouched((prev) => ({ ...prev, [name]: true }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const result = ForgotPasswordSchema.safeParse(form);
        if (!result.success) {
            const fieldErrors = result.error.flatten().fieldErrors;
            setErrors({ email: fieldErrors.email?.[0] });
            alertService.error(fieldErrors.email?.[0] || "Invalid email");
            setLoading(false);
            return;
        }

        try {
            const res = await fetch('/api/auth/forgot', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });

            if (res.ok) {
                alertService.info('Check your email for the reset link.');
            } else {
                alertService.error('Email not found or failed to send.');
            }
        } catch (e) {
            if (e instanceof Error) {
                alertService.error('Unexpected error', e.message);
            } else {
                alertService.error('Unexpected error occurred.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='flex flex-col justify-center items-center w-full min-h-screen'>
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md mx-auto mt-12 p-6 bg-white rounded-2xl shadow-lg space-y-5"
            >
                <h2 className="text-2xl font-bold text-center text-black">Forgot Password</h2>

                {/* Email Input */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-black">Email</span>
                    </label>
                    <input
                        name="email"
                        type="email"
                        className={`input input-bordered w-full !text-white ${touched.email && errors.email ? 'input-error' : ''}`}
                        placeholder="Enter your email"
                        value={form.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {touched.email && errors.email && (
                        <label className="label">
                            <span className="label-text-alt text-red-500">{errors.email}</span>
                        </label>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={!isValid || loading}
                    className={`py-2 w-full bg-[#50c9ee] text-white ${
                        !isValid || loading ? 'opacity-60 cursor-not-allowed' : 'hover:bg-[#3bb5db]'
                    }`}
                >
                    {loading ? <span className="loading loading-spinner"></span> : 'Send Reset Link'}
                </button>
            </form>
        </div>
    );
}
