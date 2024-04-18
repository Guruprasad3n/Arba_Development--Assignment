import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

export default function CarouselComponent() {
  const images = [
    {
      src: `https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`,
      alt: "First slide",
    },
    {
      src: `https://images.pexels.com/photos/45853/grey-crowned-crane-bird-crane-animal-45853.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`,
      alt: "Second slide",
    },
    {
      src: `https://images.pexels.com/photos/206359/pexels-photo-206359.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`,
      alt: "Third slide",
    },
    {
      src: `https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`,
      alt: "First slide",
    },
    {
      src: `https://images.pexels.com/photos/206359/pexels-photo-206359.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`,
      alt: "Third slide",
    },
  ];
  return (
    <>
      <Carousel autoPlay infiniteLoop centerMode showThumbs={false} showStatus={false} >
        {images.map((e, index) => (
          <img src={e.src} alt={e.alt} className="carousel-image"  key={index}/>
        ))}
      </Carousel>
    </>
  );
}
