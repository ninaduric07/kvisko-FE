import axios from "axios";

const Fetcher = (url) => axios.get(url, { withCredentials: true }).then(res => res.data);

export default Fetcher;