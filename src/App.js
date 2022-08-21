import { Outlet, Link } from "react-router-dom";
import './App.css';
import { IconContext } from "react-icons";
import { RiAccountCircleFill } from "react-icons/ri";


export default function App() {
  const title = 'عمادة شؤون المكتبات ترحب بكن';
  return (
    <div className="App">
       <IconContext.Provider value={{color: '#525353', size: "1.3em"}}>
        <Link to="/Login"><header>تسجيل الدخول <RiAccountCircleFill/></header></Link>
        </IconContext.Provider>
      <div className= 'Content'>
      <h1> {title}</h1>
      <div className='createMain'>
          <Link to="/Reservation"><h2>احجز قاعتك الآن</h2></Link> 
        </div>
      <Outlet />
      {/* <Footer/> */}
      </div>
    </div>
  );
}
