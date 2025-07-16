// --- LÓGICA PARA EL MENÚ  ---
document.addEventListener('DOMContentLoaded', function() {
  const dropdownArrow = document.querySelector('.dropdown-arrow');
  const dropdownMenu = document.querySelector('.dropdown-menu');

  // Asegurarse de que los elementos existen antes de añadir eventos
  if (dropdownArrow && dropdownMenu) {
    dropdownArrow.addEventListener('mouseenter', function() {
      dropdownMenu.classList.add('visible');
    });

    dropdownArrow.addEventListener('mouseleave', function() {
      dropdownMenu.classList.remove('visible');
    });
  }
});

// --- LÓGICA DEL CARRITO ---
document.addEventListener('DOMContentLoaded', () => {
  // Selectores
  const galeria = document.querySelector('.galeria-galletas');
  const listaCarrito = document.querySelector('#listaCarrito');
  const vaciarCarritoBtn = document.querySelector('#vaciarCarrito');

  // Variable del carrito.
  // Carga el carrito desde localStorage
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  // --- EVENT LISTENERS ---
  // Solo agregar event listener a la galería si existe en la página actual
  if (galeria) {
    galeria.addEventListener('click', agregarProducto);
  }

  // Solo agregar event listener al carrito si existe
  if (listaCarrito) {
    listaCarrito.addEventListener('click', eliminarProducto);
  }

  // Solo agregar event listener al botón de vaciar si existe
  if (vaciarCarritoBtn) {
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
  }

  // --- FUNCIONES ---
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
      carritoHTML(); // Actualiza la vista
    }
  }

  function vaciarCarrito() {
    carrito = [];
    limpiarHTML();
    guardarCarritoEnStorage(); // Actualiza el storage
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
      // Actualizamos la cantidad
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
      // Agregamos el elemento al carrito
      carrito = [...carrito, infoProducto];
    }
    carritoHTML();
  }

  function carritoHTML() {
    limpiarHTML();
    if (listaCarrito) {
      carrito.forEach(producto => {
        const row = document.createElement('tr'); // Usamos <tr> para una tabla
        row.innerHTML = `
                <td><img src="${producto.imagen}" width="80"></td>
                <td>${producto.titulo}</td>
                <td>${producto.cantidad}</td>
                <td><a href="#" class="borrar-producto" data-id="${producto.id}"> ❌ </a></td>
            `;
        listaCarrito.appendChild(row);
      });
    }
    //Guardar en LocalStorage cada vez que se actualiza el HTML
    guardarCarritoEnStorage();
  }

  function guardarCarritoEnStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }

  function limpiarHTML() {
    if (listaCarrito) {
      while (listaCarrito.firstChild) {
        listaCarrito.removeChild(listaCarrito.firstChild);
      }
    }
  }

  // Llama a carritoHTML al cargar la página para mostrar los productos del storage
  carritoHTML();
});
