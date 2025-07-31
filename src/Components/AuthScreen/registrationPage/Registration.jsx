import React from 'react';
import { useFormik ,ErrorMessage } from 'formik';
import * as Yup from 'yup'; 
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const GoogleIcon = () => (
    <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_131_1193)">
            <path d="M31.9847 16.2994C31.9847 14.9884 31.8758 14.0317 31.6402 13.0396H16.3187V18.9569H25.3121C25.1308 20.4274 24.1517 22.642 21.9759 24.1301L21.9454 24.3282L26.7897 27.9952L27.1254 28.0279C30.2077 25.2463 31.9847 21.1538 31.9847 16.2994Z" fill="#4285F4"/>
            <path d="M16.3187 31.8901C20.7247 31.8901 24.4236 30.4727 27.1254 28.0279L21.9759 24.1301C20.5979 25.0691 18.7484 25.7246 16.3187 25.7246C12.0034 25.7246 8.34073 22.9432 7.0351 19.0986L6.84373 19.1145L1.80648 22.9236L1.7406 23.1025C4.4241 28.3112 9.93623 31.8901 16.3187 31.8901Z" fill="#34A853"/>
            <path d="M7.03512 19.0987C6.69062 18.1066 6.49125 17.0435 6.49125 15.9451C6.49125 14.8466 6.69062 13.7837 7.017 12.7915L7.00787 12.5803L1.9075 8.70996L1.74062 8.78752C0.634625 10.949 0 13.3762 0 15.9451C0 18.5141 0.634625 20.9412 1.74062 23.1026L7.03512 19.0987Z" fill="#FBBC05"/>
            <path d="M16.3187 6.16537C19.383 6.16537 21.45 7.45869 22.6286 8.53948L27.2341 4.14571C24.4056 1.57679 20.7247 0 16.3187 0C9.93623 0 4.4241 3.57875 1.7406 8.78742L7.01698 12.7915C8.34073 8.94693 12.0034 6.16537 16.3187 6.16537Z" fill="#EB4335"/>
        </g>
        <defs>
            <clipPath id="clip0_131_1193">
                <rect width="32" height="32" fill="white"/>
            </clipPath>
        </defs>
    </svg>
);

const AppleIcon = () => (
    <svg width="24" height="24" viewBox="0 0 26 31" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21.0591 29.0464C19.426 30.6295 17.6429 30.3795 15.9265 29.6296C14.11 28.8631 12.4436 28.8297 10.5271 29.6296C8.12744 30.6628 6.86093 30.3629 5.42778 29.0464C-2.70453 20.6641 -1.50468 7.89903 7.72749 7.43243C9.97721 7.54908 11.5437 8.6656 12.8602 8.76559C14.8266 8.36564 16.7097 7.21579 18.8094 7.36577C21.3258 7.56574 23.2255 8.56562 24.4754 10.3654C19.276 13.4817 20.5092 20.3308 25.2753 22.2472C24.3254 24.7469 23.0922 27.2299 21.0425 29.063L21.0591 29.0464ZM12.6935 7.33244C12.4436 3.61624 15.4598 0.549962 18.9261 0.25C19.4093 4.54946 15.0266 7.74905 12.6935 7.33244Z" fill="black"/>
    </svg>
);

const FacebookIcon = () => (
    <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_131_1202)">
            <path d="M32 16C32 7.1635 24.8365 0 16 0C7.1635 0 0 7.16337 0 16C0 23.986 5.851 30.6054 13.5 31.8056V20.625H9.4375V16H13.5V12.475C13.5 8.465 15.8888 6.25 19.5434 6.25C21.294 6.25 23.125 6.5625 23.125 6.5625V10.5H21.1075C19.1198 10.5 18.5 11.7334 18.5 12.9987V16H22.9375L22.2281 20.625H18.5V31.8056C26.149 30.6054 32 23.9861 32 16Z" fill="#1877F2"/>
            <path d="M22.2281 20.625L22.9375 16H18.5V12.9987C18.5 11.7332 19.1199 10.5 21.1075 10.5H23.125V6.5625C23.125 6.5625 21.294 6.25 19.5434 6.25C15.8888 6.25 13.5 8.465 13.5 12.475V16H9.4375V20.625H13.5V31.8056C14.327 31.9352 15.1629 32.0002 16 32C16.8371 32.0002 17.673 31.9353 18.5 31.8056V20.625H22.2281Z" fill="white"/>
        </g>
        <defs>
            <clipPath id="clip0_131_1202">
                <rect width="32" height="32" fill="white"/>
            </clipPath>
        </defs>
    </svg>
);

const ArrowRightIcon = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
    </svg>
);

const RegistrationSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('First name is required'),
    lastName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Last name is required'),
    gender: Yup.string()
        .oneOf(['Male', 'Female', 'Other'], 'Male, Female or Other must be selected')
        .required('Gender is required'),
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/[0-9]/, 'Password must contain at least one number')
        .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')
        .required('Password is required'),
    agreeTerms: Yup.boolean()
        .oneOf([true], 'You must agree to the terms and conditions'),
    keepLoggedIn: Yup.boolean(),
});


export default function Registration() {
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            gender: '',
            email: '',
            password: '',
            agreeTerms: false,
            keepLoggedIn: false,
        },
        validationSchema: RegistrationSchema,
        onSubmit: (values, { resetForm }) => { 
            console.log('Form submitted with values:', values);
                toast.success('Registration successful!', { 
                    position: "top-center",
                    autoClose: 3000, 
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            resetForm(); // Clear the form fields after successful submission
            // In a real application, you would send this data to your backend API here
            // e.g., axios.post('/api/register', values);
        },
    });

    const SocialButton = ({ icon }) => (
        <button className="flex-1 flex items-center justify-center gap-2 py-5 cursor-pointer border border-[#232321]  rounded-md transition-colors focus:outline-none">
            {icon}
        </button>
    );

    return (
        <div className="flex items-center justify-between p-4 sm:p-6 lg:p-12 font-Rubik">
          <ToastContainer />
            <div className="w-full max-w-[100%] mx-auto grid lg:grid-cols-2 space-y-4 lg:gap-20">

                <div className="flex flex-col justify-center xl:px-20">
                    <h1 className="text-3xl font-bold text-[#232321]">Register</h1>

                    <p className="mt-4 text-[#232321]">Sign up with</p>
                    <div className="mt-2 flex 2xl:w-[85%] gap-4 sm:gap-6">
                        <SocialButton icon={<GoogleIcon />} />
                        <SocialButton icon={<AppleIcon />} />
                        <SocialButton icon={<FacebookIcon />} />
                    </div>

                    <div className="my-6 flex items-center">
                        <span className=" text-[#232321]">OR</span>
                    </div>

                    <form onSubmit={formik.handleSubmit}>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="firstName" className="block text-lg font-bold text-gray-700">Your Name</label>
                                <div className="mt-1 grid grid-cols-1 gap-4">
                                    <input
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        placeholder="First Name"
                                        value={formik.values.firstName}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className="w-full p-3 border border-[#232321] rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500"
                                    />
                                    {formik.touched.firstName && formik.errors.firstName ? (
                                        <div className="text-red-500 text-xs mt-1">{formik.errors.firstName}</div>
                                    ) : null}
                                    <input
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        placeholder="Last Name"
                                        value={formik.values.lastName}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className="w-full p-3  border border-[#232321] rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500"
                                    />
                                    {formik.touched.lastName && formik.errors.lastName ? (
                                        <div className="text-red-500 text-xs mt-1">{formik.errors.lastName}</div>
                                    ) : null}
                                </div>
                            </div>

                             
                            <div>
                                <label className="block text-lg font-bold text-gray-700">Gender</label>
                                <div className="mt-2 flex items-center space-x-6">
                                    {['Male', 'Female', 'Other'].map(genderOption => (
                                        <label key={genderOption} className="flex items-center relative cursor-pointer">
                                            <input
                                                type="checkbox"
                                                name="gender"
                                                value={genderOption}
                                                checked={formik.values.gender === genderOption}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        formik.setFieldValue('gender', genderOption);
                                                    } else {
                                                        if (formik.values.gender === genderOption) {
                                                            formik.setFieldValue('gender', '');
                                                        }
                                                    }
                                                    formik.setFieldTouched('gender', true, false);
                                                }}
                                                onBlur={formik.handleBlur}
                                                className="absolute opacity-0 w-0 h-0"
                                            />
                                            <div className="h-4 w-4 border border-black flex items-center justify-center transition-colors duration-200">
                                                {formik.values.gender === genderOption && (
                                                    <svg className="w-4 h-4 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                                                    </svg>
                                                )}
                                            </div>
                                            <span className="ml-2 text-gray-700">{genderOption}</span>
                                        </label>
                                    ))}
                                </div>
                                {formik.touched.gender && formik.errors.gender ? (
                                    <div className="text-red-500 text-xs mt-1">{formik.errors.gender}</div>
                                ) : null}
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-lg font-bold text-gray-700">Login Details</label>
                                <div className="mt-1 space-y-4">
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="Email"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className="w-full p-3 border border-[#232321] rounded-md placeholder-[#79767C] shadow-sm"
                                    />
                                    {formik.touched.email && formik.errors.email ? (
                                        <div className="text-red-500 text-xs mt-1">{formik.errors.email}</div>
                                    ) : null}
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        placeholder="Password"
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className="w-full p-3  border border-[#232321] rounded-md shadow-sm placeholder-[#79767C] "
                                    />
                                    {formik.touched.password && formik.errors.password ? (
                                        <div className="text-red-500 text-xs mt-1">{formik.errors.password}</div>
                                    ) : null}
                                </div>
                                <p className="mt-2 text-xs text-gray-500">Minimum 8 characters with at least one uppercase, one lowercase, one special character and a number</p>
                            </div>

                            <div>
                                <label htmlFor="agreeTerms" className="flex items-start relative ">
                                    <input
                                        id="agreeTerms"
                                        name="agreeTerms"
                                        type="checkbox"
                                        checked={formik.values.agreeTerms}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className="absolute opacity-0 w-0 h-0"
                                    />
                                    <div className="h-4 w-4 border border-black mt-1 flex items-center justify-center transition-colors duration-200">
                                        {formik.values.agreeTerms && (
                                            <svg className="w-4 h-4 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                                            </svg>
                                        )}
                                    </div>
                                    <span className="ml-3 text-md text-gray-600 2xl:w-[70%] lg:w-[85%] w-[95%]">
                                        By clicking 'Log In' you agree to our website <a href="#" className="font-medium text-gray-800 hover:underline">KicksClub Terms & Conditions</a>, <a href="#" className="font-medium text-gray-800 hover:underline">Kicks Privacy Notice</a> and <a href="#" className="font-medium text-gray-800 hover:underline">Terms & Conditions</a>.
                                    </span>
                                </label>
                                {formik.touched.agreeTerms && formik.errors.agreeTerms ? (
                                    <div className="text-red-500 text-xs mt-1">{formik.errors.agreeTerms}</div>
                                ) : null}
                            </div>

                            <div>
                                <label htmlFor="keepLoggedIn" className="flex items-center relative">
                                    <input
                                        id="keepLoggedIn"
                                        name="keepLoggedIn"
                                        type="checkbox"
                                        checked={formik.values.keepLoggedIn}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className="absolute opacity-0 w-0 h-0"
                                    />
                                    <div className="h-4 w-4 border border-black  flex items-center justify-center transition-colors duration-200">
                                        {formik.values.keepLoggedIn && (
                                            <svg className="w-4 h-4 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                                            </svg>
                                        )}
                                    </div>
                                    <span className="ml-3 text-md text-gray-600">
                                        Keep me logged in - applies to all log in options below. <a href="#" className="font-medium text-gray-800 hover:underline">More info</a>
                                    </span>
                                </label>
                            </div>

                            <Link
                                to="/login"
                                className="w-full flex justify-between items-center p-4 font-semibold text-white bg-gray-900 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors"
                            >
                                <span>REGISTER</span>
                                <ArrowRightIcon className="w-5 h-5" />
                            </Link>
                        </div>
                    </form>
                </div>

                <div className="flex flex-col h-max bg-white p-4 rounded-lg shadow-lg">
                    <h2 className="text-3xl font-bold text-gray-800 leading-tight">Join Kicks Club Get Rewarded Today.</h2>
                    <p className="mt-4 text-gray-600">
                        As kicks club member you get rewarded with what you love for doing what you love. Sign up today and receive immediate access to these Level 1 benefits:
                    </p>
                    <ul className="mt-6 space-y-3 text-gray-700 list-disc list-inside">
                        <li>Free shipping</li>
                        <li>A 15% off voucher for your next purchase</li>
                        <li>Access to Members Only products and sales</li>
                        <li>Access to adidas Running and Training apps</li>
                        <li>Special offers and promotions</li>
                    </ul>
                    <p className="mt-6 text-gray-600">
                        Join now to start earning points, reach new levels and unlock more rewards and benefits from adiClub.
                    </p>
                    <button className="mt-8 w-full flex justify-between items-center p-4 font-semibold text-white bg-gray-900 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors">
                        <span>JOIN THE CLUB</span>
                        <ArrowRightIcon className="w-5 h-5" />
                    </button>
                </div>

            </div>
        </div>
    );
}