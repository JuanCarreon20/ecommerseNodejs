function products() {
    const productId = document.getElementById('product-id').value;

    if (!productId) {
        alert('Por favor, ingresa un Id del producto');
        return;
    }

    fetch(`http://localhost:3000/api/product/${productId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Producto no encontrado');
            }
            // Convertir la respuesta en JSON
            return response.json();
        })
        .then(data => {
            // Actualizar los elementos del DOM con los datos del producto
            document.getElementById('product-name').textContent = `${data.name}`;
            document.getElementById('product-description').textContent = `${data.description}`;
            document.getElementById('product-price').textContent = `${data.price}`;

                       
        })
        .catch(error => {
            console.error('Error:', error);
            alert(error.message);
        });
}
