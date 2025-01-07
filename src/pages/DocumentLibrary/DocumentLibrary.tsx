import { useState } from 'react';
import { H3 } from '../../components/typography/index';
import { GridView } from './GridView';
import { ListView } from './ListView';
import ListSVG from '../../assets/list.svg?react';
import GridSVG from '../../assets/grid.svg?react';
import { clsx } from 'clsx';
import { useTranslation } from "react-i18next";

import './DocumentLibrary.scss'

const VIEW_OPTIONS = {
  LIST: 'list',
  GRID: 'grid'
}

const mockDocuments = [
  {
    id: 1,
    fileUrl: 'https://pdfobject.com/pdf/sample.pdf',
    confidance: 0.91,
    name: 'ACME balance due 2.10.pdf',
    type: 'Invoice_CTI',
    vendor: 'Life Foods',
    date: '1/25/2025',
    address: '128 Main St, Nashvile, TN',
    landmark: 'River Oaks Crossing',
    tenant: 'Aspen Properties',
    department: 'AP, Accounting, Insurance'
  },
  {
    id: 2,
    fileUrl: 'https://s28.q4cdn.com/392171258/files/doc_downloads/test.pdf',
    confidance: 0.93,
    name: 'Propipe Bill 12.20.24.pdf',
    type: 'Invoice_Service',
    vendor: 'Auto Zone',
    date: '01/30/2025',
    address: '126 Industry Rd, Smallville, TX',
    landmark: 'Hemlock Hill Stripmall',
    tenant: 'Principle Properties',
    department: 'AP, Accounting, Facilities'
  },
  {
    id: 3,
    fileUrl: 'https://ontheline.trincoll.edu/images/bookdown/sample-local-pdf.pdf',
    confidance: 0.81,
    name: 'Jan’s Lease Agreement.pdf',
    type: 'Lease',
    vendor: 'Jans’ Restaurants',
    date: '01/25/2025',
    address: '2434 Tribek Ct, Burlington, NC',
    landmark: 'River Oaks Crossing',
    tenant: 'Newt Corner Partners',
    department: 'Legal',
  },
  {
    id: 4,
    fileUrl: 'https://res.americancentury.com/pdf_sample.pdf',
    confidance: 0.87,
    name: 'Dec Invoice.pdf',
    type: 'Invoice_HVAC',
    vendor: 'Summer Ice',
    date: '01/05/2025',
    address: '123 Elm Ave, Atlanta, GA 30302',
    landmark: 'Great Mall',
    tenant: 'Peach Tree Properties',
    department: 'AP, Accounting, Energy'
  },
]

export const DocumentLibrary = () => {
  const [ view, setView ] = useState(VIEW_OPTIONS.LIST)
  const [documents, setDocuments] = useState(mockDocuments);
  const [ searchText, setSearchText ] = useState('');
  const { t } = useTranslation();

  const onDocumentSubmit = (submittedDocument: any) => {
    const newDocuments = documents.filter(doc => doc.id !== submittedDocument.id)
    setDocuments(newDocuments);
  }

  const onLoadMore = () => {
    setDocuments([...documents, 
      {...mockDocuments[0], id: Math.random()},
      {...mockDocuments[1], id: Math.random()},
      {...mockDocuments[2], id: Math.random()},
      {...mockDocuments[3], id: Math.random()},
    ])
  }

  const filterDocuments = () => {
    return documents.filter(({name, address, department, tenant, date, landmark, vendor}) => name.toLowerCase().includes(searchText) || address.toLowerCase().includes(searchText) || tenant.toLowerCase().includes(searchText) || department.toLowerCase().includes(searchText) || date.toLowerCase().includes(searchText) || vendor.toLowerCase().includes(searchText) || landmark.toLowerCase().includes(searchText))
  } 

  return <div className="document-library">
    <div className="document-library-header justify-between">
      <H3>Doc Library</H3>
      
      <div className='flex flex-row items-center gap-5'>
        <div className='flex flex-row'>
          <button className={clsx({active: VIEW_OPTIONS.LIST === view}, 'view-button', 'list-button')} onClick={()=>setView(VIEW_OPTIONS.LIST)}><ListSVG/></button>
          <button className={clsx({active: VIEW_OPTIONS.GRID === view}, 'view-button', 'grid-button')} onClick={()=>setView(VIEW_OPTIONS.GRID)}><GridSVG/></button>
        </div>
        <div>
          <input className='document-search' value={searchText} onChange={e => setSearchText(e.target.value)} type="text" placeholder={t('Search documents')}/>
        </div>
      </div>
    </div>
    { view === VIEW_OPTIONS.GRID && <GridView onDocumentSubmit={onDocumentSubmit} documents={filterDocuments()} onLoadMore={onLoadMore}/> }
    { view === VIEW_OPTIONS.LIST && <ListView onDocumentSubmit={onDocumentSubmit} documents={filterDocuments()} onLoadMore={onLoadMore}/> }
  </div>
}