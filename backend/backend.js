const express = require('express');
const app = express();

const PORT = process.env.PORT || 3002;
const SECRET_PASSWORD = process.env.SECRET_PASSWORD || 'default-pass';

app.get("/", (req, res) => {
  res.send("Backend is working!");
});

app.get('/api/data', (req, res) => {
  res.json({ message: 'Hello from backend!', secret: SECRET_PASSWORD });
});

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});

