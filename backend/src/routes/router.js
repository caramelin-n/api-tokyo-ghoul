import { Router } from "express";
import { createCharacter, getAllCharacters, getCharacterById, updateCharacter, deleteCharacter
 } from "../controllers/character.controllers.js";
import {
    findByIdCharacterValidation,
    deleteCharacterValidation, 
    updateCharacterValidation,
    createCharacterValidation} from "../middlewares/character.validator.js"
import { validator } from "../middlewares/validator/validator.js";

const router = Router();

router.get('/', getAllCharacters);
router.get('/:id', validator, findByIdCharacterValidation, getCharacterById);
router.post('/', validator, createCharacterValidation, createCharacter);
router.put('/:id', validator, updateCharacterValidation, updateCharacter);
router.delete('/:id', validator, deleteCharacterValidation, deleteCharacter);

export default router;