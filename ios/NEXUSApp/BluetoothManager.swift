import Foundation
import CoreBluetooth

@MainActor
final class BluetoothManager: NSObject, ObservableObject {
    @Published private(set) var state: CBManagerState = .unknown
    @Published private(set) var discovered: [NEXUSPeripheral] = []

    private var central: CBCentralManager!
    private var peripherals: [UUID: CBPeripheral] = [:]

    override init() {
        super.init()
        central = CBCentralManager(delegate: self, queue: nil)
    }

    func start() {
        guard central.state == .poweredOn else { return }
        discovered.removeAll()
        central.scanForPeripherals(withServices: nil, options: [CBCentralManagerScanOptionAllowDuplicatesKey: false])
    }

    func stop() {
        central.stopScan()
    }

    func connect(_ peripheralID: UUID) {
        guard let peripheral = peripherals[peripheralID] else { return }
        central.connect(peripheral)
    }
}

struct NEXUSPeripheral: Identifiable, Equatable {
    let id: UUID
    let name: String
    let rssi: Int
}

extension BluetoothManager: CBCentralManagerDelegate {
    nonisolated func centralManagerDidUpdateState(_ central: CBCentralManager) {
        Task { @MainActor [weak self] in
            self?.state = central.state
        }
    }

    nonisolated func centralManager(_ central: CBCentralManager,
                                   didDiscover peripheral: CBPeripheral,
                                   advertisementData: [String : Any],
                                   rssi RSSI: NSNumber) {
        let item = NEXUSPeripheral(
            id: peripheral.identifier,
            name: peripheral.name ?? "Unknown device",
            rssi: RSSI.intValue
        )

        Task { @MainActor [weak self] in
            guard let self else { return }
            self.peripherals[peripheral.identifier] = peripheral
            if let index = self.discovered.firstIndex(where: { $0.id == item.id }) {
                self.discovered[index] = item
            } else {
                self.discovered.append(item)
            }
        }
    }
}
