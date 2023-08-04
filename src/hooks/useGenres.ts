import { useQuery } from "@tanstack/react-query";
import { CACHE_KEY_GENRES, GENRES, TWENTY_FOUR_HOURS_MS } from "../data/constants";
import APIClient from "../services/apiClient";
import Genre from "../entities/Genre";

const apiClient = new APIClient<Genre>("/genres");

const useGenres = () =>
    useQuery({
        queryKey: CACHE_KEY_GENRES,
        queryFn: apiClient.getAll,
        staleTime: TWENTY_FOUR_HOURS_MS,
        initialData: { count: GENRES.length, results: GENRES },
    });

export default useGenres;
