import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Form, Alert, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import apiService from "../../../../services/ApiService";

export default function CreateProjeto() {
    const navigate = useNavigate();

    interface FormDataState {
        titulo: string;
        publicoAlvo: string;
        dataInscricao: string;
        dataInicio: string;
        vagas: string;
        imagem: File | null;
    }

    const [formData, setFormData] = useState<FormDataState>({
        titulo: "",
        publicoAlvo: "",
        dataInscricao: "",
        dataInicio: "",
        vagas: "",
        imagem: null,
    });

    const [errors, setErrors] = useState<any>({});
    const [success, setSuccess] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData((prev) => ({
                ...prev,
                imagem: file,
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});
        setSuccess(null);

        try {
            const data = new FormData();
            data.append("titulo", formData.titulo);
            data.append("publicoAlvo", formData.publicoAlvo);
            data.append("dataInscricao", formData.dataInscricao);
            data.append("dataInicio", formData.dataInicio);
            data.append("vagas", formData.vagas);
            if (formData.imagem) {
                data.append("imagem", formData.imagem);
            }

            const response = await apiService.post("/api/admin/projetos", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            setSuccess(response.data.msg);
            setTimeout(() => navigate("/admin/projetos"), 1000);
        } catch (error: any) {
            if (error.response?.status === 422) {
                setErrors(error.response.data.errors || {});
            } else {
                setErrors({ general: "Erro ao cadastrar projeto." });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Novo Projeto</h2>
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
                        <Form.Label>Título</Form.Label>
                        <Form.Control
                            type="text"
                            name="titulo"
                            value={formData.titulo}
                            onChange={handleChange}
                            isInvalid={!!errors.name}
                            placeholder="Digite do título do projeto"
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.titulo}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Público Alvo</Form.Label>
                        <Form.Control
                            type="text"
                            name="publicoAlvo"
                            value={formData.publicoAlvo}
                            onChange={handleChange}
                            isInvalid={!!errors.publicoAlvo}
                            placeholder="Digite o público alvo"
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.publicoAlvo}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Data de inscrição</Form.Label>
                        <Form.Control
                            type="date"
                            name="dataInscricao"
                            value={formData.dataInscricao}
                            onChange={handleChange}
                            isInvalid={!!errors.dataInscricao}
                            placeholder="Digite a data de inscrição"
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.dataInscricao}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Label>Data de inicio</Form.Label>
                        <Form.Control
                            type="date"
                            name="dataInicio"
                            value={formData.dataInicio}
                            onChange={handleChange}
                            isInvalid={!!errors.dataInicio}
                            placeholder="Digite data de inicio"
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.dataInicio}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Label>Vagas</Form.Label>
                        <Form.Control
                            type="number"
                            name="vagas"
                            value={formData.vagas}
                            onChange={handleChange}
                            isInvalid={!!errors.vagas}
                            placeholder="Digite a quantidade de vagas"
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.vagas}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Label>Selecione a imagem desejada</Form.Label>
                        <Form.Control
                            type="file"
                            name="imagem"
                            onChange={handleFileChange}
                            isInvalid={!!errors.imagem}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.imagem}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <div className="d-flex justify-content-end">
                        <Button type="submit" variant="primary" disabled={loading}>
                            {loading ? (
                                <Spinner animation="border" size="sm" className="me-2" />
                            ) : (
                                <FontAwesomeIcon icon={faSave} className="me-2" />
                            )}
                            Cadastrar Projeto
                        </Button>
                    </div>
                </Form>
            </Card>
        </div>
    );
}
