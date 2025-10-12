import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useAuthContext } from "../modules/authentication/AuthProvider";

export const Header = () => {
  const { isAuthenticated, user, customer, login, logout } = useAuthContext();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // const handleLogin = async () => {
  //   await login("hubert.dumas@example.com", "SecurePassword123!");
  // };

  const handleSignOut = () => {
    logout();
    setIsDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="flex justify-between items-center px-8 py-4 max-w-full">
        <div className="flex items-center gap-2 text-2xl font-bold text-blue-500 cursor-pointer select-none">
          <span className="text-3xl bg-gradient-to-br from-blue-500 to-blue-700 bg-clip-text text-transparent">
            ✦
          </span>
          <span className="bg-gradient-to-br from-blue-500 to-blue-700 bg-clip-text text-transparent">
            Gemini
          </span>
        </div>

        <div className="flex gap-4 items-center">
          {isAuthenticated && user && customer && (
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 transition-colors"
                aria-label="User menu"
              >
                <span className="text-sm text-gray-600">
                  Welcome, {customer.firstName} {customer.lastName}
                </span>
                <svg
                  className={`w-4 h-4 text-gray-600 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <title>Dropdown toggle</title>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50">
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          )}

          {!isAuthenticated && (
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                className="px-3 py-1.5 rounded text-sm font-medium bg-transparent border-2 border-blue-500 text-blue-500 hover:bg-blue-50 transition-all"
                onClick={() => navigate("/sign-in")}
              >
                Sign In
              </button>
              <button
                type="button"
                className="px-3 py-1.5 rounded text-sm font-medium bg-gradient-to-br from-blue-500 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/30 transition-all"
                onClick={() => navigate("/sign-up")}
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
