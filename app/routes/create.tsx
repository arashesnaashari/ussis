import * as React from "react";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import { IoPause } from "react-icons/io5/index.js";
import { IoPlay } from "react-icons/io5/index.js";
import { IoStop } from "react-icons/io5/index.js";
import { ImCross } from "react-icons/im/index.js";
import type { MetaFunction } from "@remix-run/node";
import {
  Avatar,
  Box,
  Center,
  useBreakpointValue,
  Flex,
  Heading,
  Icon,
  Container,
  Button,
  useColorModeValue,
  Stack,
  Text,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { useNavigate } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "create" },
    { name: "description", content: "create voice!" },
  ];
};

export default function App() {
  const [a, setA] = React.useState(false);
  const [finish, setFinish] = React.useState(false);
  const [next, setNext] = React.useState(false);
  const [text, setText] = React.useState();
  const [cansel, setCansel] = React.useState(false);
  const navigate = useNavigate();
  let file: any;
  const getText = () => {
    let url = `https://asr-api2.ussistant.ir/collect/voice/get_text?user_id=${localStorage.getItem(
      "userIdussisstant"
    )}`;
    fetch(url, {
      method: "POST",
      headers: {
        "X-API-Key": "c5ac5392-1cd1-477e-b9ae-6fd61d21da01",
      },
      // headers: {
      //   Accept: "application/json",
      //   "Content-Type": "application/x-www-form-urlencoded",
      // },
      // body: JSON.stringify(reqBody),
    })
      .then((x) => x.json())
      .then((d) => {
        console.log(d), setText(d);
      })
      .catch((err) => console.log(err));
  };

  React.useEffect(() => {
    if (!localStorage.getItem("userIdussisstant")) {
      navigate("/");
    } else {
      getText();
    }
  }, []);

  React.useEffect(() => {
    setTimeout(() => {
      setA(true);
    }, 300);
  });
  const recorderControls = useAudioRecorder(
    {
      noiseSuppression: true,
      echoCancellation: true,
    },
    (err) => console.table(err) // onNotAllowedOrFound
  );

  // const addAudioElement = (blob: any) => {
  //   setFinish(true);

  // };

  const handleSendAudio = () => {
    let url = "https://asr-api2.ussistant.ir/collect/voice/send_voice";
    file = new File(
      [recorderControls.recordingBlob ? recorderControls.recordingBlob : ""],
      "name"
    );
    var fd = new FormData();
    fd.append("file", file);
    fd.append("query_id", text?.id);

    fetch(url, {
      method: "POST",
      headers: {
        "X-API-Key": "c5ac5392-1cd1-477e-b9ae-6fd61d21da01",
        Accept: "application/json",
        // "Content-Type": "multipart/form-data",
        // "Content-Type":
        //   "multipart/form-data; charset=utf-8; boundary=" +
        //   Math.random().toString().substring(2),
        // "Content-Type": "application/x-www-form-urlencoded",
      },
      body: fd,
    })
      .then((x) => x.json())
      .then((d) => {
        if (d.message == "Voice data received and associated with the query") {
          setFinish(false);
          setNext(true);
        }
      })
      .catch((err) => console.log());
  };
  const handleNext = () => {
    console.log();
    navigate("/create");
  };

  const handleStop = () => {
    setFinish(true);
    recorderControls.stopRecording();
  };
  return (
    <Box py={{ base: "12", md: "24" }} maxW="7xl" mx="auto">
      <Stack direction="row" spacing="12">
        <Flex flex="1">
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
                <Box>
                  {text && text.query_text ? text.query_text : text?.detail}
                </Box>
              </Stack>

              <Stack spacing={"6"} align={"center"}>
                {a && !text?.detail && (
                  <AudioRecorder
                    classes={{
                      AudioRecorderPauseResumeClass: "arash",
                      AudioRecorderDiscardClass: "arash",
                      // AudioRecorderStartSaveClass: "arash",
                    }}
                    // onRecordingComplete={(blob) => addAudioElement(blob)}
                    recorderControls={recorderControls}
                    downloadOnSavePress={false}
                    downloadFileExtension="mp3"
                    showVisualizer={true}
                  />
                )}
                <br />
                {recorderControls.isRecording && (
                  <HStack bgColor={"white"}>
                    <Button
                      bgColor={"#ebebeb"}
                      boxShadow={"sl"}
                      p={"3"}
                      onClick={handleStop}
                    >
                      <Icon
                        color={"gray.800"}
                        transform={"scale(0.9)"}
                        as={IoStop}
                      />
                    </Button>
                    <Button
                      bgColor={"#ebebeb"}
                      boxShadow={"sl"}
                      p={"3"}
                      onClick={recorderControls.stopRecording}
                    >
                      <Icon
                        color={"gray.800"}
                        transform={"scale(0.9)"}
                        as={ImCross}
                      />
                    </Button>

                    <Button
                      bgColor={"#ebebeb"}
                      boxShadow={"sl"}
                      p={"3"}
                      onClick={recorderControls.togglePauseResume}
                    >
                      {recorderControls.isPaused ? (
                        <Icon
                          color={"gray.800"}
                          transform={"scale(0.9)"}
                          as={IoPlay}
                        />
                      ) : (
                        <Icon
                          color={"gray.800"}
                          transform={"scale(0.9)"}
                          as={IoPause}
                        />
                      )}
                    </Button>
                  </HStack>
                )}
              </Stack>

              <Stack align={"center"} spacing={"6"}>
                {finish && (
                  <Button onClick={() => handleSendAudio()} w="full">
                    Send !
                  </Button>
                )}
              </Stack>
              <Stack align={"center"} spacing={"6"}>
                {next && (
                  <Button w="full" onClick={() => handleNext()}>
                    Next one !
                  </Button>
                )}
              </Stack>
            </Stack>
          </Container>
        </Flex>
      </Stack>
    </Box>
  );
}
