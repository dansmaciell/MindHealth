import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, Form, Alert, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import apiService from "../../../../services/ApiService";

interface UsuarioForm {
  name: string;
  email: string;
  username: string;
  password?: string; // Opcional no update
  status: boolean
}

export default function UpdateUser() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<UsuarioForm>({
    name: "",
    email: "",
    username: "",
    password: "",
    status: true,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [apiFeedback, setApiFeedback] = useState<{ message: string; style: string } | null>(null);

  useEffect(() => {
    async function fetchUsuario() {
      try {
        const response = await apiService.get(`/api/admin/usuarios/${id}`);
        const { name, email, username, status } = response.data.usuario;
        setFormData({ name, email, username, password: "" , status});
        setErrors({});
      } catch (error) {
        setApiFeedback({ message: "Erro ao carregar usuário.", style: "danger" });
      } finally {
        setLoading(false);
      }
    }

    fetchUsuario();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErrors({});
    setApiFeedback(null);

    try {
      await apiService.put(`/api/admin/usuarios/${id}`, formData);
      setApiFeedback({ message: "Usuário atualizado com sucesso!", style: "success" });
      setTimeout(() => navigate("/admin/usuarios"), 1000);
    } catch (error: any) {
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors || {});
      } else {
        setApiFeedback({ message: "Erro ao atualizar usuário.", style: "danger" });
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Editar Usuário</h2>
        <Button variant="secondary" onClick={() => navigate(-1)}>
          <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
          Voltar
        </Button>
      </div>

      <Card className="p-4 shadow-sm">
        {apiFeedback && <Alert variant={apiFeedback.style}>{apiFeedback.message}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <div>
              <Form.Check
                inline
                type="radio"
                label="Ativo"
                name="status"
                value="true"
                checked={formData.status === true}
                onChange={() => setFormData({ ...formData, status: true })}
              />
              <Form.Check
                inline
                type="radio"
                label="Inativo"
                name="status"
                value="false"
                checked={formData.status === false}
                onChange={() => setFormData({ ...formData, status: false })}
              />
            </div>
          </Form.Group>
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
            <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
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
            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
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
            <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Senha (deixe em branco para manter a atual)</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              isInvalid={!!errors.password}
              placeholder="Digite a nova senha"
            />
            <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button type="submit" variant="primary" disabled={saving}>
              {saving ? (
                <Spinner animation="border" size="sm" className="me-2" />
              ) : (
                <FontAwesomeIcon icon={faSave} className="me-2" />
              )}
              Atualizar Usuário
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
}
