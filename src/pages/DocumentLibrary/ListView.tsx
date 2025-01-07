import { useState } from 'react';
import { Button } from '../../components/Button';
import { DocumentData } from './DocumentData';
import { useTranslation } from "react-i18next";
import { PDFPreview } from './PDFPreview';

import './ListView.scss';


export const ListView = ({documents, onDocumentSubmit, onLoadMore}: any) => {
  const [selectedDocument, setSelectedDocument] = useState({} as any);
  const { t } = useTranslation();

  const submitDocument = () => {
    onDocumentSubmit(selectedDocument); 
    const selectedIndex = documents.findIndex( (document: any) => document.id === selectedDocument.id)
    setSelectedDocument(documents[selectedIndex+1] || {})
  }

  return <div className='listview-container'>
    <div className="list-preview">
      <PDFPreview file={selectedDocument.fileUrl}/>
      <>
        {selectedDocument?.id && <DocumentData showFields={['address', 'landmark', 'tenant', 'department']} showConfidence={false} document={selectedDocument}/>}
        {selectedDocument?.id && <div className={'list-preview-buttons'}>
          <Button variant={'primary'} text={`${selectedDocument.confidance * 100}%`} onClick={submitDocument}/>
        </div>}
      </>
    </div>

    <div className='document-list'>
    {documents.map((document: any) => <div className="document-row" key={document.id}>
      <div className={`data-row ${document.id === selectedDocument.id ? 'selected' : ''}`} onClick={() => setSelectedDocument(document)}>
        <div>{document.name}</div>
        <div>{document.type}</div>
        <div>{document.date}</div>
        <div>{document.vendor}</div>
        <div>{document.confidance}</div>
      </div>
    </div>)
    }
    <Button onClick={() => onLoadMore()} fullwidth variant='secondary' text={t('Load more')}/>
    </div>
  </div>
}