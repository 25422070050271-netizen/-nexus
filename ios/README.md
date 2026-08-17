# NEXUS iOS

Native iOS companion for NEXUS. This layer owns capabilities that a GitHub Pages web app cannot reliably provide, especially BLE discovery and device-specific communication.

## Planned modules

```text
ios/
├── App/
│   └── NexusApp.swift
├── Core/
│   ├── Bluetooth/
│   │   ├── BluetoothManager.swift
│   │   ├── BluetoothDevice.swift
│   │   └── BluetoothPermissions.swift
│   ├── Models/
│   │   ├── NexusDevice.swift
│   │   └── DeviceCapability.swift
│   └── Sync/
│       └── NexusSyncClient.swift
├── Features/
│   ├── Dashboard/
│   ├── Devices/
│   ├── Havit/
│   │   └── TWS984Integration.swift
│   └── Infinix/
│       └── WatchH4Integration.swift
└── Resources/
    └── Info.plist.template
```

## Bluetooth strategy

NEXUS iOS acts as a Core Bluetooth central. It scans, discovers, connects, discovers services/characteristics, reads values and writes only to characteristics verified for the target device. Apple documents `CBCentralManager` for discovery/connection and `CBPeripheralDelegate` for service and characteristic discovery.

## Device targets

- HAVIT TWS984
- Infinix Watch H4

The first milestone is a diagnostic BLE explorer for these two devices. It will record advertised names, identifiers, services, characteristics and supported properties without sending unknown commands.
