const pdf = require("pdfjs");
const fs = require("node:fs");

fs.readdir(".", (err, files) => {
  files.forEach((file) => {
    if (/\.pdf$/.test(file)) {
      const src = fs.readFileSync(file);
      const ext = new pdf.ExternalDocument(src);
      //   console.log(ext);
      for (let i = 0; i < ext.pageCount; i++) {
        console.log(`"${file}",${i}`);
      }
    }
  });
});

// "pdfsample.pdf",0
// "pdfsample.pdf",1
