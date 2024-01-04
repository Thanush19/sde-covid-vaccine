import { useState, useEffect } from 'react';
import axios from 'axios';

const Booking = () => {
  const [hospitals, setHospitals] = useState(
    JSON.parse(localStorage.getItem('hospitals')) || [
      { id: 1, name: 'Stanley Hospital ', availableSlots: 5 },
      { id: 2, name: 'Apollo Hospital', availableSlots: 3 },
      { id: 3, name: 'Hospital C', availableSlots: 7 },
      { id: 4, name: 'Hospital D', availableSlots: 2 },
      { id: 5, name: 'Hospital E', availableSlots: 4 },
    ]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/vaccines'); // Replace with your actual API endpoint
        setHospitals(response.data);
        localStorage.setItem('hospitals', JSON.stringify(response.data));
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);

  const handleSlotClick = async (hospitalId) => {
    try {
      const response = await axios.post('http://localhost:3001/bookSlot', {
        hospitalId,
      });

      setHospitals(response.data);
      localStorage.setItem('hospitals', JSON.stringify(response.data));
    } catch (error) {
      console.error('Error booking slot', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Available Hospitals</h2>
      <div className="row">
        {hospitals.map((hospital) => (
          <div key={hospital.id} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{hospital.name}</h5>
                <p className="card-text">Available Slots: {hospital.availableSlots}</p>
                {hospital.availableSlots > 0 && (
                  <button
                    className="btn btn-primary"
                    onClick={() => handleSlotClick(hospital.id)}
                  >
                    Book a Slot
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Booking;
