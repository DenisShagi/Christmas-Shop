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

  if (sliderContainer && sliderTrack && btnLeft && btnRight) {
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
  } else {
    // Если слайдер отсутствует, ничего не делаем
    console.info("Слайдер отсутствует на этой странице.");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const timerElements = document.querySelectorAll(".timer-item__value");

  if (timerElements.length > 0) {
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
  } else {
    console.info("Таймер отсутствует на этой странице.");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const decorationList = document.querySelector(".decoration-list");
  const tabs = document.querySelectorAll(".tab"); // Только для gifts.html
  const isGiftsPage = !!document.querySelector(".gifts-pagination"); // Проверяем, есть ли раздел с табами
  const modalOverlay = document.querySelector(".modal-overlay");
  const modalClose = document.querySelector(".modal-close");
  const modalImage = document.querySelector(".modal-image");
  const modalCategory = document.querySelector(".modal-category");
  const modalTitle = document.querySelector(".modal-title");
  const modalDescription = document.querySelector(".modal-description");
  const superpowerList = document.querySelectorAll(".modal-superpowers li");

  // Функция для открытия модального окна
  function openModal(giftData) {
    modalOverlay.style.display = "flex";
    document.body.style.overflow = "hidden"; // Блокируем прокрутку страницы

    // Заполняем данные модального окна
    modalImage.src = getCategoryImage(giftData.category);
    modalImage.alt = giftData.description;
    modalCategory.textContent = giftData.category.toUpperCase();
    modalTitle.textContent = giftData.name;
    modalDescription.textContent = giftData.description;

    // Удаляем предыдущие классы цвета и добавляем актуальный
    modalCategory.classList.remove("work", "health", "harmony");
    modalCategory.classList.add(getCategoryClass(giftData.category));

    // Заполняем суперспособности
    const superpowerValues = giftData.superpowers;
    superpowerList.forEach((item, index) => {
      const value = Object.values(superpowerValues)[index];
      const iconsContainer = item.querySelector(".superpower-icons");

      // Обновляем значение суперспособности
      item.querySelector(".superpower-value").textContent = `${value}`;

      // Очищаем предыдущие снежинки
      iconsContainer.innerHTML = "";

      // Добавляем снежинки
      for (let i = 0; i < 5; i++) {
        const snowflake = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "svg"
        );
        snowflake.setAttribute("viewBox", "0 0 16 16");
        snowflake.setAttribute("width", "16");
        snowflake.setAttribute("height", "16");

        const path = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "path"
        );
        path.setAttribute(
          "d",
          "M12.19 9.88L11.64 9.56L13.11 9.17L12.87 8.26L10.5 8.9L9.38 8.25C9.39 8.17 9.4 8.08 9.4 8C9.4 7.91 9.39 7.82 9.38 7.74L10.5 7.09L12.87 7.73L13.11 6.82L11.64 6.43L12.19 6.11L14.54 5.97L14.89 4.02L13.02 3.34L11.72 5.3L11.17 5.62L11.57 4.15L10.66 3.91L10.03 6.28L8.91 6.93C8.78 6.82 8.63 6.73 8.46 6.67L8.46 5.38L10.2 3.64L9.54 2.98L8.46 4.05L8.46 3.42L9.51 1.32L8 0L6.48 1.32L7.53 3.42L7.53 4.05L6.45 2.98L5.79 3.64L7.53 5.38L7.53 6.67C7.36 6.73 7.21 6.82 7.08 6.93L5.96 6.28L5.33 3.91L4.42 4.15L4.81 5.62L4.27 5.3L2.97 3.34L1.1 4.02L1.45 5.97L3.8 6.11L4.35 6.43L2.88 6.82L3.12 7.73L5.49 7.09L6.61 7.74C6.6 7.82 6.59 7.91 6.59 8C6.59 8.08 6.6 8.17 6.61 8.25L5.49 8.9L3.12 8.26L2.88 9.17L4.35 9.56L3.8 9.88L1.45 10.02L1.1 11.97L2.97 12.65L4.27 10.69L4.82 10.37L4.42 11.84L5.33 12.08L5.96 9.71L7.08 9.06C7.21 9.17 7.36 9.26 7.53 9.32L7.53 10.61L5.79 12.35L6.45 13.01L7.53 11.94L7.53 12.57L6.48 14.67L8 16L9.51 14.67L8.46 12.57L8.46 11.94L9.54 13.01L10.2 12.35L8.46 10.61L8.46 9.32C8.63 9.26 8.78 9.17 8.91 9.06L10.03 9.71L10.66 12.08L11.57 11.84L11.17 10.37L11.72 10.69L13.02 12.65L14.89 11.97L14.54 10.02L12.19 9.88Z"
        );
        path.setAttribute(
          "fill",
          i < value / 100 ? "rgba(255, 70, 70, 1)" : "rgba(255, 70, 70, 0.1)"
        );
        snowflake.appendChild(path);
        iconsContainer.appendChild(snowflake);
      }
    });
  }

  // Функция для закрытия модального окна
  function closeModal() {
    modalOverlay.style.display = "none";
    document.body.style.overflow = "";
  }

  // Добавляем обработчик закрытия модального окна
  modalClose.addEventListener("click", closeModal);
  modalOverlay.addEventListener("click", (event) => {
    if (event.target === modalOverlay) {
      closeModal();
    }
  });

  // Функция для создания карточки
  function createCard(giftData) {
    const card = document.createElement("article");
    card.classList.add("decoration-item");

    const figure = document.createElement("figure");
    figure.classList.add("decoration-item-card");

    const img = document.createElement("img");
    img.classList.add("decoration-item__image");
    img.src = getCategoryImage(giftData.category);
    img.alt = giftData.description;

    const figcaption = document.createElement("figcaption");
    figcaption.classList.add("decoration-item-card-container");

    const header = document.createElement("header");
    header.classList.add("decoration-item-card-content");

    const h4 = document.createElement("h4");
    h4.textContent = giftData.category.toUpperCase();
    h4.classList.add(getCategoryClass(giftData.category));

    const h3 = document.createElement("h3");
    h3.textContent = giftData.name;

    header.appendChild(h4);
    header.appendChild(h3);
    figcaption.appendChild(header);
    figure.appendChild(img);
    figure.appendChild(figcaption);
    card.appendChild(figure);

    // Добавляем обработчик клика для открытия модального окна
    card.addEventListener("click", () => openModal(giftData));

    return card;
  }

  // Функция для получения изображения по категории
  function getCategoryImage(category) {
    const categoryImages = {
      "For Work": "./image/gift-for-work.png",
      "For Health": "./image/gift-for-health.png",
      "For Harmony": "./image/gift-for-harmony.png",
    };
    return categoryImages[category] || "./image/default-placeholder.png";
  }

  // Функция для получения класса по категории
  function getCategoryClass(category) {
    const categoryClasses = {
      "For Work": "work",
      "For Health": "health",
      "For Harmony": "harmony",
    };
    return categoryClasses[category] || "default";
  }

  // Функция для отображения карточек
  function displayCards(data, category = "all", limit = 12) {
    decorationList.innerHTML = ""; // Очищаем список перед добавлением
    let filteredData = data;

    // Если категория "All", перемешиваем карточки
    if (category === "all") {
      filteredData = shuffleArray(data);
    } else {
      // Фильтруем товары по категории
      filteredData = data.filter((item) => item.category === category);
    }

    // Ограничиваем количество карточек
    const itemsToDisplay = filteredData.slice(0, limit);

    itemsToDisplay.forEach((item) => {
      const card = createCard(item);
      decorationList.appendChild(card);
    });
  }

  // Загрузка JSON
  fetch("./gifts.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      if (isGiftsPage) {
        // Логика для страницы gifts.html
        displayCards(data, "all", 12); // Отображаем 16 случайных карточек для "All"

        tabs.forEach((tab) => {
          tab.addEventListener("click", () => {
            // Убираем активный класс у всех кнопок
            tabs.forEach((t) => t.classList.remove("active"));

            // Добавляем активный класс текущей кнопке
            tab.classList.add("active");

            // Отображаем товары выбранной категории
            const category = tab.getAttribute("data-category");
            displayCards(data, category, 16);
          });
        });
      } else {
        // Логика для страницы index.html
        const randomGifts = shuffleArray(data).slice(0, 4); // Берём 4 случайных карточки
        displayCards(randomGifts, "all", 4); // Показываем карточки
      }
    })
    .catch((error) => {
      console.error("Ошибка загрузки JSON:", error);
    });

  // Функция для перемешивания массива
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const upButton = document.querySelector(".up-button");

  if (upButton) {
    // Функция для показа/скрытия кнопки при прокрутке
    function toggleUpButton() {
      if (window.innerWidth <= 768) {
        // Проверяем ширину экрана
        if (window.scrollY > 200) {
          // Появление кнопки после прокрутки вниз
          upButton.classList.add("show");
          upButton.classList.remove("hide");
        } else {
          upButton.classList.remove("show");
          upButton.classList.add("hide");
        }
      } else {
        // Скрываем кнопку на экранах шире 768px
        upButton.classList.remove("show");
        upButton.classList.add("hide");
      }
    }

    // Прокрутка наверх при клике на кнопку
    upButton.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });

    // Отслеживаем прокрутку и изменяем состояние кнопки
    window.addEventListener("scroll", toggleUpButton);

    // Проверяем состояние кнопки при загрузке страницы
    toggleUpButton();
  }
});

