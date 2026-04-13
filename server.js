const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();

app.get("/api/leiloes", async (req, res) => {
  try {
    const { data } = await axios.get("https://www.e-leiloes.pt/");
    const $ = cheerio.load(data);

    const anuncios = [];

    $("a").each((i, el) => {
      const text = $(el).text().trim();

      if (text.includes("€") && text.length > 20) {
        anuncios.push({
          title: text,
          price: "Ver no site",
          link: "https://www.e-leiloes.pt"
        });
      }
    });

    res.json(anuncios.slice(0, 20));
  } catch (err) {
    res.json([]);
  }
});

app.listen(3000, () => console.log("Server running"));
