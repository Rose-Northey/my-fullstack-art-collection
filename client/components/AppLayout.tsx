import {Outlet} from 'react-router-dom'

function AppLayout() {
  return (
    <>
      <header className="header">
        <h1>Rose's Art Collection</h1>
      </header>
      <div className= 'content'>
        <Outlet />  
      </div>
    </>
  )
}

export default AppLayout
