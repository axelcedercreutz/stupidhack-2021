import requests



def nocoaly(imageFilePath):
    
    key = '211ac60592be4870a8113c3f96d98693'
    url = 'https://nocco.cognitiveservices.azure.com/'
    
    with open(imageFilePath) as imageFile:
        imageData = imageFile.read

    response = requests.post(url, headers={"Prediction-Key": key}, data=imageData)
    print(response.json)

if __name__ == "__main__":
    #path = input("path: ")
    nocoaly("testi1.jpg")