/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import {React, useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import '../styles/newHall.css';
import { IoIosArrowBack } from "react-icons/io";
import { IconContext } from "react-icons";
import DropdownType from './DropdownType';
import Dropdown from './Dropdown';
import DropdownHalls from './DropdownHalls';
import { doc, updateDoc, getDocs, snapshot, onSnapshot, collection, query, where} from "firebase/firestore";
import { colRefHall, firestore } from '../firebase-config';


export default function EditHall() {
  // eslint-disable-next-line no-unused-vars
  const [hallName, setHallName] = useState("اختاري القاعة المراد تعديلها");
  const [hallImage, setHallImage] = useState('');
  const [formError, setFormError] = useState({}); 
  const [isSubmit, setIsSubmit] = useState(false);
  const [selected, setSelected] = useState("اختاري مكتبة");
  const [selected2, setSelected2] = useState("اختاري نوع القاعة");

  const [selectedUpdate, setSelectedUpdate] = useState("اختاري مكتبة");
  const [selectedUpdate2, setSelectedUpdate2] = useState("اختاري نوع القاعة");
  const [hallNameUpdate, setHallNameUpdate] = useState('');
  const [hallImageUpdate, setHallImageUpdate] = useState('');
  const [allDocs, setAllDocs] = useState([]);
  
  
  const q = query(colRefHall, where("hallLocation", "==", selected));

  const updateHall = async (selectedLib, selectedType, selectedName) => {   
    const querySnapshot = await getDocs(q);
      querySnapshot.forEach((_doc) => {
        const document = _doc.data();
        
        if(document.hallLocation === selectedLib && document.hallType === selectedType && document.hallName === selectedName){  
          console.log(document);
          const hallRef = doc(colRefHall, _doc.id);

          updateDoc(hallRef, {
        hallLocation: selectedUpdate,
        hallName: hallNameUpdate,
        hallType: selectedUpdate2
      })
          .then(() => {
            console.log("successfully updated");
          }).catch(error => {
            console.log(error);
          })
        }
});
  };

  const handleSubmit = async (e) => {//function to prevent refresh page when click save
    e.preventDefault();
    const info = {hallName, hallImage};
    console.log(info);
    setFormError(validate(info));
    setIsSubmit(true);
    updateHall(selected, selected2, hallName);
  };

          useEffect(() => {
            getDocs(colRefHall)
            .then((snapshot) => {
                snapshot.docs.forEach((doc) => {
                  allDocs.push({ ...doc.data(), id: doc.id})
                
          })
        })
        .catch(err => {
        console.log(err.message)
        })
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
          <h2>تعديل قاعة</h2>
          <form onSubmit={handleSubmit}>
          <h3>القاعة المراد تعديلها</h3>
          <div className="lib">
          <label>المكتبة</label>
            <Dropdown selected={selected} setSelected={setSelected} name="locationOfHall"/>
             </div>

             <div className="type">
             <label>القاعة</label>
            <DropdownType selected={selected2} setSelected={setSelected2} />
             </div>
            <p>{formError.selected2}</p>

            <div className="name">
                <label>القاعة</label>
                <DropdownHalls selected={hallName} setSelected={setHallName} selectedLib={selected} name="nameOfHall"></DropdownHalls>
            </div>
            <p>{formError.hallName}</p>
            
             <div className='image'>
             <label>الصورة</label>
             <input type="file" 
             value= {hallImage}
             onChange = {(e) => setHallImage(e.target.value)}
              />
            </div>
            <p>{formError.hallImage}</p>

            <h3>التعديل</h3>
            <div className="lib">
          <label>المكتبة</label>
            <Dropdown selected={selectedUpdate} setSelected={setSelectedUpdate} name="locationOfHall"/>
             </div>

             <div className="type">
             <label>القاعة</label>
            <DropdownType selected={selectedUpdate2} setSelected={setSelectedUpdate2} />
             </div>
            <p>{formError.selected2}</p>

            <div className='name'>
            <label>الاسم</label>
             <input
            type="text"
            placeholder='اسم القاعة' 
            value= {hallNameUpdate}
            onChange = {(e) => setHallNameUpdate(e.target.value)}
            />
            </div>
            <p>{formError.hallName}</p>
            
             <div className='image'>
             <label>الصورة</label>
             <input type="file" 
             value= {hallImageUpdate}
             onChange = {(e) => setHallImageUpdate(e.target.value)}
              />
            </div>
            <p>{formError.hallImage}</p>
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