import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white grid grid-cols-3">
      <div className="col-start-2 align-element min-h-[15vh] flex flex-col justify-center items-center">
        <p className="my-2">-2026-</p>
        <p className="test-2xl my-2 text-center">POC React, by Cognitic</p>
        <p>Resources :</p>
        <p>
          <Link to={"https://www.cognitic.be"} target="_blank">Cognitic</Link>                    
        </p>
        <p>
          <Link to={"https://www.svgrepo.com/"} target="_blank">SVG Repo</Link>
        </p>
      </div>
    </footer>
  );
};