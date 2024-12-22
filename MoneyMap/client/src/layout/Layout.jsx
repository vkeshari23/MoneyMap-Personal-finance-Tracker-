import Footer from "./Footer";
import Nav from "./Nav";

// eslint-disable-next-line react/prop-types
export default function Layout({children}) {
  return (
    <div>
        <Nav/>
        {children}
        <Footer/>
    </div>
  )
}
