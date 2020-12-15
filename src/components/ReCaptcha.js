import React from 'react';
import Recaptcha from 'react-recaptcha';

function ReCaptcha(props) {
    return (
        <div>
            <Recaptcha
                sitekey={process.env.REACT_APP_RECAPTCHA_KEY}
                render="explicit"
                verifyCallback={() => {
                    setFieldValue('recaptcha', true);
                    props.values.recaptcha = true;
                }}
            />
            {errors.recaptcha
                && touched.recaptcha && (
                    <FormLabel error>{errors.recaptcha}</FormLabel>
                )}
        </div>
    );
}

export default ReCaptcha;