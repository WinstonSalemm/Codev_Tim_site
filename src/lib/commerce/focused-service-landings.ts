import type { ServiceLanding } from "./service-landings";

export const FOCUSED_SERVICE_LANDINGS: Record<string, ServiceLanding> = {
  "landing-page": {
    slug: "landing-page",
    preset: "landing",
    offerIds: ["landing"],
    seoTitle: {
      ru: "Создание лендинга в Ташкенте — стоимость и состав",
      uz: "Toshkentda landing yaratish — narx va ish tarkibi",
      en: "Landing page development in Tashkent — pricing and scope",
    },
    title: {
      ru: "Лендинг для одной услуги или продукта",
      uz: "Bitta xizmat yoki mahsulot uchun landing",
      en: "A landing page for one service or product",
    },
    description: {
      ru: "Заказать лендинг в Ташкенте: от 3 000 000 сум, до 8 блоков, форма заявки и Telegram. Состав, сроки, примеры работ и расчёт до начала разработки.",
      uz: "Toshkentda landing: 3 000 000 so‘mdan, 8 tagacha blok, ariza shakli va Telegram. Ish tarkibi, muddat, misollar va dastlabki hisob.",
      en: "Landing pages in Tashkent from UZS 3,000,000: up to eight sections, enquiry form and Telegram. See scope, delivery steps and real project examples.",
    },
    lead: {
      ru: "Если вы продвигаете одну услугу, посетителю не нужен большой сайт. Ему нужно понять предложение, увидеть доказательства и легко связаться с вами. Соберу этот маршрут на одной странице — с возможностью позже подключить Google Ads.",
      uz: "Bitta xizmatni taklif qilsangiz, mijozga katta sayt shart emas. U taklifni tushunishi, dalillarni ko‘rishi va oson bog‘lanishi kerak. Bu yo‘lni bitta sahifada quraman; keyin Google Ads ulash mumkin.",
      en: "For one offer, visitors need a clear explanation, proof and an easy way to contact you. I build that journey on one page, with room to connect Google Ads later.",
    },
    audienceTitle: {
      ru: "Когда достаточно лендинга",
      uz: "Qachon landing yetarli",
      en: "When a landing page fits",
    },
    audience: {
      ru: [
        "Одна основная услуга: обучение, ремонт, консультация или другой конкретный заказ.",
        "Запуск нового продукта: нужно объяснить его и принимать обращения до большого сайта.",
        "Трафик из Telegram, Instagram или будущей рекламы нужно вести на одно предложение с понятной ценой.",
      ],
      uz: [
        "Bitta asosiy xizmat: ta’lim, ta’mirlash, maslahat yoki boshqa aniq buyurtma.",
        "Yangi mahsulotni tanishtirish va katta saytdan oldin murojaatlarni qabul qilish.",
        "Telegram, Instagram yoki kelajakdagi reklamadan bitta aniq taklifga olib kelish.",
      ],
      en: [
        "One main service such as training, repairs or consulting.",
        "A new product that needs an explanation and enquiry capture before a larger site.",
        "Visitors from Telegram, Instagram or future ads need one focused offer.",
      ],
    },
    deliverablesTitle: {
      ru: "Что будет на вашей странице",
      uz: "Sahifangizda nimalar bo‘ladi",
      en: "What your page includes",
    },
    deliverables: {
      ru: [
        "До 8 блоков: предложение, кому подходит, состав, цена, доказательства, ответы на вопросы и контакты.",
        "Один язык, адаптация под телефон и компьютер, два круга согласованных правок.",
        "Форма заявки с доставкой ответственному в Telegram, ссылки на звонок и переписку.",
        "Title, описание, sitemap, robots.txt и основной адрес страницы для Google.",
        "Запуск на вашем домене, исходный код, доступы и инструкция.",
      ],
      uz: [
        "8 tagacha blok: taklif, kimga mosligi, tarkib, narx, dalillar, savollar va kontaktlar.",
        "Bitta til, telefon va kompyuterga moslashuv, kelishilgan ikki bosqich tuzatish.",
        "Arizani mas’ulga Telegram orqali yetkazish, qo‘ng‘iroq va yozishma havolalari.",
        "Google uchun title, tavsif, sitemap, robots.txt va asosiy sahifa manzili.",
        "Domeningizda ishga tushirish, kod, kirishlar va yo‘riqnoma.",
      ],
      en: [
        "Up to eight sections covering offer, fit, scope, price, proof, questions and contact.",
        "One language, mobile and desktop layouts, and two agreed revision rounds.",
        "Enquiry delivery to the responsible person in Telegram, plus call and messaging links.",
        "Search title, description, sitemap, robots.txt and a canonical page URL.",
        "Launch on your domain, source code, access and a handover guide.",
      ],
    },
    boundaries: {
      ru: [
        "Домен, хостинг, платные сервисы и подготовка переводов оплачиваются отдельно.",
        "Каталог, онлайн-оплата, личный кабинет и редактирование через админку — дополнительные задачи.",
        "Счётчик GA4 и события для лендинга добавляются отдельно в расчёте. Рекламный бюджет и ведение рекламы в разработку не входят.",
        "Ориентир 5–7 рабочих дней — после получения материалов и согласования структуры.",
      ],
      uz: [
        "Domen, hosting, pullik servislar va tarjimalar alohida to‘lanadi.",
        "Katalog, onlayn to‘lov, shaxsiy kabinet va boshqaruv paneli qo‘shimcha vazifalardir.",
        "Landing uchun GA4 va hodisalar hisobga alohida qo‘shiladi. Reklama budjeti va reklamani yuritish kirmaydi.",
        "Yo‘nalish: materiallar va tuzilma kelishilgandan keyin 5–7 ish kuni.",
      ],
      en: [
        "Domain, hosting, paid services and translations are separate.",
        "A catalogue, online payments, customer accounts and a CMS require additional scope.",
        "GA4 and event tracking for a landing page are optional additions. Ad spend and campaign management are separate.",
        "Allow approximately 5–7 working days after materials and structure are agreed.",
      ],
    },
    proofTitle: {
      ru: "Пример подхода к заявкам: Poj Pro",
      uz: "Arizalar bilan ishlash misoli: Poj Pro",
      en: "Enquiry journey example: Poj Pro",
    },
    proof: {
      ru: "В клиентском проекте Poj Pro реализованы каталог, карточки товаров, формы и администрирование. Это более крупный сайт, а не пример лендинга за базовую цену. В кейсе можно посмотреть настоящие экраны и состав работы.",
      uz: "Poj Pro loyihasida katalog, mahsulot sahifalari, shakllar va boshqaruv yaratilgan. Bu bazaviy landing emas, kattaroq sayt. Keysda haqiqiy ekranlar va ish tarkibi bor.",
      en: "Poj Pro includes a catalogue, product pages, enquiry forms and administration. It is a larger website, not an example of a base-price landing page. The case shows actual screens and delivered scope.",
    },
    proofHref: "/projects/poj-pro-site",
    questions: {
      ru: [
        [
          "Что нужно прислать для оценки?",
          "Расскажите, что продаёте, кому и какое действие ждёте от посетителя. Пришлите имеющиеся тексты, логотип и 1–2 примера. Готовое техническое задание не обязательно.",
        ],
        [
          "Лендинг сразу начнёт приводить клиентов?",
          "После запуска нужен источник посетителей: поиск, рекомендации, соцсети или реклама. Страница помогает превратить интерес в обращение; гарантировать продажи без проверки спроса и предложения нельзя.",
        ],
        [
          "Можно начать без рекламы?",
          "Да. Страницу можно использовать в переписке, профилях и публикациях. Для Google подготовим техническую основу; органическая видимость растёт постепенно и требует полезного содержания и внешних упоминаний.",
        ],
        [
          "Как потом подключить Google Ads?",
          "Перед рекламой согласуем целевую аудиторию, проверим события форм и контактов и подключим нужный рекламный аккаунт. Это отдельный этап; рекламный бюджет не входит в цену страницы.",
        ],
      ],
      uz: [
        [
          "Baholash uchun nima yuborish kerak?",
          "Nima sotishingiz, kimga va mijozdan qanday amal kutishingizni yozing. Mavjud matn, logotip va 1–2 misol yetarli. Tayyor texnik topshiriq shart emas.",
        ],
        [
          "Landing darhol mijoz olib keladimi?",
          "Qidiruv, tavsiyalar, ijtimoiy tarmoq yoki reklamadan tashrifchilar kerak. Sahifa qiziqishni murojaatga aylantirishga yordam beradi; sotuv kafolatlanmaydi.",
        ],
        [
          "Reklamasiz boshlash mumkinmi?",
          "Ha. Havolani yozishma, profil va postlarda ishlatish mumkin. Google uchun texnik asos tayyorlanadi, organik ko‘rinish esa vaqt, foydali kontent va tashqi eslatmalarni talab qiladi.",
        ],
        [
          "Keyin Google Ads qanday ulanadi?",
          "Avval auditoriya, shakl va kontakt hodisalarini tekshiramiz, keyin kerakli reklama hisobini ulaymiz. Bu alohida bosqich, reklama budjeti sahifa narxiga kirmaydi.",
        ],
      ],
      en: [
        [
          "What do you need for an estimate?",
          "Tell me what you sell, who it is for and what action visitors should take. Share existing copy, a logo and one or two references. A finished specification is optional.",
        ],
        [
          "Will it bring customers immediately?",
          "You still need visitors from search, referrals, social media or advertising. The page helps turn interest into an enquiry; sales cannot be guaranteed without testing demand and the offer.",
        ],
        [
          "Can I launch without ads?",
          "Yes. Use the page in messages, profiles and posts. The technical search foundation is included; organic visibility takes useful content, external mentions and time.",
        ],
        [
          "How can I add Google Ads later?",
          "We first agree the audience, verify form and contact events, then connect the appropriate advertising account. This is a separate stage, and ad spend is not part of development.",
        ],
      ],
    },
  },
  "catalog-website": {
    slug: "catalog-website",
    preset: "catalog",
    offerIds: ["corporate"],
    seoTitle: {
      ru: "Создание сайта-каталога в Ташкенте для B2B-компаний",
      uz: "Toshkentda B2B biznes uchun katalog sayt yaratish",
      en: "B2B catalogue website development in Tashkent",
    },
    title: {
      ru: "Сайт-каталог: от поиска товара до запроса цены",
      uz: "Katalog sayt: mahsulot qidirishdan narx so‘rovigacha",
      en: "A catalogue that takes buyers from product search to a quote",
    },
    description: {
      ru: "Разработка сайта-каталога в Ташкенте: категории, до 20 товаров, поиск, фильтры и заявки. Базовый расчёт от 7 000 000 сум. Реальный кейс Poj Pro.",
      uz: "Toshkentda katalog sayt: kategoriyalar, 20 tagacha mahsulot, qidiruv, filtrlar va arizalar. Bazaviy hisob 7 000 000 so‘mdan. Poj Pro haqiqiy keysi.",
      en: "Catalogue websites in Tashkent with categories, up to 20 products, search, filters and enquiries. Base estimate from UZS 7,000,000. See the Poj Pro case.",
    },
    lead: {
      ru: "Для поставщиков оборудования, оптовых компаний и производителей, которым сначала нужно обсудить цену, наличие и комплектацию. Покупатель находит подходящий товар и отправляет запрос, а менеджер получает предметное обращение.",
      uz: "Avval narx, mavjudlik va komplektatsiyani muhokama qiladigan uskuna yetkazib beruvchi, ulgurji kompaniya va ishlab chiqaruvchilar uchun. Xaridor mahsulotni topadi va aniq so‘rov yuboradi.",
      en: "For equipment suppliers, wholesalers and manufacturers who discuss price, availability and specifications before taking payment. Buyers find the right item and send a specific enquiry to your team.",
    },
    audienceTitle: {
      ru: "Каталог или интернет-магазин?",
      uz: "Katalogmi yoki internet do‘kon?",
      en: "Catalogue or online store?",
    },
    audience: {
      ru: [
        "Каталог подходит, если цена зависит от объёма, условий поставки или комплектации.",
        "Товаров и характеристик больше, чем удобно показывать в постах и PDF-прайсе.",
        "Интернет-магазин нужен, если клиент должен сам собрать корзину и оплатить. Корзина и платёжная интеграция рассчитываются отдельно.",
      ],
      uz: [
        "Narx hajm, yetkazish shartlari yoki komplektatsiyaga bog‘liq bo‘lsa, katalog mos keladi.",
        "Mahsulot va xususiyatlar post yoki PDF praysga sig‘maydi.",
        "Xaridor savat yig‘ib o‘zi to‘lashi kerak bo‘lsa, internet do‘kon kerak. Savat va to‘lov integratsiyasi alohida hisoblanadi.",
      ],
      en: [
        "Choose a catalogue when price depends on volume, delivery terms or configuration.",
        "Your products and specifications have outgrown social posts and PDF price lists.",
        "Choose an online store when buyers need a cart and checkout. Cart and payment integration are priced separately.",
      ],
    },
    deliverablesTitle: {
      ru: "Что входит в базовый расчёт",
      uz: "Bazaviy hisobga nimalar kiradi",
      en: "What the base estimate includes",
    },
    deliverables: {
      ru: [
        "Сайт компании до 5 страниц на одном языке и каталог до 20 подготовленных позиций.",
        "Категории, карточки, поиск и согласованные фильтры по характеристикам.",
        "Заявки, контакты и адаптация для телефона и компьютера.",
        "Базовая SEO-структура и аналитика обращений; отдельные адреса карточек для поиска.",
        "Запуск, два круга согласованных правок, передача кода и доступов.",
      ],
      uz: [
        "Bitta tilda 5 tagacha sahifali kompaniya sayti va 20 tagacha tayyor mahsulot katalogi.",
        "Kategoriyalar, kartochkalar, qidiruv va kelishilgan xususiyat filtrlari.",
        "Arizalar, kontaktlar, telefon va kompyuterga moslashuv.",
        "SEO asoslari, murojaatlar analitikasi va mahsulotlar uchun alohida manzillar.",
        "Ishga tushirish, kelishilgan ikki bosqich tuzatish, kod va kirishlarni topshirish.",
      ],
      en: [
        "A business site with up to five pages in one language, plus up to 20 prepared products.",
        "Categories, product pages, search and agreed specification filters.",
        "Enquiry forms, contact options and mobile and desktop layouts.",
        "Search foundations, enquiry analytics and individual product URLs.",
        "Launch, two agreed revision rounds, source code and access handover.",
      ],
    },
    boundaries: {
      ru: [
        "7 000 000 сум = сайт компании 5 500 000 + каталог 1 500 000. Показанный расчёт использует те же цены, что и калькулятор.",
        "Админ-панель каталога, дополнительные языки и объём свыше 20 товаров добавляются отдельно.",
        "Импорт — из подготовленной таблицы. Очистку данных, фотографии и описание характеристик согласуем до сметы.",
        "Домен, хостинг, лицензии, корзина, онлайн-оплата и синхронизация с учётной системой не входят в базовый состав.",
        "Ориентир для базового сайта компании: 10–15 рабочих дней; срок каталога фиксируем после проверки товаров и фильтров.",
      ],
      uz: [
        "7 000 000 so‘m = kompaniya sayti 5 500 000 + katalog 1 500 000. Hisob kalkulyator narxlariga asoslanadi.",
        "Katalog paneli, qo‘shimcha tillar va 20 dan ortiq mahsulot alohida qo‘shiladi.",
        "Import tayyor jadvaldan. Ma’lumotni tozalash, surat va xususiyat tavsiflarini oldindan kelishamiz.",
        "Domen, hosting, litsenziya, savat, to‘lov va hisob tizimi bilan sinxronlash bazaga kirmaydi.",
        "Kompaniya sayti uchun yo‘nalish: 10–15 ish kuni; katalog muddati mahsulot va filtrlardan keyin belgilanadi.",
      ],
      en: [
        "UZS 7,000,000 = UZS 5,500,000 business site + UZS 1,500,000 catalogue, using the calculator's prices.",
        "Catalogue administration, extra languages and more than 20 products are additional scope.",
        "Imports use a prepared spreadsheet. Data cleanup, photography and specification writing are agreed before pricing.",
        "Domain, hosting, licences, cart, payments and stock-system synchronisation are not included.",
        "The business-site baseline is approximately 10–15 working days; catalogue delivery is agreed after reviewing products and filters.",
      ],
    },
    proofTitle: {
      ru: "Реальный клиентский каталог: Poj Pro",
      uz: "Haqiqiy mijoz katalogi: Poj Pro",
      en: "A real client catalogue: Poj Pro",
    },
    proof: {
      ru: "Каталог противопожарного оборудования с поиском, карточками, заявками, админ-панелью и тремя языками. В кейсе — настоящие экраны публичной части и управления. Этот расширенный состав не выдаётся за базовый пакет.",
      uz: "Yong‘inga qarshi uskunalar katalogi: qidiruv, mahsulotlar, arizalar, panel va uch til. Keysda sayt va boshqaruvning haqiqiy ekranlari bor. Kengaytirilgan tarkib bazaviy paket sifatida ko‘rsatilmaydi.",
      en: "A fire-safety equipment catalogue with search, product pages, enquiries, administration and three languages. The case shows actual public and admin screens. This extended scope is not presented as the base package.",
    },
    proofHref: "/projects/poj-pro-site",
    questions: {
      ru: [
        [
          "С чего начать оценку каталога?",
          "Пришлите 5–10 примеров товаров: название, фото, характеристики и категории. Укажите общее количество позиций, языки и способ получения заявок. По ним определим структуру и смету.",
        ],
        [
          "Смогу ли я сам менять товары?",
          "Да, если включить админ-панель каталога в состав. В базовом расчёте она не включена. Перед передачей покажу, как менять карточки, фотографии и характеристики.",
        ],
        [
          "Можно подключить остатки и цены из учётной системы?",
          "Да, после проверки системы, документации API и правил обмена. Объём, частоту и обработку ошибок фиксируем отдельно; универсальная синхронизация не входит в базовую цену.",
        ],
        [
          "Будут ли товары находиться в Google?",
          "У карточек будут отдельные адреса и техническая основа для поиска. Индексацию и позиции выбирает Google; важны уникальные описания, характеристики, ссылки и полезность страниц.",
        ],
      ],
      uz: [
        [
          "Katalogni baholashni nimadan boshlash kerak?",
          "5–10 ta mahsulot misolini yuboring: nom, surat, xususiyat va kategoriya. Umumiy miqdor, tillar va ariza kanalini yozing. Shu asosda tuzilma va smetani belgilaymiz.",
        ],
        [
          "Mahsulotlarni o‘zim o‘zgartira olamanmi?",
          "Ha, katalog paneli tarkibga qo‘shilsa. Bazaviy hisobda u yo‘q. Topshirishda kartochka, surat va xususiyatlarni tahrirlashni ko‘rsataman.",
        ],
        [
          "Narx va qoldiqlarni hisob tizimidan ulash mumkinmi?",
          "Tizim, API hujjatlari va almashinuv qoidalari tekshirilgandan keyin mumkin. Hajm, chastota va xatolarni qayta ishlash alohida kelishiladi.",
        ],
        [
          "Mahsulotlar Google’da topiladimi?",
          "Kartochkalar alohida manzil va qidiruv asosiga ega bo‘ladi. Indeks va pozitsiyani Google tanlaydi; noyob tavsif, xususiyatlar va foydali kontent muhim.",
        ],
      ],
      en: [
        [
          "What do you need to estimate a catalogue?",
          "Send five to ten sample products with names, photos, specifications and categories. Include the total count, languages and enquiry channel so we can agree structure and scope.",
        ],
        [
          "Can I edit products myself?",
          "Yes, with the optional catalogue admin panel. It is not included in the base estimate. Handover includes a walkthrough of product, photo and specification editing.",
        ],
        [
          "Can stock and prices sync with my existing system?",
          "After reviewing the system, API documentation and exchange rules. Volume, frequency and error handling are separate agreed scope, not a universal base-price integration.",
        ],
        [
          "Will products appear in Google?",
          "Product pages receive individual URLs and search foundations. Google chooses indexing and rankings; original descriptions, specifications, links and useful pages still matter.",
        ],
      ],
    },
  },
};
