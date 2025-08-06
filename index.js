const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/proxy', async (req, res) => {
  try {
    const response = await axios.post('https://jonathanvs-001-site1.mtempurl.com', req.body);

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error en el proxy', details: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy corriendo en puerto ${PORT}`));

