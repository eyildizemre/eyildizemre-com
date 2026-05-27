import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout"
import Home from "./pages/Home";
import Works from "./pages/Works";
import WorkDetail from "./pages/WorkDetail";
import Code from "./pages/Code";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

export default function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/works" element={<Works />} />
                <Route path="/works/:slug" element={<WorkDetail />} />
                <Route path="/code" element={<Code />} />
                <Route path="/about" element={<About />} />
            </Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}
