import { FC } from 'react';
import { Flex } from '@chakra-ui/layout';

import { PostArea } from "../components/PostArea";
import { HeaderBar } from 'components/HeaderBar';
import { Content } from "../components/Content";

export const Home: FC = () => {
    return (
        <Flex flex={1} flexDir={"column"} >
            <HeaderBar title={"Home"} />
            <PostArea />
            <Content key={"1"} user={null} />
        </Flex>
    )
}

export default Home;