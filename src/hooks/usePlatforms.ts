import { useQuery } from "@tanstack/react-query";
import { CACHE_KEY_PLATFORMS, PLATFORMS, TWENTY_FOUR_HOURS_MS } from "../data/constants";
import APIClient from "../services/apiClient";
import Platform from "../entities/Platform";

const apiClient = new APIClient<Platform>("/platforms/lists/parents");

const usePlatforms = () =>
    useQuery({
        queryKey: CACHE_KEY_PLATFORMS,
        queryFn: apiClient.getAll,
        staleTime: TWENTY_FOUR_HOURS_MS,
        initialData: { count: PLATFORMS.length, results: PLATFORMS },
    });

export default usePlatforms;
