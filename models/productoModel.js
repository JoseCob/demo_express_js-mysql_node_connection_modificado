//Codigo original
/*
const productos = [
  { id: 1, nombre: 'Producto 1', descripcion: '1', cantidad: 10, precio: 100, imagen: 'producto1.jpg' },
  { id: 2, nombre: 'Producto 2', descripcion: '2', cantidad: 15, precio: 150, imagen: 'producto2.jpg' },
  { id: 3, nombre: 'Producto 3', descripcion: '3', cantidad: 5, precio: 50, imagen: 'producto3.jpg' },
  { id: 4, nombre: 'Producto 4', descripcion: '4', cantidad: 10, precio: 100, imagen: 'producto4.jpg' },
  { id: 5, nombre: 'Producto 5', descripcion: '5', cantidad: 15, precio: 150, imagen: 'producto5.jpg' },
  { id: 6, nombre: 'Producto 6', descripcion: '6', cantidad: 5, precio: 50, imagen: 'producto6.jpg' },
  { id: 7, nombre: 'Producto 7', descripcion: '7', cantidad: 5, precio: 50, imagen: 'producto7.jpg' }
];

function obtenerTodos() {
  return productos;
}

function obtenerPorId(id) {
  return productos.find(producto => producto.id === parseInt(id));
}

module.exports = {
  obtenerTodos,
  obtenerPorId
};
*/

//models/productoModel.js
const productoDB = require('../db');

class Producto{
  constructor(id, nombre, descripcion, cantidad, precio, imagen) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.cantidad = cantidad;
    this.precio = precio;
    this.imagen = imagen;
  }
}

async function obtenerTodos(){
  try{
    const productos = await productoDB.obtenerTodos();
    return productos.map(producto => new Producto(producto.id, producto.nombre, producto.descripcion, 
      producto.cantidad, producto.precio, producto.imagen))
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    throw error;
  }
}

async function obtenerPorId(id){
  try {
    const producto = await productoDB.obtenerPorId(id);
    if (producto) {
      return new Producto(producto.id, producto.nombre, producto.descripcion, 
        producto.cantidad, producto.precio, producto.imagen)
    }
  } catch (error) {
    console.error('Error al obtener el producto por ID:', error);
    throw error;
  }
}

module.exports = {
  obtenerTodos,
  obtenerPorId
};