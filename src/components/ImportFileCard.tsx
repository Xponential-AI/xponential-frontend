import { useState } from 'react'
import { Button } from '../components/Button';
import { FileInput } from '../components/inputs/FileInput';
import { useTranslation } from "react-i18next";

import axios from 'axios';

import "./ImportFileCard.scss";

export const ImportFileCard = () => {
  const { t } = useTranslation();
  const [file, setFile] = useState<File>();
  // const [uploadedFile, setUploadedFile] = useState();
  // const [error, setError] = useState();
  
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    if(event.target.files) {
      setFile(event.target.files[0]);
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

  const clearForm = () => setFile(undefined)

  return <div className="card-wrapper">
      <form onSubmit={handleSubmit}>
        <FileInput handleChange={handleChange} fileName={file?.name} handleClear={clearForm}/>

        <div>
          <Button text={t("Upload")} variant="primary" disabled={!file}/>
          <Button marginTop={10} text={"Clear"} variant="secondary" onClick={clearForm}/>
        </div>
      </form>
    </div>
}
