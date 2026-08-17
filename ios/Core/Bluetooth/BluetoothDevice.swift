import CoreBluetooth
import Foundation

struct BluetoothDevice: Identifiable {
    let id: UUID
    let name: String
    let rssi: Int
}

struct BluetoothCharacteristicInfo: Identifiable {
    let id: CBUUID
    let properties: CBCharacteristicProperties
}
