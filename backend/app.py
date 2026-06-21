from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)

client = MongoClient("mongodb+srv://nimitgarg73_db_user:0Msbtk4JYZP33O8x@cluster0.iuaucns.mongodb.net/?appName=Cluster0")
db=client.analytics_db
events_collection = db.events

@app.route("/events", methods=["POST"])
def events():
    data = request.json
    events_collection.insert_one(data)
    print("stored: ",data)
    return jsonify({"success": True})

@app.route("/sessions", methods=["GET"])
def get_sessions():
    sessions = list(
        events_collection.aggregate([
            {
                "$group": {
                    "_id": "$session_id",
                    "event_count": {
                        "$sum": 1
                    }
                }
            }
        ])
    )
    for session in sessions:
        session["_id"] = str(session["_id"])

    return jsonify(sessions)


@app.route("/sessions/<session_id>", methods=["GET"])
def get_session_events(session_id):
    events = list(
        events_collection.find(
            {"session_id": session_id},
            {"_id": 0}
        ).sort("timestamp", 1)
    )

    return jsonify(events)


@app.route("/heatmap", methods=["GET"])
def get_heatmap():
    page_url = request.args.get("url")
    clicks = list(
        events_collection.find(
            {
                "event_type": "click",
                "page_url": page_url
            },
            {
                "_id": 0,
                "x":1,
                "y":1
            }
        )
    )
    return jsonify(clicks)


if __name__ == "__main__":
    app.run(debug=True)