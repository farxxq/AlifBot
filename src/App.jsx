import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Container from "./pages/Container";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Container/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
