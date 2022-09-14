import React, { useState } from "react";
import Modal from "react-modal";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";

function AddEventModal({ isOpen, onClose, onEventAdded }) {
  const [title, setTitle] = useState("");
  //   const [subject, setSubject] = useState("");
  //   const [tutor, setTutor] = useState("");
  //   const [bookedBy, setBookedBy] = useState("");
  //   const [groupsize, setGroupsize] = useState(0);
  //   const [timeDay, setTimeDay] = useState(new Date());

  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());

  const onSubmit = (event) => {
    event.preventDefault();

    onEventAdded({
      title,
      //   subject,
      //   tutor,
      //   bookedBy,
      //   groupsize,
      //   timeDay,
      start,
      end,
    });
    onClose();
  };
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <form onSubmit={onSubmit}>
        <div>
          <input
            placeholder="classTitle"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* <div>
          <input
            placeholder="subject"
            value={subject}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div> */}

        {/* <div>
          <label>Time and Day:</label>
          <Datetime value={timeDay} onChange={(date) => setTimeDay(date)} />
        </div> */}

        <div>
          <label>Time and Day:</label>
          <Datetime value={start} onChange={(date) => setStart(date)} />
        </div>

        <div>
          <label>Time and Day:</label>
          <Datetime value={end} onChange={(date) => setEnd(date)} />
        </div>

        {/* <div>
          <input
            placeholder="tutor"
            value={tutor}
            onChange={(e) => setTutor(e.target.value)}
          />
        </div> */}

        {/* <div>
          <input
            placeholder="bookedBy"
            value={bookedBy}
            onChange={(e) => setBookedBy(e.target.value)}
          />
        </div> */}

        {/* <div>
          <input
            placeholder="groupSize"
            value={groupsize}
            onChange={(e) => setGroupsize(e.target.value)}
          />
        </div> */}

        <button>Add event</button>
      </form>
    </Modal>
  );
}
export default AddEventModal;
