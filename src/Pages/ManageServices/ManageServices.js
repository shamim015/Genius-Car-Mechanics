import React, { useState, useEffect } from 'react';

const ManageServices = () => {
    const [services, setServices] = useState([]);
    useEffect(() => {
        fetch('https://warm-gorge-55718.herokuapp.com/services')
            .then(response => response.json())
            .then(data => setServices(data))
    }, [])

    const handleDelete = id => {
        const url = `https://warm-gorge-55718.herokuapp.com/services/${id}`;
        fetch(url, {
            method: 'DELETE'

        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.deletedCount) {
                    alert('deleted')
                    const remaining = services.filter(service => service._id !== id);
                    setServices(remaining);
                }

            })
    }
    return (
        <div>
            <h2>Manage Services</h2>
            {
                services.map(service => <div key={service._id} >
                    <h3>{service.Name}</h3>
                    <button onClick={() => handleDelete(service.id)}>Delete</button>
                </div>)
            }
        </div>
    );
};

export default ManageServices;