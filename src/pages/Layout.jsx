import { Outlet } from "react-router-dom/dist"
import ScrollToTop from "../components/ScrollToTop"
import StarField from "../components/StarField.jsx";
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"

export const Layout = () => {
    return (
        <ScrollToTop>
            <StarField />
            <Navbar />
                <Outlet />
            <Footer />
        </ScrollToTop>
    )
}