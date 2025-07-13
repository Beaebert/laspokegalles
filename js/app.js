document.addEventListener('DOMContentLoaded', () => {
  const galeria = document.querySelector('.galeria-galletas');
  const listaCarrito = document.querySelector('#lista-carrito');
  const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
  let carrito = [];

  galeria.addEventListener('click', agregarProducto);
  listaCarrito.addEventListener('click', eliminarProducto);
  vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

  function agregarProducto(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
      const producto = e.target.parentElement;
      leerDatosProducto(producto);
    }
  }

  function eliminarProducto(e) {
    e.preventDefault();
    if (e.target.classList.contains('borrar-producto')) {
      const productoId = e.target.getAttribute('data-id');
      carrito = carrito.filter(producto => producto.id !== productoId);
      carritoHTML();
    }
  }

  function vaciarCarrito() {
    carrito = [];
    limpiarHTML();
  }

  function leerDatosProducto(producto) {
    const infoProducto = {
      imagen: producto.querySelector('img').src,
      titulo: producto.querySelector('p').textContent,
      id: producto.querySelector('button').getAttribute('data-id'),
      cantidad: 1
    };

    const existe = carrito.some(producto => producto.id === infoProducto.id);
    if (existe) {
      const productos = carrito.map(producto => {
        if (producto.id === infoProducto.id) {
          producto.cantidad++;
          return producto;
        } else {
          return producto;
        }
      });
      carrito = [...productos];
    } else {
      carrito = [...carrito, infoProducto];
    }
    carritoHTML();
  }

  function carritoHTML() {
    limpiarHTML();
    carrito.forEach(producto => {
      const row = document.createElement('li');
      row.innerHTML = `
        <img src="${producto.imagen}" width="50">
        <p>${producto.titulo}</p>
        <p>${producto.cantidad}</p>
        <a href="#" class="borrar-producto" data-id="${producto.id}"> X </a>
      `;
      listaCarrito.appendChild(row);
    });
  }

  function limpiarHTML() {
    while (listaCarrito.firstChild) {
      listaCarrito.removeChild(listaCarrito.firstChild);
    }
  }
});
