import React, { useEffect, useState } from "react";
import { getSlots } from "../services/slotService";
import "./Slot.css";

const SlotSelector = ({ date, duration, onSelect }) => {
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    if (date && duration) {
      getSlots(date, duration).then((res) => {
        setSlots(res.data);
      });
    }
  }, [date, duration]);

  return (
    <div className="slot-grid">
      {slots.map((slot) => (
        <button
          key={slot}
          className="slot-btn"
          onClick={() => onSelect(slot)}
        >
          {slot}
        </button>
      ))}
    </div>
  );
};

export default SlotSelector;
