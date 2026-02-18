// Kudos Submission Form
// Based on SPECIFICATION.md user stories

import React, { useState } from "react";

function KudosForm() {
  const [receiver, setReceiver] = useState("");
  const [message, setMessage] = useState("");

  const submitKudos = async () => {
    await fetch("http://localhost:3001/api/kudos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        sender_id: "1",
        receiver_id: receiver,
        message
      })
    });

    setMessage("");
  };

  return (
    <div>
      <h2>Give Kudos</h2>

      <input
        placeholder="Receiver ID"
        value={receiver}
        onChange={(e) => setReceiver(e.target.value)}
      />

      <textarea
        placeholder="Write appreciation message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button onClick={submitKudos}>Send Kudos</button>
    </div>
  );
}

export default KudosForm;
