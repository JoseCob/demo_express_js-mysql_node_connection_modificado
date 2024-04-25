//routes/agregar-al-carrito.js
const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productosController');

// Ruta para agregar un producto al carrito
router.post('/:id', async (req, res) => {
    const idProducto = req.params.id;
    try {
        const producto = await productosController.obtenerPorId(idProducto);

        if (producto && producto.cantidad > 0) {
            let carrito = req.session.carrito || [];
            let productoEnCarrito = carrito.find(item => item.id === idProducto);

            if (productoEnCarrito) {
                if (productoEnCarrito.cantidad < producto.cantidad) {
                    productoEnCarrito.cantidad++;
                    producto.cantidad--; // Disminuir la cantidad disponible del producto
                } else {
                    // La cantidad en el carrito ya alcanzó el límite
                    res.status(400).send('Se alcanzo el valor máximo de este producto');
                    return;
                }
            } else {
                if (producto.cantidad > 0) {
                    carrito.push({
                        id: idProducto,
                        nombre: producto.nombre,
                        precio: producto.precio,
                        cantidad: 1
                    });
                    producto.cantidad--; // Disminuir la cantidad disponible del producto
                } else {
                    // El producto no está disponible
                    res.status(404).send('Producto no disponible');
                    return;
                }
            }

            // Actualizar el carrito en la sesión
            req.session.carrito = carrito;

            // Redirigir de vuelta al catálogo
            res.redirect('/catalogo');
        } else {
            // Producto no encontrado o no disponible
            res.status(404).send('Producto no encontrado o no disponible');
        }
    } catch (error) {
        console.error('Error al agregar producto al carrito:', error);
        res.status(500).send('Error al agregar producto al carrito');
    }
});

module.exports = router;