import { useState } from 'react';
import { Button } from '../components/Button';
import { Loading } from '../components/Loading';
import { FileInput } from '../components/inputs/FileInput';
import { useTranslation } from "react-i18next";
import { pdfjs, Document, Page } from 'react-pdf';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import axios from 'axios';
import { API_URL } from '../constants/index.ts';
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

const maxWidth = 300;

export const ImportFileCard = () => {
  const { t } = useTranslation();
  const [file, setFile] = useState<File>();
  const [fileForPreview, setFileForPreview] = useState();
  const [numPages, setNumPages] = useState<number>();
  const [response, setResponse] = useState<any>();
  const [viewRaw, setViewRaw] = useState<boolean>(false);

  const [ loading, setLoading ] = useState<boolean>(false);
  
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    if(event.target.files) {
      console.log(event.target.files[0]);
      setFile(event.target.files[0]);
      convertToBase64(event.target.files[0]);
    }
  }
  
  function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    const url = API_URL;
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

    setLoading(true);
    axios.post(url, formData, config)
      .then((response) => {
        console.log(response.data);
        setResponse(response.data)
      })
      .catch((error) => {
        console.error("Error uploading file: ", error);
      }).finally(() => {
        setLoading(false);
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

  function onDocumentLoadSuccess({ numPages: nextNumPages }: PDFDocumentProxy): void {
    setNumPages(nextNumPages);
  }

  const prettyPrintKeys = (key: string) => {
    return key.replaceAll('_', ' ').trim();
  }

  const renderResponse = () => {
    try {
      let keys = Object.keys(response);
      
      if (keys.indexOf('doc_type_values') > 0) {
        keys.splice(keys.indexOf('doc_type_values'), 1);
        keys.unshift('doc_type_values');
      }
      
      return keys.map( (key) => {
        return <div key={key} className='resppnse-line'>
          <b className="response-key">{prettyPrintKeys(key)}:</b>
          {Array.isArray(response[key]) ? <div>{response[key].map((value: any) => <div key={value}>{value}</div>)}</div> : <div>{response[key]}</div>}
        </div>
      })
    }
    catch (e) {
      console.log(e);
      return <div>{t('Could not parse, check raw resonse to see the data')}</div>
    }
  }

  return <><div className='page-wrapper'>
    <div>
      <div className="card-wrapper">
        <form onSubmit={handleSubmit}>
          <FileInput handleChange={handleChange} fileName={file?.name} handleClear={clearForm}/>

          <div>
            <Button text={t("Upload")} variant="primary" disabled={!file || loading}/>
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
         : <div className="empty-preview">{t('Upload a pdf file to see the preview')}</div>
      }
    </div>
    <div>
      {loading ? <div className='response-container-with-raw'><Loading/></div> : 
        <div className='response-container-with-raw'>
        { response && <div className='button-container'><button className='show-raw-button' onClick={() => setViewRaw(!viewRaw)}>{viewRaw ? t("Show formatted") : t("Show raw")}</button></div>}
        {
          response ? viewRaw ? <pre className='response' dangerouslySetInnerHTML={{
            __html: JSON.stringify(response, null, 2),
          }} /> : <div className="response response-container">{renderResponse()}</div> : <div className="empty-preview response-preview">{t('Upload a pdf file to see the extracted data')}</div>
        }
      </div>
      }
    </div>
    </div>
    </>
}
