import { toast } from 'react-toastify';

export default function ShowToast(message: string, type: string) {
    toast[type](message, {
        position: window.innerWidth < 450 ? "bottom-center" : "top-right",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: {
            fontSize: '13px'
        }
    })
}