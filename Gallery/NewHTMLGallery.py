import os
from PIL import Image

def removeVideos(images):
    for image in images:
        if image[-4:] == ".mov" or image == ".DS_Store":
            images.pop(images.index(image))

def biggestHeightRatio(images):
    largest = 0
    imageWithLargest = ""
    for image in images:
        width, height = Image.open("Images/"+image).size
        if height / width > largest: largest = height / width; imageWithLargest = image
    return imageWithLargest

def sortByHeightRatio(images):
    newImageOrder = []
    while len(images) > 0:
        tallestImage = biggestHeightRatio(images)
        newImageOrder.append(tallestImage)
        images.pop(images.index(tallestImage))
    images.extend(newImageOrder)

def openingStatements():
    print("<!DOCTYPE html>", file=file)

    print("<html>\n<head>\n", file=file)
    print('\t<meta charset="utf-8">\n\t<meta http-equiv="X-UA-Compatible" content="IE=edge">\n\t<meta name="viewport" content="width=device-width, initial-scale=1">\n',file=file)
    print('\t<title>JSC Gallery</title>\n', file=file)

    print('\t<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">', file=file)
    print('\t<link href="https://fonts.googleapis.com/css?family=Droid+Sans:400,700" rel="stylesheet">', file=file)
    print('\t<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/baguettebox.js/1.8.1/baguetteBox.min.css">', file=file)
    print('\t<link rel="stylesheet" href="fluid-gallery.css">\n\n</head>', file=file)

    print('<body>\n',file=file)
    print('<div class="container gallery-container">\n', file=file)
    print('\t<div class="tz-gallery">\n\n\t\t<div class="row">\n', file=file)

def loadImages():
    opening = '\t\t\t<div class="col-sm-4 col-md-4">'
    images = os.listdir('Images')
    removeVideos(images)
    sortByHeightRatio(images)
    for imageName in images:
        href = '\t\t\t\t<a class="lightbox" href="Images/'+imageName+'">'
        imgsrc = '\t\t\t\t\t<img src="Images/'+imageName+'" alt="'+imageName+'">'
        print(opening, file=file)
        print(href + "\n" + imgsrc + "\n\t\t\t\t</a>\n\t\t\t</div>\n", file=file)

def closingStatements():
    print("\t\t</div>\n\n\t</div>\n\n</div>\n", file=file)
    print('<script src="https://cdnjs.cloudflare.com/ajax/libs/baguettebox.js/1.8.1/baguetteBox.min.js"></script>', file = file)
    print("<script>\n\tbaguetteBox.run('.tz-gallery');\n</script>\n", file=file)
    print("</body>\n</html>", file=file)

file = open("index.html", "w")
openingStatements()
loadImages()
closingStatements()
file.close()
