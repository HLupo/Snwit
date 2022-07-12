import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { FC, useState } from 'react'

import { Button, Image, Spinner } from '@chakra-ui/react'
import { Flex, Text } from "@chakra-ui/layout"

// import { setRefreshPosts } from 'store/slices/postSlice';
import { User } from 'store/slices/userSlice';
import { Post, addPost } from 'store/slices/postSlice';
import { RootState } from 'store/store';

import { AutoResizeTextArea } from "./AutoResizeTextArea";

export const PostArea: FC = () => {
    const user: User | null = useSelector((state: RootState) => state.user.user);
    const [lengthError, setLengthError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    if (!user) { console.error("Error in PostArea: user is null"); return null; }

    const createPost = async (content: string) => {
        if (content.length <= 0 || content.length > 140 || loading) return;

        setLoading(true);
        console.log("Creating post...");

        const res = await fetch('http://localhost:8080/post', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content: content,
                authorAddress: user?.address,
                authorId: user?._id,
            })
        }).finally(() => {
            setLoading(false);
            // dispatch(setRefreshPosts(true));
        });

        if (res.status === 200) {
            const data: Post = await res.json();
            console.log("Post created:", data);
            setValue("");
            dispatch(addPost(data));
        }
        else console.error("Error in PostArea: createPost:", res.status);
    }

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setLengthError(e.target.value.length > 140);
        setValue(e.target.value);
    }

    return (
        <Flex flexDir={"column"} width={"100%"} padding={"0.5em"} borderBottom={"1px"} borderColor={"lightgray"}>
            <Flex flexDir={"row"} width={"100%"} >
                <Image
                    shadow={"md"}
                    border={"1px"}
                    boxSize={"96px"}
                    alt={"User avatar"}
                    borderRadius={"full"}
                    borderColor={"lightgray"}
                    _hover={{ cursor: "pointer" }}
                    src={"https://robohash.org/" + user?.address}
                    onClick={() => navigate("/user/" + user?.address, { state: { profileId: user?._id } })}
                />
                <AutoResizeTextArea
                    shadow={"sm"}
                    value={value}
                    fontSize={"xl"}
                    marginLeft={"0.5em"}
                    isReadOnly={loading}
                    alignSelf={"center"}
                    marginRight={"0.5em"}
                    marginBottom={"0.5em"}
                    onChange={handleChange}
                    isInvalid={lengthError}
                    placeholder={"What's happening?"}
                    focusBorderColor={lengthError ? "red" : ""} />
            </Flex>
            <Flex alignItems={"center"}>
                <Text marginLeft={"auto"} marginRight={"1em"} fontSize={"md"} color={value.length >= 140 ? (value.length == 140 ? "orange" : "red") : "black"}>
                    {value.length + " / 140"}
                </Text>
                <Button
                    size={"md"}
                    width={"15%"}
                    shadow={"sm"}
                    marginRight={"1.25em"}
                    borderLeftRadius={"25px"}
                    borderRightRadius={"25px"}
                    onClick={() => createPost(value)}
                    disabled={value.length <= 0 || value.length > 140 || loading}
                >
                    {loading ? <Spinner /> : "Post"}
                </Button>
            </Flex>
        </Flex >
    )
}

export default PostArea