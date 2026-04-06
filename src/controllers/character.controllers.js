import apidatos from "../models/character.models.js";

export const createCharacter = async (req, res) => {
    try {
        const { name, is_ghoul, gender, age, kagune, quinque, image, description } = req.body;
        if (!name || !is_ghoul === undefined || !gender || !age) {
            return res.status(400).json({ error: "Faltan datos obligatorios. Asegúrate de incluir nombre, si es ghoul, género y edad." });
        }
        if (!Number.isInteger(age)) {
            return res.status(400).json({ error: "La edad ingresada no es válida, debe ser un entero." });
        }
        if (gender !== "Male" && gender !== "Female") {
            return res.status(400).json({ error: "Sólo se permite género masculino o femenino."});
        }
        if (!(await isNameUnique(name))) {
            return res.status(400).json({ error: "El nombre ya existe en la base de datos." });
        }
        if (description !== undefined && typeof description !== 'string') {
            return res.status(400).json({ error: "La descripción debe ser una oración."});
        }

    const character = await apidatos.create({ name, is_ghoul, gender, age, kagune, quinque, image, description });
    res.status(201).json(character);
    } catch (err) {
        res.status(500).json({ error: "Error al crear el personaje." });
    }
};

const isNameUnique = async (name) => {
    const character = await apidatos.findOne({ where: { name: name }});
    return character === null;
};

export const getAllCharacters = async (req, res) => {
    try {
        const allCharacters = await apidatos.findAll();
        res.json(allCharacters);
    } catch (err) {
        res.status(500).json({ error: "Error al buscar el personaje." });
    }
};

export const getCharacterById = async (req, res) => {
    try {
        const character = await apidatos.findByPk(req.params.id);
        if (!character) {
            return res.status(404).json({ error: "Personaje no encontrado en este universo." });
        }
        res.json(character);
    } catch (err) {
        res.status(500).json({ error: "Error al buscar el personaje por ID." });
    }
};

export const updateCharacter = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, is_ghoul, gender, age, kagune, quinque, image, description } = req.body;
        const character = await apidatos.findByPk(id);
        if (!character) {
            return res.status(404).json({ error: "El personaje a actualizar no fue encontrado."});
        }
        if (age !== undefined && !Number.isInteger(age)) {
            return res.status(400).json({ error: "La edad ingresada no es válida, debe ser un entero." });
        }
        if (gender !== undefined && gender !== "Male" && gender !== "Female") {
            return res.status(400).json({ error: "Sólo se permite género masculino o femenino." });
        }
        if (description !== undefined && typeof description !== 'string') {
            return res.status(400).json({ error: "La descripción debe ser una oración." });
        }

        await apidatos.update(req.body, { where: { id } });
        res.json({ message: "Personaje actualizado con éxito." });
    } catch (err) {
        res.status(500).json({ error: "Error al actualizar el personaje." });
    }
};

export const deleteCharacter = async (req, res) => {
    try {
        const { id } = req.params;

        const character = await apidatos.findByPk(id);
        if (!character) {
            return res.status(404).json({ error: "El personaje a eliminar no fue encontrado." });
        }

        await character.destroy();
        res.status(200).json({ message: "Personaje eliminado con éxito." });
    } catch (err) {
        res.status(500).json({ error: "Error al eliminar el personaje" });
    }
}