# Catálogo de autos — Microservicio web

Microservicio REST construido con **Node.js** y **Express** que expone un catálogo básico de autos con los atributos: marca, modelo, año, precio y color.

## Ejecutar localmente

```bash
npm install
npm start
```

El servicio queda disponible en `http://localhost:3000`.

## Rutas

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/` | Información del servicio y lista de endpoints |
| GET | `/health` | Estado del servicio |
| GET | `/api/autos` | Catálogo completo |
| GET | `/api/autos?marca=Nissan` | Filtra por marca |
| GET | `/api/autos?color=Rojo` | Filtra por color |
| GET | `/api/autos?anio=2025` | Filtra por año |
| GET | `/api/autos?precioMax=400000` | Autos con precio menor o igual al indicado |
| GET | `/api/autos/:id` | Un auto por su id (404 si no existe) |
| GET | `/api/marcas` | Marcas disponibles |

Los filtros se pueden combinar: `/api/autos?marca=Toyota&anio=2024`.

### Ejemplo de respuesta (`GET /api/autos/1`)

```json
{
  "id": 1,
  "marca": "Nissan",
  "modelo": "Versa",
  "anio": 2024,
  "precio": 329900,
  "color": "Blanco"
}
```

## Despliegue

Desplegado en Render como Web Service (runtime Node, comando de inicio `node server.js`).

URL: `https://<nombre-del-servicio>.onrender.com`

## Autor

Mariano Martínez Marrón
