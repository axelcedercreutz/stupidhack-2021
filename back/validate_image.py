from find_countors import find_countors
from check_similarity import check_similarity

import cv2


def validate_image(source):
  original = source.copy()
  contours = find_countors(source)

  for contour in contours:
    if check_similarity(contour):
      cv2.imwrite('reference.png', original)
      return True

  return False

test = cv2.imread("test/test2.jpg")
validate_image(test)