import { useState, useEffect } from 'react';
import { P, Span } from '../../components/typography/index';
import Pencil from '../../assets/edit.svg?react';
import CheckMark from '../../assets/check.svg?react';

const EditableField = ({setEdit, setDocument, currentDocument, edit, fieldName, tag, style}: any) => {
  const Tag = tag ? tag : Span

  return <div className='flex justify-between'>
  <div className="data-text" onClick={()=> setEdit(fieldName)}>
  {edit === fieldName ? <input autoFocus value={currentDocument[fieldName]} onChange={e => {
    setDocument({...currentDocument, [fieldName]: e.target.value})
  }}/> : <Tag style={style}>{currentDocument[fieldName]}</Tag>}
  </div>
  {edit === fieldName ? <button className="edit-field checkmark" onClick={()=> setEdit('')}><CheckMark/></button> : <button className="edit-field" onClick={()=> setEdit(fieldName)}><Pencil/></button>}
  </div>
}

const formatPercentage = (percentage: number) => {
  return `${percentage * 100}%`
}

export const DocumentData = ({document, onDocumentSubmit, showConfidence, showFields}: any) => {
  const [edit, setEdit] = useState<string>('');
  const [currentDocument, setDocument] = useState({});

  useEffect(() => {
    setDocument(document);
  }, [document]);

  const submitDocument = () => {
    console.log("Submitting document with changes")
    console.log(currentDocument);
    onDocumentSubmit(currentDocument)
  }

  return <div className='data'>
    {showFields?.length > 0 ? 
      showFields.map((field: any) => <EditableField key={field} setEdit={setEdit} setDocument={setDocument} currentDocument={currentDocument} edit={edit} fieldName={field}/>)
    :
      <>
        {showConfidence && <div className="confidance">{formatPercentage(document.confidance)}</div>}
        <EditableField setEdit={setEdit} setDocument={setDocument} currentDocument={currentDocument} edit={edit} fieldName={'name'} tag={P}/>
        <EditableField setEdit={setEdit} setDocument={setDocument} currentDocument={currentDocument} edit={edit} fieldName={'type'} style={{fontWeight: 'bold', fontSize: '1rem'}}/>
        <EditableField setEdit={setEdit} setDocument={setDocument} currentDocument={currentDocument} edit={edit} fieldName={'date'}/>
        <EditableField setEdit={setEdit} setDocument={setDocument} currentDocument={currentDocument} edit={edit} fieldName={'vendor'}/>
        <EditableField setEdit={setEdit} setDocument={setDocument} currentDocument={currentDocument} edit={edit} fieldName={'address'}/>
        <EditableField setEdit={setEdit} setDocument={setDocument} currentDocument={currentDocument} edit={edit} fieldName={'landmark'}/>
        <EditableField setEdit={setEdit} setDocument={setDocument} currentDocument={currentDocument} edit={edit} fieldName={'tenant'}/>
        <EditableField setEdit={setEdit} setDocument={setDocument} currentDocument={currentDocument} edit={edit} fieldName={'department'}/>
        {onDocumentSubmit && <button onClick={() => submitDocument()} className="approve"><CheckMark/></button>}
      </>
    }
  </div>
}