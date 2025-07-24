'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { routing } from "@/lib/i18n/routing";
import {alertService} from "@/lib/alertServices";

export default function ResetPasswordForm() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{ newPassword?: string; confirmPassword?: string }>({});
  const [touched, setTouched] = useState<{ newPassword?: boolean; confirmPassword?: boolean }>({});
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get('token');

  // Validate inputs on change or blur
  useEffect(() => {
    const newErrors: typeof errors = {};

    if (touched.newPassword) {
      if (!newPassword) {
        newErrors.newPassword = "New password is required.";
      } else if (newPassword.length < 8) {
        newErrors.newPassword = "Password must be at least 8 characters.";
      }
    }

    if (touched.confirmPassword) {
      if (!confirmPassword) {
        newErrors.confirmPassword = "Please confirm your new password.";
      } else if (confirmPassword !== newPassword) {
        newErrors.confirmPassword = "Passwords do not match.";
      }
    }

    setErrors(newErrors);
    setIsValid(
        Object.keys(newErrors).length === 0 && Boolean(newPassword) && Boolean(confirmPassword)
    );
  }, [newPassword, confirmPassword, touched]);

  if (!token) return <p className="p-4 text-red-600">Missing reset token in URL.</p>;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all as touched to trigger validation errors if any
    setTouched({ newPassword: true, confirmPassword: true });

    // Check validation before submitting
    if (!isValid) return;

    setLoading(true);
    setMessage('');
    try {
      const res = await fetch('/api/auth/reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword }),
      });

      if (res.ok) {
        alertService.info('Password reset successfully. Redirecting...');
        setTimeout(() => router.push(`/${routing.defaultLocale}/auth/login`), 2000);
      } else {
        setMessage('');
        setErrors({ confirmPassword: 'Invalid or expired token.' });
      }
    } catch {
      setErrors({ confirmPassword: 'Unexpected error occurred.' });
    } finally {
      setLoading(false);
    }
  };

  const handleBlur = (field: 'newPassword' | 'confirmPassword') => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  return (
      <div className="flex flex-col items-center justify-center w-full min-h-screen">
        <form
            onSubmit={handleSubmit}
            className="w-full max-w-md mx-auto mt-12 p-6 bg-white rounded-2xl shadow-lg space-y-5"
        >
          <h2 className="text-2xl font-bold text-center text-black">Reset Password</h2>

          {/* New Password */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-black">New Password</span>
            </label>
            <input
                type="password"
                className={`input input-bordered w-full !text-white ${touched.newPassword && errors.newPassword ? 'input-error' : ''}`}
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                onBlur={() => handleBlur('newPassword')}
                required
            />
            {touched.newPassword && errors.newPassword && (
                <label className="label">
                  <span className="label-text-alt text-red-500">{errors.newPassword}</span>
                </label>
            )}
          </div>

          {/* Confirm Password */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-black">Confirm New Password</span>
            </label>
            <input
                type="password"
                className={`input input-bordered w-full !text-white ${touched.confirmPassword && errors.confirmPassword ? 'input-error' : ''}`}
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onBlur={() => handleBlur('confirmPassword')}
                required
            />
            {touched.confirmPassword && errors.confirmPassword && (
                <label className="label">
                  <span className="label-text-alt text-red-500">{errors.confirmPassword}</span>
                </label>
            )}
          </div>

          {/* Message */}
          {message && <p className="text-sm text-green-600 text-center">{message}</p>}

          {/* Submit */}
          <button
              type="submit"
              disabled={!isValid || loading}
              className={`py-2 w-full text-white bg-[#50c9ee] hover:bg-[#3bb5db] ${
                  (!isValid || loading) ? 'opacity-60 cursor-not-allowed' : ''
              }`}
          >
            {loading ? <span className="loading loading-spinner"></span> : 'Reset Password'}
          </button>
        </form>
      </div>
  );
}
