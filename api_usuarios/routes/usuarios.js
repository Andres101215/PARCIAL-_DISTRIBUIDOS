const express = require("express");
const Usuario = require("../models/Usuario");
const { calcularIMC, getIMCRecommendation } = require("../../services/imcService"); // Importar el servicio de IMC

const router = express.Router();



router.get("/", async (req, res) => {
    try {
        const users = await Usuario.find();

        res.json(users);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener los usuarios", error });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const usuario = await Usuario.findOne({ id: req.params.id });
        if (!usuario) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener el usuario", error });
    }
});


router.post("/", async (req, res) => {
    try {
        // Extraer datos del request
        const { nombre, apellido, genero, altura, peso, edad } = req.body;

        // Calcular el IMC usando el servicio
        const imc = calcularIMC(peso, altura);
        const { categoria, recomendacion } = getIMCRecommendation(imc);

        // Crear nuevo usuario con el IMC agregado
        const nuevoUsuario = new Usuario({
            nombre,
            apellido,
            genero,
            altura,
            peso,
            edad,
            imc, // Guardar IMC en la base de datos
            categoriaIMC: categoria, // Guardar la categoría
            recomendacionIMC: recomendacion // Guardar la recomendación
        });

        // Guardar en la base de datos
        await nuevoUsuario.save();
        res.status(201).json(nuevoUsuario);
    } catch (error) {
        console.error("❌ Error al crear usuario:", error);
        res.status(500).json({ mensaje: "Error al crear el usuario", error });
    }
});


router.put("/:id", async (req, res) => {
    try {
        const usuarioActualizado = await Usuario.findOneAndUpdate(
            { id: req.params.id }, 
            req.body, 
            { new: true }
        );
        if (!usuarioActualizado) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }
        res.json(usuarioActualizado);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar el usuario", error });
    }
});


router.delete("/:id", async (req, res) => {
    try {
        const usuarioEliminado = await Usuario.findOneAndDelete({ id: req.params.id });
        if (!usuarioEliminado) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }
        res.json({ mensaje: "Usuario eliminado" });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar el usuario", error });
    }
});

module.exports = router;
