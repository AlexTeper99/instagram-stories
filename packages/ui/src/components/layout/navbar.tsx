import React from "react";
import { ModeToggle } from "../mode-toggle.client";

interface Props {
  title: string;
}

const Navbar: React.FC<Props> = ({ title }) => {
  return (
    <div className="flex flex-row justify-between items-center w-full max-w-7xl mx-auto p-4">
      <h1 className="text-xl font-bold">{title}</h1>
      <ModeToggle />
    </div>
  );
};

export default Navbar;
