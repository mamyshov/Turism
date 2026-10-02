import { DEFAULT_LOCALE, Locale } from "./locales";

export type Dictionary = {
  nav: {
    home: string;
    favorites: string;
    catalog: string;
    about: string;
    contacts: string;
    login: string;
    forCompanies: string;
    account: string;
    admin: string;
    logout: string;
  };
  tour: {
    back: string;
    about: string;
    price: string;
    duration: string;
    group: string;
    operator: string;
    contactHint: string;
    otherTours: string;
    viewProfile: string;
    noPhotos: string;
  };
  share: {
    button: string;
    copyLink: string;
    copied: string;
    whatsapp: string;
    telegram: string;
    more: string;
    myProfile: string;
    close: string;
  };
  favorites: {
    title: string;
    subtitle: string;
    empty: string;
    emptyHint: string;
    browse: string;
  };
  footer: {
    tagline: string;
  };
  home: {
    heroTitle: string;
    heroSubtitle: string;
    searchPlaceholder: string;
    searchButton: string;
    categoriesTitle: string;
    topCompaniesTitle: string;
    viewAll: string;
    emptyState: string;
    emptyStateLink: string;
  };
  search: {
    title: string;
    filtersButton: string;
    searchLabel: string;
    searchPlaceholder: string;
    region: string;
    category: string;
    language: string;
    price: string;
    from: string;
    to: string;
    apply: string;
    reset: string;
    all: string;
    found: string;
    empty: string;
    aiTitle: string;
    aiSubtitle: string;
    aiPlaceholder: string;
    aiButton: string;
    aiLoading: string;
    aiResultsTitle: string;
    aiEmpty: string;
    aiError: string;
    aiUnavailable: string;
  };
  company: {
    verified: string;
    priceFrom: string;
    about: string;
    languages: string;
    tourTypes: string;
    videos: string;
    pdfGuides: string;
    tours: string;
    photos: string;
    included: string;
    excluded: string;
    reviews: string;
    leaveReview: string;
    whatsapp: string;
    call: string;
    email: string;
    instagram: string;
    noPhotos: string;
    noVideos: string;
    noPdfGuides: string;
    noTours: string;
    noReviews: string;
    reviewFormRating: string;
    reviewFormName: string;
    reviewFormEmail: string;
    reviewFormText: string;
    reviewFormSubmit: string;
    reviewFormCancel: string;
    reviewThanks: string;
  };
  auth: {
    loginTitle: string;
    registerTitle: string;
    registerSubtitle: string;
    email: string;
    password: string;
    passwordConfirm: string;
    phone: string;
    name: string;
    type: string;
    verificationDoc: string;
    verificationDocHint: string;
    loginButton: string;
    registerButton: string;
    noAccount: string;
    haveAccount: string;
    registerSuccessTitle: string;
    registerSuccessBody: string;
    wrongCredentials: string;
    passwordMismatch: string;
    stepBasic: string;
    stepContacts: string;
    stepDocs: string;
    stepReview: string;
    next: string;
    back: string;
    reviewHint: string;
    statusPending: string;
    contactsTitle: string;
    contactsAddress: string;
  };
  about: { title: string; body1: string; body2: string };
  contacts: { title: string };
  reels: {
    navLabel: string;
    title: string;
    subtitle: string;
    empty: string;
    viewProfile: string;
    muted: string;
    tapToUnmute: string;
  };
  dashboard: {
    nav: {
      home: string;
      profile: string;
      media: string;
      reels: string;
      reviews: string;
      tours: string;
      stats: string;
      billing: string;
      logout: string;
    };
    status: {
      pending: string;
      approved: string;
      rejected: string;
      blocked: string;
    };
    pendingNotice: string;
    rejectedNotice: string;
    blockedNotice: string;
    home: {
      title: string;
      subtitle: string;
      kpiViews: string;
      kpiReviews: string;
      kpiActiveTours: string;
      kpiTariff: string;
      chartTitle: string;
      recentReviewsTitle: string;
      recentReviewsEmpty: string;
      viewAll: string;
    };
    chart: {
      period7: string;
      period30: string;
      period90: string;
    };
    reviewsPage: {
      title: string;
      subtitle: string;
      empty: string;
      emptyHint: string;
    };
    profile: {
      description: string;
      descriptionPlaceholder: string;
      region: string;
      regionNotSet: string;
      languages: string;
      categories: string;
      phone: string;
      whatsapp: string;
      instagram: string;
      email: string;
      save: string;
      saving: string;
      saved: string;
      errorGeneric: string;
      preview: string;
    };
    media: {
      photosTitle: string;
      photosSubtitle: string;
      videosTitle: string;
      videosSubtitle: string;
      pdfTitle: string;
      pdfSubtitle: string;
      upsellPrefix: string;
      changeTariff: string;
      add: string;
      uploading: string;
      photosCount: string;
      videoEmbedOption: string;
      videoUploadOption: string;
      videoTitlePlaceholder: string;
      videoUrlPlaceholder: string;
      videoLinkLabel: string;
      videoFileLabel: string;
      addVideo: string;
      selectFileError: string;
      delete: string;
      pdfTitlePlaceholder: string;
      addPdf: string;
    };
    reels: {
      title: string;
      subtitlePrefix: string;
      subtitleSuffix: string;
      captionPlaceholder: string;
      add: string;
      uploading: string;
      limitReached: string;
      empty: string;
      delete: string;
      selectFileError: string;
    };
    tours: {
      title: string;
      subtitle: string;
      titleLabel: string;
      descriptionLabel: string;
      daysLabel: string;
      hoursLabel: string;
      priceLabel: string;
      maxPeopleLabel: string;
      includedLabel: string;
      includedPlaceholder: string;
      excludedLabel: string;
      excludedPlaceholder: string;
      add: string;
      saving: string;
      cancel: string;
      addButton: string;
      delete: string;
      daysSuffix: string;
      hoursSuffix: string;
      maxPeopleSuffix: string;
      empty: string;
      durationLabel: string;
      actionsLabel: string;
      photosButton: string;
      photosTitle: string;
      photosHint: string;
      photosAdd: string;
      photosUploading: string;
      photosDelete: string;
      photosLimit: string;
      photosError: string;
      done: string;
      errorGeneric: string;
    };
    stats: {
      title: string;
      subtitle: string;
      totalViews: string;
      periodViews: string;
      viewsSuffix: string;
      likes: string;
    };
    billing: {
      title: string;
      subtitle: string;
      free: string;
      currentTariff: string;
      tariffs: Record<string, { label: string; period: string; features: string[] }>;
    };
  };
};

const ru: Dictionary = {
  nav: {
    catalog: "Каталог",
    home: "Главная",
    favorites: "Избранное",
    about: "О проекте",
    contacts: "Контакты",
    login: "Войти",
    forCompanies: "Для турфирм",
    account: "Кабинет",
    admin: "Админ",
    logout: "Выйти",
  },
  tour: {
    back: "К профилю турфирмы",
    about: "О туре",
    price: "Цена",
    duration: "Длительность",
    group: "Группа",
    operator: "Организатор",
    contactHint: "Свяжитесь с турфирмой, чтобы уточнить даты и забронировать тур.",
    otherTours: "Другие туры компании",
    viewProfile: "Профиль турфирмы",
    noPhotos: "Фото пока нет",
  },
  share: {
    button: "Поделиться",
    copyLink: "Копировать ссылку",
    copied: "Ссылка скопирована",
    whatsapp: "WhatsApp",
    telegram: "Telegram",
    more: "Другие приложения",
    myProfile: "Поделиться профилем",
    close: "Закрыть",
  },
  favorites: {
    title: "Избранное",
    subtitle: "Турфирмы, которые вы сохранили на этом устройстве.",
    empty: "Пока ничего не сохранено",
    emptyHint: "Нажмите на сердце на карточке турфирмы, чтобы добавить её сюда.",
    browse: "Открыть каталог",
  },
  footer: {
    tagline: "Платформа для турфирм и гидов Кыргызстана.",
  },
  home: {
    heroTitle: "Найдите проверенных гидов и турфирмы Кыргызстана",
    heroSubtitle:
      "Треккинг, конные туры, гастротуризм, культурные и экстрим-туры — от Иссык-Куля до Оша.",
    searchPlaceholder: "Например: треккинг на Иссык-Куле",
    searchButton: "Искать",
    categoriesTitle: "Категории туров",
    topCompaniesTitle: "Топ турфирм",
    viewAll: "Смотреть все →",
    emptyState: "Пока нет проверенных турфирм. Станьте первыми —",
    emptyStateLink: "зарегистрируйтесь",
  },
  search: {
    title: "Каталог турфирм и гидов",
    filtersButton: "Фильтры",
    searchLabel: "Поиск",
    searchPlaceholder: "Название или описание",
    region: "Регион",
    category: "Тип тура",
    language: "Язык гида",
    price: "Цена, сом",
    from: "от",
    to: "до",
    apply: "Применить",
    reset: "Сбросить фильтры",
    all: "Все",
    found: "Найдено",
    empty: "По вашему запросу ничего не найдено. Попробуйте изменить фильтры.",
    aiTitle: "AI-подбор тура",
    aiSubtitle: "Опишите словами, что вы хотите — Claude подберёт подходящие туры.",
    aiPlaceholder: "Например: треккинг на 5 дней, не очень сложный, ночёвки в юртах",
    aiButton: "Подобрать с помощью AI",
    aiLoading: "Подбираем варианты…",
    aiResultsTitle: "Результаты AI-подбора",
    aiEmpty: "Подходящих туров не нашлось. Попробуйте описать иначе.",
    aiError: "Не удалось выполнить AI-подбор. Попробуйте позже.",
    aiUnavailable: "AI-подбор временно недоступен.",
  },
  company: {
    verified: "Проверено",
    priceFrom: "от {price} сом",
    about: "О компании",
    languages: "Языки",
    tourTypes: "Типы туров",
    videos: "Видео-гиды",
    pdfGuides: "PDF-гиды",
    tours: "Туры",
    photos: "Фото",
    included: "Включено",
    excluded: "Не включено",
    reviews: "Отзывы",
    leaveReview: "Оставить отзыв",
    whatsapp: "WhatsApp",
    call: "Позвонить",
    email: "Email",
    instagram: "Instagram",
    noPhotos: "Турфирма пока не загрузила фотографии.",
    noVideos: "Видео-гидов пока нет.",
    noPdfGuides: "PDF-гидов пока нет.",
    noTours: "Туры пока не добавлены.",
    noReviews: "Пока нет отзывов. Будьте первым!",
    reviewFormRating: "Оценка",
    reviewFormName: "Ваше имя",
    reviewFormEmail: "Email",
    reviewFormText: "Ваш отзыв (необязательно)",
    reviewFormSubmit: "Отправить",
    reviewFormCancel: "Отмена",
    reviewThanks: "Спасибо за отзыв!",
  },
  auth: {
    loginTitle: "Вход",
    registerTitle: "Регистрация турфирмы / гида",
    registerSubtitle:
      "После регистрации ваш профиль будет проверен администратором. Это обычно занимает 1–2 рабочих дня.",
    email: "Email",
    password: "Пароль",
    passwordConfirm: "Повторите пароль",
    phone: "Телефон",
    name: "Название компании / имя гида",
    type: "Тип",
    verificationDoc: "Документ для верификации (лицензия, патент или паспорт)",
    verificationDocHint: "PDF, JPG или PNG, до 10 МБ.",
    loginButton: "Войти",
    registerButton: "Зарегистрироваться",
    noAccount: "Ещё нет аккаунта?",
    haveAccount: "Уже есть аккаунт?",
    registerSuccessTitle: "Заявка отправлена!",
    registerSuccessBody:
      "Ваш профиль отправлен на модерацию. После проверки администратором вы получите доступ к личному кабинету. Перенаправляем на страницу входа…",
    wrongCredentials: "Неверный email или пароль.",
    passwordMismatch: "Пароли не совпадают.",
    stepBasic: "Основное",
    stepContacts: "Контакты",
    stepDocs: "Документы",
    stepReview: "Проверка",
    next: "Далее",
    back: "Назад",
    reviewHint: "Проверьте введённые данные перед отправкой.",
    statusPending: "На модерации",
    contactsTitle: "Контакты",
    contactsAddress: "Бишкек, Кыргызстан",
  },
  about: {
    title: "О проекте",
    body1:
      "KyrgyzTour Hub — платформа, где турфирмы и частные гиды Кыргызстана могут создать профиль с фото, видео и PDF-гидами, а туристы — находить их через поиск и фильтры, изучать медиа-контент и связываться напрямую по WhatsApp, телефону или email.",
    body2:
      "Мы верифицируем каждую турфирму и гида перед публикацией профиля, чтобы турист мог доверять информации в каталоге.",
  },
  contacts: { title: "Контакты" },
  reels: {
    navLabel: "Reels",
    title: "Короткие видео",
    subtitle: "Смахивайте вверх, чтобы посмотреть ещё",
    empty: "Пока нет роликов. Загляните позже!",
    viewProfile: "Профиль турфирмы",
    muted: "Без звука — нажмите, чтобы включить",
    tapToUnmute: "Нажмите для звука",
  },
  dashboard: {
    nav: {
      home: "Главная",
      profile: "Настройки",
      media: "Медиа",
      reels: "Reels",
      reviews: "Отзывы",
      tours: "Туры",
      stats: "Статистика",
      billing: "Тариф",
      logout: "Выйти",
    },
    status: {
      pending: "На модерации",
      approved: "Одобрено",
      rejected: "Отклонено",
      blocked: "Заблокирован",
    },
    pendingNotice: "Ваш профиль ещё не виден в каталоге, пока администратор не одобрит заявку.",
    rejectedNotice: "Заявка отклонена",
    blockedNotice: "Профиль заблокирован администратором и скрыт из каталога.",
    home: {
      title: "Главная",
      subtitle: "Общая сводка по вашему профилю на платформе.",
      kpiViews: "Просмотры профиля",
      kpiReviews: "Отзывы",
      kpiActiveTours: "Активные туры",
      kpiTariff: "Текущий тариф",
      chartTitle: "Динамика просмотров",
      recentReviewsTitle: "Последние отзывы",
      recentReviewsEmpty: "Пока нет отзывов.",
      viewAll: "Все отзывы →",
    },
    chart: {
      period7: "7 дней",
      period30: "30 дней",
      period90: "90 дней",
    },
    reviewsPage: {
      title: "Отзывы",
      subtitle: "Отзывы туристов о вашей компании. Модерацию спама выполняет администратор платформы.",
      empty: "Пока нет отзывов.",
      emptyHint: "Отзывы появятся здесь, когда туристы оставят их на странице вашего профиля.",
    },
    profile: {
      description: "Описание компании",
      descriptionPlaceholder: "Расскажите туристам о вашей компании, опыте и турах…",
      region: "Регион работы",
      regionNotSet: "Не указано",
      languages: "Языки гида",
      categories: "Типы туров",
      phone: "Телефон",
      whatsapp: "WhatsApp",
      instagram: "Instagram",
      email: "Email для связи",
      save: "Сохранить",
      saving: "Сохранение…",
      saved: "Сохранено",
      errorGeneric: "Не удалось сохранить.",
      preview: "Предпросмотр публичной страницы →",
    },
    media: {
      photosTitle: "Фотографии",
      photosSubtitle: "До {limit} фото на вашем тарифе ({tariff}), формат JPG/PNG/WEBP, до 5 МБ каждое.",
      videosTitle: "Видео-гиды",
      videosSubtitle: "Ссылка на YouTube/Vimeo или файл (MP4/WEBM/MOV, до 200 МБ).",
      pdfTitle: "PDF-гиды",
      pdfSubtitle: "Маршруты и гиды в формате PDF, до 20 МБ.",
      upsellPrefix: "Загрузка {feature} доступна с тарифа «Стандарт».",
      changeTariff: "Сменить тариф →",
      add: "+ Добавить",
      uploading: "Загрузка…",
      photosCount: "{count} / {limit} фото загружено",
      videoEmbedOption: "Ссылка YouTube/Vimeo",
      videoUploadOption: "Загрузить файл",
      videoTitlePlaceholder: "Название (необязательно)",
      videoUrlPlaceholder: "https://www.youtube.com/watch?v=…",
      videoLinkLabel: "Видео (ссылка)",
      videoFileLabel: "Видео (файл)",
      addVideo: "Добавить видео",
      selectFileError: "Выберите файл.",
      delete: "Удалить",
      pdfTitlePlaceholder: "Название гида, например «Маршрут на Ала-Кёль»",
      addPdf: "Добавить PDF",
    },
    reels: {
      title: "Короткие видео (Reels)",
      subtitlePrefix: "Короткие вертикальные ролики попадают в общую публичную ленту",
      subtitleSuffix: "— доступно на любом тарифе, до {limit} роликов, MP4/WEBM/MOV, до 50 МБ каждый. Это способ привлечь туристов, а не платная функция.",
      captionPlaceholder: "Подпись (необязательно)",
      add: "Добавить ролик",
      uploading: "Загрузка…",
      limitReached: "Достигнут лимит роликов ({limit}). Удалите старый, чтобы добавить новый.",
      empty: "Пока нет роликов.",
      delete: "Удалить",
      selectFileError: "Выберите видеофайл.",
    },
    tours: {
      title: "Туры",
      subtitle: "Добавьте туры, которые предлагает ваша компания. Они появятся на публичной странице профиля.",
      titleLabel: "Название тура",
      descriptionLabel: "Описание",
      daysLabel: "Дней",
      hoursLabel: "Часов",
      priceLabel: "Цена, сом",
      maxPeopleLabel: "Макс. чел.",
      includedLabel: "Включено",
      includedPlaceholder: "Транспорт, питание, гид…",
      excludedLabel: "Не включено",
      excludedPlaceholder: "Авиабилеты, страховка…",
      add: "+ Добавить тур",
      saving: "Сохранение…",
      cancel: "Отмена",
      addButton: "Добавить тур",
      delete: "Удалить",
      daysSuffix: "дн.",
      hoursSuffix: "ч.",
      maxPeopleSuffix: "до {n} чел.",
      empty: "Пока нет туров. Добавьте первый — он появится на странице вашего профиля.",
      durationLabel: "Длительность",
      actionsLabel: "Действия",
      photosButton: "Фото",
      photosTitle: "Фото тура",
      photosHint: "JPG, PNG или WEBP, до 5 МБ. Первое фото — обложка тура. До {limit} фото.",
      photosAdd: "Добавить фото",
      photosUploading: "Загрузка…",
      photosDelete: "Удалить фото",
      photosLimit: "Достигнут лимит фото ({limit}).",
      photosError: "Не удалось загрузить фото.",
      done: "Готово",
      errorGeneric: "Не удалось добавить тур.",
    },
    stats: {
      title: "Статистика",
      subtitle: "Просмотры профиля за последние {days} дней.",
      totalViews: "Всего просмотров",
      periodViews: "За {days} дней",
      viewsSuffix: "просм.",
      likes: "Лайки Reels",
    },
    billing: {
      title: "Тариф",
      subtitle: "Онлайн-оплата появится позже. Пока смена тарифа выполняется администратором вручную — напишите нам на info@kyrgyztourhub.kg.",
      free: "Бесплатно",
      currentTariff: "Текущий тариф",
      tariffs: {
        BASIC: {
          label: "Базовый",
          period: "первые 6 мес. бесплатно",
          features: ["Профиль компании", "До 5 фото", "Без видео и PDF-гидов"],
        },
        STANDARD: {
          label: "Стандарт",
          period: "сом/мес",
          features: ["До 15 фото", "Видео-гиды", "PDF-гиды"],
        },
        PRO: {
          label: "Про",
          period: "сом/мес",
          features: ["Приоритет в поиске", "Бейдж «Проверено»", "Аналитика просмотров"],
        },
      },
    },
  },
};

const ky: Dictionary = {
  nav: {
    catalog: "Каталог",
    home: "Башкы бет",
    favorites: "Тандалгандар",
    about: "Долбоор жөнүндө",
    contacts: "Байланыш",
    login: "Кирүү",
    forCompanies: "Турфирмалар үчүн",
    account: "Кабинет",
    admin: "Админ",
    logout: "Чыгуу",
  },
  tour: {
    back: "Турфирманын профилине",
    about: "Тур жөнүндө",
    price: "Баасы",
    duration: "Узактыгы",
    group: "Топ",
    operator: "Уюштуруучу",
    contactHint: "Даталарды тактоо жана турду брондоо үчүн турфирма менен байланышыңыз.",
    otherTours: "Компаниянын башка турлары",
    viewProfile: "Турфирманын профили",
    noPhotos: "Азырынча сүрөт жок",
  },
  share: {
    button: "Бөлүшүү",
    copyLink: "Шилтемени көчүрүү",
    copied: "Шилтеме көчүрүлдү",
    whatsapp: "WhatsApp",
    telegram: "Telegram",
    more: "Башка колдонмолор",
    myProfile: "Профилди бөлүшүү",
    close: "Жабуу",
  },
  favorites: {
    title: "Тандалгандар",
    subtitle: "Бул түзмөктө сакталган турфирмалар.",
    empty: "Азырынча эч нерсе сакталган жок",
    emptyHint: "Турфирма карточкасындагы жүрөктү басып, ушул жерге кошуңуз.",
    browse: "Каталогду ачуу",
  },
  footer: {
    tagline: "Кыргызстандын турфирмалары жана гиддери үчүн платформа.",
  },
  home: {
    heroTitle: "Кыргызстандын текшерилген гиддерин жана турфирмаларын табыңыз",
    heroSubtitle:
      "Трекинг, ат үстүндөгү туризм, гастротуризм, маданий жана экстрим-турлар — Ысык-Көлдөн Ошко чейин.",
    searchPlaceholder: "Мисалы: Ысык-Көлдө трекинг",
    searchButton: "Издөө",
    categoriesTitle: "Тур категориялары",
    topCompaniesTitle: "Мыкты турфирмалар",
    viewAll: "Баарын көрүү →",
    emptyState: "Азырынча текшерилген турфирмалар жок. Биринчи болуңуз —",
    emptyStateLink: "катталыңыз",
  },
  search: {
    title: "Турфирмалар жана гиддер каталогу",
    filtersButton: "Чыпкалар",
    searchLabel: "Издөө",
    searchPlaceholder: "Аталышы же сүрөттөмөсү",
    region: "Аймак",
    category: "Тур түрү",
    language: "Гиддин тили",
    price: "Баасы, сом",
    from: "баштап",
    to: "чейин",
    apply: "Колдонуу",
    reset: "Чыпкаларды тазалоо",
    all: "Баары",
    found: "Табылды",
    empty: "Суранычыңыз боюнча эч нерсе табылган жок. Чыпкаларды өзгөртүп көрүңүз.",
    aiTitle: "AI менен тур тандоо",
    aiSubtitle: "Каалаган нерсеңизди сөз менен жазыңыз — Claude ылайыктуу турларды тандайт.",
    aiPlaceholder: "Мисалы: 5 күндүк трекинг, өтө оор эмес, боз үйдө түнөө менен",
    aiButton: "AI менен тандоо",
    aiLoading: "Варианттар издөө…",
    aiResultsTitle: "AI тандоосунун жыйынтыгы",
    aiEmpty: "Ылайыктуу турлар табылган жок. Башкача сүрөттөп көрүңүз.",
    aiError: "AI тандоону аткарууга болбоду. Кийинчерээк аракет кылыңыз.",
    aiUnavailable: "AI менен тандоо убактылуу жеткиликсиз.",
  },
  company: {
    verified: "Текшерилген",
    priceFrom: "{price} сомдон баштап",
    about: "Компания жөнүндө",
    languages: "Тилдер",
    tourTypes: "Тур түрлөрү",
    videos: "Видео гиддер",
    pdfGuides: "PDF гиддер",
    tours: "Турлар",
    photos: "Сүрөттөр",
    included: "Кирет",
    excluded: "Кирбейт",
    reviews: "Пикирлер",
    leaveReview: "Пикир калтыруу",
    whatsapp: "WhatsApp",
    call: "Чалуу",
    email: "Email",
    instagram: "Instagram",
    noPhotos: "Турфирма азырынча сүрөт жүктөгөн эмес.",
    noVideos: "Азырынча видео гиддер жок.",
    noPdfGuides: "Азырынча PDF гиддер жок.",
    noTours: "Азырынча турлар кошулган эмес.",
    noReviews: "Азырынча пикирлер жок. Биринчи болуңуз!",
    reviewFormRating: "Баа",
    reviewFormName: "Атыңыз",
    reviewFormEmail: "Email",
    reviewFormText: "Пикириңиз (милдеттүү эмес)",
    reviewFormSubmit: "Жөнөтүү",
    reviewFormCancel: "Жокко чыгаруу",
    reviewThanks: "Пикириңиз үчүн рахмат!",
  },
  auth: {
    loginTitle: "Кирүү",
    registerTitle: "Турфирманы / гидди каттоо",
    registerSubtitle:
      "Каттоодон кийин профилиңиз администратор тарабынан текшерилет. Бул адатта 1–2 жумуш күнүн алат.",
    email: "Email",
    password: "Сырсөз",
    passwordConfirm: "Сырсөздү кайталаңыз",
    phone: "Телефон",
    name: "Компаниянын аталышы / гиддин аты",
    type: "Түрү",
    verificationDoc: "Текшерүү үчүн документ (лицензия, патент же паспорт)",
    verificationDocHint: "PDF, JPG же PNG, 10 МБга чейин.",
    loginButton: "Кирүү",
    registerButton: "Катталуу",
    noAccount: "Дагы аккаунтуңуз жокпу?",
    haveAccount: "Аккаунтуңуз барбы?",
    registerSuccessTitle: "Арыз жөнөтүлдү!",
    registerSuccessBody:
      "Профилиңиз модерацияга жөнөтүлдү. Администратор текшергенден кийин жеке кабинетке кире аласыз. Кирүү барагына багыттоо жүрүп жатат…",
    wrongCredentials: "Email же сырсөз туура эмес.",
    passwordMismatch: "Сырсөздөр дал келген жок.",
    stepBasic: "Негизги",
    stepContacts: "Байланыш",
    stepDocs: "Документтер",
    stepReview: "Текшерүү",
    next: "Кийинки",
    back: "Артка",
    reviewHint: "Жөнөтүүдөн мурун маалыматтарды текшериңиз.",
    statusPending: "Модерацияда",
    contactsTitle: "Байланыш",
    contactsAddress: "Бишкек, Кыргызстан",
  },
  about: {
    title: "Долбоор жөнүндө",
    body1:
      "KyrgyzTour Hub — Кыргызстандын турфирмалары жана жеке гиддери сүрөт, видео жана PDF гиддер менен профиль түзө турган, ал эми туристтер аларды издөө жана чыпкалар аркылуу таап, медиа-мазмунду көрүп, WhatsApp, телефон же email аркылуу түз байланыша турган платформа.",
    body2:
      "Биз ар бир турфирманы жана гидди профиль жарыяланганга чейин текшеребиз, ошондуктан турист каталогдогу маалыматка ишене алат.",
  },
  contacts: { title: "Байланыш" },
  reels: {
    navLabel: "Reels",
    title: "Кыска видеолор",
    subtitle: "Дагы көрүү үчүн жогору сүрүңүз",
    empty: "Азырынча видео жок. Кийинчерээк кайра келиңиз!",
    viewProfile: "Турфирманын профили",
    muted: "Үнсүз — күйгүзүү үчүн басыңыз",
    tapToUnmute: "Үн үчүн басыңыз",
  },
  dashboard: {
    nav: {
      home: "Башкы бет",
      profile: "Жөндөөлөр",
      media: "Медиа",
      reels: "Reels",
      reviews: "Пикирлер",
      tours: "Турлар",
      stats: "Статистика",
      billing: "Тариф",
      logout: "Чыгуу",
    },
    status: {
      pending: "Текшерүүдө",
      approved: "Бекитилди",
      rejected: "Четке кагылды",
      blocked: "Бөгөттөлгөн",
    },
    pendingNotice: "Администратор арызды бекиткенге чейин профилиңиз каталогдо көрүнбөйт.",
    rejectedNotice: "Арыз четке кагылды",
    blockedNotice: "Профиль администратор тарабынан бөгөттөлдү жана каталогдон жашырылды.",
    home: {
      title: "Башкы бет",
      subtitle: "Платформадагы профилиңиз боюнча жалпы маалымат.",
      kpiViews: "Профиль көрүүлөрү",
      kpiReviews: "Пикирлер",
      kpiActiveTours: "Активдүү турлар",
      kpiTariff: "Учурдагы тариф",
      chartTitle: "Көрүүлөрдүн динамикасы",
      recentReviewsTitle: "Акыркы пикирлер",
      recentReviewsEmpty: "Азырынча пикирлер жок.",
      viewAll: "Бардык пикирлер →",
    },
    chart: {
      period7: "7 күн",
      period30: "30 күн",
      period90: "90 күн",
    },
    reviewsPage: {
      title: "Пикирлер",
      subtitle: "Туристтердин компанияңыз жөнүндөгү пикирлери. Спамды платформанын администратору текшерет.",
      empty: "Азырынча пикирлер жок.",
      emptyHint: "Туристтер профилиңиздин бетинде пикир калтырганда, алар бул жерде көрүнөт.",
    },
    profile: {
      description: "Компания жөнүндө сүрөттөмө",
      descriptionPlaceholder: "Туристтерге компанияңыз, тажрыйбаңыз жана турларыңыз жөнүндө айтып бериңиз…",
      region: "Иштөө аймагы",
      regionNotSet: "Көрсөтүлгөн жок",
      languages: "Гиддин тилдери",
      categories: "Тур түрлөрү",
      phone: "Телефон",
      whatsapp: "WhatsApp",
      instagram: "Instagram",
      email: "Байланыш үчүн email",
      save: "Сактоо",
      saving: "Сакталууда…",
      saved: "Сакталды",
      errorGeneric: "Сактоого болбоду.",
      preview: "Коомдук баракты алдын ала көрүү →",
    },
    media: {
      photosTitle: "Сүрөттөр",
      photosSubtitle: "Тарифиңизде ({tariff}) {limit} сүрөткө чейин, JPG/PNG/WEBP форматы, ар бирин 5 МБга чейин.",
      videosTitle: "Видео гиддер",
      videosSubtitle: "YouTube/Vimeo шилтемеси же файл (MP4/WEBM/MOV, 200 МБга чейин).",
      pdfTitle: "PDF гиддер",
      pdfSubtitle: "PDF форматындагы маршруттар жана гиддер, 20 МБга чейин.",
      upsellPrefix: "{feature} жүктөө «Стандарт» тарифинен тартып жеткиликтүү.",
      changeTariff: "Тарифти өзгөртүү →",
      add: "+ Кошуу",
      uploading: "Жүктөлүүдө…",
      photosCount: "{count} / {limit} сүрөт жүктөлдү",
      videoEmbedOption: "YouTube/Vimeo шилтемеси",
      videoUploadOption: "Файл жүктөө",
      videoTitlePlaceholder: "Аталышы (милдеттүү эмес)",
      videoUrlPlaceholder: "https://www.youtube.com/watch?v=…",
      videoLinkLabel: "Видео (шилтеме)",
      videoFileLabel: "Видео (файл)",
      addVideo: "Видео кошуу",
      selectFileError: "Файлды тандаңыз.",
      delete: "Өчүрүү",
      pdfTitlePlaceholder: "Гиддин аталышы, мисалы «Ала-Көл маршруту»",
      addPdf: "PDF кошуу",
    },
    reels: {
      title: "Кыска видеолор (Reels)",
      subtitlePrefix: "Кыска тик видеолор жалпы коомдук лентага чыгат",
      subtitleSuffix: "— бардык тарифтерде жеткиликтүү, {limit} видеого чейин, MP4/WEBM/MOV, ар бирин 50 МБга чейин. Бул туристтерди тартуу ыкмасы, акылуу функция эмес.",
      captionPlaceholder: "Жазуу (милдеттүү эмес)",
      add: "Видео кошуу",
      uploading: "Жүктөлүүдө…",
      limitReached: "Видео лимитине жеттиңиз ({limit}). Жаңысын кошуу үчүн эскисин өчүрүңүз.",
      empty: "Азырынча видео жок.",
      delete: "Өчүрүү",
      selectFileError: "Видео файлды тандаңыз.",
    },
    tours: {
      title: "Турлар",
      subtitle: "Компанияңыз сунуштаган турларды кошуңуз. Алар коомдук профиль бетинде көрүнөт.",
      titleLabel: "Тур аталышы",
      descriptionLabel: "Сүрөттөмө",
      daysLabel: "Күн",
      hoursLabel: "Саат",
      priceLabel: "Баасы, сом",
      maxPeopleLabel: "Макс. адам",
      includedLabel: "Кирет",
      includedPlaceholder: "Транспорт, тамак, гид…",
      excludedLabel: "Кирбейт",
      excludedPlaceholder: "Авиабилеттер, камсыздандыруу…",
      add: "+ Тур кошуу",
      saving: "Сакталууда…",
      cancel: "Жокко чыгаруу",
      addButton: "Тур кошуу",
      delete: "Өчүрүү",
      daysSuffix: "күн",
      hoursSuffix: "саат",
      maxPeopleSuffix: "{n} адамга чейин",
      empty: "Азырынча турлар жок. Биринчисин кошуңуз — ал профилиңиздин бетинде көрүнөт.",
      durationLabel: "Узактыгы",
      actionsLabel: "Аракеттер",
      photosButton: "Сүрөт",
      photosTitle: "Турдун сүрөттөрү",
      photosHint: "JPG, PNG же WEBP, 5 МБга чейин. Биринчи сүрөт — турдун мукабасы. {limit} сүрөткө чейин.",
      photosAdd: "Сүрөт кошуу",
      photosUploading: "Жүктөлүүдө…",
      photosDelete: "Сүрөттү өчүрүү",
      photosLimit: "Сүрөт лимитине жеттиңиз ({limit}).",
      photosError: "Сүрөттү жүктөөгө болбоду.",
      done: "Даяр",
      errorGeneric: "Турду кошууга болбоду.",
    },
    stats: {
      title: "Статистика",
      subtitle: "Акыркы {days} күндүн ичинде профилдин көрүүлөрү.",
      totalViews: "Бардык көрүүлөр",
      periodViews: "{days} күн ичинде",
      viewsSuffix: "көрүү",
      likes: "Reels лайктары",
    },
    billing: {
      title: "Тариф",
      subtitle: "Онлайн төлөм кийинчерээк кошулат. Азырынча тарифти администратор кол менен өзгөртөт — бизге info@kyrgyztourhub.kg дарегине жазыңыз.",
      free: "Акысыз",
      currentTariff: "Учурдагы тариф",
      tariffs: {
        BASIC: {
          label: "Базалык",
          period: "алгачкы 6 ай акысыз",
          features: ["Компания профили", "5 сүрөткө чейин", "Видео жана PDF гиддерсиз"],
        },
        STANDARD: {
          label: "Стандарт",
          period: "сом/ай",
          features: ["15 сүрөткө чейин", "Видео гиддер", "PDF гиддер"],
        },
        PRO: {
          label: "Про",
          period: "сом/ай",
          features: ["Издөөдө артыкчылык", "«Текшерилген» белгиси", "Көрүүлөрдүн аналитикасы"],
        },
      },
    },
  },
};

const en: Dictionary = {
  nav: {
    catalog: "Catalog",
    home: "Home",
    favorites: "Favorites",
    about: "About",
    contacts: "Contacts",
    login: "Log in",
    forCompanies: "For tour operators",
    account: "Dashboard",
    admin: "Admin",
    logout: "Log out",
  },
  tour: {
    back: "Back to operator",
    about: "About this tour",
    price: "Price",
    duration: "Duration",
    group: "Group",
    operator: "Operator",
    contactHint: "Contact the operator to confirm dates and book this tour.",
    otherTours: "More tours from this operator",
    viewProfile: "View operator profile",
    noPhotos: "No photos yet",
  },
  share: {
    button: "Share",
    copyLink: "Copy link",
    copied: "Link copied",
    whatsapp: "WhatsApp",
    telegram: "Telegram",
    more: "More apps",
    myProfile: "Share my profile",
    close: "Close",
  },
  favorites: {
    title: "Favorites",
    subtitle: "Operators you saved on this device.",
    empty: "Nothing saved yet",
    emptyHint: "Tap the heart on an operator card to add it here.",
    browse: "Browse catalog",
  },
  footer: {
    tagline: "A platform for tour operators and guides in Kyrgyzstan.",
  },
  home: {
    heroTitle: "Find trusted guides and tour operators in Kyrgyzstan",
    heroSubtitle:
      "Trekking, horseback tours, food tourism, cultural and adventure trips — from Issyk-Kul to Osh.",
    searchPlaceholder: "e.g. trekking around Issyk-Kul",
    searchButton: "Search",
    categoriesTitle: "Tour categories",
    topCompaniesTitle: "Top-rated operators",
    viewAll: "View all →",
    emptyState: "No verified tour operators yet. Be the first —",
    emptyStateLink: "sign up",
  },
  search: {
    title: "Tour operators & guides catalog",
    filtersButton: "Filters",
    searchLabel: "Search",
    searchPlaceholder: "Name or description",
    region: "Region",
    category: "Tour type",
    language: "Guide language",
    price: "Price, KGS",
    from: "from",
    to: "to",
    apply: "Apply",
    reset: "Reset filters",
    all: "All",
    found: "Found",
    empty: "No results for your search. Try adjusting the filters.",
    aiTitle: "AI tour finder",
    aiSubtitle: "Describe what you're looking for — Claude will suggest matching tours.",
    aiPlaceholder: "e.g. a 5-day trek, not too difficult, staying in yurts",
    aiButton: "Find with AI",
    aiLoading: "Finding matches…",
    aiResultsTitle: "AI-matched tours",
    aiEmpty: "No good matches found. Try describing it differently.",
    aiError: "AI search failed. Please try again later.",
    aiUnavailable: "AI search is temporarily unavailable.",
  },
  company: {
    verified: "Verified",
    priceFrom: "from {price} KGS",
    about: "About",
    languages: "Languages",
    tourTypes: "Tour types",
    videos: "Video guides",
    pdfGuides: "PDF guides",
    tours: "Tours",
    photos: "Photos",
    included: "Included",
    excluded: "Not included",
    reviews: "Reviews",
    leaveReview: "Leave a review",
    whatsapp: "WhatsApp",
    call: "Call",
    email: "Email",
    instagram: "Instagram",
    noPhotos: "This operator hasn't uploaded any photos yet.",
    noVideos: "No video guides yet.",
    noPdfGuides: "No PDF guides yet.",
    noTours: "No tours added yet.",
    noReviews: "No reviews yet. Be the first!",
    reviewFormRating: "Rating",
    reviewFormName: "Your name",
    reviewFormEmail: "Email",
    reviewFormText: "Your review (optional)",
    reviewFormSubmit: "Submit",
    reviewFormCancel: "Cancel",
    reviewThanks: "Thanks for your review!",
  },
  auth: {
    loginTitle: "Log in",
    registerTitle: "Register a tour operator / guide",
    registerSubtitle:
      "After registering, your profile will be reviewed by an admin. This usually takes 1–2 business days.",
    email: "Email",
    password: "Password",
    passwordConfirm: "Confirm password",
    phone: "Phone",
    name: "Company name / guide's name",
    type: "Type",
    verificationDoc: "Verification document (license, permit, or passport)",
    verificationDocHint: "PDF, JPG or PNG, up to 10 MB.",
    loginButton: "Log in",
    registerButton: "Register",
    noAccount: "Don't have an account?",
    haveAccount: "Already have an account?",
    registerSuccessTitle: "Application submitted!",
    registerSuccessBody:
      "Your profile has been sent for moderation. Once approved by an admin, you'll get access to your dashboard. Redirecting to login…",
    wrongCredentials: "Incorrect email or password.",
    passwordMismatch: "Passwords do not match.",
    stepBasic: "Basics",
    stepContacts: "Contacts",
    stepDocs: "Documents",
    stepReview: "Review",
    next: "Next",
    back: "Back",
    reviewHint: "Check your details before submitting.",
    statusPending: "Under review",
    contactsTitle: "Contacts",
    contactsAddress: "Bishkek, Kyrgyzstan",
  },
  about: {
    title: "About the project",
    body1:
      "KyrgyzTour Hub is a platform where tour operators and independent guides in Kyrgyzstan can build a profile with photos, videos, and PDF guides, while tourists can find them through search and filters, browse media, and reach out directly via WhatsApp, phone, or email.",
    body2:
      "We verify every tour operator and guide before their profile goes live, so tourists can trust what they see in the catalog.",
  },
  contacts: { title: "Contacts" },
  reels: {
    navLabel: "Reels",
    title: "Short videos",
    subtitle: "Swipe up to see more",
    empty: "No videos yet. Check back soon!",
    viewProfile: "View operator profile",
    muted: "Muted — tap to unmute",
    tapToUnmute: "Tap for sound",
  },
  dashboard: {
    nav: {
      home: "Home",
      profile: "Settings",
      media: "Media",
      reels: "Reels",
      reviews: "Reviews",
      tours: "Tours",
      stats: "Stats",
      billing: "Plan",
      logout: "Log out",
    },
    status: {
      pending: "Under review",
      approved: "Approved",
      rejected: "Rejected",
      blocked: "Blocked",
    },
    pendingNotice: "Your profile isn't visible in the catalog yet until an admin approves your application.",
    rejectedNotice: "Application rejected",
    blockedNotice: "Your profile has been blocked by an admin and hidden from the catalog.",
    home: {
      title: "Home",
      subtitle: "An overview of your profile on the platform.",
      kpiViews: "Profile views",
      kpiReviews: "Reviews",
      kpiActiveTours: "Active tours",
      kpiTariff: "Current plan",
      chartTitle: "Views over time",
      recentReviewsTitle: "Recent reviews",
      recentReviewsEmpty: "No reviews yet.",
      viewAll: "All reviews →",
    },
    chart: {
      period7: "7 days",
      period30: "30 days",
      period90: "90 days",
    },
    reviewsPage: {
      title: "Reviews",
      subtitle: "What tourists are saying about your company. Spam moderation is handled by the platform admin.",
      empty: "No reviews yet.",
      emptyHint: "Reviews will appear here once tourists leave them on your public profile page.",
    },
    profile: {
      description: "Company description",
      descriptionPlaceholder: "Tell tourists about your company, experience, and tours…",
      region: "Operating region",
      regionNotSet: "Not set",
      languages: "Guide languages",
      categories: "Tour types",
      phone: "Phone",
      whatsapp: "WhatsApp",
      instagram: "Instagram",
      email: "Contact email",
      save: "Save",
      saving: "Saving…",
      saved: "Saved",
      errorGeneric: "Couldn't save.",
      preview: "Preview public page →",
    },
    media: {
      photosTitle: "Photos",
      photosSubtitle: "Up to {limit} photos on your plan ({tariff}), JPG/PNG/WEBP, up to 5 MB each.",
      videosTitle: "Video guides",
      videosSubtitle: "A YouTube/Vimeo link or a file (MP4/WEBM/MOV, up to 200 MB).",
      pdfTitle: "PDF guides",
      pdfSubtitle: "Routes and guides as PDF, up to 20 MB.",
      upsellPrefix: "Uploading {feature} is available on the Standard plan.",
      changeTariff: "Change plan →",
      add: "+ Add",
      uploading: "Uploading…",
      photosCount: "{count} / {limit} photos uploaded",
      videoEmbedOption: "YouTube/Vimeo link",
      videoUploadOption: "Upload a file",
      videoTitlePlaceholder: "Title (optional)",
      videoUrlPlaceholder: "https://www.youtube.com/watch?v=…",
      videoLinkLabel: "Video (link)",
      videoFileLabel: "Video (file)",
      addVideo: "Add video",
      selectFileError: "Choose a file.",
      delete: "Delete",
      pdfTitlePlaceholder: "Guide title, e.g. \"Ala-Kul route\"",
      addPdf: "Add PDF",
    },
    reels: {
      title: "Short videos (Reels)",
      subtitlePrefix: "Short vertical clips appear in the public",
      subtitleSuffix: "feed — available on every plan, up to {limit} clips, MP4/WEBM/MOV, up to 50 MB each. This is a discovery feature, not a paid one.",
      captionPlaceholder: "Caption (optional)",
      add: "Add clip",
      uploading: "Uploading…",
      limitReached: "You've reached the clip limit ({limit}). Delete an old one to add a new one.",
      empty: "No clips yet.",
      delete: "Delete",
      selectFileError: "Choose a video file.",
    },
    tours: {
      title: "Tours",
      subtitle: "Add the tours your company offers. They'll show up on your public profile page.",
      titleLabel: "Tour title",
      descriptionLabel: "Description",
      daysLabel: "Days",
      hoursLabel: "Hours",
      priceLabel: "Price, KGS",
      maxPeopleLabel: "Max people",
      includedLabel: "Included",
      includedPlaceholder: "Transport, meals, guide…",
      excludedLabel: "Not included",
      excludedPlaceholder: "Flights, insurance…",
      add: "+ Add tour",
      saving: "Saving…",
      cancel: "Cancel",
      addButton: "Add tour",
      delete: "Delete",
      daysSuffix: "days",
      hoursSuffix: "hrs",
      maxPeopleSuffix: "up to {n} people",
      empty: "No tours yet. Add your first one — it will appear on your profile page.",
      durationLabel: "Duration",
      actionsLabel: "Actions",
      photosButton: "Photos",
      photosTitle: "Tour photos",
      photosHint: "JPG, PNG or WEBP, up to 5 MB. The first photo is the cover. Up to {limit} photos.",
      photosAdd: "Add photo",
      photosUploading: "Uploading…",
      photosDelete: "Delete photo",
      photosLimit: "Photo limit reached ({limit}).",
      photosError: "Couldn't upload the photo.",
      done: "Done",
      errorGeneric: "Couldn't add the tour.",
    },
    stats: {
      title: "Stats",
      subtitle: "Profile views over the last {days} days.",
      totalViews: "Total views",
      periodViews: "Last {days} days",
      viewsSuffix: "views",
      likes: "Reels likes",
    },
    billing: {
      title: "Plan",
      subtitle: "Online payment is coming later. For now, plan changes are made manually by an admin — email us at info@kyrgyztourhub.kg.",
      free: "Free",
      currentTariff: "Current plan",
      tariffs: {
        BASIC: {
          label: "Basic",
          period: "free for the first 6 months",
          features: ["Company profile", "Up to 5 photos", "No video or PDF guides"],
        },
        STANDARD: {
          label: "Standard",
          period: "KGS/month",
          features: ["Up to 15 photos", "Video guides", "PDF guides"],
        },
        PRO: {
          label: "Pro",
          period: "KGS/month",
          features: ["Priority in search", "\"Verified\" badge", "View analytics"],
        },
      },
    },
  },
};

const dictionaries: Record<Locale, Dictionary> = { ru, ky, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries[DEFAULT_LOCALE];
}
