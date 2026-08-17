# NEXUS Sync Contract

This layer is the boundary between the web UI and the native iOS companion.

## Event shape

```text
DeviceStateChanged
CommandRequested
CommandResult
BluetoothStateChanged
ConnectionChanged
CapabilityDiscovered
```

The first implementation can use a local development bridge. A production implementation should use authenticated, encrypted transport and must never expose device credentials in the browser bundle.

## Device state

Every device should report:

- stable local identifier
- display name
- vendor/model
- connection state
- available capabilities
- telemetry values
- last updated timestamp

Capabilities are data-driven so NEXUS can hide unsupported controls instead of displaying fake controls.
