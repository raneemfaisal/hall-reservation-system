/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import '../styles/dropdownStyle.css';
import { FiChevronDown } from "react-icons/fi";
import { IconContext } from "react-icons";
import { colRefHall , firestore } from '../firebase-config';
import { getDocs, doc, snapshot, onSnapshot, collection, query, where } from 'firebase/firestore'

function DropdownHalls({ selected, setSelected, selectedLib }) {
const [allDocs, setAllDocs] = useState([]);
const [isActive, setIsActive] = useState(false);

const q = query(colRefHall, where("hallLocation", "==", selectedLib));

useEffect( ()=>{
  let _allDocs = [];
     getDocs(q)
      .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            _allDocs.push({ ...doc.data(), id: doc.id})       
    })
    setAllDocs(_allDocs);
 })
 .catch(err => {
  console.log(err.message)
 }) 
})
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
          {allDocs.map((option) => {
            return(
            <div
              onClick={(e) => {
                setSelected(option.hallName);
                setIsActive(false);
              }}
              className="dropdown-item"
            >
              {option.hallName}
            </div>
)})}
        </div>
      )}

      </IconContext.Provider>
    </div>
  );
}

export default DropdownHalls;