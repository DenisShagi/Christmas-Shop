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

document.addEventListener("DOMContentLoaded", () => {
  const timerElements = document.querySelectorAll(".timer-item__value");

  function updateTimer() {
    const now = new Date();
    const nextYear = now.getUTCFullYear() + 1;
    const newYear = new Date(Date.UTC(nextYear, 0, 1)); // Новый год в UTC
    const timeDiff = newYear - now; // Разница в миллисекундах

    if (timeDiff <= 0) {
      // Если Новый год наступил
      clearInterval(timerInterval);
      timerElements.forEach((el) => (el.textContent = "0"));
      return;
    }

    const seconds = Math.floor((timeDiff / 1000) % 60);
    const minutes = Math.floor((timeDiff / 1000 / 60) % 60);
    const hours = Math.floor((timeDiff / 1000 / 60 / 60) % 24);
    const days = Math.floor(timeDiff / 1000 / 60 / 60 / 24);

    // Обновляем значения в таймере
    timerElements[0].textContent = days; // Дни
    timerElements[1].textContent = hours; // Часы
    timerElements[2].textContent = minutes; // Минуты
    timerElements[3].textContent = seconds; // Секунды
  }

  // Запускаем обновление каждую секунду
  updateTimer(); // Первое обновление сразу
  const timerInterval = setInterval(updateTimer, 1000);
});
