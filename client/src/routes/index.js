import { Routes, Route, Navigate } from "react-router-dom";
import { CreateAccountForm, HomePage, LoginForm } from "../pages";
import { useSelector } from "react-redux";

export default function AppRoutes() {
  const { user } = useSelector((state) => state?.auth);

  return (
    <Routes>
      <Route path="login" element={<LoginForm />} />
      <Route path="create-account" element={<CreateAccountForm />} />
      {user && (
        <>
          <Route path={"chat/:otherUserId"} element={<HomePage />} />
          <Route path={"chat"} element={<HomePage />} />
          <Route path="*" element={<Navigate to={"chat"} />} />
        </>
      )}
      <Route path="*" element={<Navigate to={"login"} />} />
    </Routes>
  );
}
