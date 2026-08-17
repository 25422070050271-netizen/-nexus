import SwiftUI

struct RootView: View {
    @EnvironmentObject private var appState: AppState

    var body: some View {
        TabView {
            DashboardView()
                .tabItem { Label("NEXUS", systemImage: "circle.hexagongrid.fill") }

            DeviceDiscoveryView()
                .tabItem { Label("Devices", systemImage: "dot.radiowaves.left.and.right") }

            SettingsView()
                .tabItem { Label("Settings", systemImage: "gearshape.fill") }
        }
        .task {
            appState.start()
        }
    }
}

struct DashboardView: View {
    @EnvironmentObject private var appState: AppState

    var body: some View {
        NavigationStack {
            List {
                Section("NEXUS") {
                    LabeledContent("Bluetooth", value: bluetoothText)
                    LabeledContent("Devices", value: "\(appState.devices.count)")
                }

                Section("Planned integrations") {
                    IntegrationRow(title: "HAVIT TWS984", detail: "Bluetooth / BLE")
                    IntegrationRow(title: "Infinix Watch H4", detail: "Bluetooth / BLE")
                    IntegrationRow(title: "LG", detail: "API / local network")
                    IntegrationRow(title: "PlayStation 5", detail: "Official / supported APIs")
                }
            }
            .navigationTitle("NEXUS")
        }
    }

    private var bluetoothText: String {
        switch appState.bluetooth.state {
        case .poweredOn: return "Ready"
        case .poweredOff: return "Off"
        case .unauthorized: return "Permission required"
        case .unsupported: return "Unsupported"
        case .resetting: return "Resetting"
        default: return "Checking"
        }
    }
}

struct IntegrationRow: View {
    let title: String
    let detail: String

    var body: some View {
        VStack(alignment: .leading, spacing: 3) {
            Text(title).font(.headline)
            Text(detail).font(.caption).foregroundStyle(.secondary)
        }
    }
}

struct DeviceDiscoveryView: View {
    @EnvironmentObject private var appState: AppState

    var body: some View {
        NavigationStack {
            List {
                Section {
                    Button {
                        appState.bluetooth.start()
                    } label: {
                        Label("Scan for devices", systemImage: "dot.radiowaves.left.and.right")
                    }

                    Button {
                        appState.bluetooth.stop()
                    } label: {
                        Label("Stop scan", systemImage: "stop.circle")
                    }
                }

                Section("Nearby Bluetooth devices") {
                    if appState.bluetooth.discovered.isEmpty {
                        ContentUnavailableView("No devices yet", systemImage: "antenna.radiowaves.left.and.right")
                    } else {
                        ForEach(appState.bluetooth.discovered) { device in
                            Button {
                                appState.bluetooth.connect(device.id)
                            } label: {
                                HStack {
                                    VStack(alignment: .leading) {
                                        Text(device.name)
                                        Text("RSSI \(device.rssi)")
                                            .font(.caption)
                                            .foregroundStyle(.secondary)
                                    }
                                    Spacer()
                                    Image(systemName: "link")
                                }
                            }
                        }
                    }
                }
            }
            .navigationTitle("Devices")
        }
    }
}

struct SettingsView: View {
    var body: some View {
        NavigationStack {
            Form {
                Section("NEXUS") {
                    LabeledContent("Architecture", value: "Web + iOS")
                    LabeledContent("Bluetooth", value: "Core Bluetooth")
                }
            }
            .navigationTitle("Settings")
        }
    }
}
