import cv2 as cv
import numpy as np

img = cv.imread("C:/Users/Administrator/Pictures/map.jpg")
yuv= cv.cvtColor(img, cv.COLOR_BGR2YUV)
# 将Y平面的数据乘以1.2
yuv[:,:,0] = np.clip(yuv[:,:,0] * 1.2, 0, 255).astype(np.uint8)

# 将YUV图像转换回BGR颜色空间
img2 = cv.cvtColor(yuv, cv.COLOR_YUV2BGR)
# 创建一个水平拼接的图像
combined = np.hstack((img, img2))

# 显示拼接后的图像
cv.imshow('原图 vs 增强后', combined)
cv.waitKey(0)
cv.destroyAllWindows()

