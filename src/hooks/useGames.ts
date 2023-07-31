import { GameQuery } from "../App";
import useData from "./useData";
import { Genre } from "./useGenres";
import { Platform } from "./usePlatforms";

export interface Game {
    id: number;
    name: string;
    background_image: string;
    parent_platforms: { platform: Platform }[];
    metacritic: number;
}

const useGames = (gameQuery: GameQuery) => {
    const params = {
        params: {
            genres: gameQuery.genre?.id,
            platform: gameQuery.platform?.id,
        },
    };
    const dependencies = [gameQuery];
    return useData<Game>("/games", params, dependencies);
};

export default useGames;
