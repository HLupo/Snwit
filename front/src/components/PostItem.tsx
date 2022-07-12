import { Divider, Flex, HStack } from '@chakra-ui/layout'
import { FC, useState } from 'react'
import { useSelector } from 'react-redux';
import { User } from 'store/slices/userSlice'
import { RootState } from 'store/store';
import { Text, Box } from '@chakra-ui/layout'
import { Button, } from '@chakra-ui/button';
import { Image } from '@chakra-ui/image';
import { useAsync } from "./hooks"
import { BsChatDots } from "react-icons/bs";
import { AiFillDollarCircle, AiFillHeart, AiOutlineRetweet } from 'react-icons/ai';
import dateFormat from 'dateformat';

import { useNavigate } from 'react-router';
import { ethers, Contract } from 'ethers';
import { CONTRACT_ADRESS, TOKEN_FACTORY } from 'Globals';
import { Token } from 'typechain-types';

export interface Post {
    _id: string;
    authorId: string;
    authorAddress: string;
    content: string;
    createdAt: string;
    likes: string[];
    retweets: string[];
    comments: string[];
}

export const PostItem: FC<Post> = (post) => {
    const user: User | null = useSelector((state: RootState) => state.user.user);
    const [isLike, setIsLike] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isTiping, setIsTiping] = useState(false);
    const navigate = useNavigate();

    const tipAuthor = async (address: string) => {
        const { ethereum } = window;

        if (!user?.address || user.address === address) return;

        if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();

            const myContract = new Contract(CONTRACT_ADRESS, TOKEN_FACTORY.interface, signer) as Token;
            setIsTiping(true);
            const res = await myContract.transfer(address, 100);
            res.wait().then(() => { window.location.reload() });

        }
    };

    const changeLike = async () => {
        setIsLoading(true);
        if (isLike) {
            const res = await fetch("http://localhost:8080/post/unlike/" + post._id, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    authorId: user?._id,
                })
            }).finally(() => { setIsLoading(false) });
            if (res.status === 200) {
                post.likes.length -= 1;
                setIsLike(false);
            }
            else console.log("Error");
        }
        else {
            const res = await fetch('http://localhost:8080/post/like/' + post._id, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: user?._id,
                })
            }).finally(() => { setIsLoading(false) });
            if (res.status === 200) {
                post.likes.length += 1;
                setIsLike(true);
            }
            else console.log("Error");
        }
    }

    useAsync(async (isActive) => {
        if (isActive()) {
            console.log("Hello!!!")
            console.log(user)
            console.log(post.likes)
            if (!user) { setIsLike(false); return; }
            if (post.likes.includes(user._id)) setIsLike(true);
            else setIsLike(false);
        }
    }, [user, post.likes]);

    return (
        <Box border={"1px"} shadow={"md"} borderColor={"lightgray"} maxW={"650px"} minW={"650px"} borderRightRadius={"25px"} borderLeftRadius={"25px"}>
            <Flex alignItems={"center"} flex={1}>

                <Image
                    borderRadius={"full"}
                    border={"1px"}
                    borderColor={"lightgray"}
                    shadow={"md"}
                    boxSize={"64px"}
                    margin={"0.5em"}
                    src={"https://bit.ly/dan-abramov"}
                    alt={"Dan Abramov"}
                    onClick={() => navigate("/user/" + post.authorId)}
                    _hover={{ cursor: "pointer" }}
                />
                <Flex flexDir={"column"} overflow={"auto"}>
                    <Text marginLeft={"0.5em"} color={"gray.400"}>{"@" + post.authorAddress}</Text>
                    <Text noOfLines={[1, 2, 3, 4, 5]} fontSize={"md"} margin={"0.5em"}>{post.content}</Text>
                </Flex>

            </Flex>
            <Divider />
            <Flex margin={"1em"}>
                <HStack spacing={4} flex={1}>
                    <Text color={"gray.400"}>{dateFormat(post.createdAt, "mmmm dS yyyy - hh:MM TT")}</Text>
                    <HStack flex={1} spacing={4} justifyContent={"flex-end"}>
                        <Button isLoading={isLoading} shadow={"md"} rightIcon={<AiFillHeart />} size={"md"} aria-label={'like'} color={isLike ? "red" : ""} onClick={() => { changeLike() }} ><Text>{post.likes.length}</Text></Button>
                        <Button shadow={"md"} rightIcon={<BsChatDots />} size={"md"} aria-label={'comments'}><Text>{"0"}</Text></Button>
                        <Button shadow={"md"} rightIcon={<AiOutlineRetweet />} size={"md"} aria-label={'retweet'}><Text>{"0"}</Text></Button>
                        <Button shadow={"md"} rightIcon={<AiFillDollarCircle />} size={"md"} aria-label={'retweet'} onClick={() => tipAuthor(post.authorAddress)}><Text justifyContent={"center"}>{"100"}</Text></Button>
                    </HStack>
                </HStack>
            </Flex>
        </Box >
    );
}