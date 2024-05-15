// App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import { shortUrlActions } from './Redux/shortUrl/shortUrl.actions';
import { useAppDispatch, useAppSelector } from './Redux/Store/store';
import { shortUrlActions } from './Redux/shortUrl/shortUrl.actions';

function ShortUrl() {
    const [inputUrl, setInputUrl] = useState('');
    const [shortenedUrl, setShortenedUrl] = useState('');
    const [myUrls, setMyUrls] = useState([]);
    const [editShortcode, setEditShortcode] = useState(false);
    const [editedShortcode, setEditedShortcode] = useState('')
    const [inputError, setInputError] = useState(false);

    const dispatch = useAppDispatch();

    // https://shorten-url-backend-sigma.vercel.app
    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (shortenedUrl) {
            setEditedShortcode(shortenedUrl.substring(shortenedUrl.lastIndexOf('/') + 1));
        }
    }, [shortenedUrl])

    const fetchData = async () => {
        dispatch(shortUrlActions.getAllUrlsAction()).then((res) => {
            if (res.payload.status === 200) {
                setMyUrls(res.payload.data.urls)
            } else {
                setMyUrls([]);
            }
        })
    };

    console.log(myUrls)

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(shortUrlActions.shortenUrlAction({ url: inputUrl })).then((res) => {
            if (res.payload.status === 200) {
                setShortenedUrl(res.payload.data.url);
            } else {
                console.error('Error shortening URL');
                window.alert('Error shortening URL');
            }
        })

    };

    const HandleUpdateShortCode = (e) => {
        const value = e.target.value
        setEditedShortcode(value);
        const filterdCode = myUrls.filter(res => res.shortUrl === value);
        if (filterdCode.length) {
            setInputError(true)
        } else {
            setInputError(false)
        }
    }

    const handleUpdate = async () => {
        const stringAfterLastSlash = shortenedUrl.substring(shortenedUrl.lastIndexOf('/') + 1);

        const payload = {
            editedShortcode: editedShortcode,
            originalShortcode: stringAfterLastSlash
        }

        dispatch(shortUrlActions.updateShortCodeAction(payload)).then((res) => {
            if (res.payload.status === 200) {
                setShortenedUrl(res.payload.data.url);
                setEditShortcode(false)
                fetchData();
            } else {
                window.alert("Updating short code failed")
            }
        })
    }

    return (
        <>
            <div>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={inputUrl}
                        onChange={(e) => setInputUrl(e.target.value)}
                    />
                    <button type="submit">Shorten URL</button>
                </form>
                {editShortcode ? (
                    <>
                        <div>
                            <input type='text' value={editedShortcode} onChange={(e) => HandleUpdateShortCode(e)} />
                            {inputError && <span style={{ color: "red" }}> Entered short code is already exists</span>}
                        </div>
                        <button onClick={handleUpdate}>submit</button>
                    </>
                ) : (
                    shortenedUrl && (
                        <>
                            <span>Shortened URL:
                                <a
                                    href={'#'}
                                    target='blank'
                                    onClick={(e) => {
                                        e.preventDefault();
                                        window.location.href = shortenedUrl
                                    }}
                                >
                                    {shortenedUrl}
                                </a></span>
                            <span><button onClick={() => setEditShortcode(true)}>Edit shortcode</button></span>
                        </>
                    )
                )}


            </div>
            <div>
                {myUrls && myUrls.length ? myUrls.map((res) => (
                    <p>{res?.shortUrl}</p>
                )) : (
                    <p>No data found</p>
                )}
            </div>
        </>
    );
}

export default ShortUrl;
