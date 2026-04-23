// app/login/layout.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Senyas.IO",
  description: "Access your Senyas account",
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}