import Webcam from 'react-webcam';
import { useEffect, useRef, useState } from 'react';
import '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-backend-webgl';
import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';
import type { Face } from '@tensorflow-models/face-landmarks-detection';
import b64toBlob from '../../hooks/base64toblob';
import { Box, Button, Grid, MenuItem, Select, Typography } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import axios from 'axios';
import ToastError from '../Toast/ToastError';
import ToastSuccess from '../Toast/ToastSuccess';
import ToastInfo from '../Toast/ToastInfo';
import { FaClipboardList } from 'react-icons/fa';

const TakeAttendance = () => {
    const webcam = useRef<Webcam>(null);
    const canvas = useRef<HTMLCanvasElement>(null);
    const [detectedFace, setDetectedFace] = useState<Face[]>([]);
    const [date, setDate] = useState<Date>(new Date());
    const [loading, setLoading] = useState<boolean>(true);
    const [course, setCourse] = useState<{ id: number; name: string; sks: number }[]>([]);
    const [selectedCourse, setSelectedCourse] = useState<any>('0');
    const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
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
                getCourse();
                setLoading(() => false);
            });
        }
    };

    const getCourse = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/getCourse`);
            if (response) setCourse(response.data.course);
        } catch (e) {
            console.log(e);
        }
    };

    const postToServer = async (image: File) => {
        try {
            ToastInfo('🤖 Recognizing your face');
            const formData: any = new FormData();
            formData.append('courseId', selectedCourse);
            formData.append('image', image);
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/recognize`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            if (response) {
                ToastSuccess(
                    `Hello ${response.data.response}, You successfully attend ${course[selectedCourse - 1].name}`
                );
                // setCanCapture(true);
            }
        } catch (e: any) {
            console.log(e);
            if (e.response.status === 404) {
                ToastError('Face is not registered!');
            } else if (e.response.status === 400) {
                ToastError('Please move your face more to the center!');
            }
            // setCanCapture(true);
        }
    };

    const capture = async () => {
        if (webcam.current) {
            const imageSrc = webcam.current.getScreenshot();
            await postToServer(b64toBlob(imageSrc, 'absen.jpeg'));
        }
    };

    const detect = async (detector: faceLandmarksDetection.FaceLandmarksDetector) => {
        try {
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
                    }, 1);
                } else {
                    setTimeout(() => {
                        detect(detector);
                    }, 1);
                }
            }
        } catch (error) {
            setTimeout(() => {
                detect(detector);
            }, 1);
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

    useEffect(() => {
        setInterval(() => {
            setDate(() => new Date());
        }, 1000);
    }, []);

    return (
        <>
            <Grid
                container
                direction='column'
                sx={{ minHeight: '100vh', backgroundColor: '#C0D5E6' }}
                alignItems='center'
                justifyContent='center'
            >
                <Box
                    component='div'
                    sx={{
                        position: 'absolute',
                        top: 0,
                        right: 20,
                        '@media (max-width:1000px)': {
                            display: 'none'
                        }
                    }}
                >
                    <img src='/logo/logo.png' alt='logo' style={{ maxWidth: '150px', width: '100%' }} />
                </Box>
                {/* {loading ? (
                    <>
                        <Grid item>
                            <img alt='loading' src='/loading/loading.svg' />
                        </Grid>
                    </>
                ) : (
                    <>
                    </>
                )} */}
                <Grid
                    container
                    direction='column'
                    alignItems='center'
                    justifyContent='center'
                    spacing={2}
                    sx={{ px: 2 }}
                >
                    <Grid item>
                        <Typography sx={{ fontSize: '54px', fontWeight: 'bold', color: '#0D4066' }}>
                            Attendance
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Grid
                            sx={{
                                '@media (max-width:1366px)': {
                                    maxWidth: '520px',
                                    maxHeight: '390px'
                                },
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
                                        height: '100%',
                                        opacity: loading ? 0.3 : 1
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
                                            top: '45%'
                                        }}
                                    >
                                        <img alt='loading' src='/loading/loading.svg' />
                                    </div>
                                )}
                            </div>
                        </Grid>
                    </Grid>
                    <Grid item container direction='column' alignItems='center' justifyContent='center' spacing={2}>
                        <Grid container direction='column' alignItems='center' justifyContent='center' sx={{ mt: 2 }}>
                            <Grid item>
                                <Typography sx={{ fontSize: '32px', fontWeight: 600, color: '#0D4066' }}>
                                    {`${weekday[date.getDay()]}, `}
                                    {date.toLocaleDateString('en-GB', {
                                        day: 'numeric',
                                        month: 'short',
                                        year: 'numeric'
                                    })}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography sx={{ fontSize: '32px', fontWeight: 600, color: '#0D4066' }}>
                                    {date.toLocaleTimeString('it-IT')}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Select
                                defaultValue={'0'}
                                onChange={(e: SelectChangeEvent) => {
                                    console.log(e.target.value);
                                    setSelectedCourse(() => e.target.value);
                                }}
                                displayEmpty
                                sx={{
                                    width: '400px',
                                    backgroundColor: 'white',
                                    borderRadius: '36px',
                                    fontColor: '#0D4066',
                                    fontWeight: 'bold'
                                }}
                            >
                                <MenuItem value={'0'}>
                                    <FaClipboardList
                                        style={{
                                            verticalAlign: 'middle',
                                            fontSize: '20px',
                                            marginTop: 'auto',
                                            marginBottom: 'auto',
                                            marginRight: '4px'
                                        }}
                                    />{' '}
                                    List of class to Attend
                                </MenuItem>
                                {course.map((data: { id: number; name: string; sks: number }, index: number) => {
                                    return (
                                        <MenuItem value={`${data.id}`} key={index}>
                                            {data.name}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </Grid>
                        <Grid item>
                            <Button
                                onClick={() => capture()}
                                sx={{
                                    backgroundColor: '#84A8BF',
                                    fontWeight: 'bold',
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: 'rgba(132,168,191,0.7)'
                                    },
                                    borderRadius: '16px',
                                    width: '250px',
                                    p: 1
                                }}
                                disabled={detectedFace.length === 0 || selectedCourse === '0'}
                            >
                                Attend
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default TakeAttendance;
