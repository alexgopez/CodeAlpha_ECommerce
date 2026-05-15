const express = require('express');
const app = express();
const PORT = 5000;

// This allows your server to understand JSON data
app.use(express.json());

app.get('/', (req, res) => {
  res.send('CodeAlpha E-commerce Server is Running! 🚀');
});

app.listen(PORT, () => {
  console.log(`Server is live at http://localhost:${PORT}`);
});