/*
  Este archivo JavaScript se encarga de:
  - Activar el menú de navegación en móviles
  - Activar el efecto de sombra en la cabecera al hacer scroll
  - Mostrar en pantalla los datos enviados desde el formulario de contacto

  NOTA SOBRE LA CABECERA Y EL PIE DE PÁGINA:
  En esta versión del sitio, inc/header.html e inc/footer.html se
  insertan en cada página .shtml mediante Server Side Includes (SSI):
    <!--#include virtual="inc/header.html" -->
    <!--#include virtual="inc/footer.html" -->
  Es el propio servidor Apache quien sustituye esas líneas por el
  contenido de los archivos antes de enviar la página al navegador.
  Por eso este script ya NO necesita cargar esos fragmentos con fetch:
  cuando se ejecuta este código, la cabecera y el pie ya están en el
  HTML de la página.
*/

// Activa el botón de menú (hamburguesa) en la vista móvil.
// Busca el botón ".menu-toggle" y el contenedor ".main-nav" que vienen
// dentro de inc/header.html.
function setupMobileMenu() {
  const button = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');

  if (!button || !nav) {
    return;
  }

  button.addEventListener('click', () => {
    const expanded = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('active');
  });
}

// Añade la clase .scrolled a la cabecera al bajar en la página,
// para reforzar la sombra (ver .site-header.scrolled en css/main.css).
function setupHeaderScrollEffect() {
  const header = document.querySelector('.site-header');
  if (!header) {
    return;
  }

  const updateHeaderState = () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  };

  window.addEventListener('scroll', updateHeaderState, { passive: true });
  updateHeaderState();
}

// Lee los parámetros de la URL tras enviar el formulario de contacto
// y los pinta dentro del contenedor "#submission-result".
// Esta función se usa en la página de confirmación/resultado.
function displaySubmissionResult() {
  const resultContainer = document.querySelector('#submission-result');
  if (!resultContainer) {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  if (!params.toString()) {
    resultContainer.innerHTML = '<p>No hay datos para mostrar. Por favor, rellena el formulario en la página de contacto.</p>';
    return;
  }

  // Diccionario campo -> etiqueta en español, para mostrar los datos
  // enviados desde el formulario de contacto de forma legible.
  // Diccionario campo -> etiqueta en español, para mostrar los datos
  // enviados desde el formulario de contacto (ver contact.html) de forma
  // legible. Las claves deben coincidir con los atributos "name" del form.
  const pizzaNames = {
    margherita: 'Margherita',
    quattro: 'Quattro Formaggi',
    carnivora: 'Carnívora',
    vegetariana: 'Vegetariana',
    hawaiana: 'Hawaiana',
    bbq: 'BBQ'
  };

  const contactMethodNames = {
    email: 'Email',
    telefono: 'Teléfono',
    whatsapp: 'WhatsApp'
  };

  const submission = {
    'Nombre': params.get('name') || 'No indicado',
    'Email': params.get('email') || 'No indicado',
    'Teléfono': params.get('phone') || 'No indicado',
    'Pizza elegida': pizzaNames[params.get('pizzaType')] || 'No indicado',
    'Cantidad': params.get('quantity') || 'No indicado',
    'Método de contacto preferido': contactMethodNames[params.get('contactMethod')] || 'No indicado',
    'Fecha de entrega': params.get('deliveryDate') || 'No indicado',
    'Franja horaria': params.get('timeSlot') || 'No indicado',
    'Dirección': params.get('address') || 'No indicado',
    'Ciudad': params.get('city') || 'No indicado',
    'Código postal': params.get('postalCode') || 'No indicado',
    'Recibir ofertas': params.get('newsletter') === 'yes' ? 'Sí' : 'No',
    'Envolver como regalo': params.get('giftWrap') === 'yes' ? 'Sí' : 'No',
    'Entrega urgente': params.get('urgentDelivery') === 'yes' ? 'Sí' : 'No',
    'Notas especiales': params.get('message') || 'Ninguna'
  };

  const lines = Object.entries(submission)
    .map(
      ([label, value]) => `
        <div class="result-item">
          <dt>${label}</dt>
          <dd>${value}</dd>
        </div>`
    )
    .join('');

  resultContainer.innerHTML = `
    <div class="result-card">
      <h2>Confirmación de la solicitud</h2>
      <dl>${lines}</dl>
      <p><a href="contact.shtml">Volver al formulario</a></p>
    </div>
  `;
}

// Punto de entrada: en cuanto el DOM está listo, se activa el menú móvil,
// el efecto de scroll de la cabecera, y se pinta el resultado del
// formulario si la página tiene el contenedor #submission-result.
document.addEventListener('DOMContentLoaded', () => {
  setupMobileMenu();
  setupHeaderScrollEffect();
  displaySubmissionResult();
});
