
import { FaTrash } from "react-icons/fa";
import Image from 'next/image';
export default function MiniImagesThumb() {
  return (
    <div className="thumb-upload-set colo-md-12">
      {imagesUploaded !== 0 &&
        imagesUploaded.map((item, index) => {
          return (
            <div key={index} className="thumb-upload">
              <div className="thumb-edit">
                <button
                  onClick={deleteImage}
                  className="save-image-button btn p-2"
                >
                  <FaTrash
                    size={20}
                    color={"#CC0000"}
                    className="ec-image-upload"
                  />
                </button>
              </div>
              <div className="thumb-preview ec-preview">
                <div className="image-thumb-preview">
                  <Image
                    className="image-thumb-preview ec-image-preview"
                    src={item.imageName}
                    alt="edit"
                    ref={miniImagePreview}
                    width={150}
                    height={150}
                  />
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}
