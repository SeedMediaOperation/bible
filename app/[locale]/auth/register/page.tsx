import SignupForm from "@/app/[locale]/components/RegisterForm";
import {apiAuth} from "@/utils/apiHelpers";
import {UserFormData, UserResponse} from "@/types/auth";

export default async function ForgotPasswordPage() {

  const handleRegisterSubmit = async (newUser: UserFormData): Promise<string> => {
    'use server';
    const res: UserResponse = await apiAuth('/api/auth/register', newUser);
    return res.message;
  };
  return <SignupForm submit={handleRegisterSubmit}/>;
}