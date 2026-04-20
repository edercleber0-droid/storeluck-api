const fs = require("fs");

module.exports = (req, res) => {
  const key = req.query.key;

  let keys = [];
  if (fs.existsSync("keys.json")) {
    keys = JSON.parse(fs.readFileSync("keys.json"));
  }

  const found = keys.find(k => k.key === key);

  if (!found) return res.json({ valid: false });

  if (found.expires && Date.now() > found.expires) {
    return res.json({ valid: false, expired: true });
  }

  return res.json({ valid: true });
};