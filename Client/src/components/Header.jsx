import { Outlet } from "react-router-dom";

export const Header = () => {
  return (
    <header className="grid grid-cols-2 sm:grid-cols-3 bg-red-800 text-white text-4xl font-bold text-center py-4">
        <a href="/home" className="sm:col-start-2">
          <h1>CompuFacil</h1>
        </a>
        <div className="text-right">
          <a href="/user">
            <span className="material-icons text-4xl pr-3" style={{cursor: "pointer", userSelect: "none"}}>person</span>
          </a>
        </div>
    </header>
  );
};
