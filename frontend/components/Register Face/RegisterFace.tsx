import { Box, Button, Grid, Modal, Typography } from '@mui/material';
import { useState, useRef, useEffect } from 'react';
import WarningIcon from '@mui/icons-material/Warning';
import Webcam from 'react-webcam';
import axios from 'axios';
import ToastSuccess from '../Toast/ToastSuccess';
import ToastError from '../Toast/ToastError';
import b64toBlob from '../../hooks/base64toblob';
import '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-backend-webgl';
import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';
import type { Face } from '@tensorflow-models/face-landmarks-detection';
import { useSelector } from 'react-redux';
import type { globalState } from '../../types/redux/redux-type';
import ToastInfo from '../Toast/ToastInfo';

const RegisterFace = ({ openModal, setOpenModal }: { openModal: boolean; setOpenModal: (_param: boolean) => void }) => {
    const [openNotice, setOpenNotice] = useState<boolean>(false);
    const webcam = useRef<Webcam>(null);
    const canvas = useRef<HTMLCanvasElement>(null);
    const [detectedFace, setDetectedFace] = useState<Face[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [detected, setDetected] = useState<number>(0);
    const userId = useSelector((state: globalState) => state.userInfo);

    const runDetection = async () => {
        const model = faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh;
        const detectorConfig = {
            runtime: 'mediapipe',
            solutionPath: '/face_mesh',
            maxFaces: 10
        } as any;
        const detector = await faceLandmarksDetection.createDetector(model, detectorConfig);
        if (detector) {
            await detect(detector).then(() => {
                setLoading(() => false);
            });
        }
    };

    const postToServer = async (image: File, detectedTemp: number) => {
        try {
            ToastInfo('🤖 Saving your face into our database');
            const formData: any = new FormData();
            formData.append('userId', userId.id);
            formData.append('image', image);
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/savemodel`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            if (response) {
                if (detectedTemp === 0) {
                    ToastSuccess('Model saved! Please capture one more photo');
                    setDetected(1);
                }
                if (detectedTemp === 1) {
                    setOpenModal(false);
                    setOpenNotice(false);
                    ToastSuccess('Model Saved');
                }
            }
        } catch (e: any) {
            console.log(e);
            if (e.response.status === 400) {
                ToastError('Please move your face more to the center!');
            }
        }
    };

    const capture = async () => {
        if (webcam.current) {
            const imageSrc = webcam.current.getScreenshot();
            const detectedTemp = detected;
            await postToServer(b64toBlob(imageSrc, `${userId.id}.jpeg`), detectedTemp);
        }
    };

    const detect = async (detector: faceLandmarksDetection.FaceLandmarksDetector) => {
        try {
            if (detector) setLoading(() => false);
            if (webcam.current && canvas.current && detector) {
                const webcamCurrent = webcam.current as any;
                const videoWidth = webcamCurrent.video.videoWidth;
                const videoHeight = webcamCurrent.video.videoHeight;
                canvas.current.width = videoWidth;
                canvas.current.height = videoHeight;
                if (webcamCurrent.video.readyState === 4) {
                    const video = webcamCurrent.video;
                    const predictions: Face[] = await detector.estimateFaces(video);
                    setDetectedFace(() => predictions);
                    requestAnimationFrame(() => {
                        draw(predictions);
                    });
                    setTimeout(() => {
                        detect(detector);
                    }, 200);
                } else {
                    setTimeout(() => {
                        detect(detector);
                    }, 200);
                }
            }
        } catch (error) {
            setTimeout(() => {
                detect(detector);
            }, 200);
        }
    };

    const draw = (predictions: Face[]) => {
        try {
            if (canvas.current) {
                const ctx = canvas.current.getContext('2d');
                if (ctx) {
                    predictions.forEach((prediction: Face) => {
                        drawBox(ctx, prediction);
                    });
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    const drawBox = (ctx: CanvasRenderingContext2D, prediction: Face) => {
        const x = prediction.box.xMin;
        const y = prediction.box.yMin;
        const width = prediction.box.width;
        const height = prediction.box.height;
        ctx.beginPath();
        // ctx.font = '24px Inter';
        // ctx.fillStyle = 'white';
        // ctx.fillText('Hello world', x, y - 20);
        ctx.rect(x, y, width, height);
        ctx.lineWidth = 4;
        ctx.strokeStyle = 'red';
        ctx.stroke();
    };

    useEffect(() => {
        runDetection();
    }, [webcam.current?.video?.readyState]);

    return (
        <>
            <Modal open={openModal} onClose={() => setOpenNotice(true)}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'background.paper',
                        p: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        gap: '16px',
                        '&:focus': {
                            outline: 'none'
                        }
                    }}
                >
                    <Grid item>
                        <Typography sx={{ fontSize: '22px', fontWeight: 500, textAlign: 'center' }}>
                            Make sure your face is on the center of the camera!
                        </Typography>
                    </Grid>
                    <Grid
                        sx={{
                            maxWidth: '640px',
                            maxHeight: '480px'
                        }}
                    >
                        <div
                            style={{
                                width: '100%',
                                position: 'relative'
                            }}
                        >
                            <Webcam
                                audio={false}
                                ref={webcam}
                                style={{
                                    width: '100%',
                                    height: '100%'
                                }}
                                screenshotFormat='image/jpeg'
                            />
                            {!loading ? (
                                <canvas
                                    ref={canvas}
                                    style={{
                                        position: 'absolute',
                                        left: '0%',
                                        textAlign: 'center',
                                        width: '100%',
                                        height: '100%'
                                    }}
                                />
                            ) : (
                                <div
                                    style={{
                                        position: 'absolute',
                                        textAlign: 'center',
                                        width: '100%',
                                        height: '100%',
                                        top: '45%'
                                    }}
                                >
                                    <img alt='loading' src='/loading/loading.svg' />
                                </div>
                            )}
                        </div>
                    </Grid>
                    <Grid item>
                        <Button onClick={capture} disabled={detectedFace.length === 0}>
                            Capture
                        </Button>
                    </Grid>
                </Box>
            </Modal>

            <Modal
                open={openNotice}
                onClose={() => {
                    setOpenNotice(false);
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'background.paper',
                        p: 3,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        gap: '16px',
                        minWidth: { xs: '300px', md: '600px', sm: '600px' },
                        '&:focus': {
                            outline: 'none'
                        }
                    }}
                >
                    <Grid container direction='column' spacing={0}>
                        <Grid item container justifyContent='center'>
                            <WarningIcon sx={{ fontSize: '200px', color: '#ffb200' }} />
                        </Grid>
                        <Grid item container justifyContent='center'>
                            <Typography sx={{ fontSize: '36px', fontWeight: 'bold' }}>Leave Page?</Typography>
                        </Grid>
                        <Grid item container justifyContent='center'>
                            <Typography sx={{ fontSize: '20px', color: '#636363', textAlign: 'center', width: '80%' }}>
                                You didnt have any model registered, you cant take attendance.
                            </Typography>
                        </Grid>
                        <Grid item container justifyContent='center' sx={{ mt: 2 }}>
                            <Grid
                                item
                                container
                                justifyContent='space-between'
                                sx={{
                                    width: { md: '70%', sm: '70%', xs: '100%' },
                                    flexDirection: { xs: 'column', md: 'row', sm: 'row' },
                                    alignItems: { xs: 'center', md: '', sm: '' }
                                }}
                            >
                                <Grid item>
                                    <Button
                                        sx={{
                                            backgroundColor: 'rgba(218,89,83,1)',
                                            color: 'white',
                                            textTransform: 'none',
                                            '&:hover': {
                                                cursor: 'pointer',
                                                backgroundColor: 'rgba(218,89,83,0.7)'
                                            },
                                            fontSize: '15px',
                                            fontWeight: 'bold',
                                            minWidth: '150px',
                                            mb: {
                                                xs: 2,
                                                sm: 0,
                                                md: 0
                                            },
                                            border: '1px solid #D9D9D9',
                                            borderRadius: '16px',
                                            p: 1
                                        }}
                                        onClick={() => {
                                            setOpenModal(false);
                                            setOpenNotice(false);
                                        }}
                                    >
                                        Leave
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button
                                        sx={{
                                            color: '#747474',
                                            textTransform: 'none',
                                            '&:hover': {
                                                cursor: 'pointer'
                                            },
                                            fontSize: '15px',
                                            fontWeight: 'bold',
                                            minWidth: '150px',
                                            border: '1px solid #D9D9D9',
                                            borderRadius: '16px',
                                            p: 1
                                        }}
                                        onClick={() => setOpenNotice(false)}
                                    >
                                        Stay
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </>
    );
};

export default RegisterFace;
