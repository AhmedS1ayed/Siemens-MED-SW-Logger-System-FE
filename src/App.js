import Navbar from "./Components/Navbar/Navbar.js";
// import pages
import Testsuit from "./Pages/Testsuit/Testsuit";
import Testcase from "./Pages/Testcase/Testcase";

//import components
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ValidationTag from "./Pages/ValidationTag/ValidationTag";
import Welcome from "./Pages/Welcome/Welcome";
import ThemeButton from "./Components/Theme/ThemeButton";

function App() {
  return (
    <>
      <Navbar />
      <ThemeButton  />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/testsuits" element={<Testsuit />} />
          <Route path="/testcases" element={<Testcase />} />
          <Route path="/validtags" element={<ValidationTag />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
