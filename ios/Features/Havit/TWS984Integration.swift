import CoreBluetooth
import Foundation

/// Integration boundary for HAVIT TWS984.
///
/// Do not send proprietary commands until the device's real GATT services and
/// characteristics have been discovered and verified.
final class TWS984Integration: NSObject, CBPeripheralDelegate {
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
        // First milestone: inventory the real GATT surface.
        // Feature commands will be added only after verification.
    }
}
