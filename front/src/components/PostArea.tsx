import { FC, useState } from 'react'
import { Flex, Text } from "@chakra-ui/layout"
import { Button, Image, Spinner } from '@chakra-ui/react'

import AutoResizeTextArea from "./AutoResizeTextArea";
import { User } from 'store/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { setRefreshPosts } from 'store/slices/appSlice';
import { useNavigate } from 'react-router';


const PostArea: FC = () => {
    const user: User | null = useSelector((state: RootState) => state.user.user);
    const [value, setValue] = useState("");
    const [lengthError, setLengthError] = useState(false);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const createPost = async (content: string) => {
        if (content.length <= 0 || content.length > 140 || loading) return;

        setLoading(true);
        console.log(user)
        const res = await fetch('http://localhost:8080/post', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: 'test',
                content: content,
                authorAddress: user?.address,
                authorId: user?._id,
            })
        }).finally(() => { setLoading(false); dispatch(setRefreshPosts(true)) });

        if (res.status === 200) {
            const data = await res.json();
            console.log(data);
            setValue("");
        }
        else console.log("Error");
    }

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (e.target.value.length > 140) { setLengthError(true); return; }
        if (lengthError && e.target.value.length <= 140)
            setLengthError(false);
        setValue(e.target.value);
    }

    return (
        <Flex flexDir={"column"} width={"100%"} padding={"0.5em"} borderBottom={"1px"} borderColor={"lightgray"}>
            <Flex flexDir={"row"} width={"100%"} >
                <Image
                    borderRadius={"full"}
                    border={"1px"}
                    borderColor={"lightgray"}
                    shadow={"md"}
                    boxSize={"96px"}
                    src={"https://bit.ly/dan-abramov"}
                    alt={"Dan Abramov"}
                    onClick={() => navigate("/user/" + user?._id)}
                    _hover={{ cursor: "pointer" }}
                />
                <AutoResizeTextArea
                    alignSelf={"center"}
                    placeholder={"What's happening?"}
                    marginLeft={"0.5em"}
                    marginRight={"0.5em"}
                    marginBottom={"0.5em"}
                    fontSize={"xl"}
                    value={value}
                    shadow={"sm"}
                    isReadOnly={loading}
                    onChange={handleChange}
                    isInvalid={lengthError}
                    focusBorderColor={lengthError ? "red" : ""} />
            </Flex>
            <Flex alignItems={"center"}>
                <Text marginLeft={"auto"} marginRight={"1em"} fontSize={"md"} color={value.length >= 140 ? (value.length == 140 ? "orange" : "red") : "black"}>{value.length + " / 140"}</Text>

                <Button
                    marginRight={"1.25em"}
                    width={"15%"}
                    size={"md"}
                    borderLeftRadius={"25px"}
                    borderRightRadius={"25px"}
                    shadow={"sm"}
                    disabled={value.length <= 0 || value.length > 140 || loading}
                    onClick={() => createPost(value)}
                >
                    {loading ? <Spinner /> : "Post"}
                </Button>
            </Flex>
        </Flex >
    )
}

export default PostArea