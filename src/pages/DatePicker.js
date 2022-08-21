import {React , useState} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { IconContext } from "react-icons";
import { BiCalendar } from "react-icons/bi";

function DatePicker ({selectedDate, onChange}) {
    const [date, setDate] = useState(new Date());
    const [showCalendar, setShowCalendar] = useState(false);

    const handleChange = value => {
      onChange(value);
      setDate(value);
      setShowCalendar(false);
      console.log(date);
    };

    return (
      
        <div className="dropdown-btn2">
           <IconContext.Provider value={{color: '#333', size: "1.3em", padding: "8px"}}>
          <input
            value={`${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`} 
            onClick={ (value) => { 
              setDate(value);
              onChange(...selectedDate, value);
              setShowCalendar(false);
            }}
            onFocus={() => setShowCalendar(true)}
          />
          <BiCalendar/>
          <Calendar
            className={showCalendar ? "" : "hide"}
            value={date}
            onChange= {handleChange}
            minDate = {new Date()}
            tileDisabled = {({date}) => date.getDay() === 5 || date.getDay() === 6}
          />
          </IconContext.Provider>
        </div>
      );
    };
    
export default DatePicker;