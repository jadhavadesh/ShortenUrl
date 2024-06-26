import axios from "axios";
import http from "../http";

// Export all Auth Service
export const shortUrlService = {
    shortenUrlService,
    getAllUrlsService,
    updateShortCodeService
};

// shorte url Service
function shortenUrlService(url) {
  return http.post(`${process.env.REACT_APP_SERVER_URL}/api/shorten`, url);
}

// get all urls
function getAllUrlsService(url) {
    return http.get(`${process.env.REACT_APP_SERVER_URL}/api/urls`);
}

// Update short code
function updateShortCodeService(payload) {
    return http.post(`${process.env.REACT_APP_SERVER_URL}/api/update-short-url`, payload);
}


 

