import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import './styles.css'
import socketio from 'socket.io-client';

export default function Dashboard()
{
    const[spots, setSpots] = useState([]);
    const[requests, setRequests] = useState([]);

    const user_id = localStorage.getItem("user");
    
    const socket = useMemo(() => socketio('http://localhost:3333', {
        query: { user_id }
     }), [user_id]);

    useEffect(() => {
        socket.on('booking_request', data => {
            setRequests([...requests, data]);
        })
        //socket.emit('omni', 'AUU');
    }, [requests, socket]);

    useEffect(()=> {
        async function loadSpots()
        {
            const user_id = localStorage.getItem("user");
            const response = await api.get('/dashboard', {
                headers: { user_id } 
            });
            setSpots(response.data);
        }
        loadSpots();
    }, []);

    async function handleAccept(id)
    {
        await api.post(`/bookings/${id}/approvals`);
        setRequests(requests.filter(request => request._id != id));
    }

    async function handleReject(id)
    {
        await api.post(`/bookings/${id}/rejections`);
        setRequests(requests.filter(request => request._id != id));
    }

    return (
            <>
                <ul className="notifications">
                    {requests.map(request => (
                        <li key={request._id} >
                            <p> <strong>{request.user.email}
                                </strong> is requesting a reservation in <strong>{request.spot.company}</strong> for the day: <strong>{request.date}</strong>
                            </p>
                            <button onClick={() => handleAccept(request._id)} className="accept" >Accept</button>
                            <button onClick={() => handleReject(request._id)} className="reject" >Reject</button>
                        </li>
                    ))}
                </ul>
                <ul className="spot-list">
                    {spots.map(spot =>(
                        <li key={spot._id}>
                            <header style={{ backgroundImage: `url(${spot.thumbnail_url})` }} ></header>
                            <strong>
                                {spot.company}
                            </strong>
                            <span>
                                {spot.price ? `R$${spot.price}/dia` : 'FREE'}
                            </span>
                        </li>
                    ))}
                </ul>
                <Link to="/new">
                    <button className="btn">Create new spot</button>                       
                </Link>
            </>
    );
}