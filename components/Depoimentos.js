
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { FaQuoteRight } from "react-icons/fa";
import Image from 'next/image'
import { useState } from 'react';
import Modal from '../components/ModalDepoimentos'
4
function Depoimentos({reviewList}) {

  return (
    <>
     {/* <!-- ec testimonial Start --> */}
     <section
        className="section ec-test-section section-space-mb section-space-p bg-imagem-comentarios">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center ec-test-top">
              <div className="ec-test-top-svg">
                <h2 className="d-none">Depoimentos</h2>
                <FaQuoteRight className="svg_img test_top_svg" />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="ec-test-outer">
              <ul id="ec-testimonial-slider">
                <Swiper
                  modules={[Navigation, Pagination, Scrollbar, A11y]}
                  spaceBetween={30}
                  slidesPerView={1}
                  pagination={{ clickable: true }}>
                  {reviewList?.map((item, index) => {
                    if(item.active === 1){
                    return (
                  <SwiperSlide key={index}>
                    <li className="ec-test-item">
                      <div className="ec-test-inner">
                        <div className="ec-test-img"></div>
                        <div className="ec-test-content">
                          <div className="ec-test-desc">
                            {item.description}
                          </div>
                          <span className="testimonial-name">{item.name} - {item.city}</span>
                        </div>
                      </div>
                    </li>
                  </SwiperSlide>
                    )}
                    })}
                </Swiper>
              </ul>

              <div className='d-flex justify-content-center mt-8'>
              <button 
              className='btn-primary btn d-flex justify-content-center' 
              style={{width: '300px'}}
              data-link-action="editmodal"
              title="Edit Detail"
              data-bs-toggle="modal"
              data-bs-target="#edit_modal"
              >Escreva seu depoimento!</button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Modal />
      {/* <!-- ec testimonial end --> */}
    </>
  );
}

export default Depoimentos;
