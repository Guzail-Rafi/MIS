const STORAGE_KEY = "vinsak-smart-serviceconnect-mis-v1";
const DATA_VERSION = 5;

const emailDirectory = {
  "Arun Mehta": "arun.mehta@vinsak.com",
  "Nikhil Rao": "nikhil.rao@vinsak.com",
  "Sara Thomas": "sara.thomas@vinsak.com",
  "Faisal Khan": "faisal.khan@vinsak.com",
  "Accounts Team": "accounts@vinsak.com",
  "Sales Team": "sales@vinsak.com",
  "Stores Team": "stores@vinsak.com",
  Service: "service@vinsak.com",
  Stores: "stores@vinsak.com",
  Accounts: "accounts@vinsak.com",
  Sales: "sales@vinsak.com",
  Management: "management@vinsak.com",
  "Power BI": "management@vinsak.com",
  Inventory: "stores@vinsak.com"
};

const partVendors = {
  "SNS-TEN-09": { name: "Tension Controls Supplier", email: "orders@tension-controls.example" },
  "PHD-CLN-22": { name: "Digital Inkjet Spares", email: "sales@digital-inkjet-spares.example" },
  "FLT-UV-12": { name: "UV Consumables Gulf", email: "orders@uv-consumables.example" },
  "BLA-SLT-18": { name: "Precision Blade Trading", email: "procurement@precision-blades.example" },
  default: { name: "Approved Parts Vendor", email: "parts.vendor@example.com" }
};

const today = new Date("2026-06-24T12:00:00+04:00");

const SERVICE_WORKFLOW = [
  { id: "request", label: "Request", owner: "Portal / CRM" },
  { id: "ticket", label: "Ticket", owner: "Service" },
  { id: "amc", label: "AMC check", owner: "Accounts" },
  { id: "engineer", label: "Engineer", owner: "Service" },
  { id: "parts", label: "Parts", owner: "Stores" },
  { id: "followup", label: "Follow-up", owner: "Coordinator" },
  { id: "report", label: "Report", owner: "Power BI" }
];

const seedData = {
  tickets: [
    {
      id: "TKT-1048",
      customer: "Prime Labels LLC",
      source: "Customer Portal",
      machine: "VINSAK LSR-330",
      serial: "VSK-330-2218",
      type: "Breakdown support",
      issue: "Intermittent web tension failure during finishing run",
      amc: "Active",
      engineer: "Arun Mehta",
      part: "SNS-TEN-09",
      priority: "High",
      status: "Delayed",
      created: "2026-06-19",
      hoursUsed: 6
    },
    {
      id: "TKT-1049",
      customer: "Oasis Packaging",
      source: "Sales Team",
      machine: "Digital Inkjet DSI-220",
      serial: "DSI-220-1184",
      type: "Spare part request",
      issue: "Printhead cleaning assembly required before production restart",
      amc: "Expiring Soon",
      engineer: "Nikhil Rao",
      part: "PHD-CLN-22",
      priority: "High",
      status: "Open",
      created: "2026-06-21",
      hoursUsed: 3
    },
    {
      id: "TKT-1050",
      customer: "SecurePrint Gulf",
      source: "Service Team",
      machine: "Security Print Module SPM-500",
      serial: "SPM-500-0739",
      type: "Preventive maintenance",
      issue: "Scheduled preventive visit for brand protection line",
      amc: "Warranty",
      engineer: "Sara Thomas",
      part: "FLT-UV-12",
      priority: "Medium",
      status: "Open",
      created: "2026-06-23",
      hoursUsed: 2
    },
    {
      id: "TKT-1051",
      customer: "Metro Flexibles",
      source: "Internal Staff",
      machine: "Slitter Rewinder SRW-450",
      serial: "SRW-450-4411",
      type: "Installation support",
      issue: "Final calibration and operator handover",
      amc: "Chargeable",
      engineer: "Faisal Khan",
      part: "BLA-SLT-18",
      priority: "Low",
      status: "Completed",
      created: "2026-06-18",
      hoursUsed: 4
    }
  ],
  parts: [
    {
      code: "SNS-TEN-09",
      name: "Tension sensor assembly",
      qty: 2,
      min: 3,
      leadTime: 21,
      warehouse: "W1",
      rack: "B",
      shelf: "3",
      bin: "07"
    },
    {
      code: "PHD-CLN-22",
      name: "Printhead cleaning assembly",
      qty: 5,
      min: 4,
      leadTime: 18,
      warehouse: "W2",
      rack: "A",
      shelf: "2",
      bin: "12"
    },
    {
      code: "FLT-UV-12",
      name: "UV filter cartridge",
      qty: 12,
      min: 6,
      leadTime: 10,
      warehouse: "W1",
      rack: "D",
      shelf: "1",
      bin: "02"
    },
    {
      code: "BLA-SLT-18",
      name: "Slitter blade set",
      qty: 1,
      min: 2,
      leadTime: 28,
      warehouse: "W3",
      rack: "C",
      shelf: "4",
      bin: "16"
    }
  ],
  amcs: [
    {
      id: "AMC-310",
      customer: "Prime Labels LLC",
      serial: "VSK-330-2218",
      expiry: "2026-08-15",
      hoursLeft: 24,
      hoursTotal: 50,
      visitsLeft: 1,
      visitsTotal: 2
    },
    {
      id: "AMC-311",
      customer: "Oasis Packaging",
      serial: "DSI-220-1184",
      expiry: "2026-07-08",
      hoursLeft: 8,
      hoursTotal: 40,
      visitsLeft: 0,
      visitsTotal: 2
    },
    {
      id: "AMC-312",
      customer: "SecurePrint Gulf",
      serial: "SPM-500-0739",
      expiry: "2026-12-20",
      hoursLeft: 36,
      hoursTotal: 50,
      visitsLeft: 2,
      visitsTotal: 3
    }
  ],
  quotes: [
    {
      id: "QT-882",
      customer: "Oasis Packaging",
      value: 17800,
      stage: "Negotiation",
      followUp: "2026-06-22"
    },
    {
      id: "QT-883",
      customer: "Metro Flexibles",
      value: 6400,
      stage: "Awaiting PO",
      followUp: "2026-06-26"
    },
    {
      id: "QT-884",
      customer: "Gulf Pack Industries",
      value: 22500,
      stage: "Sent",
      followUp: "2026-06-20"
    }
  ],
  engineers: [
    { name: "Arun Mehta", skill: "Flexo and finishing", location: "Dubai" },
    { name: "Nikhil Rao", skill: "Digital inkjet", location: "Sharjah" },
    { name: "Sara Thomas", skill: "Security printing", location: "Dubai" },
    { name: "Faisal Khan", skill: "Slitter rewinder", location: "Abu Dhabi" }
  ],
  handoffs: [
    {
      id: "HOF-201",
      type: "Ticket",
      recordId: "TKT-1048",
      customer: "Prime Labels LLC",
      department: "Service",
      owner: "Arun Mehta",
      nextAction: "Update delayed visit outcome and confirm revised SLA",
      status: "Delayed",
      due: "2026-06-24",
      linkedTo: "AMC-310 / SNS-TEN-09",
      note: "Management visibility required before customer callback."
    },
    {
      id: "HOF-202",
      type: "Ticket",
      recordId: "TKT-1049",
      customer: "Oasis Packaging",
      department: "Stores",
      owner: "Stores Team",
      nextAction: "Confirm PHD-CLN-22 availability before engineer dispatch",
      status: "Waiting",
      due: "2026-06-25",
      linkedTo: "AMC-311 / PHD-CLN-22",
      note: "Free visits exhausted; accounts must review chargeable risk."
    },
    {
      id: "HOF-203",
      type: "AMC",
      recordId: "AMC-311",
      customer: "Oasis Packaging",
      department: "Accounts",
      owner: "Accounts Team",
      nextAction: "Approve chargeable work beyond AMC entitlement",
      status: "Pending",
      due: "2026-06-25",
      linkedTo: "TKT-1049",
      note: "AMC has zero included visits remaining."
    },
    {
      id: "HOF-204",
      type: "Quotation",
      recordId: "QT-882",
      customer: "Oasis Packaging",
      department: "Sales",
      owner: "Sales Team",
      nextAction: "Call customer and update negotiation stage",
      status: "Overdue",
      due: "2026-06-22",
      linkedTo: "QT-882",
      note: "Quotation follow-up is overdue by two days."
    },
    {
      id: "HOF-207",
      type: "Quotation",
      recordId: "QT-883",
      customer: "Metro Flexibles",
      department: "Sales",
      owner: "Sales Team",
      nextAction: "Confirm whether customer will issue PO",
      status: "Pending",
      due: "2026-06-26",
      linkedTo: "QT-883",
      note: "Quotation is awaiting PO and follow-up is due soon."
    },
    {
      id: "HOF-208",
      type: "Quotation",
      recordId: "QT-884",
      customer: "Gulf Pack Industries",
      department: "Sales",
      owner: "Sales Team",
      nextAction: "Escalate overdue quotation follow-up",
      status: "Overdue",
      due: "2026-06-20",
      linkedTo: "QT-884",
      note: "Quotation follow-up is overdue by four days."
    },
    {
      id: "HOF-205",
      type: "Ticket",
      recordId: "TKT-1050",
      customer: "SecurePrint Gulf",
      department: "Service",
      owner: "Sara Thomas",
      nextAction: "Complete preventive maintenance visit report",
      status: "In progress",
      due: "2026-06-24",
      linkedTo: "AMC-312 / FLT-UV-12",
      note: "Report should update machine history and AMC utilization."
    },
    {
      id: "HOF-206",
      type: "Part",
      recordId: "BLA-SLT-18",
      customer: "Metro Flexibles",
      department: "Stores",
      owner: "Stores Team",
      nextAction: "Raise reorder request for slitter blade set",
      status: "Waiting",
      due: "2026-06-26",
      linkedTo: "TKT-1051",
      note: "Part is below minimum stock level."
    }
  ],
  lastSync: "2026-06-24 18:00 GST"
};

let state = loadState();
let ticketFilter = "all";
let searchTerm = "";
let pipelineTimer = null;

const els = {};

document.addEventListener("DOMContentLoaded", () => {
  bindElements();
  bindEvents();
  setInitialDates();
  renderAll();
  showPage(currentPageFromHash(), false);
});

function bindElements() {
  [
    "metricGrid",
    "homeTicketRows",
    "urgentCount",
    "alertList",
    "engineerBars",
    "partsAttention",
    "handoffCount",
    "coordinationRows",
    "ticketRows",
    "engineerSelect",
    "partSelect",
    "amcCards",
    "partRows",
    "quoteRows",
    "machineCards",
    "statusDonut",
    "statusLegend",
    "backendPreview",
    "recordCount",
    "readinessFill",
    "readinessText",
    "syncStatus",
    "todayStamp",
    "globalSearch",
    "detailModal",
    "detailModalTitle",
    "detailModalMeta",
    "detailModalBody",
    "detailModalClose"
  ].forEach((id) => {
    els[id] = document.getElementById(id);
  });
}

function bindEvents() {
  document.querySelectorAll(".nav-item").forEach((button) => {
    button.addEventListener("click", () => {
      showPage(button.dataset.target);
    });
  });

  window.addEventListener("popstate", () => {
    showPage(currentPageFromHash(), false);
  });

  document.querySelectorAll("[data-ticket-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      ticketFilter = button.dataset.ticketFilter;
      document.querySelectorAll("[data-ticket-filter]").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      renderTickets();
    });
  });

  els.globalSearch.addEventListener("input", (event) => {
    searchTerm = event.target.value.trim().toLowerCase();
    renderTables();
    renderMachines();
    renderCoordination();
  });

  document.getElementById("ticketForm").addEventListener("submit", saveTicket);
  document.getElementById("partForm").addEventListener("submit", savePart);
  document.getElementById("amcForm").addEventListener("submit", saveAmc);
  document.getElementById("quoteForm").addEventListener("submit", saveQuote);
  document.getElementById("exportData").addEventListener("click", exportData);
  document.getElementById("resetData").addEventListener("click", resetData);

  els.metricGrid.addEventListener("click", (event) => {
    const card = event.target.closest("[data-metric]");
    if (!card) return;
    openMetricDetails(card.dataset.metric);
  });

  els.metricGrid.addEventListener("keydown", (event) => {
    const card = event.target.closest("[data-metric]");
    if (!card || (event.key !== "Enter" && event.key !== " ")) return;
    event.preventDefault();
    openMetricDetails(card.dataset.metric);
  });

  els.amcCards.addEventListener("click", (event) => {
    const card = event.target.closest("[data-amc-id]");
    if (!card) return;
    openAmcDetails(card.dataset.amcId);
  });

  els.amcCards.addEventListener("keydown", (event) => {
    const card = event.target.closest("[data-amc-id]");
    if (!card || (event.key !== "Enter" && event.key !== " ")) return;
    event.preventDefault();
    openAmcDetails(card.dataset.amcId);
  });

  els.partsAttention.addEventListener("click", (event) => {
    const partButton = event.target.closest("[data-request-part]");
    if (!partButton) return;
    openPartVendorRequest(partButton.dataset.requestPart);
  });

  els.coordinationRows.addEventListener("click", (event) => {
    const button = event.target.closest("[data-advance-handoff]");
    if (button) {
      advanceHandoff(button.dataset.advanceHandoff);
      return;
    }

    const row = event.target.closest("[data-handoff-id]");
    if (!row) return;
    openHandoffPipeline(row.dataset.handoffId);
  });

  els.coordinationRows.addEventListener("keydown", (event) => {
    const row = event.target.closest("[data-handoff-id]");
    if (!row || event.target.closest("button") || (event.key !== "Enter" && event.key !== " ")) return;
    event.preventDefault();
    openHandoffPipeline(row.dataset.handoffId);
  });

  els.detailModalClose.addEventListener("click", closeDetailModal);
  els.detailModal.addEventListener("click", (event) => {
    const notifyButton = event.target.closest("[data-notify-step]");
    if (notifyButton) {
      sendPipelineStepNotification(notifyButton.dataset.handoffId, Number(notifyButton.dataset.notifyStep));
      return;
    }

    if (event.target === els.detailModal) closeDetailModal();
  });

  els.detailModal.addEventListener("submit", (event) => {
    const form = event.target.closest("[data-vendor-request-form]");
    if (!form) return;

    event.preventDefault();
    draftVendorPartEmail(form.dataset.partCode, Number(form.elements.quantity.value), form.elements.vendor.value);
  });
}

function showPage(pageId, updateHash = true) {
  const nextPage = document.getElementById(pageId)?.classList.contains("page-section") ? pageId : "home";

  document.querySelectorAll(".page-section").forEach((section) => {
    section.classList.toggle("active", section.id === nextPage);
  });

  document.querySelectorAll(".nav-item").forEach((button) => {
    button.classList.toggle("active", button.dataset.target === nextPage);
  });

  const mainContent = document.querySelector(".main-content");
  if (mainContent) {
    mainContent.scrollTo({ top: 0, behavior: "smooth" });
  }
  window.scrollTo({ top: 0, behavior: "smooth" });

  if (updateHash && window.location.hash !== `#${nextPage}`) {
    window.history.pushState(null, "", `#${nextPage}`);
  }
}

function currentPageFromHash() {
  return window.location.hash ? window.location.hash.slice(1) : "home";
}

function setInitialDates() {
  els.todayStamp.textContent = "Updated 24 June 2026, 18:00 GST";
  const quoteDate = new Date(today);
  quoteDate.setDate(quoteDate.getDate() + 2);
  document.querySelector("#quoteForm [name='followUp']").value = toDateInput(quoteDate);
  const amcDate = new Date(today);
  amcDate.setMonth(amcDate.getMonth() + 8);
  document.querySelector("#amcForm [name='expiry']").value = toDateInput(amcDate);
}

function loadState() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return migrateState(structuredClone(seedData));
  }

  try {
    const loadedState = migrateState({ ...structuredClone(seedData), ...JSON.parse(stored) });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(loadedState));
    return loadedState;
  } catch {
    return migrateState(structuredClone(seedData));
  }
}

function migrateState(nextState) {
  const storedVersion = Number(nextState.dataVersion || 0);
  if (!Array.isArray(nextState.tickets)) {
    nextState.tickets = structuredClone(seedData.tickets);
  }
  if (!Array.isArray(nextState.handoffs)) {
    nextState.handoffs = [];
  }
  if (storedVersion < 2) {
    const primeLabelsTicket = nextState.tickets.find((ticket) => ticket.id === "TKT-1048");
    if (primeLabelsTicket && primeLabelsTicket.status === "Open") {
      primeLabelsTicket.status = "Delayed";
    }
  }

  if (storedVersion < 4) {
    seedData.handoffs.forEach((handoff) => {
      if (!nextState.handoffs.some((item) => item.id === handoff.id)) {
        nextState.handoffs.push(structuredClone(handoff));
      }
    });
  }

  nextState.handoffs.forEach((handoff) => {
    if (!Array.isArray(handoff.notifications)) {
      handoff.notifications = [];
    }
  });

  nextState.dataVersion = DATA_VERSION;
  return nextState;
}

function persistState(message = "Saved to prototype backend") {
  state.lastSync = new Date().toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  renderAll();
  els.syncStatus.textContent = message;
}

function renderAll() {
  renderSelectors();
  renderMetrics();
  renderAlerts();
  renderCoordination();
  renderEngineerBars();
  renderPartsAttention();
  renderTables();
  renderAmcs();
  renderMachines();
  renderReports();
}

function renderTables() {
  renderHomeTickets();
  renderTickets();
  renderParts();
  renderQuotes();
}

function renderSelectors() {
  els.engineerSelect.innerHTML = state.engineers
    .map((engineer) => `<option>${escapeHtml(engineer.name)}</option>`)
    .join("");

  els.partSelect.innerHTML = state.parts
    .map((part) => `<option value="${escapeHtml(part.code)}">${escapeHtml(part.code)} - ${escapeHtml(part.name)}</option>`)
    .join("");
}

function renderMetrics() {
  const openTickets = state.tickets.filter((ticket) => ticket.status === "Open").length;
  const delayed = state.tickets.filter((ticket) => ticket.status === "Delayed").length;
  const expiringAmc = state.amcs.filter((amc) => amcStatus(amc) === "Expiring").length;
  const overdueQuotes = state.quotes.filter((quote) => quoteStatus(quote) === "Overdue").length;
  const lowStock = state.parts.filter((part) => partStatus(part) === "LowStock").length;
  const serviceHours = state.tickets.reduce((sum, ticket) => sum + Number(ticket.hoursUsed || 0), 0);

  const metrics = [
    { key: "open-tickets", label: "Open tickets", value: openTickets, note: "status open", tone: "teal", tag: "ST" },
    { key: "delayed-tickets", label: "Delayed tickets", value: delayed, note: "SLA escalation risk", tone: "red", tag: "SLA" },
    { key: "amc-expiring", label: "AMC expiring", value: expiringAmc, note: "within 45 days", tone: "gold", tag: "AMC" },
    { key: "quote-overdue", label: "Quote overdue", value: overdueQuotes, note: "needs sales follow-up", tone: "blue", tag: "QT" },
    { key: "low-stock-parts", label: "Low stock parts", value: lowStock, note: "below minimum level", tone: "red", tag: "SP" },
    { key: "service-hours", label: "Service hours", value: serviceHours, note: "logged this cycle", tone: "teal", tag: "HR" }
  ];

  els.metricGrid.innerHTML = metrics
    .map(
      (metric) => `
        <article class="metric-card" data-metric="${metric.key}" role="button" tabindex="0" aria-label="View ${metric.label} details">
          <div class="metric-top">
            <p>${metric.label}</p>
            <span class="metric-tag ${metric.tone}">${metric.tag}</span>
          </div>
          <div>
            <strong>${metric.value}</strong>
            <small>${metric.note}</small>
          </div>
        </article>
      `
    )
    .join("");

  els.urgentCount.textContent = `${state.tickets.filter((ticket) => ticket.priority === "High").length} urgent`;
}

function renderHomeTickets() {
  const rows = filteredTickets()
    .filter((ticket) => ticket.status !== "Completed")
    .slice(0, 6);

  els.homeTicketRows.innerHTML = rows.length
    ? rows
        .map(
          (ticket) => {
            const workflow = ticketWorkflowSummary(ticket);
            return `
              <tr class="ticket-row status-${className(ticket.status)}">
                <td class="id-cell">
                  ${ticket.id}
                  <div><span class="badge mini-status ${ticket.status}">${ticket.status}</span></div>
                </td>
                <td>${escapeHtml(ticket.customer)}</td>
                <td>
                  ${escapeHtml(ticket.machine)}
                  <div class="small-muted">${escapeHtml(ticket.serial)}</div>
                </td>
                <td><span class="badge ${className(ticket.amc)}">${escapeHtml(ticket.amc)}</span></td>
                <td><span class="badge ${ticket.priority}">${ticket.priority}</span></td>
                <td><span class="badge ${ticket.status}">${ticket.status}</span></td>
                <td>${renderWorkflowMini(workflow)}</td>
                <td>${escapeHtml(ticket.engineer)}</td>
              </tr>
            `;
          }
        )
        .join("")
    : emptyRow(8, "No matching active tickets");
}

function renderTickets() {
  const rows = filteredTickets().filter((ticket) => ticketFilter === "all" || ticket.status === ticketFilter);

  els.ticketRows.innerHTML = rows.length
    ? rows
        .map(
          (ticket) => {
            const workflow = ticketWorkflowSummary(ticket);
            return `
              <tr class="ticket-row status-${className(ticket.status)}">
                <td class="id-cell">${ticket.id}</td>
                <td>
                  ${escapeHtml(ticket.customer)}
                  <div class="small-muted">${escapeHtml(ticket.source)}</div>
                </td>
                <td>
                  ${escapeHtml(ticket.type)}
                  <div class="small-muted">${escapeHtml(ticket.issue)}</div>
                </td>
                <td>${escapeHtml(ticket.part)}</td>
                <td><span class="badge ${ticket.priority}">${ticket.priority}</span></td>
                <td><span class="badge ${ticket.status}">${ticket.status}</span></td>
                <td>${renderWorkflowMini(workflow)}</td>
                <td>
                  <button class="row-button" data-complete-ticket="${ticket.id}">
                    ${ticket.status === "Completed" ? "Reopen" : "Complete"}
                  </button>
                </td>
              </tr>
            `;
          }
        )
        .join("")
    : emptyRow(8, "No matching tickets");

  document.querySelectorAll("[data-complete-ticket]").forEach((button) => {
    button.addEventListener("click", () => toggleTicketStatus(button.dataset.completeTicket));
  });
}

function ticketWorkflowSummary(ticket) {
  const steps = serviceWorkflowSteps(ticket);
  const doneCount = steps.filter((step) => step.state === "done").length;
  const currentStep = steps.find((step) => step.state !== "done") || steps[steps.length - 1];
  return {
    currentStep,
    steps,
    progress: Math.round((doneCount / steps.length) * 100)
  };
}

function renderWorkflowMini(workflow) {
  return `
    <div class="workflow-mini" aria-label="Workflow progress: ${workflow.progress}%">
      <span class="workflow-current ${workflow.currentStep.state}">
        ${workflow.currentStep.number} ${escapeHtml(workflow.currentStep.title)}
      </span>
      <div class="workflow-dots" aria-hidden="true">
        ${workflow.steps.map((step) => `<span class="workflow-dot ${step.state}"></span>`).join("")}
      </div>
      <small>${workflow.progress}% complete</small>
    </div>
  `;
}

function renderAlerts() {
  const alerts = [];

  state.tickets
    .filter((ticket) => ticket.status === "Delayed" || ticket.priority === "High")
    .slice(0, 3)
    .forEach((ticket) => {
      alerts.push({
        title: `${ticket.customer} - ${ticket.id}`,
        detail: `${ticket.priority} priority, ${ticket.status.toLowerCase()} ticket`,
        badge: ticket.status === "Delayed" ? "Delayed" : "High"
      });
    });

  state.amcs
    .filter((amc) => daysUntil(amc.expiry) <= 45)
    .forEach((amc) => {
      alerts.push({
        title: `${amc.customer} AMC`,
        detail: `${Math.max(daysUntil(amc.expiry), 0)} days to expiry`,
        badge: "Expiring"
      });
    });

  state.quotes
    .filter((quote) => quote.stage !== "Won" && quote.stage !== "Lost" && daysUntil(quote.followUp) < 0)
    .forEach((quote) => {
      alerts.push({
        title: `${quote.customer} quotation`,
        detail: `${Math.abs(daysUntil(quote.followUp))} days overdue`,
        badge: "Overdue"
      });
    });

  els.alertList.innerHTML = alerts.length
    ? alerts
        .slice(0, 6)
        .map(
          (alert) => `
            <div class="alert-item">
              <div>
                <strong>${escapeHtml(alert.title)}</strong>
                <span>${escapeHtml(alert.detail)}</span>
              </div>
              <span class="badge ${alert.badge}">${escapeHtml(alert.badge)}</span>
            </div>
          `
        )
        .join("")
    : `<div class="alert-item"><strong>No escalations</strong><span>All active records are within target</span></div>`;
}

function renderCoordination() {
  const handoffs = filterRecords(state.handoffs, [
    "id",
    "type",
    "recordId",
    "customer",
    "department",
    "owner",
    "nextAction",
    "status",
    "linkedTo",
    "note"
  ]).sort((a, b) => handoffStatusRank(a.status) - handoffStatusRank(b.status) || daysUntil(a.due) - daysUntil(b.due));

  const activeCount = state.handoffs.filter((handoff) => handoff.status !== "Completed").length;
  els.handoffCount.textContent = `${activeCount} active`;

  els.coordinationRows.innerHTML = handoffs.length
    ? handoffs
        .map((handoff) => {
          const dueDays = daysUntil(handoff.due);
          const dueText = dueDays < 0 ? `${Math.abs(dueDays)} days overdue` : dueDays === 0 ? "Due today" : `${dueDays} days left`;
          const latestEmail = latestNotification(handoff);
          return `
            <tr class="handoff-row status-${className(handoff.status)}" data-handoff-id="${escapeHtml(handoff.id)}" tabindex="0" aria-label="View AI pipeline for ${escapeHtml(handoff.recordId)}">
              <td>
                <span class="id-cell">${escapeHtml(handoff.recordId)}</span>
                <div class="small-muted">${escapeHtml(handoff.type)} - ${escapeHtml(handoff.customer)}</div>
                <div class="small-muted">Linked: ${escapeHtml(handoff.linkedTo)}</div>
              </td>
              <td><span class="dept-pill">${escapeHtml(handoff.department)}</span></td>
              <td>${escapeHtml(handoff.owner)}</td>
              <td>
                ${escapeHtml(handoff.nextAction)}
                <div class="handoff-note">${escapeHtml(handoff.note)}</div>
                ${
                  latestEmail
                    ? `<div class="email-log-line">Last draft: ${escapeHtml(latestEmail.to)} - ${escapeHtml(notificationTime(latestEmail))}</div>`
                    : ""
                }
              </td>
              <td><span class="badge ${className(handoff.status)}">${escapeHtml(handoff.status)}</span></td>
              <td>
                ${formatDate(handoff.due)}
                <div class="small-muted">${dueText}</div>
              </td>
              <td>
                <button class="row-button" data-advance-handoff="${escapeHtml(handoff.id)}">
                  ${handoffActionLabel(handoff.status)}
                </button>
              </td>
            </tr>
          `;
        })
        .join("")
    : emptyRow(7, "No matching department handoffs");
}

function renderEngineerBars() {
  const totals = new Map(state.engineers.map((engineer) => [engineer.name, 0]));
  state.tickets
    .filter((ticket) => ticket.status !== "Completed")
    .forEach((ticket) => totals.set(ticket.engineer, (totals.get(ticket.engineer) || 0) + Number(ticket.hoursUsed || 2)));

  const max = Math.max(...totals.values(), 8);
  els.engineerBars.innerHTML = [...totals.entries()]
    .map(([name, hours]) => {
      const width = Math.min(100, Math.round((hours / max) * 100));
      return `
        <div class="bar-item">
          <strong>${escapeHtml(firstName(name))}</strong>
          <div class="bar-track"><div class="bar-fill" style="width:${width}%"></div></div>
          <span>${hours}h</span>
        </div>
      `;
    })
    .join("");
}

function renderPartsAttention() {
  const parts = state.parts
    .filter((part) => Number(part.qty) <= Number(part.min) || Number(part.leadTime) >= 21)
    .slice(0, 4);

  els.partsAttention.innerHTML = parts.length
    ? parts
        .map(
          (part) => `
            <button class="compact-item action-item" type="button" data-request-part="${escapeHtml(part.code)}" aria-label="Request ${escapeHtml(part.code)} from vendor">
              <div>
                <strong>${escapeHtml(part.code)}</strong>
                <span>${escapeHtml(part.name)} - ${locationText(part)}</span>
              </div>
              <span class="badge ${partStatus(part)}">${partStatusLabel(part)}</span>
            </button>
          `
        )
        .join("")
    : `<div class="compact-item"><strong>Inventory stable</strong><span>No low stock or long lead-time records</span></div>`;
}

function renderParts() {
  const parts = filterRecords(state.parts, ["code", "name", "warehouse", "rack", "shelf", "bin"]);

  els.partRows.innerHTML = parts.length
    ? parts
        .map(
          (part) => `
            <tr>
              <td class="id-cell">${escapeHtml(part.code)}</td>
              <td>${escapeHtml(part.name)}</td>
              <td>${Number(part.qty)}</td>
              <td>${locationText(part)}</td>
              <td>${Number(part.leadTime)} days</td>
              <td><span class="badge ${partStatus(part)}">${partStatusLabel(part)}</span></td>
            </tr>
          `
        )
        .join("")
    : emptyRow(6, "No matching spare parts");
}

function openPartVendorRequest(partCode) {
  const part = state.parts.find((item) => item.code === partCode);
  if (!part) return;

  const vendor = partVendor(part.code);
  const suggestedQuantity = suggestedReorderQuantity(part);
  const linkedTickets = state.tickets.filter((ticket) => ticket.part === part.code && ticket.status !== "Completed");

  els.detailModalTitle.textContent = `${part.code} vendor request`;
  els.detailModalMeta.textContent = "Stores - parts requiring attention";
  els.detailModalBody.innerHTML = `
    <div class="detail-summary-grid">
      <div class="detail-summary-item">
        <span>Current stock</span>
        <strong>${Number(part.qty)}</strong>
        <small>Minimum ${Number(part.min)}</small>
      </div>
      <div class="detail-summary-item">
        <span>Status</span>
        <strong>${partStatusLabel(part)}</strong>
      </div>
      <div class="detail-summary-item">
        <span>Lead time</span>
        <strong>${Number(part.leadTime)} days</strong>
      </div>
      <div class="detail-summary-item">
        <span>Location</span>
        <strong>${locationText(part)}</strong>
      </div>
    </div>

    <section class="detail-block vendor-request-panel">
      <div class="panel-heading compact-heading">
        <div>
          <p class="eyebrow">Vendor request</p>
          <h4>${escapeHtml(part.name)}</h4>
        </div>
        <span class="badge ${partStatus(part)}">${partStatusLabel(part)}</span>
      </div>

      <form class="vendor-request-form" data-vendor-request-form data-part-code="${escapeHtml(part.code)}">
        <div class="form-row two-col">
          <label>
            Quantity
            <input name="quantity" type="number" min="1" step="1" value="${suggestedQuantity}" required />
          </label>
          <label>
            Vendor
            <select name="vendor">
              ${renderVendorOptions(vendor.email)}
            </select>
          </label>
        </div>
        <div class="vendor-request-context">
          <span>Part code <strong>${escapeHtml(part.code)}</strong></span>
          <span>Linked demand <strong>${linkedTickets.length} active ticket${linkedTickets.length === 1 ? "" : "s"}</strong></span>
          <span>Suggested request <strong>${suggestedQuantity} pcs</strong></span>
        </div>
        <div class="form-actions">
          <button type="submit" class="primary-button">Draft Vendor Email</button>
          <span class="form-hint">Opens as an Outlook draft using your default mail app.</span>
        </div>
      </form>
    </section>
  `;

  if (typeof els.detailModal.showModal === "function") {
    els.detailModal.showModal();
  } else {
    els.detailModal.setAttribute("open", "");
  }
}

function renderVendorOptions(selectedEmail) {
  return Object.values(partVendors)
    .map(
      (vendor) => `
        <option value="${escapeHtml(vendor.email)}" ${vendor.email === selectedEmail ? "selected" : ""}>
          ${escapeHtml(vendor.name)} - ${escapeHtml(vendor.email)}
        </option>
      `
    )
    .join("");
}

function draftVendorPartEmail(partCode, quantity, vendorEmail) {
  const part = state.parts.find((item) => item.code === partCode);
  if (!part || !Number.isFinite(quantity) || quantity <= 0) return;

  const vendor = partVendor(part.code, vendorEmail);
  const notification = {
    to: vendor.email,
    recipient: vendor.name,
    subject: `Parts request: ${quantity} x ${part.code} - ${part.name}`,
    body: vendorPartEmailBody(part, quantity, vendor),
    draftedAt: notificationTimestamp()
  };

  els.syncStatus.textContent = `Vendor draft opened for ${part.code}`;
  els.detailModalBody.innerHTML = `
    <section class="notification-log">
      <div class="panel-heading compact-heading">
        <div>
          <p class="eyebrow">Outlook draft ready</p>
          <h4>${quantity} x ${escapeHtml(part.code)} requested from ${escapeHtml(vendor.name)}</h4>
        </div>
      </div>
      <div class="notification-list">
        <article class="notification-item">
          <div>
            <strong>${escapeHtml(notification.subject)}</strong>
            <span>Draft to ${escapeHtml(vendor.name)} &lt;${escapeHtml(vendor.email)}&gt;</span>
          </div>
          <pre>${escapeHtml(notification.body)}</pre>
        </article>
      </div>
    </section>
  `;
  openEmailDraft(notification);
}

function vendorPartEmailBody(part, quantity, vendor) {
  const linkedTickets = state.tickets.filter((ticket) => ticket.part === part.code && ticket.status !== "Completed");
  const ticketLines = linkedTickets.length
    ? linkedTickets.map((ticket) => `- ${ticket.id}: ${ticket.customer}, ${ticket.machine}, ${ticket.status}`).join("\n")
    : "- No active ticket linked; request is based on stock threshold.";

  return `Dear ${vendor.name},

Please arrange availability and pricing for the following spare part:

Part code: ${part.code}
Part name: ${part.name}
Requested quantity: ${quantity}
Current stock: ${part.qty}
Minimum stock level: ${part.min}
Store location: ${part.warehouse} / Rack ${part.rack} / Shelf ${part.shelf} / Bin ${part.bin}
Expected lead time in system: ${part.leadTime} days

Linked service demand:
${ticketLines}

Please confirm price, delivery timeline, and availability.

Regards,
Stores Team
VINSAK`;
}

function partVendor(partCode, selectedEmail = null) {
  const vendors = Object.values(partVendors);
  if (selectedEmail) {
    return vendors.find((vendor) => vendor.email === selectedEmail) || partVendors.default;
  }
  return partVendors[partCode] || partVendors.default;
}

function suggestedReorderQuantity(part) {
  const shortage = Math.max(0, Number(part.min) - Number(part.qty));
  const activeDemand = state.tickets.filter((ticket) => ticket.part === part.code && ticket.status !== "Completed").length;
  return Math.max(shortage + activeDemand + 1, Number(part.min), 1);
}

function renderAmcs() {
  els.amcCards.innerHTML = state.amcs
    .map((amc) => {
      const used = Math.max(0, Number(amc.hoursTotal) - Number(amc.hoursLeft));
      const percentage = Number(amc.hoursTotal) ? Math.round((used / Number(amc.hoursTotal)) * 100) : 0;
      const badge = amcStatus(amc);
      return `
        <article class="contract-card clickable-card" data-amc-id="${escapeHtml(amc.id)}" role="button" tabindex="0" aria-label="View ${escapeHtml(amc.customer)} AMC details">
          <div class="panel-heading">
            <div>
              <p class="eyebrow">${escapeHtml(amc.id)}</p>
              <h4>${escapeHtml(amc.customer)}</h4>
            </div>
            <span class="badge ${badge}">${badge}</span>
          </div>
          <div class="util-track"><div class="util-fill" style="width:${percentage}%"></div></div>
          <div class="contract-meta">
            <span>Machine <strong>${escapeHtml(amc.serial)}</strong></span>
            <span>Expiry <strong>${formatDate(amc.expiry)}</strong></span>
            <span>Hours left <strong>${Number(amc.hoursLeft)} / ${Number(amc.hoursTotal)}</strong></span>
            <span>Visits left <strong>${Number(amc.visitsLeft)} / ${Number(amc.visitsTotal)}</strong></span>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderQuotes() {
  const quotes = filterRecords(state.quotes, ["id", "customer", "stage", "followUp"]);

  els.quoteRows.innerHTML = quotes.length
    ? quotes
        .map((quote) => {
          const status = quoteStatus(quote);
          return `
            <tr>
              <td class="id-cell">${escapeHtml(quote.id)}</td>
              <td>${escapeHtml(quote.customer)}</td>
              <td>AED ${Number(quote.value).toLocaleString("en-AE")}</td>
              <td><span class="badge ${className(quote.stage)}">${escapeHtml(quote.stage)}</span></td>
              <td>${formatDate(quote.followUp)}</td>
              <td><span class="badge ${status}">${status}</span></td>
            </tr>
          `;
        })
        .join("")
    : emptyRow(6, "No matching quotations");
}

function openMetricDetails(metricKey) {
  const detail = metricDetail(metricKey);
  if (!detail) return;

  const records = detail.records();
  els.detailModalTitle.textContent = detail.title;
  els.detailModalMeta.textContent = detail.meta(records);
  els.detailModalBody.innerHTML = renderDetailTable(detail.columns, records, detail.emptyMessage, detail.footer);

  if (typeof els.detailModal.showModal === "function") {
    els.detailModal.showModal();
  } else {
    els.detailModal.setAttribute("open", "");
  }
}

function closeDetailModal() {
  clearPipelineTimer();
  if (typeof els.detailModal.close === "function") {
    els.detailModal.close();
  } else {
    els.detailModal.removeAttribute("open");
  }
}

function clearPipelineTimer() {
  if (!pipelineTimer) return;
  clearTimeout(pipelineTimer);
  pipelineTimer = null;
}

function openHandoffPipeline(handoffId) {
  const handoff = state.handoffs.find((item) => item.id === handoffId);
  if (!handoff) return;

  clearPipelineTimer();
  els.detailModalTitle.textContent = "AI handoff pipeline";
  els.detailModalMeta.textContent = `${handoff.recordId} - ${handoff.customer}`;
  els.detailModalBody.innerHTML = renderPipelineLoading(handoff);

  if (typeof els.detailModal.showModal === "function") {
    els.detailModal.showModal();
  } else {
    els.detailModal.setAttribute("open", "");
  }

  pipelineTimer = setTimeout(() => {
    if (!els.detailModal.open) return;
    const pipeline = buildHandoffPipeline(handoff);
    els.detailModalBody.innerHTML = renderHandoffPipeline(handoff, pipeline);
    pipelineTimer = null;
  }, 650);
}

function renderPipelineLoading(handoff) {
  return `
    <div class="ai-loading-panel">
      <div class="ai-loader" aria-hidden="true">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div>
        <p class="eyebrow">AI coordination engine</p>
        <h4>Connecting ${escapeHtml(handoff.type.toLowerCase())} record, department owner, entitlement, stock and reporting data</h4>
        <p>Building a live pipeline for ${escapeHtml(handoff.recordId)} across ${escapeHtml(handoff.department)}, linked records and pending actions.</p>
      </div>
    </div>
  `;
}

function buildHandoffPipeline(handoff) {
  const context = handoffContext(handoff);
  const currentState = handoff.status === "Delayed" || handoff.status === "Overdue" || handoff.status === "Waiting" ? "blocked" : "current";
  const currentLabel = handoff.status === "Completed" ? "done" : currentState;

  let steps;
  if (handoff.type === "Ticket") {
    steps = ticketPipelineSteps(handoff, context, currentLabel);
  } else if (handoff.type === "AMC") {
    steps = amcPipelineSteps(handoff, context, currentLabel);
  } else if (handoff.type === "Quotation") {
    steps = quotePipelineSteps(handoff, context, currentLabel);
  } else {
    steps = partPipelineSteps(handoff, context, currentLabel);
  }

  if (handoff.status === "Completed") {
    steps = steps.map((step) => ({ ...step, state: "done" }));
  }

  const done = steps.filter((step) => step.state === "done");
  const left = steps.filter((step) => step.state !== "done");
  return {
    context,
    steps,
    done,
    left,
    progress: steps.length ? Math.round((done.length / steps.length) * 100) : 0
  };
}

function serviceWorkflowSteps(ticket, handoff = null, currentLabel = null, suppliedContext = {}) {
  const amc =
    suppliedContext.amc ||
    (ticket ? state.amcs.find((item) => item.serial === ticket.serial || item.customer === ticket.customer) : null);
  const part = suppliedContext.part || (ticket ? state.parts.find((item) => item.code === ticket.part) : null);
  const followUpState = ticket?.status === "Completed" ? "done" : currentLabel || (ticket?.status === "Delayed" ? "blocked" : "current");
  const amcDecisionKnown = Boolean(amc || ticket?.amc === "Warranty" || ticket?.amc === "Chargeable");
  const partAvailable = part && Number(part.qty) > 0;

  return [
    {
      ...SERVICE_WORKFLOW[0],
      number: "01",
      title: "Request",
      detail: ticket ? `${ticket.source} request captured for ${ticket.customer}` : "Customer request captured",
      state: ticket ? "done" : "pending"
    },
    {
      ...SERVICE_WORKFLOW[1],
      number: "02",
      title: "Ticket",
      detail: ticket ? `${ticket.id}: ${ticket.priority} priority, ${ticket.status} status` : "Service ticket registration pending",
      state: ticket?.id ? "done" : "pending"
    },
    {
      ...SERVICE_WORKFLOW[2],
      number: "03",
      title: "AMC check",
      detail: amc
        ? `${amc.hoursLeft}/${amc.hoursTotal} hours and ${amc.visitsLeft}/${amc.visitsTotal} visits left`
        : ticket
        ? `${ticket.amc} service classification recorded`
        : "AMC entitlement check pending",
      state: amcDecisionKnown ? "done" : "blocked"
    },
    {
      ...SERVICE_WORKFLOW[3],
      number: "04",
      title: "Engineer",
      detail: ticket?.engineer ? `${ticket.engineer} assigned to ${ticket.machine}` : "Engineer assignment pending",
      state: ticket?.engineer ? "done" : "pending"
    },
    {
      ...SERVICE_WORKFLOW[4],
      number: "05",
      title: "Parts",
      detail: part
        ? `${part.code}: ${partStatusLabel(part)}, qty ${part.qty}, min ${part.min}`
        : ticket?.part
        ? `${ticket.part} needs stores confirmation`
        : "No part requirement linked",
      state: part ? (partAvailable ? "done" : "blocked") : ticket?.part ? "pending" : "done"
    },
    {
      ...SERVICE_WORKFLOW[5],
      number: "06",
      title: "Follow-up",
      detail: handoff?.nextAction || (ticket?.status === "Delayed" ? "Coordinator must confirm revised SLA" : "Customer update and closure follow-up"),
      state: followUpState
    },
    {
      ...SERVICE_WORKFLOW[6],
      number: "07",
      title: "Report",
      detail: "Update machine history, AMC utilization and management report",
      state: ticket?.status === "Completed" ? "done" : "pending"
    }
  ];
}

function ticketPipelineSteps(handoff, context, currentLabel) {
  return serviceWorkflowSteps(context.ticket, handoff, currentLabel, context);
}

function amcPipelineSteps(handoff, context, currentLabel) {
  const amc = context.amc;
  const linkedTickets = context.linkedTickets;
  return [
    {
      title: "AMC record loaded",
      owner: "AMC register",
      detail: amc ? `${amc.customer}, machine ${amc.serial}` : "AMC record linked",
      state: "done"
    },
    {
      title: "Expiry checked",
      owner: "Accounts",
      detail: amc ? `${formatDate(amc.expiry)} - ${Math.max(daysUntil(amc.expiry), 0)} days left` : "Expiry check pending",
      state: "done"
    },
    {
      title: "Entitlement balance checked",
      owner: "Accounts",
      detail: amc ? `${amc.hoursLeft}/${amc.hoursTotal} hours and ${amc.visitsLeft}/${amc.visitsTotal} visits left` : "Entitlement balance unavailable",
      state: amc && (Number(amc.hoursLeft) <= 0 || Number(amc.visitsLeft) <= 0) ? "blocked" : "done"
    },
    {
      title: "Related service tickets scanned",
      owner: "Service",
      detail: `${linkedTickets.length} linked ticket${linkedTickets.length === 1 ? "" : "s"} found`,
      state: "done"
    },
    {
      title: "Commercial approval",
      owner: handoff.department,
      detail: handoff.nextAction,
      state: currentLabel
    },
    {
      title: "Billing or renewal decision",
      owner: "Accounts / Sales",
      detail: "Mark work as included, chargeable or renewal follow-up",
      state: "pending"
    },
    {
      title: "Notify service team and update report",
      owner: "Management",
      detail: "Publish entitlement decision to service queue and dashboard",
      state: "pending"
    }
  ];
}

function quotePipelineSteps(handoff, context, currentLabel) {
  const quote = context.quote;
  return [
    {
      title: "Quotation registered",
      owner: "Sales",
      detail: quote ? `AED ${Number(quote.value).toLocaleString("en-AE")} quotation for ${quote.customer}` : "Quotation record linked",
      state: "done"
    },
    {
      title: "Follow-up date monitored",
      owner: "AI reminders",
      detail: quote ? `${formatDate(quote.followUp)} - ${quoteStatus(quote)}` : "Follow-up monitor ready",
      state: quote && quoteStatus(quote) === "Overdue" ? "blocked" : "done"
    },
    {
      title: "Sales owner assigned",
      owner: handoff.owner,
      detail: `${handoff.owner} owns customer follow-up`,
      state: "done"
    },
    {
      title: "Customer response update",
      owner: handoff.department,
      detail: handoff.nextAction,
      state: currentLabel
    },
    {
      title: "Conversion status updated",
      owner: "Sales / Accounts",
      detail: quote ? `Current stage: ${quote.stage}` : "Stage update pending",
      state: quote && (quote.stage === "Won" || quote.stage === "Lost") ? "done" : "pending"
    },
    {
      title: "Management forecast updated",
      owner: "Power BI",
      detail: "Update overdue follow-up, pipeline value and conversion report",
      state: "pending"
    }
  ];
}

function partPipelineSteps(handoff, context, currentLabel) {
  const part = context.part;
  return [
    {
      title: "Part record loaded",
      owner: "Stores",
      detail: part ? `${part.code} - ${part.name}` : "Part record linked",
      state: "done"
    },
    {
      title: "Stock threshold checked",
      owner: "Inventory",
      detail: part ? `Qty ${part.qty}, minimum ${part.min}, ${partStatusLabel(part)}` : "Stock threshold pending",
      state: part && partStatus(part) === "InStock" ? "done" : "blocked"
    },
    {
      title: "Stores action assigned",
      owner: handoff.department,
      detail: handoff.nextAction,
      state: currentLabel
    },
    {
      title: "Supplier or reorder decision",
      owner: "Stores / Accounts",
      detail: part ? `${part.leadTime} day lead time to plan customer impact` : "Supplier decision pending",
      state: "pending"
    },
    {
      title: "Service team notified",
      owner: "Service",
      detail: "Update linked service request with stock availability",
      state: "pending"
    },
    {
      title: "Inventory report updated",
      owner: "Power BI",
      detail: "Update low stock, lead time and reorder visibility",
      state: "pending"
    }
  ];
}

function handoffContext(handoff) {
  const linkText = String(handoff.linkedTo || "");
  const ticket = state.tickets.find((item) => item.id === handoff.recordId || item.id === linkText);
  const quote = state.quotes.find((item) => item.id === handoff.recordId || item.id === linkText);
  const amc = state.amcs.find((item) => item.id === handoff.recordId || linkText.includes(item.id) || (ticket && item.serial === ticket.serial));
  const part = state.parts.find((item) => item.code === handoff.recordId || linkText.includes(item.code) || (ticket && item.code === ticket.part));
  const linkedTickets = amc ? state.tickets.filter((item) => item.serial === amc.serial) : [];
  return { ticket, quote, amc, part, linkedTickets };
}

function renderHandoffPipeline(handoff, pipeline) {
  const statusText = handoff.status === "Completed" ? "Pipeline completed" : `${pipeline.left.length} step${pipeline.left.length === 1 ? "" : "s"} left`;
  return `
    <div class="pipeline-hero">
      <div>
        <p class="eyebrow">AI coordination pipeline</p>
        <h4>${escapeHtml(handoff.recordId)} - ${escapeHtml(handoff.customer)}</h4>
        <p>${escapeHtml(handoff.note)}</p>
      </div>
      <span class="badge ${className(handoff.status)}">${escapeHtml(handoff.status)}</span>
    </div>

    <div class="detail-summary-grid">
      <div class="detail-summary-item">
        <span>Current department</span>
        <strong>${escapeHtml(handoff.department)}</strong>
      </div>
      <div class="detail-summary-item">
        <span>Owner</span>
        <strong>${escapeHtml(handoff.owner)}</strong>
      </div>
      <div class="detail-summary-item">
        <span>Due date</span>
        <strong>${formatDate(handoff.due)}</strong>
        <small>${handoffDueText(handoff.due)}</small>
      </div>
      <div class="detail-summary-item">
        <span>Progress</span>
        <strong>${pipeline.progress}%</strong>
        <small>${statusText}</small>
      </div>
    </div>

    <div class="pipeline-progress" aria-label="Pipeline progress">
      <div style="width:${pipeline.progress}%"></div>
    </div>

    <div class="connection-strip" aria-label="Connected prototype modules">
      ${pipeline.steps.map((step) => `<span>${escapeHtml(step.owner)}</span>`).join("")}
    </div>

    <div class="pipeline-grid">
      ${pipeline.steps
        .map(
          (step, index) => `
            <article class="pipeline-step ${step.state}">
              <div class="step-index">${String(index + 1).padStart(2, "0")}</div>
              <div>
                <div class="step-top">
                  <strong>${escapeHtml(step.title)}</strong>
                  <span class="step-state">${stepStateLabel(step.state)}</span>
                </div>
                <p>${escapeHtml(step.detail)}</p>
                <div class="step-footer">
                  <small>${escapeHtml(step.owner)}</small>
                  ${
                    step.state === "done"
                      ? ""
                      : `<button class="row-button step-notify" data-handoff-id="${escapeHtml(handoff.id)}" data-notify-step="${index}">Draft email</button>`
                  }
                </div>
              </div>
            </article>
          `
        )
        .join("")}
    </div>

    <div class="pipeline-split">
      <section>
        <p class="eyebrow">Done so far</p>
        ${renderPipelineMiniList(pipeline.done, "No completed steps yet")}
      </section>
      <section>
        <p class="eyebrow">Left to complete</p>
        ${renderPipelineMiniList(pipeline.left, "No remaining steps")}
      </section>
    </div>

    <section class="notification-log">
      <div class="panel-heading compact-heading">
        <div>
          <p class="eyebrow">Outlook draft log</p>
          <h4>Email drafts created from this handoff</h4>
        </div>
      </div>
      ${renderNotificationLog(handoff)}
    </section>
  `;
}

function renderPipelineMiniList(steps, emptyMessage) {
  return steps.length
    ? `<div class="pipeline-mini-list">${steps.map((step) => `<span>${escapeHtml(step.title)}</span>`).join("")}</div>`
    : `<div class="empty-detail">${escapeHtml(emptyMessage)}</div>`;
}

function sendPipelineStepNotification(handoffId, stepIndex) {
  const handoff = state.handoffs.find((item) => item.id === handoffId);
  if (!handoff) return;

  const pipeline = buildHandoffPipeline(handoff);
  const step = pipeline.steps[stepIndex];
  if (!step) return;

  const notification = sendHandoffNotification(handoff, step, "Pipeline step action");
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  renderCoordination();
  renderReports();
  els.syncStatus.textContent = `Outlook draft opened for ${notification.to}`;
  els.detailModalBody.innerHTML = renderHandoffPipeline(handoff, buildHandoffPipeline(handoff));
  openEmailDraft(notification);
}

function sendHandoffNotification(handoff, step, trigger) {
  if (!Array.isArray(handoff.notifications)) {
    handoff.notifications = [];
  }

  const recipient = notificationRecipient(handoff, step);
  const notification = {
    id: nextId("EML", handoff.notifications),
    trigger,
    to: recipient.email,
    recipient: recipient.label,
    subject: `${handoff.recordId}: ${step ? step.title : handoff.nextAction}`,
    body: notificationBody(handoff, step, recipient.label),
    draftedAt: notificationTimestamp()
  };

  handoff.notifications.push(notification);
  return notification;
}

function notificationRecipient(handoff, step) {
  const title = String(step?.title || "").toLowerCase();
  const owner = String(step?.owner || handoff.owner || handoff.department || "");

  if (title.includes("customer")) {
    return { label: handoff.customer, email: customerEmail(handoff.customer) };
  }

  const normalizedOwner = owner.split("/")[0].trim();
  if (emailDirectory[normalizedOwner]) {
    return { label: normalizedOwner, email: emailDirectory[normalizedOwner] };
  }

  if (emailDirectory[owner]) {
    return { label: owner, email: emailDirectory[owner] };
  }

  const lowerOwner = owner.toLowerCase();
  if (lowerOwner.includes("stores") || lowerOwner.includes("inventory")) {
    return { label: "Stores Team", email: emailDirectory["Stores Team"] };
  }
  if (lowerOwner.includes("accounts") || lowerOwner.includes("amc")) {
    return { label: "Accounts Team", email: emailDirectory["Accounts Team"] };
  }
  if (lowerOwner.includes("sales") || lowerOwner.includes("quotation")) {
    return { label: "Sales Team", email: emailDirectory["Sales Team"] };
  }
  if (lowerOwner.includes("management") || lowerOwner.includes("power bi")) {
    return { label: "Management", email: emailDirectory.Management };
  }

  return { label: handoff.department, email: emailDirectory[handoff.department] || "operations@vinsak.com" };
}

function notificationBody(handoff, step, recipientLabel) {
  const action = step ? step.detail : handoff.nextAction;
  return [
    `Hello ${recipientLabel},`,
    "",
    `AI Coordination has flagged ${handoff.recordId} for ${handoff.customer}.`,
    `Current status: ${handoff.status}.`,
    `Required action: ${action}.`,
    `Due date: ${formatDate(handoff.due)} (${handoffDueText(handoff.due)}).`,
    "",
    `Linked record: ${handoff.linkedTo}.`,
    `Coordinator note: ${handoff.note}`,
    "",
    "Please update the handoff tracker after the action is completed."
  ].join("\n");
}

function renderNotificationLog(handoff) {
  const notifications = Array.isArray(handoff.notifications) ? [...handoff.notifications].reverse() : [];

  if (!notifications.length) {
    return `<div class="empty-detail">No email drafts created yet. Use a step's Draft email button or Start the handoff.</div>`;
  }

  return `
    <div class="notification-list">
      ${notifications
        .map(
          (notification) => `
            <article class="notification-item">
              <div>
                <strong>${escapeHtml(notification.subject)}</strong>
                <span>Draft to ${escapeHtml(notification.recipient)} &lt;${escapeHtml(notification.to)}&gt; - ${escapeHtml(notificationTime(notification))}</span>
              </div>
              <pre>${escapeHtml(notification.body)}</pre>
            </article>
          `
        )
        .join("")}
    </div>
  `;
}

function latestNotification(handoff) {
  if (!Array.isArray(handoff.notifications) || !handoff.notifications.length) return null;
  return handoff.notifications.at(-1);
}

function openEmailDraft(notification) {
  const link = document.createElement("a");
  link.href = `mailto:${notification.to}?subject=${encodeURIComponent(notification.subject)}&body=${encodeURIComponent(notification.body)}`;
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
  link.remove();
}

function notificationTime(notification) {
  return notification.draftedAt || notification.sentAt || "Drafted";
}

function customerEmail(customer) {
  const slug = String(customer || "customer")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ".")
    .replace(/^\.+|\.+$/g, "");
  return `${slug || "customer"}@customer.example`;
}

function notificationTimestamp() {
  return new Date().toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function openAmcDetails(amcId) {
  const amc = state.amcs.find((item) => item.id === amcId);
  if (!amc) return;

  const linkedTickets = state.tickets.filter((ticket) => ticket.serial === amc.serial);
  const usedHours = Math.max(0, Number(amc.hoursTotal) - Number(amc.hoursLeft));
  const usedVisits = Math.max(0, Number(amc.visitsTotal) - Number(amc.visitsLeft));
  const expiryDays = daysUntil(amc.expiry);
  const status = amcStatus(amc);
  const billingRisk = Number(amc.hoursLeft) <= 0 || Number(amc.visitsLeft) <= 0 ? "Chargeable review needed" : "Within entitlement";

  els.detailModalTitle.textContent = `${amc.customer} AMC`;
  els.detailModalMeta.textContent = `AMC utilization - ${amc.id}`;
  els.detailModalBody.innerHTML = `
    <div class="detail-summary-grid">
      <div class="detail-summary-item">
        <span>Machine serial</span>
        <strong>${escapeHtml(amc.serial)}</strong>
      </div>
      <div class="detail-summary-item">
        <span>Status</span>
        <strong><span class="badge ${status}">${status}</span></strong>
      </div>
      <div class="detail-summary-item">
        <span>Expiry</span>
        <strong>${formatDate(amc.expiry)}</strong>
        <small>${expiryDays >= 0 ? `${expiryDays} days left` : `${Math.abs(expiryDays)} days expired`}</small>
      </div>
      <div class="detail-summary-item">
        <span>Billing flag</span>
        <strong>${escapeHtml(billingRisk)}</strong>
      </div>
    </div>

    <div class="entitlement-grid">
      <section class="entitlement-card">
        <p class="eyebrow">Service hours entitlement</p>
        <h4>${usedHours} / ${Number(amc.hoursTotal)} used</h4>
        <div class="util-track"><div class="util-fill" style="width:${utilizationPercent(usedHours, amc.hoursTotal)}%"></div></div>
        <div class="contract-meta">
          <span>Included hours <strong>${Number(amc.hoursTotal)}</strong></span>
          <span>Remaining hours <strong>${Number(amc.hoursLeft)}</strong></span>
          <span>Chargeable after <strong>${Number(amc.hoursTotal)} hours</strong></span>
        </div>
      </section>

      <section class="entitlement-card">
        <p class="eyebrow">Breakdown visit entitlement</p>
        <h4>${usedVisits} / ${Number(amc.visitsTotal)} used</h4>
        <div class="util-track"><div class="util-fill" style="width:${utilizationPercent(usedVisits, amc.visitsTotal)}%"></div></div>
        <div class="contract-meta">
          <span>Included visits <strong>${Number(amc.visitsTotal)}</strong></span>
          <span>Remaining visits <strong>${Number(amc.visitsLeft)}</strong></span>
          <span>Chargeable after <strong>${Number(amc.visitsTotal)} visits</strong></span>
        </div>
      </section>
    </div>

    <section class="detail-block">
      <div class="panel-heading compact-heading">
        <div>
          <p class="eyebrow">Service history under this AMC</p>
          <h4>Linked machine tickets</h4>
        </div>
      </div>
      ${renderDetailTable(ticketColumns(), linkedTickets, "No service tickets linked to this AMC yet.")}
    </section>
  `;

  if (typeof els.detailModal.showModal === "function") {
    els.detailModal.showModal();
  } else {
    els.detailModal.setAttribute("open", "");
  }
}

function metricDetail(metricKey) {
  const details = {
    "open-tickets": {
      title: "Open tickets",
      register: "Ticket register",
      records: () => state.tickets.filter((ticket) => ticket.status === "Open"),
      emptyMessage: "No open tickets found.",
      columns: ticketColumns()
    },
    "delayed-tickets": {
      title: "Delayed tickets",
      register: "Ticket register",
      records: () => state.tickets.filter((ticket) => ticket.status === "Delayed"),
      emptyMessage: "No delayed tickets found.",
      columns: ticketColumns()
    },
    "amc-expiring": {
      title: "AMC expiring",
      register: "AMC utilization",
      records: () => state.amcs.filter((amc) => amcStatus(amc) === "Expiring"),
      emptyMessage: "No expiring AMC records found.",
      columns: [
        { heading: "ID", cell: (amc) => `<span class="id-cell">${escapeHtml(amc.id)}</span>` },
        { heading: "Customer", cell: (amc) => escapeHtml(amc.customer) },
        { heading: "Machine serial", cell: (amc) => escapeHtml(amc.serial) },
        { heading: "Expiry", cell: (amc) => `${formatDate(amc.expiry)}<div class="small-muted">${Math.max(daysUntil(amc.expiry), 0)} days left</div>` },
        { heading: "Hours left", cell: (amc) => `${Number(amc.hoursLeft)} / ${Number(amc.hoursTotal)}` },
        { heading: "Visits left", cell: (amc) => `${Number(amc.visitsLeft)} / ${Number(amc.visitsTotal)}` },
        { heading: "Status", cell: (amc) => `<span class="badge ${amcStatus(amc)}">${amcStatus(amc)}</span>` }
      ]
    },
    "quote-overdue": {
      title: "Quote overdue",
      register: "Quotation follow-up register",
      records: () => state.quotes.filter((quote) => quoteStatus(quote) === "Overdue"),
      emptyMessage: "No overdue quotation follow-ups found.",
      columns: [
        { heading: "ID", cell: (quote) => `<span class="id-cell">${escapeHtml(quote.id)}</span>` },
        { heading: "Customer", cell: (quote) => escapeHtml(quote.customer) },
        { heading: "Value", cell: (quote) => `AED ${Number(quote.value).toLocaleString("en-AE")}` },
        { heading: "Stage", cell: (quote) => `<span class="badge ${className(quote.stage)}">${escapeHtml(quote.stage)}</span>` },
        { heading: "Follow-up", cell: (quote) => `${formatDate(quote.followUp)}<div class="small-muted">${Math.abs(daysUntil(quote.followUp))} days overdue</div>` },
        { heading: "Status", cell: (quote) => `<span class="badge ${quoteStatus(quote)}">${quoteStatus(quote)}</span>` }
      ]
    },
    "low-stock-parts": {
      title: "Low stock parts",
      register: "Parts register",
      records: () => state.parts.filter((part) => partStatus(part) === "LowStock"),
      emptyMessage: "No low stock parts found.",
      columns: [
        { heading: "Code", cell: (part) => `<span class="id-cell">${escapeHtml(part.code)}</span>` },
        { heading: "Name", cell: (part) => escapeHtml(part.name) },
        { heading: "Qty", cell: (part) => Number(part.qty) },
        { heading: "Minimum", cell: (part) => Number(part.min) },
        { heading: "Location", cell: (part) => locationText(part) },
        { heading: "Lead time", cell: (part) => `${Number(part.leadTime)} days` },
        { heading: "Status", cell: (part) => `<span class="badge ${partStatus(part)}">${partStatusLabel(part)}</span>` }
      ]
    },
    "service-hours": {
      title: "Service hours",
      register: "Ticket worklog",
      records: () => state.tickets.filter((ticket) => Number(ticket.hoursUsed || 0) > 0),
      emptyMessage: "No service hours logged.",
      columns: [
        { heading: "Ticket", cell: (ticket) => `<span class="id-cell">${escapeHtml(ticket.id)}</span>` },
        { heading: "Customer", cell: (ticket) => escapeHtml(ticket.customer) },
        { heading: "Machine", cell: (ticket) => `${escapeHtml(ticket.machine)}<div class="small-muted">${escapeHtml(ticket.serial)}</div>` },
        { heading: "Engineer", cell: (ticket) => escapeHtml(ticket.engineer) },
        { heading: "Status", cell: (ticket) => `<span class="badge ${ticket.status}">${ticket.status}</span>` },
        { heading: "Hours", cell: (ticket) => `<strong>${Number(ticket.hoursUsed || 0)}</strong>` }
      ],
      footer: (records) => `Total service hours: ${records.reduce((sum, ticket) => sum + Number(ticket.hoursUsed || 0), 0)}`
    }
  };

  const detail = details[metricKey];
  if (!detail) return null;
  return {
    ...detail,
    meta: detail.meta || ((records) => `${detail.register} - ${records.length} ${records.length === 1 ? "record" : "records"}`)
  };
}

function ticketColumns() {
  return [
    { heading: "ID", cell: (ticket) => `<span class="id-cell">${escapeHtml(ticket.id)}</span>` },
    { heading: "Customer", cell: (ticket) => `${escapeHtml(ticket.customer)}<div class="small-muted">${escapeHtml(ticket.source)}</div>` },
    { heading: "Issue", cell: (ticket) => `${escapeHtml(ticket.type)}<div class="small-muted">${escapeHtml(ticket.issue)}</div>` },
    { heading: "Part", cell: (ticket) => escapeHtml(ticket.part) },
    { heading: "Priority", cell: (ticket) => `<span class="badge ${ticket.priority}">${ticket.priority}</span>` },
    { heading: "Status", cell: (ticket) => `<span class="badge ${ticket.status}">${ticket.status}</span>` },
    { heading: "Engineer", cell: (ticket) => escapeHtml(ticket.engineer) }
  ];
}

function renderDetailTable(columns, records, emptyMessage, footer) {
  if (!records.length) {
    return `<div class="empty-detail">${escapeHtml(emptyMessage)}</div>`;
  }

  return `
    <div class="table-wrap modal-table">
      <table>
        <thead>
          <tr>${columns.map((column) => `<th>${escapeHtml(column.heading)}</th>`).join("")}</tr>
        </thead>
        <tbody>
          ${records
            .map(
              (record) => `
                <tr class="${recordStatusClass(record)}">${columns.map((column) => `<td>${column.cell(record)}</td>`).join("")}</tr>
              `
            )
            .join("")}
        </tbody>
      </table>
    </div>
    ${footer ? `<div class="modal-footer-note">${escapeHtml(footer(records))}</div>` : ""}
  `;
}

function recordStatusClass(record) {
  if (!record || !record.status) return "";
  return `status-${className(record.status)}`;
}

function renderMachines() {
  const machineMap = new Map();

  state.tickets.forEach((ticket) => {
    if (!machineMap.has(ticket.serial)) {
      machineMap.set(ticket.serial, {
        customer: ticket.customer,
        machine: ticket.machine,
        serial: ticket.serial,
        tickets: [],
        parts: new Set(),
        hours: 0
      });
    }

    const machine = machineMap.get(ticket.serial);
    machine.tickets.push(ticket);
    machine.parts.add(ticket.part);
    machine.hours += Number(ticket.hoursUsed || 0);
  });

  const machines = [...machineMap.values()].filter((machine) => {
    if (!searchTerm) return true;
    return [machine.customer, machine.machine, machine.serial, ...machine.parts].join(" ").toLowerCase().includes(searchTerm);
  });

  els.machineCards.innerHTML = machines.length
    ? machines
        .map(
          (machine) => `
            <article class="machine-card">
              <p class="eyebrow">${escapeHtml(machine.serial)}</p>
              <h4>${escapeHtml(machine.machine)}</h4>
              <div class="small-muted">${escapeHtml(machine.customer)}</div>
              <div class="machine-meta">
                <span>Total cases <strong>${machine.tickets.length}</strong></span>
                <span>Service hours <strong>${machine.hours}</strong></span>
                <span>Parts replaced <strong>${escapeHtml([...machine.parts].join(", "))}</strong></span>
                <span>Latest status <strong>${escapeHtml(machine.tickets.at(-1).status)}</strong></span>
              </div>
            </article>
          `
        )
        .join("")
    : `<article class="machine-card"><h4>No matching machine history</h4></article>`;
}

function renderReports() {
  const statuses = ["Open", "Delayed", "Completed"];
  const counts = statuses.map((status) => state.tickets.filter((ticket) => ticket.status === status).length);
  const total = counts.reduce((sum, count) => sum + count, 0) || 1;
  const colors = ["var(--teal)", "var(--red)", "var(--blue)"];
  let current = 0;
  const gradient = counts
    .map((count, index) => {
      const start = current;
      current += (count / total) * 100;
      return `${colors[index]} ${start}% ${current}%`;
    })
    .join(", ");
  els.statusDonut.style.background = `conic-gradient(${gradient})`;
  els.statusLegend.innerHTML = statuses
    .map(
      (status, index) => `
        <div class="legend-item">
          <span><i class="legend-dot" style="background:${colors[index]}"></i>${status}</span>
          <strong>${counts[index]}</strong>
        </div>
      `
    )
    .join("");

  const recordCount = state.tickets.length + state.parts.length + state.amcs.length + state.quotes.length + state.handoffs.length;
  els.recordCount.textContent = `${recordCount} records`;
  els.backendPreview.textContent = JSON.stringify(
    {
      lastSync: state.lastSync,
      sourceSystems: ["SAP", "CRM", "Excel trackers", "Service portal", "Stores updates"],
      modules: {
        tickets: state.tickets.length,
        spareParts: state.parts.length,
        amcContracts: state.amcs.length,
        quotations: state.quotes.length,
        departmentHandoffs: state.handoffs.length,
        machineHistory: new Set(state.tickets.map((ticket) => ticket.serial)).size
      },
      sampleLatestTicket: state.tickets.at(-1),
      sampleInventoryRecord: state.parts.at(-1)
    },
    null,
    2
  );

  const readiness = Math.min(92, Math.round((state.tickets.length * 8 + state.parts.length * 4 + state.amcs.length * 5) / 2));
  els.readinessFill.style.width = `${readiness}%`;
  els.readinessText.textContent = `${readiness}%`;
  els.syncStatus.textContent = `Synced ${state.lastSync}`;
}

function saveTicket(event) {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.currentTarget).entries());
  const selectedPart = state.parts.find((part) => part.code === data.part);
  const priority = calculatePriority(data, selectedPart);
  const status = priority === "High" ? "Open" : "Open";
  const ticket = {
    id: nextId("TKT", state.tickets),
    customer: data.customer.trim(),
    source: data.source,
    machine: data.machine.trim(),
    serial: data.serial.trim(),
    type: data.type,
    issue: data.issue.trim(),
    amc: data.amc,
    engineer: data.engineer,
    part: data.part,
    priority,
    status,
    created: toDateInput(today),
    hoursUsed: priority === "High" ? 4 : priority === "Medium" ? 2 : 1
  };

  state.tickets.push(ticket);
  addHandoff({
    type: "Ticket",
    recordId: ticket.id,
    customer: ticket.customer,
    department: ticket.type === "Spare part request" ? "Stores" : "Service",
    owner: ticket.type === "Spare part request" ? "Stores Team" : ticket.engineer,
    nextAction: ticket.type === "Spare part request" ? `Confirm ${ticket.part} availability` : "Schedule engineer visit and update customer",
    status: "Pending",
    due: toDateInput(today),
    linkedTo: `${ticket.amc} / ${ticket.part}`,
    note: `${ticket.priority} priority request created from ${ticket.source}.`
  });
  event.currentTarget.reset();
  renderSelectors();
  persistState(`Ticket ${ticket.id} saved`);
}

function savePart(event) {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.currentTarget).entries());
  const part = {
    code: data.code.trim().toUpperCase(),
    name: data.name.trim(),
    qty: Number(data.qty),
    min: Number(data.min),
    leadTime: Number(data.leadTime),
    warehouse: data.warehouse.trim().toUpperCase(),
    rack: data.rack.trim().toUpperCase(),
    shelf: data.shelf.trim(),
    bin: data.bin.trim()
  };

  const existingIndex = state.parts.findIndex((item) => item.code === part.code);
  if (existingIndex >= 0) {
    state.parts[existingIndex] = part;
  } else {
    state.parts.push(part);
  }

  if (partStatus(part) !== "InStock" && !state.handoffs.some((handoff) => handoff.recordId === part.code && handoff.status !== "Completed")) {
    addHandoff({
      type: "Part",
      recordId: part.code,
      customer: "Stores",
      department: "Stores",
      owner: "Stores Team",
      nextAction: `Raise reorder or supplier follow-up for ${part.name}`,
      status: "Waiting",
      due: toDateInput(today),
      linkedTo: `${part.warehouse} / Rack ${part.rack} / Shelf ${part.shelf} / Bin ${part.bin}`,
      note: `${partStatusLabel(part)} item needs inventory action.`
    });
  }

  event.currentTarget.reset();
  persistState(`Part ${part.code} saved`);
}

function saveAmc(event) {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.currentTarget).entries());
  const amc = {
    id: nextId("AMC", state.amcs),
    customer: data.customer.trim(),
    serial: data.serial.trim(),
    expiry: data.expiry,
    hoursLeft: Number(data.hoursLeft),
    hoursTotal: Math.max(Number(data.hoursLeft), 50),
    visitsLeft: Number(data.visitsLeft),
    visitsTotal: Math.max(Number(data.visitsLeft), 2)
  };

  state.amcs.push(amc);
  if (amcStatus(amc) === "Expiring" || Number(amc.hoursLeft) <= 0 || Number(amc.visitsLeft) <= 0) {
    addHandoff({
      type: "AMC",
      recordId: amc.id,
      customer: amc.customer,
      department: "Accounts",
      owner: "Accounts Team",
      nextAction: "Review AMC entitlement and renewal or chargeable billing",
      status: "Pending",
      due: toDateInput(today),
      linkedTo: amc.serial,
      note: "AMC requires commercial review before further service work."
    });
  }
  event.currentTarget.reset();
  setInitialDates();
  persistState(`AMC ${amc.id} saved`);
}

function saveQuote(event) {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.currentTarget).entries());
  const quote = {
    id: nextId("QT", state.quotes),
    customer: data.customer.trim(),
    value: Number(data.value),
    stage: data.stage,
    followUp: data.followUp
  };

  state.quotes.push(quote);
  addHandoff({
    type: "Quotation",
    recordId: quote.id,
    customer: quote.customer,
    department: "Sales",
    owner: "Sales Team",
    nextAction: "Follow up customer response and update quotation stage",
    status: quote.stage === "Won" || quote.stage === "Lost" ? "Completed" : quoteStatus(quote),
    due: quote.followUp,
    linkedTo: quote.id,
    note: `Quotation value AED ${Number(quote.value).toLocaleString("en-AE")}.`
  });
  event.currentTarget.reset();
  setInitialDates();
  persistState(`Quote ${quote.id} saved`);
}

function toggleTicketStatus(ticketId) {
  const ticket = state.tickets.find((item) => item.id === ticketId);
  if (!ticket) return;
  ticket.status = ticket.status === "Completed" ? "Open" : "Completed";
  persistState(`Ticket ${ticketId} updated`);
}

function advanceHandoff(handoffId) {
  const handoff = state.handoffs.find((item) => item.id === handoffId);
  if (!handoff) return;

  if (handoff.status === "Completed") {
    handoff.status = "Pending";
  } else if (handoff.status === "In progress") {
    handoff.status = "Completed";
  } else {
    handoff.status = "In progress";
  }

  const notification = sendHandoffNotification(handoff, null, handoff.status === "Completed" ? "Completion update" : "Coordinator action");
  persistState(`Handoff ${handoff.id} moved to ${handoff.status}. Outlook draft opened for ${notification.to}`);
  openEmailDraft(notification);
}

function addHandoff(handoff) {
  state.handoffs.push({
    id: nextId("HOF", state.handoffs),
    ...handoff
  });
}

function calculatePriority(ticket, part) {
  let score = 0;
  if (ticket.type === "Breakdown support") score += 3;
  if (ticket.type === "Customer complaint") score += 2;
  if (ticket.amc === "Expiring Soon") score += 2;
  if (ticket.amc === "Chargeable") score += 1;
  if (part && Number(part.qty) <= Number(part.min)) score += 2;
  if (part && Number(part.leadTime) >= 21) score += 1;

  if (score >= 5) return "High";
  if (score >= 3) return "Medium";
  return "Low";
}

function filteredTickets() {
  return filterRecords(state.tickets, ["id", "customer", "machine", "serial", "type", "issue", "amc", "engineer", "part", "priority", "status"]);
}

function filterRecords(records, fields) {
  if (!searchTerm) return records;
  return records.filter((record) => fields.some((field) => String(record[field] ?? "").toLowerCase().includes(searchTerm)));
}

function partStatus(part) {
  if (Number(part.qty) <= Number(part.min)) return "LowStock";
  if (Number(part.leadTime) >= 21) return "Critical";
  return "InStock";
}

function amcStatus(amc) {
  return daysUntil(amc.expiry) <= 45 ? "Expiring" : "Active";
}

function quoteStatus(quote) {
  if (quote.stage === "Won" || quote.stage === "Lost") return quote.stage;
  return daysUntil(quote.followUp) < 0 ? "Overdue" : "Pending";
}

function utilizationPercent(used, total) {
  return Number(total) ? Math.min(100, Math.round((Number(used) / Number(total)) * 100)) : 0;
}

function handoffStatusRank(status) {
  const ranks = {
    Overdue: 0,
    Delayed: 1,
    Waiting: 2,
    Pending: 3,
    "In progress": 4,
    Completed: 5
  };
  return ranks[status] ?? 6;
}

function handoffActionLabel(status) {
  if (status === "Completed") return "Reopen";
  if (status === "In progress") return "Complete";
  return "Start";
}

function handoffDueText(dateString) {
  const dueDays = daysUntil(dateString);
  if (dueDays < 0) return `${Math.abs(dueDays)} days overdue`;
  if (dueDays === 0) return "Due today";
  return `${dueDays} days left`;
}

function stepStateLabel(state) {
  const labels = {
    done: "Done",
    current: "Current",
    blocked: "Needs action",
    pending: "Left"
  };
  return labels[state] || state;
}

function partStatusLabel(part) {
  if (Number(part.qty) <= Number(part.min)) return "Low stock";
  if (Number(part.leadTime) >= 21) return "Long lead";
  return "In stock";
}

function locationText(part) {
  return `${escapeHtml(part.warehouse)} / Rack ${escapeHtml(part.rack)} / Shelf ${escapeHtml(part.shelf)} / Bin ${escapeHtml(part.bin)}`;
}

function nextId(prefix, records) {
  const max = records.reduce((highest, record) => {
    const match = String(record.id || "").match(/(\d+)$/);
    return match ? Math.max(highest, Number(match[1])) : highest;
  }, 0);
  return `${prefix}-${max + 1}`;
}

function daysUntil(dateString) {
  const target = new Date(`${dateString}T12:00:00+04:00`);
  return Math.ceil((target - today) / 86400000);
}

function formatDate(dateString) {
  return new Date(`${dateString}T12:00:00+04:00`).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}

function toDateInput(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function firstName(name) {
  return name.split(" ")[0];
}

function className(value) {
  return String(value).replace(/\s+/g, "");
}

function emptyRow(colspan, message) {
  return `<tr><td colspan="${colspan}" class="small-muted">${message}</td></tr>`;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function exportData() {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "smart-serviceconnect-mis-data.json";
  link.click();
  URL.revokeObjectURL(url);
}

function resetData() {
  state = migrateState(structuredClone(seedData));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  setInitialDates();
  renderAll();
}
