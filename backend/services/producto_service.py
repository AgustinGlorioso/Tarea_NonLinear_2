from backend.repositories import producto_repository as repo


class CategoriaNoEncontrada(Exception):
    pass


def listar_productos(categoria: str | None = None):
    if categoria is None:
        productos = repo.listar_productos()
    else:
        cat = repo.obtener_categoria_por_nombre(categoria)
        if cat is None:
            raise CategoriaNoEncontrada(f"La categoria '{categoria}' no existe")
        productos = repo.listar_productos(cat["id"])

    for producto in productos:
        producto["estado"] = calcular_estado(producto["stock_actual"], producto["stock_minimo"])
    return productos

def calcular_estado(stock_actual: int, stock_minimo: int) -> str:
    if stock_actual == 0:
        return "sin_stock"
    if stock_actual <= stock_minimo:
        return "bajo"
    return "ok"