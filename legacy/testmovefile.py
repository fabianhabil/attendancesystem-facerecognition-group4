import os

if os.path.exists("./images/6023186123") == False:
    os.mkdir("./images/6023186123")
print(len(os.listdir("./images/6023186123")))

os.rename("./images/Fabian/Fabian.jpg",
          "./images/6023186123/Fabian{}.jpg".format(len(os.listdir("./images/6023186123"))))
