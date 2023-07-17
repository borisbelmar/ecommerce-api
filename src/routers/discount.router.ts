import {
  getAllDiscounts,
  getDiscountByCodeOrId,
  createDiscount,
  updateDiscount,
  deleteDiscount
} from "@/controllers/discount.controller"
import Router from "koa-router"

const discountRouter = new Router()

discountRouter.get('/', async ctx => {
  ctx.body = await getAllDiscounts()
})

discountRouter.get('/:codeOrId', async ctx => {
  const { codeOrId } = ctx.params
  ctx.body = await getDiscountByCodeOrId(codeOrId)
})

discountRouter.post('/', async ctx => {
  const { body } = ctx.request
  ctx.body = await createDiscount(body)
})

discountRouter.put('/:id', async ctx => {
  const { id } = ctx.params
  const { body } = ctx.request
  ctx.body = await updateDiscount(id, body)
})

discountRouter.delete('/:id', async ctx => {
  const { id } = ctx.params
  ctx.body = await deleteDiscount(id)
})

export default discountRouter