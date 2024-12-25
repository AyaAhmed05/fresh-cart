import sliderImage1 from "../../assets/imgs/slider-image-1.jpeg";
import sliderImage2 from "../../assets/imgs/slider-image-2.jpeg";
import sliderImage3 from "../../assets/imgs/slider-image-3.jpeg";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
export default function HomeSlider() {
  return <>
    <section className="grid grid-cols-12 mb-9">
        <div className="col-span-8 ">
            <Swiper slidesPerView={1} loop={true}>
                <SwiperSlide>
                <img className="w-full h-full object-cover" src={sliderImage3} alt=""/>
                </SwiperSlide>
                <SwiperSlide>
                <img className="w-full h-full object-cover" src={sliderImage1} alt=""/>

                </SwiperSlide>
            </Swiper>
        </div>
        <div className="col-span-4  ">
         <img className="w-full " src={sliderImage1} alt=""/>
         <img className="w-full   " src={sliderImage2} alt=""/>
        </div>
    </section>
  
  </>
    
}
