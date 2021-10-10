import {setupServer} from 'msw/node'
import {rest} from 'msw'
import mockData from './data/mockRequest.json'

export const handlers = [
  rest.get('https://api.dictionaryapi.dev/api/v2/entries/en_US/:word', (req, res, ctx) => {
    return res(ctx.json(mockData))
  })
]

export const server = setupServer(...handlers)