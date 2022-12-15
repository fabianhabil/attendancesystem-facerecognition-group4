import cv2
import face_recognition
import json
import numpy as np

def recognize(userId, datasetArray):
    print(f"Checking user {userId}")
    index = 0
    for dataset in datasetArray:
        result = face_recognition.compare_faces(
            [img_encoding], np.array(dataset))
        if result[0] == True:
            print("User found")
            print(index)
            return userId
        index+=1


f = open("sample.json")
jsonFile = json.load(f)

img = cv2.imread("./unrecognized-images/3.jpeg")
rgb_img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
img_encoding = face_recognition.face_encodings(rgb_img)[0]

for userId, datasetArray in jsonFile.items():
    result = recognize(userId, datasetArray)
    if result != None:
        print(result)
        break
        
