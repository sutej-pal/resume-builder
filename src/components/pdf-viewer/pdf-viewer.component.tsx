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

  const calculateWidth = (height: number, aspectRatio: number) => {
    return height * aspectRatio;
  }

  setTimeout(() => {
    console.log(canvasRef);
    // const calculatedWidth = calculateWidth(givenHeight, aspectRatio);
    // canvasRef.width = calculatedWidth;
    // canvasRef.height = givenHeight;


  }, 1000);

  return (
    <div className='pdf-viewer-component-main'>
      <div className="rb-pdf-viewer">
        <Document className="rb-pdf-viewer-document" file={file} onLoadSuccess={onDocumentLoadSuccess} options={options}>
          <Page canvasRef={canvasRef} className="rb-pdf-viewer-page" renderTextLayer={false} renderAnnotationLayer={false} pageNumber={pageNumber} scale={1} />
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
