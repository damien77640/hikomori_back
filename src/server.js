const express = require("express")
const app = express()
const knex = require("knex")
const cors = require("cors")
app.use(cors())
const router = express.Router();


const database = knex({
    client:'pg',
    connection : {
        host: '127.0.0.1',
        user: 'postgres',
        password:'cabella13',
        database:'manga'
    },
    });
  

const port = process.env.PORT || 3000

app.use(router)

router.get("/", (req, res) => {
    res.send("TESTTTTTTTTT");
})


// Récuperer l'ensemble des mangas (écran principal)
router.get("/manga", (req, res) => {

    let tab = [];

    database.from('manga').select("id","id_manga","tittles_en","tittles_jap","posterImageLarge","posterImageOriginal","posterImageSmall").then((rows)=>{

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




app.listen(port, () => {
    console.log("Server is listening on port", port)
})
