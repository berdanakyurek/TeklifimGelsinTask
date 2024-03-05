import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "./Auth";
import NoPage from "./NoPage";
import FactViewer from "./FactViewer";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<FactViewer />} />
          <Route path="auth" element={<Auth />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
