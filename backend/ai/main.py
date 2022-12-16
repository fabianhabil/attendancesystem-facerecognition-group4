import cv2
import face_recognition
import json
import numpy as np
import os

dictionary = {}


def writeDataSet():
    try:
        directoryPath = './images/model'
        print(f"{len(os.listdir(directoryPath))} folder detected")

        for folder in os.listdir(directoryPath):
            f = os.path.join(directoryPath, folder)
            dictionary[folder] = []
            print(
                f"making {len(os.listdir(f))} dataset from image for user {folder}")
            for filename in os.listdir(f):
                file = os.path.join(f, filename)
                img = cv2.imread(file)
                rgb_img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
                img_encoding = face_recognition.face_encodings(
                    face_image=rgb_img, num_jitters=2)[0]
                dictionary[folder].append(img_encoding.tolist())

        json_object = json.dumps(dictionary, indent=4)
        with open("./model.json", "w") as outfile:
            outfile.write(json_object)
            print("dataset saved at sample.json")
            return True
    except:
        return False


def recognize():
    try:
        jsonFile = openJson()
        img = cv2.imread('./images/tempimages/absen.jpg')
        rgb_img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        imgEncoding = face_recognition.face_encodings(rgb_img)[0]
        for userId, datasetArray in jsonFile.items():
            print(f"Checking user {userId}")
            index = 1
            for dataset in datasetArray:
                result = face_recognition.compare_faces(
                    [imgEncoding], np.array(dataset), 0.52)
                if result[0] == True:
                    print("User found")
                    print(index)
                    os.remove('./images/tempimages/absen.jpg')
                    return userId
                index += 1
        os.remove('./images/tempimages/absen.jpg')
        return "Not Found"
    except Exception as e:
        print(e)
        os.remove('./images/tempimages/absen.jpg')
        return None


def openJson():
    try:
        f = open("./model.json")
        jsonFile = json.load(f)
        return jsonFile
    except:
        return None
