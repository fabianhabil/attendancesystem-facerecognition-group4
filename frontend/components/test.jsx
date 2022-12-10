import Head from 'next/head';
import Webcam from 'react-webcam';
import { useEffect, useRef } from 'react';

import '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-backend-webgl';
import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';
import * as faceMesh from '@mediapipe/face_mesh';

const TestWebcam = () => {
    const webcam = useRef(null);
    const canvas = useRef(null);

    const runDetection = async () => {
        const model = faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh;
        const detectorConfig = {
            runtime: 'mediapipe', // or 'tfjs'
            solutionPath: `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@${faceMesh.VERSION}`,
            maxFaces: 10
        };
        // create detector
        const detector = await faceLandmarksDetection.createDetector(model, detectorConfig);
        // run detection
        await detect(detector);
    };

    const detect = async (detector) => {
        try {
            if (webcam.current && detector) {
                const webcamCurrent = webcam.current;
                // go next step only when the video is completely uploaded.
                if (webcamCurrent.video.readyState === 4) {
                    const video = webcamCurrent.video;
                    const predictions = await detector.estimateFaces(video);
                    console.log(predictions);
                    requestAnimationFrame(() => {
                        draw(predictions);
                    });
                    setTimeout(() => {
                        detect(detector);
                    }, 1000);
                } else {
                    setTimeout(() => {
                        detect(detector);
                    }, 1000);
                }
            }
        } catch (error) {
            setTimeout(() => {
                detect(detector);
            }, 1000);
        }
    };

    const draw = (predictions) => {
        try {
            if (canvas.current) {
                const ctx = canvas.current.getContext('2d');
                if (ctx) {
                    predictions.forEach((prediction) => {
                        console.log('test');
                        drawBox(ctx, prediction);
                        drawFaceMesh(ctx, prediction);
                    });
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    const drawBox = (ctx, prediction) => {
        const x = prediction.box.xMin;
        const y = prediction.box.yMin;
        const width = prediction.box.width;
        const height = prediction.box.height;
        ctx.beginPath();
        ctx.rect(x, y, width, height);
        ctx.strokeStyle = 'red';
        ctx.stroke();
    };

    const drawFaceMesh = (ctx, prediction) => {
        prediction.keypoints.forEach((item) => {
            const x = item.x;
            const y = item.y;
            ctx.fillRect(x, y, 2, 2);
            ctx.fillStyle = '#69ffe1';
        });
    };

    useEffect(() => {
        runDetection();
    }, [webcam.current?.video?.readyState]);

    return (
        <>
            <Head>
                <title>tugas</title>
            </Head>
            <Webcam
                audio={false}
                ref={webcam}
                style={{
                    position: 'absolute',
                    margin: 'auto',
                    textAlign: 'center',
                    top: 50,
                    left: 0,
                    right: 0
                }}
            />
            <canvas
                ref={canvas}
                style={{
                    position: 'absolute',
                    margin: 'auto',
                    textAlign: 'center',
                    top: 50,
                    left: 0,
                    right: 0,
                    height: 480,
                    width: 640
                }}
            />
        </>
    );
};

export default TestWebcam;
