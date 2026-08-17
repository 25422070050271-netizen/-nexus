# NEXUS Architecture

NEXUS is split into two layers:

- `web/` — GitHub Pages React/Vite control center.
- `ios/` — native iOS companion for Bluetooth and iPhone capabilities.

## NEXUS Web
- Dashboard and device UI
- LG / PS5 integrations through supported APIs or local protocols
- Scenes and automations
- Device registry and state model
- Web ↔ iOS synchronization contract

## NEXUS iOS
- Core Bluetooth discovery and connection
- HAVIT TWS984 integration layer
- Infinix Watch H4 integration layer
- Battery and telemetry when exposed by the peripheral
- iOS permissions and background restoration

## Rule
Vendor-specific features such as EQ, ANC, watch faces or proprietary commands are enabled only after the real Bluetooth GATT services/characteristics have been discovered and verified. NEXUS never reports a feature as supported merely because the UI contains a button.
