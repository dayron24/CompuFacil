import { Outlet } from "react-router-dom";

export const Header = () => {
  return (
    <header className="flex justify-between bg-red-800 text-white text-4xl font-bold text-center py-4">
        <div></div>
        <a href="/home">
          <h1>CompuFacil</h1>
        </a>
        <div className="mr-3">
          <a href="/user">
            <span className="material-icons text-4xl" style={{cursor: "pointer", userSelect: "none"}}>person</span>
          </a>
        </div>
    </header>
  );
};
