import SwiftUI

@main
struct NexusApp: App {
    @StateObject private var bluetooth = BluetoothManager()

    var body: some Scene {
        WindowGroup {
            NexusRootView()
                .environmentObject(bluetooth)
        }
    }
}

struct NexusRootView: View {
    @EnvironmentObject private var bluetooth: BluetoothManager

    var body: some View {
        NavigationStack {
            List {
                Section("NEXUS") {
                    Label("Device Center", systemImage: "dot.radiowaves.left.and.right")
                    HStack {
                        Text("Bluetooth")
                        Spacer()
                        Text(bluetooth.stateLabel)
                            .foregroundStyle(.secondary)
                    }
                }

                Section("Targets") {
                    Label("HAVIT TWS984", systemImage: "airpodspro")
                    Label("Infinix Watch H4", systemImage: "applewatch")
                }
            }
            .navigationTitle("NEXUS")
            .toolbar {
                Button("Scan") { bluetooth.startScan() }
            }
        }
    }
}
