import React, { useState } from 'react';
import styles from './Login.module.scss';
import { useNavigate } from 'react-router-dom';
import Input from '../../_components/Input/Input';

const backgroundImage = "/imgs/fundot3.png";
const mindHealthLogo = "/imgs/logo_ofc_2.png";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            
            const response = await fetch('https://localhost/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                })
            });

            const data = await response.json();
            console.log(data);

            if (!response.ok) {
                throw new Error(data.error || 'Falha ao autenticar.');
            }

            
            if (data.token) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
            }

          
            navigate('/diarioemocional'); 

        } catch (err: any) {
            console.error(err);
            setError("E-mail ou senha incorretos.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.loginPage} style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div className={styles.loginCard}>

                <div className="text-center mb-4">
                    <img
                        src={mindHealthLogo}
                        alt="Mind Health Logo"
                        className={styles.logoImage}
                    />
                    <h1 className={styles.title}>BEM-VINDO(A)!</h1>
                    <p className={styles.subtitle}>Acesse sua conta para continuar sua jornada.</p>
                </div>

                {error && (
                    <div className={styles.errorMessage} role="alert">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin}>
                    <div className={styles.inputGroup}>
                        <Input
                            placeholder="Seu E-mail"
                            type="email"
                            value={email}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <Input
                            placeholder="Sua Senha"
                            type="password"
                            value={password}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="d-grid">
                        <button type="submit" className={styles.loginButton} disabled={loading}>
                            {loading  ? 'Entrando...' : 'Entrar'}
                        </button>
                    </div>
                </form>

                <div className={styles.registerLinkContainer}>
                    Não tem uma conta? <a href="/register" className={styles.registerLink}>Crie uma aqui!</a>
                </div>
            </div>
        </div>
    );
}