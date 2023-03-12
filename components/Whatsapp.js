
import { FaWhatsapp } from "react-icons/fa";

export default function Whatsapp() {
    return (
        <>
            <div className="whatsapp">
                <a target="_blank" rel="noreferrer" href="https://api.whatsapp.com/send?phone=5519971191491&text=Estava no site de vocês e gostaria de tirar algumas dúvidas sobre as compras.">
                    <FaWhatsapp className="whatsapp-img" />
                </a>
                <div className="ripple"></div>
            </div>
        </>
    )
}