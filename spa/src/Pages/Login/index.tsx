import React, { useState } from 'react';
import Input from '../../_components/Input/Input';
import Button from '../../_components/Button/Button';
import logo from '../../Image/lucas_silva-removebg-preview.png';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../contexts/AuthContext";

export default function Login() {
    const { login, loading } = useAuth();
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');

    const navigate = useNavigate();

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        setErro('');

        try {
            await login(usuario, senha);
            
            navigate('/admin');
        } catch (error: any) {
            console.log("teste")
            if (error.response.status === 401 || error.response.status === 403) {
                setErro(error.response.data.msg || 'Credenciais inválidas');
            }
             else {
                setErro('Erro ao tentar fazer login');
            }
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div className="card shadow-sm p-4" style={{ width: '100%', maxWidth: '400px' }}>
                <div className="text-center mb-4">
                    <img
                        src={logo}
                        alt="Instituto Lucas Silva"
                        style={{ width: '200px' }}
                        className="img-fluid"
                    />
                </div>

                {erro && (
                    <div className="alert alert-danger text-center" role="alert">
                        {erro}
                    </div>
                )}

                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <Input
                            placeholder="Usuário"
                            type="text"
                            value={usuario}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsuario(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <Input
                            placeholder="Senha"
                            type="password"
                            value={senha}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSenha(e.target.value)}
                            required
                        />
                    </div>

                    <div className="d-grid">
                        <Button type="submit" disabled={loading} text="Entrar" />
                    </div>
                </form>
            </div>
        </div>
    );
}
