window.onload = function () {
  const burgerBtn = document.querySelector(".burger-menu");
  const burgerMenu = document.querySelector(".burger-content");
  const body = document.body;

  // Функция для открытия/закрытия меню
  function toggleMenu() {
    const isActive = burgerMenu.classList.toggle("active");
    burgerBtn.classList.toggle("burger-menu__active");
    body.style.overflow = isActive ? "hidden" : ""; // Блокируем/разблокируем скролл
  }

  // Функция для закрытия меню с плавным скрытием
  function closeMenu() {
    burgerMenu.classList.remove("active"); // Убираем класс, чтобы меню ушло вправо
    burgerBtn.classList.remove("burger-menu__active");
    body.style.overflow = ""; // Разрешаем скролл
  }

  // Открытие/закрытие меню при нажатии на кнопку
  burgerBtn.addEventListener("click", toggleMenu);

  // Закрытие меню при клике вне области меню
  document.addEventListener("click", function (event) {
    const isClickInsideMenu = burgerMenu.contains(event.target);
    const isClickOnButton = burgerBtn.contains(event.target);

    if (!isClickInsideMenu && !isClickOnButton) {
      closeMenu();
    }
  });

  // Обработка кликов по ссылкам в меню
  burgerMenu.addEventListener("click", function (event) {
    const target = event.target;

    if (target.tagName === "A") {
      const href = target.getAttribute("href");

      // Если ссылка якорная или внешняя, в любом случае закрываем меню
      if (href.startsWith("#")) {
        event.preventDefault(); // Отключаем стандартное поведение для якорных ссылок
        const targetElement = document.querySelector(href);

        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }

      // Закрываем меню плавно после клика
      closeMenu();
    } else {
      // Если это не интерактивная ссылка, просто закрываем меню
      closeMenu();
    }
  });

  // Закрытие меню при изменении размера окна
  window.addEventListener("resize", function () {
    if (burgerMenu.classList.contains("active")) {
      closeMenu();
    }
  });
};
