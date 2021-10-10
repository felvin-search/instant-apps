import React from 'react'

import {render, waitFor, screen} from '@testing-library/react'
import {queryToData, Component as DictComponent} from './App'
import {server} from '../mocks/server'

describe("Dictionary", () => {
  beforeAll(() => server.listen())

  afterEach(() => server.resetHandlers())

  afterAll(() => server.close())

  it("Can render the component for a specific word", async () => {
    const queryData = await queryToData({query: "define splendid"})

    const result = render(<DictComponent data={queryData} /> )

    await waitFor(() => screen.getByText("splendid", {selector: "h1"}))

    expect(result.container.querySelector("#phonetics-text")?.textContent).toEqual('ˈsplɛndɪd')
  })
})