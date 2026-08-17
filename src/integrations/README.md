# NEXUS Web Integrations

The existing React/Vite app remains the web control center. Integration adapters should live here instead of embedding vendor logic inside UI components.

```text
src/integrations/
├── lg/
│   └── README.md
├── playstation/
│   └── README.md
└── ios/
    └── README.md
```

Each adapter should expose a small, vendor-neutral command/state contract to the UI. The web app must show `unavailable`, `prepared`, `connected`, and `error` states distinctly.
