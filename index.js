const express = require("express");
const bp = require("body-parser");
const qr = require("qrcode");

const app = express();

const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());

app.get("/", (req, res) => {
    res.render("index");
});

app.post("/scan", (req, res) => {
    const url = req.body.url;

    if (url.length === 0) res.send("Данных нет!");
    
    qr.toDataURL(url, (err, data) => {
        if (err) res.send("Произошла ошибка");
      
        res.render("scan", { data });
    });
});

app.listen(port, () => console.log(`Сервер запущен на порту ${ port }`));
