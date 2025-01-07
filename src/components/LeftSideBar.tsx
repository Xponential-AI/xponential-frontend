import './LeftSideBar.scss'
import homeSVG from '../assets/Home.svg';
import librarySVG from '../assets/Library.svg';
import signOutSVG from '../assets/signout.svg';

import { NavLink, useMatch, useResolvedPath } from 'react-router-dom';

const Link = ({ to, children }: any) => {
   let resolved = useResolvedPath(to);
   let match = useMatch({ path: resolved.pathname, end: true });

   return (
      <NavLink to={to} className={`nav-item ${match ? 'selected' : ''}`} >
        {children}
      </NavLink>
)
}

export const LeftSideBar = () => {
  return <div className="sidebar-container">
    <div className="top">
      <Link to={'/'}><img alt="home" src={homeSVG}/></Link>
      <Link to={'/library'}><img alt="library" src={librarySVG}/></Link>
    </div>
    <div className="bottom">
    <div className="nav-item"><img alt="sign out" src={signOutSVG}/></div>
    </div>
  </div>
}