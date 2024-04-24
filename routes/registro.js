// routes/registro.js
const express = require('express');
const router = express.Router();

// Ruta para mostrar el formulario de registro
router.get('/', (req, res) => {
    const user = req.user != null ? `Bienvenido ${req.user.nombre}` : ''; // Verificar si el usuario ha iniciado sesión
    res.render('registro', { title: 'Registro', user });
});

module.exports = router;