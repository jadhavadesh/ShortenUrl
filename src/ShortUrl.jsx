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
    const [qrUrl, setQrUrl] = useState('');
    const [showModal, setShowModal] = useState(false);

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
            if (res?.payload?.status === 200) {
                setMyUrls(res?.payload?.data?.urls)
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
                setQrUrl(res.payload.data.qrUrl);
                fetchData()
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

    const copyToClipboard = (text) => {
        // Create a temporary textarea element
        const textarea = document.createElement('textarea');

        // Set the value of the textarea to the provided text
        textarea.value = text;

        // Append the textarea to the document body
        document.body.appendChild(textarea);

        // Select the text inside the textarea
        textarea.select();

        // Execute the browser's built-in copy command
        document.execCommand('copy');

        // Remove the textarea from the document body
        document.body.removeChild(textarea);
    }


    return (
        <>
            <div className='container'>
                <div className='p-10' style={{ border: "1px solid gray" }}>
                    {!shortenedUrl && (
                        <form onSubmit={handleSubmit}>
                            <div className='mb-5'>
                                <input value={inputUrl} onChange={(e) => setInputUrl(e.target.value)} type="text" id="url" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Pastr your url here" required />
                            </div>
                            <button type="submit" class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Shorten URL</button>
                        </form>
                    )}
                    {
                        editShortcode
                            ? (
                                <>
                                    <div className='p-10 border border-grey-500'>
                                        <div className="mb-6">

                                            <label for="input-group-1" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Edit short code only</label>
                                            <input value={editedShortcode} onChange={(e) => HandleUpdateShortCode(e)} type="text" id="url" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Pastr your url here" required />
                                            {inputError &&
                                                <p class="mt-2 text-sm text-red-600 dark:text-red-500"><span class="font-medium">Oh, snapp!</span> Some error message.</p>}
                                        </div>
                                        <button onClick={handleUpdate} class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">submit</button>
                                        <button onClick={() => {
                                            setShortenedUrl(false)
                                            setInputUrl("");
                                            setEditShortcode(false)
                                        }}
                                            class="mt-5 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                                            New Url
                                        </button>
                                    </div>


                                    {/* <div>
                            <input type='text' value={editedShortcode} onChange={(e) => HandleUpdateShortCode(e)} />
                            {inputError && <span style={{ color: "red" }}> Entered short code is already exists</span>}
                        </div>
                        <button onClick={handleUpdate}>submit</button> */}
                                </>
                            ) : (
                                shortenedUrl && (
                                    <>
                                        <label for="input-group-1" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Here is your shorted url</label>
                                        <div class="flex">
                                            <div class="relative w-full">
                                                <input value={shortenedUrl} type="search" id="search-dropdown" class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded rounded-lg rounded-lg-gray-100 rounded-lg-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Search" required />
                                                <button onClick={() => copyToClipboard(shortenedUrl)} data-copy-to-clipboard-target="npm-install-copy-button" data-tooltip-target="tooltip-copy-npm-install-copy-button" class="absolute end-2 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg p-2 inline-flex items-center justify-center">
                                                    <span id="default-icon">
                                                        <svg class="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                                            <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
                                                        </svg>
                                                    </span>
                                                    <span id="success-icon" class="hidden inline-flex items-center">
                                                        <svg class="w-3.5 h-3.5 text-blue-700 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5" />
                                                        </svg>
                                                    </span>
                                                </button>
                                                <div id="tooltip-copy-npm-install-copy-button" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                                                    <span id="default-tooltip-message">Copy to clipboard</span>
                                                    <span id="success-tooltip-message" class="hidden">Copied!</span>
                                                    <div class="tooltip-arrow" data-popper-arrow></div>
                                                </div>
                                            </div>
                                        </div>
                                        <button onClick={() => setEditShortcode(true)} class="mt-5 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Edit short code</button>
                                        <button onClick={() => {
                                            setShortenedUrl(false)
                                            setInputUrl("")
                                        }}
                                            class="mt-5 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                                            New Url
                                        </button>

                                        <div className='flex justify-center mt-5'>
                                            <img src={qrUrl} />
                                        </div>
                                    </>
                                )
                            )}

                    {/* <div>
                {myUrls && myUrls.length ? myUrls.map((res) => (
                    <p>{res?.shortUrl}</p>
                )) : (
                    <p>No data found</p>
                )}
            </div> */}
                </div>

                <div className="">
                    <button
                        onClick={() => setShowModal(true)}
                        className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 mt-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                    >
                        View Links
                    </button>
                    {showModal && (
                        <div className="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-50 flex items-center justify-center">
                            <div className="p-5 w-3/4 bg-black rounded-lg flex flex-col gap-3 border">

                                <ul class="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400">
                                    {myUrls.length > 0 && myUrls.map((url) => (
                                        <li class="flex items-center justify-between">
                                            <span className='flex align-center gap-5'>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
                                                </svg>

                                                {url?.shortUrl}

                                            </span>
                                            <div>
                                                <button onClick={()=> copyToClipboard(`${process.env.REACT_APP_SERVER_URL}/${url.shortUrl}`)} className='px-5'>
                                                    <svg style={{color: 'pink'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                                                        <path fill-rule="evenodd" d="M7.502 6h7.128A3.375 3.375 0 0 1 18 9.375v9.375a3 3 0 0 0 3-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 0 0-.673-.05A3 3 0 0 0 15 1.5h-1.5a3 3 0 0 0-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6ZM13.5 3A1.5 1.5 0 0 0 12 4.5h4.5A1.5 1.5 0 0 0 15 3h-1.5Z" clip-rule="evenodd" />
                                                        <path fill-rule="evenodd" d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V9.375ZM6 12a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V12Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 15a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V15Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 18a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V18Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75Z" clip-rule="evenodd" />
                                                    </svg>

                                                </button>
                                                {/* <button>
                                                    <svg style={{color: 'peachpuff'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                                                        <path fill-rule="evenodd" d="M5.625 1.5H9a3.75 3.75 0 0 1 3.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 0 1 3.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 0 1-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875Zm5.845 17.03a.75.75 0 0 0 1.06 0l3-3a.75.75 0 1 0-1.06-1.06l-1.72 1.72V12a.75.75 0 0 0-1.5 0v4.19l-1.72-1.72a.75.75 0 0 0-1.06 1.06l3 3Z" clip-rule="evenodd" />
                                                        <path d="M14.25 5.25a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963A5.23 5.23 0 0 0 16.5 7.5h-1.875a.375.375 0 0 1-.375-.375V5.25Z" />
                                                    </svg>
                                                </button> */}
                                            </div>

                                        </li>
                                    ))}
                                    {!myUrls.length && (
                                        <li className=' flex justify-center'>
                                            No Records Found
                                        </li>
                                    )}
                                </ul>
                                <button onClick={()=> setShowModal(false)} className='px-3 py-2 bg-blue-500 rounded-lg text-white '>close</button>

                            </div>
                        </div>
                    )}
                </div>

            </div>
        </>
    );
}

export default ShortUrl;
