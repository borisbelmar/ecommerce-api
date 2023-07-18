import Koa from 'koa'
import Router from 'koa-router'
import koaBody from 'koa-body'
import discountRouter from './routers/discount.router'
import authRouter from './routers/auth.router'
import categoryRouter from './routers/category.router'
import productsRouter from './routers/products.router'

import errorHandler from './middlewares/errorHandler'
import checkSession from './middlewares/checkSession'

const PORT = process.env.PORT || 4000

const app = new Koa()
const router = new Router()

app.use(koaBody())
app.use(errorHandler)

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
router.use('/auth', authRouter.routes(), authRouter.allowedMethods())

app.use(router.routes())

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})