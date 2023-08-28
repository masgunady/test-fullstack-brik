import { Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import { MdCheck, MdError } from "react-icons/md";
import http from "../helpers/http";
import { AiOutlinePicture } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { setDataProduct } from "../redux/reducers/product";

const validationSchema = Yup.object({
  sku: Yup.string().required("SKU is Required!"),
  name: Yup.string().required("Product name is Required!"),
  price: Yup.string().required("Product price is Required!"),
  categoryId: Yup.string().required("Product Category is Required!"),
  weight: Yup.string().required("Product weight is Required!"),
  height: Yup.string().required("Product height is Required!"),
  width: Yup.string().required("Product width is Required!"),
  length: Yup.string().required("Product length is Required!"),
  description: Yup.string().required("Product description is Required!"),
});

const ModalCreate = (props) => {
  // eslint-disable-next-line react/prop-types
  const { visibleModal } = props;
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const [closeModal, setCloseModal] = React.useState(visibleModal);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [successMessage, setSuccessMassage] = React.useState("");
  const [categories, setCategories] = React.useState([]);
  const [selectedPicture, setSelectedPicture] = React.useState(false);
  const [pictureURI, setPictureURI] = React.useState("");
  const [pictureErr, setPictureErr] = React.useState(true);

  const [currentPage, setCurrentPage] = React.useState(1);
  const [search, setSearch] = React.useState("");
  const [sort, setSort] = React.useState("DESC");
  const [sortBy, setSortBy] = React.useState("createdAt");

  const fileToDataUrl = (file) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      setPictureURI(reader.result);
    });
    reader.readAsDataURL(file);
  };

  const changePicture = (e) => {
    const file = e.target.files[0];
    setSelectedPicture(file);
    fileToDataUrl(file);
  };

  const getCategory = React.useCallback(async () => {
    const { data } = await http().get("/category");
    setCategories(data.results);
  }, []);

  React.useEffect(() => {
    if (selectedPicture) {
      setPictureErr(true);
    }
    getCategory();
  }, [getCategory, selectedPicture]);

  const close = () => {
    setCloseModal(false);
  };

  const doCreate = async (values, { setSubmitting, resetForm }) => {
    try {
      if (!selectedPicture) {
        setPictureErr(false);
        return;
      } else {
        setPictureErr(true);
      }

      const form = new FormData();

      Object.keys(values).forEach((key) => {
        if (values[key]) {
          form.append(key, values[key]);
        }
      });
      if (selectedPicture) {
        form.append("image", selectedPicture);
      }

      setSubmitting(false);

      const { data } = await http(token).post("/product", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const dataProduct = await http().get(
        `/product?search=&sort=DESC&sortBy=createdAt&page=&limit=16`
      );

      dispatch(setDataProduct(dataProduct.data.results));

      if (data.results) {
        setSuccessMassage(`${data.message} Topup Success!`);
        setTimeout(() => {
          setSuccessMassage("");
          setCloseModal(false);
        }, 1500);
      }
      resetForm();
    } catch (error) {
      setErrorMessage(error);
    }
  };
  return (
    <>
      <div>
        <input
          type="checkbox"
          id="loading"
          className="modal-toggle"
          checked={closeModal}
          onChange={() => setCloseModal(!closeModal)}
        />
        <div className="modal">
          <div className="p-6 bg-white w-full max-w-[800px] max-h-[800px] overflow-y-scroll rounded-xl scroll-x-d">
            <div className="py-3 text-black text-lg font-semibold">
              Tambah Barang
            </div>
            {errorMessage && (
              <div className="flex flex-row justify-center alert alert-error shadow-lg text-white text-lg">
                <MdError size={30} />
                {errorMessage}
              </div>
            )}
            {successMessage && (
              <div className="flex flex-row justify-center alert alert-success shadow-lg text-white text-lg">
                <MdCheck size={30} />
                {successMessage}
              </div>
            )}
            <Formik
              initialValues={{
                sku: "",
                name: "",
                price: "",
                categoryId: "",
                weight: "",
                width: "",
                length: "",
                height: "",
                description: "",
              }}
              validationSchema={validationSchema}
              onSubmit={doCreate}
              enableReinitialize={true}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
                isSubmitting,
              }) => (
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col-reverse md:flex-row justify-center items-center gap-9">
                    <div className="flex items-start w-full flex-1">
                      <div className="flex flex-col gap-3.5 w-full">
                        <div className="flex flex-col align-start justify-start gap-3.5 w-full">
                          <div className="text-sm text-[#373a42] tracking-[1px]">
                            SKU
                          </div>
                          <div className="w-full text-black">
                            <input
                              name="sku"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.sku}
                              type="text"
                              className={`input input-bordered ${
                                errors.sku && touched.sku
                                  ? "input-error"
                                  : "input-primary"
                              } w-full h-12 px-3 outline-[#C1C5D0]`}
                              placeholder="sku"
                            />
                          </div>
                          {errors.sku && touched.sku && (
                            <label htmlFor="sku" className="label">
                              <span className="label-text-alt text-error">
                                {errors.sku}
                              </span>
                            </label>
                          )}
                        </div>
                        <div className="flex flex-col align-start justify-start gap-3.5 w-full">
                          <div className="text-sm text-[#373a42] tracking-[1px]">
                            Nama Produk
                          </div>
                          <div className="w-full text-black">
                            <input
                              name="name"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.name}
                              type="text"
                              className={`input input-bordered ${
                                errors.name && touched.name
                                  ? "input-error"
                                  : "input-primary"
                              } w-full h-12 px-3 outline-[#C1C5D0]`}
                              placeholder="name"
                            />
                          </div>
                          {errors.name && touched.name && (
                            <label htmlFor="name" className="label">
                              <span className="label-text-alt text-error">
                                {errors.name}
                              </span>
                            </label>
                          )}
                        </div>
                        <div className="flex flex-col align-start justify-start gap-3.5 w-full">
                          <div className="text-sm text-[#373a42] tracking-[1px]">
                            Harga
                          </div>
                          <div className="w-full text-black">
                            <input
                              name="price"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.price}
                              type="text"
                              className={`input input-bordered ${
                                errors.price && touched.price
                                  ? "input-error"
                                  : "input-primary"
                              } w-full h-12 px-3 outline-[#C1C5D0]`}
                              placeholder="price"
                            />
                          </div>
                          {errors.price && touched.price && (
                            <label htmlFor="price" className="label">
                              <span className="label-text-alt text-error">
                                {errors.price}
                              </span>
                            </label>
                          )}
                        </div>
                        <div className="flex flex-col align-start justify-start gap-3.5 w-full">
                          <div className="text-sm text-[#373a42] tracking-[1px]">
                            Category
                          </div>
                          <div className="w-full">
                            <select
                              name="categoryId"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={`select select-bordered ${
                                errors.categoryId && touched.categoryId
                                  ? "select-error"
                                  : "select-primary"
                              } w-full px-3 h-[55px] text-black capitalize`}
                            >
                              <option className="hidden">
                                Select Category
                              </option>
                              {categories.map((item) => {
                                return (
                                  <React.Fragment key={`location-${item.id}`}>
                                    <option
                                      className="text-black capitalize"
                                      value={item.id}
                                    >
                                      {item.name}
                                    </option>
                                  </React.Fragment>
                                );
                              })}
                            </select>
                          </div>
                          {errors.categoryId && touched.categoryId && (
                            <label htmlFor="categoryId" className="label">
                              <span className="label-text-alt text-error">
                                {errors.categoryId}
                              </span>
                            </label>
                          )}
                        </div>
                        <div className="flex flex-col align-start justify-start gap-3.5 w-full">
                          <div className="text-sm text-[#373a42] tracking-[1px]">
                            Berat
                          </div>
                          <div className="w-full text-black">
                            <input
                              name="weight"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.weight}
                              type="text"
                              className={`input input-bordered ${
                                errors.weight && touched.weight
                                  ? "input-error"
                                  : "input-primary"
                              } w-full h-12 px-3 outline-[#C1C5D0]`}
                              placeholder="weight"
                            />
                          </div>
                          {errors.weight && touched.weight && (
                            <label htmlFor="weight" className="label">
                              <span className="label-text-alt text-error">
                                {errors.weight}
                              </span>
                            </label>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start w-full flex-1">
                      <div className="flex flex-col gap-3.5 w-full justify-center items-center">
                        {!selectedPicture && (
                          <div className="w-[291px] h-[332px] rounded-xl relative flex justify-center items-center">
                            <i className="">
                              <AiOutlinePicture size={50} />
                            </i>
                            <div className="absolute bg-white border-2 rounded-xl border-slate-500 w-full h-full top-0 left-0 opacity-50 text-white flex justify-center items-center"></div>
                          </div>
                        )}
                        {selectedPicture && (
                          <div className="w-[291px] h-[352px] relative overflow-hidden rounded-xl">
                            <img
                              className="w-[291px] h-[353px] rounded-xl object-cover border-4 border-white"
                              src={pictureURI}
                              alt="profile"
                            />
                            <div className="absolute bg-gray-400 w-full h-full top-0 left-0 opacity-50 text-white flex justify-center items-center"></div>
                          </div>
                        )}
                        <div className="w-[291px] flex flex-col justify-center">
                          <label className="btn bg-[#fff] w-full h-10 rounded-xl border-2 border-[#3366FF] text-[#3366FF] text-sm font-semibold tracking-[1px] mb-4">
                            <span>Choose photo</span>
                            <input
                              name="image"
                              onChange={changePicture}
                              className="hidden"
                              type="file"
                            />
                          </label>
                          {!pictureErr && (
                            <label className="label">
                              <span className="label-text-alt text-error">
                                Please insert product picture!
                              </span>
                            </label>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-col align-start justify-start gap-3.5 w-full">
                    <div className="text-sm text-[#373a42] tracking-[1px]">
                      Volume
                    </div>
                    <div className="flex items-center gap-4 justify-between">
                      <div>
                        <div className="w-full text-black">
                          <input
                            name="length"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.length}
                            type="text"
                            className={`input input-bordered ${
                              errors.length && touched.length
                                ? "input-error"
                                : "input-primary"
                            } w-full h-12 px-3 outline-[#C1C5D0]`}
                            placeholder="Panjang Produk cm"
                          />
                        </div>
                        {errors.length && touched.length && (
                          <label htmlFor="length" className="label">
                            <span className="label-text-alt text-error">
                              {errors.length}
                            </span>
                          </label>
                        )}
                      </div>
                      <div>
                        <div className="w-full text-black">
                          <input
                            name="width"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.width}
                            type="text"
                            className={`input input-bordered ${
                              errors.width && touched.width
                                ? "input-error"
                                : "input-primary"
                            } w-full h-12 px-3 outline-[#C1C5D0]`}
                            placeholder="Lebar Produk cm"
                          />
                        </div>
                        {errors.width && touched.width && (
                          <label htmlFor="width" className="label">
                            <span className="label-text-alt text-error">
                              {errors.width}
                            </span>
                          </label>
                        )}
                      </div>
                      <div>
                        <div className="w-full text-black">
                          <input
                            name="height"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.height}
                            type="text"
                            className={`input input-bordered ${
                              errors.height && touched.height
                                ? "input-error"
                                : "input-primary"
                            } w-full h-12 px-3 outline-[#C1C5D0]`}
                            placeholder="Tinggi Produk cm"
                          />
                        </div>
                        {errors.height && touched.height && (
                          <label htmlFor="height" className="label">
                            <span className="label-text-alt text-error">
                              {errors.height}
                            </span>
                          </label>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-[20px] text-[#373a42] font-semibold tracking-[1px] mt-11">
                    <div className="text-sm text-[#373a42] tracking-[1px] mb-3">
                      Deskripsi Produk
                    </div>
                    <div className="w-full">
                      <textarea
                        name="description"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.description}
                        className={`border ${
                          errors.description && touched.description
                            ? "border-error"
                            : "border-primary"
                        } w-full rounded-xl text-sm tracking-[1px] px-3.5 py-3.5 outline-none`}
                        cols="30"
                        rows="3"
                        placeholder="Input Detail"
                      ></textarea>
                    </div>
                    {errors.description && touched.description && (
                      <label htmlFor="description" className="label">
                        <span className="label-text-alt text-error">
                          {errors.description}
                        </span>
                      </label>
                    )}
                  </div>
                  <div className="w-full flex items-center justify-end gap-4 mt-11">
                    <button
                      className="btn btn-success w-20 capitalize text-white self-end"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Simpan
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary w-20 capitalize text-white self-end"
                      onClick={() => {
                        close();
                      }}
                    >
                      Batal
                    </button>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalCreate;
