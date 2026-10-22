import type { Locale } from "./catalog";

const QUESTIONS: Record<string, Record<Locale, Array<[string, string]>>> = {
  websites: {
    ru: [
      [
        "Как выбрать между лендингом, сайтом компании и каталогом?",
        "Для одной услуги и одного целевого действия обычно достаточно лендинга. Для нескольких направлений и кейсов удобнее сайт компании. Для товаров с характеристиками, категориями и запросом цены нужен каталог. Начнём с того, что должен сделать ваш покупатель.",
      ],
      [
        "Что влияет на стоимость сайта?",
        "Количество страниц и языков, админ-панель, объём каталога, кабинет, оплата и интеграции. На главной можно собрать расчёт по действующим ценам. Домен, хостинг, лицензии и профессиональный перевод оплачиваются отдельно.",
      ],
      [
        "Смогу ли я менять содержимое самостоятельно?",
        "Если включить панель редактирования в состав. До начала работы решим, какие тексты, изображения и товары вы меняете сами. При передаче покажу этот маршрут; наличие панели не подразумевается в каждом базовом пакете.",
      ],
      [
        "Что останется у меня после запуска?",
        "Исходный код, согласованные доступы и инструкция. Домен и аккаунты размещения обсуждаем до запуска, чтобы вы понимали, где находится сайт и как им управлять. Поддержка и новые функции согласуются отдельно.",
      ],
      [
        "SEO входит в разработку?",
        "Базовые метаданные, доступность для поисковых роботов и карта сайта входят в техническую основу. Регулярный контент, работа с внешними упоминаниями и рекламные кампании — отдельные задачи. Сам запуск не гарантирует позиции и продажи.",
      ],
    ],
    uz: [
      [
        "Landing, kompaniya sayti yoki katalogni qanday tanlash kerak?",
        "Bitta xizmat va bitta maqsad uchun landing yetarli bo‘lishi mumkin. Bir nechta yo‘nalish va keyslar uchun kompaniya sayti, xususiyat va narx so‘rovlari bo‘lgan mahsulotlar uchun katalog qulay. Xaridorning keyingi qadamidan boshlaymiz.",
      ],
      [
        "Sayt narxiga nimalar ta’sir qiladi?",
        "Sahifa va tillar soni, panel, katalog hajmi, kabinet, to‘lov va integratsiyalar. Bosh sahifadagi kalkulyator amaldagi narxlarda hisoblaydi. Domen, hosting, litsenziya va professional tarjima alohida to‘lanadi.",
      ],
      [
        "Kontentni o‘zim o‘zgartira olamanmi?",
        "Tarkibga tahrirlash paneli qo‘shilsa, ha. Qaysi matn, surat va mahsulotlarni o‘zingiz o‘zgartirishingizni oldindan belgilaymiz va topshirishda ko‘rsatamiz. Panel har bir bazaviy paketga kirmaydi.",
      ],
      [
        "Ishga tushgandan keyin nimalar topshiriladi?",
        "Kod, kelishilgan kirishlar va yo‘riqnoma. Domen va hosting hisoblari ishga tushirishdan oldin muhokama qilinadi. Qo‘llab-quvvatlash va yangi funksiyalar alohida kelishiladi.",
      ],
      [
        "SEO ishlab chiqishga kiradimi?",
        "Metadata, qidiruv robotlariga ochiqlik va sitemap texnik asosga kiradi. Muntazam kontent, tashqi eslatmalar va reklama alohida ishlar. Saytning o‘zi pozitsiya va sotuvni kafolatlamaydi.",
      ],
    ],
    en: [
      [
        "Should I choose a landing page, business site or catalogue?",
        "A landing page suits one offer and one main action. A business site suits multiple services and case studies. A catalogue fits products with specifications, categories and quote requests. We start with the buyer's next action.",
      ],
      [
        "What changes the price?",
        "Page and language count, CMS, catalogue size, customer accounts, payments and integrations. The home-page calculator uses current prices. Domain, hosting, licences and professional translation are separate.",
      ],
      [
        "Can I edit content myself?",
        "With an editing panel included in the scope. We agree which text, images and products you need to change and walk through the process at handover. A CMS is not assumed in every base package.",
      ],
      [
        "What do I receive at launch?",
        "Source code, agreed access and a handover guide. Domain and hosting accounts are discussed before launch so you know where the site runs and how to manage it. Support and new features are separate scope.",
      ],
      [
        "Is SEO included?",
        "Metadata, crawlability and a sitemap form the technical foundation. Ongoing content, external mentions and advertising are separate tasks. Launch alone does not guarantee rankings or sales.",
      ],
    ],
  },
  "crm-automation": {
    ru: [
      [
        "Это готовая CRM или разработка под заказ?",
        "Предложение относится к разработке под ваш процесс. Сначала проверяем, можно ли решить задачу настройкой существующих инструментов. Если нужна своя система, начинаем с ограниченного пилота, а не обещания заменить весь бизнес за одну цену.",
      ],
      [
        "Что входит в пилот от 8 000 000 сум?",
        "Один процесс, до пяти сотрудников, карточки клиентов, статусы и задачи, две роли доступа и один базовый отчёт. Срок и смета фиксируются после описания процесса. Миграция, сложные интеграции и новые процессы оцениваются отдельно.",
      ],
      [
        "Как убедиться, что система подходит до расширения?",
        "Согласуем рабочие сценарии: кто создаёт клиента, меняет статус, назначает задачу и смотрит отчёт. Показываем пилот на этих сценариях, собираем замечания и принимаем ограниченный этап до следующего.",
      ],
      [
        "Можно перенести данные из Excel и Telegram?",
        "Структурированную таблицу можно оценить после просмотра колонок, связей и качества данных. Историю переписки нельзя автоматически считать готовой базой. Правила переноса, доступы и проверку результата согласуем до работ.",
      ],
    ],
    uz: [
      [
        "Bu tayyor CRMmi yoki buyurtma asosidagi tizimmi?",
        "Taklif jarayoningizga mos ishlab chiqish haqida. Avval mavjud vositalarni sozlash yetarlimi, tekshiramiz. O‘z tizimingiz kerak bo‘lsa, butun biznesni bir narxda almashtirishdan emas, cheklangan pilotdan boshlaymiz.",
      ],
      [
        "8 000 000 so‘mdan pilotga nima kiradi?",
        "Bitta jarayon, beshtagacha xodim, mijoz kartochkalari, statuslar va vazifalar, ikki rol va bitta asosiy hisobot. Muddat va smeta jarayon tavsifidan keyin belgilanadi. Migratsiya va murakkab integratsiyalar alohida.",
      ],
      [
        "Kengaytirishdan oldin mosligini qanday tekshiramiz?",
        "Kim mijoz yaratishi, status o‘zgartirishi, vazifa berishi va hisobot ko‘rishini kelishamiz. Pilot shu ssenariylarda ko‘rsatiladi va keyingi bosqichdan oldin qabul qilinadi.",
      ],
      [
        "Excel va Telegram ma’lumotlarini ko‘chirish mumkinmi?",
        "Jadval ustunlari, bog‘lanishlar va sifatini ko‘rib baholaymiz. Yozishma tarixini tayyor baza deb bo‘lmaydi. Ko‘chirish qoidalari, kirishlar va natijani tekshirish oldindan kelishiladi.",
      ],
    ],
    en: [
      [
        "Is this a ready-made CRM or custom development?",
        "This offer covers development around your workflow. We first check whether existing tools can solve the problem. If custom software is needed, we start with a limited pilot rather than promising a whole-business replacement at one price.",
      ],
      [
        "What does the pilot from UZS 8,000,000 include?",
        "One process, up to five employees, customer records, stages and tasks, two access roles and one basic report. Scope and timeline follow a process review. Migration, complex integrations and additional processes are separate.",
      ],
      [
        "How do we validate it before expansion?",
        "Agree the scenarios: who creates a customer, changes a stage, assigns a task and reads a report. Demonstrate the pilot on those scenarios, collect feedback and accept the limited stage before expanding.",
      ],
      [
        "Can data move from Excel and Telegram?",
        "A structured spreadsheet can be estimated after reviewing columns, relationships and quality. Message history is not automatically a clean database. Migration rules, access and reconciliation are agreed first.",
      ],
    ],
  },
  "telegram-bots": {
    ru: [
      [
        "Что входит в бота от 2 500 000 сум?",
        "Один сценарий до восьми шагов на одном языке: меню, вопросы, контакты клиента и уведомление менеджеру. Развёртывание и инструкция входят. Оплата, личный кабинет, AI и связь с CRM — отдельный согласованный объём.",
      ],
      [
        "Куда будут приходить заявки?",
        "В согласованный Telegram-чат ответственного. До сдачи проверим маршрут от первого сообщения клиента до получения заявки. Если нужен перенос в CRM, заранее проверим доступные API и обработку ошибок.",
      ],
      [
        "Бот сможет принимать оплату и оформлять документы?",
        "Такие сценарии возможны после уточнения провайдера, документов и правил бизнеса. В кейсе Poj Pro показан бот договоров; это отдельная разработка, а не функция любого базового бота.",
      ],
      [
        "Что подготовить перед разработкой?",
        "Опишите цель, вопросы клиенту и ожидаемую заявку. Пришлите тексты, список услуг и укажите, кто отвечает. Сначала согласуем схему диалога, затем реализацию и проверку; ориентир базового сценария — 5–10 рабочих дней после материалов.",
      ],
    ],
    uz: [
      [
        "2 500 000 so‘mdan botga nima kiradi?",
        "Bitta tilda sakkiz qadamgacha bitta ssenariy: menyu, savollar, mijoz kontaktlari va menejerga xabar. Ishga tushirish va yo‘riqnoma kiradi. To‘lov, kabinet, AI va CRM alohida kelishiladi.",
      ],
      [
        "Arizalar qayerga keladi?",
        "Mas’ulning kelishilgan Telegram chatiga. Topshirishdan oldin mijozning birinchi xabaridan ariza yetib kelishigacha tekshiramiz. CRM kerak bo‘lsa, API va xatolarni qayta ishlash oldindan ko‘riladi.",
      ],
      [
        "Bot to‘lov qabul qilib, hujjat tayyorlay oladimi?",
        "Provayder, hujjat va biznes qoidalari aniqlangandan keyin mumkin. Poj Pro keysida shartnoma boti bor; bu alohida ishlab chiqish, har bir bazaviy bot funksiyasi emas.",
      ],
      [
        "Boshlash uchun nima tayyorlash kerak?",
        "Maqsad, mijozga savollar va kutilayotgan arizani yozing. Matnlar, xizmatlar va mas’ulni ko‘rsating. Avval dialog sxemasi kelishiladi, keyin ishlab chiqish va tekshirish. Bazaviy ssenariy uchun yo‘nalish — materiallardan keyin 5–10 ish kuni.",
      ],
    ],
    en: [
      [
        "What does a bot from UZS 2,500,000 include?",
        "One flow with up to eight steps in one language: menu, questions, customer contacts and a manager notification. Deployment and instructions are included. Payments, accounts, AI and CRM connections require separate scope.",
      ],
      [
        "Where do enquiries arrive?",
        "In the responsible person's agreed Telegram chat. Before handover we test the route from the first customer message to delivery. CRM integration requires an API and error-handling review first.",
      ],
      [
        "Can the bot accept payments and generate documents?",
        "After clarifying the provider, documents and business rules. The Poj Pro case shows a contract bot; this is separate development, not a feature included with every base bot.",
      ],
      [
        "What should I prepare?",
        "Describe the goal, questions and expected enquiry. Share copy, services and the responsible contact. We agree the dialogue flow before implementation and testing. Allow approximately 5–10 working days for the basic flow after materials are ready.",
      ],
    ],
  },
};

export function serviceQuestions(slug: string, locale: Locale) {
  return Object.hasOwn(QUESTIONS, slug) ? QUESTIONS[slug]?.[locale] : undefined;
}
