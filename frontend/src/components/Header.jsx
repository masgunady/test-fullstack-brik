import { Link, useNavigate } from "react-router-dom";
import { FiAlignJustify } from "react-icons/fi";
import logo from "../assets/images/kelontong-logo.png";
import { useDispatch, useSelector } from "react-redux";
import { logout as logoutAction } from "../redux/reducers/auth";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector((state) => state.auth.token);
  const doLogout = () => {
    dispatch(logoutAction());
    navigate("/auth/login");
  };
  return (
    <>
      <nav className="w-full h-24 px-7 xl:px-36 fixed z-20 bg-white rounded-b-2xl drop-shadow-sm">
        <div className="w-full h-full flex items-center justify-between">
          <div className="flex items-center justify-start gap-4 text-primary text-xl font-bold">
            <Link to="/">
              <img src={logo} className="w-16" alt="" />
            </Link>
            <div className="capitalize">
              Kelontong <br /> Kami
            </div>
          </div>
          {token && (
            <div className="hidden md:flex items-center gap-8">
              <button
                onClick={doLogout}
                className="btn btn-ghost w-28 capitalize text-primary text-lg font-medium tracking-normal"
              >
                Logout
              </button>
            </div>
          )}
          {!token && (
            <div className="hidden md:flex items-center gap-8">
              <Link
                to="/auth/login"
                className="btn btn-ghost w-28 capitalize text-primary text-lg font-medium tracking-normal"
              >
                Login
              </Link>
              <Link
                to="/auth/register"
                className="btn btn-secondary w-28 capitalize text-white text-lg font-medium tracking-normal"
              >
                Register
              </Link>
            </div>
          )}
          <div className="block md:hidden">
            <div>
              <button>
                <i className="">
                  <FiAlignJustify size={35} />
                </i>
              </button>
            </div>
          </div>
        </div>
      </nav>
      <div className="pt-24" />
    </>
  );
}

export default Header;
