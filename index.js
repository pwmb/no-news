const express = require("express")
const { fetchNews } = require("./news")
const PORT = process.env.PORT || 8080

const app = express()

app.set("view engine", "pug")

app.get("/", async (req, res) => {
  try {
    const startTime = Date.now()
    const page = req.query.page || 1;
    const news = await fetchNews(page);
    const duration = Date.now() - startTime;
    res.setHeader("duration", duration).render("index", { news, page, duration })
  } catch (error) {
    console.error(error)
    res.status(500).json({ ok: false, error: "Failed to get the news" })
  }
}).listen(PORT, () => console.log(`Server Started on ${PORT}`))