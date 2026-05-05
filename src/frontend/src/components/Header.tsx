import type { ReactNode } from "react";
import logo from "../assets/unicorn.svg";

export const Header = () : ReactNode => {
  return (
    <header className="bg-gray-900 text-white">
      <div className="grid grid-cols-2 p-2">
        <div className="align-element justify-self-start self-center">
          <h1 className="text-3xl align-middle">POC REACT</h1>
        </div>
        <div className="align-element justify-self-end self-center">
          <img src={logo} alt="logo" className="h-12 w-12 object-cover" />
        </div>
      </div>
    </header>
  );
};