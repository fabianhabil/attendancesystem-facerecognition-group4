import cv2
import face_recognition
import json
import numpy as np
import time
import os

dictionary = {}


def writeDataSet():
    try:
        directoryPath = './images/models'
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
        if jsonFile == None:
            os.remove('./images/tempimages/absen.jpeg')
            return "Not Found"
        img = cv2.imread('./images/tempimages/absen.jpeg')
        rgb_img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        imgEncoding = face_recognition.face_encodings(rgb_img)[0]
        for userId, datasetArray in jsonFile.items():
            # print(f"Checking user {userId}")
            index = 1
            for dataset in datasetArray:
                result = face_recognition.compare_faces(
                    [imgEncoding], np.array(dataset), 0.5)
                if result[0] == True:
                    # print("User found")
                    # print(index)
                    os.remove('./images/tempimages/absen.jpeg')
                    return userId
                index += 1
        os.remove('./images/tempimages/absen.jpeg')
        return "Not Found"
    except Exception as e:
        print(e)
        os.remove('./images/tempimages/absen.jpeg')
        return None


def openJson():
    try:
        f = open("./model.json")
        jsonFile = json.load(f)
        return jsonFile
    except:
        return None


def moveModel(userId):
    try:
        jsonFile = openJson()
        folder = f"./images/models/{userId}"
        if os.path.exists(folder) == False:
            os.mkdir(folder)
        length = len(os.listdir(folder)) + 1
        os.rename(f"./images/models/{userId}.jpeg",
                  f"./images/models/{userId}/{length}.jpeg")

        model = {}

        if jsonFile != None:
            model = jsonFile

        img = cv2.imread(f"./images/models/{userId}/{length}.jpeg")
        rgb_img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        img_encoding = face_recognition.face_encodings(
            face_image=rgb_img, num_jitters=3)[0]

        if model.get(userId) == None:
            model[userId] = []
        model[userId].append(img_encoding.tolist())
        json_object = json.dumps(model, indent=4)

        with open("./model.json", "w") as outfile:
            outfile.write(json_object)
            return True

    except Exception as e:
        print(e)
        os.remove(f"./images/models/{userId}/{length}.jpeg")
        return False
