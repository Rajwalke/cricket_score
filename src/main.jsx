import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Body from './components/Body.jsx'
import Team1 from './components/Team1.jsx'
import { Provider } from 'react-redux'
import appStore from './utils/store.js'
import Team2 from './components/Team2.jsx'
import Teamnfo from './components/Teaminfo.jsx'
import Teamtoss from './components/Teamtoss.jsx'
import Score from './components/Score.jsx'

const appRoute=createBrowserRouter([
  {
    path:"/",
    element:<Body/>
  },
  {
    path:"/team1",
    element:<Teamnfo/>
  },
  {
    path:"/toss",
    element:<Teamtoss/>
  },
  {
    path:"/score",
    element:<Score/>
  }
])

createRoot(document.getElementById('root')).render(
  <Provider store={appStore}>
      <StrictMode>
        <RouterProvider router={appRoute}/>
      </StrictMode>
  </Provider>
 
)
