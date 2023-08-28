import banner from "../assets/images/home-banner.png";
import bannerMobile from "../assets/images/mobile-home-banner.png";

function Banner() {
  return (
    <section className="w-full h-[400px] flex flex-col items-center justify-center">
      <div className="max-w-[1200px] overflow-hidden">
        <img
          src={banner}
          alt=""
          className="hidden lg:block object-cover w-[1200px] h-[350px] rounded-xl"
        />
        <img
          src={bannerMobile}
          alt=""
          className="block lg:hidden object-cover w-[1200px] h-[400px]"
        />
      </div>
    </section>
  );
}

export default Banner;
