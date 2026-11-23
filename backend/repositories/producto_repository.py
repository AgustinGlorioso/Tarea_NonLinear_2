import unicodedata

# Datos de prueba que imitan las tablas de la base
CATEGORIAS = [
    {"id": 1, "nombre": "Electrónica", "stock_minimo": 5},
    {"id": 2, "nombre": "Ropa", "stock_minimo": 10},
    {"id": 3, "nombre": "Alimentos", "stock_minimo": 20},
]

PRODUCTOS = [
    {"id": 1, "nombre": "Auriculares inalámbricos", "precio_unitario": 45999.0, "stock_actual": 20, "categoria_id": 1},
    {"id": 2, "nombre": "Cargador USB-C", "precio_unitario": 12500.0, "stock_actual": 60, "categoria_id": 1},
    {"id": 3, "nombre": "Remera algodón", "precio_unitario": 9500.0, "stock_actual": 120, "categoria_id": 2},
    {"id": 4, "nombre": "Campera rompeviento", "precio_unitario": 38000.0, "stock_actual": 3, "categoria_id": 2},
    {"id": 5, "nombre": "Yerba mate 1kg", "precio_unitario": 4200.0, "stock_actual": 0, "categoria_id": 3},
]

def _normalizar(texto: str) -> str:
    # "Electrónica" -> "electronica": separa las letras de sus acentos,
    # descarta los acentos y pasa todo a minúscula
    sin_acentos = unicodedata.normalize("NFD", texto).encode("ascii", "ignore").decode("ascii")
    return sin_acentos.lower()


def obtener_categoria_por_nombre(nombre: str) -> dict | None:
    for categoria in CATEGORIAS:
        if _normalizar(categoria["nombre"]) == _normalizar(nombre):
            return categoria
    return None


def listar_productos(categoria_id: int | None = None) -> list[dict]:
    # Equivale al JOIN entre producto y categoria
    categoria_por_id = {c["id"]: c for c in CATEGORIAS}

    resultado = []
    for producto in PRODUCTOS:
        if categoria_id is None or producto["categoria_id"] == categoria_id:
            resultado.append({
                "id": producto["id"],
                "nombre": producto["nombre"],
                "categoria_id": producto["categoria_id"],
                "categoria": categoria_por_id[producto["categoria_id"]]["nombre"],
                "precio_unitario": producto["precio_unitario"],
                "stock_actual": producto["stock_actual"],
                "stock_minimo": categoria_por_id[producto["categoria_id"]]["stock_minimo"]
            })
    return resultado