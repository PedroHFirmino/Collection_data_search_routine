const { getlivrosBiblioteca } = require ('../../controllers/biblioteca/biblioteca');

const express = require ('express');
const router = express.Router();

router.get("/:id", async (req, res) => {
    const {id} = req.params;
    try{
        const livrosbiblioteca = await getlivrosBiblioteca(id);
        return res.status(200).json(livrosbiblioteca);
    }
    catch(err){
        console.log(err);
        return res.status(400).json(err);
    }
}
)

router.get("/", async (req, res) => {
    const {} = req.params;
    try{
        const livrosbiblioteca = await getlivrosBiblioteca();
        return res.status(200).json (livrosbiblioteca);

    }
    catch(err){
        console.log(err);
        return res.status(400).json(err);
    }
}
)

module.exports = router;