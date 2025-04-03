const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema({
    nombre: String,
    apellido: String,
    genero: String,
    altura: Number,
    peso: Number,
    edad: Number,
    imc: Number, // Nuevo campo para guardar el IMC
    categoriaIMC: String, // Guardar la categoría de IMC
    recomendacionIMC: String, // Guardar la recomendación de IMC
    dieta:[]
}, { collection: "Usuario" }); // Forzamos el nombre de la colección

const Usuario = mongoose.model("Usuario", usuarioSchema); // El primer parámetro no afecta la colección en la BD

module.exports = Usuario;
