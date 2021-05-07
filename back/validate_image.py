from find_countors import find_countors
from check_similarity import check_similarity
from draw_reference import draw_borders
import cv2


def validate_image(source):
  original = source.copy()
  contours = find_countors(source)

  i = 0
  for contour in contours:
    print("Image", i)
    i += 1
    if check_similarity(contour):
      # cv2.imwrite('latest_match.png', contour)
      bordered_image = draw_borders(original)
      cv2.imwrite('reference.png', bordered_image)

      print("Successfully continued NOCCChain")
      return True

  print("Invalid chain!")
  return False

test = cv2.imread("test/test3.jpg")
validate_image(test)