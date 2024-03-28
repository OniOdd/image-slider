import { useEffect, useState } from 'react';
import Icon from '@mdi/react';
import { mdiArrowLeftCircle } from '@mdi/js';
import { mdiArrowRightCircle } from '@mdi/js';
import style from './ImageSlider.module.css';

type ImageSliderProps = {
  url: string;
  page: string;
  limit: string;
};

type UrlProps = {
  author?: string;
  id: string;
  url: string;
  download_url?: string;
  width?: number;
  height?: number;
};

function ImageSlider({ url, page = '1', limit = '5' }: ImageSliderProps) {
  const [images, setImages] = useState<UrlProps[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [errorMsg, setErrorMsg] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (url !== '') fetchImages(url);
  }, [url]);

  async function fetchImages(getUrl: string) {
    try {
      setLoading(true);

      const response = await fetch(`${getUrl}?page=${page}&limit=${limit}`);
      const data: UrlProps[] = await response.json();

      if (data) {
        setImages(data);
        setLoading(false);
      }
    } catch(error: unknown) {
      if (error instanceof Error) {
        setErrorMsg(error.message);
        setLoading(false);
      }
    }
  }

  function handlePreviousSlide() {
    setCurrentSlide(currentSlide === 0 ? images.length - 1 : currentSlide - 1);
  }

  function handleNextSlide() {
    setCurrentSlide(currentSlide === images.length - 1 ? 0 : currentSlide + 1);
  }

  if (loading) return <p>Loading data! Please wait</p>;
  if (errorMsg !== null) return <p>An error occured! {errorMsg}</p>;

  return (
    <div className={style.container}>
      <div className={`${style.arrow} ${style.arrowLeft}`} onClick={handlePreviousSlide}>
        <Icon path={mdiArrowLeftCircle} />
      </div>

      {
        (images && images.length) && images.map((image, index) => (
          <img src={image.download_url} alt={`Image №${image.id}`} key={image.id}
               className={currentSlide === index ?
                style.currentImage : `${style.currentImage} ${style.hideCurrentImage}`} />
        ))
      }

      {
        images && images.length && <span className={style.circleIndicators}>
          {images.map((_, index) =>
            <button className={currentSlide === index ?
                    style.currentIndicator : `${style.currentIndicator} ${style.inactiveIndicator}`}
                    type='button' key={index} onClick={() => setCurrentSlide(index)}></button>)}
        </span>
      }

      <div className={`${style.arrow} ${style.arrowRight}`} onClick={handleNextSlide}>
        <Icon path={mdiArrowRightCircle} />
      </div>
    </div>
  );
}

export default ImageSlider;
