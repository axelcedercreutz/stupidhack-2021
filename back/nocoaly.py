import requests

flavours = ["blood orange de", "caribbean", "carnival exotic", "cola", "ice soda", "legenda soda", "limon del sol", "mango del sol", "melon crush", "miami strawberry", "päärynä", "rasberry blast", "sunny soda", "tropical"]



def nocoaly(imageFilePath):
    
    key = '7c6be91133734a54bb820054054cb22e'
    url = 'https://nocco.cognitiveservices.azure.com/customvision/v3.0/Prediction/364c483e-0d8f-4080-a1c8-cb8fca10f4dd/detect/iterations/Iteration1/image'
    
    with open(imageFilePath, 'rb') as imageFile:
        f = imageFile.read()
        imageData = bytearray(f)

    response = requests.post(url, headers={"Prediction-Key": key, "Content-Type": "application/octet-stream"}, data=imageData)
    
    foundTagnames = [] 
    responseData = response.json()
    if 'predictions' in responseData.keys():
        for prediction in responseData["predictions"]:
            if prediction['probability'] >= 0.5:
                tagname = prediction['tagName']
                if tagname in flavours:
                    foundTagnames.append(tagname)
                
    return foundTagnames

if __name__ == "__main__":
    #path = input("path: ")
    print(nocoaly("testi1.jpg"))