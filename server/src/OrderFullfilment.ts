import { FullfilmentService, CreateOrderServerInput, CreateOrderInput, CreateOrderOutput, CreateOrderServerOutput, GetOrderServerInput, GetOrderServerOutput, ListOrdersInput, ListOrdersOutput, OrderNotFound, OrderStatus, Item, ListOrdersServerOutput, ValidationException } from "@com.example/orders-fullfilment-server";




// In Memory map for idempotency and queue for request processing
export interface OrderFullFilmentContext {
    // A map for storing order information
    orders: Map<string, CreateOrderOutput>;
    // An order queue for handling requests
    queue: CreateOrderOutput[];
}

export class OrderFullFilment implements FullfilmentService<OrderFullFilmentContext> {
    async CreateOrder(input: CreateOrderServerInput, context: OrderFullFilmentContext): Promise<CreateOrderServerOutput> {
        console.log("return");
        const order = {
            orderId: input.orderId,
            customerId: input.customerId,
            orderStatus: OrderStatus.PENDING,
            createdAt: new Date(),
            items: input.items
        };
        context.orders.set(order.orderId || "", order);
        context.queue.push(order);
        return order;
    }
    async GetOrder(input: GetOrderServerInput, context: OrderFullFilmentContext): Promise<GetOrderServerOutput> {
        console.log(`getting an order (${input.orderId})...`)
        if (input.orderId && context.orders.has(input.orderId)) {
            const order = context.orders.get(input.orderId);
            if (order) {
                return {
                    orderId: order.orderId,
                    customerId: order?.customerId,
                    orderStatus: order.orderStatus,
                    createdAt: order.createdAt,
                    items: order?.items
                }
            }

        }
        console.log(`order (${input.orderId}) does not exist.`)
        throw new OrderNotFound({
            message: `order ${input.orderId} not found.`,
            orderId: input.orderId
        });
    }

    async ListOrders(input: ListOrdersInput, context: OrderFullFilmentContext): Promise<ListOrdersServerOutput> {
        return { orders: undefined };
    }
}