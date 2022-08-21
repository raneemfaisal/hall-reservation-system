import React , {useState} from 'react';
import '../styles/reservationStyle.css';
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import { IoIosArrowBack } from "react-icons/io";
import DatePicker from './DatePicker';
import Dropdown from './Dropdown';
import DropdownType from './DropdownType';
import DropdownHalls from './DropdownHalls';
import Time from './Time';
import { colRefReserve } from '../firebase-config';
import { addDoc } from 'firebase/firestore'
import ReactJsAlert from "reactjs-alert"


function Reservation() {
    const [selected2, setSelected2] = useState("اختاري نوع القاعة");
    const [selected3, setSelected3] = useState("اختاري اسم القاعة");
    const [selected, setSelected] = useState("اختاري مكتبة"); 
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState([]);

    const [status, setStatus] = useState(false);
    const [type, setType] = useState("");
    const [title, setTitle] = useState("");

    const handleSubmit = async () => {//function to prevent refresh page when click save
      await addDoc(colRefReserve, {
        HallName: selected3,
        HallType: selected2,
        LibraryName: selected,
        ReservaedDate: selectedDate,
        ReservedTime: selectedTime
     }).then(function(res){
       console.log("Data has been successfully added");
     }).catch(function(err){
      console.log("Data can NOT be added");
     })
    
    };
  
    return (
        <div className="App">
         <div className= 'Content'>
          <div className="createMain3">
           <div className= 'Content2'>
            <IconContext.Provider value={{color: '#333', size: "1.3em"}}>
              <Link  to="/"><IoIosArrowBack/></Link>  
            </IconContext.Provider>
           </div>
            <h2 className='title'>تفاصيل الحجز</h2>

            <div className='hall'>
              <Dropdown selected={selected} setSelected={setSelected} />
              <h2>المكتبة</h2>
            </div>
            <div className='hall'>
              <DatePicker value={selectedDate} onChange={setSelectedDate} />
              <h2>تاريخ الحجز</h2>
            </div>
            <div className="hall">
              <DropdownType selected={selected2} setSelected={setSelected2} />
              <h2>نوع القاعة</h2>
            </div>
            <div className="hall">
              <DropdownHalls selected={selected3} setSelected={setSelected3} selectedLib={selected} />
              <h2>اسم القاعة</h2>
            </div>
            <div className="hall">
  
              <Time selected={selectedTime} setSelected={setSelectedTime} selectedLib={selected} 
                  selectedType={selected2} selectedHall={selected3} selectedDate={selectedDate}/>
              <h2>الوقت</h2>
            </div>
            <div className="read-more-btn-box">
              { selected !== "اختاري مكتبة" && 
              selected2 !== "اختاري نوع القاعة" && 
              selected3 !== "اختاري اسم القاعة" && 
              selectedTime !== [] ? 
              <Link  to="/Form"> 
              <button className="read-more-btn" onClick={handleSubmit}> 
                <strong>التالي</strong>
              </button>
              </Link> 
              :  <button className="read-more-btn" 
              onClick={() => {
                setStatus(true);
                setType("error");
                setTitle("تنبيه لخطأ");
              }}
      >  
                  <strong>التالي</strong>
                </button>
              }
               <ReactJsAlert
                status={status} // true or false
                type={type} // success, warning, error, info
                title={title}
                quotes={true}
                quote="يجب عليكِ تعبئة جميع الحقول لإكمال عملية الحجز"
                Close={() => setStatus(false)}
              />
            </div>
                
           
        </div>
        {/* <Footer/> */}
        </div>
      </div>
            );
    }

export default Reservation;
