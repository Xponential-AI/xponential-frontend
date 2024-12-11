import { NavBar } from './components/NavBar';
import { LeftSideBar } from './components/LeftSideBar';
import { ImportFileCard } from './components/ImportFileCard';
import './App.scss'

function App() {
  return (
    <>
      <NavBar />
      <div className="page-with-sidebar">
        <LeftSideBar />
        <div className="page-body">
          <ImportFileCard/>
        </div>
      </div>
    </>
  )
}

export default App
