import React, { useState } from 'react';
import api from '../../services/api';

export default function Login({ history })
{
    const [email, setEmail] = useState('');

    async function handleSubmit(event){
      event.preventDefault();
      
      const response = await api.post('/sessions', { email }).catch(function (error) { console.log(error); });
      
      const { _id } = response.data;
  
      localStorage.setItem('user', _id);
      history.push('/dashboard');
    }

    return (
        <>
            <p>
                Offer <strong>spots</strong> and find <strong>talent</strong> for your company
            </p>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">E-mail</label>
                <input 
                    type="email" 
                    id="email"
                    value={email}
                    placeholder="Choose your best email"
                    onChange={event => setEmail(event.target.value)}
                />
                <button className="btn" type="submit">Go</button>
            </form>
        </>
  )
}