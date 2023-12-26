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
  const [role, setRole] = React.useState("editor");
  const [gender, setGender] = React.useState("man");
  const [age, setAge] = React.useState("");
  const [pass, setPass] = React.useState("");
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
      email: "email@gmail.com",
      age: age ?? "",
      gender: gender == "man" ? true : false,
      is_annotator: role == "creator" ? false : true,
      password: pass,
    };
    console.log(userName);

    if (userName !== "" && pass !== "") {
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

          if (d.detail) {
            setError(d.detail[0].msg);
          } else if (d.id) {
            //set it to localStorage
            localStorage.setItem("userIdussisstant", d.id);
            //redirect
            navigate("/create");
          }
        })
        .catch((e) => console.log(e));
    } else {
      setError("فرم رو کامل کنین ");
    }
  };
  return (
    <Container
      border={"#242e59 1px solid"}
      fontFamily={"pinar"}
      float={"right"}
      maxW="3000px"
      w={{ base: "90%", md: "40%" }}
      py={{ base: "0", sm: "8" }}
      px={{ base: "4", sm: "10" }}
      bg={useBreakpointValue({ base: "white", sm: "white" })}
      boxShadow={{ base: "sm", sm: useColorModeValue("sm", "md-dark") }}
      borderRadius={{ base: "none", sm: "xl" }}
    >
      <Stack spacing="8">
        <Stack spacing="6" align="center">
          <Logo />
          <Stack spacing="3" textAlign="center">
            <Heading size="xs">خوش اومدین</Heading>
            <Text color="muted">انتخاب نقش</Text>
            <HStack justify="center" spacing="1">
              <ButtonGroup variant="outline" spacing="4" width="full">
                <Button
                  width="full"
                  onClick={() => handleRoleChange("creator")}
                  background={role == "creator" ? "gray.200" : "white"}
                >
                  ضبط صدا
                </Button>

                <Button
                  width="full"
                  onClick={() => handleRoleChange("editor")}
                  background={role == "editor" ? "gray.200" : "white"}
                >
                  بررسی صدا ها
                </Button>
              </ButtonGroup>
            </HStack>
          </Stack>
        </Stack>
        <Stack spacing="6">
          <Stack spacing="5">
            <FormControl isRequired>
              <FormLabel float={"right"} htmlFor="name">
                نام کاربری
              </FormLabel>
              <Input
                dir="rtl"
                id="name"
                type="text"
                onChange={(q) => setUsername(q.target.value)}
              />
            </FormControl>
            {/* {role == "editor" && ( */}
            <FormControl isRequired>
              <FormLabel float={"right"} htmlFor="password">
                رمز عبور
              </FormLabel>
              <Input
                dir="rtl"
                id="password"
                type="password"
                onChange={(q) => setPass(q.target.value)}
              />
              {/* <FormHelperText color="muted">
                  At least 8 characters long
                </FormHelperText> */}
            </FormControl>
            {/* )} */}
            {role == "creator" && (
              <>
                {/* <HStack alignItems={"normal"}> */}
                <FormControl>
                  <FormLabel float={"right"}>سن</FormLabel>
                  <NumberInput
                    dir="rtl"
                    onChange={setAge}
                    value={age}
                    min={10}
                    max={80}
                  >
                    <NumberInputField />
                  </NumberInput>
                </FormControl>
                <FormControl
                  display="flex"
                  flexFlow="column"
                  alignItems="self-end"
                >
                  <FormLabel float={"right"}>جنسیت</FormLabel>
                  <br />
                  <RadioGroup onChange={setGender} value={gender}>
                    <Stack float={"right"} direction="row">
                      <Radio value="man" colorScheme="blue">
                        آقا
                      </Radio>
                      <Radio pl={"2rem"} value="woman" colorScheme="blue">
                        خانم
                      </Radio>
                    </Stack>
                  </RadioGroup>
                </FormControl>
                {/* </HStack> */}
              </>
            )}
            <Text textAlign={"end"}>{error}</Text>
            <Button
              color={"whitesmoke"}
              bgColor={"#242e59"}
              fontFamily={"pinar"}
              onClick={() => handleAuth()}
              _hover={{
                bgColor: "white",
                color: "black",
                border: "1px solid #242e59",
              }}
            >
              شروع
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
};

//#242e59
