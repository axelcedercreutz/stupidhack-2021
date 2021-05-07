from skimage import img_as_float
from skimage.metrics import structural_similarity as ssim
from skimage.metrics import mean_squared_error
import cv2
import numpy as np

EDISTANCE_THRESH = 12000
ERROR_THRESH = 15000

def check_similarity(source):
    source_h, source_w, _ = source.shape

    reference = cv2.imread("reference.png")
    reference_h, reference_w, _ = reference.shape

    # resize image to same size
    dsize = (source_w, source_h)
    reference = cv2.resize(reference, dsize)

    # convert the images to grayscale
    source = cv2.cvtColor(source, cv2.COLOR_BGR2GRAY)
    reference = cv2.cvtColor(reference, cv2.COLOR_BGR2GRAY)

    # calculate histograms
    source_histogram = cv2.calcHist([source], [0], None, [256], [0, 256])
    reference_histogram = cv2.calcHist([reference], [0], None, [256], [0, 256])
    
    # Euclidean distance
    match = 0
    i = 0
    while i < len(source_histogram) and i < len(reference_histogram):
        match += (source_histogram[i] - reference_histogram[i]) ** 2
        i += 1
    match = match[0] ** (1 / 2)
    print(f"Euclidean distance: {match}")

    """
    # similarity index
    similarity_index, = ssim(source, reference)
    print(f"Similarity index: {similarity_index}")
    """
    
    # image mean_error
    mean_error = mean_squared_error(source, reference)
    print("Mean error: {}".format(mean_error))

    global EDISTANCE_THRESH
    global ERROR_THRESH

    is_similar = match < EDISTANCE_THRESH and mean_error < ERROR_THRESH
    print(f"Is similar enough: Euclidean distance – {match < EDISTANCE_THRESH}, Mean error – {mean_error < ERROR_THRESH}\n")

    return is_similar