import { useState } from 'react';
import { Button } from '../../components/Button';
import { DocumentData } from './DocumentData';
import { useTranslation } from "react-i18next";
import { PDFPreview } from './PDFPreview';

import './ListView.scss';


export const ListView = ({documents, onDocumentSubmit, onLoadMore}: any) => {
  const [selectedDocument, setSelectedDocument] = useState({} as any);
  const { t } = useTranslation();

  return <div className='listview-container'>
    <div className="list-preview">
      <PDFPreview file={selectedDocument.fileUrl}/>
      <>
        {selectedDocument?.id && <DocumentData showConfidence={false} document={selectedDocument}/>}
        {selectedDocument?.id && <div className={'list-preview-buttons'}>
          <Button variant={'primary'} text={`${selectedDocument.confidance * 100}%`} onClick={() => {onDocumentSubmit(selectedDocument); setSelectedDocument({})}}/>
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
        <div>{document.address}</div>
        <div>{document.landmark}</div>
        <div>{document.tenant}</div>
        <div>{document.department}</div>
      </div>
    </div>)
    }
    <Button onClick={() => onLoadMore()} fullwidth variant='secondary' text={t('Load more')}/>
    </div>
  </div>
}