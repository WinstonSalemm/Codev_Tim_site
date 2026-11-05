(() => {
  "use strict";
  const locale = document.documentElement.lang;
  const erp = document.body.dataset.project === "codev-erp";
  const dictionary = {
    ru: {
      simulation: "Симуляция процесса · вымышленные данные",
      title: erp
        ? "От сделки к согласованию"
        : "У каждого звонка — следующий шаг",
      lead: erp
        ? "Выберите сделку и проведите её через финансовую проверку и согласование. Это упрощённая браузерная модель desktop-системы."
        : "Выберите компанию, зафиксируйте результат разговора и запланируйте действие. Это автономная модель рабочего процесса.",
      reset: "Начать заново",
      language: "Язык",
      record: erp ? "Сделка" : "Компания",
      all: "Все записи",
      filter: "Показать статус",
      count: "записей",
      selected: "Выбранная запись",
      history: "История действий",
      empty: "Выберите действие: результат появится здесь.",
      stages: erp
        ? [
            "Черновик",
            "Финансовая проверка",
            "Согласование директора",
            "Согласовано",
            "Отклонено",
          ]
        : ["Новый контакт", "Перезвонить", "Обсуждение", "Встреча", "Сделка"],
      next: "Следующий этап",
      reject: "Отклонить",
      approved: "Согласование завершено",
      rejected: "Сделка отклонена",
      restore: "Вернуть в черновик",
      owner: "Ответственный",
      ownerValue: "Демо-менеджер",
      amount: "Объём, условные единицы",
      result: "Результат звонка",
      followup: "Следующее действие",
      followups: ["Позвонить", "Отправить предложение", "Назначить встречу"],
      note: "Заметка (не вводите личные данные)",
      notePlaceholder: "Например: подготовить варианты решения",
      save: "Сохранить результат",
      saved: "Результат сохранён только в этой демонстрации.",
      scheduled: "Запланировано",
      total: "Всего записей",
      complete: erp ? "Согласовано" : "Сделки",
      active: "В работе",
      none: "В этом статусе пока нет записей.",
      foot: "Ничего не отправляется и не сохраняется на сервере. Обновление страницы сбрасывает изменения. Это демонстрация взаимодействия, а не полный продукт.",
    },
    uz: {
      simulation: "Jarayon simulyatsiyasi · namunaviy ma’lumotlar",
      title: erp
        ? "Bitimdan tasdiqlashgacha"
        : "Har bir qo‘ng‘iroqdan keyin — aniq qadam",
      lead: erp
        ? "Bitimni tanlang, moliyaviy tekshiruv va tasdiqlash bosqichlaridan o‘tkazing. Bu desktop tizimining soddalashtirilgan brauzer modeli."
        : "Kompaniyani tanlang, suhbat natijasini belgilang va keyingi vazifani rejalashtiring. Bu mustaqil ish jarayoni modeli.",
      reset: "Qayta boshlash",
      language: "Til",
      record: erp ? "Bitim" : "Kompaniya",
      all: "Barcha yozuvlar",
      filter: "Holatni ko‘rsatish",
      count: "yozuv",
      selected: "Tanlangan yozuv",
      history: "Amallar tarixi",
      empty: "Amalni tanlang: natija shu yerda ko‘rinadi.",
      stages: erp
        ? [
            "Qoralama",
            "Moliyaviy tekshiruv",
            "Direktor tasdig‘i",
            "Tasdiqlandi",
            "Rad etildi",
          ]
        : ["Yangi aloqa", "Qayta qo‘ng‘iroq", "Muhokama", "Uchrashuv", "Bitim"],
      next: "Keyingi bosqich",
      reject: "Rad etish",
      approved: "Tasdiqlash yakunlandi",
      rejected: "Bitim rad etildi",
      restore: "Qoralamaga qaytarish",
      owner: "Mas’ul",
      ownerValue: "Demo menejer",
      amount: "Hajm, shartli birliklar",
      result: "Qo‘ng‘iroq natijasi",
      followup: "Keyingi vazifa",
      followups: [
        "Qo‘ng‘iroq qilish",
        "Taklif yuborish",
        "Uchrashuv belgilash",
      ],
      note: "Qayd (shaxsiy ma’lumot kiritmang)",
      notePlaceholder: "Masalan: yechim variantlarini tayyorlash",
      save: "Natijani saqlash",
      saved: "Natija faqat shu demoda saqlandi.",
      scheduled: "Rejalashtirildi",
      total: "Jami yozuvlar",
      complete: erp ? "Tasdiqlandi" : "Bitimlar",
      active: "Jarayonda",
      none: "Bu holatda hozircha yozuvlar yo‘q.",
      foot: "Serverga hech narsa yuborilmaydi yoki saqlanmaydi. Sahifa yangilansa o‘zgarishlar o‘chadi. Bu to‘liq mahsulot emas, o‘zaro ishlash namunasidir.",
    },
    en: {
      simulation: "Workflow simulation · fictional data",
      title: erp ? "From deal to approval" : "Every call has a next step",
      lead: erp
        ? "Select a deal and move it through financial review and approval. This is a simplified browser model of a desktop system."
        : "Select a company, record an outcome and plan a follow-up. This is an independent workflow model.",
      reset: "Start over",
      language: "Language",
      record: erp ? "Deal" : "Company",
      all: "All records",
      filter: "Filter by status",
      count: "records",
      selected: "Selected record",
      history: "Activity history",
      empty: "Choose an action to see its result here.",
      stages: erp
        ? ["Draft", "Finance review", "Director review", "Approved", "Rejected"]
        : ["New contact", "Callback", "Discussion", "Meeting", "Deal"],
      next: "Next stage",
      reject: "Reject",
      approved: "Approval complete",
      rejected: "Deal rejected",
      restore: "Return to draft",
      owner: "Owner",
      ownerValue: "Demo manager",
      amount: "Volume, sample units",
      result: "Call outcome",
      followup: "Next action",
      followups: ["Make a call", "Send proposal", "Arrange meeting"],
      note: "Note (do not enter personal data)",
      notePlaceholder: "For example: prepare solution options",
      save: "Save outcome",
      saved: "Outcome saved in this demonstration only.",
      scheduled: "Scheduled",
      total: "Total records",
      complete: erp ? "Approved" : "Deals",
      active: "In progress",
      none: "There are no records with this status yet.",
      foot: "Nothing is sent to or stored on a server. Reloading resets your changes. This demonstrates interaction, not the complete product.",
    },
  };
  const t = dictionary[locale] || dictionary.en;
  let records,
    selected,
    log,
    filter = "all";
  const root = document.getElementById("app");
  const options = (values, offset = 0) =>
    values
      .map((value, i) => `<option value="${i + offset}">${value}</option>`)
      .join("");
  function reset() {
    records = Array.from({ length: 6 }, (_, i) => ({
      id: i + 1,
      stage: i % 3,
      amount: (i + 2) * 1200,
      follow: null,
    }));
    selected = 1;
    log = [];
    filter = "all";
    render();
  }
  function render() {
    const visible = records.filter(
      (r) => filter === "all" || r.stage === Number(filter)
    );
    if (visible.length && !visible.some((r) => r.id === selected)) {
      selected = visible[0].id;
    }
    const current = records.find((r) => r.id === selected);
    root.innerHTML = `<header class="top"><a class="brand" href="./index.html">${erp ? "FINANCIAL / ERP" : "CALL / TRACKER"}<span>CODEV_TIM DEMO</span></a><nav aria-label="${t.language}">${["ru", "uz", "en"].map((l) => `<a href="../${l}/index.html" ${l === locale ? 'aria-current="page"' : ""}>${l.toUpperCase()}</a>`).join("")}</nav><button id="reset" class="quiet">${t.reset} ↻</button></header>
    <main><section class="intro"><p class="eyebrow"><span class="dot"></span>${t.simulation}</p><h1>${t.title}</h1><p>${t.lead}</p></section>
    <section class="metrics" aria-label="${t.total}"><div><span>${t.total}</span><strong>06</strong></div><div><span>${t.active}</span><strong>${String(records.filter((r) => (erp ? r.stage < 3 : r.stage < 4)).length).padStart(2, "0")}</strong></div><div><span>${t.complete}</span><strong>${String(records.filter((r) => r.stage === (erp ? 3 : 4)).length).padStart(2, "0")}</strong></div></section>
    <div class="workspace"><section class="records"><div class="section-heading"><h2>${erp ? "PIPELINE" : "CONTACTS"}</h2><span>${visible.length} ${t.count}</span></div><label class="filter">${t.filter}<select id="filter"><option value="all">${t.all}</option>${options(t.stages)}</select></label><div class="record-list">${visible.length ? visible.map((r) => `<button class="record" data-record="${r.id}" aria-pressed="${r.id === selected}"><span class="record-id">${String(r.id).padStart(2, "0")}</span><span><strong>${t.record} ${String(r.id).padStart(3, "0")}</strong><small>${t.stages[r.stage]}</small></span><span aria-hidden="true">↗</span></button>`).join("") : `<p>${t.none}</p>`}</div></section>
    <section class="detail" aria-labelledby="detail-title" ${visible.length ? "" : "hidden"}><p class="eyebrow">${t.selected}</p><h2 id="detail-title">${t.record} ${String(current.id).padStart(3, "0")}</h2><span class="status">${t.stages[current.stage]}</span><dl><div><dt>${t.owner}</dt><dd>${t.ownerValue}</dd></div>${erp ? `<div><dt>${t.amount}</dt><dd>${current.amount.toLocaleString(locale)}</dd></div>` : ""}</dl>
    ${
      erp
        ? `<ol class="steps">${t.stages
            .slice(0, 4)
            .map(
              (stage, i) =>
                `<li class="${current.stage !== 4 && i <= current.stage ? "reached" : ""}"><span>${i + 1}</span>${stage}</li>`
            )
            .join(
              ""
            )}</ol><div class="actions">${current.stage < 3 ? `<button class="primary" id="advance">${t.next} →</button><button id="reject" class="quiet">${t.reject}</button>` : `<p>${current.stage === 3 ? t.approved : t.rejected}</p><button id="restore" class="quiet">${t.restore}</button>`}</div>`
        : `<div id="outcome-form" role="group" aria-label="${t.result}"><label>${t.result}<select id="outcome">${options(t.stages.slice(1), 1)}</select></label><label>${t.followup}<select id="followup">${options(t.followups)}</select></label><label>${t.note}<textarea id="note" maxlength="240" placeholder="${t.notePlaceholder}"></textarea></label><button id="save-outcome" class="primary" type="button">${t.save} →</button></div>${current.follow !== null ? `<p class="scheduled">${t.scheduled}: ${t.followups[current.follow]}</p>` : ""}`
    }
    </section></div><section class="history"><div class="section-heading"><h2>${t.history}</h2><span>LOCAL / SESSION</span></div><ol id="log" aria-live="polite"></ol></section><footer>${t.foot}</footer></main>`;
    document.getElementById("filter").value = filter;
    document.getElementById("filter").addEventListener("change", (event) => {
      filter = event.target.value;
      render();
      document.getElementById("filter").focus({ preventScroll: true });
    });
    document.querySelectorAll("[data-record]").forEach((button) =>
      button.addEventListener("click", () => {
        selected = Number(button.dataset.record);
        render();
        document
          .querySelector(`[data-record="${selected}"]`)
          .focus({ preventScroll: true });
      })
    );
    document.getElementById("reset").addEventListener("click", reset);
    const logElement = document.getElementById("log");
    (log.length ? log : [t.empty]).forEach((entry) => {
      const li = document.createElement("li");
      li.textContent = entry;
      logElement.append(li);
    });
    function change(stage) {
      current.stage = stage;
      log.unshift(
        `${t.record} ${String(current.id).padStart(3, "0")} → ${t.stages[stage]}`
      );
      render();
      document.getElementById("detail-title").setAttribute("tabindex", "-1");
      const focusTarget =
        document.querySelector(".detail:not([hidden]) #detail-title") ??
        document.getElementById("filter");
      focusTarget.focus({ preventScroll: true });
    }
    document
      .getElementById("advance")
      ?.addEventListener("click", () => change(current.stage + 1));
    document
      .getElementById("reject")
      ?.addEventListener("click", () => change(4));
    document
      .getElementById("restore")
      ?.addEventListener("click", () => change(0));
    if (!erp) {
      document.getElementById("outcome").value = String(
        Math.max(1, current.stage)
      );
      document.getElementById("followup").value = String(current.follow ?? 0);
      document
        .getElementById("save-outcome")
        .addEventListener("click", (event) => {
          event.preventDefault();
          current.stage = Number(document.getElementById("outcome").value);
          current.follow = Number(document.getElementById("followup").value);
          const note = document.getElementById("note").value.trim();
          log.unshift(
            `${t.record} ${String(current.id).padStart(3, "0")}: ${t.stages[current.stage]} · ${t.followups[current.follow]}${note ? " — " + note : ""}`
          );
          render();
          const notice = document.createElement("p");
          notice.className = "saved";
          notice.setAttribute("role", "status");
          notice.textContent = t.saved;
          document.getElementById("outcome-form").append(notice);
          document
            .getElementById("save-outcome")
            .focus({ preventScroll: true });
        });
    }
  }
  reset();
})();
