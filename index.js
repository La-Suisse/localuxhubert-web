var express = require("express")
var ejs = require("ejs")
var bodyParser = require("body-parser")
var mysql = require("mysql")
var app = express()

var con = mysql.createConnection({
    host: "192.168.2.4",
    user: "sqlaneury",
    password: "savary",
    database: "bdaneury1",
    port: 3306
})

app.set("view engine", ejs)
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("assets"))

app.get("/", (req, rep) => {
    rep.render("index.ejs")
})

app.post("/forfait", (req, rep) => {
    console.log(req.body)
    con.connect(function (err) {
        if (err) throw err
        con.query("SELECT * FROM PAYS;", function (err, result, field) {
            if (err) throw err
            rep.render("dataperso.ejs", {
                Pays: result
            })
        })
    })
})

app.post("/new", (req, rep) => {
    var client = {
        Nom: req.body.nom,
        Prenom: req.body.prenom,
        Mail: req.body.email,
        Tel: req.body.tel,
        Adresse: req.body.adresse,
        CP: req.body.cp,
        Ville: req.body.ville,
        Pays: req.body.pays
    }
    console.log(client)
    rep.redirect("/")
})

app.listen(8080)