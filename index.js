var express = require("express")
var ejs = require("ejs")
var bodyParser = require("body-parser")
var mysql = require("mysql")
var app = express()

var pool = mysql.createPool({
    connectionLimit: 10,
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
    pool.getConnection(function (err, connection) {
        if (err) throw err
        connection.query("SELECT * FROM PAYS ORDER BY NOM;", function (err, result, field) {
            if (err) throw err
            var pays = result
            connection.query("SELECT * FROM MODELE ORDER BY NOM;", function (err, result, field) {
                rep.render("dataperso.ejs", {
                    Pays: pays,
                    Modeles: result
                })
            })
        })
    })
})

app.post("/new", (req, rep) => {
    var client = {
        Modele: req.body.modele,
        Nom: req.body.nom,
        Prenom: req.body.prenom,
        Mail: req.body.email,
        Tel: req.body.tel,
        Adresse: req.body.adresse,
        CP: req.body.cp,
        Ville: req.body.ville,
        Pays: req.body.pays
    }
    pool.getConnection(function (err, connection) {
        if (err) throw err
        // INSERT INTO
    })
    console.log(client)
    rep.redirect("/")
})

app.listen(8080)