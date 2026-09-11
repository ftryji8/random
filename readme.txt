DOCUMENTACIÓN DEL PROYECTO: BELLA PIZZA

Sitio web de una pizzería con 4 páginas: inicio, una página de contenido
adicional, un formulario de pedido y una página de confirmación.

ESTRUCTURA DE ARCHIVOS
-----------------------
- index.shtml        -> Página de inicio: presentación del restaurante y
                         galería de pizzas destacadas.
- about.shtml         -> Página de contenido adicional: historia del
                         restaurante, ingredientes y equipo.
- contact.shtml       -> Formulario de pedido (ver detalle más abajo).
- result.shtml        -> Página de confirmación. Muestra el resumen del
                         pedido a partir de los datos recibidos en la URL.
- css/main.css        -> Hoja de estilos única para todo el sitio.
- js/main.js          -> Script único para todo el sitio. Se encarga de:
                          1) el menú de navegación en móvil,
                          2) el efecto de sombra de la cabecera al hacer
                             scroll,
                          3) pintar el resultado del pedido en
                             result.shtml a partir de los parámetros de
                             la URL.
- inc/header.html     -> Fragmento común con el logotipo y la navegación
                         principal.
- inc/footer.html     -> Fragmento común del pie de página.

CÓMO SE REUTILIZAN LA CABECERA Y EL PIE (TROCEADO)
----------------------------------------------------
La cabecera y el pie están "troceados" en dos archivos aparte
(inc/header.html e inc/footer.html) y se insertan en cada página
mediante Server Side Includes (SSI), con estas líneas:
    <!--#include virtual="inc/header.html" -->
    <!--#include virtual="inc/footer.html" -->
Es el propio servidor (Apache, módulo mod_include) quien sustituye esas
líneas por el contenido real antes de enviar la página al navegador.
Así, la cabecera, el pie y la navegación están escritos una sola vez y
se reutilizan en todas las páginas del sitio.

IMPORTANTE: para que el servidor procese el "include", Apache necesita
tener activado mod_include y reconocer la extensión .shtml. En XAMPP,
esto se configura en xampp/apache/conf/httpd.conf:
  1) Descomentar la línea: LoadModule include_module modules/mod_include.so
  2) Añadir (si no está): AddType text/html .shtml
                           AddOutputFilter INCLUDES .shtml
  3) En el bloque <Directory> de htdocs, añadir la opción "Includes"
     (por ejemplo: Options Indexes FollowSymLinks Includes)
  4) Reiniciar Apache desde el panel de control de XAMPP.
Sin estos cambios, el navegador mostraría las líneas <!--#include...-->
literalmente en vez de la cabecera y el pie.

EL FORMULARIO DE PEDIDO (contact.shtml)
------------------------------------------
Incluye distintos tipos de campo: texto, email, teléfono, número, fecha,
selector desplegable (select), radiobutton y checkbox.
- Campos obligatorios y/o con validación de formato (atributo "pattern"
  o "required"): nombre, email, tipo de pizza, cantidad, método de
  contacto, fecha de entrega, dirección, ciudad y código postal.
- El formulario se envía con method="GET" hacia result.shtml, por lo
  que todos los datos viajan como parámetros en la URL.
- En result.shtml, la función displaySubmissionResult() de js/main.js
  lee esos parámetros y pinta en pantalla un resumen del pedido.

NOTAS PARA QUIEN REVISE EL CÓDIGO
------------------------------------
- Cada archivo HTML, CSS y JS incluye comentarios en español señalando
  qué hace cada sección y, en el caso de las partes troceadas
  (inc/header.html e inc/footer.html), dónde se usan y cómo se cargan.
- El sitio debe visitarse a través de un servidor local con SSI
  activado (ver apartado anterior), por ejemplo:
  http://localhost/nombre-del-proyecto/index.shtml
