import { useInfiniteQuery } from "@tanstack/react-query";
import { GameQuery } from "../App";
import { TWENTY_FOUR_HOURS_MS } from "../data/constants";
import Game from "../entities/Game";
import APIClient, { FetchResponse } from "../services/apiClient";

const apiClient = new APIClient<Game>("/games");

const useGames = (gameQuery: GameQuery) =>
    useInfiniteQuery<FetchResponse<Game>, Error>({
        queryKey: ["games", gameQuery],
        queryFn: ({ pageParam = 1 }) =>
            apiClient.getAll({
                params: {
                    genres: gameQuery.genreId,
                    parent_platforms: gameQuery.platformId,
                    ordering: gameQuery.sortOder,
                    search: gameQuery.searchText,
                    page: pageParam,
                },
            }),
        keepPreviousData: true,
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.next ? allPages.length + 1 : undefined;
        },
        staleTime: TWENTY_FOUR_HOURS_MS,
    });

export default useGames;
