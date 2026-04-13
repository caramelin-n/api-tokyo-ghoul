import loadingicon from "../assets/loading.png";
import './css/loading.css';
const Loading = () => {
    return (
        <div className="loading-containter">
            <img src={loadingicon} alt="Loading..." className="spinner" />
            <p className="loading-text">Loading data...</p>
        </div>
    );
}

export default Loading