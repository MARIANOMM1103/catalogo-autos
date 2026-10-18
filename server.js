const express = require("express");
const autos = require("./data/autos");

const app = express();
const PORT = process.env.PORT || 3000; // Render asigna el puerto en la variable PORT

app.use(express.json());

// Ruta raíz: describe el servicio y sus endpoints
app.get("/", (req, res) => {
  res.json({
    servicio: "Catálogo de autos",
    version: "1.0.0",
    endpoints: {
      "GET /api/autos": "Lista todos los autos (filtros opcionales: marca, color, anio, precioMax)",
      "GET /api/autos/:id": "Obtiene un auto por su id",
      "GET /api/marcas": "Lista las marcas disponibles",
      "GET /health": "Estado del servicio"
    }
  });
});

// Healthcheck
app.get("/health", (req, res) => {
  res.json({ estado: "ok", timestamp: new Date().toISOString() });
});

// Catálogo completo con filtros opcionales por query string
app.get("/api/autos", (req, res) => {
  const { marca, color, anio, precioMax } = req.query;
  let resultado = autos;

  if (marca) {
    resultado = resultado.filter(a => a.marca.toLowerCase() === marca.toLowerCase());
  }
  if (color) {
    resultado = resultado.filter(a => a.color.toLowerCase() === color.toLowerCase());
  }
  if (anio) {
    const anioNum = Number(anio);
    if (Number.isNaN(anioNum)) {
      return res.status(400).json({ error: "El parámetro 'anio' debe ser numérico" });
    }
    resultado = resultado.filter(a => a.anio === anioNum);
  }
  if (precioMax) {
    const max = Number(precioMax);
    if (Number.isNaN(max)) {
      return res.status(400).json({ error: "El parámetro 'precioMax' debe ser numérico" });
    }
    resultado = resultado.filter(a => a.precio <= max);
  }

  res.json({ total: resultado.length, autos: resultado });
});

// Un auto por id
app.get("/api/autos/:id", (req, res) => {
  const id = Number(req.params.id);
  const auto = autos.find(a => a.id === id);

  if (!auto) {
    return res.status(404).json({ error: `No existe un auto con id ${req.params.id}` });
  }
  res.json(auto);
});

// Marcas disponibles (sin repetir)
app.get("/api/marcas", (req, res) => {
  const marcas = [...new Set(autos.map(a => a.marca))].sort();
  res.json({ total: marcas.length, marcas });
});

// Ruta no encontrada
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

app.listen(PORT, () => {
  console.log(`Servicio de catálogo de autos escuchando en el puerto ${PORT}`);
});
