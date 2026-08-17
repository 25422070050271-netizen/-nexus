import Foundation
import SwiftUI

@MainActor
final class AppState: ObservableObject {
    @Published var connectionState: ConnectionState = .notConfigured
    @Published var devices: [NEXUSDevice] = []
    @Published var selectedDeviceID: UUID?

    let bluetooth = BluetoothManager()

    func start() {
        bluetooth.start()
    }
}

enum ConnectionState: String {
    case notConfigured = "Not configured"
    case scanning = "Scanning"
    case connected = "Connected"
    case unavailable = "Unavailable"
    case error = "Error"
}

struct NEXUSDevice: Identifiable, Codable, Equatable {
    let id: UUID
    var name: String
    var category: DeviceCategory
    var status: DeviceStatus
    var battery: Int?
    var integration: String
}

enum DeviceCategory: String, Codable {
    case audio
    case watch
    case tv
    case console
    case other
}

enum DeviceStatus: String, Codable {
    case unknown
    case disconnected
    case connected
    case ready
}
