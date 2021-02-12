const express = require("express")
const app = express()
const knex = require("knex")
const cors = require("cors")
const { default: axios } = require("axios")
const dotenv = require("dotenv").config({path:__dirname+'/../.env'})
app.use(cors())
const router = express.Router()



const database = knex({
    client:'pg',
    connection : {
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE
    },
    });
  

const port = process.env.PORT || 5000

app.use(router)

router.get("/", (req, res) => {
    res.send("TESTTTTTTTTT");
})


// Récuperer l'ensemble des mangas (écran principal)
router.get("/manga", (req, res) => {

    let tab = [];

    database.from('manga').select("id", "id_manga", "synopsis", "tittles_en", "tittles_jap", "posterImageLarge", "posterImageOriginal", "posterImageSmall").then((rows)=>{

        tab = rows
    }).catch((err) => {console.log(err);throw err}).finally(()=>{
        console.log(tab)
        res.json(tab)
    });
    
})

// Récuperer l'ensemble des informations d'un unique manga

router.get("/manga/:id", (req, res) => {

    const {id} = req.params

    database.from('manga').select("*").where('id',id).then((rows) => {

      tab = rows
    }).catch((err) => { console.log( err); throw err })
  .finally(() => {
   
      res.json(tab)
  });    
   
})

// Récuperer l'ensemble des informations des personne

router.post("/personnes/:mail/:password", (req, res) => {
    const {mail, password} = req.params
    database.from('personne').select("*").where({
        "mail": mail,
        "password": password
    }).then((rows) => {

      tab = rows
    }).catch((err) => { console.log( err); throw err })
  .finally(() => {
   
      res.json(tab)
  });
})


app.listen(port, () => {
    console.log("Server is listening on port", port)
})
