import { Button, Flex, Heading } from "@chakra-ui/react"

export const Accueil = () => {
    const createUser = async () => {
        const res = await fetch('http://localhost:8080/createUser', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                address: '0x1234567890123456789012345678901234567890',
                email: 'xtekaa@gmail.com',
                password: "123456",
            })
        })

        if (res.status === 200) {
            const data = await res.json();
            console.log(data);
        } else {
            console.log(res)
        }
    }

    return (
        <>
            <Flex backgroundColor={"#968e8e"}>
                <Heading>
                    {"Bienvenue\r"}
                </Heading>
            </Flex>
            <Flex margin={5}>
                <Button onClick={() => createUser()}>
                    {"Create user"}
                </Button>
            </Flex>
        </>
    )
}
