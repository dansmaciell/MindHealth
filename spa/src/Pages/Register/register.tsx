import React, { useState } from 'react';
import styles from './register.module.scss';
import { useNavigate } from 'react-router-dom';

const backgroundImage = "/imgs/fundot3.png"; 

const Register: React.FC = () => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState(''); // <--- NOVO CAMPO
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        setLoading(true);

        if (password !== confirmPassword) {
            setError("As senhas não coincidem.");
            setLoading(false);
            return;
        }

        try {
            
            const response = await fetch('https://localhost/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    nome: name,       
                    username: username, 
                    email: email,
                    password: password
                })
            });

            const data = await response.json();

            if (!response.ok) {
                const errorMsg = data.message || JSON.stringify(data);
                throw new Error(errorMsg);
            }

            setSuccess("Registro realizado com sucesso! Redirecionando...");
            
            setTimeout(() => {
                navigate('/login'); 
            }, 1500);

        } catch (err: any) {
            console.error(err);
            setError(err.message || "Erro ao registrar. Tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.registerPage} style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div className={styles.registerCard}>
                <div className={styles.cardHeader}>
                    <h1 className={styles.title}>CRIE SUA CONTA</h1>
                    <p className={styles.subtitle}>Comece sua jornada de bem-estar hoje.</p>
                </div>

                <form onSubmit={handleRegister} className={styles.registerForm}>
                    <div className={styles.formGroup}>
                        <label htmlFor="name">Nome Completo</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Seu nome"
                            required
                        />
                    </div>

                    
                    <div className={styles.formGroup}>
                        <label htmlFor="username">Nome de Usuário (Username)</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Seu nome de usuário"
                            required
                        />
                    </div>
                    
                    <div className={styles.formGroup}>
                        <label htmlFor="email">E-mail</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="seu.email@mindhealth.com"
                            required
                        />
                    </div>
                    
                    <div className={styles.formGroup}>
                        <label htmlFor="password">Senha</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Mínimo 6 caracteres"
                            required
                        />
                    </div>
                    
                    <div className={styles.formGroup}>
                        <label htmlFor="confirmPassword">Confirme a Senha</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Repita a senha"
                            required
                        />
                    </div>

                    {error && <p className={styles.errorMessage}>{error}</p>}
                    {success && <p className={styles.successMessage}>{success}</p>}

                    <button type="submit" className={styles.registerButton} disabled={loading}>
                        {loading ? 'REGISTRANDO...' : 'REGISTRAR'}
                    </button>
                </form>

                <div className={styles.cardFooter}>
                    Já tem uma conta? <a href="/login" className={styles.loginLink}>Fazer Login</a>
                </div>
            </div>
        </div>
    );
};

export default Register;