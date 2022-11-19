import { collections } from '@/server/index'
import type { IReportInfo } from '@/models/reports.models'

export default defineEventHandler(async () => {
  const names = await collections.reports223.find({}, { projection: { _id: 0, name: 1, active: 1, title: 1 } })
  return names.toArray() as Promise<IReportInfo[]>
})
