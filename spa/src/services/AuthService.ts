import apiService from "./ApiService";

interface AuthResponse {
    access_token: string;
    user: {
        nome: string;
    };
}

export const AuthService = {
    async login(username: string, password: string): Promise<AuthResponse> {
        const response = await apiService.post("/api/login", { username, password });
        return response.data;
    },

    async logout() {
        await apiService.post("/api/logout");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    },

    // outras funções, como register, etc, podem ser adicionadas aqui
};