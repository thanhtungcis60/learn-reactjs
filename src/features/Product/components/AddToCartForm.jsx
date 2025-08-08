import { yupResolver } from '@hookform/resolvers/yup/dist/yup.js';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form/dist/index.ie11';
import * as yup from "yup";
// import InputField from '../../../../components/form-controls/InputField';
import { Button } from '@material-ui/core';
import QuantityField from 'components/form-controls/QuantityField';

AddToCartForm.propTypes = {
    onSubmit: PropTypes.func
};

function AddToCartForm({ onSubmit = null }) {
    const schema = yup.object().shape({
        quantity: yup.number().required('Please enter quantity').min(1, 'Minimum value is 1').typeError('Please enter a valid number'),

    });
    const form = useForm({
        defaultValues: {
            quantity: 1
        },
        resolver: yupResolver(schema),
    });

    const handleSubmit = async (values) => {
        if (onSubmit) {
            await onSubmit(values);
        }
        // form.reset(); //reset form after submit //đóng lại để sửa khi mà gặp lỗi
    }
    return (
        <form onSubmit={form.handleSubmit(handleSubmit)}>
            <QuantityField name="quantity" label="Quantity" form={form} />
            <Button type="submit" fullWidth variant="contained" color="primary" size="large" style={{ width: '250px' }}>
                Add to cart
            </Button>
        </form>
    );
}

export default AddToCartForm;