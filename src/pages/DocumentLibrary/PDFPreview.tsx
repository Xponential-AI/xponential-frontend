import { useState } from 'react';
import { pdfjs, Document, Page } from 'react-pdf';
import './PDFPreview.scss';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const options = {
  cMapUrl: '/cmaps/',
  standardFontDataUrl: '/standard_fonts/',
};

export const PDFPreview = ({file}: any) => {
  const [numPages, setNumPages] = useState<number>();

  return <div className='document-preview-container'>
    <Document file={file} onLoadSuccess={() => {}} options={options}>
      {Array.from(new Array(numPages), (_el, index) => (
        <Page
          key={`page_${index + 1}`}
          pageNumber={index + 1}
          width={400}
        />
      ))}
    </Document>
  </div> 
}