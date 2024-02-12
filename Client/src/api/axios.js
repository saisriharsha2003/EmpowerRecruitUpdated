import axios from "axios";

export default axios.create({
    baseURL: 'https://final-year-project-server.vercel.app/',
    withCredentials: true
});

export const axiosPrivate = axios.create({
    baseURL: 'https://final-year-project-server.vercel.app/',
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});
