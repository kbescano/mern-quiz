import { BrowserRouter as Router, Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import HomeScreen from './pages/HomeScreen'
import Quiz from './pages/Quiz'
import Scores from './pages/Scores'
import './styles/main.css'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import EndScreen from './pages/EndScreen'

const App = () => {

  toast.configure()

  return (
    <Router>
      <Navbar/>
      <Route path='/' component={HomeScreen} exact/>
      <Route path='/quiz' component={Quiz} exact/>
      <Route path='/scores' component={Scores}/>
      <Route path='/end' component={EndScreen}/>
    </Router>
  )
}

export default App;
