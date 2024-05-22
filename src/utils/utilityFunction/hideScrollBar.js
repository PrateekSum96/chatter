export const hideScrollBar = (showLayover) => {
  if (showLayover) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
};
