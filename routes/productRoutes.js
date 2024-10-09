const express = require('express');
const Product = require('../models/productModel');

const router = express.Router();

// Obtener todos los productos
router.get('/', (req, res) => {
    Product.getAll((err, result) => {
        if (err) return res.status(500).json({ error: 'Error al obtener los productos' });
        res.json(result);
    });
});

// Obtener producto por Id
router.get('/:id', (req, res) => {
    const id = req.params.id;
    Product.getById(id, (err, result) => {
        if (err){
             return res.status(500).json({ error: 'Error al obtener el producto' });
             }
        if (!result || result.length === 0){
             return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.json(result[0]);
    });
});

// Crear nuevo producto (POST)
router.post('/', (req, res) => {
    const { name, price, description } = req.body;

    if (!name || !price || !description ) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const newProduct = { name, price, description };
    
    Product.create(newProduct, (err, result) => {
        if (err) return res.status(500).json({ error: 'Error al crear el producto' });
        res.status(201).json({ message: 'Producto creado correctamente', product: result });
    });
});

// Actualizar producto (PUT)
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const { name, description, price } = req.body;

    if (!name || !price || !description ) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const updatedProduct = { name, price, description };

    Product.update(id, updatedProduct, (err, result) => {
        if (err) return res.status(500).json({ error: 'Error al actualizar el producto' });
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Producto no encontrado' });
        res.json({ message: 'Producto actualizado correctamente' });
    });
});

// Eliminar producto (DELETE)
router.delete('/:id', (req, res) => {
    const id = req.params.id;

    Product.delete(id, (err, result) => {
        if (err) return res.status(500).json({ error: 'Error al eliminar el producto' });
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Producto no encontrado' });
        res.json({ message: 'Producto eliminado correctamente' });
    });
});

module.exports = router;