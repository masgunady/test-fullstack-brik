import React from "react";
import { useParams } from "react-router-dom";
import http from "../helpers/http";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ImageTemplate from "../components/ImageTemplate";
import defaultImage from "../assets/images/mobile-home-banner.png";

function Detail() {
  const { id } = useParams();
  const [detail, setDetail] = React.useState({});

  const detailProduct = React.useCallback(async () => {
    const { data } = await http().get(`/product/${id}`);
    setDetail(data.results);
  }, [id]);

  React.useEffect(() => {
    detailProduct();
  }, [detailProduct]);

  console.log(detail);

  return (
    <>
      <Header />
      <section className="my-11 w-full flex flex-col justify-between items-center">
        <div className="w-full max-w-[1200px] flex flex-col md:flex-row items-start justify-center gap-11 px-4 xl:px-0 ">
          <div className="flex-1 w-full h-[400px] md:w-[400px] md:h-[400px] xl:w-[600px] xl:h-[600px] rounded-xl overflow-hidden">
            <ImageTemplate
              className="w-full h-full object-cover"
              src={detail?.image || null}
              defaultImg={defaultImage}
            />
          </div>
          <div className="flex-1 flex flex-col gap-9">
            <div className="text-black text-xl uppercase rounded-lg border w-36 h-11 flex items-center justify-center">
              kode: {detail?.sku}
            </div>
            <div className="text-black text-4xl font-bold">{detail?.name}</div>
            <div className="text-black text-4xl font-bold">
              Rp.{detail?.price?.toLocaleString("id")}
            </div>
            <div className="text-black text-lg">{detail?.description}</div>
            <div className="text-black text-lg">
              Berat : {detail?.weight} gram
            </div>
            <div className="text-black text-lg">
              Volume : {detail?.length}cm x {detail?.width}cm x {detail?.height}
              cm
            </div>
            <div className="text-primary text-xl">
              Kategori Produk : {detail?.Category?.name}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Detail;
