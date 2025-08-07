const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

// ✅ CORS ajustado para Firebase Hosting
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
  
      // ✅ Agrega headers CORS manualmente
      res.setHeader('Access-Control-Allow-Origin', 'https://piloto-mantenimiento-vehiculo.web.app');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
      res.status(response.status).json(response.data);
    } catch (error) {
      console.error('Error en el proxy:', error.message);
  
      // ✅ También en errores
      res.setHeader('Access-Control-Allow-Origin', 'https://piloto-mantenimiento-vehiculo.web.app');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
      res.status(500).json({ error: 'Error en el proxy', details: error.message });
    }
  });
  

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy corriendo en puerto ${PORT}`));
