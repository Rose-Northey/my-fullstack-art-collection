
import artRoutes from './routes/router'
import express from 'express'



const server = express()
server.use(express.json())

import * as Path from 'node:path'
server.use('/api/v1/artworks', artRoutes)
if (process.env.NODE_ENV === 'production') {
  server.use(express.static(Path.resolve('public')))
  server.use('/assets', express.static(Path.resolve('./dist/assets')))
  server.get('*', (req, res) => {
    res.sendFile(Path.resolve('./dist/index.html'))
  })
}


export default server
