import { getLocale } from "@/lib/i18n/get-locale";
import { getDictionary } from "@/lib/i18n/dictionary";
import { RegisterForm } from "./RegisterForm";

export default function RegisterPage() {
  const dict = getDictionary(getLocale()).auth;
  return <RegisterForm dict={dict} />;
}
