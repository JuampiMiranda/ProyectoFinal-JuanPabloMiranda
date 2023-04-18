//TARJETAS DE PRODUCTOS

const hayStock = [
  {
    id: 1,
    nombre: "Magneto",
    cantidad: 4,
    precio: 50000,
    img: "img/magneto.jpg",
  },
  {
    id: 2,
    nombre: "Lipolaser",
    cantidad: 2,
    precio: 75000,
    img: "img/lipolaser.jpg",
  },
  {
    id: 3,
    nombre: "Ultrasonido",
    cantidad: 2,
    precio: 90000,
    img: "img/ultrasonido.jpg",
  },
  {
    id: 4,
    nombre: "HIFU",
    cantidad: 8,
    precio: 78000,
    img: "img/HIFU.jpeg",
  },
  {
    id: 5,
    nombre: "Calentadora-Toalla",
    cantidad: 4,
    precio: 40000,
    img: "img/calentadoraToalla.jpeg",
  },
  {
    id: 6,
    nombre: "Magneto completo",
    cantidad: 6,
    precio: 350000,
    img: "img/magneto.jpeg",
  },
  {
    id: 7,
    nombre: "Hidroterapia",
    cantidad: 3,
    precio: 360000,
    img: "img/hidroterapia.jpg",
  },
  {
    id: 8,
    nombre: "Fotodepiladora",
    cantidad: 7,
    precio: 1200,
    img: "img/fotodepiladora.jpeg",
  },
  {
    id: 9,
    nombre: "Roll-On",
    cantidad: 5,
    precio: 18000,
    img: "img/Roll-On.jpeg",
  },
  {
    id: 10,
    nombre: "Electroestimulador",
    cantidad: 8,
    precio: 25000,
    img: "img/electroestimulador.jpg",
  },
];
let carrito = [];

const contenedor = document.querySelector("#contenedor");
const carritoContenedor = document.querySelector("#carritoContenedor");
const vaciarCarrito = document.querySelector("#vaciarCarrito");
const precioTotal = document.querySelector("#precioTotal");
const activarFuncion = document.querySelector("#activarFuncion");
const procesarCompra = document.querySelector("#procesarCompra");
const totalProceso = document.querySelector("#totalProceso");
const formulario = document.querySelector('#procesar-pago')

if (activarFuncion) {
  activarFuncion.addEventListener("click", procesarPedido);
}

document.addEventListener("DOMContentLoaded", () => {
  carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  mostrarCarrito();
  document.querySelector("#activarFuncion").click(procesarPedido);
});
if (formulario) {
  formulario.addEventListener('submit', enviarCompra)
}


if (vaciarCarrito) {
  vaciarCarrito.addEventListener("click", () => {
    carrito.length = [];
    mostrarCarrito();
  });
}

if (procesarCompra) {
  procesarCompra.addEventListener("click", () => {
    if (carrito.length === 0) {
      Swal.fire({
        title: "Su carrito esta vacio",
        text: "Comprar para continuar",
        icon: "Error",
        confirmButtonText: "Aceptar",
      });
    } else {
      location.href = "compra.html";
    }
  });
}

hayStock.forEach((prod) => {
  const { id, nombre, precio, img, cantidad } = prod;
  if (contenedor) {
    contenedor.innerHTML += `
    <div class="card mt-3 m-3 justify-content-center shadow" style="width: 18rem;">
    <img class="card-img-top p-2 mt-2" src="${img}" alt="Card image cap">
    <div class="card-body p-3">
      <h5 class="card-title">${nombre}</h5>
      <p class="card-text">Precio: ${precio}</p>
      <p class="card-text">Cantidad: ${cantidad}</p>
      <button class="btn btn-primary" onclick="agregarProducto(${id})">Comprar Producto</button>
    </div>
  </div>
    `;
  }
});

const agregarProducto = (id) => {
  const existe = carrito.some(prod => prod.id === id)

  if (existe) {
    const prod = carrito.map(prod => {
      if (prod.id === id) {
        prod.cantidad++
      }
    })
  } else {
    const item = hayStock.find((prod) => prod.id === id)
    carrito.push(item)
  }
  mostrarCarrito()
};

//CARRITO CONTENEDOR

const mostrarCarrito = () => {
  const modalBody = document.querySelector(".modal .modal-body");
  if (modalBody) {
    modalBody.innerHTML = "";
    carrito.forEach((prod) => {
      const { id, nombre, precio, desc, img, cantidad } = prod;
      console.log(modalBody);
      modalBody.innerHTML += `
      <div class="modal-contenedor">
        <div>
        <img class="img-fluid img-carrito" src="${img}"/>
        </div>
        <div>
        <p>Producto: ${nombre}</p>
      <p>Precio: ${precio}</p>
      <p>Cantidad :${cantidad}</p>
      <button class="btn btn-primary" onclick="eliminarProducto(${id})">Eliminar producto</button>
        </div>
      </div>`;
    });
  }

  if (carrito.length === 0) {
    console.log("Nada");
    modalBody.innerHTML = `
    <p class="text-center text-primary parrafo">¡Aun no agregaste nada!</p>
    `;
  } else {
    console.log("Algo");
  }
  carritoContenedor.textContent = carrito.length;

  if (precioTotal) {
    precioTotal.innerText = carrito.reduce(
      (acc, prod) => acc + prod.cantidad * prod.precio,
      0
    );
  }

  guardarStorage();
};

function guardarStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function eliminarProducto(id) {
  const juegoId = id;
  carrito = carrito.filter((juego) => juego.id !== juegoId);
  mostrarCarrito();
}
function procesarPedido() {
  carrito.forEach((prod) => {
    const listaCompra = document.querySelector("#lista-compra tbody");
    const { id, nombre, precio, img, cantidad } = prod;
    if (listaCompra) {
      const row = document.createElement("tr");
      row.innerHTML += `
              <td>
              <img class="img-fluid img-carrito" src="${img}"/>
              </td>
              <td>${nombre}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>${precio * cantidad}</td>
            `;
      listaCompra.appendChild(row);
    }
  });
  totalProceso.innerText = carrito.reduce(
    (acc, prod) => acc + prod.cantidad * prod.precio,
    0
  );
}

//FORMULARIO CLIENTE

function enviarCompra(e) {
  e.preventDefault()
  const cliente = document.querySelector('#cliente').value
  const email = document.querySelector('#correo').value

  if (email === '' || cliente == '') {
    Swal.fire({
      title: "¡Debes completar tu email y nombre!",
      text: "Rellena el formulario",
      icon: "error",
      confirmButtonText: "Aceptar",
    })
  } else {

    const btn = document.getElementById('button');

    btn.value = 'Enviando...';

    const serviceID = 'default_service';
    const templateID = 'template_qxwi0jn';

    emailjs.sendForm(serviceID, templateID, this)
      .then(() => {
        btn.value = 'Finalizar compra';
        alert('Correo enviado!');
      }, (err) => {
        btn.value = 'Finalizar compra';
      });
  }
  localStorage.clear()

}
 jaksndalsd