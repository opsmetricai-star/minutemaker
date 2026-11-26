import { AuthForm } from "@/components/AuthForm";
export const metadata = { title: "Choose a new password | MinuteMaker" };
export default function Page() {
  return <AuthForm mode="reset" />;
}
