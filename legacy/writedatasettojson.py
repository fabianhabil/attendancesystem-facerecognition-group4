import cv2
import face_recognition
import json
import numpy as np
import os

directoryPath = '.\images'
dictionary = {}

def writeDataSet():
    print(f"{len(os.listdir(directoryPath))} folder detected")

    for folder in os.listdir(directoryPath):
        f = os.path.join(directoryPath, folder)
        dictionary[folder] = []
        print(f"making {len(os.listdir(f))} dataset from image for user {folder}")
        for filename in os.listdir(f):
            file = os.path.join(f, filename)
            img = cv2.imread(file)
            rgb_img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
            img_encoding = face_recognition.face_encodings(
                face_image=rgb_img, num_jitters=2)[0]
            dictionary[folder].append(img_encoding.tolist())

    json_object = json.dumps(dictionary, indent=4)
    with open("sample.json", "w") as outfile:
        outfile.write(json_object)
        print("dataset saved at sample.json")
    

writeDataSet()