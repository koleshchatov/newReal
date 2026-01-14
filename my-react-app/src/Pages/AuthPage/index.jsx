import Userfront, {
  SignupForm,
  LoginForm,
  PasswordResetForm,
} from "@userfront/toolkit/react";
Userfront.init("demo1234");

export default function authPage() {
  return (
    <div>
      <h2>Авторизация</h2>
      <SignupForm />
    </div>
  );
}
