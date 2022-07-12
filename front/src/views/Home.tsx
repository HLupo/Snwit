import { Flex, Box, Heading } from '@chakra-ui/layout';
import { FC } from 'react';
import PostArea from "../components/PostArea";
import Content from "../components/Content";

export const Home: FC = () => {

    return (
        <Flex flex={1} flexDir={"column"} >
            <Box borderBottom={"1px"} borderColor={"lightgray"} padding={"0.5em"} shadow={"sm"}>
                <Heading size={"lg"}>{"Home"}</Heading >
            </Box>
            <PostArea />
            <Content user={null} />
        </Flex>
    )
}

export default Home;