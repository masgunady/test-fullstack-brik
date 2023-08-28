import Banner from "../components/Banner";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { BiSortAlt2 } from "react-icons/bi";
import defaultImage from "../assets/images/mobile-home-banner.png";
import React from "react";
import http from "../helpers/http";
import ImageTemplate from "../components/ImageTemplate";
import { Formik } from "formik";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ModalCreate from "../components/ModalCreate";
import { setDataProduct } from "../redux/reducers/product";

function Home() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const [totalPage, setTotalPage] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [search, setSearch] = React.useState("");
  const [sort, setSort] = React.useState("DESC");
  const [sortBy, setSortBy] = React.useState("createdAt");
  const [titleSortBy, setTitleSortBy] = React.useState("Product Terbaru");
  const [hiddenSort, setHiddenSort] = React.useState("hidden");
  const [modalOpen, setModalOpen] = React.useState(false);
  const products = useSelector((state) => state.product.dataProduct);

  const getProduct = React.useCallback(async () => {
    const { data } = await http().get(
      `/product?search=${search}&sort=${sort}&sortBy=${sortBy}&page=${currentPage}&limit=16`
    );
    dispatch(setDataProduct(data.results));
    setTotalPage(data.totalPage);
  }, [currentPage, sort, sortBy, search, dispatch]);

  React.useEffect(() => {
    getProduct();
  }, [getProduct]);

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleNext = () => {
    if (currentPage + 1 <= totalPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleFilter = (sort, sortBy, titleSortBy) => {
    setSort(sort);
    setSortBy(sortBy);
    setTitleSortBy(titleSortBy);
    setHiddenSort("hidden");
  };

  const handleMenuSort = () => {
    if (hiddenSort === "hidden") {
      setHiddenSort("");
    } else {
      setHiddenSort("hidden");
    }
  };
  const onSearch = (values) => {
    setSearch(values.search);
  };

  const openModal = () => {
    if (modalOpen === true) {
      setModalOpen(false);
      setTimeout(() => {
        setModalOpen(true);
      }, 200);
    } else {
      setModalOpen(true);
    }
  };
  return (
    <>
      <Header />
      <Banner />
      <section className="mb-7 w-full flex flex-col justify-between items-center">
        <div className="w-full max-w-[1200px]  px-4 xl:px-0">
          <div className="w-full py-3 flex flex-col gap-3 md:flex-row items-center justify-between md:h-16">
            <Formik initialValues={{ search: "" }} onSubmit={onSearch}>
              {({ handleBlur, handleChange, handleSubmit, values }) => (
                <form
                  onSubmit={handleSubmit}
                  className="w-full md:flex-1 flex items-center gap-3"
                >
                  <input
                    type="text"
                    name="search"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.search}
                    placeholder="Search ..."
                    className="input input-bordered input-primary text-black w-full"
                  />
                  <button
                    type="submit"
                    className="btn btn-primary text-white capitalize"
                  >
                    Search
                  </button>
                </form>
              )}
            </Formik>

            <div className="relative w-full md:flex-1 flex flex-row-reverse md:flex-row items-center justify-between md:justify-end gap-5 text-black font-semibold">
              <button
                onClick={handleMenuSort}
                tabIndex={0}
                className="btn btn-ghost capitalize"
              >
                <BiSortAlt2 size={35} className="text-primary" /> {titleSortBy}
              </button>
              {token && (
                <button
                  onClick={() => {
                    openModal();
                  }}
                  className="btn btn-secondary text-white capitalize"
                >
                  Tambah Produk
                </button>
              )}

              <ul
                tabIndex={0}
                className={`absolute ${hiddenSort} top-16 z-[1] menu p-2 shadow bg-white rounded-box w-52`}
              >
                <li>
                  <button
                    onClick={() =>
                      handleFilter("DESC", "createdAt", "Product Terbaru")
                    }
                  >
                    Product Terbaru
                  </button>
                </li>
                <li>
                  <button
                    onClick={() =>
                      handleFilter("ASC", "createdAt", "Product Terlama")
                    }
                  >
                    Product Terlama
                  </button>
                </li>
                <li>
                  <button
                    onClick={() =>
                      handleFilter("DESC", "price", "Product Termahal")
                    }
                  >
                    Product Termahal
                  </button>
                </li>
                <li>
                  <button
                    onClick={() =>
                      handleFilter("ASC", "price", "Product Termahal")
                    }
                  >
                    Product Termurah
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className="mb-7 w-full flex flex-col justify-between items-center">
        <div className="w-full max-w-[1200px] px-4 xl:px-0 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center">
          {products?.map((item) => {
            return (
              <Link
                to={`/product/detail/${item.id}`}
                key={`product-list-${item.id}`}
                className="w-[180px] h-[250px] md:w-[240px] md:h-[330px] xl:w-[270px] xl:h-[340px] rounded-xl overflow-hidden shadow drop-shadow-xl flex flex-col"
              >
                <div className="w-full h-[73%]">
                  <ImageTemplate
                    className="w-full h-full object-cover"
                    src={item?.image || null}
                    defaultImg={defaultImage}
                  />
                </div>
                <div className="w-full h-[27%] pt-2 md:pt-4 px-2">
                  <div className="text-sm md:text-lg text-black capitalize">
                    {item?.name}
                  </div>
                  <div className="md:text-lg text-black font-bold">
                    Rp.{item?.price?.toLocaleString("id-ID")}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        <div className="py-16 w-full h-16 flex items-center justify-center gap-7">
          <button
            onClick={handlePrev}
            className="btn btn-secondary text-black capitalize font-bold"
          >
            Prev
          </button>
          <div className="text-black">
            Page {currentPage} of {totalPage}
          </div>
          <button
            onClick={handleNext}
            className="btn btn-primary text-white capitalize font-bold"
          >
            Next
          </button>
        </div>
        {modalOpen && <ModalCreate visibleModal={modalOpen} />}
      </section>
      <Footer />
    </>
  );
}

export default Home;
