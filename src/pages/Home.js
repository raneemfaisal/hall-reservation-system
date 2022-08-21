/* eslint-disable react-hooks/exhaustive-deps */
import {React} from 'react';
import { Link } from "react-router-dom";
import '../styles/homeStyle.css';
// import Logo from '../images/headerLogo.png';
import { IconContext } from "react-icons";
//import for create account
import { useState } from "react";
import {onAuthStateChanged, 
signOut
} from "firebase/auth";
import {auth} from "../firebase-config";

// import { ToastContainer, toast } from 'react-toastify';
//   import 'react-toastify/dist/ReactToastify.css';
// import { BsFillPersonFill } from "react-icons/bs";
// import { IoKeySharp } from "react-icons/io5";

export default function Home() {

  
// eslint-disable-next-line no-unused-vars
const [user, setUser] = useState({});

onAuthStateChanged(auth, (currentUser) => {
setUser(currentUser);
})

const logout = async () => {
  await signOut(auth);
  };
  

  // const notify = () => toast.success("تم تسجيل الخروج بنجاح", {position: "top-center",
  // autoClose: 1000,
  // hideProgressBar: false,
  // closeOnClick: true,
  // pauseOnHover: true,
  // draggable: true,
  // progress: undefined});

    return (
      <div className="App">
        <div className='createHome'>
          {/* <div className= 'Content'>
            <img src={Logo} alt="this is the KSU logo" width="190" height="90" />
          </div> */}
          <IconContext.Provider value={{color: '#333', size: "1.3em"}}>

            <div className="read-more-btn-box1">
            <h2>مرحبًا بك</h2>
                  <Link  to="/ChangePass">
                  <h3>تغيير كلمة المرور</h3>
                  </Link>
                </div>
                <div className="read-more-btn-box1">
                  <Link  to="/NewHall">
                  <h3>إضافة قاعة جديدة</h3>
                  </Link>
                </div>
                <div className="read-more-btn-box1">
                  <Link  to="/EditHall">
                  <h3>تعديل قاعة </h3>
                  </Link>
                </div>
                <div className="read-more-btn-box1">
                  <Link  to="/DeleteHall">
                  <h3>حذف قاعة</h3>
                  </Link>
                </div>
                <div className="read-more-btn-box1">
                  <Link  to="/CancelReservation">
                  <h3>حذف موعد حجز</h3>
                  </Link>
                </div>
                <div className="read-more-btn-box1" onClick={logout}>
                  <Link  to="/Login">
                  <h3>تسجيل خروج</h3>
                  {/* <ToastContainer
                    position="top-center"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    /> */}
                  {/* <h3 onClick={notify}>تسجيل خروج</h3>
                  <ToastContainer /> */}
                  </Link>
                </div>

          </IconContext.Provider>   
        </div>
      </div>
    );
  }