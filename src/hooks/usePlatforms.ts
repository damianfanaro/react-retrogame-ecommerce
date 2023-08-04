import { useQuery } from "@tanstack/react-query";
import { CACHE_KEY_PLATFORMS, PLATFORMS } from "../data/constants";
import APIClient from "../services/apiClient";
import Platform from "../entities/Platform";
import ms from "ms";

const apiClient = new APIClient<Platform>("/platforms/lists/parents");

const usePlatforms = () =>
    useQuery({
        queryKey: CACHE_KEY_PLATFORMS,
        queryFn: apiClient.getAll,
        staleTime: ms("24h"),
        initialData: PLATFORMS,
    });

export const useFindPlatform = (id?: number) => {
    const { data: platforms } = usePlatforms();
    return platforms?.results.find((p) => p.id === id);
};

export default usePlatforms;
