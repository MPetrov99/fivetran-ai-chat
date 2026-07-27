import './AppLayout.scss'
import Sidebar from '../components/Sidebar/Sidebar'

function AppLayout () {
  return (
    <div className="app-layout">
      <aside className="app-layout__sidebar">
        <Sidebar />
      </aside>

      <main className="app-layout__main">
        <p>Chat area</p>
      </main>
    </div>
  )
}

export default AppLayout