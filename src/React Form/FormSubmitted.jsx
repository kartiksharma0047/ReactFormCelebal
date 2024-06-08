function FormSubmitted({ formData }) {
    console.log(formData);

    return (
        <div className="formSubmittedDiv">
            <h1>Form Submitted</h1>
            <div className="FormData">
                <h3>First Name : {formData.firstName}</h3>
                <h3>Last Name : {formData.lastName}</h3>
                <h3>Username : {formData.username}</h3>
                <h3>Email : {formData.email}</h3>
                <h3>Password : {formData.password}</h3>
                <h3>Country : {formData.country}</h3>
                <h3>City : {formData.city}</h3>
                <h3>Phone number : {formData.phoneNumber}</h3>
                <h3>Pan number : {formData.panNumber}</h3>
                <h3>Aadhar number : {formData.aadharNumber}</h3>
            </div>
        </div>
    );
}

export default FormSubmitted;