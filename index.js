const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

// ✅ CORS ajustado para Firebase Hosting
app.use(cors({
  origin: 'https://piloto-mantenimiento-vehiculo.web.app',
}));

app.use(express.json());

app.post('/proxy', async (req, res) => {
  try {
    const { endpoint, data } = req.body;

    const response = await axios.post(
      `http://jonathanvs-001-site1.mtempurl.com${endpoint}`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );

    res.status(response.status).json(response.data);
  } catch (error) {
    console.error('Error en el proxy:', error.message);
    res.status(500).json({ error: 'Error en el proxy', details: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy corriendo en puerto ${PORT}`));
