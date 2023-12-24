import {
  Button,
  Container,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  RadioGroup,
  Radio,
  Input,
  Stack,
  Text,
  useBreakpointValue,
  ButtonGroup,
  NumberInput,
  NumberInputField,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { Logo } from "./Logo";
import { OAuthButtonGroup } from "./OAuthButtonGroup";
import { useNavigate } from "@remix-run/react";
export const SignUpForm = () => {
  const [role, setRole] = React.useState("creator");
  const [gender, setGender] = React.useState("man");
  const [age, setAge] = React.useState("");
  const [error, setError] = React.useState("");
  const [userName, setUsername] = React.useState("");
  const navigate = useNavigate();

  const handleRoleChange = (value: string) => {
    setRole(value);
  };
  const handleAuth = () => {
    let url = "https://asr-api2.ussistant.ir/collect/auth/register";
    let reqBody = {
      username: userName,
      email: "email",
      age: age,
      gender: gender == "man" ? true : false,
      is_annotator: role == "creator" ? false : true,
      password: "password",
    };
    console.log(userName);

    if (userName !== "") {
      fetch(url, {
        method: "POST",
        headers: {
          "X-API-Key": "c5ac5392-1cd1-477e-b9ae-6fd61d21da01",
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqBody),
      })
        .then((x) => x.json())
        .then((d) => {
          console.log(d);

          if (d.detail == "Username already registered") {
            setError(d.detail);
          } else if (d.id) {
            //set it to localStorage
            localStorage.setItem("userIdussisstant", d.id);
            //redirect
            navigate("/create");
          }
        })
        .catch((e) => console.log(e));
    } else {
      setError("Fill the username !");
    }
  };
  return (
    <Container
      maxW="md"
      py={{ base: "0", sm: "8" }}
      px={{ base: "4", sm: "10" }}
      bg={useBreakpointValue({ base: "transparent", sm: "bg-surface" })}
      boxShadow={{ base: "none", sm: useColorModeValue("md", "md-dark") }}
      borderRadius={{ base: "none", sm: "xl" }}
    >
      <Stack spacing="8">
        <Stack spacing="6" align="center">
          <Logo />
          <Stack spacing="3" textAlign="center">
            <Heading size="xs">Welcome to ussistant</Heading>
            <Text color="muted">choose th role</Text>
            <HStack justify="center" spacing="1">
              <ButtonGroup variant="outline" spacing="4" width="full">
                <Button
                  width="full"
                  onClick={() => handleRoleChange("creator")}
                  background={role == "creator" ? "gray.200" : "white"}
                >
                  creator
                </Button>

                <Button
                  width="full"
                  onClick={() => handleRoleChange("editor")}
                  background={role == "editor" ? "gray.200" : "white"}
                >
                  editor
                </Button>
              </ButtonGroup>
            </HStack>
          </Stack>
        </Stack>
        <Stack spacing="6">
          <Stack spacing="5">
            <FormControl isRequired>
              <FormLabel htmlFor="name">Username</FormLabel>
              <Input
                id="name"
                type="text"
                onChange={(q) => setUsername(q.target.value)}
              />
            </FormControl>
            {role == "editor" && (
              <FormControl isRequired>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input id="password" type="password" />
                {/* <FormHelperText color="muted">
                  At least 8 characters long
                </FormHelperText> */}
              </FormControl>
            )}
            {role == "creator" && (
              <>
                {/* <HStack alignItems={"normal"}> */}
                <FormControl>
                  <FormLabel>Age</FormLabel>
                  <NumberInput onChange={setAge} value={age} min={10} max={80}>
                    <NumberInputField />
                  </NumberInput>
                </FormControl>
                <FormControl>
                  <FormLabel>Gender</FormLabel>
                  <RadioGroup onChange={setGender} value={gender}>
                    <Stack direction="row">
                      <Radio value="man" colorScheme="gray">
                        man
                      </Radio>
                      <Radio pl={"2rem"} value="woman" colorScheme="gray">
                        woman
                      </Radio>
                    </Stack>
                  </RadioGroup>
                </FormControl>
                {/* </HStack> */}
              </>
            )}
            <Text>{error}</Text>
            <Button onClick={() => handleAuth()}>Start !</Button>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
};
