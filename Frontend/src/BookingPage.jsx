import { useState, useEffect } from "react";
import axios from "axios";

const Booking = () => {
  const [hospitals, setHospitals] = useState(
    JSON.parse(localStorage.getItem("hospitals")) || [
      { id: 1, name: " Hospital 1", availableSlots: 5 },
      { id: 2, name: " Hospital", availableSlots: 3 },
      { id: 3, name: "Hospital C", availableSlots: 7 },
      { id: 4, name: "Hospital D", availableSlots: 2 },
      { id: 5, name: "Hospital E", availableSlots: 4 },
    ]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/vaccines"); // Replace with your actual API endpoint
        setHospitals(response.data);
        localStorage.setItem("hospitals", JSON.stringify(response.data));
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  const handleSlotClick = async (hospitalId) => {
    try {
      const response = await axios.post("http://localhost:3001/bookSlot", {
        hospitalId,
      });

      setHospitals(response.data);
      localStorage.setItem("hospitals", JSON.stringify(response.data));
    } catch (error) {
      console.error("Error booking slot", error);
    }
  };

  return (
    <div className="container mx-auto mt-5">
      <h2 className="text-3xl font-bold mb-4">Available Hospitals</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {hospitals.map((hospital) => (
          <div key={hospital.id} className="max-w-md mx-auto">
            <div className="bg-white p-6 shadow-md rounded-md">
              <h5 className="text-xl font-semibold mb-4">{hospital.name}</h5>
              <p className="text-gray-600">
                Available Slots: {hospital.availableSlots}
              </p>
              {hospital.availableSlots > 0 && (
                <button
                  className="mt-4 bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-full"
                  onClick={() => handleSlotClick(hospital.id)}
                >
                  Book a Slot
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Booking;
