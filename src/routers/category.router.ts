import { createCategory, deleteCategory, getAllCategories, getCategoryById, updateCategory } from "@/controllers/category.controller"
import checkSession from "@/middlewares/checkSession"
import Router from "koa-router"

const categoryRouter = new Router()

categoryRouter.get('/', async ctx => {
  ctx.body = await getAllCategories()
})

categoryRouter.get('/:id', async ctx => {
  const { id } = ctx.params

  ctx.body = await getCategoryById(id)
})

categoryRouter.post('/', checkSession({ isAdminRequired: true }), async ctx => {
  const { body } = ctx.request
  ctx.body = await createCategory(body)
})

categoryRouter.put('/:id', checkSession({ isAdminRequired: true }), async ctx => {
  const { id } = ctx.params
  const { body } = ctx.request
  ctx.body = await updateCategory(id, body)
})

categoryRouter.delete('/:id', checkSession({ isAdminRequired: true }), async ctx => {
  const { id } = ctx.params
  ctx.body = await deleteCategory(id)
})

export default categoryRouter

