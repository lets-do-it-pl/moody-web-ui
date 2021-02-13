export function showAlert(props, message, variant) {
    props.enqueueSnackbar(message, { variant: variant });
}