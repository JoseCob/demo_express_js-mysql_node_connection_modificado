//routes/login.js
const express = require('express');
const router = express.Router();
const passport = require('passport');
const authMiddleware = require('../middlewares/authMiddleware'); // Middleware para proteger rutas

// Ruta para mostrar el formulario de login
router.get('/', (req, res) => {
  const user = req.user != null ? `Bienvenido ${req.user.nombre}` : ''; // Verificar si el usuario ha iniciado sesión
  res.render('login', { title: 'Iniciar sesión', user });
});


router.post('/', passport.authenticate('local', {
  failureRedirect: '/login',
  failureFlash: true
}), (req, res) => {
  // Si se autentica correctamente, crea un token JWT
  const token = authMiddleware.generateToken(req.user.id);

  res.cookie('token', token, { httpOnly: true, secure: false });

  res.redirect('/carrito');
});

module.exports = router;