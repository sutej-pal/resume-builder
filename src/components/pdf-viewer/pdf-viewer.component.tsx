import { useState, useEffect, useRef } from 'react';
import { pdfjs, Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import './style.scss';

import type { PDFDocumentProxy } from 'pdfjs-dist';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

const options = {
  cMapUrl: '/cmaps/',
  standardFontDataUrl: '/standard_fonts/',
};

type PDFFile = string | File | null;

const PdfViewer = ({ pdfBlob }: any) => {
  const [file, setFile] = useState<PDFFile>('./sample.pdf');
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);

  const canvasRef = useRef(null);

  useEffect(() => {
    setFile(pdfBlob);
  }, [pdfBlob]);

  function onDocumentLoadSuccess({ numPages: nextNumPages }: PDFDocumentProxy): void {
    setNumPages(nextNumPages);
  }

  const changePage = (offset: number) => {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  };

  const previousPage = () => {
    if (pageNumber > 1) {
      changePage(-1);
    }
  };

  const nextPage = () => {
    if (pageNumber < numPages) {
      changePage(1);
    }
  };

  const downloadPDF = () => {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(pdfBlob);
    link.download = "document.pdf"; // specify the filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div className='pdf-viewer-component-main'>
      <div className="rb-pdf-viewer">
        <div className='d-flex justify-content-between align-items-center py-3'>
          <div className='pdf-options-header'>
            <svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M 5.5 5.5 v 4 h 4 v -4 h -4 Z M 11 4 v 7 H 4 V 4 h 7 Z m 3.5 1.5 v 4 h 4 v -4 h -4 Z M 20 4 v 7 h -7 V 4 h 7 Z M 5.5 14.5 v 4 h 4 v -4 h -4 Z M 11 13 v 7 H 4 v -7 h 7 Z m 3.5 1.5 v 4 h 4 v -4 h -4 Z M 20 13 v 7 h -7 v -7 h 7 Z" />
            </svg>
            Select Template
          </div>
          <div>
            <button type="button" onClick={() => downloadPDF()} className="btn btn-primary">Download PDF</button>
          </div>
        </div>
        <Document className="rb-pdf-viewer-document" file={file} onLoadSuccess={onDocumentLoadSuccess} options={options}>
          <Page canvasRef={canvasRef} className="rb-pdf-viewer-page" renderTextLayer={false} renderAnnotationLayer={false} pageNumber={pageNumber} scale={.9} />
        </Document>
        <div className="d-flex justify-content-center my-3">
          <div className="border border-light-subtle btn-group" style={{ maxWidth: '150px' }}>
            <button className="btn" onClick={previousPage}><i className="fa-solid fa-chevron-left"></i></button>
            <button className="btn border border-light-subtle border-top-0 border-bottom-0" id="page-info">{pageNumber} / {numPages}</button>
            <button className="btn" onClick={nextPage}><i className="fa-solid fa-chevron-right"></i></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PdfViewer;
