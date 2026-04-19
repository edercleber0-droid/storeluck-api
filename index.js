const express = require("express");
const app = express();

// 🔑 banco simples de keys (memória)
const keys = new Map();

// exemplo de key
keys.set("STORE-ABC123", {
  valid: true,
  expires: Date.now() + 24 * 60 * 60 * 1000 // 24h
});

// 🌐 rota principal
app.get("/", (req, res) => {
  res.send("StoreLuck API Online");
});

// 🔍 validação de key
app.get("/validate/:key", (req, res) => {
  const key = req.params.key;

  const data = keys.get(key);

  if (!data) {
    return res.json({ valid: false, reason: "not_found" });
  }

  if (Date.now() > data.expires) {
    return res.json({ valid: false, reason: "expired" });
  }

  return res.json({ valid: true });
});

// 🚀 start
app.listen(process.env.PORT || 3000, () => {
  console.log("API rodando");
});
