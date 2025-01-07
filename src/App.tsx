import { NavBar } from './components/NavBar';
import { LeftSideBar } from './components/LeftSideBar';
import { ImportFileCard } from './pages/ImportFileCard';
import { DocumentLibrary } from './pages/DocumentLibrary/DocumentLibrary';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import './App.scss'

function App() {
  return (
    <Router>
      <NavBar />
      <div className="page-with-sidebar">
        <LeftSideBar />
        <div className="page-body">
        <Routes>
          <Route path="/" element={<ImportFileCard/>} />
          <Route path="/library" element={<DocumentLibrary/>} />
        </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
