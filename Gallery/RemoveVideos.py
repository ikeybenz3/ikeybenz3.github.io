import os

def removeVideos():
    images = os.listdir('Images')
    for image in images:
        if image[-4:] == ".mov":
            os.remove("Images/"+image)

def renameInOrder():
    images = os.listdir('Images')
    counter = 1
    for image in images:
        os.rename("Images/"+image, str(counter))
        counter += 1
def fixTheFuckup():
    for i in range(1, 188):
        os.rename(str(i), "Images/"+str(i)+".JPG")

fixTheFuckup()

        
