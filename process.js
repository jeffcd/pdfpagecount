import pdf from "pdfjs-dist";
import fs from "node:fs";

fs.readdir(".", (err, files) => {
  files.forEach((file) => {
    if (/\.pdf$/.test(file)) {
      const src = fs.readFileSync(file);
      const loadingTask = pdf.getDocument(file);
      loadingTask.promise.then(function (doc) {
        const numPages = doc.numPages;
        console.log("# Document Loaded");
        console.log("Number of Pages: " + numPages);
        console.log();
        for (let i = 0; i < numPages; i++) {
          console.log(`"${file}",${i}`);
        }
      });
    }
  });
});

// "pdfsample.pdf",0
// "pdfsample.pdf",1
