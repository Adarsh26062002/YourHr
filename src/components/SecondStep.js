import React from 'react'
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form'
import { Navigate, useNavigate } from 'react-router-dom';
import {motion} from 'framer-motion';

const SecondStep = (props) => {
    const navigate = useNavigate();
    const { user } = props;
    const {
    register,
    handleSubmit,
    formState: { errors },
    } = useForm({
    defaultValues: {
      user_email: user.user_email,
      user_password: user.user_password,
    },
    });

    const onSubmit = (data) => {
        console.log(data);
        props.updateUser(data);
        // props.history.push('/third');
        navigate('/third');
    }

  return (
    <Form className='input-form' onSubmit={handleSubmit(onSubmit)}>
    <motion.div className='col-md-6 offset-md-3' initial={{ x: "-100vw" }}
        animate={{ x: 0 }}
        transition={{ stiffness: 150 }}>
        <Form.Group controlId='first_name'>
            <Form.Label>Email</Form.Label>
            <Form.Control
                type = "email"
                name = "user_email"
                placeholder='Enter your email address'
                autocomplete = "off"
                {...register('user_email',{
                    required : 'Email is required.',
                    pattern : {
                        value : /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                        message : 'Email is not valid.'
                    }
                })}
                className = {`${errors.user_email ? 'input-error' : '' }`}
            />
            {errors.user_email && (
                <p className='errorMsg'> {errors.user_email.message} </p>
            )}
        </Form.Group>

        <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
                type='password'
                name='user_password'
                placeholder='Chose a password'
                autoComplete='off'
                {...register('user_password',{
                    required : 'Password is required.',
                    minLength : {
                        value : 6,
                        message : 'Password should have at least 6 characters.'
                    }
                })}
                className = {`${errors.user_password ? 'input-error' : ''}`}
            />
            {errors.user_password && (
                <p className='"errorMsg'>{errors.user_password.message}</p>
            )}
        </Form.Group>

        <br/>
        
        <Button variant = "primary" type = "submit">
            Next
        </Button>

    </motion.div>
    </Form>
  )
}

export default SecondStep
