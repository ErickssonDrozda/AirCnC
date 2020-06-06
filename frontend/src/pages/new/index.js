import React, { useState, useMemo } from 'react';
import camera from '../../assets/camera.svg';
import './styles.css';
import api from '../../services/api';

export default function New({ history })
{
    const [company, setCompany] = useState('');
    const [techs, setTech] = useState('');
    const [price, setPrice] = useState('');
    const [thumbnail, setThumbnail] = useState(null);
    const preview = useMemo(
        () => {
            return thumbnail ? URL.createObjectURL(thumbnail) : null;
        }, [thumbnail]
    );


    async function handleSubmit(event)
    {
        event.preventDefault();
        
        const data = new FormData();
        const user_id = localStorage.getItem('user');

        data.append('thumbnail', thumbnail);
        data.append('company', company);
        data.append('price', price);
        data.append('techs', techs);

        await api.post('/spots', data,
        { 
            headers: { user_id }
        }) 

        history.push('/dashboard');
    }

    return (
        <form onSubmit={handleSubmit}>
            <label 
                id="thumbnail" 
                style={{ backgroundImage: `url(${preview})` }}
                className={thumbnail ? 'has-thumbnail' : ''}
                >
                    <input type="file" onChange={event => setThumbnail(event.target.files[0])} />
                <img src={camera} alt="Select img"/>
            </label>

            <label htmlFor="company">BUSINESS</label>
            <input 
                id="company"
                placeholder="Your fascinant business"
                value={company}
                onChange={event => setCompany(event.target.value)} 
            />

            <label htmlFor="techs">TECHNOLOGIES <span>(separated by commas ',')</span> </label>
            <input 
                id="techs"
                placeholder="Which technologies do you use"
                value={techs}
                onChange={event => setTech(event.target.value)} 
            />

            <label htmlFor="price">VALUE PER DAY <span>(blank if is free)</span> </label>
            <input 
                id="price"
                placeholder="amount charged per day"
                value={price}
                onChange={event => setPrice(event.target.value)} 
            />
            <button className="btn" type="submit">Create</button>
        </form>
    );
}