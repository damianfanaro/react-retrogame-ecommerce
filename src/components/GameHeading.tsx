import { Heading } from "@chakra-ui/react";
import { GameQuery } from "../App";
import { useFindPlatform } from "../hooks/usePlatforms";
import { useFindGenres } from "../hooks/useGenres";

interface Props {
    gameQuery: GameQuery;
}

const GameHeading = ({ gameQuery }: Props) => {
    const platform = useFindPlatform(gameQuery.platformId);
    const genre = useFindGenres(gameQuery.genreId);
    const heading = `${platform?.name || ""} ${genre?.name || ""} Games`;

    return (
        <Heading as="h1" marginY={5}>
            {heading}
        </Heading>
    );
};

export default GameHeading;
