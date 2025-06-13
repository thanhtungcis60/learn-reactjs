import React, { use } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form/dist/index.ie11';
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup/dist/yup.js';
// import InputField from '../../../../components/form-controls/InputField';
import InputField from 'components/form-controls/InputField';

TodoForm.propTypes = {
    onSubmit: PropTypes.func
};

function TodoForm(props) {
    const schema = yup.object().shape({
        title: yup.string().required('Please enter todo title').min(5, 'Title must be at least 5 characters long')
    });
    const form = useForm({
        defaultValues: {
            title: '',
        },
        resolver: yupResolver(schema),
    });

    const handleSubmit = (values) => {
        const { onSubmit } = props;
        if(onSubmit)
        {
            onSubmit(values);
        }
        form.reset(); //reset form after submit
    }
    return (
        <form onSubmit={form.handleSubmit(handleSubmit)}>
            <InputField name="title" label="Todo" form={form}/>
        </form>
    );
}

export default TodoForm;