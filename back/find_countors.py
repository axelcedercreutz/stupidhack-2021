import cv2
import numpy as np

from threshold_image import threshold_image

# Load imgae, grayscale, Gaussian blur, Otsu's threshold

def find_countors(image):
  image_h, image_w, _ = image.shape
  original = image.copy()

  thresh = threshold_image(image)

  # Morph close
  kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (2,2))
  close = cv2.morphologyEx(thresh, cv2.MORPH_CLOSE, kernel, iterations=2)

  # Find contours
  contours = cv2.findContours(close, cv2.RETR_LIST, cv2.CHAIN_APPROX_SIMPLE)
  contours = contours[0] if len(contours) == 2 else contours[1]
  
  matches = []
  id = 0
  
  for countor in contours:
    x, y, w, h = cv2.boundingRect(countor)
    cv2.rectangle(image, (x, y), (x + w, y + h), (36,255,12), 3)
    cropped_contour = original[y:y+h, x:x+w]

    if w > image_w * 0.1 and h > image_h * 0.1:
      # cv2.imwrite(f'contours/{id}.png', cropped_contour)
      matches.append(cropped_contour)
      id += 1

  print(f"Found {len(matches)} contours\n")
  return matches