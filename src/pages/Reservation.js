import React , {useState, useEffect} from 'react';
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
import { addDoc } from 'firebase/firestore';
import ReactJsAlert from "reactjs-alert";
// import { colRefHall } from '../firebase-config';
// import { getDocs } from 'firebase/firestore';
import {
  ref,
  getDownloadURL,
  listAll,
} from "firebase/storage";
import { storage } from '../firebase-config';


function Reservation() {
    const [selected2, setSelected2] = useState("اختاري نوع القاعة");
    const [selected3, setSelected3] = useState("اختاري اسم القاعة");
    const [selected, setSelected] = useState("اختاري مكتبة"); 
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState([]);

    const [status, setStatus] = useState(false);
    const [type, setType] = useState("");
    const [title, setTitle] = useState("");

    const [imageUrls, setImageUrls] = useState([]);

  
    const images = (imagesListRef) =>{
      listAll(imagesListRef).then((response) => {
        response.items.forEach((item) => {
          getDownloadURL(item).then((url) => {
            setImageUrls((prev) => [...prev, url]);
          });
        });
      });
    }
  useEffect(() => {
    
      if(selected === 'المكتبة المركزية للطالبات'){
        if(selected2 === 'فردية'){
        const imagesListRef = ref(storage, "TheCentralLibrary/Single/");
        images(imagesListRef);
      }
      if(selected2 === 'مشتركة'){
        const imagesListRef = ref(storage, "TheCentralLibrary/Other/");
        images(imagesListRef);
      }
      }

      if(selected === "مكتبة كلية الطب"){
        const imagesListRef = ref(storage, "SchoolOfMedicine");
        images(imagesListRef);
      }

       if(selected === "مكتبة كلية التمريض"){
        if(selected2 === 'فردية'){
          const imagesListRef = ref(storage, "NursingCollegeLibrary/Single/");
          images(imagesListRef);
        }
        if(selected2 === 'مشتركة'){
          const imagesListRef = ref(storage, "NursingCollegeLibrary/Other/");
          images(imagesListRef);
        }
      }

      if(selected === "مكتبة كلية الدراسات التطبيقية وخدمة المجتمع"){
        if(selected2 === 'فردية'){
          const imagesListRef = ref(storage, "LibraryOfTheCollegeAppliedStudies/Single/");
          images(imagesListRef);
        }
        if(selected2 === 'مشتركة'){
          const imagesListRef = ref(storage, "LibraryOfTheCollegeAppliedStudies/Other/");
          images(imagesListRef);
        }
      }

      if(selected === "مكتبة كلية العلوم الطبية التطبيقية"){
        if(selected2 === 'فردية'){
          const imagesListRef = ref(storage, "LibraryOfTheCollegeOfAppliedMedicalSciences/Single/");
          images(imagesListRef);
        }
        if(selected2 === 'مشتركة'){
          const imagesListRef = ref(storage, "LibraryOfTheCollegeOfAppliedMedicalSciences/Other/");
          images(imagesListRef);
        }
      }

      if(selected === "مكتبة كلية طب الأسنان"){
        if(selected2 === 'فردية'){
          const imagesListRef = ref(storage, "LibraryOfTheCollegeOfDentistry/Single/");
          images(imagesListRef);
        }
        if(selected2 === 'مشتركة'){
          const imagesListRef = ref(storage, "LibraryOfTheCollegeOfDentistry/Other/");
          images(imagesListRef);
        }
      }

      if(selected === "مكتبة العيادات الخارجية مستشفى الملك خالد"){
        if(selected2 === 'فردية'){
          const imagesListRef = ref(storage, "KingKhalidUniversityHospitalLibrary/Single/");
          images(imagesListRef);
        }
        if(selected2 === 'مشتركة'){
          const imagesListRef = ref(storage, "KingKhalidUniversityHospitalLibrary/Other/");
          images(imagesListRef);
        }
      }

      if(selected === "مكتبة كلية التربية"){
        if(selected2 === 'فردية'){
          const imagesListRef = ref(storage, "FACULTYOFEDUCATIONLibrary/Single/");
          images(imagesListRef);
        }
        if(selected2 === 'مشتركة'){
          const imagesListRef = ref(storage, "FACULTYOFEDUCATIONLibrary/Other/");
          images(imagesListRef);
        }
      }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
    // const [allDocs, setAllDocs] = useState([]);

  //   useEffect( ()=>{
  //     let _allDocs = [];
  //     getDocs(colRefHall)
  //      .then((snapshot) => {
  //          snapshot.docs.forEach((doc) => {
  //          const document = doc.data();
  //            _allDocs.push({ ...doc.data(), id: doc.id})       
           
  //        if (document.hallType === selected2 && document.hallName === selected3){
  //          setAllDocs(_allDocs);
  //        }
  //       })
  // })
  // .catch(err => {
  //  console.log(err.message)
  // })
  //   })
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
            
            <div className="hall">
            {imageUrls.map((url) => {
        // eslint-disable-next-line jsx-a11y/alt-text
        return <img src={url} />;
      })}
      
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
