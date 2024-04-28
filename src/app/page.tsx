import GetMostLikedReivew from '@/components/mainpage/GetMostLikedReview';
import MainBanner from '@/components/mainpage/MainBanner';
import MainBottomBanner from '@/components/mainpage/MainBottomBanner';
import MainMiddleBanner from '@/components/mainpage/MainMiddleBanner';

import ProfileRouteModal from '@/components/mainpage/ProfileRouteModal';
import UseInformation from '@/components/mainpage/UseInformation';

export default function Home() {
  return (
    <main className="w-full flex flex-col items-center justify-content gap-12">
      <MainBanner />
      <GetMostLikedReivew />
      <MainMiddleBanner />
      <UseInformation />
      <ProfileRouteModal />
      <MainBottomBanner />
    </main>
  );
}
