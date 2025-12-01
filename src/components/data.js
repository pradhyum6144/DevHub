export const data = [
  {
    "id": "openai-labs",
    "organizationName": "OpenAI Labs",
    "description": "AI research group focusing on safe, scalable machine learning systems.",
    "openIssues": 4,
    "closedIssues": 2,
    "contributors": 14,
    "issues": [
      { "id": 1, "title": "Optimize model latency", "status": "open", "description": "High response time during peak hours.", "createdAt": "2025-11-21", "priority": "high" },
      { "id": 2, "title": "Memory leak in RL system", "status": "open", "description": "GPU memory usage grows unexpectedly.", "createdAt": "2025-11-20", "priority": "high" },
      { "id": 3, "title": "Improve system prompt clarity", "status": "closed", "description": "Rewrite ambiguous model instructions.", "createdAt": "2025-11-18", "priority": "medium" },
      { "id": 4, "title": "Dataset tagging bug", "status": "open", "description": "Incorrect category applied to new entries.", "createdAt": "2025-11-17", "priority": "low" },
      { "id": 5, "title": "Add multi-language support", "status": "closed", "description": "Support added for 3 new languages.", "createdAt": "2025-11-15", "priority": "medium" },
      { "id": 6, "title": "Model safety violation detection", "status": "open", "description": "False positives detected in edge cases.", "createdAt": "2025-11-14", "priority": "medium" }
    ]
  },

  {
    "id": "codeforge-solutions",
    "organizationName": "CodeForge Solutions",
    "description": "Software consultancy specializing in full-stack web and cloud applications.",
    "openIssues": 3,
    "closedIssues": 3,
    "contributors": 9,
    "issues": [
      { "id": 1, "title": "Dark mode text visibility", "status": "open", "description": "Text is nearly invisible in dark theme.", "createdAt": "2025-11-19", "priority": "medium" },
      { "id": 2, "title": "Login page reload error", "status": "open", "description": "Unexpected reload when logging in.", "createdAt": "2025-11-18", "priority": "high" },
      { "id": 3, "title": "API route conflict", "status": "closed", "description": "Routes overlapped in staging environment.", "createdAt": "2025-11-17", "priority": "medium" },
      { "id": 4, "title": "Broken build script", "status": "open", "description": "Unable to compile using CI pipeline.", "createdAt": "2025-11-16", "priority": "high" },
      { "id": 5, "title": "Update TypeScript types", "status": "closed", "description": "Types outdated after major refactor.", "createdAt": "2025-11-14", "priority": "low" },
      { "id": 6, "title": "Fix GraphQL schema mismatch", "status": "closed", "description": "Client and server schema mismatched.", "createdAt": "2025-11-12", "priority": "medium" }
    ]
  },

  {
    "id": "datasense-analytics",
    "organizationName": "DataSense Analytics",
    "description": "Tools and libraries for advanced data visualization and analytics workflows.",
    "openIssues": 3,
    "closedIssues": 3,
    "contributors": 14,
    "issues": [
      { "id": 1, "title": "Bar chart scaling issue", "status": "open", "description": "Bars appear misaligned on mobile.", "createdAt": "2025-11-16", "priority": "medium" },
      { "id": 2, "title": "CSV export missing rows", "status": "closed", "description": "Rows with null values were skipped.", "createdAt": "2025-11-14", "priority": "low" },
      { "id": 3, "title": "Tooltip flicker", "status": "open", "description": "Tooltip disappears on fast hover.", "createdAt": "2025-11-12", "priority": "low" },
      { "id": 4, "title": "Slow dashboard load", "status": "open", "description": "Query takes over 5 seconds.", "createdAt": "2025-11-11", "priority": "high" },
      { "id": 5, "title": "Pie chart label overlap", "status": "closed", "description": "Labels overlap on small screens.", "createdAt": "2025-11-09", "priority": "medium" },
      { "id": 6, "title": "Color theme inconsistency", "status": "closed", "description": "Colors do not match branding.", "createdAt": "2025-11-08", "priority": "medium" }
    ]
  },

  {
    "id": "cloudmatrix",
    "organizationName": "CloudMatrix",
    "description": "Cloud infrastructure tools for microservice orchestration and automation.",
    "openIssues": 4,
    "closedIssues": 2,
    "contributors": 10,
    "issues": [
      { "id": 1, "title": "Node scaling delay", "status": "open", "description": "Scaling takes over 45 seconds.", "createdAt": "2025-11-12", "priority": "high" },
      { "id": 2, "title": "Dashboard crash on load", "status": "open", "description": "Crash caused by unhandled error.", "createdAt": "2025-11-11", "priority": "high" },
      { "id": 3, "title": "Pod stuck terminating", "status": "closed", "description": "Termination loop due to lock.", "createdAt": "2025-11-10", "priority": "medium" },
      { "id": 4, "title": "Service discovery delay", "status": "open", "description": "Services take long to register.", "createdAt": "2025-11-09", "priority": "medium" },
      { "id": 5, "title": "Metrics not updating", "status": "closed", "description": "Metrics stuck due to caching bug.", "createdAt": "2025-11-08", "priority": "low" },
      { "id": 6, "title": "Wrong timestamp timezone", "status": "open", "description": "Logs show inconsistent timezone.", "createdAt": "2025-11-07", "priority": "medium" }
    ]
  },

  {
    "id": "neurotech-hub",
    "organizationName": "NeuroTech Hub",
    "description": "Research community developing neural-network-driven edge device software.",
    "openIssues": 3,
    "closedIssues": 2,
    "contributors": 7,
    "issues": [
      { "id": 1, "title": "Slow mobile inference", "status": "open", "description": "Tensor ops slow on mid-range devices.", "createdAt": "2025-11-21", "priority": "high" },
      { "id": 2, "title": "Model quantization bug", "status": "closed", "description": "Accuracy drop after quantization.", "createdAt": "2025-11-19", "priority": "medium" },
      { "id": 3, "title": "Training instability", "status": "open", "description": "Loss spikes in multi-GPU setup.", "createdAt": "2025-11-18", "priority": "high" },
      { "id": 4, "title": "ONNX export error", "status": "closed", "description": "Export fails on specific layer.", "createdAt": "2025-11-16", "priority": "medium" },
      { "id": 5, "title": "Slow batch normalization", "status": "open", "description": "BatchNorm slows real-time inference.", "createdAt": "2025-11-14", "priority": "low" }
    ]
  },

  {
    "id": "cybershield-security",
    "organizationName": "CyberShield Security",
    "description": "Open-source tools for threat scanning and cybersecurity.",
    "openIssues": 4,
    "closedIssues": 2,
    "contributors": 18,
    "issues": [
      { "id": 1, "title": "Firewall false alarms", "status": "open", "description": "Safe traffic marked malicious.", "createdAt": "2025-11-17", "priority": "high" },
      { "id": 2, "title": "Memory leak in scanner", "status": "closed", "description": "Leak when scanning large networks.", "createdAt": "2025-11-15", "priority": "medium" },
      { "id": 3, "title": "Slow threat analysis", "status": "open", "description": "Analysis takes too long on large logs.", "createdAt": "2025-11-14", "priority": "medium" },
      { "id": 4, "title": "Broken signature update", "status": "open", "description": "Signature file corrupt.", "createdAt": "2025-11-13", "priority": "high" },
      { "id": 5, "title": "Dashboard freeze", "status": "closed", "description": "Freeze when loading log history.", "createdAt": "2025-11-11", "priority": "low" },
      { "id": 6, "title": "Audit trail mismatch", "status": "open", "description": "Activity logs not in sync.", "createdAt": "2025-11-10", "priority": "medium" }
    ]
  },

  {
    "id": "scriptflow",
    "organizationName": "ScriptFlow",
    "description": "Workflow automation scripts and developer productivity tools.",
    "openIssues": 3,
    "closedIssues": 2,
    "contributors": 6,
    "issues": [
      { "id": 1, "title": "Cron not triggering", "status": "open", "description": "Timing parser fails for */5 pattern.", "createdAt": "2025-11-15", "priority": "high" },
      { "id": 2, "title": "Scheduler freeze", "status": "closed", "description": "Freeze on heavy workloads.", "createdAt": "2025-11-13", "priority": "medium" },
      { "id": 3, "title": "Duplicate task running", "status": "open", "description": "Tasks run twice occasionally.", "createdAt": "2025-11-12", "priority": "medium" },
      { "id": 4, "title": "Config loading error", "status": "closed", "description": "Invalid JSON causes crash.", "createdAt": "2025-11-10", "priority": "low" },
      { "id": 5, "title": "Logging not consistent", "status": "open", "description": "Log timestamps not aligned.", "createdAt": "2025-11-09", "priority": "medium" }
    ]
  },

  {
    "id": "quantumframe",
    "organizationName": "QuantumFrame",
    "description": "Quantum-inspired algorithms library for simulation and ML workflows.",
    "openIssues": 4,
    "closedIssues": 2,
    "contributors": 10,
    "issues": [
      { "id": 1, "title": "Simulation mismatch", "status": "open", "description": "5% deviation from expected.", "createdAt": "2025-11-18", "priority": "high" },
      { "id": 2, "title": "Quantum seed drift", "status": "closed", "description": "Seed not consistent.", "createdAt": "2025-11-16", "priority": "medium" },
      { "id": 3, "title": "Optimizer overflow", "status": "open", "description": "Overflow when handling gradients.", "createdAt": "2025-11-15", "priority": "high" },
      { "id": 4, "title": "Slow matrix multiplication", "status": "open", "description": "Performance degraded on GPU.", "createdAt": "2025-11-13", "priority": "medium" },
      { "id": 5, "title": "Export format mismatch", "status": "closed", "description": "JSON output not matching schema.", "createdAt": "2025-11-12", "priority": "low" },
      { "id": 6, "title": "Calibration error", "status": "open", "description": "Calibration steps inconsistent.", "createdAt": "2025-11-11", "priority": "medium" }
    ]
  },

  {
    "id": "pixelcraft-studio",
    "organizationName": "PixelCraft Studio",
    "description": "UI/UX components library for modern web applications.",
    "openIssues": 2,
    "closedIssues": 4,
    "contributors": 5,
    "issues": [
      { "id": 1, "title": "Icon blur on retina", "status": "open", "description": "SVG scaling issue at 2x DPI.", "createdAt": "2025-11-14", "priority": "medium" },
      { "id": 2, "title": "Button ripple glitch", "status": "closed", "description": "Ripple not animating correctly.", "createdAt": "2025-11-12", "priority": "low" },
      { "id": 3, "title": "Modal freeze", "status": "closed", "description": "Modal becomes unresponsive.", "createdAt": "2025-11-11", "priority": "medium" },
      { "id": 4, "title": "Dropdown misalignment", "status": "open", "description": "Dropdown appears offscreen.", "createdAt": "2025-11-10", "priority": "medium" },
      { "id": 5, "title": "Input field shadow issue", "status": "closed", "description": "Shadow rendering inconsistent.", "createdAt": "2025-11-09", "priority": "low" },
      { "id": 6, "title": "Checkbox focus ring missing", "status": "closed", "description": "Accessibility issue.", "createdAt": "2025-11-08", "priority": "medium" }
    ]
  },
  {
    "id": "devstream",
    "organizationName": "DevStream",
    "description": "Developer tools for automating CI/CD pipelines.",
    "openIssues": 3,
    "closedIssues": 2,
    "contributors": 11,
    "issues": [
      { "id": 1, "title": "Pipeline stuck at step 3", "status": "open", "description": "Fetch timeout in dependency stage.", "createdAt": "2025-11-13", "priority": "high" },
      { "id": 2, "title": "Cache invalidation bug", "status": "closed", "description": "Cache not refreshing after deploy.", "createdAt": "2025-11-12", "priority": "medium" },
      { "id": 3, "title": "Slow artifact upload", "status": "open", "description": "Upload takes too long for large builds.", "createdAt": "2025-11-11", "priority": "medium" },
      { "id": 4, "title": "Wrong step ordering", "status": "closed", "description": "Build runs before install step.", "createdAt": "2025-11-10", "priority": "low" },
      { "id": 5, "title": "Webhook retry loop", "status": "open", "description": "Webhook triggers in infinite loop.", "createdAt": "2025-11-08", "priority": "high" }
    ]
  },

  {
    "id": "bytecore-labs",
    "organizationName": "ByteCore Labs",
    "description": "Research on distributed systems and backend optimization.",
    "openIssues": 4,
    "closedIssues": 2,
    "contributors": 13,
    "issues": [
      { "id": 1, "title": "Race condition in cluster sync", "status": "open", "description": "Nodes desync under heavy load.", "createdAt": "2025-11-20", "priority": "high" },
      { "id": 2, "title": "Memory fragmentation", "status": "open", "description": "Fragmentation increases RAM use.", "createdAt": "2025-11-18", "priority": "medium" },
      { "id": 3, "title": "Deadlock in thread pool", "status": "closed", "description": "Deadlock occurs during shutdown.", "createdAt": "2025-11-17", "priority": "high" },
      { "id": 4, "title": "Slow database indexing", "status": "open", "description": "Indexing takes too long on large data.", "createdAt": "2025-11-16", "priority": "medium" },
      { "id": 5, "title": "Incorrect event ordering", "status": "closed", "description": "Events processed in wrong order.", "createdAt": "2025-11-15", "priority": "low" },
      { "id": 6, "title": "TCP connection drops", "status": "open", "description": "Random disconnects reported.", "createdAt": "2025-11-14", "priority": "high" }
    ]
  },

  {
    "id": "stackmint",
    "organizationName": "StackMint",
    "description": "API performance monitoring and debugging tools.",
    "openIssues": 3,
    "closedIssues": 3,
    "contributors": 8,
    "issues": [
      { "id": 1, "title": "API endpoint latency", "status": "open", "description": "High latency on analytics endpoint.", "createdAt": "2025-11-18", "priority": "high" },
      { "id": 2, "title": "JWT token expiry mismatch", "status": "closed", "description": "Tokens expiring earlier than expected.", "createdAt": "2025-11-16", "priority": "medium" },
      { "id": 3, "title": "Graph render freeze", "status": "open", "description": "UI freezes when viewing traffic graph.", "createdAt": "2025-11-15", "priority": "medium" },
      { "id": 4, "title": "Incorrect error grouping", "status": "closed", "description": "Errors grouped incorrectly in UI.", "createdAt": "2025-11-14", "priority": "low" },
      { "id": 5, "title": "Slow log parsing", "status": "open", "description": "Large log sets take too long to parse.", "createdAt": "2025-11-13", "priority": "medium" },
      { "id": 6, "title": "Missing 404 reports", "status": "closed", "description": "404 errors not showing in dashboard.", "createdAt": "2025-11-12", "priority": "medium" }
    ]
  },

  {
    "id": "aether-dynamics",
    "organizationName": "Aether Dynamics",
    "description": "Physics simulation engine for real-time applications.",
    "openIssues": 4,
    "closedIssues": 2,
    "contributors": 7,
    "issues": [
      { "id": 1, "title": "Rigid body collision glitch", "status": "open", "description": "Objects pass through walls at angles.", "createdAt": "2025-11-19", "priority": "high" },
      { "id": 2, "title": "Gravity inconsistency", "status": "closed", "description": "Gravity varies across coordinate grid.", "createdAt": "2025-11-18", "priority": "medium" },
      { "id": 3, "title": "Particle emitter slowdown", "status": "open", "description": "Emitter lags with many particles.", "createdAt": "2025-11-17", "priority": "medium" },
      { "id": 4, "title": "Lighting flicker", "status": "open", "description": "Directional lights flicker in motion.", "createdAt": "2025-11-16", "priority": "medium" },
      { "id": 5, "title": "Broken reflection shader", "status": "closed", "description": "Reflection shader renders artifacts.", "createdAt": "2025-11-15", "priority": "low" },
      { "id": 6, "title": "Force calculation error", "status": "open", "description": "Force output incorrect for small values.", "createdAt": "2025-11-14", "priority": "high" }
    ]
  },

  {
    "id": "nextgen-docs",
    "organizationName": "NextGen Docs",
    "description": "Smart documentation generator for developers.",
    "openIssues": 3,
    "closedIssues": 3,
    "contributors": 10,
    "issues": [
      { "id": 1, "title": "Broken markdown table rendering", "status": "open", "description": "Tables misaligned in dark mode.", "createdAt": "2025-11-18", "priority": "medium" },
      { "id": 2, "title": "Incorrect search indexing", "status": "closed", "description": "Search misses newly added documents.", "createdAt": "2025-11-17", "priority": "medium" },
      { "id": 3, "title": "PDF export blurry", "status": "open", "description": "Images appear low-quality in export.", "createdAt": "2025-11-16", "priority": "low" },
      { "id": 4, "title": "Broken sidebar toggle", "status": "closed", "description": "Sidebar won't collapse on mobile.", "createdAt": "2025-11-15", "priority": "low" },
      { "id": 5, "title": "Theme not persisting", "status": "open", "description": "Dark/light mode resets on refresh.", "createdAt": "2025-11-14", "priority": "medium" },
      { "id": 6, "title": "Slow auto-save", "status": "closed", "description": "Auto-save takes too long on large docs.", "createdAt": "2025-11-13", "priority": "medium" }
    ]
  },

  {
    "id": "hypercache",
    "organizationName": "HyperCache",
    "description": "High-performance distributed caching system.",
    "openIssues": 4,
    "closedIssues": 2,
    "contributors": 12,
    "issues": [
      { "id": 1, "title": "Cache eviction too aggressive", "status": "open", "description": "Keys evicted earlier than expected.", "createdAt": "2025-11-21", "priority": "high" },
      { "id": 2, "title": "Cluster failover delay", "status": "open", "description": "Takes longer than 3 seconds.", "createdAt": "2025-11-20", "priority": "high" },
      { "id": 3, "title": "Replication mismatch", "status": "closed", "description": "Replica nodes out of sync.", "createdAt": "2025-11-19", "priority": "medium" },
      { "id": 4, "title": "Memory usage spike", "status": "open", "description": "Unexpected spike during load tests.", "createdAt": "2025-11-18", "priority": "medium" },
      { "id": 5, "title": "Config reload error", "status": "closed", "description": "Reload fails silently.", "createdAt": "2025-11-17", "priority": "low" },
      { "id": 6, "title": "Cache warming slow", "status": "open", "description": "Warm-up takes too long on cold start.", "createdAt": "2025-11-16", "priority": "medium" }
    ]
  },

  {
    "id": "eventcast",
    "organizationName": "EventCast",
    "description": "Real-time event streaming and processing platform.",
    "openIssues": 3,
    "closedIssues": 3,
    "contributors": 13,
    "issues": [
      { "id": 1, "title": "Consumer lag spike", "status": "open", "description": "Lag spikes randomly during load.", "createdAt": "2025-11-21", "priority": "high" },
      { "id": 2, "title": "Partition imbalance", "status": "closed", "description": "Uneven partition distribution.", "createdAt": "2025-11-20", "priority": "medium" },
      { "id": 3, "title": "Producer reconnect issue", "status": "open", "description": "Producers reconnect too frequently.", "createdAt": "2025-11-19", "priority": "medium" },
      { "id": 4, "title": "Message duplication", "status": "closed", "description": "Duplicate messages under load.", "createdAt": "2025-11-18", "priority": "low" },
      { "id": 5, "title": "Schema evolution failure", "status": "open", "description": "Schema registry conflict.", "createdAt": "2025-11-17", "priority": "medium" },
      { "id": 6, "title": "Offsets not committed", "status": "closed", "description": "Offset commit fails silently.", "createdAt": "2025-11-16", "priority": "medium" }
    ]
  },

  {
    "id": "fusionui",
    "organizationName": "FusionUI",
    "description": "Modern component library for enterprise dashboards.",
    "openIssues": 2,
    "closedIssues": 4,
    "contributors": 9,
    "issues": [
      { "id": 1, "title": "Navbar rendering delay", "status": "open", "description": "Navbar loads slowly on first paint.", "createdAt": "2025-11-20", "priority": "medium" },
      { "id": 2, "title": "Dropdown position offset", "status": "closed", "description": "Dropdown shifts incorrectly near edges.", "createdAt": "2025-11-19", "priority": "medium" },
      { "id": 3, "title": "Tooltip flicker on hover", "status": "closed", "description": "Tooltip jittery on fast movement.", "createdAt": "2025-11-18", "priority": "low" },
      { "id": 4, "title": "Avatar blur issue", "status": "open", "description": "Avatar images blurry at small sizes.", "createdAt": "2025-11-17", "priority": "low" },
      { "id": 5, "title": "Broken link highlight", "status": "closed", "description": "Highlight color incorrect in dark mode.", "createdAt": "2025-11-16", "priority": "low" },
      { "id": 6, "title": "Grid layout overflow", "status": "closed", "description": "Grid spills outside container.", "createdAt": "2025-11-15", "priority": "medium" }
    ]
  },

  {
    "id": "swiftdeploy",
    "organizationName": "SwiftDeploy",
    "description": "Fast deployment and release automation toolkit.",
    "openIssues": 4,
    "closedIssues": 2,
    "contributors": 11,
    "issues": [
      { "id": 1, "title": "Deployment rollback stuck", "status": "open", "description": "Rollback remains in pending state.", "createdAt": "2025-11-21", "priority": "high" },
      { "id": 2, "title": "Broken release notes", "status": "closed", "description": "Release notes not generating.", "createdAt": "2025-11-20", "priority": "medium" },
      { "id": 3, "title": "Slow asset bundling", "status": "open", "description": "Bundler takes longer than expected.", "createdAt": "2025-11-18", "priority": "medium" },
      { "id": 4, "title": "Webhook signature mismatch", "status": "open", "description": "Invalid signature on deploy webhook.", "createdAt": "2025-11-17", "priority": "high" },
      { "id": 5, "title": "Failed cluster deployment", "status": "closed", "description": "Deployment fails for multi-cluster setups.", "createdAt": "2025-11-16", "priority": "low" },
      { "id": 6, "title": "Notification delay", "status": "open", "description": "Deploy notifications delayed by minutes.", "createdAt": "2025-11-15", "priority": "medium" }
    ]
  }
]
