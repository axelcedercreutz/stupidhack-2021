import cv2
import numpy as np

# Load imgae, grayscale, Gaussian blur, Otsu's threshold

def find_countors(image):
  image_h, image_w, _ = image.shape
  original = image.copy()

  # edit images
  gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
  blur = cv2.GaussianBlur(gray, (9,9), 0)
  _, thresh = cv2.threshold(blur, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)

  # Morph close
  kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (2,2))
  close = cv2.morphologyEx(thresh, cv2.MORPH_CLOSE, kernel, iterations=2)

  # Find contours
  contours = cv2.findContours(close, cv2.RETR_LIST, cv2.CHAIN_APPROX_SIMPLE)
  contours = contours[0] if len(contours) == 2 else contours[1]
  
  matches = []
  
  for countor in contours:
    x, y, w, h = cv2.boundingRect(countor)
    cv2.rectangle(image, (x, y), (x + w, y + h), (36,255,12), 3)
    cropped_contour = original[y:y+h, x:x+w]

    if w > image_w * 0.1 and h > image_h * 0.1:
      matches.append(cropped_contour)

  return matches