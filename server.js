const express = require("express");
const app = express();

let coords = { lat: 0, lon: 0 };

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// POST desde el ESP32
app.post("/gps", (req, res) => {
  const { lat, lon } = req.body;
  if (!lat || !lon) return res.status(400).send("Faltan datos");

  coords = {
    lat: parseFloat(lat),
    lon: parseFloat(lon)
  };

  console.log("📍 Coordenadas actualizadas:", coords);
  res.send("OK");
});

// GET para Leaflet
app.get("/coordenadas", (req, res) => {
  res.json(coords);
});

// Página principal
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en puerto ${PORT}`);
});
