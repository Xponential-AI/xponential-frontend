import './NavBar.scss'
import searchSVG from '../assets/search.svg';
import appLogoSVG from '../assets/logo.svg';

export const NavBar = () => {

  return <div className="navbar-container">
    <div className="left">
      <img alt="Xponential Ai logo" src={appLogoSVG}/>
    </div>
    <div className="right">
    <div className="nav-item"><img alt="search" src={searchSVG}/></div>
    </div>
  </div>
}