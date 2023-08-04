import { useInfiniteQuery } from "@tanstack/react-query";
import { GameQuery } from "../App";
import Game from "../entities/Game";
import APIClient, { FetchResponse } from "../services/apiClient";
import { TWENTY_FOUR_HOURS_MS } from "../data/constants";

const apiClient = new APIClient<Game>("/games");

const useGames = (gameQuery: GameQuery) =>
    useInfiniteQuery<FetchResponse<Game>, Error>({
        queryKey: ["games", gameQuery],
        queryFn: ({ pageParam = 1 }) =>
            apiClient.getAll({
                params: {
                    genres: gameQuery.genre?.id,
                    parent_platforms: gameQuery.platform?.id,
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
