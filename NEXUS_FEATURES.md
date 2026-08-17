# NEXUS — Advanced Control Layer

NEXUS is designed as a device-control platform, not a fake dashboard. The web app may register and discover devices, while native iOS and local integrations provide capabilities that browsers cannot expose.

## Control model

`NEXUS Web → Integration Hub → direct API / NEXUS iOS / NEXUS Bridge → device`

## Device model

Every device should expose, when supported:

- identity: name, brand, model, room
- connectivity: online/offline, last seen, transport
- capabilities: power, volume, media, battery, telemetry, scenes, automation
- diagnostics: permission, authentication, transport and integration errors
- history: commands, connections and state changes

## Advanced modules

### Home
Rooms, zones, favorites, device health and global actions.

### Scenes
Cinema, Gaming, Sleep and Away are starter templates. Scenes must only execute actions supported by the connected devices.

### Automations
Condition/action rules for time, presence, battery, connectivity and device state.

### Battery Center
Aggregates battery information from supported phones, wearables and audio devices without inventing values.

### Activity
Chronological event log for connections, commands, scenes, automations and diagnostics.

### Diagnostics
Explain why a device cannot be controlled and provide actionable next steps.

### Developer Lab
BLE service discovery, LAN discovery, API inspection and integration logs for development/testing. No arbitrary remote code execution.

### Copilot
Natural-language commands should translate into verified capabilities and ask for confirmation before sensitive actions. It must never claim an action succeeded without a confirmed integration response.

## Current device profiles

- LG: LG ThinQ route
- PlayStation 5: dedicated integration route; only verified capabilities are exposed
- HAVIT TWS984: Bluetooth/iOS profile; advanced ANC/EQ/gesture functions depend on proprietary BLE characteristics
- Infinix Watch H4: Bluetooth/iOS profile; health, activity, calls and notifications depend on exposed firmware services

## Security principles

- Prefer local control when available.
- Never store secrets in localStorage.
- Native credentials belong in iOS Keychain or a secure backend.
- Integrations must declare capabilities before controls appear.
- Do not simulate successful physical commands.
- Log failures without leaking credentials.
