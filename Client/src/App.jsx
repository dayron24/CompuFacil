import "./index.css";
import { Layout } from "./components/Layout";
import { Route, Routes } from "react-router-dom";
import { LoginPage } from "./views/LoginPage";
import {ForgotPasswordPage} from "./views/ForgotPasswordPage";
import RegisterUserPage from "./views/RegisterUserPage";
import { IndexPage } from "./views/Index";
import { HomePage } from "./views/HomePage";
import { ViewUser } from "./views/ViewUser";
import { MenuCurso } from "./views/MenuCurso";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/*Public routes */}
        <Route path="/" element={<LoginPage />} /><Route path="/register-student" element={<RegisterUserPage />} />
        <Route path="/forgot-password" element={< ForgotPasswordPage/>} />
        <Route path="/register" element={<RegisterUserPage />} />
        <Route path="/inicio" element={<IndexPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/user" element={<ViewUser />} />
        <Route path="/menu" element={<MenuCurso />} />

        {/*Catch all*/}
        <Route path="*" element={<h1>404 error</h1>} />
      </Route>
    </Routes>
  );
}
