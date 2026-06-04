// utils/imageHelper.js

/**
 * 获取图片路径 - 使用 Vite 的静态资源导入
 * @param {string} imgPath - 原始图片路径
 * @returns {string} 处理后的完整URL
 */
export const formatImagePath = (imgPath) => {
  if (!imgPath) return ''
  
  // 如果已经是完整URL，直接返回
  if (imgPath.startsWith('http') || imgPath.startsWith('data:') || imgPath.startsWith('blob:')) {
    return imgPath
  }
  
  // 使用 Vite 的静态资源处理方式
  // 注意：需要导入所有图片，或者使用动态导入
  try {
    // 方案2A：使用 new URL 但基于 /src 目录
    const cleanPath = imgPath.replace(/^\.\.\/\.\.\//, '/src/')
    return new URL(cleanPath, import.meta.url).href
  } catch (error) {
    console.warn(`图片路径解析失败: ${imgPath}`, error)
    return imgPath
  }
}