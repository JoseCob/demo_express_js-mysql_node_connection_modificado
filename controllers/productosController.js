  //controllers/ProductosController.js
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