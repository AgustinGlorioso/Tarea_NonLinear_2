from typing import TYPE_CHECKING
from sqlalchemy import Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base import Base

if TYPE_CHECKING:
    from .movimiento import Movimiento
    from .producto_historial import ProductoHistorial


class Usuario(Base):
    __tablename__ = "usuario"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=False)
    nombre: Mapped[str] = mapped_column(String(60), nullable=False)

    # Relaciones 1 a N
    movimientos: Mapped[list["Movimiento"]] = relationship(back_populates="usuario")
    historial: Mapped[list["ProductoHistorial"]] = relationship(back_populates="usuario")
