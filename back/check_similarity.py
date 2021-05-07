from skimage import img_as_float
from skimage.metrics import structural_similarity as ssim
from skimage.metrics import mean_squared_error
import cv2
import numpy as np

EDISTANCE_THRESH = 15000
ERROR_THRESH = 10100
SSIM_THRESH = 0.3

def check_similarity(source):
    global EDISTANCE_THRESH
    global ERROR_THRESH
    global SSIM_THRESH

    source_h, source_w, _ = source.shape

    reference = cv2.imread("reference.png")
    reference_h, reference_w, _ = reference.shape

    source_ar = source_w / source_h
    reference_ar = reference_w / reference_h
    is_size_within_bounds = abs(source_ar - reference_ar) < 1

    if not is_size_within_bounds:
        print("Invalid aspect ratio")
        return False

    # resize image to same size
    dsize = (source_w, source_h)
    reference = cv2.resize(reference, dsize)

    # grayscale
    source = cv2.cvtColor(source, cv2.COLOR_BGR2GRAY)
    reference = cv2.cvtColor(reference, cv2.COLOR_BGR2GRAY)

    # calculate histograms
    source_histogram = cv2.calcHist([source], [0], None, [256], [0, 256])
    reference_histogram = cv2.calcHist([reference], [0], None, [256], [0, 256])

    hist_match = cv2.compareHist(source_histogram, reference_histogram, 1)

    # Euclidean distance
    match = 0
    i = 0
    while i < len(source_histogram) and i < len(reference_histogram):
        match += (source_histogram[i] - reference_histogram[i]) ** 2
        i += 1
    match = match[0] ** (1 / 2)
    print(f"Euclidean distance: {match}, PASS: {match < EDISTANCE_THRESH}")

    # image mean_error
    mean_error = mean_squared_error(source, reference)
    print(f"Mean error: {mean_error}, PASS: {mean_error < ERROR_THRESH}")

    similarity_index = ssim(source, reference)
    print(f"Similarity index: {similarity_index}, PASS: {similarity_index > SSIM_THRESH}")

    is_similar = similarity_index > SSIM_THRESH and mean_error < ERROR_THRESH
    print(f"Is similar enough: {is_similar}\n")

    return is_similar