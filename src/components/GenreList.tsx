import { Button, HStack, Heading, Image, List, ListItem, Spinner } from "@chakra-ui/react";
import getCroppedImageUrl from "../services/imageUrls";
import useGenres from "../hooks/useGenres";
import Genre from "../entities/Genre";

interface Props {
    onSelectGenre: (genre: Genre) => void;
    selectedGenreId?: number;
}

const GenreList = ({ onSelectGenre, selectedGenreId }: Props) => {
    const { data: genres, isLoading, error } = useGenres();

    if (error) return null;

    if (isLoading) return <Spinner />;

    return (
        <>
            <Heading fontSize="2xl" marginTop={9} marginBottom={3}>
                Genres
            </Heading>
            <List>
                {genres?.results.map((genre) => (
                    <ListItem key={genre.id}>
                        <HStack paddingY="10px" paddingX="2px">
                            <Image boxSize="32px" borderRadius={8} objectFit="cover" src={getCroppedImageUrl(genre.image_background)} />
                            <Button
                                fontWeight={genre.id === selectedGenreId ? "bold" : "normal"}
                                colorScheme={genre.id === selectedGenreId ? "whatsapp" : "normal"}
                                fontSize="lg"
                                variant="link"
                                onClick={() => onSelectGenre(genre)}
                                whiteSpace="normal"
                                textAlign="left"
                            >
                                {genre.name}
                            </Button>
                        </HStack>
                    </ListItem>
                ))}
            </List>
        </>
    );
};

export default GenreList;
