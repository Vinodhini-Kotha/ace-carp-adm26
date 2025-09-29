import { useState } from "react";
import { uploadEvent } from "../supabaseData";

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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Event Name"
        value={event_name}
        onChange={(e) => setEventName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Conducted By"
        value={event_conductedBy}
        onChange={(e) => setConductedBy(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="date"
        value={event_date}
        onChange={(e) => setDate(e.target.value)}
      />
      <input
        type="time"
        value={start_time}
        onChange={(e) => setStartTime(e.target.value)}
      />
      <input
        type="time"
        value={end_time}
        onChange={(e) => setEndTime(e.target.value)}
      />
      <input
        type="text"
        placeholder="Venue"
        value={venue}
        onChange={(e) => setVenue(e.target.value)}
      />
      <input
        type="text"
        placeholder="Event Type"
        value={event_type}
        onChange={(e) => setEventType(e.target.value)}
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <button type="submit">Submit Event</button>
      <p>{status}</p>
    </form>
  );
}

export default EventForm;
