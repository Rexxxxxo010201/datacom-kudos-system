// Public Kudos Feed
// Displays visible kudos only

import React, { useEffect, useState } from "react";

function KudosFeed() {
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/kudos")
      .then((res) => res.json())
      .then((data) => setFeed(data));
  }, []);

  return (
    <div>
      <h2>Recent Kudos</h2>
      {feed.map((k) => (
        <div key={k.id}>
          <p>{k.message}</p>
        </div>
      ))}
    </div>
  );
}

export default KudosFeed;
