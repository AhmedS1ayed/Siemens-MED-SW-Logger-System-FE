import Navbar from "./Components/Navbar/Navbar.js";
// import pages
import Testsuit from "./Pages/Testsuit/Testsuit";
import Testcase from "./Pages/Testcase/Testcase";

//import components
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ValidationTag from "./Pages/ValidationTag/ValidationTag";
import Welcome from "./Pages/Welcome/Welcome";
import DatabaseContext from "./Contexts/DatabaseContext.js";
import { useState } from "react";

function App() {
  const [connect, setConnect] = useState();
  return (
    <DatabaseContext.Provider value={[connect,setConnect]}>
      <Navbar />
      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/testsuits" element={<Testsuit />} />
          <Route path="/testcases" element={<Testcase />} />
          <Route path="/validtags" element={<ValidationTag />} />
        </Routes>
      </BrowserRouter>
    </DatabaseContext.Provider>
  );
}

export default App;
