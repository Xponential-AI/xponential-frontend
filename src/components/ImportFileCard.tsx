import { useState } from 'react';
import { Button } from '../components/Button';
import { FileInput } from '../components/inputs/FileInput';
import { useTranslation } from "react-i18next";
import { pdfjs, Document, Page } from 'react-pdf';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import axios from 'axios';

import "./ImportFileCard.scss";

import type { PDFDocumentProxy } from 'pdfjs-dist';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const options = {
  cMapUrl: '/cmaps/',
  standardFontDataUrl: '/standard_fonts/',
};

const maxWidth = 800;


export const ImportFileCard = () => {
  const { t } = useTranslation();
  const [file, setFile] = useState<File>();
  const [fileForPreview, setFileForPreview] = useState();
  const [numPages, setNumPages] = useState<number>();
  
  // const [uploadedFile, setUploadedFile] = useState();
  // const [error, setError] = useState();
  
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    if(event.target.files) {
      console.log(event.target.files[0]);
      setFile(event.target.files[0]);
      convertToBase64(event.target.files[0]);
    }
  }
  
  function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    const url = 'http://localhost:3000/uploadFile';
    const formData = new FormData();
  
    if(!file) {
      return null;
    }
  
    formData.append('file', file);
    formData.append('fileName', file.name);
  
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    
    axios.post(url, formData, config)
      .then((response) => {
        console.log(response.data);
        // setUploadedFile(response.data.file);
      })
      .catch((error) => {
        console.error("Error uploading file: ", error);
        // setError(error);
      });
  }

  const clearForm = () => {
    setFile(undefined)
    setFileForPreview(undefined)
  }

  const convertToBase64 = async (file: any) => {
    const fileReader = new FileReader();
    let base64;
    // Onload of file read the file content
    fileReader.onload = function(fileLoadedEvent: any) {
        base64 = fileLoadedEvent.target.result;
        // Print data in console
        console.log(base64);
        setFileForPreview(base64);
    };
    // Convert data to base64
    fileReader.readAsDataURL(file);
  }

  console.log({fileForPreview})

  function onDocumentLoadSuccess({ numPages: nextNumPages }: PDFDocumentProxy): void {
    setNumPages(nextNumPages);
  }

  return <div className='page-wrapper'>
      <div className="card-wrapper">
        <form onSubmit={handleSubmit}>
          <FileInput handleChange={handleChange} fileName={file?.name} handleClear={clearForm}/>

          <div>
            <Button text={t("Upload")} variant="primary" disabled={!file}/>
            <Button marginTop={10} text={"Clear"} variant="secondary" onClick={clearForm}/>
          </div>
        </form>
      </div>
      {fileForPreview ? 
        <div className="Example__container__document">
          <Document file={fileForPreview} onLoadSuccess={onDocumentLoadSuccess} options={options}>
            {Array.from(new Array(numPages), (_el, index) => (
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                width={maxWidth}
              />
            ))}
          </Document>
        </div>
         : <div className="empty-preview">Upload a pdf file to see a preview</div>
      }

    </div>
}
