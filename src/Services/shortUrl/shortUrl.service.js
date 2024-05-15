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
  return http.post(`https://shorten-url-backend-sigma.vercel.app/api/shorten`, url);
}

// get all urls
function getAllUrlsService(url) {
    return http.get(`https://shorten-url-backend-sigma.vercel.app/api/urls`);
}

// Update short code
function updateShortCodeService(payload) {
    return http.post(`https://shorten-url-backend-sigma.vercel.app/api/update-short-url`, payload);
}


 

