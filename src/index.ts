import Koa from 'koa'
import Router from 'koa-router'
import koaBody from 'koa-body'
import discountRouter from './routers/discount.router'
import errorHandler from './middlewares/errorHandler'

const PORT = process.env.PORT || 4000

const app = new Koa()
const router = new Router()

app.use(koaBody())
app.use(errorHandler)

router.get('/', async (ctx) => {
  ctx.body = 'Hello, world!'
})

router.use('/discounts', discountRouter.routes(), discountRouter.allowedMethods())

app.use(router.routes())

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})