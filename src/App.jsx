import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Chat from "./pages/Chat";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Chat />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
