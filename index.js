const express = require("express");
const app = express();

app.use(express.json());

// 🔑 banco simples em memória (teste)
const keys = new Map();

// rota teste
app.get("/", (req, res) => {
  res.send("StoreLuck API Online");
});

// gerar key (manual teste)
app.get("/generate/:key", (req, res) => {
  const key = req.params.key;

  keys.set(key, {
    valid: true,
    created: Date.now()
  });

  res.json({ status: "created", key });
});

// validar key
app.get("/validate/:key", (req, res) => {
  const key = req.params.key;

  const data = keys.get(key);

  if (!data) {
    return res.json({ valid: false });
  }

  return res.json({ valid: true });
});

// start server
app.listen(process.env.PORT || 3000, () => {
  console.log("🚀 API online");
});
