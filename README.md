# Order Fullfilment Service


## Running the cli helper
Use make to build project, see all the options by running:

    $ make help
### Pre-requisites
npm 11.11.0
yarn 1.22.22
sqlite3 3.53

## Design using [smithy](https://smithy.io/)

Smithy is a interface definition language with a lot of flexibility in terms of serialization and protocols and it facilitates codegeneration of service interfaces
in different languages like TypeScript/Java/Golang/Rust for different clients: like server backends with different protocols and serialization , software Development Kits and openApi clients.

The biggest traadeoff is that it means you have to learn a new definition language and learn to work within it's semantics
during this project I was forced to use the natively idempotent PUT /order instead of POST because the IDL follows the RFC to the letter and forces collection operations in POST http operations.

Most of the benefits gained by using this tool can be replicated by following an hexagonal architecture design and enforcing interface validation with other tools like Zod or TRPC at the expense of losing the flexibility
to generate interfaces in different languages,protocols and data serialization OPENAPI is only for http and text smithy facilitates generation and enforcement of other protocols like gRPC and serializing with ProtocolBuffers or datastreaming which are very useful in a Service Oriented architecture to for internal service Comunication.

Another downside is that the interfaces generated are desigend to work with nodes native http package  rather than facilitating mounts to other frameworks.
The code architecture suffered because of it, though with more time that would aldo be manageable, smithy allows you to build your own codegen translators.

Check [smithy models used in this project] (/smithy/model/main.smithy)

The architecture taken is a basic monolith with an in memory queue for event processing and mocked consumer

## Generating the code for sdk and server-stubs
    
    $make build

## Run the project

    $make run-server


## Todo
- properly configure the instrumentation to send traces to jaeger running locally and metrics to prometheus
- configure code generation for OpenApi Client in smithy
- dockerize all the enviroment and requirements
