import './LeftSideBar.scss'

export const LeftSideBar = () => {

  return <div className="sidebar-container">
    <div className="top">
      <div className="nav-item"><img alt="home" src="/src/assets/Home.svg"/></div>
      <div className="nav-item"><img alt="library" src="/src/assets/Library.svg"/></div>
    </div>
    <div className="bottom">
    <div className="nav-item"><img alt="sign out" src="/src/assets/signout.svg"/></div>
    </div>
  </div>
}