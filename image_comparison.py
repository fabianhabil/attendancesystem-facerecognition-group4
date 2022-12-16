import cv2
import face_recognition
import json
import numpy as np

img = cv2.imread("./images/Fabian-1.jpg")
rgb_img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
img_encoding = face_recognition.face_encodings(rgb_img)[0]

# img2 = cv2.imread("./images/Fabian-Sampel2.jpg")
# rgb_img2 = cv2.cvtColor(img2, cv2.COLOR_BGR2RGB)
# img_encoding2 = face_recognition.face_encodings(rgb_img2)[0]

f = open("sample.json")
jsonFile = json.load(f)


result = face_recognition.compare_faces(
    [img_encoding], np.array(jsonFile["id2"]))
print("Result: ", result[0])