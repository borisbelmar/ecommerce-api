import { Order } from '@prisma/client'
import prismaClient from '@/lib/prismaClient'

export interface OrderFilters {
  userdId?: string
  status?: 'PENDING' | 'COMPLETED' | 'CANCELLED'
}

interface OrderRepository {
  getAllOrders(filters?: OrderFilters): Promise<Order[]>
  getOrderById(id: string): Promise<Order | null>
  createOrder(order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<Order>
}

export default function getOrderRepository(): OrderRepository {
  const getAllOrders = async (filters?: OrderFilters) => {
    return await prismaClient.order.findMany({
      where: filters
    })
  }

  const getOrderById = async (id: string) => {
    return await prismaClient.order.findUnique({
      where: { id },
    })
  }

  const createOrder = async (order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) => {
    return await prismaClient.order.create({
      data: order,
    })
  }

  return {
    getAllOrders,
    getOrderById,
    createOrder
  }
}