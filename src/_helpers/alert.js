import { useSnackbar } from 'notistack';

export function Alert(variant, message) {
    useSnackbar()(message, { variant });
}