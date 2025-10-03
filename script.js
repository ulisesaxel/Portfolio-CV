/* ********** Menu ********** */

((d) => {
  const $btnMenu =
      d.querySelector(
        ".menu-btn"
      ) /** Levanta todo el codigo HTML que hay entre los elementos de la clase indicada */,
    $menu = d.querySelector(".menu");

  /** Escucha el clic en el codigo de la variable */
  $btnMenu.addEventListener("click", (e) => {
    $btnMenu.firstElementChild.classList.toggle(
      "none"
    ); /** Agrega o quita la clase en el primer elemento hijo */
    $btnMenu.lastElementChild.classList.toggle("none");
    $menu.classList.toggle(
      "is-active"
    ); /** Agrega o quita la clase dentro del elemento de la variable */
  });

  /** Escucha cualquier clic */
  d.addEventListener("click", (e) => {
    /** Si el clic fue en un enlace fuera del menu */
    if (!e.target.matches(".menu a")) {
      return false;
    }
    /** Clic a cualquier enlace del menu */
    $btnMenu.firstElementChild.classList.remove("none");
    $btnMenu.lastElementChild.classList.add("none");
    $menu.classList.remove("is-active");
  });
})(document);

/* ********** Contact Form ********** */
((d) => {
  const $form = d.querySelector(".contact-form"),
    $loader = d.querySelector(".contact-form-loader"),
    $response = d.querySelector(".contact-form-response");

  $form.addEventListener("submit", (e) => {
    e.preventDefault();
    $loader.classList.remove("none");
    fetch("https://formsubmit.co/ajax/ulisesaxel@gmail.com", {
      method: "POST",
      body: new FormData(e.target),
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((json) => {
        console.log(json);
        location.hash = "#gracias";
        $form.reset();
      })
      .catch((err) => {
        console.log(err);
        let message =
          err.statusText || "Ocurrió un error al enviar, intenta nuevamente";
        $response.querySelector(
          "h3"
        ).innerHTML = `Error ${err.status}: ${message}`;
      })
      .finally(() => {
        $loader.classList.add("none");
        setTimeout(() => {
          location.hash = "#cerrar";
        }, 3000);
      });
  });
})(document);
