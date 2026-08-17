import CoreBluetooth
import Foundation

/// Integration boundary for Infinix Watch H4.
///
/// The H4 protocol is treated as vendor-specific until its GATT surface is
/// observed and mapped. Unknown writes are intentionally disabled.
final class WatchH4Integration: NSObject, CBPeripheralDelegate {
    private(set) var peripheral: CBPeripheral?

    func attach(_ peripheral: CBPeripheral) {
        self.peripheral = peripheral
        peripheral.delegate = self
        peripheral.discoverServices(nil)
    }

    func peripheral(_ peripheral: CBPeripheral,
                    didDiscoverServices error: Error?) {
        guard error == nil, let services = peripheral.services else { return }
        for service in services {
            peripheral.discoverCharacteristics(nil, for: service)
        }
    }

    func peripheral(_ peripheral: CBPeripheral,
                    didDiscoverCharacteristicsFor service: CBService,
                    error: Error?) {
        // First milestone: discover and document services/characteristics.
    }
}
