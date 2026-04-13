import express from "express";
import dotenv from "dotenv";
import sequelize from "./src/config/database.js";
import apidatos from "./src/models/character.models.js";
import router from "./src/routes/router.js";
import cors from "cors";


dotenv.config();

const app = express();
app.use(cors());

app.use(express.json());
const PORT = process.env.PORT || 3000;

app.use('/api/characters', router);

sequelize.authenticate()
    .then(() => {
        console.log('Conexión a la base de datos exitosa');
        return sequelize.sync();
    })
    .then(() => {
        console.log('Tablas sincronizadas correctamente');
    })
    .catch(err => {
        console.error('No se pudo conectar a la base de datos o sincronizar tablas:', err);
    });

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});