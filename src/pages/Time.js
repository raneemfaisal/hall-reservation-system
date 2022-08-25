/* eslint-disable array-callback-return */ 
/* eslint-disable react-hooks/exhaustive-deps */ 
/* eslint-disable no-unused-vars */ 
import React, { useEffect, useState } from 'react'; 
import '../styles/time.css'; 
import { colRefReserve } from '../firebase-config'; 
import { getDocs, where, query } from 'firebase/firestore'; 
 
function Time({ 
 selected, 
 setSelected, 
 selectedLib, 
 selectedType, 
 selectedHall, 
 selectedDate, 
}) { 
 // State with list of all checked item 
 const [checked, setChecked] = useState([]); 
 const [disable, setDisable] = useState([]); 
 const checkList = [ 
  '7:00', 
  '8:00', 
  '9:00', 
  '10:00', 
  '11:00', 
  '12:00', 
  '1:00', 
  '2:00', 
  '3:00', 
 ]; 
 const q = query(colRefReserve, where('LibraryName', '==', selectedLib)); 
 
 const getCheck = async () => { 
  const querySnapshot = await getDocs(q); 
  querySnapshot.forEach((_doc) => { 
   const document = _doc.data(); 
   if ( 
    document.HallType === selectedType && 
    document.HallName === selectedHall && 
    document.ReservaedDate.toDate().toDateString() === 
     selectedDate.toDateString() 
   ) { 
    if (Array.isArray(document.ReservedTime)) { 
      setDisable(document.ReservedTime); 
    } else { 
      setDisable([document.ReservedTime]); 
    } 
   } 
  }); 
 }; 
 useEffect(() => { 
  getCheck(); 
 }, [selectedType, selectedHall, selectedDate, selectedLib]); 
 
 // Add/Remove checked item from list 
 const handleCheck = (event) => { 
  var updatedList = [...checked]; 
  if (event.target.checked) { 
   updatedList = [...checked, event.target.value]; 
  } else { 
   updatedList.splice(checked.indexOf(event.target.value), 1); 
  } 
  setChecked(updatedList); 
 }; 
 
 // Generate string of checked items 
 const checkedItems = checked.length 
  ? checked.reduce((total, item) => { 
     return total + ', ' + item; 
    }) 
  : ''; 
 
 // Return classes based on whether item is checked 
 var isChecked = (item) => 
  checked.includes(item) ? 'checked-item' : 'not-checked-item'; 
 
 return ( 
  <div className='checkbox-time'> 
   <form className='checkbox-time'> 
    {checkList.map((item, index) => ( 
     // item.openTime.map((time,index)=>{ 
     <div key={index} className='checkBox'> 
      <input 
       value={item} 
       type='checkbox' 
       disabled={disable.includes(item)} 
       onChange={handleCheck} 
       onClick={() => setSelected(item)} 
       checked= {checked.includes(item)} 
      /> 
      <span className={isChecked(item)}>{item}</span> 
     </div> 
     // }) 
    ))} 
    {/* <div className='labelTime'>{`Items checked are: ${checkedItems}`}</div> */} 
   </form> 
  </div> 
 ); 
} 
export default Time;
