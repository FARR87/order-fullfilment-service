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

resource Order{
    identifiers: {OrderId}
    properties: {CustomerId,CreatedAt}
    read:GetOrder
    list:ListOrders
    resources: [Items]
}

@pattern("^[A-Za-z0-9 ]+$")
string OrderId

list Items{
    member:Item
}

resource Item{
    identifiers: {SKU}
}
@pattern("^[A-Za-z0-9 ]+$")
string SKU