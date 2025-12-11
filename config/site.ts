export const siteConfig = {
  name: "Alexis Nesteby",
  description: "Description",
  url: "https://example.com",
  author: "John Doe",
  siteMap: [
    { name: "Home", href: "/" },
    { name: "About Me", href: "/about" },
    { name: "Flash", href: "/flash" },
    { name: "Recent Work", href: "/recent" },
  ],
};

export type SiteConfigType = typeof siteConfig;
