// Main Dashboard Page
// Combines KudosForm and KudosFeed

import React from "react";
import KudosForm from "./KudosForm";
import KudosFeed from "./KudosFeed";

function App() {
  return (
    <div>
      <h1>Kudos Dashboard</h1>
      <KudosForm />
      <KudosFeed />
    </div>
  );
}

export default App;
