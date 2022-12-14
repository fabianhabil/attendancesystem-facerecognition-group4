import Webcam from 'react-webcam';
import { useCallback, useEffect, useRef, useState } from 'react';
import '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-backend-webgl';
import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';
import * as faceMesh from '@mediapipe/face_mesh';
import type { Face } from '@tensorflow-models/face-landmarks-detection';
import b64toBlob from '../../hooks/base64toblob';
import cropImage from '../../hooks/cropImage';

const WebcamComponent = () => {
    const webcam = useRef<Webcam>(null);
    const canvas = useRef<HTMLCanvasElement>(null);
    const [detectedFace, setDetectedFace] = useState<Face[]>([]);
    const [canCapture, setCanCapture] = useState<boolean>(true);

    const runDetection = async () => {
        const model = faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh;
        const detectorConfig = {
            runtime: 'mediapipe',
            solutionPath: `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@${faceMesh.VERSION}`,
            maxFaces: 10
        } as any;
        const detector = await faceLandmarksDetection.createDetector(model, detectorConfig);
        await detect(detector);
    };

    useEffect(() => {
        if (detectedFace.length !== 0 && canCapture) {
            capture();
            console.log(detectedFace);
            setCanCapture(false);
        }
    }, [detectedFace]);

    const capture = useCallback(async () => {
        if (webcam.current) {
            const imageSrc = webcam.current.getScreenshot();
            const link = URL.createObjectURL(b64toBlob(imageSrc, 'test.png'));
            console.log(link);
        }
        // setFlash(true);
        // if (!timerDelay) {
        //     setTimeout(async () => {
        //         const imageSrc = webcam.current.getScreenshot({});
        //         let cropped = '';
        //         await cropFromCamera(imageSrc, 1).then((canvas: any) => {
        //             cropped = canvas.toDataURL('image/*');
        //         });
        //         dispatch(updateImgSrc(cropped));
        //     }, 200);
        // } else {
        //     // Timeout for flash.
        //     setTimeout(async () => {
        //         let cropped = '';
        //         await cropFromCamera(imageSrc, 1).then((canvas: any) => {
        //             cropped = canvas.toDataURL('image/*');
        //         });
        //         dispatch(pushImgNow(cropped));
        //         setGetReady(true);
        //     }, 200);
        // }
    }, [webcam]);

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
                        // drawFaceMesh(ctx, prediction);
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
        ctx.rect(x, y, width, height);
        ctx.lineWidth = 4;
        ctx.strokeStyle = 'red';
        ctx.stroke();
    };

    // const drawFaceMesh = (ctx, prediction) => {
    //     prediction.keypoints.forEach((item) => {
    //         const x = item.x;
    //         const y = item.y;
    //         ctx.fillRect(x, y, 2, 2);
    //         ctx.fillStyle = '#69ffe1';
    //     });
    // };

    useEffect(() => {
        runDetection();
    }, [webcam.current?.video?.readyState]);

    return (
        <>
            <Webcam
                audio={false}
                ref={webcam}
                style={{
                    position: 'absolute',
                    margin: 'auto',
                    textAlign: 'center',
                    top: 50,
                    left: 0,
                    right: 0,
                    maxWidth: '640px',
                    maxHeight: '480px'
                }}
                screenshotFormat='image/jpeg'
            />
            <canvas
                ref={canvas}
                style={{
                    position: 'absolute',
                    margin: 'auto',
                    textAlign: 'center',
                    top: 50,
                    left: 0,
                    right: 0
                }}
            />
        </>
    );
};

export default WebcamComponent;
