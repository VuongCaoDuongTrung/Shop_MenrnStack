import React, { useEffect, useRef } from "react";

const Map = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    const loadMap = () => {
      if (
        window.Microsoft &&
        window.Microsoft.Maps &&
        window.Microsoft.Maps.Map
      ) {
        const map = new window.Microsoft.Maps.Map(mapRef.current, {
          center: new window.Microsoft.Maps.Location(10.867153, 106.641332), // Thay đổi tọa độ nếu cần
          zoom: 15,
        });

        const center = new window.Microsoft.Maps.Location(
          10.867153,
          106.641332
        );
        const pin = new window.Microsoft.Maps.Pushpin(center, {
          title: "Hà Nội",
          subTitle: "Thủ đô",
          text: "HN",
        });
        map.entities.push(pin);
      }
    };

    loadMap();
  }, []);

  return <div ref={mapRef} style={{ width: "100%", height: "400px" }} />;
};

export default Map;
