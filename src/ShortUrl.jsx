// App.js
import React, { useState } from 'react';
import axios from 'axios';

function ShortUrl() {
    const [inputUrl, setInputUrl] = useState('');
    const [shortenedUrl, setShortenedUrl] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3080/api/user/shorten', { url: inputUrl });
            setShortenedUrl(response.data.url);
        } catch (error) {
            console.error('Error shortening URL:', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={inputUrl}
                    onChange={(e) => setInputUrl(e.target.value)}
                />
                <button type="submit">Shorten URL</button>
            </form>
            {shortenedUrl && <span>Shortened URL:
                <a
                    href={'#'}
                    target='blank'
                    onClick={(e) => {
                        e.preventDefault();
                        window.location.href = shortenedUrl
                    }}
                >
                    {shortenedUrl}
                </a></span>}
        </div>
    );
}

export default ShortUrl;
