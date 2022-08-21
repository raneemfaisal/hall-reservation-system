/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import {React, useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import '../styles/newHall.css';
import { IoIosArrowBack } from "react-icons/io";
import { IconContext } from "react-icons";
// import Modal from "./Modal";
import Dropdown from './Dropdown';
import DropdownType from './DropdownType';
import DropdownHalls from './DropdownHalls';
import { colRefHall, firestore } from '../firebase-config';
import {
  deleteDoc, doc, docs, query, where, getDocs
} from 'firebase/firestore'

export default function DeleteHall() {
  // eslint-disable-next-line no-unused-vars
  const [formError, setFormError] = useState({}); 
  const [isSubmit, setIsSubmit] = useState(false);
  const [selectedLib, setSelectedLib] = useState("اختاري مكتبة");
  const [selectedType, setSelectedType] = useState("اختاري نوع القاعة");
  const [selectedName, setSelectedName] = useState("اختاري القاعة المراد حذفها");
  // const [modalOpen, setModalOpen] = useState(false);
  const [allDocs, setAllDocs] = useState([]);
  const [isActive, setIsActive] = useState(false);
  
  const q = query(colRefHall, where("hallLocation", "==", selectedLib));
  const deleteAHall = async (selectedLib, selectedType, selectedName) => {   
    const querySnapshot = await getDocs(q);
      querySnapshot.forEach((_doc) => {
        const document = _doc.data();
        
        if(document.hallLocation === selectedLib &&
           document.hallType === selectedType &&
            document.hallName === selectedName){  
          console.log(document);
          deleteDoc(doc(colRefHall, _doc.id))
          .then(() => {
            console.log("successfully deleted");
          }).catch(error => {
            console.log(error);
          })
        }
});
  };

  const handleSubmit = (e) => {//function to prevent refresh page when click save
    e.preventDefault();
    const info = {selectedLib, selectedType, selectedName};
    setFormError(validate(info));
    setIsSubmit(true);
    // setModalOpen(true);
    deleteAHall(selectedLib, selectedType, selectedName);//pass id 
    
  };

  useEffect(() => {
    if(isSubmit && Object.keys(formError).length === 0) {
    }
  }, [formError])

  const validate = (values) => { //to validate if all the fields are not empty
    const errors = {};
    if (!values.selectedLib){
      errors.selectedLib = "هذا الحقل مطلوب";
    }
    if (!values.selectedType){
      errors.selectedType = "هذا الحقل مطلوب";
    }
    if (!values.selectedName){
        errors.selectedName = "هذا الحقل مطلوب";
      }
    return errors;
  };

    return (
      <div className="App">
           {/* {modalOpen && <Modal setOpenModal={setModalOpen} />} */}
        <div className='create'>
        <div className='prevArrow'>
            <IconContext.Provider value={{color: '#333', size: "1.3em"}}>
              <Link to="/Home"><IoIosArrowBack/></Link>  
            </IconContext.Provider>
            </div>
          <IconContext.Provider value={{color: '#333', size: "0.5em"}}>
            <h2>حذف قاعة</h2>
          <form id = 'delete'onSubmit={handleSubmit}>
          {/* { !modalOpen ?  */}
            <div className="lib">
                <label>المكتبة</label>
                <Dropdown selected={selectedLib} setSelected={setSelectedLib} name="locationOfHall"/>
            </div>
            {/* :null} */}
                <p>{formError.selectedLib}</p>

                {/* { !modalOpen ?  */}
             <div className="type">
                <label>النوع</label>
                <DropdownType selected={selectedType} setSelected={setSelectedType} name="typeOfHall"/>
             </div>
             {/* : null} */}

                <p>{formError.selectedType}</p>
            
            {/* { !modalOpen ?  */}
            <div className="name">
                <label>القاعة</label>
                <DropdownHalls selected={selectedName} setSelected={setSelectedName} selectedLib={selectedLib} name="nameOfHall"></DropdownHalls>
            </div>
            {/* : null
} */}
                 <p>{formError.selectedName}</p>
               
            {isSubmit ?  
            <Link  to="/Home"><button type="submit">حفظ</button></Link> 
             : <button type="submit">حفظ</button>
             }
            
            
          </form>   
          </IconContext.Provider>  
           
        </div>
      </div>
    );
  }