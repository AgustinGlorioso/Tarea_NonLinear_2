from backend.repositories import producto_repository as repo


class CategoriaNoEncontrada(Exception):
    pass


def listar_productos(categoria: str | None = None):
    if categoria is None:
        return repo.listar_productos()
    cat = repo.obtener_categoria_por_nombre(categoria)
    if cat is None:
        raise CategoriaNoEncontrada(f"La categoria '{categoria}' no existe")
    resultado = repo.listar_productos(cat["id"])
    return resultado