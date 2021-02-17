const xray = require("x-ray")

const x = xray({
  filters: {
    trim: (v) => typeof v === "string" ? v.replace(/\\r/, "").replace(/\\n/, "").trim() : v
  }
})

module.exports.fetchNews = async (page) => {
  let url = "https://www.regjeringen.no/en/whatsnew/news-and-press-releases/id2006120/"
  if (page) {
    url += `?page=${page}`
  }
  return new Promise((resolve, reject) => {
    x(url, ".listItem",
      [{
        title: ".title a | trim",
        link: ".title a@href",
        id: ".title a@data-hitid",
        date: ".info .date",
        type: ".info .type",
        dept: ".info .department",
        desc: ".excerpts | trim"
      }]
    )((err, data) => {
      if (err) {
        return reject(err)
      }
      resolve(data)
    })
  })
}