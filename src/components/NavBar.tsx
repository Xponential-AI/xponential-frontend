import './NavBar.scss'

export const NavBar = () => {

  return <div className="navbar-container">
    <div className="left">
      <img alt="Xponential Ai logo" src="/src/assets/logo.svg"/>
    </div>
    <div className="right">
    <div className="nav-item"><img src="/src/assets/search.svg"/></div>
    </div>
  </div>
}