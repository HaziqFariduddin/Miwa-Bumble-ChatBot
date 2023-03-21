import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import {
    Box,
    TextField,
    Button,
    Stack,
    Typography,
    Avatar,
    IconButton,
    Divider,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import VideoCallIcon from '@mui/icons-material/VideoCall';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);
    const [audioUrl, setAudioUrl] = useState("");

    const APIkey = process.env.REACT_APP_VOICE_API_KEY;

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(scrollToBottom, [messages]);

    const getAssistantMessages = () => {
        return messages
            .filter((message) => message.user === 'chatgpt')
            .map((message) => ({ role: 'assistant', content: message.text }));
    };

    const sendMessage = async () => {
        if (!input) return;

        setMessages((prev) => [...prev, { user: 'user', text: input }]);
        setInput('');

        try {
            const assistantMessages = getAssistantMessages();
            const response = await axios.post('https://safe-eyrie-01319.herokuapp.com/api/chat', { input: input, assistantMessages: assistantMessages });

            const chatGptResponse = response.data.chatGptResponse;

            setMessages((prev) => [...prev, { user: 'chatgpt', text: chatGptResponse }]);
            try {
                const ttsResponse = await axios.post(
                    "https://api.elevenlabs.io/v1/text-to-speech/nFoXXrTZblWtAbgfRJOl",
                    {
                        text: chatGptResponse,
                        voice_settings: {
                            stability: 0.45,
                            similarity_boost: 0.65,
                        },
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "xi-api-key": APIkey,
                            Accept: "audio/mpeg",
                        },
                        responseType: "blob",
                    }
                );
                setAudioUrl(window.URL.createObjectURL(ttsResponse.data));
            } catch (error) {
                console.error("Error calling text-to-speech API:", error);
            }

        } catch (error) {
            console.error('Error calling ChatGPT:', error);
        }
    };

    const handleVideoCall = () => {
        window.open('https://wa.me/+60196399560', '_blank');
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100vh',
                maxWidth: '600px',
                margin: '0 auto',
            }}
        >
            <audio src={audioUrl} autoPlay style={{ display: "none" }} />

            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    position: 'sticky',
                    top: 0,
                    zIndex: 1,
                    backgroundColor: 'background.default',
                    pt: 2,
                    px: 2,
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar
                        alt="Profile Picture"
                        src="https://i.ibb.co/kMH9bXV/Profilepicture.png"
                        sx={{ width: 48, height: 48 }}
                    />
                    <Typography sx={{ ml: 2, fontWeight: 'bold', fontSize: 20 }}>Miwa</Typography>
                </Box>
                <IconButton color="primary" aria-label="video call" onClick={handleVideoCall}>
                    <VideoCallIcon />
                </IconButton>
            </Box>
            <Divider sx={{ my: 2 }} />

            <Box
                sx={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    overflowY: 'auto',
                    pb: 2,
                    px: 2,
                }}
            >
                {messages.map((message, index) => (
                    <Box
                        key={index}
                        sx={{
                            mb: 1,
                            alignSelf: message.user === 'user' ? 'flex-end' : 'flex-start',
                        }}
                    >
                        <Typography
                            sx={{
                                borderRadius: 2,
                                px: 2,
                                py: 1,
                                mb: 0.5,
                                maxWidth: { xs: '300px', sm: '400px', md: '600px' },
                                bgcolor: message.user === 'user' ? 'primary.main' : 'secondary.main',
                                color: message.user === 'user' ? 'black' : 'black',
                                wordWrap: 'break-word',
                            }}
                        >
                            {message.text}
                        </Typography>
                    </Box>
                ))}
                <div ref={messagesEndRef}></div>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    position: 'sticky',
                    bottom: 0,
                    zIndex: 1,
                    backgroundColor: 'background.default',
                    pt: 2,
                    px: 2,
                    width: '100%',
                }}
            >
                <Stack direction="row" spacing={1} alignItems="center" width="100%">
                    <TextField
                        fullWidth
                        variant="outlined"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your message..."
                        InputProps={{ style: { borderRadius: 50 } }}
                        sx={{ flexGrow: 1 }}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={sendMessage}
                        disabled={!input}
                        sx={{
                            borderRadius: '50%',
                            minWidth: '48px',
                            minHeight: '48px',
                            padding: '12px',
                            backgroundColor: !input ? 'rgba(254, 199, 36, 0.5)' : '#fec724',
                            '&:hover': {
                                backgroundColor: !input ? 'rgba(254, 199, 36, 0.5)' : '#fec724',
                            },
                        }}
                    >
                        <SendIcon sx={{ transform: 'rotate(300deg)' }} />
                    </Button>
                </Stack>
            </Box>
        </Box>
    );
};

export default Chat;