import { Grid, GridItem, Show } from "@chakra-ui/react";
import NavBar from "./components/NavBar";

function App() {
    return (
        <Grid templateAreas={{ base: `"nav" "main" "footer"`, lg: `"nav nav" "aside main" "footer footer"` }}>
            <GridItem area="nav">
                <NavBar />
            </GridItem>
            <Show above="lg">
                <GridItem area="aside">Aside</GridItem>
            </Show>
            <GridItem area="main">Main</GridItem>
            <GridItem area="footer">Footer</GridItem>
        </Grid>
    );
}

export default App;
