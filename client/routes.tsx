import { Route, createRoutesFromElements} from 'react-router-dom'
import AppLayout from './components/AppLayout'
import App from './components/App'
import Detail from './components/Detail'

export const routes = createRoutesFromElements(
  <Route path ='/' element = {<AppLayout />}>
    <Route index element = {<App />}/>
    <Route path="/:id" element = {<Detail />}/>
  </Route>
)