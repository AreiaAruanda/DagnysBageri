import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Home from './components/Home'; 
import Products from './components/Products'; 
import './App.css'; 

// Main App component
function App() {
  return (
    // Router component to enable routing in the application
    <Router>
      <div className="App">
        {/* Routes component to define the different routes in the application */}
        <Routes>
          {/* Route for the home page, rendering the Home component */}
          <Route exact path="/" element={<Home />} />
          {/* Route for the products page*/}
          <Route path="/products" element={<Products />} />
        </Routes>
      </div>
    </Router>
  );
}

// Export the App component as the default export
export default App;
