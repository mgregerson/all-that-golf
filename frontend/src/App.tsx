import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import ResponsiveAppBar from './components/Navbar';
import AddCourse from './pages/AddCourse';
import Login from './pages/Login';
import GolfCourses from './pages/GolfCourses';
import Register from './pages/Register';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
      <Route path = "/register" element ={<Register />} />
      <Route path="/courses" element={<GolfCourses />} />
      <Route path="/my-rounds" element={<NotFound />} />
      <Route path="/add-course" element={<AddCourse />} />
    </Routes>
  );
}

export function WrappedApp() {
  return (
    <BrowserRouter>
      <ResponsiveAppBar />
      <div className="mt-[80px]">
        <App />
      </div>
    </BrowserRouter>
  );
}
