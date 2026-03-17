import { getFullfilmentServiceHandler } from "@com.example/orders-fullfilment-server"
import { IncomingMessage, ServerResponse, createServer } from "http";
import { convertRequest, writeResponse } from "@aws-smithy/server-node";
import { OrderFullFilment } from "./OrderFullfilment";
import dotenv from "dotenv";
import { sequelize, models } from "./database"
//get EnvVars
dotenv.config();
const serviceName = process.env.SERVICE_NAME
// Instantiate our coffee service implementation
const OrderFullFilmentService = new OrderFullFilment();
// Create a service handler using our coffee service
const serviceHandler = getFullfilmentServiceHandler(OrderFullFilmentService);
// The coffee shop context object
const ctx = { orders: new Map(), queue: [] };



//Assert Connection
async function assertDatabaseConnectionOk() {
    console.log(`Checking database connection...`);
    try {
        await sequelize.authenticate();
        console.log('Database connection OK!');
    } catch (error) {
        console.log('Unable to connect to the database:');
        process.exit(1);
    }
}


setTimeout(async () => {
    console.log('antes del sync');
    await assertDatabaseConnectionOk();
    //await sequelize.sync({ force: true });
}, 1000);
// Create the node server with the service handler
const server = createServer(async function (
    req: IncomingMessage,
    res: ServerResponse<IncomingMessage> & { req: IncomingMessage }
) {
    const httpRequest = convertRequest(req);
    //TODO env for tracer
    //const tracer = trace.getTracer('order-fullfilment-server', '0.1.0');

    // Call the service handler, which will route the request to the GreetingService
    // implementation and then serialize the response to an HttpResponse.
    const httpResponse = await serviceHandler.handle(httpRequest, ctx);

    // Write the HttpResponse to NodeJS http's response expected format.
    return writeResponse(httpResponse, res);
});

const port = process.env.SERVICE_PORT || 3001;
server.listen(port);
console.log(`Started server on port ${port}...  for service:${serviceName}`);

// Asynchronously handle orders as they come in
//coffeeService.handleOrders(ctx)
