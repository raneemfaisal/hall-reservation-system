import { useState } from "react";
import '../styles/dropdownStyle.css';
import { FiChevronDown } from "react-icons/fi";
import { IconContext } from "react-icons";

function DropdownType({ selected, setSelected }) {
  const [isActive, setIsActive] = useState(false);
  const options = ["فردية", "مشتركة"];
  return (
    <div className="dropdown">
        <IconContext.Provider value={{color: '#333', size: "1.7em"}}>
      <div className="dropdown-btn" onClick={(e) => setIsActive(!isActive)}>
      <FiChevronDown />
        {selected}
        <span className="fas fa-caret-down"></span>
      </div>
      {isActive && (
        <div className="dropdown-content">
          {options.map((option) => (
            <div
              onClick={(e) => {
                setSelected(option);
                setIsActive(false);
              }}
              className="dropdown-item"
            >
              {option}
            </div>
          ))}
        </div>
      )}
      </IconContext.Provider>
    </div>
  );
}

export default DropdownType;