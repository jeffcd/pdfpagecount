// import pdf from "pdfjs-dist";
import pdf from "pdfjs-dist/legacy/build/pdf.js";
import fs from "node:fs";

fs.readdir(".", async (err, files) => {
  for (let f = 0; f < files.length; f++) {
    const file = files[f];
    if (/\.pdf$/.test(file)) {
      console.log(file);
      const loadingTask = pdf.getDocument(file);
      await loadingTask.promise.then(function (doc) {
        const numPages = doc.numPages;
        // console.log("# Document Loaded");
        // console.log("Number of Pages: " + numPages);
        // console.log();
        for (let i = 0; i < numPages; i++) {
          console.log(`"${file}",${i}`);
        }
      });
    }
  }
});

// "pdfsample.pdf",0
// "pdfsample.pdf",1
