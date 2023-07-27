import { createOrder, getAllOrders, getOrderById } from "@/controllers/order.controller"
import checkSession from "@/middlewares/checkSession"
import Router from "koa-router"

const orderRouter = new Router()

orderRouter.get(
  '/',
  checkSession({ isAdminRequired: true }),
  async (ctx) => {
    const { query } = ctx.request
    const orders = await getAllOrders(query)

    ctx.body = orders
  }
)

orderRouter.get(
  '/:id',
  checkSession({ isAdminRequired: true }),
  async (ctx) => {
    const { id } = ctx.params

    const order = await getOrderById(id)

    ctx.body = order
  }
)

orderRouter.post('/',
  checkSession(),
  async (ctx) => {
    const { body } = ctx.request

    const order = await createOrder({
      ...body,
      userId: ctx.state.user.id
    })

    ctx.status = 201
    ctx.body = order
  }
)

export default orderRouter
