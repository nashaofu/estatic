import express from 'express'
import serveIndex from 'serve-index'

export default function a(root = '.') {
  const app = express()

  app.use(express.static(root), serveIndex(root, { icons: true, hidden: true }))

  app.listen(8080)
}
