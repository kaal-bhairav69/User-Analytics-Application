import { useState } from "react";
import axios from "axios";

function Heatmap() {

    const [url, setUrl] = useState("");
    const [clicks, setClicks] = useState([]);

    const loadHeatmap = () => {

        axios
            .get(
                `http://localhost:5000/heatmap?url=${encodeURIComponent(url)}`
            )
            .then((res) => {
                setClicks(res.data);
            });

    };

    return (
        <div style={{ padding: "20px" }}>

            <h1
              style={{
                marginBottom:"20px"
              }}
            >
                Click Heatmap
            </h1>

            <div
               style={{
                  display:"flex",
                  gap:"10px",
                  justifyContent:"center",
                  marginBottom:"20px"
               }}
            >
                <input
                 value={url}
                 onChange={(e) => setUrl(e.target.value)}
                 placeholder="Enter page URL"
                 style={{
                    width : "450px",
                    padding: "10px",
                    borderRadius:"8px",
                    border:"1px solid #374151",
                    backgroundColor:"#111827",
                    color:"white"
                 }}
                />

                <button 
                   onClick={loadHeatmap}
                   style={{
                    padding: "10px 18px",
                    borderRadius: "8px",
                    cursor: "pointer"
                   }}
                > 
                 Load Heatmap
                </button>   
                </div>   

            <div
                style={{
                    position: "relative",
                    width: "1000px",
                    height: "600px",
                    border: "1px solid black",
                    marginTop: "20px"
                }}
            >

                {
                    clicks.map((c, i) => (

                        <div
                            key={i}
                            style={{
                                position: "absolute",
                                left: c.x,
                                top: c.y,
                                width: "10px",
                                height: "10px",
                                borderRadius: "50%",
                                background: "red"
                            }}
                        />

                    ))
                }

            </div>

        </div>
    );
}

export default Heatmap;