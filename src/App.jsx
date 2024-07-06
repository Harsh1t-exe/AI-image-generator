import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
    const [query, setQuery] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [error, setError] = useState('');

    const accessKey = 'WQwiebllruf6DXOsgN5Ap1yOK-gv00Oh51LHHHuHSYw'; 

    const fetchImage = async () => {
        try {
            const response = await axios.get(`https://api.unsplash.com/search/photos`, {
                params: {
                    query: query,
                    per_page: 1,
                    client_id: accessKey
                }
            });

            if (!response.data.results.length) {
                throw new Error('No image found');
            }

            const imageUrl = response.data.results[0].urls.regular;
            setImageUrl(imageUrl);
            setError('');
        } catch (error) {
            console.error('Error fetching image:', error);
            setError('Failed to fetch image. Please try again.');
            setImageUrl('');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchImage();
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>AI Image Generator</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Enter search query..."
                    />
                    <button type="submit">Search</button>
                </form>
                {error && <p className="error-message">{error}</p>}
                {imageUrl && <img src={imageUrl} alt="Image Result" className="image-result" />}
            </header>
        </div>
    );
};

export default App;
