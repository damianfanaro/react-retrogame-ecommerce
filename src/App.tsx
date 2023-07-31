import { useState } from "react";
import { Grid, GridItem, HStack, Show } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import GameGrid from "./components/GameGrid";
import GenreList from "./components/GenreList";
import PlatformSelector from "./components/PlatformSelector";
import { Genre } from "./hooks/useGenres";
import { Platform } from "./hooks/usePlatforms";
import SortSelector from "./components/SortSelector";

export interface GameQuery {
    genre: Genre | null;
    platform: Platform | null;
    sortOder: string;
}

function App() {
    const [gameQuery, setGameQuery] = useState<GameQuery>({} as GameQuery);

    return (
        <Grid
            templateAreas={{ base: `"nav" "main" "footer"`, lg: `"nav nav" "aside main" "footer footer"` }}
            templateColumns={{ base: "1fr", lg: "200px 1fr" }}
        >
            <GridItem area="nav">
                <NavBar />
            </GridItem>
            <Show above="lg">
                <GridItem area="aside" paddingX={5}>
                    <GenreList selectedGenre={gameQuery.genre} onSelectGenre={(genre) => setGameQuery({ ...gameQuery, genre })} />
                </GridItem>
            </Show>
            <GridItem area="main">
                <HStack spacing={5} paddingLeft={9}>
                    <PlatformSelector
                        selectedPlatform={gameQuery.platform}
                        onSelectPlatform={(platform) => setGameQuery({ ...gameQuery, platform })}
                    />
                    <SortSelector sortOrder={gameQuery.sortOder} onSelectSortOrder={(sortOder) => setGameQuery({ ...gameQuery, sortOder })} />
                </HStack>
                <GameGrid gameQuery={gameQuery} />
            </GridItem>
            <GridItem area="footer">Footer</GridItem>
        </Grid>
    );
}

export default App;
