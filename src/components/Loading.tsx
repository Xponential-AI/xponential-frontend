import './Loading.scss';
import loadingGif from '../assets/loading.gif';

export const Loading = () => {
  return <div className="loading-container">
      <img
        src={loadingGif}
      />
  </div>
}