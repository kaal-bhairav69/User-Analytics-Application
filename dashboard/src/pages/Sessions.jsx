import { useEffect, useState } from "react";
import axios from "axios";

function Sessions() {

    const [sessions, setSessions] = useState([]);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:5000/sessions")
            .then((res) => {
                setSessions(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const loadSessionEvents = (sessionId) => {

        axios
            .get(`http://localhost:5000/sessions/${sessionId}`)
            .then((res) => {
                setEvents(res.data);
            });
    };

    return (
        <div style={{ padding: "20px" }}>

            <h1>Sessions Dashboard</h1>

            <h2>All Sessions</h2>

            {sessions.map((session) => (

                <div
                    key={session._id}
                    onClick={() => loadSessionEvents(session._id)}
                    style={{
                        border: "1px solid #2d3748",
                        borderRadius: "12px",
                        padding: "16px",
                        marginBottom: "12px",
                        cursor: "pointer",
                        backgroundColor:"#111827",
                        transition:"0.25s"
                    }}
                >
                    <div
                       style={{
                          fontSize:"13px",
                          color:"#9ca3af",
                          marginBottom: "6px"
                       }}
                    >
                        Session
                    </div>

                    <div
                         style={{
                            fontSize:"18px",
                            fontweight:"600",
                            marginBottom:"10px"
                         }}
                    >
                        {session._id.slice(0,8)}...
                    </div>    
                    <div
                         style={{
                            display:"inline-block",
                            padding:"6px 12px",
                            borderRadius:"20px",
                            backgroundColor:"#1f2937",
                            fontSize:"14px"
                         }}
                    >
                        {session.event_count} Events
                    </div>
                </div>

            ))}

            <hr />

            <h2>Session Activity Timeline</h2>

            {events.map((event, index) => (

                <div
                    key={index}
                    style={{
                        borderLeft:"3px solid #3b82f6",
                        paddingLeft:"12px",
                        marginBottom: "16px"
                    }}
                >
                    <strong>{event.event_type}</strong>

                    <br />
                       <small>{event.timestamp}</small>
                
                </div>

            ))}

        </div>
    );
}

export default Sessions;