import { FC, useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Flex, Stack } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';

import { RootState } from 'store/store';
import { PostItem } from './PostItem';
import { useAsync } from "./hooks";

import { setRefreshPosts } from 'store/slices/postSlice';
import { setPosts } from 'store/slices/postSlice';
import { User } from 'store/slices/userSlice';
import { Post } from 'store/slices/postSlice';

type ContentProps = { user: User | null };

export const Content: FC<ContentProps> = ({ user }) => {
    const refreshPosts = useSelector((state: RootState) => state.post.refreshPosts);
    const posts: Post[] = useSelector((state: RootState) => state.post.posts);
    const [isRefreshing, triggerRefresh] = useState(true);
    const dispatch = useDispatch();

    const List = useMemo(() => {
        return posts.slice(0).reverse().map(post => <PostItem key={post._id} {...post} />);
    }, [posts]);

    const fetchPosts = useCallback(async () => {
        if (!isRefreshing) return;

        if (!user) {
            console.log("Fetching all posts...");

            const res = await fetch('http://localhost:8080/posts', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            }).finally(() => triggerRefresh(false));
            if (res.status === 200) {
                const data: Post[] = await res.json();
                console.log("Posts fetched:", data);
                dispatch(setPosts(data));
            }
            else console.error("Error in fetching all posts:", res.status);
        } else {
            console.log("Fetching posts for user:", user?.address);
            const res = await fetch('http://localhost:8080/post/' + user._id, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            }).finally(() => triggerRefresh(false));
            if (res.status === 200) {
                const data: Post[] = await res.json();
                console.log("Posts fetched:", data);
                dispatch(setPosts(data));
            }
            else console.error("Error in fetching posts for user:", res.status);
        }

    }, [isRefreshing, user, dispatch]);

    useAsync(async (isActive) => {
        if (isActive())
            fetchPosts();
    }, [fetchPosts]);


    useAsync(async (isActive) => {
        if (isActive()) { triggerRefresh(true); dispatch(setRefreshPosts(false)); }
    }, [refreshPosts, user]);

    return (
        <Flex flex={1} justifyContent={"center"} overflowY={"scroll"} marginBottom={"1em"} >
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
                        ? List
                        : <Flex flex={1} alignItems={"center"}>
                            {"No posts"}
                        </Flex>}
                </Stack>
            }
        </Flex>
    )
}

export default Content;