import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { AddTeacher, GetAllClasses } from "../../api/apis";

const Field = ({ label, id, ...rest }) => (
  <div className="mb-3 w-full">
    <label className="block color-[#000]" htmlFor={id}>
      {label}
    </label>
    <input
      className="my-2 p-2 w-full h-12 border border-[#E49BFF] rounded-md"
      id={id}
      {...rest}
    />
  </div>
);

const Select = ({ label, id, error, children, ...rest }) => (
  <div className="mb-3 w-full">
    <label htmlFor={id}>{label}</label>
    <select
      className="my-2 p-2 w-full h-12 border border-[#E49BFF] rounded-md"
      id={id}
      {...rest}
    >
      {children}
    </select>
  </div>
);

function TeacherForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    dob: "",
    contactdetails: "",
    salary: "",
    assignedclass: ""
  });
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const submitHandler = async (e, value) => {
    e.preventDefault();
    console.log("onSubmit", formData);
    await AddTeacher(formData, setLoading);
    navigate('/');
  };

  const GetClasses = async () => {
    const res = await GetAllClasses(setLoading);
    setClasses(res.data);
  }

  useEffect(() => {
    GetClasses();
  },[]);

  return (
    <div className="flex flex-col justify-center items-center">
      <MdClose
        onClick={() => navigate("/")}
        size={30}
        className="cursor-pointer absolute top-5 right-5"
      />
      <p className="text-2xl font-bold mt-5">Fill form to add teacher</p>
      <form
        onSubmit={submitHandler}
        className="mt-12 mx-auto w-[500px] p-5 rounded-lg border border-[#E49BFF]"
      >
        <Field
          onChange={handleChange}
          label="Name"
          id="teacher-name"
          name="name"
          required
        />
        <Select
          onChange={handleChange}
          label="Select Gender"
          id="gender"
          name="gender"
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </Select>
        <Field
          onChange={handleChange}
          label="DOB"
          id="dob"
          name="dob"
          type="date"
          required
        />
        <Field
          onChange={handleChange}
          label="Contact Details"
          id="contactdetails"
          name="contactdetails"
          type="number"
          required
        />
        <Field
          onChange={handleChange}
          label="Salary"
          id="salary"
          name="salary"
          required
        />
        <Select
          onChange={handleChange}
          label="Assign Class"
          id="assignedclass"
          name="assignedclass"
          required
        >
          <option value="" disabled>I'm interesting in...</option>
          {classes?.map(item => <option value={item?._id}>{item?.name}</option>)}
        </Select>
        <input
          className="h-10 w-full my-2 text-base text-white bg-blue-500 cursor-pointer"
          type="submit"
        />
      </form>
    </div>
  );
}

export default TeacherForm;