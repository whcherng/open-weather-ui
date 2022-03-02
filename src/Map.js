import React, { useState, useEffect } from "react";
import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function Map(props) {
  const { lat, lon } = props;
  const [map, setMap] = useState(null);

  // Copy all images from node_modules/leaflet/dist/images else marker will disappear
  // refer https://github.com/PaulLeCam/react-leaflet/issues/453#issuecomment-611930767
  L.Icon.Default.imagePath = "img/";

  //  to call invalidateSize() function every 100 miliseconds for having the size of the screen updated all the time.
  //  refer https://stackoverflow.com/a/68282234
  useEffect(() => {
    if (map) {
      setInterval(function () {
        map.invalidateSize();
      }, 100);
    }
  }, [map]);

  return (
    <div>
      <MapContainer
        center={[lat, lon]}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "400px", width: "100%" }}
        whenCreated={setMap}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lon]}>
          <Popup>
            <a
              target="_blank"
              rel="noreferrer noopener"
              href="https://www.linkedin.com/in/hau-cherng-wong-121ab5149"
            >
              My LinkedIn
            </a>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
