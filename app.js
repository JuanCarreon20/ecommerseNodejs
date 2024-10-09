const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const productRoutes = require('./routes/productRoutes');
const cors = require('cors');

//configuracion de dotenv
dotenv.config();


const app = express();
app.use(express.json()); // para procesar JSON
app.use(cors());

app.use(express.static(path.join(__dirname, 'shop')));

//rutas de producto
app.use('/api/product', productRoutes);

app.get('/',(req, res) => {res.sendFile(__dirname,'shop', 'index.html')});

// Ruta para servir el index.html
app.get('/', (req, res ) => {
    res.sendFile(path.join(__dirname, 'shop', 'index.html'));
})

const PORT = process.env.PORT|| 3000;
app.listen(PORT, () => {
    console.log('servidor corriendo en el puerto ${PORT}');
});