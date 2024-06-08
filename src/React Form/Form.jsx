import { useState } from "react";
import "./Form.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { faReact } from "@fortawesome/free-brands-svg-icons";
import FormSubmitted from "./FormSubmitted";

function App() {
    document.title = "React Form";

    const countryCodes = {
        ARGENTINA: "+54",
        INDIA: "+91",
        CHINA: "+86",
        GERMANY: "+49"
    };

    const [showPass, SetShowPass] = useState(false);
    const [formSubmitted, SetFormSubmitted] = useState(false);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        country: "",
        city: "",
        phoneNumber: "",
        panNumber: "",
        aadharNumber: ""
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Handle country change and set phone number prefix
        if (name === "country") {
            const countryCode = countryCodes[value] || "";
            setFormData({ ...formData, country: value, phoneNumber: countryCode });
        } else {
            setFormData({ ...formData, [name]: value });
        }

        if (!value.trim()) {
            setErrors({ ...errors, [name]: `${name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()} is required` });
        } else {
            const newErrors = { ...errors };
            delete newErrors[name];
            setErrors(newErrors);
        }
    };

    const handlePhoneNumberChange = (e) => {
        const { value } = e.target;
        const countryCode = formData.phoneNumber.split(" ")[0];
        const phoneNumber = value.replace(countryCode, "").trim();
        setFormData({ ...formData, phoneNumber: `${countryCode} ${phoneNumber}` });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = {};
        Object.keys(formData).forEach((field) => {
            if (!formData[field].trim()) {
                newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1).toLowerCase()} is required`;
            }
        });

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            SetFormSubmitted(true);
        }
    };

    return (
        <>
            {formSubmitted ? <FormSubmitted formData={formData} /> : <div className="FormDiv">
                <div className="HeadingForm">
                    <FontAwesomeIcon icon={faCaretDown} />
                    <FontAwesomeIcon icon={faReact} />
                </div>
                <div className="DesignBox DesignRight">
                    <h1>React</h1>
                </div>
                <div className="DesignBox Designleft">
                    <h1>Form</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="Container">
                        <div className="ErrorDiv">
                            <input
                                type="text"
                                name="firstName"
                                placeholder="Enter First Name"
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                            <span className={!errors.firstName ? 'paddingSpan' : ''}>
                                {errors.firstName}
                            </span>
                        </div>
                        <div className="ErrorDiv">
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Enter Last Name"
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                            <span className={!errors.lastName ? 'paddingSpan' : ''}>
                                {errors.lastName}
                            </span>
                        </div>
                    </div>
                    <div className="ErrorDiv">
                        <input
                            type="text"
                            name="username"
                            placeholder="Enter Username"
                            value={formData.username}
                            onChange={handleChange}
                        />
                        <span className={!errors.username ? 'paddingSpan' : ''}>
                            {errors.username}
                        </span>
                    </div>
                    <div className="ErrorDiv">
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter E-mail"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <span className={!errors.email ? 'paddingSpan' : ''}>
                            {errors.email}
                        </span>
                    </div>
                    <div className="ErrorDiv">
                        <input
                            type={showPass ? "text" : "password"}
                            name="password"
                            placeholder="Enter Password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <FontAwesomeIcon
                            onClick={() => SetShowPass(!showPass)}
                            icon={showPass ? faEye : faEyeSlash}
                        />
                        <span className={!errors.password ? 'paddingSpan' : ''}>
                            {errors.password}
                        </span>
                    </div>
                    <div className="DropDown">
                        <div className="ErrorDiv">
                            <div className="DropDownDiv">
                                <label>Choose a Country :</label>
                                <select
                                    className="country"
                                    name="country"
                                    value={formData.country}
                                    onChange={handleChange}
                                >
                                    <option value="" disabled>Select Country</option>
                                    <option value="ARGENTINA">ARGENTINA</option>
                                    <option value="INDIA">INDIA</option>
                                    <option value="CHINA">CHINA</option>
                                    <option value="GERMANY">GERMANY</option>
                                </select>
                            </div>
                            <span className={!errors.country ? 'paddingSpan' : ''}>
                                {errors.country}
                            </span>
                        </div>
                        <div className="ErrorDiv">
                            <div className="DropDownDiv">
                                <label>Choose a City :</label>
                                <select
                                    className="city"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                >
                                    <option value="" disabled>Select City</option>
                                    <option value="San Luis">San Luis</option>
                                    <option value="Mumbai">Mumbai</option>
                                    <option value="Beijing">Beijing</option>
                                    <option value="Berlin">Berlin</option>
                                </select>
                            </div>
                            <span className={!errors.city ? 'paddingSpan' : ''}>
                                {errors.city}
                            </span>
                        </div>
                    </div>
                    <div className="ErrorDiv">
                        <input
                            type="tel"
                            name="phoneNumber"
                            maxLength={14}
                            placeholder="Enter Phone Number"
                            value={formData.phoneNumber}
                            onChange={handlePhoneNumberChange}
                        />
                        <span className={!errors.phoneNumber ? 'paddingSpan' : ''}>
                            {errors.phoneNumber}
                        </span>
                    </div>
                    <div className="Container">
                        <div className="ErrorDiv">
                            <input
                                type="number"
                                name="panNumber"
                                placeholder="Enter Pan Number"
                                value={formData.panNumber}
                                onChange={handleChange}
                            />
                            <span className={!errors.panNumber ? 'paddingSpan' : ''}>
                                {errors.panNumber}
                            </span>
                        </div>
                        <div className="ErrorDiv">
                            <input
                                type="number"
                                name="aadharNumber"
                                placeholder="Enter Aadhar Number"
                                value={formData.aadharNumber}
                                onChange={handleChange}
                            />
                            <span className={!errors.aadharNumber ? 'paddingSpan' : ''}>
                                {errors.aadharNumber}
                            </span>
                        </div>
                    </div>
                    <button type="submit" className="SubmitBtn">Submit</button>
                </form>
            </div>}
        </>
    );
}

export default App;
