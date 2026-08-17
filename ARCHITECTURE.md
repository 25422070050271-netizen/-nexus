# NEXUS architecture

NEXUS is split into two clients that share the same product model:

```text
                    NEXUS
                      |
          +-----------+-----------+
          |                       |
       NEXUS Web              NEXUS iOS
       GitHub Pages            SwiftUI
          |                       |
   LG / PS5 / APIs        Core Bluetooth / iOS APIs
          |                       |
          +-----------+-----------+
                      |
               Shared NEXUS model
```

## NEXUS Web

The existing React/Vite application remains the main dashboard. It is responsible for rooms, scenes, device cards, automations, search, settings, and integrations that can safely run through browser-compatible APIs or a future bridge.

The web app must never claim a device is connected unless an integration reports a real connection/state.

## NEXUS iOS

The iOS client is a native SwiftUI app. SwiftUI is Apple's recommended approach for new Apple-platform apps, while Core Bluetooth provides the native BLE layer needed for compatible peripherals.

Initial modules:

- `AppState.swift` — shared app state and device model.
- `BluetoothManager.swift` — Core Bluetooth discovery/connection foundation.
- `RootView.swift` — dashboard, discovery and settings UI.
- `Info.plist.example` — Bluetooth permission description.

## Device adapters

Future integrations should be isolated behind adapters rather than putting vendor-specific code into views:

```text
DeviceAdapter
├── HavitTWS984Adapter
├── InfinixWatchH4Adapter
├── LGAdapter
└── PlayStationAdapter
```

An adapter should expose only capabilities that have been verified for the actual hardware/protocol. Proprietary features such as EQ, ANC modes, watch synchronization or firmware updates must not be faked when the protocol is unknown.

## Data flow

```text
UI -> ViewModel/AppState -> Adapter -> Device
                    ^             |
                    +--- state ---+
```

For web-compatible integrations, the same normalized device model can be represented by the React app. For Bluetooth-only capabilities, NEXUS iOS is the native control layer.

## Next implementation order

1. Build the Xcode project from `ios/NEXUSApp`.
2. Test Core Bluetooth discovery on the iPhone.
3. Identify the actual GATT services/characteristics exposed by the HAVIT TWS984.
4. Add the TWS984 adapter only after those services are verified.
5. Repeat discovery/protocol analysis for the Infinix Watch H4.
6. Add LG and PS5 integrations separately.
7. Add a secure Web <-> iOS sync layer only where it provides real value.

## Security rule

Credentials, API tokens and device secrets must never be committed to this repository. Use iOS Keychain for native secrets and environment/build configuration for web deployment.
