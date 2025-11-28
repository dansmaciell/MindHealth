import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit, faTrash, faTasks } from "@fortawesome/free-solid-svg-icons";
import apiService from "../../../services/ApiService";

import {
    Button,
    Card,
    Spinner,
    Row,
    Col,
    Alert,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

interface ApiFeedback {
    msg: string;
    style: "success" | "danger" | "warning" | "info";
}

interface Projeto {
    id: number;
    titulo: string;
    publicoAlvo: string;
    dataInscricao: Date;
    dataInicio: Date;
    vagas: number;
    imagem: string | null;
}

export default function ProjetosAdmin() {
    const [projetos, setProjetos] = useState<Projeto[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [apiFeedback, setApiFeedback] = useState<ApiFeedback | null>(null);

    const navigate = useNavigate()

    useEffect(() => {
        async function fetchProjetos() {
            try {
                setLoading(true);
                const response = await apiService.get("/api/admin/projetos");
                setProjetos(response.data.projetos);
                setError(null);
            } catch (err) {
                setError("Erro ao carregar usuários.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        fetchProjetos();
    }, []);

    const handleCreate = () => {
        navigate("/admin/projetos/create");
    };

    const handleEdit = (project: Projeto) => {
        navigate(`/admin/projetos/${project.id}/update`);
    };

    const handleDelete = async (project: Projeto) => {
        setApiFeedback(null);
        if (!window.confirm(`Deseja excluir o usuário ${project.titulo}?`)) return;

        try {
            const response = await apiService.delete(`/api/admin/projetos/${project.id}`);
            setProjetos(projetos.filter((u) => u.id !== project.id));
            setApiFeedback({ msg: response.data.msg, style: "success" });
        } catch (error: any) {
            setApiFeedback({
                msg: error.response?.data?.msg || "Erro desconhecido",
                style: "danger",
            });
        }
    };

    return (
        <div className="container py-4">
            {apiFeedback && <Alert variant={apiFeedback.style}>{apiFeedback.msg}</Alert>}
            {/* Header responsivo */}
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
                <h2 className="mb-0">Lista de Projetos</h2>
                <Button variant="primary" onClick={handleCreate}>
                    <FontAwesomeIcon icon={faPlus} className="me-2" />
                    Novo Projeto
                </Button>
            </div>

            {/* Loading */}
            {loading && (
                <div className="text-center py-5">
                    <Spinner animation="border" variant="primary" />
                </div>
            )}

            {/* Erro */}
            {error && <Alert variant="danger">{error}</Alert>}

            {/* Lista de usuários */}
            {!loading && projetos.length > 0 && (
                <Row xs={1} md={2} lg={3} className="g-4">
                    {projetos.map((projeto) => (
                        <Col key={projeto.id}>
                            <Card className="h-100 shadow-sm">
                                <Card.Body>
                                    {/* Conteúdo principal com empilhamento em telas pequenas */}
                                    <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start gap-3">
                                        <div className="d-flex align-items-start gap-3 flex-grow-1">
                                            <div className="bg-primary bg-opacity-25 p-3 rounded-circle d-flex align-items-center justify-content-center">
                                                <FontAwesomeIcon icon={faTasks} className="text-primary" />
                                            </div>
                                            <div>
                                                <h5 className="mb-1">{projeto.titulo}</h5>
                                            </div>
                                        </div>

                                        <div className="d-flex gap-2 flex-wrap">
                                            <Button
                                                variant="outline-secondary"
                                                size="sm"
                                                onClick={() => handleEdit(projeto)}
                                            >
                                                <FontAwesomeIcon icon={faEdit} className="me-1" />
                                                Editar
                                            </Button>
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                onClick={() => handleDelete(projeto)}
                                            >
                                                <FontAwesomeIcon icon={faTrash} className="me-1" />
                                                Excluir
                                            </Button>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}

            {/* Nenhum usuário */}
            {!loading && projetos.length === 0 && (
                <Card className="text-center mt-5 p-5">
                    <Card.Body>
                        <FontAwesomeIcon icon={faTasks} size="3x" className="mb-3 text-muted" />
                        <h5>Nenhum projeto encontrado</h5>
                        <p className="text-muted">Comece criando seu primeiro projeto no sistema.</p>
                        <Button onClick={handleCreate}>
                            <FontAwesomeIcon icon={faPlus} className="me-2" />
                            Criar Primeiro Projeto
                        </Button>
                    </Card.Body>
                </Card>
            )}
        </div>
    );
}
