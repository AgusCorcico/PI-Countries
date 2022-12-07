import './App.css';
import {
  BrowserRouter,
  Routes,
  Route 
} from 'react-router-dom';
import Home from './components/home/Home';
import LandingPage from './components/landingpage/LandingPage';
import CreateActivity from './components/createactivity/CreateActivity';
import Details from './components/details/Details';
import About from './components/about/About';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<LandingPage/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/activity" element={<CreateActivity/>}/>
          <Route path="/home/:id" element={<Details/>}/>
          <Route path="/about" element={<About/>}/>
        </Routes>
      </div>
    </BrowserRouter>

  );
}

export default App;
