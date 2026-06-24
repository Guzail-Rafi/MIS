const STORAGE_KEY = "vinsak-smart-serviceconnect-mis-v1";

const today = new Date("2026-06-24T12:00:00+04:00");

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
  lastSync: "2026-06-24 18:00 GST"
};

let state = loadState();
let ticketFilter = "all";
let searchTerm = "";

const els = {};

document.addEventListener("DOMContentLoaded", () => {
  bindElements();
  bindEvents();
  setInitialDates();
  renderAll();
});

function bindElements() {
  [
    "metricGrid",
    "homeTicketRows",
    "urgentCount",
    "alertList",
    "engineerBars",
    "partsAttention",
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
    "globalSearch"
  ].forEach((id) => {
    els[id] = document.getElementById(id);
  });
}

function bindEvents() {
  document.querySelectorAll(".nav-item").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".nav-item").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      document.getElementById(button.dataset.target).scrollIntoView({ behavior: "smooth", block: "start" });
    });
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
  });

  document.getElementById("ticketForm").addEventListener("submit", saveTicket);
  document.getElementById("partForm").addEventListener("submit", savePart);
  document.getElementById("amcForm").addEventListener("submit", saveAmc);
  document.getElementById("quoteForm").addEventListener("submit", saveQuote);
  document.getElementById("exportData").addEventListener("click", exportData);
  document.getElementById("resetData").addEventListener("click", resetData);
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
    return structuredClone(seedData);
  }

  try {
    return { ...structuredClone(seedData), ...JSON.parse(stored) };
  } catch {
    return structuredClone(seedData);
  }
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
  els.syncStatus.textContent = message;
  renderAll();
}

function renderAll() {
  renderSelectors();
  renderMetrics();
  renderAlerts();
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
  const openTickets = state.tickets.filter((ticket) => ticket.status !== "Completed").length;
  const delayed = state.tickets.filter((ticket) => ticket.status === "Delayed").length;
  const expiringAmc = state.amcs.filter((amc) => daysUntil(amc.expiry) <= 45).length;
  const overdueQuotes = state.quotes.filter((quote) => quote.stage !== "Won" && quote.stage !== "Lost" && daysUntil(quote.followUp) < 0).length;
  const lowStock = state.parts.filter((part) => Number(part.qty) <= Number(part.min)).length;
  const serviceHours = state.tickets.reduce((sum, ticket) => sum + Number(ticket.hoursUsed || 0), 0);

  const metrics = [
    { label: "Open tickets", value: openTickets, note: "service cases active", tone: "teal", tag: "ST" },
    { label: "Delayed tickets", value: delayed, note: "SLA escalation risk", tone: "red", tag: "SLA" },
    { label: "AMC expiring", value: expiringAmc, note: "within 45 days", tone: "gold", tag: "AMC" },
    { label: "Quote overdue", value: overdueQuotes, note: "needs sales follow-up", tone: "blue", tag: "QT" },
    { label: "Low stock parts", value: lowStock, note: "below minimum level", tone: "red", tag: "SP" },
    { label: "Service hours", value: serviceHours, note: "logged this cycle", tone: "teal", tag: "HR" }
  ];

  els.metricGrid.innerHTML = metrics
    .map(
      (metric) => `
        <article class="metric-card">
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
          (ticket) => `
            <tr>
              <td class="id-cell">${ticket.id}</td>
              <td>${escapeHtml(ticket.customer)}</td>
              <td>
                ${escapeHtml(ticket.machine)}
                <div class="small-muted">${escapeHtml(ticket.serial)}</div>
              </td>
              <td><span class="badge ${className(ticket.amc)}">${escapeHtml(ticket.amc)}</span></td>
              <td><span class="badge ${ticket.priority}">${ticket.priority}</span></td>
              <td><span class="badge ${ticket.status}">${ticket.status}</span></td>
              <td>${escapeHtml(ticket.engineer)}</td>
            </tr>
          `
        )
        .join("")
    : emptyRow(7, "No matching active tickets");
}

function renderTickets() {
  const rows = filteredTickets().filter((ticket) => ticketFilter === "all" || ticket.status === ticketFilter);

  els.ticketRows.innerHTML = rows.length
    ? rows
        .map(
          (ticket) => `
            <tr>
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
              <td>
                <button class="row-button" data-complete-ticket="${ticket.id}">
                  ${ticket.status === "Completed" ? "Reopen" : "Complete"}
                </button>
              </td>
            </tr>
          `
        )
        .join("")
    : emptyRow(7, "No matching tickets");

  document.querySelectorAll("[data-complete-ticket]").forEach((button) => {
    button.addEventListener("click", () => toggleTicketStatus(button.dataset.completeTicket));
  });
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
            <div class="compact-item">
              <div>
                <strong>${escapeHtml(part.code)}</strong>
                <span>${escapeHtml(part.name)} - ${locationText(part)}</span>
              </div>
              <span class="badge ${partStatus(part)}">${partStatusLabel(part)}</span>
            </div>
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

function renderAmcs() {
  els.amcCards.innerHTML = state.amcs
    .map((amc) => {
      const used = Math.max(0, Number(amc.hoursTotal) - Number(amc.hoursLeft));
      const percentage = Number(amc.hoursTotal) ? Math.round((used / Number(amc.hoursTotal)) * 100) : 0;
      const expiryDays = daysUntil(amc.expiry);
      const badge = expiryDays <= 30 ? "Expiring" : "Active";
      return `
        <article class="contract-card">
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
          const status = quote.stage === "Won" || quote.stage === "Lost" ? quote.stage : daysUntil(quote.followUp) < 0 ? "Overdue" : "Pending";
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

  const recordCount = state.tickets.length + state.parts.length + state.amcs.length + state.quotes.length;
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
  state = structuredClone(seedData);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  setInitialDates();
  renderAll();
}
