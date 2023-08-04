import { useState } from "react";
import { Box, Flex, Grid, GridItem, Show } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import GameGrid from "./components/GameGrid";
import GenreList from "./components/GenreList";
import PlatformSelector from "./components/PlatformSelector";
import SortSelector from "./components/SortSelector";
import GameHeading from "./components/GameHeading";
import Genre from "./entities/Genre";
import Platform from "./entities/Platform";

export interface GameQuery {
    genre: Genre | null;
    platform: Platform | null;
    sortOder: string;
    searchText: string;
    pageSize: number;
}

function App() {
    const [gameQuery, setGameQuery] = useState<GameQuery>({ pageSize: 10 } as GameQuery);

    return (
        <Grid
            templateAreas={{ base: `"nav" "main" "footer"`, lg: `"nav nav" "aside main" "footer footer"` }}
            templateColumns={{ base: "1fr", lg: "200px 1fr" }}
        >
            <GridItem area="nav">
                <NavBar onSearch={(searchText) => setGameQuery({ ...gameQuery, searchText: searchText })} />
            </GridItem>
            <Show above="lg">
                <GridItem area="aside" paddingX={5}>
                    <GenreList selectedGenre={gameQuery.genre} onSelectGenre={(genre) => setGameQuery({ ...gameQuery, genre })} />
                </GridItem>
            </Show>
            <GridItem area="main">
                <Box paddingLeft={9} paddingRight={9}>
                    <GameHeading gameQuery={gameQuery} />
                    <Flex>
                        <Box marginRight={5}>
                            <PlatformSelector
                                selectedPlatform={gameQuery.platform}
                                onSelectPlatform={(platform) => setGameQuery({ ...gameQuery, platform })}
                            />
                        </Box>
                        <SortSelector sortOrder={gameQuery.sortOder} onSelectSortOrder={(sortOder) => setGameQuery({ ...gameQuery, sortOder })} />
                    </Flex>
                    <GameGrid gameQuery={gameQuery} />
                </Box>
            </GridItem>
            <GridItem area="footer">Footer</GridItem>
        </Grid>
    );
}

export default App;
