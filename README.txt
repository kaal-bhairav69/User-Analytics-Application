# User Analytics Application

A full-stack analytics application built as part of the CausalFunnel Full Stack Engineer assignment.

The application tracks user interactions on a webpage, stores event data in MongoDB, and provides a dashboard for analyzing user sessions and click activity.

---

## Features

### Event Tracking

Tracks the following events:

- Page Views
- Click Events

Each event contains:

- Session ID
- Event Type
- Page URL
- Timestamp
- Click Coordinates (x, y) for click events

---

### Backend APIs

#### POST /events

Receives and stores tracking events.

#### GET /sessions

Returns all sessions with total event counts.

Example Response:

```json
[
  {
    "_id": "f0071071-e5f6-48ea-819b-920a1fcaf5a7",
    "event_count": 20
  }
]
```

#### GET /sessions/<session_id>

Returns the ordered list of events for a specific session.

#### GET /heatmap?url=<page_url>

Returns click coordinates for the specified page.

---

## Dashboard

### Sessions View

Displays:

- All tracked sessions
- Total events per session
- User activity timeline for selected session

### Heatmap View

Displays:

- Total clicks for a page
- Visual click positions using plotted click markers

---

## Tech Stack

### Frontend

- React (Vite)
- Axios
- React Router

### Backend

- Flask
- Flask-CORS

### Database

- MongoDB Atlas
- PyMongo

---

## Project Structure

```text
project/
│
├── backend/
│   ├── app.py
│   └── requirements.txt
│
├── dashboard/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── sessions.jsx
│   │   │   └── heatmap.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│
├── demo.html
│
└── README.md
```

---

## Installation

### Clone Repository

```bash
git clone <repository-url>
cd project
```

---

## Backend Setup

Create a virtual environment:

```bash
python -m venv venv
```

Activate it:

Windows:

```bash
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Create a `.env` file:

```env
MONGO_URI=your_mongodb_connection_string
```

Run Flask server:

```bash
python app.py
```

Server runs on:

```text
http://localhost:5000
```

---

## Frontend Setup

Navigate to dashboard folder:

```bash
cd dashboard
```

Install dependencies:

```bash
npm install
```

Start React application:

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## Testing Event Tracking

Open:

```text
demo.html
```

Actions:

- Refresh page → Page View event generated
- Click anywhere → Click event generated

Events are sent to:

```text
POST /events
```

and stored in MongoDB.

---

## Database Schema

Example Event Document:

```json
{
  "session_id": "f0071071-e5f6-48ea-819b-920a1fcaf5a7",
  "event_type": "click",
  "page_url": "file:///demo.html",
  "timestamp": "2026-06-20T01:25:00.328Z",
  "x": 450,
  "y": 320
}
```

---

## Assumptions & Trade-offs

- Session IDs are generated using `crypto.randomUUID()` and stored in localStorage.
- Heatmap visualization uses click markers instead of a full heatmap rendering library to keep implementation lightweight.
- MongoDB Atlas is used as the database for simplicity and easy deployment.
- Authentication was not implemented because it was outside the assignment scope.

---

## Future Improvements

- Real heatmap rendering using Heatmap.js
- User filtering and session search
- Event analytics charts
- Session duration tracking
- Docker deployment
- Authentication and role management

---

## Author

Nimit Garg

Kyushu University