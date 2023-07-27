import Koa from 'koa'
import koaBody from 'koa-body'
import cors from '@koa/cors'

import errorHandler from './middlewares/errorHandler'
import router from './routers'

const PORT = process.env.PORT || 4000

const app = new Koa()

app.use(cors())
app.use(koaBody())
app.use(errorHandler)


app.use(router.routes())

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})