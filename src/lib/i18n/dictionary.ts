import { DEFAULT_LOCALE, Locale } from "./locales";

export type Dictionary = {
  nav: {
    catalog: string;
    about: string;
    contacts: string;
    login: string;
    forCompanies: string;
    account: string;
    admin: string;
    logout: string;
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
    about: string;
    languages: string;
    tourTypes: string;
    videos: string;
    pdfGuides: string;
    tours: string;
    included: string;
    excluded: string;
    reviews: string;
    leaveReview: string;
    whatsapp: string;
    call: string;
    email: string;
    instagram: string;
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
  };
  about: { title: string; body1: string; body2: string };
  contacts: { title: string };
};

const ru: Dictionary = {
  nav: {
    catalog: "Каталог",
    about: "О проекте",
    contacts: "Контакты",
    login: "Войти",
    forCompanies: "Для турфирм",
    account: "Кабинет",
    admin: "Админ",
    logout: "Выйти",
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
    aiTitle: "🤖 AI-подбор тура",
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
    about: "О компании",
    languages: "Языки",
    tourTypes: "Типы туров",
    videos: "Видео-гиды",
    pdfGuides: "PDF-гиды",
    tours: "Туры",
    included: "Включено",
    excluded: "Не включено",
    reviews: "Отзывы",
    leaveReview: "Оставить отзыв",
    whatsapp: "WhatsApp",
    call: "Позвонить",
    email: "Email",
    instagram: "Instagram",
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
  },
  about: {
    title: "О проекте",
    body1:
      "KyrgyzTour Hub — платформа, где турфирмы и частные гиды Кыргызстана могут создать профиль с фото, видео и PDF-гидами, а туристы — находить их через поиск и фильтры, изучать медиа-контент и связываться напрямую по WhatsApp, телефону или email.",
    body2:
      "Мы верифицируем каждую турфирму и гида перед публикацией профиля, чтобы турист мог доверять информации в каталоге.",
  },
  contacts: { title: "Контакты" },
};

const ky: Dictionary = {
  nav: {
    catalog: "Каталог",
    about: "Долбоор жөнүндө",
    contacts: "Байланыш",
    login: "Кирүү",
    forCompanies: "Турфирмалар үчүн",
    account: "Кабинет",
    admin: "Админ",
    logout: "Чыгуу",
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
    aiTitle: "🤖 AI менен тур тандоо",
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
    about: "Компания жөнүндө",
    languages: "Тилдер",
    tourTypes: "Тур түрлөрү",
    videos: "Видео гиддер",
    pdfGuides: "PDF гиддер",
    tours: "Турлар",
    included: "Кирет",
    excluded: "Кирбейт",
    reviews: "Пикирлер",
    leaveReview: "Пикир калтыруу",
    whatsapp: "WhatsApp",
    call: "Чалуу",
    email: "Email",
    instagram: "Instagram",
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
  },
  about: {
    title: "Долбоор жөнүндө",
    body1:
      "KyrgyzTour Hub — Кыргызстандын турфирмалары жана жеке гиддери сүрөт, видео жана PDF гиддер менен профиль түзө турган, ал эми туристтер аларды издөө жана чыпкалар аркылуу таап, медиа-мазмунду көрүп, WhatsApp, телефон же email аркылуу түз байланыша турган платформа.",
    body2:
      "Биз ар бир турфирманы жана гидди профиль жарыяланганга чейин текшеребиз, ошондуктан турист каталогдогу маалыматка ишене алат.",
  },
  contacts: { title: "Байланыш" },
};

const en: Dictionary = {
  nav: {
    catalog: "Catalog",
    about: "About",
    contacts: "Contacts",
    login: "Log in",
    forCompanies: "For tour operators",
    account: "Dashboard",
    admin: "Admin",
    logout: "Log out",
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
    aiTitle: "🤖 AI tour finder",
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
    about: "About",
    languages: "Languages",
    tourTypes: "Tour types",
    videos: "Video guides",
    pdfGuides: "PDF guides",
    tours: "Tours",
    included: "Included",
    excluded: "Not included",
    reviews: "Reviews",
    leaveReview: "Leave a review",
    whatsapp: "WhatsApp",
    call: "Call",
    email: "Email",
    instagram: "Instagram",
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
  },
  about: {
    title: "About the project",
    body1:
      "KyrgyzTour Hub is a platform where tour operators and independent guides in Kyrgyzstan can build a profile with photos, videos, and PDF guides, while tourists can find them through search and filters, browse media, and reach out directly via WhatsApp, phone, or email.",
    body2:
      "We verify every tour operator and guide before their profile goes live, so tourists can trust what they see in the catalog.",
  },
  contacts: { title: "Contacts" },
};

const dictionaries: Record<Locale, Dictionary> = { ru, ky, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries[DEFAULT_LOCALE];
}
