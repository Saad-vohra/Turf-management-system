import React, { useState } from "react";

const ContactForm = ({ turf }) => {

const [formData, setFormData] = useState({
name: "",
phone: "",
email: "",
message: ""
});

const handleChange = (e) => {
setFormData({
...formData,
[e.target.name]: e.target.value
});
};

const handleSubmit = (e) => {
e.preventDefault();
console.log("Message Sent:", formData);

alert("Message sent successfully!");

setFormData({
name: "",
phone: "",
email: "",
message: ""
});
};

return (

<div className="contact-form-container">

<form onSubmit={handleSubmit}>

<div className="row">

<input
type="text"
name="name"
placeholder="Full Name"
value={formData.name}
onChange={handleChange}
required
/>

<input
type="tel"
name="phone"
placeholder="Number"
value={formData.phone}
onChange={handleChange}
required
/>

</div>

<input
type="email"
name="email"
placeholder="Email"
value={formData.email}
onChange={handleChange}
required
/>

<textarea
name="message"
placeholder="Message"
value={formData.message}
onChange={handleChange}
required
/>

<button type="submit" className="send-btn">
Send Message
</button>

</form>

<div className="turf-info">

<h3>{turf.name}</h3>

<p>{turf.address}</p>

<p>{turf.email}</p>

<p>{turf.phone}</p>

</div>

</div>

);

};

export default ContactForm;