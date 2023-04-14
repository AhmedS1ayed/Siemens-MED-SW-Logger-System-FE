import "./App.css";
import Navbar from "./Components/Navbar/Navbar.js";

// import pages
import Testsuit from "./Pages/Testsuit/Testsuit";
import Testcase from "./Pages/Testcase/Testcase";

//import components
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/testsuits" element={<Testsuit />} />
          <Route path="/testcases" element={<Testcase />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
