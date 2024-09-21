// "use client";

// import React, {useState, useEffect} from "react";
// import {
//   formatDate,
//   DateSelectArg,
//   EventClickArg,
//   EventApi,
// } from "@fullcalendar/core";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";

// const Calendar: React.FC = () => {
//   const [currentEvents, setCurrentEvents] = useState<EventApi[]>([]);
//   const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
//   const [newEventTitle, setNewEventTitle] = useState<string>("");
//   const [selectedDate, setSelectedDate] = useState<DateSelectArg | null>(null);

//   useEffect(() => {
//     // Load events from local storage when the component mounts
//     if (typeof window !== "undefined") {
//       const savedEvents = localStorage.getItem("events");
//       if (savedEvents) {
//         setCurrentEvents(JSON.parse(savedEvents));
//       }
//     }
//   }, []);

//   useEffect(() => {
//     // Save events to local storage whenever they change
//     if (typeof window !== "undefined") {
//       localStorage.setItem("events", JSON.stringify(currentEvents));
//     }
//   }, [currentEvents]);

//   const handleDateClick = (selected: DateSelectArg) => {
//     const today = new Date();
//     const selectedDate = new Date(selected.startStr);

//     // Prevent selecting dates that are in the past
//     if (selectedDate < today) {
//       alert("You cannot add events to past dates.");
//       return;
//     }

//     setSelectedDate(selected);
//     setIsDialogOpen(true);
//   };

//   const handleEventClick = (selected: EventClickArg) => {
//     // Prompt user for confirmation before deleting an event
//     if (
//       window.confirm(
//         `Are you sure you want to delete the event "${selected.event.title}"?`
//       )
//     ) {
//       selected.event.remove();
//     }
//   };

//   const handleCloseDialog = () => {
//     setIsDialogOpen(false);
//     setNewEventTitle("");
//   };

//   const handleAddEvent = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (newEventTitle && selectedDate) {
//       const calendarApi = selectedDate.view.calendar; // Get the calendar API instance.
//       calendarApi.unselect(); // Unselect the date range.

//       const newEvent = {
//         id: `${selectedDate.start.toISOString()}-${newEventTitle}`,
//         title: newEventTitle,
//         start: selectedDate.start,
//         end: selectedDate.end,
//         allDay: selectedDate.allDay,
//       };

//       calendarApi.addEvent(newEvent);
//       handleCloseDialog();
//     }
//   };

//   return (
//     <div>
//       <div className="flex w-full px-10 justify-start items-start gap-8">
//         <div className="w-3/12">
//           <div className="py-10 text-2xl font-extrabold px-7">
//             Calendar Events
//           </div>
//           <ul className="space-y-4">
//             {currentEvents.length <= 0 && (
//               <div className="italic text-center text-gray-400">
//                 No Events Present
//               </div>
//             )}

//             {currentEvents.length > 0 &&
//               currentEvents.map((event: EventApi) => (
//                 <li
//                   className="border border-gray-200 shadow px-4 py-2 rounded-md text-blue-800"
//                   key={event.id}
//                 >
//                   {event.title}
//                   <br />
//                   <label className="text-slate-950">
//                     {formatDate(event.start!, {
//                       year: "numeric",
//                       month: "short",
//                       day: "numeric",
//                     })}{" "}
//                     {/* Format event start date */}
//                   </label>
//                 </li>
//               ))}
//           </ul>
//         </div>

//         <div className="w-9/12 mt-8">
//           <FullCalendar
//             height={"85vh"}
//             plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]} // Initialize calendar with required plugins.
//             headerToolbar={{
//               left: "prev,next today",
//               center: "title",
//               right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
//             }} // Set header toolbar options.
//             initialView="dayGridMonth" // Initial view mode of the calendar.
//             editable={true} // Allow events to be edited.
//             selectable={true} // Allow dates to be selectable.
//             selectMirror={true} // Mirror selections visually.
//             dayMaxEvents={true} // Limit the number of events displayed per day.
//             select={handleDateClick} // Handle date selection to create new events.
//             eventClick={handleEventClick} // Handle clicking on events (e.g., to delete them).
//             eventsSet={(events) => setCurrentEvents(events)} // Update state with current events whenever they change.
//             initialEvents={
//               typeof window !== "undefined"
//                 ? JSON.parse(localStorage.getItem("events") || "[]")
//                 : []
//             } // Initial events loaded from local storage.
//           />
//         </div>
//       </div>

//       {/* Dialog for adding new events */}
//       <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Add New Event Details</DialogTitle>
//           </DialogHeader>
//           <form className="space-x-5 mb-4" onSubmit={handleAddEvent}>
//             <input
//               type="text"
//               placeholder="Event Title"
//               value={newEventTitle}
//               onChange={(e) => setNewEventTitle(e.target.value)} // Update new event title as the user types.
//               required
//               className="border border-gray-200 p-3 rounded-md text-lg"
//             />
//             <button
//               className="bg-green-500 text-white p-3 mt-5 rounded-md"
//               type="submit"
//             >
//               Add
//             </button>{" "}
//             {/* Button to submit new event */}
//           </form>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default Calendar;
"use client";

import React, {useState, useEffect} from "react";
import {
  formatDate,
  DateSelectArg,
  EventClickArg,
  EventApi,
} from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const Calendar: React.FC = () => {
  const [currentEvents, setCurrentEvents] = useState<EventApi[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [newEventTitle, setNewEventTitle] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<DateSelectArg | null>(null);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    // Load events from local storage when the component mounts
    if (typeof window !== "undefined") {
      const savedEvents = localStorage.getItem("events");
      if (savedEvents) {
        setCurrentEvents(JSON.parse(savedEvents));
      }
    }
  }, []);

  useEffect(() => {
    // Save events to local storage whenever they change
    if (typeof window !== "undefined") {
      localStorage.setItem("events", JSON.stringify(currentEvents));
    }
  }, [currentEvents]);

  useEffect(() => {
    // Apply theme class to body element
    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);

  const handleDateClick = (selected: DateSelectArg) => {
    const today = new Date();
    const selectedDate = new Date(selected.startStr);

    // Prevent selecting dates that are in the past
    if (selectedDate < today) {
      alert("You cannot add events to past dates.");
      return;
    }

    setSelectedDate(selected);
    setIsDialogOpen(true);
  };

  const handleEventClick = (selected: EventClickArg) => {
    // Prompt user for confirmation before deleting an event
    if (
      window.confirm(
        `Are you sure you want to delete the event "${selected.event.title}"?`
      )
    ) {
      selected.event.remove();
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setNewEventTitle("");
  };

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (newEventTitle && selectedDate) {
      const calendarApi = selectedDate.view.calendar; // Get the calendar API instance.
      calendarApi.unselect(); // Unselect the date range.

      const newEvent = {
        id: `${selectedDate.start.toISOString()}-${newEventTitle}`,
        title: newEventTitle,
        start: selectedDate.start,
        end: selectedDate.end,
        allDay: selectedDate.allDay,
      };

      calendarApi.addEvent(newEvent);
      handleCloseDialog();
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <div
      className={`transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <div className="flex w-full px-10 justify-between items-center gap-8 py-4">
        <button
          onClick={toggleDarkMode}
          className={`px-4 py-2 rounded-md ${
            isDarkMode ? "bg-gray-700 text-white" : "bg-gray-200 text-black"
          }`}
        >
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </button>
        <div className="flex w-full gap-8">
          <div className="w-3/12">
            <div className="py-10 text-2xl font-extrabold px-7">
              Calendar Events
            </div>
            <ul className="space-y-4">
              {currentEvents.length <= 0 && (
                <div className="italic text-center text-gray-400">
                  No Events Present
                </div>
              )}

              {currentEvents.length > 0 &&
                currentEvents.map((event: EventApi) => (
                  <li
                    className={`border border-gray-200 shadow px-4 py-2 rounded-md ${
                      isDarkMode
                        ? "bg-gray-800 text-blue-300"
                        : "bg-white text-blue-800"
                    }`}
                    key={event.id}
                  >
                    {event.title}
                    <br />
                    <label className="text-slate-950">
                      {formatDate(event.start!, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}{" "}
                      {/* Format event start date */}
                    </label>
                  </li>
                ))}
            </ul>
          </div>

          <div className="w-9/12 mt-8">
            <FullCalendar
              height={"85vh"}
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]} // Initialize calendar with required plugins.
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
              }} // Set header toolbar options.
              initialView="dayGridMonth" // Initial view mode of the calendar.
              editable={true} // Allow events to be edited.
              selectable={true} // Allow dates to be selectable.
              selectMirror={true} // Mirror selections visually.
              dayMaxEvents={true} // Limit the number of events displayed per day.
              select={handleDateClick} // Handle date selection to create new events.
              eventClick={handleEventClick} // Handle clicking on events (e.g., to delete them).
              eventsSet={(events) => setCurrentEvents(events)} // Update state with current events whenever they change.
              initialEvents={
                typeof window !== "undefined"
                  ? JSON.parse(localStorage.getItem("events") || "[]")
                  : []
              } // Initial events loaded from local storage.
            />
          </div>
        </div>
      </div>

      {/* Dialog for adding new events */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Event Details</DialogTitle>
          </DialogHeader>
          <form className="space-x-5 mb-4" onSubmit={handleAddEvent}>
            <input
              type="text"
              placeholder="Event Title"
              value={newEventTitle}
              onChange={(e) => setNewEventTitle(e.target.value)} // Update new event title as the user types.
              required
              className={`border border-gray-200 p-3 rounded-md text-lg ${
                isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"
              }`}
            />
            <button
              className={`bg-green-500 text-white p-3 mt-5 rounded-md ${
                isDarkMode ? "bg-green-600" : ""
              }`}
              type="submit"
            >
              Add
            </button>{" "}
            {/* Button to submit new event */}
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Calendar;
