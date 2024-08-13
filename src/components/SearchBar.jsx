import React, { useState } from 'react';
import DarkModeToggle from './darkModeToggle/darkModeToggle';

const SearchBar = ({ setCity }) => {
    const [input, setInput] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setCity(input);
    };
    
    return (
        <div>
            <div id="liveAlertPlaceholder" ></div>
            <div className='container d-flex'>
                <form className='input-group' onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className='form-control'
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Enter city"
                    />
                    <button className='btn btn-outline-secondary me-3' type="submit">Search</button>
                </form>
                <DarkModeToggle />
            </div>
        </div>
    );
};

export default SearchBar;
