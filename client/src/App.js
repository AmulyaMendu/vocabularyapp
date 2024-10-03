import logo from './logo.svg';
import './App.css';
import Dictionary from './Dictionary';
import Header from './components/Header';
import DetailsPage from './components/DetailsPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SearchProvider } from './context/search';


function App() {
  return (
    <div>
      <SearchProvider>
        <Router>

          <Routes>
            <Route path='/' element={<Header />} />
            <Route path='/details/:id' element={<DetailsPage />} />
          </Routes>
        </Router>
      </SearchProvider>

      {/* <Header /> */}
      {/* <Dictionary /> */}
    </div>
  );
}

export default App;
