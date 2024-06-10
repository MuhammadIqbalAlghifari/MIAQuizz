import { type SchemaTypeDefinition } from 'sanity'
import questions from './question'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [questions],
}
