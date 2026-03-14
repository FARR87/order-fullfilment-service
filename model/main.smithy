$version: "2"

namespace example.fullfilment

/// Provides weather forecasts.
@paginated(inputToken: "nextToken", outputToken: "nextToken", pageSize: "pageSize")
service Fullfilment {
    version: "2026-03-01"
    resources: [
        Order
    ]
    operations: [
        // FullFillOrder
    ]
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
    create: CreateOrder
}

operation CreateOrder {
    input: orderInput

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

timestamp CreatedAt

@pattern("^[A-Za-z0-9 ]+$")
string CustomerId

list Items {
    member: Item
}

structure orderInput {
    @required
    orderId: UUIDString
}

@length(min: 1, max: 2)
list createOrders {
    member: orderInput
}

structure Item {
    @required
    orderId: UUIDString

    @required
    sku: SKU

    @required
    quantity: Integer
}

@pattern("^[A-Za-z0-9 ]+$")
string SKU

@error("client")
@retryable
@httpError(429)
structure ThrottlingError {}

@error("server")
@retryable
@httpError(503)
structure ServiceUnavailableError {}
