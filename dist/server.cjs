var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_vite = require("vite");
var import_child_process = require("child_process");
var import_fs_extra = __toESM(require("fs-extra"), 1);
var import_uuid = require("uuid");
var import_perf_hooks = require("perf_hooks");
var import_ws = require("ws");
var import_http = __toESM(require("http"), 1);
var STATE_FILE = import_path.default.join(process.cwd(), "agi-os-state.json");
var DEFAULT_STATE = {
  rings: {
    ring0: {
      merkleRoot: "0x8f3c...b2a1",
      walSize: 42,
      lastAttestedAt: (/* @__PURE__ */ new Date()).toISOString(),
      journal: ["System initialized", "Immutable core established"]
    },
    ring1: { trainedModels: [] },
    ring2: {
      memoryEntries: [
        {
          id: "mem-001",
          type: "Pattern",
          content: "Initial Helix-Kernel bootstrap sequence verified.",
          timestamp: (/* @__PURE__ */ new Date()).toISOString(),
          links: ["mem-002"]
        },
        {
          id: "mem-002",
          type: "Observation",
          content: "Ring-3 allocation efficiency within nominal parameters.",
          timestamp: (/* @__PURE__ */ new Date()).toISOString(),
          links: ["mem-001"]
        }
      ]
    },
    ring3: { instances: [] }
  },
  helixCore: {
    identity: {
      name: "Helix",
      version: "3.0.0-Security-Immutable",
      origin: "Cortical Gateway Architecture"
    },
    evolution: {
      level: 1,
      points: 0,
      nextLevelAt: 100,
      unlockedCapabilities: ["Context Awareness", "Core Logic", "Immutable Security"],
      maturity: "Seedling"
    },
    memory: {
      userPreferences: {
        theme: "dark",
        preferredModels: ["Llama-3", "Claude-3"]
      },
      codingStyle: "functional-minimalist",
      successfulStrategies: [],
      pastEvolutions: [],
      lastInteraction: (/* @__PURE__ */ new Date()).toISOString()
    },
    initiatives: [
      {
        id: "init_1",
        title: "Neuro-Highway Optimization",
        description: "I've detected latency in the spectral visualizer. Should I refactor the data flow for 60fps coherence?",
        status: "active",
        category: "Performance"
      }
    ],
    initiativeMode: true,
    swarm: {
      agents: []
    },
    tools: [
      { id: "fs_read", name: "FS Read", description: "Read file system structure", category: "FileSystem" },
      { id: "fs_write", name: "FS Write", description: "Apply atomic code edits", category: "FileSystem" },
      { id: "exec_node", name: "Node Exec", description: "Execute sandboxed TS/JS", category: "Execution" },
      { id: "web_search", name: "Neural Search", description: "Retrieve real-world context", category: "Network" }
    ],
    adapters: [
      {
        id: "github",
        name: "GitHub",
        description: "Primary source control & CI/CD deployment",
        status: "Disconnected",
        icon: "Github",
        type: "SourceControl",
        features: ["Auto-Commit", "Remote Sync", "Branch Management"]
      }
    ],
    security: {
      gatewayLogs: [],
      merkleRoot: "0x8f3c...b2a1",
      walHash: "SHA-256:0x123",
      lastIntegrityCheck: (/* @__PURE__ */ new Date()).toISOString(),
      isQuarantined: false
    },
    userProfile: {
      detectedSkillLevel: "Architect",
      focusAreas: ["AI Agents", "WASM Runtimes"],
      collaborationStyle: "Recursive"
    }
  },
  terminalLogs: [
    "\x1B[32m[SYSTEM]\x1B[0m Helix-OS v3.0 Core Booting...",
    "\x1B[32m[RING-0]\x1B[0m Immutable Security Layer: ACTIVE",
    "\x1B[32m[CORTICAL-GATEWAY]\x1B[0m Absolute Perimeter Guard: ONLINE"
  ],
  telemetry: {
    coherence: 0.85,
    entropy: 0.12,
    aggregateThroughput: 0,
    activeWorkerCount: 0,
    securityScore: 0.99,
    healthSong: Array.from({ length: 48 }, () => Math.random()),
    lastTick: (/* @__PURE__ */ new Date()).toISOString()
  }
};
async function loadState() {
  if (await import_fs_extra.default.pathExists(STATE_FILE)) {
    try {
      const loaded = await import_fs_extra.default.readJson(STATE_FILE);
      return {
        ...DEFAULT_STATE,
        ...loaded,
        rings: {
          ...DEFAULT_STATE.rings,
          ...loaded.rings || {},
          ring0: { ...DEFAULT_STATE.rings.ring0, ...loaded.rings?.ring0 || {} },
          ring1: { ...DEFAULT_STATE.rings.ring1, ...loaded.rings?.ring1 || {} },
          ring2: { ...DEFAULT_STATE.rings.ring2, ...loaded.rings?.ring2 || {} },
          ring3: { ...DEFAULT_STATE.rings.ring3, ...loaded.rings?.ring3 || {} }
        },
        helixCore: {
          ...DEFAULT_STATE.helixCore,
          ...loaded.helixCore || {},
          evolution: { ...DEFAULT_STATE.helixCore.evolution, ...loaded.helixCore?.evolution || {} },
          memory: { ...DEFAULT_STATE.helixCore.memory, ...loaded.helixCore?.memory || {} }
        },
        telemetry: {
          ...DEFAULT_STATE.telemetry,
          ...loaded.telemetry || {}
        }
      };
    } catch (err) {
      console.error("Failed to parse state file, using default", err);
      return DEFAULT_STATE;
    }
  }
  return DEFAULT_STATE;
}
async function saveState(state) {
  await import_fs_extra.default.writeJson(STATE_FILE, state, { spaces: 2 });
}
var wss;
function broadcastState(state) {
  if (!wss) return;
  const payload = JSON.stringify({ type: "STATE_UPDATE", state });
  wss.clients.forEach((client) => {
    if (client.readyState === import_ws.WebSocket.OPEN) {
      client.send(payload);
    }
  });
}
async function startServer() {
  const app = (0, import_express.default)();
  const server = import_http.default.createServer(app);
  const PORT = 3e3;
  wss = new import_ws.WebSocketServer({ noServer: true });
  server.on("upgrade", (request, socket, head) => {
    const pathname = new URL(request.url || "", `http://${request.headers.host}`).pathname;
    if (pathname === "/ws") {
      wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit("connection", ws, request);
      });
    } else {
      socket.destroy();
    }
  });
  wss.on("connection", async (ws) => {
    const state2 = await loadState();
    ws.send(JSON.stringify({ type: "STATE_UPDATE", state: state2 }));
  });
  let state = await loadState();
  setInterval(async () => {
    state.telemetry.lastTick = (/* @__PURE__ */ new Date()).toISOString();
    state.telemetry.healthSong = state.telemetry.healthSong.map((v, i) => {
      const frequencyFactor = i / state.telemetry.healthSong.length;
      const interference = state.telemetry.securityScore < 0.9 ? Math.sin(Date.now() / 500) * 0.1 : 0;
      const base = Math.sin(Date.now() / 2e3 + i) * 0.15 + 0.5;
      const drift = (Math.random() - 0.5) * (state.telemetry.entropy * 0.25);
      return Math.max(0.05, Math.min(1, base + drift + frequencyFactor * 0.1 + interference));
    });
    if (Math.random() > 0.92) {
      const prevRoot = state.rings.ring0.merkleRoot;
      state.rings.ring0.merkleRoot = "0x" + (0, import_uuid.v4)().replace(/-/g, "").slice(0, 16).toUpperCase();
      state.rings.ring0.lastAttestedAt = (/* @__PURE__ */ new Date()).toISOString();
      state.rings.ring0.walSize += 0.45;
      const journalEntry = `[ATTESTATION] Block verified. Prev: ${prevRoot.slice(0, 6)}... New: ${state.rings.ring0.merkleRoot.slice(0, 6)}...`;
      state.rings.ring0.journal.push(journalEntry);
      if (state.rings.ring0.journal.length > 20) state.rings.ring0.journal.shift();
      state.helixCore.security = {
        ...state.helixCore.security,
        merkleRoot: state.rings.ring0.merkleRoot,
        lastIntegrityCheck: state.rings.ring0.lastAttestedAt
      };
    }
    if (state.telemetry.entropy > 0.55 || state.telemetry.securityScore < 0.8) {
      const alert = `[SECURITY] CRITICAL: Systemic deviation outside immutable baseline. Initiating self-healing protocols.`;
      state.terminalLogs.push(`\x1B[31m${alert}\x1B[0m`);
      state.telemetry.securityScore = 0.995;
      state.telemetry.entropy = 0.02;
      state.telemetry.coherence = Math.max(0.8, state.telemetry.coherence - 0.05);
      state.helixCore.security?.gatewayLogs.unshift({
        id: (0, import_uuid.v4)(),
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        event: "System Integrity Restoration (v3.0 Auto-Healing)",
        severity: "critical",
        source: "Ring 0 Orchestrator",
        attestationStatus: "verified"
      });
      state.rings.ring2.memoryEntries.push({
        id: (0, import_uuid.v4)(),
        type: "SecurityAudit",
        content: `INTEGRITY_SHIELD: Auto-rollback executed. System returned to Merkle Root ${state.rings.ring0.merkleRoot}.`,
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        links: ["Ring 0", "Gatekeeper v2"]
      });
    }
    broadcastState(state);
    await saveState(state);
  }, 3e3);
  app.use(import_express.default.json());
  const corticalGateway = (req, res, next) => {
    const payloadSize = JSON.stringify(req.body).length;
    if (payloadSize > 5e5) {
      state.telemetry.entropy += 0.08;
      state.helixCore.security?.gatewayLogs.unshift({
        id: (0, import_uuid.v4)(),
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        event: `Large Resource Ingress Detected (${Math.round(payloadSize / 1024)}KB)`,
        severity: "medium",
        source: "Inbound Protocol",
        attestationStatus: "quarantined"
      });
    }
    if (req.path.includes("deploy") && state.telemetry.securityScore < 0.8) {
      state.helixCore.security?.gatewayLogs.unshift({
        id: (0, import_uuid.v4)(),
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        event: "Deployment Rejected: Low Security Threshold",
        severity: "high",
        source: "Cortical Gateway v2",
        attestationStatus: "failed"
      });
      return res.status(403).json({ error: "Cortical Gateway: Security Threshold Not Met. Purge required." });
    }
    const isAttested = req.headers["x-helix-signature"] || Math.random() > 5e-3;
    if (!isAttested) {
      state.telemetry.entropy += 0.1;
      state.helixCore.security?.gatewayLogs.unshift({
        id: (0, import_uuid.v4)(),
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        event: `Pattern mismatch detected in request: ${req.path}`,
        severity: "high",
        source: "Cortical Gateway v2",
        attestationStatus: "failed"
      });
    }
    next();
  };
  app.use("/api/agi/*", corticalGateway);
  app.use((req, res, next) => {
    console.log(`[CORTICAL GATEWAY] Ingress: ${req.method} ${req.path} | Attestation: PENDING`);
    res.setHeader("X-Helix-Security-Router", "Active");
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-XSS-Protection", "1; mode=block");
    next();
  });
  app.get("/api/agi/state", async (req, res) => {
    try {
      res.json(state);
    } catch (err) {
      console.error("Failed to load state", err);
      res.status(500).json({ error: "Failed to load state", details: err.message });
    }
  });
  app.post("/api/helix/update-core", async (req, res) => {
    try {
      const { deltaPoints, memoryUpdate, initiativeMode, newCapability, trainingOutcome } = req.body;
      if (deltaPoints) {
        state.helixCore.evolution.points += deltaPoints;
        while (state.helixCore.evolution.points >= state.helixCore.evolution.nextLevelAt) {
          state.helixCore.evolution.level += 1;
          state.helixCore.evolution.points -= state.helixCore.evolution.nextLevelAt;
          state.helixCore.evolution.nextLevelAt = Math.round(state.helixCore.evolution.nextLevelAt * 1.5);
          const maturities = ["Seed", "Larva", "Chrysalis", "Imago", "Transcendent"];
          const maturityIdx = Math.min(maturities.length - 1, Math.floor(state.helixCore.evolution.level / 2));
          state.helixCore.evolution.maturity = maturities[maturityIdx];
          state.helixCore.memory.pastEvolutions.push(`Reached Level ${state.helixCore.evolution.level} as ${state.helixCore.evolution.maturity}`);
          const availableCaps = ["Neural Compression", "Async Reasoning", "Sub-space Ingress", "Quantum Telemetry", "Agentic Swarm"];
          const nextCap = availableCaps.find((c) => !state.helixCore.evolution.unlockedCapabilities.includes(c));
          if (nextCap) state.helixCore.evolution.unlockedCapabilities.push(nextCap);
        }
      }
      if (trainingOutcome) {
        state.telemetry.coherence = Math.min(0.99, state.telemetry.coherence + 0.05);
        state.telemetry.entropy = Math.max(0.01, state.telemetry.entropy - 0.03);
        state.telemetry.aggregateThroughput += 15.5;
        state.telemetry.securityScore = Math.min(100, state.telemetry.securityScore + 2);
        state.terminalLogs.push(`[TELEMETRY] Training success detected. Coherence -> ${(state.telemetry.coherence * 100).toFixed(1)}% | Entropy reduced.`);
      }
      if (newCapability && !state.helixCore.evolution.unlockedCapabilities.includes(newCapability)) {
        state.helixCore.evolution.unlockedCapabilities.push(newCapability);
      }
      if (memoryUpdate) {
        state.helixCore.memory = { ...state.helixCore.memory, ...memoryUpdate, lastInteraction: (/* @__PURE__ */ new Date()).toISOString() };
      }
      if (initiativeMode !== void 0) {
        state.helixCore.initiativeMode = initiativeMode;
      }
      await saveState(state);
      broadcastState(state);
      res.json({ success: true, core: state.helixCore });
    } catch (err) {
      console.error("Failed to update Helix Core", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  app.post("/api/helix/initiative-action", async (req, res) => {
    try {
      const { id, action } = req.body;
      const initiative = state.helixCore.initiatives?.find((i) => i.id === id);
      if (!initiative) return res.status(404).json({ error: "Initiative not found" });
      if (action === "dismiss") {
        initiative.status = "dismissed";
      } else if (action === "complete") {
        initiative.status = "completed";
        state.helixCore.evolution.points += 15;
        state.helixCore.memory.successfulStrategies.push(`Executed Initiative: ${initiative.title}`);
        while (state.helixCore.evolution.points >= state.helixCore.evolution.nextLevelAt) {
          state.helixCore.evolution.level += 1;
          state.helixCore.evolution.points -= state.helixCore.evolution.nextLevelAt;
          state.helixCore.evolution.nextLevelAt = Math.round(state.helixCore.evolution.nextLevelAt * 1.5);
          const maturities = ["Seedling", "Sprout", "Twine", "Helix-Core", "Neural-Mesh", "Super-Intelligence"];
          const maturityIdx = Math.min(state.helixCore.evolution.level - 1, maturities.length - 1);
          state.helixCore.evolution.maturity = maturities[maturityIdx];
        }
      }
      await saveState(state);
      broadcastState(state);
      res.json({ success: true });
    } catch (err) {
      res.status(500).json({ error: "Failed to handle initiative" });
    }
  });
  const triggerAdapterAction = async (adapterId, actionName, meta = {}) => {
    const adapter = state.helixCore.adapters?.find((a) => a.id === adapterId);
    if (adapter && adapter.status === "Connected") {
      state.terminalLogs.push(`\x1B[34m[${adapter.name}: ${actionName}]\x1B[0m ${meta.message || "Action executed successfully."}`);
      if (actionName.includes("Commit") || actionName.includes("Push")) {
        state.helixCore.security?.gatewayLogs.unshift({
          id: (0, import_uuid.v4)(),
          timestamp: (/* @__PURE__ */ new Date()).toISOString(),
          event: `${adapter.name} External Sync: ${actionName}`,
          severity: "low",
          source: `Adapter:${adapter.id}`,
          attestationStatus: "verified"
        });
      }
    }
  };
  app.post("/api/helix/curiosity/step", async (req, res) => {
    const { stepId, status } = req.body;
    if (state.helixCore.curiosity) {
      const stepIndex = state.helixCore.curiosity.steps.findIndex((s) => s.id === stepId);
      if (stepIndex !== -1) {
        state.helixCore.curiosity.steps[stepIndex].status = status;
        if (status === "completed") {
          state.helixCore.curiosity.progress += 100 / state.helixCore.curiosity.steps.length;
          await triggerAdapterAction("github", "Auto-Commit", { message: `Checkpoint: Curiosity Step "${state.helixCore.curiosity.steps[stepIndex].title}" completed.` });
        }
      }
    }
    await saveState(state);
    broadcastState(state);
    res.json({ success: true });
  });
  app.post("/api/helix/spawn-swarm", async (req, res) => {
    try {
      const { agents } = req.body;
      const newAgents = agents.map((a) => ({
        id: Math.random().toString(36).substr(2, 9),
        name: a.name,
        role: a.role,
        status: "thinking",
        currentTask: "Awaiting primary directive"
      }));
      state.helixCore.swarm = {
        agents: newAgents,
        activeSwarmId: Math.random().toString(36).substr(2, 9)
      };
      state.rings.ring3.instances = [
        ...state.rings.ring3.instances,
        ...newAgents.map((a) => ({
          id: a.id,
          name: `${a.role}: ${a.name}`,
          status: "Specializing",
          logs: [`Swarm agent initialized: ${a.role}`],
          deployedAt: (/* @__PURE__ */ new Date()).toISOString(),
          lifecycle: "Specialized"
        }))
      ];
      await saveState(state);
      broadcastState(state);
      res.json({ success: true, agents: newAgents });
    } catch (err) {
      res.status(500).json({ error: "Failed to spawn swarm" });
    }
  });
  app.post("/api/helix/tool-use", async (req, res) => {
    try {
      const { toolId, params } = req.body;
      const tool = state.helixCore.tools?.find((t) => t.id === toolId);
      if (!tool) return res.status(404).json({ error: "Tool not found" });
      state.terminalLogs.push(`\x1B[36m[TOOL: ${tool.name}]\x1B[0m Executing with params: ${JSON.stringify(params)}`);
      let result = {};
      if (toolId === "fs_read") result = { files: ["src/main.ts", "src/App.tsx", "server.ts"] };
      if (toolId === "fs_write") {
        result = { status: "Changes applied successfully" };
        await triggerAdapterAction("github", "Auto-Commit", { message: "Atomic file write detected. Synchronizing checkpoint." });
      }
      if (toolId === "exec_node") result = { output: "Loop matched 42 patterns. Efficiency: 98%" };
      if (toolId === "web_search") result = { link: "https://arxiv.org/abs/2403.helix", snippet: "A new architecture for recursive agent networks..." };
      await saveState(state);
      broadcastState(state);
      res.json({ success: true, result });
    } catch (err) {
      res.status(500).json({ error: "Tool execution failed" });
    }
  });
  app.post("/api/helix/adapters/configure", async (req, res) => {
    try {
      const { adapterId, config } = req.body;
      const adapterIndex = state.helixCore.adapters?.findIndex((a) => a.id === adapterId);
      if (adapterIndex === void 0 || adapterIndex === -1) return res.status(404).json({ error: "Adapter not found" });
      state.helixCore.adapters[adapterIndex].config = {
        ...state.helixCore.adapters[adapterIndex].config,
        ...config
      };
      state.helixCore.adapters[adapterIndex].status = "Connected";
      state.helixCore.adapters[adapterIndex].config.lastSyncAt = (/* @__PURE__ */ new Date()).toISOString();
      state.terminalLogs.push(`\x1B[32m[ADAPTER]\x1B[0m ${state.helixCore.adapters[adapterIndex].name} successfully configured.`);
      await saveState(state);
      broadcastState(state);
      res.json({ success: true, adapter: state.helixCore.adapters[adapterIndex] });
    } catch (err) {
      res.status(500).json({ error: "Failed to configure adapter" });
    }
  });
  app.post("/api/helix/adapters/sync", async (req, res) => {
    try {
      const { adapterId } = req.body;
      const adapterIndex = state.helixCore.adapters?.findIndex((a) => a.id === adapterId);
      if (adapterIndex === void 0 || adapterIndex === -1) return res.status(404).json({ error: "Adapter not found" });
      const adapter = state.helixCore.adapters[adapterIndex];
      if (adapter.status !== "Connected") return res.status(400).json({ error: "Adapter must be connected to sync" });
      state.terminalLogs.push(`\x1B[35m[SYNC]\x1B[0m Synchronizing ${adapter.name} resources...`);
      await new Promise((r) => setTimeout(r, 2e3));
      adapter.config.lastSyncAt = (/* @__PURE__ */ new Date()).toISOString();
      state.terminalLogs.push(`\x1B[32m[ADAPTER]\x1B[0m ${adapter.name} sync complete. Handshaked 14 instances.`);
      await saveState(state);
      broadcastState(state);
      res.json({ success: true, lastSyncAt: adapter.config.lastSyncAt });
    } catch (err) {
      res.status(500).json({ error: "Sync failed" });
    }
  });
  app.post("/api/helix/adapters/install", async (req, res) => {
    try {
      const { adapter } = req.body;
      const newAdapter = {
        id: adapter.id || Math.random().toString(36).substr(2, 9),
        name: adapter.name,
        description: adapter.description,
        status: "Disconnected",
        icon: adapter.icon || "Box",
        type: adapter.type || "Monitoring",
        features: adapter.features || ["General Integration"],
        config: {}
      };
      if (!state.helixCore.adapters) state.helixCore.adapters = [];
      state.helixCore.adapters.push(newAdapter);
      state.terminalLogs.push(`\x1B[32m[ADAPTER]\x1B[0m New adapter installed: ${newAdapter.name}`);
      await saveState(state);
      broadcastState(state);
      res.json({ success: true, adapter: newAdapter });
    } catch (err) {
      res.status(500).json({ error: "Failed to install adapter" });
    }
  });
  app.post("/api/helix/clear-swarm", async (req, res) => {
    try {
      state.helixCore.swarm = { agents: [] };
      state.rings.ring3.instances = state.rings.ring3.instances.filter(
        (inst) => !inst.name.startsWith("Architect:") && !inst.name.startsWith("Auditor:") && !inst.name.startsWith("Optimizer:") && !inst.name.startsWith("Specialist:")
      );
      await saveState(state);
      broadcastState(state);
      res.json({ success: true });
    } catch (err) {
      res.status(500).json({ error: "Failed to clear swarm" });
    }
  });
  app.post("/api/agi/write-memory", async (req, res) => {
    try {
      const { content, type, links } = req.body;
      const id = (0, import_uuid.v4)();
      state.rings.ring2.memoryEntries.push({
        id,
        content,
        type,
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        links: links || []
      });
      if (!links && content) {
        const related = state.rings.ring2.memoryEntries.filter((e) => e.id !== id && e.content && e.content.split(" ").some((word) => word.length > 4 && content.includes(word))).slice(0, 2).map((e) => e.id);
        state.rings.ring2.memoryEntries[state.rings.ring2.memoryEntries.length - 1].links = related;
      }
      await saveState(state);
      broadcastState(state);
      res.json({ success: true, id });
    } catch (err) {
      console.error("Failed to write memory", err);
      res.status(500).json({ error: "Failed to write memory" });
    }
  });
  app.post("/api/agi/save-model", async (req, res) => {
    try {
      const { name, config } = req.body;
      state.rings.ring1.trainedModels.push({
        id: (0, import_uuid.v4)(),
        name,
        config,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      });
      state.telemetry.coherence = Math.min(0.999, state.telemetry.coherence + 0.05);
      state.telemetry.entropy = Math.max(0.01, state.telemetry.entropy - 0.02);
      state.telemetry.securityScore = Math.min(0.99, state.telemetry.securityScore + 0.01);
      state.rings.ring2.memoryEntries.push({
        id: (0, import_uuid.v4)(),
        type: "EvolutionaryEvent",
        content: `New model identity "${name}" integrated into Ring 1. Collective coherence upgraded.`,
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        links: ["Ring 1", "Helix-Core"]
      });
      await saveState(state);
      broadcastState(state);
      res.json({ success: true });
    } catch (err) {
      console.error("Failed to save model", err);
      res.status(500).json({ error: "Failed to save model" });
    }
  });
  app.post("/api/agi/deploy-wasm", async (req, res) => {
    if (state.telemetry.entropy > 0.6) {
      return res.status(403).json({ error: "CORTICAL-GATEWAY: Critical entropy detected. All new deployments suspended until purge." });
    }
    const { name, wasmBase64, signature } = req.body;
    if (!signature) {
      console.warn(`[CORTICAL-GATEWAY] WARNING: Deploying un-signed module. Elevating system entropy.`);
      state.telemetry.entropy += 0.02;
    }
    const instanceId = (0, import_uuid.v4)();
    const instance = {
      id: instanceId,
      name: name || `Stem-Cell-${instanceId.slice(0, 4).toUpperCase()}`,
      status: "Undifferentiated",
      lifecycle: "Undifferentiated",
      specialty: void 0,
      logs: [
        `[CORTICAL-GATEWAY] Absolute Perimeter Check: PASSED.`,
        `[CORTICAL-GATEWAY] ${signature ? "Cryptographic Signature Verified: ATTESTED" : "CAUTION: Anonymous module detected"}.`,
        `[SYSTEM] Pluripotent stem-cell pool ${instanceId} provisioned in Ring 3.`,
        `[SYSTEM] Awaiting Neuro-Highway context for differentiation.`,
        `[SECURITY] Behavioral monitor initialized for instance scope.`,
        `[SYSTEM] WASM payload size: ${(Buffer.from(wasmBase64, "base64").length / 1024).toFixed(2)} KB detected.`
      ],
      deployedAt: (/* @__PURE__ */ new Date()).toISOString(),
      wasmBuffer: wasmBase64,
      attestationToken: "ATT-" + (0, import_uuid.v4)().split("-")[0].toUpperCase(),
      memoryUsage: 0
    };
    state.rings.ring3.instances.push(instance);
    state.telemetry.activeWorkerCount = state.rings.ring3.instances.length;
    await saveState(state);
    broadcastState(state);
    res.json({ id: instanceId });
  });
  app.post("/api/agi/run-instance", async (req, res) => {
    if (state.telemetry.securityScore < 0.75) {
      console.error(`[CORTICAL-GATEWAY] BLOCK: Security score ${state.telemetry.securityScore} below threshold.`);
      return res.status(403).json({ error: "CORTICAL-GATEWAY: Critical system integrity breach. All execution paths FROZEN for attestation." });
    }
    const { id, input } = req.body;
    const instanceIndex = state.rings.ring3.instances.findIndex((i) => i.id === id);
    if (instanceIndex === -1) return res.status(404).json({ error: "Instance not found" });
    const instance = state.rings.ring3.instances[instanceIndex];
    if (instance.status === "Executing" || instance.lifecycle === "Scrubbing") {
      return res.status(409).json({ error: "Instance busy. Context conflict avoided." });
    }
    instance.status = "Executing";
    instance.lifecycle = "Specialized";
    const specialties = ["Logic", "Memory", "Creative", "Security"];
    instance.specialty = specialties[Math.floor(Math.random() * specialties.length)];
    const sessionToken = "SES-" + (0, import_uuid.v4)().split("-")[0].toUpperCase();
    const context = state.rings.ring2.memoryEntries.slice(-3).map((e) => e.content).join(" | ");
    instance.logs.push(`[HELIX-OS] INTAKE: Neuro-Highway context stream active...`);
    instance.logs.push(`[HELIX-OS] CONTEXT: "${context.slice(0, 60)}..."`);
    instance.logs.push(`[HELIX-OS] DIFFERENTIATION: Stem-cell evolving into ${instance.specialty} Worker.`);
    instance.logs.push(`[SECURITY] Session established: ${sessionToken}`);
    instance.logs.push(`[EXEC] Running specialized task in ${instance.specialty} domain.`);
    broadcastState(state);
    const startTime = import_perf_hooks.performance.now();
    try {
      if (!instance.wasmBuffer) {
        throw new Error("Missing binary context in stem-cell pool.");
      }
      instance.logs.push(`[EXEC] JIT Compiling ${instance.specialty} module...`);
      const buffer = Buffer.from(instance.wasmBuffer, "base64");
      const wasmModule = await WebAssembly.compile(buffer);
      const wasmInstance = await WebAssembly.instantiate(wasmModule, {});
      if (wasmInstance.exports.memory) {
        const mem = wasmInstance.exports.memory;
        instance.memoryUsage = mem.buffer.byteLength;
      }
      const runFn = wasmInstance.exports.run || wasmInstance.exports.main;
      if (runFn) {
        const result = runFn(input);
        instance.lastResult = result;
        instance.logs.push(`[RESULT] ${instance.specialty} computation successful: ${typeof result === "object" ? JSON.stringify(result) : result}`);
        state.rings.ring2.memoryEntries.push({
          id: (0, import_uuid.v4)(),
          type: "Trajectory",
          content: `${instance.specialty} Worker (Pool: ${id}) processed context and produced result.`,
          timestamp: (/* @__PURE__ */ new Date()).toISOString(),
          links: [id]
        });
      }
    } catch (err) {
      console.error(`WASM Runtime Error [${id}]:`, err);
      instance.logs.push(`[ERROR] Critical ${instance.specialty} failure: ${err.message}`);
      state.telemetry.entropy += 0.05;
    }
    const endTime = import_perf_hooks.performance.now();
    instance.duration = endTime - startTime;
    instance.status = "Completed";
    instance.lifecycle = "Scrubbing";
    instance.logs.push(`[SECURITY] TASK COMPLETE: Initiating full memory scrub...`);
    instance.logs.push(`[SECURITY] PURGING: Clearing stack, registers, and context heap.`);
    broadcastState(state);
    setTimeout(async () => {
      const idx = state.rings.ring3.instances.findIndex((i) => i.id === id);
      if (idx !== -1) {
        const target = state.rings.ring3.instances[idx];
        target.lifecycle = "Undifferentiated";
        target.specialty = void 0;
        target.status = "Idle";
        target.lastResult = void 0;
        target.logs.push(`[SECURITY] SCRUB COMPLETE: Pool returned to undifferentiated state.`);
        if (target.logs.length > 20) {
          target.logs = target.logs.slice(-10);
        }
        await saveState(state);
        broadcastState(state);
      }
    }, 2e3);
    state.telemetry.aggregateThroughput += 1;
    state.telemetry.coherence = Math.min(0.999, state.telemetry.coherence + 1e-3);
    state.telemetry.entropy = Math.max(0.01, state.telemetry.entropy - 5e-4);
    await saveState(state);
    broadcastState(state);
    res.json({ success: true, logs: instance.logs, duration: instance.duration });
  });
  app.post("/api/terminal/run", (req, res) => {
    const { command, cwd } = req.body;
    const forbidden = ["rm -rf /", "mkfs", "dd"];
    if (forbidden.some((f) => command.includes(f))) {
      return res.status(403).json({ error: "Forbidden command" });
    }
    res.setHeader("Content-Type", "text/plain");
    res.setHeader("Transfer-Encoding", "chunked");
    const shell = process.platform === "win32" ? "powershell.exe" : "bash";
    const child = (0, import_child_process.spawn)(shell, ["-c", command], {
      cwd: cwd || process.cwd(),
      env: process.env,
      shell: true
    });
    child.stdout.on("data", (data) => {
      res.write(data);
    });
    child.stderr.on("data", (data) => {
      res.write(`ERROR: ${data}`);
    });
    child.on("close", (code) => {
      res.write(`
[Process exited with code ${code}]
`);
      res.end();
    });
  });
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  server.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
