import React, { useState } from "react";
import axios from "axios";

export default function App() {
    const [location, setLocation] = useState(null);
    const [userData, setUserData] = useState(null);
    const [jsonInput, setJsonInput] = useState(
    '{"name":"Alex","destinations":["Paris","London"]}'
);
    const [xmlOutput, setXmlOutput] = useState("");

    // Get current geolocation
    const getLocation = () => {
    if (!navigator.geolocation) {
    alert("Geolocation not supported by your browser.");
    return;
    }
    navigator.geolocation.getCurrentPosition(
    (pos) => {
    setLocation({
    lat: pos.coords.latitude,
    lon: pos.coords.longitude,
    });
    },
    (err) => {
    alert("Error getting location: " + err.message);
    }
    );
};

    // Fetch user data using Axios
    const fetchUser = async () => {
    try {
    const res = await axios.get(
    "https://jsonplaceholder.typecode.com/users/1"
    );
    setUserData(res.data);
    } catch (err) {
    alert("Failed to fetch user data");
    }
};

// Convert JSON -> XML
const convertToXML = () => {
    try {
    const jsonObj = JSON.parse(jsonInput);
    const xml = jsonToXml(jsonObj, "travel");
    setXmlOutput(xml);
    } catch (err) {
    alert("Invalid JSON");
    }
};
// Helper to convert JSON to XML
const jsonToXml = (obj, rootName) => {
    let xml = '<$(rootName)>';
    for (let key in obj) {
    const value = obj[key];
    if (Array.isArray(value)) {
    value.forEach((item) => {
    xml += '<$(key)>$(item)</$(key)>';
    });
    } else if (typeof value === "object") {
    xml += jsonToXml(value, key);
    } else {
    xml += '<$(key)>$(value)</$(key)>';
    }
    }
    xml += '</$(rootName)>';
    return xml;
};

return (
<div style={styles.container}>
<h1 style={styles.header}>Smart Travel Companion Dashboard</h1>

{/* 2x2 Grid */}
<div style={styles.grid}>
{/* Travel Media */}
<div style={styles.card}>
<h2>Travel Media</h2>
<video width="100%" controls>
<source
    src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
    type="video/mp4"
/>
Your browser does not support the video tag.
</video>
<audio controls style={{ width: "100%", marginTop: "10px" }}>
<source
    src="https://interactive-examples.mdn.mozilla.net/media/examples/t-rex-roar.mp3"
    type="audio/mpeg"
/>
Your browser does not support the audio element.
</audio>
</div>

{/* Locate Me */}
<div style={styles.card}>
<h2>Locate Me</h2>
<button onClick={getLocation} style={styles.button}>
    Get Location
</button>
{location && (
    <p style={{ marginTop: "10px" }}>
    <b>latitude:</b> {location.lat.toFixed(4)} <br />
    <b>longitude:</b> {location.lon.toFixed(4)}
    </p>
) }
</div>

{/* User Data (below Travel Media) */}
<div style={styles.card}>
<h2>User Data (Axios Fetch)</h2>
<button onClick={fetchUser} style={styles.button}>
    Fetch User
</button>
{userData && (
    <div style={{ marginTop: "10px" }}>
    <p>
    <b>Name:</b> {userData.name}
    </p>
    <p>
    <b>Email:</b> {userData.email}
    </p>
    <p>
    <b>Phone:</b> {userData.phone}
    </p>
    </div>
)}
</div>

{/* JSON -> XML Conversion (below Locate Me) */}
<div style={styles.card}>
<h2>JSON to XML Conversion</h2>
 <textarea
    style={styles.textarea}
    rows={4}
    value={jsonInput}
    onChange={(e) => setJsonInput(e.target.value)}
 />
 <button onClick={convertToXML} style={styles.button}>
    Convert to XML
    </button>
    {xmlOutput && <pre style={styles.pre}>{xmlOutput}</pre>}
 </div>
 </div>
</div>
);
}

// CSS
const styles = {
    container: {
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f7ff7f7",
    minHeight: "100vh",
    padding: "20px",
    },
    header: {
    textAlign: "left",
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
    },
    grid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)", // 2 columns
    gridTemplateRows: "auto auto", // 2 rows
    gap: "20px",
    },
    card: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    },
    button: {
    backgroundColor: "#007bff",
    color: "white",
    padding: "8px 12px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    },
    textarea: {
    width: "100%",
    padding: "8px",
    marginBottom: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontFamily: "monospace",
    },
    pre: {
    backgroundColor: "#f2f2f2",
    padding: "10px",
    borderRadius: "5px",
    overflowX: "auto",
    marginTop: "10px",
    },
};
