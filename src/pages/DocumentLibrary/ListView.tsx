import { useState } from 'react';
import { Button } from '../../components/Button';
import { DocumentData } from './DocumentData';
import { useTranslation } from "react-i18next";
import { PDFPreview } from './PDFPreview';
import { P, Span } from '../../components/typography';
import Document from '../../assets/document.svg?react';
import Calendar from '../../assets/calendar.svg?react';
import { formatPercentage } from '../../utils';

import './ListView.scss';


export const ListView = ({documents, onDocumentSubmit, onLoadMore}: any) => {
  const [selectedDocument, setSelectedDocument] = useState({} as any);
  const { t } = useTranslation();

  const submitDocument = () => {
    onDocumentSubmit(selectedDocument); 
    const selectedIndex = documents.findIndex( (document: any) => document.id === selectedDocument.id)
    setSelectedDocument(documents[selectedIndex+1] || {})
  }
  return <div className='list-view'>
    <div>
    <div className="list-preview">
      {selectedDocument?.id && <div className={'label-container'}><Span customClass="font-bold">{t('Property')}:</Span><DocumentData showFields={['address']} showConfidence={false} document={selectedDocument}/></div>}
      <PDFPreview file={selectedDocument.fileUrl}/>
      {selectedDocument?.id && <>
        {selectedDocument?.id && <div className={'label-container'}><Span customClass="font-bold">{t('Location')}:</Span><DocumentData showFields={['landmark']} showConfidence={false} document={selectedDocument}/></div>}
        {selectedDocument?.id && <div className={'label-container'}><Span customClass="font-bold">{t('Prop Manager')}:</Span><DocumentData showFields={['tenant']} showConfidence={false} document={selectedDocument}/></div>}
        {selectedDocument?.id && <div className={'label-container'}><Span customClass="font-bold">{t('Email')}:</Span><DocumentData showFields={['department']} showConfidence={false} document={selectedDocument}/></div>}
      </>}
    </div>
    {selectedDocument?.id && <div className={'list-preview-buttons'}>
      <Button variant={'primary'} text={`${selectedDocument.confidance * 100}%`} onClick={submitDocument}/>
    </div>}
    </div>

    <div className='document-list'>
    {documents.map((document: any) => <button className="document-row" onClick={() => setSelectedDocument(document)} key={document.id}>
      <div className={`data-row ${document.id === selectedDocument.id ? 'selected' : ''}`}>
        <span className="name-column"><Document/><P size="small">{document.name}</P></span>
        <Span>{document.type}</Span>
        <span className="date-column"><Calendar/><Span>{document.date}</Span></span>
        <Span>{document.vendor}</Span>
        <Span>{formatPercentage(document.confidance)}</Span>
      </div>
    </button>)
    }
    <Button onClick={() => onLoadMore()} fullwidth variant='secondary' text={t('Load more')}/>
    </div>
  </div>
}