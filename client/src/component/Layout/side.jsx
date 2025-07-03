import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Side = () => {
  const [isOpen, setIsOpen] = useState(true); // Sidebar state
  const location = useLocation(); // Get current route

  // Close sidebar when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <button onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "Close" : "Open"}
      </button>
      {isOpen && (
        <nav>
          <ul>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default Side;
