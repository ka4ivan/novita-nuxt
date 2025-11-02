
export function scrollBody(val: boolean) {
  const htmlStyle = document.documentElement.style,
    // bodyStyle = document.body.style,
    scrollWindow = `${window.innerWidth - document.documentElement.clientWidth}px`
  if (val) {
    htmlStyle.overflow = "hidden";
    // bodyStyle.overflow = "hidden";
    // htmlStyle.height = "100%";
    // bodyStyle.height = "100%";
    htmlStyle.marginRight = scrollWindow;
  } else {
    htmlStyle.overflow = "auto";
    // bodyStyle.overflow = "auto";
    // htmlStyle.height = "auto";
    // bodyStyle.height = "auto";
    htmlStyle.marginRight = '0px';
  }
}
