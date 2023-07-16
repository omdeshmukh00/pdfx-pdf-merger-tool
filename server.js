const fs = require('fs');
const express = require('express')
const path = require('path')
const app = express()
const multer  = require('multer')
const {mergePdfs}  = require('./merge')
const PDFMerger = require('pdf-merger-js')
const upload = multer({ dest: 'uploads/' })
app.use("/static", express.static('public'))
const port = 4000

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "template/index.html"))
})

app.post('/merge', upload.array('pdfs', 10), async (req, res, next) => {
  console.log(req.files)
  let d = await mergePdfs(path.join(__dirname, req.files[0].path), path.join(__dirname, req.files[1].path))
  res.redirect(`http://localhost:3000/static/${d}.pdf` )
  if (d) {
    try {
      fs.unlinkSync(`uploads/${[0]}`);
      fs.unlinkSync(`uploads/${[1]}`);
    
      console.log("Delete File successfully.");
    } catch (error) {
      console.log(error);
    }
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})



