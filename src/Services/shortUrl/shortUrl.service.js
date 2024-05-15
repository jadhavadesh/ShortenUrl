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
  return http.post(`${process.env.PROD_URL}/api/shorten`, url);
}

// get all urls
function getAllUrlsService(url) {
    return axios.get(`${process.env.PROD_URL}/api/urls`);
}

// Update short code
function updateShortCodeService(payload) {
    return axios.post(`${process.env.PROD_URL}/api/update-short-url`, payload);
}


 

