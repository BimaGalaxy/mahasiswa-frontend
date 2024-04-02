import {BrowserRouter, Routes, Route} from 'react-router-dom';
import DataMahasiswa from "./pages/dataMahasiswa.js";
import TambahMahasiswa from "./pages/tambahMahasiswa.js";
import EditMahasiswa from "./pages/editMahasiswa.js";

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<DataMahasiswa/>}></Route>
              <Route path="/add" element={<TambahMahasiswa/>}></Route>
              <Route path="/edit/:id" element={<EditMahasiswa/>}></Route>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
