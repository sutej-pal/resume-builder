import { useState, useEffect, useRef } from 'react';
import { pdfjs, Document, Page } from 'react-pdf';
import './style.scss';
import ChooseTemplateIcon from './../../assets/icons/choose.png'

import type { PDFDocumentProxy } from 'pdfjs-dist';
import Spinner from '../spinner';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const options = {
  cMapUrl: '/cmaps/',
  standardFontDataUrl: '/standard_fonts/',
};

type PDFFile = string | File | null;

const Loader = () => {
  return (
    <div className='align-items-center d-flex justify-content-center' style={{minHeight: '200px'}}>
      <Spinner />
    </div>
  )
}

const PdfViewer = ({ pdfBlob }: any) => {
  const [file, setFile] = useState<PDFFile>('./sample.pdf');
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);

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
            <button type="button" className="btn select-template-btn">
              <img src={ChooseTemplateIcon} alt="" />
              <span className='ps-2'>
                Select Template
              </span>
            </button>
          </div>
          <div>
            <button type="button" onClick={() => downloadPDF()} className="btn btn-primary">Download PDF</button>
          </div>
        </div>
        <Document className="rb-pdf-viewer-document" loading={<Loader />} file={file} onLoadSuccess={onDocumentLoadSuccess} options={options}>
          <Page className="rb-pdf-viewer-page" renderTextLayer={false} renderAnnotationLayer={false} pageNumber={pageNumber} scale={0.9} />
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
