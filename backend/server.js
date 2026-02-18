// Minimal Express backend for Kudos System
// Generated from SPECIFICATION.md (Spec-Driven Implementation)

const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// In-memory data store (simulating database)
let kudos = [];
let users = [
  { id: "1", name: "Alice", role: "user" },
  { id: "2", name: "Bob", role: "user" },
  { id: "3", name: "Admin", role: "admin" }
];

// Create Kudos
app.post("/api/kudos", (req, res) => {
  const { sender_id, receiver_id, message } = req.body;

  if (!receiver_id || !message || message.length > 500) {
    return res.status(400).json({ error: "Invalid input" });
  }

  const newKudos = {
    id: Date.now().toString(),
    sender_id,
    receiver_id,
    message,
    created_at: new Date(),
    is_visible: true,
    moderated_by: null,
    moderated_at: null,
    reason_for_moderation: null
  };

  kudos.push(newKudos);
  res.json(newKudos);
});

// Get Kudos Feed
app.get("/api/kudos", (req, res) => {
  const visibleKudos = kudos.filter(k => k.is_visible);
  res.json(visibleKudos);
});

// Moderation Endpoint
app.patch("/api/kudos/:id/moderate", (req, res) => {
  const { id } = req.params;
  const { is_visible, reason_for_moderation, admin_id } = req.body;

  const item = kudos.find(k => k.id === id);
  if (!item) return res.status(404).json({ error: "Kudos not found" });

  item.is_visible = is_visible;
  item.moderated_by = admin_id;
  item.moderated_at = new Date();
  item.reason_for_moderation = reason_for_moderation;

  res.json(item);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Kudos backend running on port ${PORT}`);
});
