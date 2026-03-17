import { getFullfilmentServiceHandler } from "@com.example/orders-fullfilment-server"
import { IncomingMessage, ServerResponse, createServer } from "http";
import { convertRequest, writeResponse } from "@aws-smithy/server-node";
import { OrderFullFilment } from "./OrderFullfilment";
import dotenv from "dotenv";

//get EnvVars
dotenv.config();
// Instantiate our coffee service implementation
const OrderFullFilmentService = new OrderFullFilment();
// Create a service handler using our coffee service
const serviceHandler = getFullfilmentServiceHandler(OrderFullFilmentService);
// The coffee shop context object
const ctx = { orders: new Map(), queue: [] };

// Create the node server with the service handler
const server = createServer(async function (
    req: IncomingMessage,
    res: ServerResponse<IncomingMessage> & { req: IncomingMessage }
) {
    const httpRequest = convertRequest(req);

    // Call the service handler, which will route the request to the GreetingService
    // implementation and then serialize the response to an HttpResponse.
    const httpResponse = await serviceHandler.handle(httpRequest, ctx);

    // Write the HttpResponse to NodeJS http's response expected format.
    return writeResponse(httpResponse, res);
});

const port = process.env.SERVICE_PORT || 3300;
server.listen(port);
console.log(`Started server on port ${port}...`);

// Asynchronously handle orders as they come in
//coffeeService.handleOrders(ctx)
