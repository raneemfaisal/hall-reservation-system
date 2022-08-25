/* eslint-disable react-hooks/exhaustive-deps */
import {React, useState} from 'react';
import { Outlet, Link } from "react-router-dom";
import '../styles/form.css';
// import Footer from './Footer';
// import footerLogo from '../images/footerLogo.png';
import { IoIosArrowBack } from "react-icons/io";
import { IconContext } from "react-icons";
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { colRef } from '../firebase-config';
import { addDoc } from 'firebase/firestore'

export default function Form() {
  const [name, setName] = useState(''); 
  const [ID, setID] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [formError, setFormError] = useState({}); 
  const [isSubmit, setIsSubmit] = useState(false);


  const createUser = async () => {   
      await addDoc(colRef, {
        Name: name,
        ID: ID,
        Email: email,
        PhoneNumber: phone
     }).then(function(res){
       console.log("Data has been successfully added");
     }).catch(function(err){
      console.log("Data can NOT be added");
     })
    };

  const handleSubmit = async (e) => {//function to prevent refresh page when click save
    e.preventDefault();
    const info = {name, ID, email, phone};
    setFormError(validate(info));
    setIsSubmit(true);
    if(isSubmit && Object.keys(formError).length === 0) {
    emailjs.sendForm('service_5sfjgai', 'template_pswm396', e.target, 'c30N4bZw4GzcgadRz')
    .then((response) => {
      console.log('SUCCESS!', response.status, response.text);
      notify();
   }, (err) => {
      console.log('FAILED...', err);
   });

   createUser();
  }
  };

      const notify = () => toast.success("تم تأكيد حجزك بنجاح", {position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined});


  const validate = (values) => { //to validate if all the fields are not empty
    const errors = {};
    const regex = /^[^\s@]+@student+\.ksu+\.edu+\.sa$/i;
    const phoneLength = values.phone.length;
    const IDLength = values.ID.length;
    if (!values.name){
      errors.name = "هذا الحقل مطلوب";
    }
    if (!values.email){
      errors.email = "هذا الحقل مطلوب";
    }
    if (!values.ID){
      errors.ID = "هذا الحقل مطلوب";
    }
    if (!values.phone){
      errors.phone = "هذا الحقل مطلوب";
    }
    if(!regex.test(values.email) && values.email) {
      errors.email = "هذا ليس تنسيق بريد إلكتروني صحيح";
    }
     if (phoneLength !== 10 && values.phone) {
      errors.phone = "رقم الجوال يجب أن يحتوي على 10 أرقام";
    }
    if((IDLength !== 9) && values.ID){
      errors.ID = "الرقم الجامعي يجب أن يكون من 9 أرقام";
    }
    return errors;
  };
    return (
      <div className="App">
        <div className='createForm'>
        <div className='prevArrow'>
            <IconContext.Provider value={{color: '#333', size: "1.3em"}}>
              <Link to="/Reservation"><IoIosArrowBack/></Link>  
            </IconContext.Provider>
            </div>
          <h2>المعلومات الشخصية</h2>
          <form onSubmit={handleSubmit}>
            <label>الاسم كامل</label>
            <input
            type="text"
            name= "fullname"
            placeholder='الاسم كامل'
            value= {name}
            onChange = {(e) => setName(e.target.value)}
            />
              <p>{formError.name}</p>
             <label>الرقم الجامعي</label>
            <input
            type="text"
            placeholder='الرقم الجامعي'
            value= {ID}
            onChange = {(e) => setID(e.target.value.replace(/\D/g, ''))}
            />
            <p>{formError.ID}</p>
             <label>الايميل الجامعي</label>
            <input
            type="text"
            name = "userEmail"
            placeholder='الايميل الجامعي'
            value= {email}
            onChange = {(e) => setEmail(e.target.value)}
            />
            <p>{formError.email}</p>
             <label>رقم الجوال</label>
            <input
            type="text"
            placeholder='رقم الجوال' 
            value= {phone}
            onChange = {(e) => setPhone(e.target.value.replace(/\D/g, ''))}
            />
            <p>{formError.phone}</p>
            <ToastContainer
                    position="top-center"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    />
            <button>حفظ</button>
            
          </form>      
        </div>
        <Outlet />
        {/* <div className='footer'>
          <img src={footerLogo} alt="this is the KSU logo" />
        </div> */}
      </div>
    );
  }
