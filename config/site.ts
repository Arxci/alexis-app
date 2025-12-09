export const siteConfig = {
  name: "Name",
  description: "Description",
  url: "https://example.com",
  author: "John Doe",
  siteMap: [
    { name: "Home", href: "/" },
    { name: "About Me", href: "/" },
    { name: "Recent Work", href: "/" },
    { name: "Gallery", href: "/" },
  ],
};

export type SiteConfigType = typeof siteConfig;
