# NEXUS iOS

Native SwiftUI companion for NEXUS Web.

## Current foundation

- SwiftUI app entry point
- Shared device models
- Core Bluetooth discovery and connection foundation
- Bluetooth permission template
- Initial dashboard, device discovery and settings screens

## Xcode setup

Create a new iOS App project in Xcode using SwiftUI and Swift, then add the files from this directory to the target. Use `Info.plist.example` as the source for the Bluetooth usage description.

The repository intentionally does not include a generated `.xcodeproj` yet. That keeps the project configuration reproducible in Xcode and avoids committing machine-specific signing settings.

## Next step

Test BLE discovery on the physical iPhone, then identify the GATT services and characteristics exposed by the HAVIT TWS984 before implementing vendor-specific controls.
