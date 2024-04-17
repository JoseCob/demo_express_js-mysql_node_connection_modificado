//Codigo original
/*
// controllers/productos.js
const productoModel = require('../models/productoModel');


function getProductos() {
  const productos = productoModel.obtenerTodos();
  return productos;
}

function getProductoPorId(id) {
  const producto = productoModel.obtenerPorId(id);
  return producto;
}

module.exports = {
  getProductos,
  getProductoPorId
};
*/

const productoModel = require('../models/productoModel');

async function obtenerTodos(){
  const productos = await productoModel.obtenerTodos();
  return productos;
}

async function obtenerPorId(id){
  const producto = await productoModel.obtenerPorId(id);
  return producto;
}

module.exports = {
  obtenerTodos,
  obtenerPorId
};