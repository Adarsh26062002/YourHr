import React from 'react';
import Axios from "axios";
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const FirstStep = (props) => {
  const navigate = useNavigate();
  const { user } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      first_name: user.first_name,
      last_name: user.last_name,
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    // props.history.push('./second');
    console.log(data);
    props.updateUser(data);
    navigate('/second');
  };

  // File uploading 
  const [file, setFile] = useState(null);
  const upload = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("screenshot", file);
    Axios.post("http://localhost:3030/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((res) => {
      alert("Uploaded successfully");
    });
  };

  return (
    <Form className='input-form' onSubmit={handleSubmit(onSubmit)}>
      <motion.div className='col-mid-6 offset-mid-3' initial={{ x: "-100vw" }}
        animate={{ x: 0 }}
        transition={{ stiffness: 150 }}>
        <Form.Group controlId="first name">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            name="first_name"
            placeholder="Enter your first name"
            autocomplete="off"
            {...register('first_name', {
              required: 'First name is required.',
              pattern: {
                value: /^[a-zA-Z]+$/,
                message: 'First name should contain only characters.'
              }
            })}
            className={`${errors.first_name ? 'input-error' : ''}`}
          />
          {errors.first_name && (
            <p className='errorMsg'>{errors.first_name.message}</p>
          )}
        </Form.Group>


        <Form.Group controlId="first name">
          <Form.Label>Middle Name</Form.Label>
          <Form.Control
            type="text"
            name="first_name"
            placeholder="Enter your middle name"
            autocomplete="off"
            {...register('first_name', {
              required: 'First name is required.',
              pattern: {
                value: /^[a-zA-Z]+$/,
                message: 'First name should contain only characters.'
              }
            })}
            className={`${errors.first_name ? 'input-error' : ''}`}
          />
          {errors.first_name && (
            <p className='errorMsg'>{errors.first_name.message}</p>
          )}
        </Form.Group>


        <Form.Group controlId="last_name">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="last_name"
            placeholder="Enter your last name"
            autocomplete="off"
            {...register('last_name', {
              required: 'Last name is required.',
              pattern: {
                value: /^[a-zA-Z]+$/,
                message: 'Last name should contain only characters.'
              }
            })}
            className={`${errors.last_name ? 'inpur-error' : ''}`}
          />
          {errors.last_name && (
            <p className="errorMsg">{errors.last_name.message}</p>
          )}
          <br />

          <Form.Label>Upload Resume</Form.Label>
          <div >
            <input
              type="file"
              name="screenshot"
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
            />
            <button onClick={(e) => upload(e)}>Upload</button>
          </div>
        </Form.Group>

        <br />

        <Button variant="primary" type="submit">
          Next
        </Button>

      </motion.div>
    </Form>
  )
};

export default FirstStep;