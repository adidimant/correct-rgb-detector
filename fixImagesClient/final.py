import os
import sys
import math
import cv2
import numpy as np
import http.client
import json
from skimage.exposure import is_low_contrast
from PIL import Image


def adaptive_gamma_correction_with_weighting_distribution(image, gammas=(0.5, 1, 1.5, 2)):
    is_colorful = len(image.shape) >= 3
    img = extract_value_channel(image) if is_colorful else image
    img_pdf = get_pdf(img)
    max_intensity = np.max(img_pdf)
    min_intensity = np.min(img_pdf)
    enhanced_images = []
    l_intensity = np.arange(0, 256)
    for gamma in gammas:
        w_img_pdf = max_intensity * (((img_pdf - min_intensity) / (max_intensity - min_intensity)) ** gamma)
        w_img_cdf = np.cumsum(w_img_pdf) / np.sum(w_img_pdf)
        l_intensity = np.array([255 * (e / 255) ** (1 - w_img_cdf[e]) for e in l_intensity], dtype=np.uint8)
        enhanced_image = np.copy(img)
        height, width = img.shape
        for i in range(0, height):
            for j in range(0, width):
                intensity = enhanced_image[i, j]
                enhanced_image[i, j] = l_intensity[intensity]
        enhanced_image = set_value_channel(image, enhanced_image) if is_colorful else enhanced_image
        enhanced_images.append(enhanced_image)
    return enhanced_images, gammas


def extract_value_channel(color_image):
    color_image = color_image.astype(np.float32) / 255.
    hsv = cv2.cvtColor(color_image, cv2.COLOR_BGR2HSV)
    v = hsv[:, :, 2]
    return np.uint8(v * 255)


def get_pdf(gray_image):
    height, width = gray_image.shape
    pixel_count = height * width
    hist = cv2.calcHist([gray_image], [0], None, [256], [0, 256])
    return hist / pixel_count


def set_value_channel(color_image, value_channel):
    value_channel = value_channel.astype(np.float32) / 255
    color_image = color_image.astype(np.float32) / 255.
    color_image = cv2.cvtColor(color_image, cv2.COLOR_BGR2HSV)
    color_image[:, :, 2] = value_channel
    color_image = np.array(cv2.cvtColor(color_image, cv2.COLOR_HSV2BGR) * 255, dtype=np.uint8)
    return color_image


def apply_gama_correction(img, mid=0.5):
    gray_img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    mean = np.mean(gray_img)
    gamma = max((math.log(mid * 255) / math.log(mean)), 0)
    img_after_gamma_correction = np.power(img, gamma).clip(0, 255).astype(np.uint8)
    return img_after_gamma_correction


def is_light(img):
    gray_img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    return is_low_contrast(gray_img)


def fixImage(path):
    enhanced_images = []
    bounds = [0.3, 0.4, 0.5, 0.6, 0.7]
    probabilities = [0.125, 0.225, 0.30, 0.225, 0.125]
    img = cv2.imread(path)

    if is_light(img):
        enhanced_images, weights = adaptive_gamma_correction_with_weighting_distribution(img)
        for enhanced_image in enhanced_images:
            enhanced_image = cv2.resize(enhanced_image, (360, 240))

    else:
        for b in bounds:
            img_after_gamma = apply_gama_correction(img, mid=b)
            enhanced_image = cv2.resize(img_after_gamma, (360, 240))
            enhanced_images.append(enhanced_image)

    enhanced_images_arr = [np.array(image) for image in enhanced_images]
    images_and_probs = zip(enhanced_images_arr, probabilities)

    final_images_with_probabilities = []

    for index, (image, probability) in enumerate(images_and_probs):
        path = f'image{index}'
        f = open(path, 'a')
        ans = array2PIL(image, image.shape[0:2])
        ans.save(f'image{index}', format="png")
        f.close()
        final_images_with_probabilities.append({'path': f'image{index}', 'probability': probability})

    return final_images_with_probabilities

def PIL2array(img):
    return np.array(img.getdata(), np.uint8).reshape(img.size[1], img.size[0], 3)

def array2PIL(arr, size):
    mode = 'RGBA'
    arr = arr.reshape(arr.shape[0] * arr.shape[1], arr.shape[2])
    if len(arr[0]) == 3:
        arr = np.c_[arr, 255 * np.ones((len(arr), 1), np.uint8)]
    return Image.frombuffer(mode, size, arr.tobytes(), 'raw', mode, 0, 1)


if len(sys.argv) > 1:
    print(json.dumps(fixImage(sys.argv[1])))
else:
    print([])
