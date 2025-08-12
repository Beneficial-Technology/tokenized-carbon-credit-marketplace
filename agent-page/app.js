const agents = [
  {
    id: 1,
    phase: "Phase 1 — Feasibility & Foundations (0–3 months)",
    name: "Compliance Research Agent",
    role: "Continuously scan for updated Puro.earth & Isometric biochar methodologies.",
    tasks: [
      "Download latest versions.",
      "Parse documents with NLP to extract every measurable compliance requirement (temperature thresholds, lab test types, permanence periods, GPS proof).",
      "Store in a structured compliance matrix."
    ],
    tools: "LangChain + GPT model, PDF parsers, Airtable/Notion database.",
    output: "Machine-readable compliance matrix, updated weekly."
  },
  {
    id: 2,
    phase: "Phase 1 — Feasibility & Foundations (0–3 months)",
    name: "Data Source Mapping Agent",
    role: "Map each compliance requirement to potential sensors, labs, or data providers.",
    tasks: [
      "Pull from IoT sensor catalogs.",
      "Suggest optimal lab partners per region.",
      "Flag any requirement without a data source."
    ],
    tools: "IoT supplier APIs, lab accreditation databases.",
    output: "CSV/JSON mapping table."
  },
  {
    id: 3,
    phase: "Phase 1 — Feasibility & Foundations (0–3 months)",
    name: "Partner Discovery Agent",
    role: "Identify tech and funding partners.",
    tasks: [
      "Search for IoT vendors, blockchain frameworks, cloud/edge providers.",
      "Track climate accelerators and grants with deadlines."
    ],
    tools: "Web scraping + custom search alerts.",
    output: "Ranked shortlist of vendors/funders."
  },
  {
    id: 4,
    phase: "Phase 1 — Feasibility & Foundations (0–3 months)",
    name: "Budget Estimation Agent",
    role: "Auto-generate cost models.",
    tasks: [
      "Pull sensor + cloud + blockchain pricing via APIs.",
      "Apply OPEX/CAPEX formulas."
    ],
    tools: "Excel/Python automation.",
    output: "Versioned cost model spreadsheet."
  },
  {
    id: 5,
    phase: "Phase 2 — Pilot Hardware & Data Pipeline (3–6 months)",
    name: "Sensor Config Agent",
    role: "Automates initial configuration scripts for thermocouples, load cells, GPS, and gas sensors.",
    tasks: [
      "Connects devices to edge gateways with cryptographic signing."
    ]
  },
  {
    id: 6,
    phase: "Phase 2 — Pilot Hardware & Data Pipeline (3–6 months)",
    name: "Data Pipeline Builder Agent",
    role: "Sets up ingestion → time-series DB (InfluxDB) → backup to cloud/IPFS.",
    tasks: [
      "Manages redundancy policies."
    ]
  },
  {
    id: 7,
    phase: "Phase 2 — Pilot Hardware & Data Pipeline (3–6 months)",
    name: "Blockchain Logger Agent",
    role: "Takes hashed sensor events → writes to blockchain (Polygon or Hyperledger).",
    tasks: [
      "Generates QR codes linked to blockchain records."
    ]
  },
  {
    id: 8,
    phase: "Phase 2 — Pilot Hardware & Data Pipeline (3–6 months)",
    name: "Dashboard Auto-Builder Agent",
    role: "Uses Grafana templates to auto-generate a producer-facing dashboard with live data and batch tracking.",
    tasks: []
  },
  {
    id: 9,
    phase: "Phase 3 — AI Layer Development (6–12 months)",
    name: "Anomaly Detection Agent",
    role: "ML-based detection of unrealistic curves, GPS spoofing, weight anomalies.",
    tasks: [
      "Sends alerts to operators and compliance officers."
    ]
  },
  {
    id: 10,
    phase: "Phase 3 — AI Layer Development (6–12 months)",
    name: "Automated LCA Agent",
    role: "Pulls emissions factors + feedstock chemistry data.",
    tasks: [
      "Calculates net CO₂e removal automatically for each batch."
    ]
  },
  {
    id: 11,
    phase: "Phase 3 — AI Layer Development (6–12 months)",
    name: "Satellite/Drone Imaging Agent",
    role: "Matches geotagged imagery to storage site coordinates.",
    tasks: [
      "Flags discrepancies in batch ID ↔ site mapping."
    ]
  },
  {
    id: 12,
    phase: "Phase 3 — AI Layer Development (6–12 months)",
    name: "Compliance Report Agent",
    role: "Auto-produces registry-ready reports for Puro.earth & Isometric.",
    tasks: [
      "Includes raw + processed data."
    ]
  },
  {
    id: 13,
    phase: "Phase 4 — Full Blockchain & Registry Link (12–18 months)",
    name: "Smart Contract Issuance Agent",
    role: "Encodes compliance rules in contracts.",
    tasks: [
      "Releases credits only after verified compliance data."
    ]
  },
  {
    id: 14,
    phase: "Phase 4 — Full Blockchain & Registry Link (12–18 months)",
    name: "Registry API Agent",
    role: "Pushes verified credits directly to Puro/Isometric via API.",
    tasks: []
  },
  {
    id: 15,
    phase: "Phase 4 — Full Blockchain & Registry Link (12–18 months)",
    name: "Auditor Portal Agent",
    role: "Generates secure, read-only auditor dashboards.",
    tasks: [
      "Gives direct blockchain + anomaly report access."
    ]
  },
  {
    id: 16,
    phase: "Phase 4 — Full Blockchain & Registry Link (12–18 months)",
    name: "IoT Security Agent",
    role: "Manages TPM security keys, RBAC, and encrypted API credentials.",
    tasks: []
  },
  {
    id: 17,
    phase: "Phase 5 — Scale-Up & Optimization (18+ months)",
    name: "Deployment Automation Agent",
    role: "Uses pre-configured scripts to set up new sites in <1 day.",
    tasks: []
  },
  {
    id: 18,
    phase: "Phase 5 — Scale-Up & Optimization (18+ months)",
    name: "Predictive Maintenance Agent",
    role: "Trains on historical sensor data to forecast maintenance.",
    tasks: []
  },
  {
    id: 19,
    phase: "Phase 5 — Scale-Up & Optimization (18+ months)",
    name: "Blockchain Cost Optimizer Agent",
    role: "Dynamically batches and compresses blockchain transactions.",
    tasks: []
  },
  {
    id: 20,
    phase: "Phase 5 — Scale-Up & Optimization (18+ months)",
    name: "Marketplace Integration Agent",
    role: "One-click credit listing to connected buyers.",
    tasks: []
  }
];

let currentAgent = agents[0];

function populateAgents() {
  const select = document.getElementById('agent-select');
  agents.forEach((agent, index) => {
    const option = document.createElement('option');
    option.value = index;
    option.textContent = `${agent.id}. ${agent.name}`;
    select.appendChild(option);
  });
  select.addEventListener('change', (e) => {
    currentAgent = agents[e.target.value];
    renderAgentDetails();
  });
  renderAgentDetails();
}

function renderAgentDetails() {
  const details = document.getElementById('agent-details');
  const tasks = currentAgent.tasks && currentAgent.tasks.length
    ? `<p><strong>Tasks:</strong></p><ul>${currentAgent.tasks.map(t => `<li>${t}</li>`).join('')}</ul>`
    : '';
  const tools = currentAgent.tools ? `<p><strong>Tools:</strong> ${currentAgent.tools}</p>` : '';
  const output = currentAgent.output ? `<p><strong>Output:</strong> ${currentAgent.output}</p>` : '';
  details.innerHTML = `
    <h2>${currentAgent.name}</h2>
    <p><strong>Phase:</strong> ${currentAgent.phase}</p>
    <p><strong>Role:</strong> ${currentAgent.role}</p>
    ${tasks}
    ${tools}
    ${output}
  `;
}

document.getElementById('send-btn').addEventListener('click', () => {
  const input = document.getElementById('user-input');
  const chatLog = document.getElementById('chat-log');
  const userMessage = input.value.trim();
  if (userMessage === '') return;

  const userEntry = document.createElement('div');
  userEntry.className = 'user-message';
  userEntry.textContent = `You: ${userMessage}`;
  chatLog.appendChild(userEntry);

  const agentEntry = document.createElement('div');
  agentEntry.className = 'agent-message';
  agentEntry.textContent = `${currentAgent.name}: ${userMessage}`; // echo response
  chatLog.appendChild(agentEntry);

  input.value = '';
  chatLog.scrollTop = chatLog.scrollHeight;
});

populateAgents();
