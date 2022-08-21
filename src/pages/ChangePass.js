/* eslint-disable react-hooks/exhaustive-deps */
import {React, useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import '../styles/changePass.css';
import { IoIosArrowBack } from "react-icons/io";
import { IconContext } from "react-icons";
import {auth} from "../firebase-config";
import { updatePassword } from "firebase/auth";


export default function ChangePass() {
  const [oldPass, setoldPass] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState({}); 
  const [isSubmit, setIsSubmit] = useState(false);

  const handleSubmit = (e) => {//function to prevent refresh page when click save
    e.preventDefault();
    const info = {oldPass, password};
    console.log(info);
    setFormError(validate(info));
    setIsSubmit(true);

  var user = auth.currentUser;
  console.log(user);
  var newPassword = password;
  updatePassword(user, newPassword).then(function() {
    // Update successful.
    console.log("your password has been update successfully!");
    console.log(password);
  }).catch(function(error) {
    // An error happened.
    console.log(error.message);
});
  }

  useEffect(() => {
      console.log(formError);
    if(isSubmit && Object.keys(formError).length === 0) {
      console.log(oldPass, password);
    }
  }, [formError])

  const validate = (values) => { //to validate if all the fields are not empty
    const errors = {};
    if (!values.oldPass){
      errors.oldPass = "هذا الحقل مطلوب";
    }
    if (!values.password){
      errors.password = "هذا الحقل مطلوب";
    }
    return errors;
  };
    return (
      <div className="App">
        <div className='create'>
       
            <div className='prevArrow'>
            <IconContext.Provider value={{color: '#333', size: "1.3em"}}>
              <Link to="/Home"><IoIosArrowBack/></Link>  
            </IconContext.Provider>
            </div>
          <IconContext.Provider value={{color: '#333', size: "1.6em"}}>
            <h2>تغيير كلمة المرور</h2>
          <form onSubmit={handleSubmit}>
             <label></label>
             <div className='oldPass'>
             <input
            type="password"
            placeholder='كلمة المرور القديمة'
            value= {oldPass}
            onChange = {(e) => setoldPass(e.target.value)}
            />  
            </div>
            <p>{formError.oldPass}</p>
             <label></label>
             <div className='pass2'>
             <input
            type="password"
            placeholder='كلمة المرور الجديدة' 
            value= {password}
            onChange = {(e) => setPassword(e.target.value)}
            />
            </div>
            <p>{formError.password}</p>
            {isSubmit?  
            <Link  to="/Home"><button type="submit">حفظ</button></Link> 
             : <button type="submit">حفظ</button>
            }
          </form>   
          </IconContext.Provider>   
        </div>
      </div>
    );
  }