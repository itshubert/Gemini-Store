import { createContext, type FC, useContext, useEffect, useState } from "react";
import { api } from "../../common/utils/api";
import type { Customer } from "../customer/types/Customer";
import type { User } from "../customer/types/User";

export interface AuthProviderProps {
  isAuthenticated: boolean;
  user: User | null;
  customer: Customer | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthProviderProps | null>(null);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [customer, setCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    const u = localStorage.getItem("user");

    if (u) {
      setUser(JSON.parse(u));
      setIsAuthenticated(true);
    } else {
      setUser(null);
      setIsAuthenticated(false);
    }
  }, []);

  useEffect(() => {
    if (!user) {
      setCustomer(null);
      return;
    }

    const fetchCustomer = async () => {
      try {
        const customerData = await api.Get<Customer>(
          `/customers/${user.customerId}`,
        );
        setCustomer(customerData);
      } catch (error) {
        console.error("Failed to fetch customer data:", error);
        setCustomer(null);
      }
    };
    fetchCustomer();
  }, [user]);

  const login = async (username: string, password: string) => {
    try {
      const response = await api.Post<User>("/customers/authenticate", {
        username,
        password,
      });

      localStorage.setItem("token", response.token);
      localStorage.setItem("refreshToken", response.refreshToken);
      localStorage.setItem("user", JSON.stringify(response));

      setUser(response);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false);
    setCustomer(null);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, customer, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
