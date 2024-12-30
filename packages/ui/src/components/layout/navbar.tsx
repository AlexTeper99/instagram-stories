import React from "react";
import { ModeToggle } from "../mode-toggle.client";
import Link from "next/link";

interface Props {
  title: string;
}

const Navbar: React.FC<Props> = ({ title }) => {
  return (
    <header className="w-full shadow">
      <nav className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <Link href="/">
          <h1 className="text-xl font-bold">{title}</h1>
        </Link>
        <ModeToggle />
      </nav>
    </header>
  );
};

export default Navbar;
