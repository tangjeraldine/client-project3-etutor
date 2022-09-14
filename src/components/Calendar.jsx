import "@fullcalendar/react/dist/vdom";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import { useRef, useState } from "react";
import AddEventModal from "./addEventModal";
import axios from "axios";
import moment from "moment";

function Calendar() {
  const [modalOpen, setModalOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const calendarRef = useRef(null);

  const onEventAdded = (event) => {
    let calendarApi = calendarRef.current.getApi();
    calendarApi.addEvent({
      start: moment(event.start).toDate(),
      end: moment(event.end).toDate(),
      title: event.title,
    });
  };

  const handleEventAdd = async (data) => {
    await axios.post("/class/create-class", data.event);
  };

  const handleDatesSet = async (data) => {
    const response = await axios.get(
      "/class/get-class?start=" +
        moment(data.start).toISOString() +
        "&end=" +
        moment(data.end).toISOString()
    );
    setEvents(response.data);
  };

  return (
    <section>
      <button onClick={() => setModalOpen(true)}>Add Event</button>

      <div style={{ position: "relative", zIndex: 0 }}>
        <FullCalendar
          ref={calendarRef}
          events={events}
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          EventAdd={(event) => handleEventAdd(event)}
          datesSet={(date) => handleDatesSet(date)}
        />
        ;
      </div>

      <AddEventModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onEventAdded={(event) => onEventAdded(event)}
      />
    </section>
  );
}

export default Calendar;
