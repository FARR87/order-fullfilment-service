$version: "2.0"

namespace example.fullfilment

enum OrderStatus {
    PENDING
    FULLFILLED
    BACKORDERED
}

structure Order {
    @required
    orderId: UUIDString

    @required
    clienId: String

    @required
    status: OrderStatus

    createdAt: CreatedAt
}

list Orders {
    member: Order
}

structure orderItem {
    @required
    sku: String

    @required
    quantity: Integer

    @required
    unitPrice: Integer
}

list orderItems {
    member: orderItem
}

@length(min: 1, max: 128)
@pattern("^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$")
string UUIDString

timestamp CreatedAt
