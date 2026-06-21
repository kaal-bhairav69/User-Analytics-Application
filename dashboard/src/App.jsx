import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Sessions from "./pages/Sessions";
import Heatmap from "./pages/Heatmap";

function App() {
  return (
    <BrowserRouter>

      <nav style={{ padding: "20px" }}>
        <Link to="/">Sessions</Link>
        {" | "}
        <Link to="/heatmap">Heatmap</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Sessions />} />
        <Route path="/heatmap" element={<Heatmap />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;