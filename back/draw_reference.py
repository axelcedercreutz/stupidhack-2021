import cv2

BORDER_WIDTH = 25

def draw_borders(source):
  global BORDER_WIDTH

  bordered_image = cv2.copyMakeBorder(source, BORDER_WIDTH, BORDER_WIDTH, BORDER_WIDTH, BORDER_WIDTH, borderType=cv2.BORDER_CONSTANT, value=0)
  bordered_image = cv2.copyMakeBorder(bordered_image, BORDER_WIDTH, BORDER_WIDTH, BORDER_WIDTH, BORDER_WIDTH, borderType=cv2.BORDER_CONSTANT, value=[255,255,255])
  bordered_image = cv2.copyMakeBorder(bordered_image, BORDER_WIDTH, BORDER_WIDTH, BORDER_WIDTH, BORDER_WIDTH, borderType=cv2.BORDER_CONSTANT, value=0)

  return bordered_image