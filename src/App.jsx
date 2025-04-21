
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import SearchBar from './components/SearchBar';
import CenterContent from './components/CenterContent'; 
import Auth from './components/Auth';
import './App.css';


const Mainlayout = ()=>{
  return (
    <div className="appcontainer">
        <div className="header">
            <Navbar />
        </div>

        <div className="searchbar">
          <SearchBar />
        </div>

        <div className="belowcontent">
          
            <div className="centercontent">
              <CenterContent />
            </div>

            <div className="maincategories">
              <Sidebar />
            </div>

        </div>
      </div>
  );
};

function App() {

  return (
    <Router>
        <Routes>
          <Route path='/auth' element={<Auth/>}/>

          <Route path='/*' element={<Mainlayout/>}/>
        </Routes>
        {/* 👇 Analytics component should be inside Router but outside Routes */}
      <Analytics />
    </Router>
  );
}

export default App;
