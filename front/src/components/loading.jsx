import loadingicon from "../assets/loading.png";
import './loading.css';
const Loading = () => {
    return (
        <div className="loading-containter">
            <img src={loadingicon} alt="Loading..." className="spinner" />
            <p className="loading-text">Loading coffee in Anteiku...</p>
        </div>
    );
}

export default Loading