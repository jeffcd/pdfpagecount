import pdf from "pdfjs-dist";
// import pdf from "pdfjs-dist/legacy/build/pdf.js";
import fs from "node:fs";

const DIR = "pdfs";

fs.readdir(DIR, async (err, files) => {
  for (let f = 0; f < files.length; f++) {
    const file = files[f];
    if (/\.pdf$/.test(file)) {
      // console.log(file);
      const loadingTask = pdf.getDocument(DIR + "/" + file);
      await loadingTask.promise.then(function (doc) {
        const numPages = doc.numPages;
        // console.log("# Document Loaded");
        // console.log("Number of Pages: " + numPages);
        // console.log();
        for (let i = 0; i < numPages; i++) {
          console.log(`"${file}",${i + 1}`);
        }
      });
    }
  }
});

// "pdfsample.pdf",1
// "pdfsample.pdf",2
