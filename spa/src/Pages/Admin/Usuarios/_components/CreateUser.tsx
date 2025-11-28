import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Form, Alert, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import apiService from "../../../../services/ApiService";

export default function CreateUser() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        username: "",
        password: "",
    });

    const [errors, setErrors] = useState<any>({});
    const [success, setSuccess] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});
        setSuccess(null);

        try {
            const response = await apiService.post("/api/admin/usuarios", formData);
            setSuccess(response.data.msg); // usa a mensagem que vem da API
            setTimeout(() => navigate("/admin/usuarios"), 1000);
        } catch (error: any) {
            if (error.response?.status === 422) {
                setErrors(error.response.data.errors || {});
            } else {
                setErrors({ general: "Erro ao cadastrar usuário." });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Novo Usuário</h2>
                <Button variant="secondary" onClick={() => navigate(-1)}>
                    <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
                    Voltar
                </Button>
            </div>

            <Card className="p-4 shadow-sm">
                <Form onSubmit={handleSubmit}>
                    {errors.general && <Alert variant="danger">{errors.general}</Alert>}
                    {success && <Alert variant="success">{success}</Alert>}

                    <Form.Group className="mb-3">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            isInvalid={!!errors.name}
                            placeholder="Digite o nome do usuário"
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.name}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>E-mail</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            isInvalid={!!errors.email}
                            placeholder="Digite o e-mail"
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.email}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Usuário</Form.Label>
                        <Form.Control
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            isInvalid={!!errors.username}
                            placeholder="Digite o nome de usuário"
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.username}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Label>Senha</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            isInvalid={!!errors.password}
                            placeholder="Digite a senha"
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.password}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <div className="d-flex justify-content-end">
                        <Button type="submit" variant="primary" disabled={loading}>
                            {loading ? (
                                <Spinner animation="border" size="sm" className="me-2" />
                            ) : (
                                <FontAwesomeIcon icon={faSave} className="me-2" />
                            )}
                            Cadastrar Usuário
                        </Button>
                    </div>
                </Form>
            </Card>
        </div>
    );
}
