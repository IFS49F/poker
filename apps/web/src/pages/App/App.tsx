import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "pages/Landing/Landing";
import Room from "pages/Room/Room";

const App = () => (
  <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/:room" element={<Room />} />
      </Routes>
    </BrowserRouter>
  </div>
);

export default App;
