import express from "express";
import dotenv from "dotenv";
import sequelize from "./src/config/database.js";
import apidatos from "./src/models/character.models.js";

dotenv.config();

const app = express();

app.use(express.json());

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