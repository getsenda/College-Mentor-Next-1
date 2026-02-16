export const buildShareUrl = (
  platform: string,
  pageUrl: string,
  title: string
) => {
  switch (platform) {
    case "whatsapp":
      return `https://api.whatsapp.com/send/?text=${encodeURIComponent(
        `${title} ${pageUrl}`
      )}&type=custom_url&app_absent=0`;

    case "facebook":
      return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        pageUrl
      )}`;

    case "linkedin":
      return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        pageUrl
      )}`;

    case "telegram":
      return `https://t.me/share/url?url=${encodeURIComponent(
        pageUrl
      )}&text=${encodeURIComponent(title)}`;

    default:
      return "";
  }
};
