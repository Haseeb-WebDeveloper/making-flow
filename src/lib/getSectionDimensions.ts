/**
 * Gets the current dimensions of a section element
 * @param element - The HTML element to measure
 * @returns Object containing width, height, and position properties
 */
export const getSectionDimensions = (element: HTMLElement | null) => {
  if (!element) {
    return {
      width: 0,
      height: 0,
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    };
  }

  const rect = element.getBoundingClientRect();
  
  return {
    width: rect.width,
    height: rect.height,
    top: rect.top,
    left: rect.left,
    bottom: rect.bottom,
    right: rect.right,
  };
};

/**
 * Gets the current dimensions of a section by its ID
 * @param id - The ID of the element to measure
 * @returns Object containing width, height, and position properties
 */
export const getSectionDimensionsById = (id: string) => {
  const element = document.getElementById(id);
  return getSectionDimensions(element);
};

export default {
  getSectionDimensions,
  getSectionDimensionsById,
};