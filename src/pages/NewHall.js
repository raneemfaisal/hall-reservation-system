/* eslint-disable react-hooks/exhaustive-deps */
import {React, useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import '../styles/newHall.css';
import { IoIosArrowBack } from "react-icons/io";
import { IconContext } from "react-icons";
import Dropdown from './Dropdown';
import DropdownType from './DropdownType';
import { storage } from '../firebase-config';
import { ref,
  uploadBytes,

} from 'firebase/storage';
import {v4} from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { colRefHall } from '../firebase-config';
import { addDoc } from 'firebase/firestore'

export default function NewHall() {
  // eslint-disable-next-line no-unused-vars
  const [hallName, setHallName] = useState('');
  const [hallImage, setHallImage] = useState(null);
  const [formError, setFormError] = useState({}); 
  const [isSubmit, setIsSubmit] = useState(false);
  const [selected, setSelected] = useState("اختاري مكتبة");
  const [selected2, setSelected2] = useState("اختاري نوع القاعة");
  
      const notify = () => toast.success("تم إضافة قاعة جديدة بنجاح", {position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined});

  const uploadImage = () => {
    if (hallImage == null) return;

      if(selected === 'المكتبة المركزية للطالبات'){
        if(selected2 === 'فردية'){
        const imageRef = ref(storage, `TheCentralLibrary/Single/${hallImage.name + v4()}`);
        uploadBytes(imageRef, hallImage).then(() => {
          notify();
        });
      }
      if(selected2 === 'مشتركة'){
        const imageRef = ref(storage, `TheCentralLibrary/Other/${hallImage.name + v4()}`);
        uploadBytes(imageRef, hallImage).then(() => {
          notify();
        });
      }
      }

      if(selected === "مكتبة كلية الطب"){
        const imageRef = ref(storage, `SchoolOfMedicine/${hallImage.name + v4()}`);
        uploadBytes(imageRef, hallImage).then(() => {
          notify();
        });
      }

       if(selected === "مكتبة كلية التمريض"){
        if(selected2 === 'فردية'){
          const imageRef = ref(storage, `NursingCollegeLibrary/Single/${hallImage.name + v4()}`);
          uploadBytes(imageRef, hallImage).then(() => {
            notify();
          });
        }
        if(selected2 === 'مشتركة'){
          const imageRef = ref(storage, `NursingCollegeLibrary/Other/${hallImage.name + v4()}`);
          uploadBytes(imageRef, hallImage).then(() => {
            notify();
          });
        }
      }

      if(selected === "مكتبة كلية الدراسات التطبيقية وخدمة المجتمع"){
        if(selected2 === 'فردية'){
          const imageRef = ref(storage, `LibraryOfTheCollegeAppliedStudies/Single/${hallImage.name + v4()}`);
          uploadBytes(imageRef, hallImage).then(() => {
            notify();
          });
        }
        if(selected2 === 'مشتركة'){
          const imageRef = ref(storage, `LibraryOfTheCollegeAppliedStudies/Other/${hallImage.name + v4()}`);
          uploadBytes(imageRef, hallImage).then(() => {
            notify();
          });
        }
      }

      if(selected === "مكتبة كلية العلوم الطبية التطبيقية"){
        if(selected2 === 'فردية'){
          const imageRef = ref(storage, `LibraryOfTheCollegeOfAppliedMedicalSciences/Single/${hallImage.name + v4()}`);
          uploadBytes(imageRef, hallImage).then(() => {
            notify();
          });
        }
        if(selected2 === 'مشتركة'){
          const imageRef = ref(storage, `LibraryOfTheCollegeOfAppliedMedicalSciences/Other/${hallImage.name + v4()}`);
          uploadBytes(imageRef, hallImage).then(() => {
            notify();
          });
        }
      }

      if(selected === "مكتبة كلية طب الأسنان"){
        if(selected2 === 'فردية'){
          const imageRef = ref(storage, `LibraryOfTheCollegeOfDentistry/Single/${hallImage.name + v4()}`);
          uploadBytes(imageRef, hallImage).then(() => {
            notify();
          });
        }
        if(selected2 === 'مشتركة'){
          const imageRef = ref(storage, `LibraryOfTheCollegeOfDentistry/Other/${hallImage.name + v4()}`);
          uploadBytes(imageRef, hallImage).then(() => {
            notify();
          });
        }
      }

      if(selected === "مكتبة العيادات الخارجية مستشفى الملك خالد"){
        if(selected2 === 'فردية'){
          const imageRef = ref(storage, `KingKhalidUniversityHospitalLibrary/Single/${hallImage.name + v4()}`);
          uploadBytes(imageRef, hallImage).then(() => {
            notify();
          });
        }
        if(selected2 === 'مشتركة'){
          const imageRef = ref(storage, `KingKhalidUniversityHospitalLibrary/Other/${hallImage.name + v4()}`);
          uploadBytes(imageRef, hallImage).then(() => {
            notify();
          });
        }
      }

      if(selected === "مكتبة كلية التربية"){
        if(selected2 === 'فردية'){
          const imageRef = ref(storage, `FACULTYOFEDUCATIONLibrary/Single/${hallImage.name + v4()}`);
          uploadBytes(imageRef, hallImage).then(() => {
            notify();
          });
        }
        if(selected2 === 'مشتركة'){
          const imageRef = ref(storage, `FACULTYOFEDUCATIONLibrary/Other/${hallImage.name + v4()}`);
          uploadBytes(imageRef, hallImage).then(() => {
            notify();
          });
        }
      }
  };

  
  const createUser = async () => {   
    await addDoc(colRefHall, {
      hallLocation: selected,
      hallName: hallName,
      hallType: selected2
   }).then(function(res){
     console.log("Data has been successfully added");
   }).catch(function(err){
    console.log("Data can NOT be added");
   })
  };

  const handleSubmit = (e) => {//function to prevent refresh page when click save
    e.preventDefault();
    const info = {hallName, hallImage, selected, selected2};
    setFormError(validate(info));
    setIsSubmit(true);
    createUser();
  };

  useEffect(() => {
      console.log(formError);
    if(isSubmit && Object.keys(formError).length === 0) {
      console.log(hallName, hallImage);
    }
  }, [formError])

  const validate = (values) => { //to validate if all the fields are not empty
    const errors = {};
    if (!values.hallName){
      errors.hallName = "هذا الحقل مطلوب";
    }
    if (!values.hallImage){
      errors.hallImage = "هذا الحقل مطلوب";
    }
    if (!values.selected){
        errors.selected = "هذا الحقل مطلوب";
      }
      if (!values.selected2){
        errors.selected2 = "هذا الحقل مطلوب";
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
          <IconContext.Provider value={{color: '#333', size: "0.5em"}}>
            <h2>إضافة قاعة جديدة</h2>
          <form className='add' onSubmit={handleSubmit}>
          <div className="lib">
          <label>المكتبة</label>
            <Dropdown selected={selected} setSelected={setSelected} name="locationOfHall"/>
             </div>
             <p>{formError.selected}</p>

             <div className="type">
             <label>القاعة</label>
            <DropdownType selected={selected2} setSelected={setSelected2} name="typeOfHall" />
             </div>
            <p>{formError.selected2}</p>

            <div className='name'>
            <label>الاسم</label>
             <input
            type="text"
            placeholder='اسم القاعة' 
            name= "hallName"
            value= {hallName}
            onChange = {(e) => setHallName(e.target.value)}
            />
            </div>
            <p>{formError.hallName}</p>
            
             <div className='image'>
             <label>الصورة</label>
             <input type="file" 
             onChange = {(e) => {setHallImage(e.target.files[0]);}}
              />
            </div>
            <p>{formError.hallImage}</p>
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

            {isSubmit?  
            <Link  to="/Home"><button type="submit" onClick={uploadImage}>حفظ</button></Link> 
             : <button type="submit" onClick={uploadImage}>حفظ</button>
            }
          </form>   
          </IconContext.Provider>   
        </div>
      </div>
    );
  }