"use client";

import { useState } from "react";
import type { Locale } from "@/lib/commerce/catalog";

const COPY = {
  ru: {
    eyebrow: "04 / Инженерия",
    title: "За каждым экраном — связанный процесс.",
    lead: "Сначала определяю, как человек решает задачу. Затем — какие данные, правила и интеграции нужны на каждом шаге.",
    group: "Выберите процесс",
    models: ["Каталог", "Бизнес-система", "Telegram-бот"],
    note: "Схема процесса · конкретный состав определяется задачей",
    flows: [
      [
        [
          "01",
          "Найти товар",
          "Категории, поиск и фильтры сокращают путь к нужной позиции.",
        ],
        [
          "02",
          "Собрать запрос",
          "Товар, количество и контакт объединяются в одну заявку.",
        ],
        [
          "03",
          "Проверить данные",
          "Обязательные поля и формат контакта проверяются до отправки.",
        ],
        [
          "04",
          "Передать менеджеру",
          "Заявка доставляется по согласованному каналу. Ошибка отправки остаётся видимой.",
        ],
      ],
      [
        [
          "01",
          "Зафиксировать сделку",
          "Клиент, ответственный и следующий шаг доступны в одном месте.",
        ],
        [
          "02",
          "Применить правила",
          "Права доступа и переходы между статусами определяют рабочий процесс.",
        ],
        [
          "03",
          "Связать документы",
          "Договор и операции ссылаются на общую запись сделки.",
        ],
        [
          "04",
          "Проверить результат",
          "Отчёт показывает состояние процесса и помогает найти расхождения.",
        ],
      ],
      [
        [
          "01",
          "Начать диалог",
          "Понятное меню ведёт пользователя к конкретному действию.",
        ],
        [
          "02",
          "Собрать ответы",
          "Бот последовательно получает нужные данные и позволяет исправить ввод.",
        ],
        [
          "03",
          "Обработать запрос",
          "Сценарий проверяет ответы и обращается к нужному сервису.",
        ],
        [
          "04",
          "Вернуть результат",
          "Пользователь получает подтверждение, документ или следующий шаг.",
        ],
      ],
    ],
  },
  uz: {
    eyebrow: "04 / Muhandislik",
    title: "Har bir ekran ortida bog‘langan jarayon bor.",
    lead: "Avval inson vazifani qanday hal qilishini aniqlayman. So‘ng har bir bosqich uchun ma’lumotlar, qoidalar va integratsiyalarni belgilayman.",
    group: "Jarayonni tanlang",
    models: ["Katalog", "Biznes tizimi", "Telegram-bot"],
    note: "Jarayon sxemasi · aniq tarkib vazifaga bog‘liq",
    flows: [
      [
        [
          "01",
          "Mahsulotni topish",
          "Toifalar, qidiruv va filtrlar kerakli mahsulotga yo‘lni qisqartiradi.",
        ],
        [
          "02",
          "So‘rov tuzish",
          "Mahsulot, miqdor va kontakt bitta so‘rovga yig‘iladi.",
        ],
        [
          "03",
          "Ma’lumotni tekshirish",
          "Majburiy maydonlar va kontakt formati yuborishdan oldin tekshiriladi.",
        ],
        [
          "04",
          "Menejerga yetkazish",
          "So‘rov kelishilgan kanalga yetkaziladi. Yuborish xatosi ko‘rinib turadi.",
        ],
      ],
      [
        [
          "01",
          "Bitimni qayd etish",
          "Mijoz, mas’ul va keyingi qadam bitta joyda ko‘rinadi.",
        ],
        [
          "02",
          "Qoidalarni qo‘llash",
          "Kirish huquqlari va holat o‘zgarishlari ish jarayonini belgilaydi.",
        ],
        [
          "03",
          "Hujjatlarni bog‘lash",
          "Shartnoma va operatsiyalar umumiy bitimga bog‘lanadi.",
        ],
        [
          "04",
          "Natijani tekshirish",
          "Hisobot jarayon holatini ko‘rsatadi va tafovutlarni topishga yordam beradi.",
        ],
      ],
      [
        [
          "01",
          "Suhbatni boshlash",
          "Tushunarli menyu foydalanuvchini kerakli harakatga olib boradi.",
        ],
        [
          "02",
          "Javoblarni yig‘ish",
          "Bot kerakli ma’lumotlarni ketma-ket oladi va tuzatishga imkon beradi.",
        ],
        [
          "03",
          "So‘rovni qayta ishlash",
          "Ssenariy javoblarni tekshiradi va kerakli xizmatga murojaat qiladi.",
        ],
        [
          "04",
          "Natijani qaytarish",
          "Foydalanuvchi tasdiq, hujjat yoki keyingi qadamni oladi.",
        ],
      ],
    ],
  },
  en: {
    eyebrow: "04 / Engineering",
    title: "Every screen connects to a process.",
    lead: "First, I map how a person completes the task. Then I define the data, rules and integrations needed at each step.",
    group: "Select a workflow",
    models: ["Catalogue", "Business system", "Telegram bot"],
    note: "Workflow illustration · the actual scope depends on the task",
    flows: [
      [
        [
          "01",
          "Find a product",
          "Categories, search and filters shorten the path to a relevant item.",
        ],
        [
          "02",
          "Build an enquiry",
          "The product, quantity and contact become a single request.",
        ],
        [
          "03",
          "Validate the data",
          "Required fields and contact format are checked before delivery.",
        ],
        [
          "04",
          "Reach the team",
          "The enquiry reaches the agreed channel. Delivery errors stay visible.",
        ],
      ],
      [
        [
          "01",
          "Record the deal",
          "The customer, owner and next action live in one place.",
        ],
        [
          "02",
          "Apply the rules",
          "Access permissions and status transitions define the workflow.",
        ],
        [
          "03",
          "Connect documents",
          "Contracts and transactions reference the same deal record.",
        ],
        [
          "04",
          "Check the result",
          "Reports show the state of the process and help locate discrepancies.",
        ],
      ],
      [
        [
          "01",
          "Start a conversation",
          "A clear menu leads the user to a specific action.",
        ],
        [
          "02",
          "Collect answers",
          "The bot gathers the required data step by step and allows corrections.",
        ],
        [
          "03",
          "Process the request",
          "The scenario validates the answers and calls the relevant service.",
        ],
        [
          "04",
          "Return a result",
          "The user receives a confirmation, document or next step.",
        ],
      ],
    ],
  },
};

export function EngineeringStory({ locale }: { locale: Locale }) {
  const [selected, setSelected] = useState(0);
  const t = COPY[locale];
  return (
    <section
      className="engineering-story"
      id="engineering"
      aria-labelledby="engineering-title"
    >
      <header>
        <p className="sales-eyebrow">{t.eyebrow}</p>
        <h2 id="engineering-title">{t.title}</h2>
        <p>{t.lead}</p>
      </header>
      <div
        className="engineering-model-picker"
        role="group"
        aria-label={t.group}
      >
        {t.models.map((model, index) => (
          <button
            type="button"
            key={model}
            aria-pressed={selected === index}
            onClick={() => setSelected(index)}
          >
            {model}
            <span aria-hidden="true">↗</span>
          </button>
        ))}
      </div>
      <ol className="engineering-flow" aria-label={t.models[selected]}>
        {t.flows[selected]!.map(([number, title, body]) => (
          <li key={number}>
            <span aria-hidden="true">{number}</span>
            <h3>{title}</h3>
            <p>{body}</p>
          </li>
        ))}
      </ol>
      <p className="engineering-model-note">{t.note}</p>
    </section>
  );
}
