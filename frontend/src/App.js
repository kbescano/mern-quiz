import { BrowserRouter as Router, Route} from 'react-router-dom'
import HomeScreen from './pages/HomeScreen'
import LoginScreen from './pages/LoginScreen'
import RegisterScreen from './pages/RegisterScreen'
import Quiz from './pages/Quiz'
import Scores from './pages/Scores'
import './styles/main.css'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import EndScreen from './pages/EndScreen'
import CreateQuiz from './pages/CreateQuiz'

const App = () => {

  toast.configure()

  return (
    <Router>
      <Route path='/' component={HomeScreen} exact/>
      <Route path='/quiz' component={Quiz} exact/>
      <Route path='/scores' component={Scores}/>
      <Route path='/end' component={EndScreen}/>
      <Route path='/login' component={LoginScreen}/>
      <Route path='/register' component={RegisterScreen}/>
      <Route path='/create' component={CreateQuiz}/>
    </Router>
  )
}

export default App;
