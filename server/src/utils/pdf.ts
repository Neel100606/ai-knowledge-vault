  import PDFParser from "pdf2json";

  export const extractTextFromPDF = (buffer: Buffer): Promise<string> => {
    return new Promise((resolve, reject) => {
      const pdfParser = new PDFParser(null, 1);

      pdfParser.on("pdfParser_dataError", err => {
        reject(err.parserError);
      });

      pdfParser.on("pdfParser_dataReady", pdfData => {
        try {
          const pages = pdfData.Pages || [];
          const texts: string[] = [];

          for (const page of pages) {
            for (const text of page.Texts) {
              for (const item of text.R) {
                texts.push(decodeURIComponent(item.T));
              }
            }
          }

          resolve(texts.join(" ").replace(/\s+/g, " ").trim());
        } catch (err) {
          reject(err);
        }
      });

      pdfParser.parseBuffer(buffer);
    });
  };