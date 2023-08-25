import {BrowserRouter , Routes , Route } from "react-router-dom"
import Home from "./pages/Home"
import ChatPage from "./pages/ChatPage"
import "./App.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/chat-page" element={<ChatPage />}/>
    </Routes>
    <ToastContainer />
    </BrowserRouter>
  )
}

export default App
