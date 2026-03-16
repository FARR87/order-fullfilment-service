$version: "2"

namespace com.fullfilment

use smithy.framework#ValidationException

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
    errors: [
        ValidationException
    ]
}

list Items {
    member: Item
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
