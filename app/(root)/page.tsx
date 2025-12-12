import { HomeAbout } from "./_sections/home-about";
import { HomeBanner } from "./_sections/home-banner";
import { HomeFlash } from "./_sections/home-flash";
import { HomeRecentWork } from "./_sections/home-recent-work";

export default function Home() {
  return (
    <main className="">
      <HomeBanner />
      <HomeAbout />
      <HomeFlash />
      <HomeRecentWork />
    </main>
  );
}
