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

document.addEventListener("DOMContentLoaded", () => {
  const sliderContainer = document.querySelector(".slider-container");
  const sliderTrack = document.querySelector(".slider-track");
  const btnLeft = document.querySelector(".btn-arrow:first-of-type");
  const btnRight = document.querySelector(".btn-arrow:last-of-type");

  let totalWidth;
  let visibleWidth;
  let step;
  let maxClicks;
  let currentIndex = 0;
  const edgePadding = 8;

  function calculateSliderParams() {
    totalWidth = sliderTrack.scrollWidth;
    visibleWidth =
      sliderContainer.offsetWidth -
      parseInt(getComputedStyle(sliderContainer).paddingLeft); // Учитываем padding-left
    maxClicks = window.innerWidth >= 768 ? 4 : 7; // Количество шагов
    step = Math.ceil(
      (totalWidth - visibleWidth + edgePadding) / (maxClicks - 1)
    ); // Шаг прокрутки
  }

  // Обновление состояния кнопок
  function updateButtons() {
    btnLeft.classList.toggle("disabled", currentIndex === 0); // Добавляем/убираем класс
    btnRight.classList.toggle("disabled", currentIndex === maxClicks - 1);
  }

  // Прокрутка слайдера
  function scrollSlider(direction) {
    if (direction === "left" && !btnLeft.classList.contains("disabled")) {
      currentIndex--;
    } else if (
      direction === "right" &&
      !btnRight.classList.contains("disabled")
    ) {
      currentIndex++;
    }

    const maxScroll = totalWidth - visibleWidth + edgePadding; // Максимальная прокрутка
    const scrollAmount = Math.min(currentIndex * step, maxScroll);

    sliderTrack.style.transform = `translateX(-${scrollAmount}px)`;
    updateButtons();
  }

  // Обработчики событий кнопок
  btnLeft.addEventListener("click", () => scrollSlider("left"));
  btnRight.addEventListener("click", () => scrollSlider("right"));

  // Обновление при изменении размера окна
  window.addEventListener("resize", () => {
    calculateSliderParams();
    currentIndex = Math.min(currentIndex, maxClicks - 1); // Убедимся, что индекс не вышел за пределы
    scrollSlider(); // Применяем прокрутку
  });

  // Инициализация
  calculateSliderParams();
  updateButtons();
});
