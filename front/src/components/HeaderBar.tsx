import { Box, Flex, Heading } from "@chakra-ui/layout"
import { FC } from "react";

type HeaderBarProps = { title: string }
export const HeaderBar: FC<HeaderBarProps> = ({ title }) => {
    return (
        <Flex flexDir={"column"}>
            <Box borderBottom={"1px"} borderColor={"lightgray"} padding={"0.5em"} shadow={"sm"}>
                <Heading size={"lg"}>{title}</Heading >
            </Box>
        </Flex >
    )
}

export default HeaderBar;