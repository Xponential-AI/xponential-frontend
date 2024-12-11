import './LeftSideBar.scss'
import homeSVG from '../assets/Home.svg';
import librarySVG from '../assets/Library.svg';
import signOutSVG from '../assets/signout.svg';

export const LeftSideBar = () => {

  return <div className="sidebar-container">
    <div className="top">
      <div className="nav-item"><img alt="home" src={homeSVG}/></div>
      <div className="nav-item selected"><img alt="library" src={librarySVG}/></div>
    </div>
    <div className="bottom">
    <div className="nav-item"><img alt="sign out" src={signOutSVG}/></div>
    </div>
  </div>
}