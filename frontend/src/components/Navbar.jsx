import React from "react";
import { FaHistory } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
const navigateTo=useNavigate();

  return (
    <>
      <nav className="sticky  top-0 left-0 bg-inherit shadow-xl px-2 py-1 border z-50">
        <div className="flex h-12 justify-between items-center container mx-auto ">
          <div className="font-semibold pl-4 text-xl">
            Quiz<span className="text-blue-600">Time</span>
          </div>
          <div className="px-4">
            <button onClick={()=>navigateTo("/history")}>
              <FaHistory size={24}/>
            </button>
          
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
