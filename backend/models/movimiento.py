from typing import TYPE_CHECKING
from datetime import datetime
from sqlalchemy import Integer, String, ForeignKey, DateTime, text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base import Base

if TYPE_CHECKING:
    from .producto import Producto
    from .usuario import Usuario


class Movimiento(Base):
    __tablename__ = "movimiento"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=False)
    tipo: Mapped[str] = mapped_column(String(7), nullable=False)
    cantidad: Mapped[int] = mapped_column(Integer, nullable=False)
    fecha: Mapped[datetime] = mapped_column(
        DateTime, nullable=False, server_default=text("CURRENT_TIMESTAMP")
    )
    motivo: Mapped[str | None] = mapped_column(String(255), nullable=True)
    producto_id: Mapped[int] = mapped_column(ForeignKey("producto.id"), nullable=False)
    usuario_id: Mapped[int] = mapped_column(ForeignKey("usuario.id"), nullable=False)

    # Relaciones N a 1
    producto: Mapped["Producto"] = relationship(back_populates="movimientos")
    usuario: Mapped["Usuario"] = relationship(back_populates="movimientos")
