import { collections } from '@/server/index'

export default defineEventHandler(async (event) => {
  const query = { name: event.context.params.name }
  const name = await collections.reports615.findOne(query)
  return name
})
