import {
  Button,
  Flex,
  Icon,
  Image,
  Input,
  SimpleGrid,
  Stack,
  Text,
  Link as ChakraLink
} from '@chakra-ui/react'
import Header from 'components/Header'
import { useAlbums } from 'contexts/AlbumsContext'
import { useState } from 'react'
import { RiSearchLine } from 'react-icons/ri'
import { Link as RouterLink } from 'react-router-dom'

export function Home() {
  const [artist, setArtist] = useState('')

  const { albums, fetchAlbums } = useAlbums()

  const handleSearch = async () => {
    await fetchAlbums(artist)
  }

  return (
    <Flex w="100vw" flexDir={'column'}>
      <Header />

      <Stack direction={'row'} w="inherit" justify="center" mt={20}>
        <Flex
          as="label"
          flex={1}
          maxW={650}
          border="1px solid"
          borderColor="gray.200"
          borderRadius="md"
          p={4}
        >
          <Input
            placeholder="Search a Music"
            px="4"
            mr="4"
            variant={'unstyled'}
            value={artist}
            onChange={({ target }) => setArtist(target.value)}
          />
          <Icon as={RiSearchLine} fontSize="20" />
        </Flex>
        <Button
          type="button"
          h="58px"
          w="150px"
          colorScheme="linkedin"
          onClick={handleSearch}
        >
          Search
        </Button>
      </Stack>

      {albums.length > 0 && (
        <Flex w="inherit" mt={30} p={20} flexDir="column">
          <SimpleGrid minChildWidth="240px" gap={4}>
            {albums.map((album, i) => (
              <ChakraLink
                to={`/album/${album.collectionId}`}
                as={RouterLink}
                key={i}
                w="240px"
                borderRadius={'md'}
                mt={10}
                boxShadow="2xl"
                _hover={{
                  transform: 'scale(1.05)'
                }}
                transition="ease 0.3s"
              >
                <Stack spacing={4} textAlign="center">
                  <Image
                    src={album.artworkUrl100}
                    w="100%"
                    borderTopRadius="md"
                  />
                  <Text px={4} fontWeight="bold">
                    {album.collectionName}
                  </Text>
                  <Text
                    px={4}
                    color="gray.500"
                    fontWeight={'medium'}
                    fontStyle="italic"
                  >
                    {album.artistName}
                  </Text>
                </Stack>
              </ChakraLink>
            ))}
          </SimpleGrid>
        </Flex>
      )}
    </Flex>
  )
}
