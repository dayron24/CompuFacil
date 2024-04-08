import { Outlet } from "react-router-dom";

export const Header = () => {
  return (
    <header className="bg-red-800 text-white text-4xl font-bold text-center py-4">
        <a href="/home">
        <h1>CompuFacil</h1>
        </a>
    </header>
  );
};
