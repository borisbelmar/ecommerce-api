import { ZodError, z } from "zod";
import { ControllerError } from "@/errors/ControllerError";
import getOrderRepository, { OrderFilters } from "@/repository/order.repository";
import { createOrderSchema } from "@/validations/order.schema";

export const getAllOrders = async (filters?: OrderFilters) => {
  const repository = getOrderRepository();

  const orders = await repository.getAllOrders(filters);

  return orders;
}

export const getOrderById = async (id: string) => {
  const repository = getOrderRepository();

  const order = await repository.getOrderById(id);

  if (!order) {
    throw new ControllerError(404, 'Order not found');
  }

  return order;
}

type CreateOrderDTO = z.infer<typeof createOrderSchema>

export const createOrder = async (data: CreateOrderDTO) => {
  const repository = getOrderRepository();

  try {
    const validatedOrder = createOrderSchema.parse(data);

    const order = await repository.createOrder(validatedOrder)

    return order;
  } catch (error) {
    if (error instanceof ZodError) {
      throw new ControllerError(400, error.message);
    }
    throw error;
  }
}
