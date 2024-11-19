import Swal from "sweetalert2";


export function handleSuccess(msg: string, title: string) {
    return Swal.fire({
        title: title,
        text: msg,
        icon: "success"
    });
}
export function handleError(msg: string, title: string) {
    return Swal.fire({
        title: title,
        text: msg,
        icon: "error"
    });
}