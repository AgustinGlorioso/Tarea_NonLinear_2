CREATE TABLE usuario (
    id      INTEGER      NOT NULL,
    nombre  VARCHAR(60)  NOT NULL,
    CONSTRAINT pk_usuario         PRIMARY KEY (id),
    CONSTRAINT unq_usuario_nombre UNIQUE (nombre)
);
	
CREATE TABLE categoria (
    id           INTEGER      NOT NULL,
    nombre       VARCHAR(60)  NOT NULL,
    descripcion  VARCHAR(255),
    stock_minimo INTEGER      DEFAULT 0 NOT NULL,
    CONSTRAINT pk_categoria         PRIMARY KEY (id),
    CONSTRAINT unq_categoria_nombre UNIQUE (nombre),
    CONSTRAINT chk_stock_minimo CHECK (stock_minimo >= 0)
);

CREATE TABLE producto (
    id               INTEGER      NOT NULL,
    nombre           VARCHAR(60)  NOT NULL,
    precio_unitario  FLOAT  	  NOT NULL,
    stock_actual     INTEGER	  DEFAULT 0 NOT NULL,
    categoria_id     INTEGER 	  NOT NULL,
    CONSTRAINT pk_producto  PRIMARY KEY (id),
    CONSTRAINT fk_categoria FOREIGN KEY (categoria_id) REFERENCES categoria(id),
    CONSTRAINT chk_stock_actual CHECK (stock_actual >= 0)
);

CREATE TABLE movimiento (
    id               INTEGER      NOT NULL,
    tipo             VARCHAR(7)   NOT NULL,
    cantidad         INTEGER  	  NOT NULL,
    fecha	         TIMESTAMP    NOT NULL,
    motivo           VARCHAR(255),
    producto_id      INTEGER 	  NOT NULL,
    usuario_id       INTEGER 	  NOT NULL,
    CONSTRAINT pk_movimiento  PRIMARY KEY (id),
    CONSTRAINT fk_producto    FOREIGN KEY (producto_id) REFERENCES producto(id),
    CONSTRAINT fk_usuario     FOREIGN KEY (usuario_id)  REFERENCES usuario(id),
    CONSTRAINT chk_tipo CHECK (tipo IN ('entrada', 'salida')),
    CONSTRAINT chk_cantidad CHECK (cantidad > 0)	
);


CREATE TABLE producto_historial (
    id               INTEGER      NOT NULL,
    nombre_anterior  VARCHAR(60)  NOT NULL,
    nombre_nuevo     VARCHAR(60)  NOT NULL,
    precio_anterior  FLOAT        NOT NULL,
    precio_nuevo     FLOAT        NOT NULL,
    fecha            TIMESTAMP    NOT NULL,
    producto_id      INTEGER      NOT NULL,
    usuario_id       INTEGER      NOT NULL,
    CONSTRAINT pk_producto_historial PRIMARY KEY (id),
    CONSTRAINT fk_historial_producto FOREIGN KEY (producto_id) REFERENCES producto(id),
    CONSTRAINT fk_historial_usuario  FOREIGN KEY (usuario_id)  REFERENCES usuario(id)
);


