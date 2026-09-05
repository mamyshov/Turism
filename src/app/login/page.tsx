import { Suspense } from "react";
import { getLocale } from "@/lib/i18n/get-locale";
import { getDictionary } from "@/lib/i18n/dictionary";
import { LoginForm } from "./LoginForm";

export default function LoginPage() {
  const dict = getDictionary(getLocale()).auth;
  return (
    <Suspense>
      <LoginForm dict={dict} />
    </Suspense>
  );
}
