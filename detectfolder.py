import cv2
import face_recognition
import json
import numpy as np
import os

def recognize(imgEncoding):
    for userId, datasetArray in jsonFile.items():
        print(f"Checking user {userId}")
        index = 1
        for dataset in datasetArray:
            result = face_recognition.compare_faces(
                [imgEncoding], np.array(dataset), 0.54)
            if result[0] == True:
                print("User found")
                print(index)
                return userId
            index += 1


f = open("sample.json")
jsonFile = json.load(f)

# img = cv2.imread("./unrecognized-images/3.jpeg")
# rgb_img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
# img_encoding = face_recognition.face_encodings(rgb_img)[0]
# for userId, datasetArray in jsonFile.items():

directory = '.\\unrecognized-images'

for filename in os.listdir(directory):
    file = os.path.join(directory, filename)
    img = cv2.imread(file)
    rgb_img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    imgEncoding = face_recognition.face_encodings(rgb_img)[0]
    result = recognize(imgEncoding)
    print(f"{file} {result}")
