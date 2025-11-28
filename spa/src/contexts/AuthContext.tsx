import React, { createContext, useContext, useState, useEffect } from "react";
import { AuthService } from "../services/AuthService";
import apiService from "../services/ApiService";

interface User {
    nome: string;
}

interface AuthContextType {
    isAuthenticated: boolean;
    user: User | null;
    loading: boolean;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Ao carregar, tenta recuperar o usuário e token
        const storagedUser = localStorage.getItem("user");
        const storagedToken = localStorage.getItem("token");

        if (storagedUser && storagedToken) {
            setUser(JSON.parse(storagedUser));
            apiService.defaults.headers.common["Authorization"] = `Bearer ${storagedToken}`;
        }

        setLoading(false);
    }, []);

    async function login(username: string, password: string) {
        setLoading(true);
        try {
            const data = await AuthService.login(username, password);
            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("token", data.access_token);
            setUser(data.user);
            apiService.defaults.headers.common["Authorization"] = `Bearer ${data.access_token}`;
        } catch (error) {
            console.error("Erro ao fazer login", error);
            throw error;
        } finally {
            setLoading(false);
        }
    }

    async function logout() {
        setLoading(true);
        try {
            await AuthService.logout();
            delete apiService.defaults.headers.common["Authorization"];
            setUser(null);
        } catch (error) {
            console.error("Erro ao fazer logout:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated: !!user,
                user,
                loading,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};


// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth deve ser usado dentro do AuthProvider");
    }
    return context;
};
