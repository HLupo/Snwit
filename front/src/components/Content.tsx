import { setRefreshPosts } from 'store/slices/appSlice';
import { useDispatch, useSelector } from 'react-redux';
import { FC, useCallback, useState } from 'react';
import { Box, Flex, Stack } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';
import { PostItem, Post } from './PostItem';
import { RootState } from 'store/store';
import { useAsync } from "./hooks";
import { User } from 'store/slices/userSlice';


type ContentProps = { user: User | null };

export const Content: FC<ContentProps> = ({ user }) => {
    const [isRefreshing, triggerRefresh] = useState(true);
    const [posts, setPosts] = useState<Post[]>([]);
    const refreshPosts = useSelector((state: RootState) => state.app.refreshPosts);
    const dispatch = useDispatch();

    const fetchPosts = useCallback(async () => {
        if (!isRefreshing) return;

        if (!user) {
            const res = await fetch('http://localhost:8080/posts', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            }).finally(() => triggerRefresh(false));
            if (res.status === 200) {
                const data: Post[] = await res.json();
                console.log(data);
                setPosts(data);
            }
            else console.log("Error");
        } else {
            const res = await fetch('http://localhost:8080/post/' + user._id, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            }).finally(() => triggerRefresh(false));
            if (res.status === 200) {
                const data: Post[] = await res.json();
                console.log(data);
                setPosts(data);
            }
            else console.log("Error");
        }

    }, [isRefreshing, user]);

    useAsync(async (isActive) => {
        if (isActive())
            fetchPosts();
    }, [fetchPosts]);


    useAsync(async (isActive) => {
        if (isActive()) { triggerRefresh(true); dispatch(setRefreshPosts(false)); }
    }, [refreshPosts, user]);

    return (
        <Flex flex={1} justifyContent={"center"} overflowY={"scroll"} marginBottom={"1em"}>
            {isRefreshing ? <Spinner
                alignSelf={"center"}
                thickness={"4px"}
                speed={"0.65s"}
                emptyColor={"gray.200"}
                color={"blue.500"}
                size={"xl"}
            /> :
                <Stack spacing={6} marginTop={"0.5em"} >
                    {posts.length > 0
                        ? posts.slice(0).reverse().map(post => <PostItem key={post._id} {...post} />)
                        : <Flex flex={1} alignItems={"center"}>
                            {"No posts"}
                        </Flex>}
                </Stack>
            }
        </Flex>
    )
}

export default Content

