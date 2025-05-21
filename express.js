const express = require ('express');
require ('dotenv').config();
const biblioteca = require ('./routes/biblioteca/biblioteca');


const app = express();
const PORT = process.env.PORT || 3000;



console.log("Iniciando Express...");
app.use ('/biblioteca', biblioteca);
// app.get('/', (req, res) => {
//     try{
//     res.send('Running');
//     }catch(err) {
//         console.error("Erro ao iniciar", err.message );
//     }
// });



    app.listen(PORT, () => { 
        console.log(`Running on port ${PORT}`);
    }
);
