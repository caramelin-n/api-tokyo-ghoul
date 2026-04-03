import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const apidatos = sequelize.define("Character", {
    name: { type: DataTypes.STRING, allownull: false, unique: true },
    is_ghoul: { type: DataTypes.BOOLEAN, allownull: false },
    gender: { type: DataTypes.STRING, allownull: false },
    age: { type: DataTypes.INTEGER, allownull: false },
    kagune: { type: DataTypes.STRING },
    quinque: { type: DataTypes.STRING },
    image: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING },
});

export default apidatos;