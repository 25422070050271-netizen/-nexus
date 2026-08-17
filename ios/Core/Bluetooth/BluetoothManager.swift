import CoreBluetooth
import Foundation

final class BluetoothManager: NSObject, ObservableObject {
    @Published private(set) var state: CBManagerState = .unknown
    @Published private(set) var peripherals: [CBPeripheral] = []

    private var central: CBCentralManager!

    override init() {
        super.init()
        central = CBCentralManager(delegate: self, queue: .main,
                                   options: [CBCentralManagerOptionRestoreIdentifierKey: "nexus.bluetooth.central"])
    }

    var stateLabel: String {
        switch state {
        case .poweredOn: return "Ready"
        case .poweredOff: return "Off"
        case .unauthorized: return "Not authorized"
        case .unsupported: return "Unsupported"
        case .resetting: return "Resetting"
        default: return "Unknown"
        }
    }

    func startScan() {
        guard state == .poweredOn else { return }
        central.scanForPeripherals(withServices: nil,
                                   options: [CBCentralManagerScanOptionAllowDuplicatesKey: false])
    }

    func stopScan() {
        central.stopScan()
    }
}

extension BluetoothManager: CBCentralManagerDelegate {
    func centralManagerDidUpdateState(_ central: CBCentralManager) {
        state = central.state
    }

    func centralManager(_ central: CBCentralManager,
                        didDiscover peripheral: CBPeripheral,
                        advertisementData: [String : Any],
                        rssi RSSI: NSNumber) {
        guard !peripherals.contains(where: { $0.identifier == peripheral.identifier }) else { return }
        peripherals.append(peripheral)
    }

    func centralManager(_ central: CBCentralManager,
                        willRestoreState dict: [String : Any]) {
        // Reserved for state restoration in a later milestone.
    }
}
