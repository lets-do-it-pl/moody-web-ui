import React from 'react';
import '../../../style.css';

const ImageModal = ({...props}) => {

    const handleClick = (e) => {
        props.closeImage();
    }

    return (
        <div className = "backdrop" onClick = {handleClick}>
            <img src = {props.selectedImage} alt = "" />
        </div>
    )
}
export default ImageModal;