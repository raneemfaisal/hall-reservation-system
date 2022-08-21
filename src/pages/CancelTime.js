/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import '../styles/dropdownStyle.css';
import { FiChevronDown } from "react-icons/fi";
import { IconContext } from "react-icons";
import { colRefReserve } from '../firebase-config';
import { getDocs, where, query } from 'firebase/firestore'

function CancelTime({selected, setSelected, selectedLib, selectedType, selectedHall, selectedDate}) {
const [allDocs, setAllDocs] = useState([]);
const [isActive, setIsActive] = useState(false);


const q = query(colRefReserve, where("LibraryName", "==", selectedLib));


useEffect( ()=>{
  let _allDocs = [];
     getDocs(q)
      .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            const document = doc.data();
            if (document.HallType === selectedType && document.HallName === selectedHall && document.ReservaedDate.toDate().getTime() === selectedDate.getTime()){
            _allDocs.push({ ...document, id: doc.id}) 
            }

    })
    setAllDocs(_allDocs);
 })
 .catch(err => {
  console.log(err.message)
 }) 
});

  return (
    <div className="dropdown">
        <IconContext.Provider value={{color: '#333', size: "1.7em"}}>
      <div className="dropdown-btn" onClick={(e) =>  setIsActive(!isActive)}>
      <FiChevronDown />
        {selected}
        <span className="fas fa-caret-down"></span>
      </div>
      {isActive && (
        <div className="dropdown-content">
          {allDocs.map((option, index) => 
            option.ReservedTime.map((time,index)=>{
            return(
            <div
              onClick={(e) => {
                setSelected(time);
                setIsActive(false);
              }}
              className="dropdown-item"
            >
              {time}
            </div>           
)
}))}
        </div>
      )}

      </IconContext.Provider>
    </div>
  );
}

export default CancelTime;