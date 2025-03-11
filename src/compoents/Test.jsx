import { useState, useEffect } from "react";

const Test = () => {
    const [userLocation, setUserLocation] = useState(null);
    const [nearbyLocations, setNearbyLocations] = useState([]);

    // Dummy location data (you can replace this with a backend API later)
    const locations = [
        { id: 1, name: "Tpoly", latitude: 19.213869, longitude: 72.864794 },
        { id: 2, name: "Virar Station", latitude: 19.452910, longitude: 72.812182 },
        { id: 3, name: "Satpala", latitude: 19.43377759, longitude: 72.77879690 },
    ];

    useEffect(() => {
      if ("geolocation" in navigator) {
          const watchId = navigator.geolocation.watchPosition(
              (position) => {
                  const userLat = position.coords.latitude;
                  const userLon = position.coords.longitude;

                  setUserLocation({ latitude: userLat, longitude: userLon });

                  // Filter locations within exactly 2 km
                  const nearby = locations.filter((loc) =>
                      getDistance(userLat, userLon, loc.latitude, loc.longitude) <= 2
                  );

                  setNearbyLocations(nearby);
              },
              (error) => {
                  console.error("Error getting location:", error.message);
              },
              { enableHighAccuracy: true, maximumAge: 5000, timeout: 5000 }
          );

          return () => navigator.geolocation.clearWatch(watchId);
      } else {
          console.error("Geolocation is not supported by this browser.");
      }
  }, []);

  // **Highly Accurate Distance Calculation Using Haversine Formula**
  function getDistance(lat1, lon1, lat2, lon2) {
      const R = 6371; // Radius of Earth in km
      const toRad = (deg) => deg * (Math.PI / 180);

      const dLat = toRad(lat2 - lat1);
      const dLon = toRad(lon2 - lon1);
      const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
          Math.sin(dLon / 2) * Math.sin(dLon / 2);

      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c; // Distance in km
  }

    return (
        <div className="p-4">
            <h2 className="text-lg font-bold">Your Location</h2>
            {userLocation ? (
                <p>
                    Latitude: {userLocation.latitude}, Longitude: {userLocation.longitude}
                </p>
            ) : (
                <p>Fetching location...</p>
            )}

            <h2 className="text-lg font-bold mt-4">Nearby Locations (Within 5km)</h2>
            <ul>
                {nearbyLocations.length > 0 ? (
                    nearbyLocations.map((loc) => (
                        <li key={loc.id}>
                            {loc.name} ({loc.latitude}, {loc.longitude})
                        </li>
                    ))
                ) : (
                    <p>No nearby locations found.</p>
                )}
            </ul>
        </div>
    );
};

export default Test;
