import { useQuery } from "@tanstack/react-query";
import { CACHE_KEY_GENRES, GENRES } from "../data/constants";
import APIClient from "../services/apiClient";
import Genre from "../entities/Genre";
import ms from "ms";

const apiClient = new APIClient<Genre>("/genres");

const useGenres = () =>
    useQuery({
        queryKey: CACHE_KEY_GENRES,
        queryFn: apiClient.getAll,
        staleTime: ms("24h"),
        initialData: GENRES,
    });

export const useFindGenres = (id?: number) => {
    const { data: genres } = useGenres();
    return genres?.results.find((p) => p.id === id);
};

export default useGenres;
