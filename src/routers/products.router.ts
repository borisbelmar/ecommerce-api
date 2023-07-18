import { createProduct, deleteProduct, getAllProducts, getAllProductsByCategory, getProductById, updateProduct } from "@/controllers/product.controller"
import checkSession from "@/middlewares/checkSession"
import Router from "koa-router"

const productsRouter = new Router()

productsRouter.get('/', async ctx => {
  const { query } = ctx.request

  if (query.category) {
    ctx.body = await getAllProductsByCategory(query.category as string)
  } else {
    ctx.body = await getAllProducts()
  }
})

productsRouter.get('/:id', async ctx => {
  const { id } = ctx.params

  ctx.body = await getProductById(id)
})

productsRouter.post('/', checkSession({ isAdminRequired: true }), async ctx => {
  const { body } = ctx.request
  ctx.body = await createProduct(body)
})

productsRouter.put('/:id', checkSession({ isAdminRequired: true }), async ctx => {
  const { id } = ctx.params
  const { body } = ctx.request
  ctx.body = await updateProduct(id, body)
})

productsRouter.delete('/:id', checkSession({ isAdminRequired: true }), async ctx => {
  const { id } = ctx.params
  ctx.body = await deleteProduct(id)
})

export default productsRouter

