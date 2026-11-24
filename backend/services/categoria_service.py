from backend.repositories import categorias_repository as repo


def listar_categorias():
    return repo.listar_categorias()