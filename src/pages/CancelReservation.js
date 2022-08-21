/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import {React, useState} from 'react';
import { Link } from "react-router-dom";
import '../styles/cancelReservation.css';
import { IoIosArrowBack } from "react-icons/io";
import { IconContext } from "react-icons";
import Dropdown from './Dropdown';
import DropdownType from './DropdownType';
import DropdownHalls from './DropdownHalls';
import DatePicker from './DatePicker';
import CancelTime from './CancelTime';
import { colRefReserve } from '../firebase-config';
import { getDocs, where, query, updateDoc, arrayRemove, deleteDoc, doc } from 'firebase/firestore'


export default function CancelReservation() {
  // eslint-disable-next-line no-unused-vars
  const [formError, setFormError] = useState({}); 
  const [isSubmit, setIsSubmit] = useState(false);
  const [selected, setSelected] = useState("اختاري مكتبة");
  const [selected2, setSelected2] = useState("اختاري نوع القاعة");
  const [selected3, setSelected3] = useState("اختاري القاعة المراد حذفها");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState([]);

  
  const q = query(colRefReserve, where("LibraryName", "==", selected));
  
  const deleteARes = async () => {   
    const querySnapshot = await getDocs(q);
      querySnapshot.forEach((_doc) => {
        const document = _doc.data();
        if (document.HallType === selected2 && document.HallName === selected3 && document.ReservaedDate.toDate().getTime() === selectedDate.getTime()){
          // console.log(document);
          document.ReservedTime.forEach((time) => {
            if(time === selectedTime){
              // console.log(time)
              if(document.ReservedTime.length === 1){
                deleteDoc(doc(colRefReserve, _doc.id))
                .then(() => {
                  console.log("successfully deleted");
                }).catch(error => {
                  console.log(error);
                })
              } else{
                let _document = document
                 _document.ReservedTime = document.ReservedTime.filter(_time => _time !== time)
                updateDoc(_doc.ref, {..._document});

              }
            }
          })
          
          }
});
  };


  const handleSubmit = (e) => {//function to prevent refresh page when click save
    e.preventDefault();
    const info = {selected, selected2, selected3, selectedDate, selectedTime};
    setFormError(validate(info));
    setIsSubmit(true);
    deleteARes()
  };

  const validate = (values) => { //to validate if all the fields are not empty
    const errors = {};
    if (!values.selected){
      errors.selected = "هذا الحقل مطلوب";
    }
    if (!values.selected2){
      errors.selected2 = "هذا الحقل مطلوب";
    }
    if (!values.selected3){
        errors.selected3 = "هذا الحقل مطلوب";
      }
      if (!values.selectedDate){
        errors.selected2 = "هذا الحقل مطلوب";
      }
      if (!values.selectedTime){
          errors.selected3 = "هذا الحقل مطلوب";
        }
    return errors;
  };

    return (
      <div className="App">
           {/* {modalOpen && <Modal setOpenModal={setModalOpen} />} */}
        <div className='createMain2'>
        <div className='prevArrow'>
            <IconContext.Provider value={{color: '#333', size: "1.3em"}}>
              <Link to="/Home"><IoIosArrowBack/></Link>  
            </IconContext.Provider>
            </div>
          <IconContext.Provider value={{color: '#333', size: "0.5em"}}>
            <h2>حذف موعد حجز</h2>
          <form onSubmit={handleSubmit}>
              <div className="pass">
                  <label>اسم المكتبة</label>
                  <Dropdown selected={selected} setSelected={setSelected} />
              </div>
          <p>{formError.selected}</p>

              <div className="pass">
                <label>النوع القاعة</label>
                <DropdownType selected={selected2} setSelected={setSelected2} />
              </div>
          <p>{formError.selected2}</p>
            
              <div className="pass">
                <label>اسم القاعة</label>
                <DropdownHalls selected={selected3} setSelected={setSelected3} selectedLib={selected}></DropdownHalls>
              </div>
          <p>{formError.selected3}</p>

           
                     <div className='pass'>
                     <label>تاريخ الحجز</label>
                     <DatePicker value={selectedDate} onChange={setSelectedDate} />
                     </div>
                    
  
             <div className='pass'>
                  <label>وقت الحجز</label>
                  <CancelTime selected={selectedTime} setSelected={setSelectedTime} selectedLib={selected} 
                  selectedType={selected2} selectedHall={selected3} selectedDate={selectedDate}/>
             </div>

      <div className="read-more-btn-box">
           
           <button type="submit" className="read-more-btn">حفظ</button>
            
               </div>
            
          </form>   
          </IconContext.Provider>  
          </div> 
      </div>
    );
  }