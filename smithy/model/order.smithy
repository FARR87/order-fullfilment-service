$version: "2.0"

namespace example.fullfilment

enum OrderStatus {
    PENDING
    FULLFILLED
    BACKORDERED
}

resource Order {
    identifiers: {
        orderId: UUIDString
    }
    properties: {
        customerId: CustomerId
        createdAt: CreatedAt
        items: Items
    }
    put: CreateOrder
    read: GetOrder
    list: ListOrders
}

@idempotent
@http(method: "PUT", uri: "/order")
operation CreateOrder {
    input := for Order {
        @required
        $orderId

        @required
        $customerId

        @required
        $items
    }

    output := for Order {
        @required
        $orderId

        @required
        $customerId

        @required
        $createdAt

        @required
        $items
    }
}

@readonly
@http(method: "GET", uri: "/orders")
operation ListOrders {}

@readonly
@http(method: "GET", uri: "/order/{orderId}")
operation GetOrder {
    input := for Order {
        @required
        $orderId
    }

    output := for Order {
        @required
        $orderId

        @required
        $customerId

        @required
        $createdAt

        @required
        $items
    }
}

structure orderItem {
    @required
    sku: String

    @required
    quantity: Integer

    @required
    unitPrice: Integer
}

structure Item {
    @required
    orderId: UUIDString

    @required
    sku: SKU

    @required
    quantity: Integer
}

list orderItems {
    member: orderItem
}

@httpError(404)
@error("client")
structure OrderNotFound {
    message: String
    orderId: UUIDString
}

@length(min: 1, max: 128)
@pattern("^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$")
string UUIDString

timestamp CreatedAt

@pattern("^[A-Za-z0-9 ]+$")
string CustomerId
