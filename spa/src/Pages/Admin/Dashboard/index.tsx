

export default function AdminDashboard() {
  return (
    <div className="container py-4">
      <h1 className="mb-4 display-5 fw-bold">Painel do Administrador</h1>

      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card border-primary mb-3">
            <div className="card-header fw-semibold">Usuários cadastrados</div>
            <div className="card-body text-primary">
              <h5 className="card-title display-6">152</h5>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-warning mb-3">
            <div className="card-header fw-semibold">Relatórios pendentes</div>
            <div className="card-body text-warning">
              <h5 className="card-title display-6">9</h5>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-success mb-3">
            <div className="card-header fw-semibold">Acessos hoje</div>
            <div className="card-body text-success">
              <h5 className="card-title display-6">487</h5>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header fs-4 fw-bold">Ações rápidas</div>
        <div className="card-body">
          <div className="d-flex flex-wrap gap-3">
            <button className="btn btn-primary">Criar novo usuário</button>
            <button className="btn btn-success">Gerar relatório</button>
            <button className="btn btn-danger">Encerrar sessões</button>
          </div>
        </div>
      </div>
    </div>
  );
}
