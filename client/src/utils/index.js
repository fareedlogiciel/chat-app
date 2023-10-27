export const openLinkInNewTab = (url) => {
  if (url) {
    window?.open(url, "_blank", "noreferrer");
  }
};
