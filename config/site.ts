export const siteConfig = {
  name: "Alexis Nesteby",
  description: "Description",
  url: "https://example.com",
  author: "John Doe",
  siteMap: [
    { name: "Home", href: "/" },
    { name: "About Me", href: "/about" },
    { name: "Recent Work", href: "/recent" },
    { name: "Flash", href: "/flash" },
  ],
};

export type SiteConfigType = typeof siteConfig;
