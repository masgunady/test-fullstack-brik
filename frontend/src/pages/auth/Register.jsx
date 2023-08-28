import React from "react";
import bannerAuth from "../../assets/images/auth-banner.png";
import { Link, useNavigate } from "react-router-dom";
import { Formik } from "formik";

import * as Yup from "yup";
import { asyncRegisterAction } from "../../redux/actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { clearMessage } from "../../redux/reducers/auth";

const validationSchema = Yup.object({
  firstName: Yup.string().required("First name is Required!"),
  lastName: Yup.string().required("Last name is Required!"),
  email: Yup.string().required("Email is Required!").email("Email is invalid!"),
  password: Yup.string().required("Password is Required"),
  confirmPassword: Yup.string()
    .required("Confirm password is Required")
    .oneOf([Yup.ref("password"), null], "Password must match"),
});

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const errorMessage = useSelector((state) => state.auth.errorMessage);
  const successMessage = useSelector((state) => state.auth.successMessage);
  const [iconEye, setIconEye] = React.useState(false);
  const [typePassword, setTypePassword] = React.useState(false);
  const [iconEye2, setIconEye2] = React.useState(false);
  const [typePassword2, setTypePassword2] = React.useState(false);

  const handleInputPassword = () => {
    setIconEye(!typePassword);
    setTypePassword(!iconEye);
  };
  const handleInputPassword2 = () => {
    setIconEye2(!typePassword2);
    setTypePassword2(!iconEye2);
  };

  const doRegister = async (values, { setSubmitting }) => {
    dispatch(clearMessage());
    dispatch(asyncRegisterAction(values));
    setSubmitting(false);
  };

  React.useEffect(() => {
    if (successMessage) {
      setTimeout(() => {
        navigate("/auth/login");
      }, 3000);
      setTimeout(() => {
        dispatch(clearMessage());
      }, 3000);
    }
  }, [successMessage, navigate, dispatch]);

  return (
    <main className="w-full">
      <div className="w-full h-screen flex items-center justify-center">
        <div className="hidden lg:block flex-1 w-full h-full">
          <img src={bannerAuth} className="w-full h-full object-cover" />
        </div>
        <div className="w-full lg:max-w-[500px] h-full px-11">
          <div className="w-full h-full flex flex-col justify-center items-center gap-5">
            <div className="flex flex-col gap-2 w-full">
              <div className="text-3xl text-black font-bold w-full text-left">
                Sign Up
              </div>
              <div className="text-base text-black font-semibold w-full">
                Hey, welcome to Kelontong Kami!
              </div>
              {successMessage && (
                <div className="alert alert-success text-white capitalize">
                  {successMessage}
                </div>
              )}
              {errorMessage && (
                <div className="alert alert-error text-white capitalize">
                  {errorMessage}
                </div>
              )}
            </div>
            <Formik
              initialValues={{
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                confirmPassword: "",
              }}
              validationSchema={validationSchema}
              onSubmit={doRegister}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
              }) => (
                <form
                  onSubmit={handleSubmit}
                  className="w-full flex flex-col gap-3"
                >
                  <div className="flex flex-col gap-2">
                    <div className="font-semibold capitalize text-black">
                      First Name
                    </div>
                    <div className="w-full">
                      <input
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.firstName}
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        className={`input input-bordered text-black ${
                          errors.firstName && touched.firstName
                            ? "input-error"
                            : "input-primary"
                        } w-full h-12 px-3 outline-[#C1C5D0]`}
                      />
                      {errors.firstName && touched.firstName && (
                        <label htmlFor="firstName" className="label">
                          <span className="label-text-alt text-error">
                            {errors.firstName}
                          </span>
                        </label>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="font-semibold capitalize text-black">
                      Last Name
                    </div>
                    <div className="w-full">
                      <input
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.lastName}
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        className={`input input-bordered text-black ${
                          errors.lastName && touched.lastName
                            ? "input-error"
                            : "input-primary"
                        } w-full h-12 px-3 outline-[#C1C5D0]`}
                      />
                      {errors.lastName && touched.lastName && (
                        <label htmlFor="lastName" className="label">
                          <span className="label-text-alt text-error">
                            {errors.lastName}
                          </span>
                        </label>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="font-semibold capitalize text-black">
                      Email
                    </div>
                    <div className="w-full">
                      <input
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        className={`input input-bordered text-black ${
                          errors.email && touched.email
                            ? "input-error"
                            : "input-primary"
                        } w-full h-12 px-3 outline-[#C1C5D0]`}
                        type="text"
                        name="email"
                        placeholder="Email"
                      />
                      {errors.email && touched.email && (
                        <label htmlFor="email" className="label">
                          <span className="label-text-alt text-error">
                            {errors.email}
                          </span>
                        </label>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="font-semibold capitalize text-black">
                      Password
                    </div>
                    <div className="w-full relative">
                      <input
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        className={`input input-bordered text-black ${
                          errors.password && touched.password
                            ? "input-error"
                            : "input-primary"
                        } w-full h-12 px-3 outline-[#C1C5D0]`}
                        type={typePassword ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                      />

                      <button
                        type="button"
                        onClick={handleInputPassword}
                        className="absolute top-[14px] right-4 text-[#4c3f91]"
                      >
                        {iconEye ? (
                          <i className="">
                            <FiEyeOff size={20} />
                          </i>
                        ) : (
                          <i className="">
                            <FiEye size={20} />
                          </i>
                        )}
                      </button>
                      {errors.password && touched.password && (
                        <label htmlFor="password" className="label">
                          <span className="label-text-alt text-error">
                            {errors.password}
                          </span>
                        </label>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="font-semibold capitalize text-black">
                      Confirm Password
                    </div>
                    <div className="w-full relative">
                      <input
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.confirmPassword}
                        className={`input input-bordered text-black ${
                          errors.confirmPassword && touched.confirmPassword
                            ? "input-error"
                            : "input-primary"
                        } w-full h-12 px-3 outline-[#C1C5D0]`}
                        type={typePassword2 ? "text" : "password"}
                        name="confirmPassword"
                        placeholder="Confirm password"
                      />

                      <button
                        type="button"
                        onClick={handleInputPassword2}
                        className="absolute top-[14px] right-4 text-[#4c3f91]"
                      >
                        {iconEye2 ? (
                          <i className="">
                            <FiEyeOff size={20} />
                          </i>
                        ) : (
                          <i className="">
                            <FiEye size={20} />
                          </i>
                        )}
                      </button>
                      {errors.confirmPassword && touched.confirmPassword && (
                        <label htmlFor="confirmPassword" className="label">
                          <span className="label-text-alt text-error">
                            {errors.confirmPassword}
                          </span>
                        </label>
                      )}
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-primary w-full text-white capitalize"
                    >
                      Sign Up
                    </button>
                  </div>
                  <div className="w-full text-black text-center">
                    Already have an account?{" "}
                    <Link to="/auth/login" className="text-primary font-bold">
                      {" "}
                      Sign In
                    </Link>
                  </div>
                  <div className="w-full text-black text-center">
                    <Link to="/" className="text-primary font-bold">
                      {" "}
                      Back to Home
                    </Link>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Register;
