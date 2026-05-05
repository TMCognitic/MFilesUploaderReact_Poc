import { NavLink } from "react-router-dom";
import { links } from "../utils/Links";

export const NavBar = () => {
  return (
    <div className="bordereddiv bg-gray-900 grid grid-cols-3">    
      <nav className="align-element py-5 text-white col-start-2">
        <div className=" w-full flex gap-x-20 justify-center items-center">
          {
            links.map(l => (<NavLink key={l.id} to={l.ref} className={({isActive}) => `capitalize tracking-wide ${isActive ? "underline text-xl" : ""}`}>{l.label}</NavLink>))
          }
        </div>
      </nav>
    </div>
  );
};