/* eslint-disable react-hooks/exhaustive-deps */
import {React, useState} from 'react';
import { Link } from "react-router-dom";
import '../styles/login.css';
// import Logo from '../images/headerLogo.png';
import { IoIosArrowBack } from "react-icons/io";
import { IconContext } from "react-icons";
import { BsFillPersonFill } from "react-icons/bs";
import { IoKeySharp } from "react-icons/io5";
import {onAuthStateChanged, 
  signInWithEmailAndPassword
  } from "firebase/auth";
import {auth} from "../firebase-config";

export default function Login() {
  // const {loading, error, user} = useUserContext();
  const [theEmail, setTheEmail] = useState('');
  const [thePassword, setThePassword] = useState('');
  const [formError, setFormError] = useState({}); 
  // const [isSubmit, setIsSubmit] = useState(false);
  
 
  // const { signIn } = useUserContext();
  const [user, setUser] = useState({});
  

  onAuthStateChanged(auth, (currentUser) => {
  setUser(currentUser);
  })

  const login = async () => {
  try {
  const user = await signInWithEmailAndPassword(auth, theEmail, thePassword);
  console.log(user);
  } catch (error) {
  console.log(error.message);
  }
  };

  const handleSubmit = (e) => {//function to prevent refresh page when click save
    e.preventDefault();
    const info = {theEmail, thePassword};
    setFormError(validate(info));
  };

  

  const validate = (values) => { //to validate if all the fields are not empty
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.theEmail){
      errors.theEmail = "هذا الحقل مطلوب";
    }
    if (!values.thePassword){
      errors.thePassword = "هذا الحقل مطلوب";
    }
    if(!regex.test(values.theEmail) && values.theEmail) {
      errors.theEmail = "هذا ليس تنسيق بريد إلكتروني صحيح";
    }
    return errors;
  };

    return (
      <div className="App">
        <div className='createLogin'>
          {/* <div className= 'Content'>
            <div className='prevArrowLogin'>
            <IconContext.Provider value={{color: '#333', size: "1em"}}>
              <Link to="/Form"><IoIosArrowBack/></Link>  
            </IconContext.Provider>
            </div>
             <img src={Logo} alt="this is the KSU logo" width="190" height="90" />
          </div>  */}
          <div className='prevArrow'>

            <IconContext.Provider value={{color: '#333', size: "1.3em"}}>
              <Link to="/"><IoIosArrowBack/></Link>  
            </IconContext.Provider>
            </div>
          <IconContext.Provider value={{color: '#333', size: "1.5em"}}>
          <form onSubmit={handleSubmit}>
             <label></label>
             <div className='emailLogin'>
             <BsFillPersonFill/> 
             <input
            type="text"
            placeholder='الايميل'
            value= {theEmail}
            onChange = {(e) => setTheEmail(e.target.value)}
            />  
          
            </div>
            <p>{formError.email}</p>
             <label></label>
             <div className='passLogin'>
             <IoKeySharp/>
             <input
            type="password"
            placeholder='كلمة المرور' 
            value= {thePassword}
            onChange = {(e) => setThePassword(e.target.value)}
            />
            
            </div>
            <p>{formError.password}</p>

            <h4>* تستطيع تسجيل الدخول فقط في حال كنت المسؤول عن نظام حجز القاعات لمكتبات جامعة الملك سعود.</h4>
            <h4 style={{color: '#eaeaea'}}>{user?.email}</h4>

            { user ? 
            <Link  to="/Home"><button type="submit" onClick={login}>تسجيل دخول</button></Link> 
            : <button type="submit" onClick={login}>تسجيل دخول</button>
            }

          </form>   
          </IconContext.Provider>   
        </div>
      </div>
    );
  }