import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header";
import Coinpage from "./Pages/Coinpage";
import Homepage from "./Pages/Homepage";
import 'react-alice-carousel/lib/alice-carousel.css';
function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/coins/:id" element={<Coinpage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
