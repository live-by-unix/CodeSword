import Dashboard from './pages/Dashboard';
import PythonCourse from './pages/PythonCourse';
import JavaCourse from './pages/JavaCourse';
import CCourse from './pages/CCourse';
import Practice from './pages/Practice';
import Games from './pages/Games';
import Achievements from './pages/Achievements';
import __Layout from './Layout.jsx';

export const PAGES = {
    "Dashboard": Dashboard,
    "PythonCourse": PythonCourse,
    "JavaCourse": JavaCourse,
    "CCourse": CCourse,
    "Practice": Practice,
    "Games": Games,
    "Achievements": Achievements,
}

export const pagesConfig = {
    mainPage: "Dashboard",
    Pages: PAGES,
    Layout: __Layout,
};