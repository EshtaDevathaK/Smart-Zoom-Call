
import React from "react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { VideoIcon, InfoIcon, History } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <VideoIcon className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">ZoomWatcher</span>
        </Link>

        <div className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link to="/meeting" className="flex items-center gap-2">
              <VideoIcon className="h-4 w-4" />
              <span>Meeting</span>
            </Link>
          </Button>
          
          <Button variant="ghost" asChild>
            <Link to="/meetings" className="flex items-center gap-2">
              <History className="h-4 w-4" />
              <span>History</span>
            </Link>
          </Button>

          <Button variant="ghost" asChild>
            <Link to="/about" className="flex items-center gap-2">
              <InfoIcon className="h-4 w-4" />
              <span>About</span>
            </Link>
          </Button>

          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
