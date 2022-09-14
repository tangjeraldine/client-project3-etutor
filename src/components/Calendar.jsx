// import "@fullcalendar/react/dist/vdom";
// import FullCalendar from "@fullcalendar/react"; // must go before plugins
// import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
// import { useEffect, useRef, useState } from "react";
// import AddEventModal from "./addEventModal";
const SERVER = import.meta.env.VITE_SERVER;
import urlcat from "urlcat";

import Calendar from "@toast-ui/react-calendar";
import "@toast-ui/calendar/dist/toastui-calendar.min.css"; // Stylesheet for calendar

function Calendars() {
  const container = document.getElementById("calendar");
  const calendar = new Calendar(container, options);

  const options = {
    defaultView: "week",
    timezone: {
      zones: [
        {
          timezoneName: "Asia/Seoul",
          displayLabel: "Seoul",
        },
        {
          timezoneName: "Europe/London",
          displayLabel: "London",
        },
      ],
    },
    calendars: [
      {
        id: "cal1",
        name: "Personal",
        backgroundColor: "#03bd9e",
      },
      {
        id: "cal2",
        name: "Work",
        backgroundColor: "#00a9ff",
      },
    ],
  };

  const calendars = [{ id: "cal1", name: "Personal" }];
  //   const initialEvents = [
  //     {
  //       id: "1",
  //       calendarId: "cal1",
  //       title: "Lunch",
  //       category: "time",
  //       start: "2022-09-14T12:00:00",
  //       end: "2022-09-14T13:30:00",
  //     },
  //     {
  //       id: "2",
  //       calendarId: "cal1",
  //       title: "Coffee Break",
  //       category: "time",
  //       start: "2022-09-15T15:00:00",
  //       end: "2022-09-15T15:30:00",
  //     },
  //   ];
  const onAfterRenderEvent = (event) => {
    console.log(event.title);
  };

  //   const [modalOpen, setModalOpen] = useState(false);
  //   const [events, setEvents] = useState([]);
  //   const calendarRef = useRef(null);

  //   const onEventAdded = (event) => {
  //     let calendarApi = calendarRef.current.getApi();
  //     calendarApi.addEvent(event);
  // calendarApi.addEvent({
  //   //   start: moment(event.start).toDate(),
  //   //   end: moment(event.end).toDate(),
  //   classTitle: event.classTitle,
  //   subject: event.subject,
  //   tutor: event.tutor,
  //   bookedBy: event.bookedBy,
  //   groupsize: event.groupsize,
  //   timeDay: event.timeDay,
  // });
  //   };

  //   useEffect(() => {
  //     const fetchCalendar = async () => {
  //       const url = urlcat(SERVER, "/class/get-class");
  //       const request = await fetch(url);
  //       const data = await request.json();
  //       setEvents(data);
  //     };
  //     fetchCalendar();
  //   }, []);

  //   useEffect(() => {
  //     const url = urlcat(SERVER, "/class/create-class");
  //     fetch(url, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     })
  //       .then((res) => res.json())
  //       .then((data) => console.log(data));
  //   }, []);

  return (
    <div>
      <Calendar
        height="900px"
        view="month"
        month={{
          dayNames: ["S", "M", "T", "W", "T", "F", "S"],
          visibleWeeksCount: 3,
        }}
        calendars={calendars}
        events={initialEvents}
        onAfterRenderEvent={onAfterRenderEvent}
      />
    </div>
    // <section>
    //   <button onClick={() => setModalOpen(true)}>Add Event</button>

    //   <div style={{ position: "relative", zIndex: 0 }}>
    //     <FullCalendar
    //       ref={calendarRef}
    //       events={events}
    //       plugins={[dayGridPlugin]}
    //       initialView="dayGridMonth"
    //     />
    //     ;
    //   </div>

    //   <AddEventModal
    //     isOpen={modalOpen}
    //     onClose={() => setModalOpen(false)}
    //     onEventAdded={(event) => onEventAdded(event)}
    //   />
    // </section>
  );
}

export default Calendars;
