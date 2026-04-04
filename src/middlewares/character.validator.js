import { body, param } from 'express-validator';
import apidatos from '../models/character.models.js';

export const createCharacterValidation = [
    body("name")
        .notEmpty().withMessage("El campo name es obligatorio.")
        .isString().withMessage("El nombre debe ser un texto.")
        .isLength({ min: 3 }).withMessage("El nombre debe tener al menos 3 caracteres."),
    body("is_ghoul")
        .notEmpty().withMessage("Debes especificar si es Ghoul o no.")
        .isBoolean().withMessage("is_ghoul debe ser un valor booleano (true/false)."),
    body("gender")
        .optional()
        .isIn(['Male', 'Female', 'Other']).withMessage("El género debe ser Male, Female u Other."),
    body("age")
        .optional()
        .isInt({ min: 0 }).withMessage("La edad debe ser un número entero positivo."),
    body("kagune")
        .optional()
        .isString().withMessage("El kagune debe ser un texto."),
    body("quinque")
        .optional()
        .isString().withMessage("El quinque debe ser un texto."),
    body("image")
        .optional()
        .isURL().withMessage("La imagen debe ser una URL válida.")
];

export const getCharacterValidation = [
    param("id")
    .exists()
    .isInt({ min: 1 })
    .withMessage("El ID debe ser un número mayor o igual a 1")
    .custom(async (req, res) => {
        const { id } = req.params;
        const character = apidatos.findByPk(id);
        if(!character){
            throw new Error("El personaje no existe en la base de datos.")
        }
    }),
    body("name")
        .notEmpty().withMessage("El campo name es obligatorio.")
        .isString().withMessage("El nombre debe ser un texto.")
        .isLength({ min: 3 }).withMessage("El nombre debe tener al menos 3 caracteres."),
    body("is_ghoul")
        .notEmpty().withMessage("Debes especificar si es Ghoul o no.")
        .isBoolean().withMessage("is_ghoul debe ser un valor booleano (true/false)."),
    body("gender")
        .optional()
        .isIn(['Male', 'Female', 'Other']).withMessage("El género debe ser Male, Female u Other."),
    body("age")
        .optional()
        .isInt({ min: 0 }).withMessage("La edad debe ser un número entero positivo."),
    body("kagune")
        .optional()
        .isString().withMessage("El kagune debe ser un texto."),
    body("quinque")
        .optional()
        .isString().withMessage("El quinque debe ser un texto."),
    body("image")
        .optional()
        .isURL().withMessage("La imagen debe ser una URL válida.")
];

export const updateCharacterValidation = [
    param("id")
    .exists()
    .isInt({ min: 1 })
    .withMessage("El ID debe ser un número mayor o igual a 1")
    .custom(async (req, res) => {
        const { id } = req.params;
        const character = apidatos.findByPk(id);
        if(!character){
            throw new Error("El personaje no existe en la base de datos.")
        }
    })
];


export const deleteCharacterValidation = [
    param("id")
    .exists()
    .isInt({ min: 1 })
    .withMessage("El ID debe ser un número mayor o igual a 1")
    .custom(async (req, res) => {
        const { id } = req.params;
        const character = apidatos.findByPk(id);
        if(!character){
            throw new Error("El personaje no existe en la base de datos.")
        }
    })
];