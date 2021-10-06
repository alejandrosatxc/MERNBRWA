import { useField } from 'formik'
import { Form, Alert } from 'react-bootstrap'
//A custom reusable formik componenet with all the formik features packed in
//https://formik.org/docs/tutorial see this page for more info on how this works
const MyTextInput = ({ label, ...props }) => {

    const [field, meta] = useField(props);
    return(
        <>
            <Form.Label htmlFor={props.id || props.name}>{label}</Form.Label>
            <Form.Control className="text-input" {...field} {...props} />
            {meta.touched && meta.error ? (
                <Alert variant="danger">{meta.error}</Alert>
            ) : null}
        </>
    )
}

export default MyTextInput