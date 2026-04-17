const express = require("express");
const app = express();

app.use(express.json());

// banco simples (memória)
let keys = {};

// 🔑 ROTA PRA CRIAR KEY (tipo bot faria)
app.get("/create", (req, res) => {
  const tipo = req.query.tipo;

  let tempo = 0;

  if (tipo === "1d") tempo = 86400;
  else if (tipo === "3d") tempo = 259200;
  else if (tipo === "perma") tempo = 0;
  else return res.json({ error: "Tipo inválido" });

  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let key = "STORE-";

  for (let i = 0; i < 10; i++) {
    key += chars[Math.floor(Math.random() * chars.length)];
  }

  let expira = tempo === 0 ? 0 : Date.now() + tempo * 1000;

  keys[key] = {
    expira: expira
  };

  res.json({
    key: key,
    tipo: tipo
  });
});

// 🔍 ROTA PRA VERIFICAR KEY
app.get("/check", (req, res) => {
  const key = req.query.key;

  if (!keys[key]) {
    return res.json({ valid: false, msg: "Key inválida" });
  }

  const data = keys[key];

  if (data.expira !== 0 && Date.now() > data.expira) {
    delete keys[key];
    return res.json({ valid: false, msg: "Key expirada" });
  }

  res.json({ valid: true, msg: "Key válida" });
});

// 🧠 limpa keys expiradas automaticamente
setInterval(() => {
  const now = Date.now();

  for (let key in keys) {
    if (keys[key].expira !== 0 && now > keys[key].expira) {
      delete keys[key];
    }
  }
}, 60000);

app.listen(3000, () => {
  console.log("API rodando");
});
