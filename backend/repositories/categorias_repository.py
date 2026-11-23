# Datos de prueba que imitan la tabla categoria
CATEGORIAS = [
    {"id": 1, "nombre": "Electrónica", "stock_minimo": 5},
    {"id": 2, "nombre": "Ropa", "stock_minimo": 10},
    {"id": 3, "nombre": "Alimentos", "stock_minimo": 20},
]


def listar_categorias() -> list[dict]:
    return [dict(categoria) for categoria in CATEGORIAS]