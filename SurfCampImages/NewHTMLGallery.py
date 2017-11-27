import os

file = open("gallery.html", "w")

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

#Load Images
opening = '\t\t\t<div class="col-sm-12 col-md-4">'
images = os.listdir('Images')

for imageName in images:
    href = '\t\t\t\t<a class="lightbox" href="Images/'+imageName+'">'
    imgsrc = '\t\t\t\t\t<img src="Images/'+imageName+'" alt="">'
    print(opening, file=file)
    print(href + "\n" + imgsrc + "\n\t\t\t\t</a>\n\t\t\t</div>\n", file=file)

print("\t\t</div>\n\n\t</div>\n\n</div>", file=file)
    

file.close()
