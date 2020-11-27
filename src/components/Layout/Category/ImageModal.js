import React, {useState, useEffect} from 'react';
import '../../../style.css';

const ImageModal = ({...props}) => {

    const [image, setImage] = useState();

    const handleClick = (e) => {
        setImage(null);
        props.closeImage();
    }

    useEffect(() => {
        setImage(props.selectedImage);
    }, []);

    return (
        <div className = "backdrop" onClick = {handleClick}>
            <img src = {image} alt = "" />
        </div>
    )
}
export default ImageModal;
