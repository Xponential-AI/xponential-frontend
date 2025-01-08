import './GridView.scss';
import { Button } from '../../components/Button';
import { useTranslation } from "react-i18next";
import { DocumentData } from './DocumentData';
import { PDFPreview } from './PDFPreview';


export const GridView = ({documents, onDocumentSubmit, onLoadMore}: any) => {
  const { t } = useTranslation();

  return <div className="grid-view"><div className="documents-list">
  {documents.map((document: any) => <div className="document-container" key={document.id}>
    <div className="grid-preview">
      <PDFPreview file={document.fileUrl} />
    </div>
    <DocumentData showConfidence document={document} onDocumentSubmit={onDocumentSubmit}/>
  </div>)}
  </div>
  <div className="load-more-button-container">
    <Button onClick={() => onLoadMore()} width={600} variant='secondary' text={t('Load more')}/>
  </div>
  </div>
}