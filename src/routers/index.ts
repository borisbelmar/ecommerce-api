import checkSession from "@/middlewares/checkSession"
import Router from "koa-router"
import discountRouter from "./discount.router"
import categoryRouter from "./category.router"
import productsRouter from "./products.router"
import authRouter from "./auth.router"
import orderRouter from "./order.router"

const router = new Router()

router.get('/', async (ctx) => {
  ctx.body = 'Hello, world!'
})

router.use(
  '/discounts',
  checkSession({ isAdminRequired: true }),
  discountRouter.routes(),
  discountRouter.allowedMethods()
)

router.use(
  '/categories',
  categoryRouter.routes(),
  categoryRouter.allowedMethods()
)

router.use(
  '/products',
  productsRouter.routes(),
  productsRouter.allowedMethods()
)

router.use(
  '/auth',
  authRouter.routes(),
  authRouter.allowedMethods()
)

router.use(
  '/orders',
  orderRouter.routes(),
  orderRouter.allowedMethods()
)

export default router