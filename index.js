const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(cors({
  origin: 'https://piloto-mantenimiento-vehiculo.web.app',
}));
app.use(express.json());

// ✅ Manejo del preflight OPTIONS
app.options('/proxy', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://piloto-mantenimiento-vehiculo.web.app');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.sendStatus(204);
});

// ✅ Proxy principal
app.post('/proxy', async (req, res) => {
  try {
    let { endpoint, data, body, method, params, headers } = req.body;
    data = data || body || null;


    // Valores por defecto
    method = (method || 'POST').toUpperCase();
    data = data || null;
    params = params || null;
    headers = headers || {};
    headers['Content-Type'] = 'application/json';

    const url = `http://jonathanvs-001-site1.mtempurl.com${endpoint}`;

    let response;
    if (method === 'GET') {
      response = await axios.get(url, { headers, params });
    } else if (method === 'POST') {
      response = await axios.post(url, data, { headers, params });
    } else if (method === 'PUT') {
      response = await axios.put(url, data, { headers, params });
    } else if (method === 'DELETE') {
      response = await axios.delete(url, { headers, params });
    } else if (method === 'PATCH') {
      response = await axios.patch(url, data, { headers, params });
    } else {
      return res.status(400).json({ error: 'Método HTTP no soportado' });
    }

    res.setHeader('Access-Control-Allow-Origin', 'https://piloto-mantenimiento-vehiculo.web.app');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.status(response.status).json(response.data);

  } catch (error) {
    console.error('Error en el proxy:', error.message);
    res.setHeader('Access-Control-Allow-Origin', 'https://piloto-mantenimiento-vehiculo.web.app');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (error.response) {
      res.status(error.response.status).json({
        error: 'Error en el backend',
        details: error.response.data
      });
    } else {
      res.status(500).json({
        error: 'Error en el proxy',
        details: error.message
      });
    }
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy corriendo en puerto ${PORT}`));

