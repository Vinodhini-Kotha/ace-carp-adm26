import { useState } from "react";
import { uploadEvent } from "../supabaseData";
import "./EventForm.css";
import vector270 from "../assets/vector270.svg";
import vector271 from "../assets/vector271.svg";
import maskGroup from "../assets/mask-group.svg";

function EventForm() {
  const [event_name, setEventName] = useState("");
  const [event_conductedBy, setConductedBy] = useState("");
  const [description, setDescription] = useState("");
  const [event_date, setDate] = useState("");
  const [start_time, setStartTime] = useState("");
  const [end_time, setEndTime] = useState("");
  const [venue, setVenue] = useState("");
  const [event_type, setEventType] = useState("");
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!event_name || !event_conductedBy || !description || !event_date || !start_time || !end_time || !venue || !event_type || !image) {
      setStatus("Please fill in all fields before submitting the form.");
      return;
    }
    try {
      const publicUrl = await uploadEvent({
        event_name,
        event_conductedBy,
        description,
        event_date,
        start_time,
        end_time,
        venue,
        image,
        event_type,
      });
      setStatus(" Event uploaded successfully! URL: " + publicUrl);
    } catch (err) {
      setStatus(" Error: " + err.message);
    }
  };

  return (
    <div style={{ position: "relative", minHeight: "100vh", width: "100%" }}>
      <div className="events-heading">ADMIN</div>
      <img src={vector270} alt="Vector 270" className="vector270" />
      <img src={vector271} alt="Vector 271" className="vector271" />
      <img src={maskGroup} alt="Mask Group" className="mask-group" />
      <div className="event-form-container" style={{ justifyContent: 'flex-end', minHeight: '100vh' }}>
        <form className="event-form" onSubmit={handleSubmit}>
          <input type="text" placeholder="Event Name" value={event_name} onChange={e => setEventName(e.target.value)} />
          <input type="text" placeholder="Conducted By" value={event_conductedBy} onChange={e => setConductedBy(e.target.value)} />
          <textarea
            placeholder="Description"
            value={description}
            onChange={e => {
              setDescription(e.target.value);
              const textarea = e.target;
              textarea.style.height = 'auto';
              textarea.style.height = textarea.scrollHeight + 'px';
            }}
            style={{ resize: 'none', overflow: 'hidden' }}
            rows={2}
          />
          <input type="date" value={event_date} onChange={e => setDate(e.target.value)} />
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <label htmlFor="start_time" style={{ fontWeight: 500, color: '#333' }}>From</label>
            <input id="start_time" type="time" value={start_time} onChange={e => setStartTime(e.target.value)} style={{ flex: 1 }} />
            <label htmlFor="end_time" style={{ fontWeight: 500, color: '#333', marginLeft: '16px' }}>To</label>
            <input id="end_time" type="time" value={end_time} onChange={e => setEndTime(e.target.value)} style={{ flex: 1 }} />
          </div>
          <input type="text" placeholder="Venue" value={venue} onChange={e => setVenue(e.target.value)} />
          <input type="text" placeholder="Event Type" value={event_type} onChange={e => setEventType(e.target.value)} />
          <input type="file" accept="image/*" onChange={e => setImage(e.target.files[0])} />
          <button type="submit">Submit Event</button>
          <p>{status}</p>
        </form>
      </div>
    </div>
  );
}

export default EventForm;
