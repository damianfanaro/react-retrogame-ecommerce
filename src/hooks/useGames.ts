import { useQuery } from "@tanstack/react-query";
import { GameQuery } from "../App";
import APIClient, { FetchResponse } from "../services/apiClient";
import Game from "../entities/Game";

const apiClient = new APIClient<Game>("/games");

const useGames = (gameQuery: GameQuery) =>
    useQuery<FetchResponse<Game>, Error>({
        queryKey: ["games", gameQuery],
        queryFn: () =>
            apiClient.getAll({
                params: {
                    genres: gameQuery.genre?.id,
                    platform: gameQuery.platform?.id,
                    ordering: gameQuery.sortOder,
                    search: gameQuery.searchText,
                },
            }),
    });

export default useGames;
