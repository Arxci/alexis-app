import { HomeAbout } from "./_sections/home-about";
import { HomeBanner } from "./_sections/home-banner";
import { HomeGallery } from "./_sections/home-gallery";
import { HomeRecentWork } from "./_sections/home-recent-work";

export default function Home() {
  return (
    <main className="">
      <HomeBanner />
      <HomeAbout />
      <HomeGallery />
      <HomeRecentWork />
    </main>
  );
}
