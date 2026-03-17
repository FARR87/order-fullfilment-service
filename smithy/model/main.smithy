$version: "2"

namespace com.example

use aws.protocols#restJson1
use smithy.framework#ValidationException

@restJson1
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
        ServiceError
        ServiceUnavailableError
        ThrottlingError
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

@error("server")
@retryable
@httpError(500)
structure ServiceError {}
