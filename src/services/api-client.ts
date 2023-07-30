import axios from "axios";

export default axios.create({
    baseURL: "https://api.rawg.io/api",
    params: {
        key: "93e34aaacc0d4ca894408815e056d4ab"
    }
});