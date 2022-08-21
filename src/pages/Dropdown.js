/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import '../styles/dropdownStyle.css';
import { FiChevronDown } from "react-icons/fi";
import { IconContext } from "react-icons";
import { colRefLib } from '../firebase-config';
import { getDocs } from 'firebase/firestore'

function Dropdown({ selected, setSelected }) {
const [allDocs, setAllDocs] = useState([]);
const [isActive, setIsActive] = useState(false);

useEffect( ()=>{
  let _allDocs = [];
     getDocs(colRefLib)
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
                setSelected(option.LibraryName);
                // console.log(idDoc(option.id));
                setIsActive(false);
              }}
              className="dropdown-item"
            >
              {option.LibraryName}
            </div>
)})}
        </div>
      )}

      </IconContext.Provider>
    </div>
  );
}

export default Dropdown;