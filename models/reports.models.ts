import type { Document, WithId } from 'mongodb'

export interface IReportInfo extends WithId<Document> {
  name: string
  active: boolean
  title: string
}

export interface IField {
  description: string
  name: string
  path: string
  type: string
}

export interface IReport {
  _id: string
  collection: string
  db: string
  fields: Array<IField>
}

export interface IDateRange {
  start?: Date
  end?: Date
}

export interface IGenerateBody {
  collection_name: string
  report_name: string
  fields: Array<string>
  date: IDateRange
}
