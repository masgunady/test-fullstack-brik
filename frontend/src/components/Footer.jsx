import logo from "../assets/images/kelontong-logo.png";
import { Link } from "react-router-dom";
import {
  AiOutlineInstagram,
  AiFillFacebook,
  AiFillYoutube,
  AiOutlineTwitter,
} from "react-icons/ai";

function Footer() {
  return (
    <footer className="border-t-2 border-slate-100 bg-white w-[100%] min-h-[500px] flex flex-col items-start md:items-center justify-start md:justify-center px-9 md:px-11 xl:px-60 2xl:px-60">
      <div className="w-[100%] flex flex-col md:flex-row pt-7 justify-center md:justify-between gap-2 mb-7">
        <div className="flex flex-col gap-5 md:max-w-[300px]">
          <div className="flex flex-col justify-between h-full gap-3">
            <div className="w-full flex justify-center items-center">
              <img src={logo} alt="logo" className="w-36 h-36" />
            </div>
            <div className="flex flex-col gap-4">
              <div className="text-primary">Find me on social media</div>
              <div className="flex flex-row gap-7 text-xl text-primary capitalize tracking-[1px]">
                <div>
                  <Link
                    to="https://www.instagram.com"
                    target="_blank"
                    className="hover:text-[#373a42]"
                  >
                    <AiOutlineInstagram size={35} />
                  </Link>
                </div>
                <div>
                  <Link
                    to="https://www.facebook.com"
                    target="_blank"
                    className="hover:text-[#373a42]"
                  >
                    <AiFillFacebook size={35} />
                  </Link>
                </div>
                <div>
                  <Link
                    to="https://www.youtube.com"
                    target="_blank"
                    className="hover:text-[#373a42]"
                  >
                    <AiFillYoutube size={35} />
                  </Link>
                </div>
                <div>
                  <Link to="/" className="hover:text-[#373a42]">
                    <AiOutlineTwitter size={35} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[100%] text-primary">&copy; 2023 Kelontong Kami</div>
    </footer>
  );
}

export default Footer;
