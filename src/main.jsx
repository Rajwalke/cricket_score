import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Body from './components/Body.jsx'
import { Provider } from 'react-redux'
import appStore from './utils/store.js'
import Teamnfo from './components/Teaminfo.jsx'
import Teamtoss from './components/Teamtoss.jsx'

import Inning1 from "./components/Inning1.jsx"
import Inning2 from './components/Inning2.jsx'
import Matchsummery from './components/MatchSummery.jsx'
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
    path:"/inning1",
    element:<Inning1/>
  },
  {
    path:"/inning2",
    element:<Inning2/>
  },
  {
    path:"/matchsummery",
    element:<Matchsummery/>
  }
])

createRoot(document.getElementById('root')).render(
  <Provider store={appStore}>
      <StrictMode>
        <RouterProvider router={appRoute}/>
      </StrictMode>
  </Provider>
 
)
