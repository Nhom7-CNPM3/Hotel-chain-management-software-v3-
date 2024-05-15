'use client'

import React, { useState } from 'react';
import createSubUser from '../../actions/POST/create-sub-user'; 
import toast from 'react-hot-toast';

const TestingEmployeeForm = () => {
  const [formData, setFormData] = useState({
    id: 'dada',
    name: '2adada',
    email: 'ffff',
    password: 'aaaa',
    phone_number: 0, // Provide a default value for phone_number
    role: '' // or 'PhucVu'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        
      // await createSubUser(formData);  // Call the createSubUser function with formData
      toast.success('Tạo nhân viên thành công!');
    } catch (error: any) {
        toast.error(error.message);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
      <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
      <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
      <input type="number" name="phone_number" value={formData.phone_number ? formData.phone_number.toString() : ''} onChange={handleChange} placeholder="Phone Number" />
      <button type="submit">Submit</button>
    </form>
  );
}

export default TestingEmployeeForm;