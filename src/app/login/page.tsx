import { AuthForm } from "@/components/AuthForm";
export const metadata = { title: "Log in | MinuteMaker" };
export default function Page() {
  return <AuthForm mode="login" />;
}
