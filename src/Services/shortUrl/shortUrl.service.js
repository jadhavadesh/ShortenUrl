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
  return http.post(`/api/shorten`, url);
}

// get all urls
function getAllUrlsService(url) {
    return http.get(`/api/urls`);
}

// Update short code
function updateShortCodeService(payload) {
    return http.post(`/api/update-short-url`, payload);
}


 

