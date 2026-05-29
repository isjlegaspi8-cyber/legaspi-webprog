import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';

const inputClasses =
  'mt-2 w-full rounded-3xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-yellow-500 focus:bg-zinc-800 focus:ring-2 focus:ring-yellow-500/40';

const labelClasses = 'text-sm font-black uppercase text-zinc-300 tracking-wider';

const fieldErrorClasses = 'mt-2 text-xs text-red-400';

const validateField = (name, value, values) => {
  switch (name) {
    case 'firstName':
    case 'lastName':
      return value.trim() ? '' : 'This field is required.';
    case 'email':
      return value.trim()
        ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? ''
          : 'Enter a valid email address.'
        : 'Email is required.';
    case 'username':
      if (!value.trim()) return 'Username is required.';
      if (value.includes(' ')) return 'Username must not contain spaces.';
      return '';
    case 'contact':
      if (!value.trim()) return 'Contact number is required.';
      if (!/^\d{11}$/.test(value)) return 'Contact number must be exactly 11 digits.';
      return '';
    case 'age':
      if (!value.trim()) return 'Age is required.';
      if (!/^\d+$/.test(value)) return 'Age must be a number only.';
      if (Number(value) <= 0) return 'Age must be greater than zero.';
      return '';
    case 'password':
      if (!value) return 'Password is required.';
      if (value.length < 8) return 'Password must be at least 8 characters.';
      return '';
    case 'confirmPassword':
      if (!value) return 'Confirm password is required.';
      if (value !== values.password) return 'Passwords do not match.';
      return '';
    default:
      return '';
  }
};

const SignUpPage = () => {
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    contact: '',
    age: '',
    password: '',
    confirmPassword: '',
    agreed: false,
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    contact: '',
    age: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const nextValue = type === 'checkbox' ? checked : value;

    setValues((prev) => ({
      ...prev,
      [name]: nextValue,
    }));

    if (name !== 'agreed') {
      setErrors((prev) => ({
        ...prev,
        [name]: validateField(name, nextValue, { ...values, [name]: nextValue }),
        ...(name === 'password' && {
          confirmPassword: validateField('confirmPassword', values.confirmPassword, { ...values, password: nextValue }),
        }),
        ...(name === 'confirmPassword' && {
          confirmPassword: validateField('confirmPassword', nextValue, { ...values, confirmPassword: nextValue }),
        }),
      }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = Object.keys(errors).reduce((acc, key) => {
      acc[key] = validateField(key, values[key], values);
      return acc;
    }, {});

    setErrors(nextErrors);

    const hasError = Object.values(nextErrors).some((error) => error);
    if (hasError || !values.agreed) return;

    // Submit logic here
    alert('Sign up successful');
  };

  const isFormValid =
    Object.values(errors).every((error) => !error) &&
    Object.values(values).every((value) => value !== '') &&
    values.agreed;

  return (
    <div className="space-y-10">
      <div className="space-y-5">
        <p className="text-[11px] font-black uppercase tracking-[0.35em] text-yellow-500">Access Portal</p>
        <h1 className="text-4xl font-black uppercase tracking-tight text-white sm:text-5xl">
          Join the <span className="text-yellow-500">Elite</span>
        </h1>
        <p className="text-zinc-400 leading-relaxed">
          Elite players rise above. Prove you deserve to stand with us.
        </p>
      </div>

      <form
        className="space-y-6 rounded-[2rem] border border-zinc-800 bg-zinc-950/95 p-8 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.9)] backdrop-blur-xl"
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label htmlFor="first-name" className={labelClasses}>
              First Name
            </label>
            <input
              id="first-name"
              name="firstName"
              type="text"
              placeholder="Chrome"
              autoComplete="given-name"
              className={inputClasses}
              value={values.firstName}
              onChange={handleChange}
            />
            {errors.firstName && <p className={fieldErrorClasses}>{errors.firstName}</p>}
          </div>
          <div>
            <label htmlFor="last-name" className={labelClasses}>
              Last Name
            </label>
            <input
              id="last-name"
              name="lastName"
              type="text"
              placeholder="Ryugu"
              autoComplete="family-name"
              className={inputClasses}
              value={values.lastName}
              onChange={handleChange}
            />
            {errors.lastName && <p className={fieldErrorClasses}>{errors.lastName}</p>}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label htmlFor="signup-email" className={labelClasses}>
              Email Address
            </label>
            <input
              id="signup-email"
              name="email"
              type="email"
              placeholder="apex@pendragon.com"
              autoComplete="email"
              className={inputClasses}
              value={values.email}
              onChange={handleChange}
            />
            {errors.email && <p className={fieldErrorClasses}>{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="signup-username" className={labelClasses}>
              Username
            </label>
            <input
              id="signup-username"
              name="username"
              type="text"
              placeholder="pendragon"
              autoComplete="username"
              className={inputClasses}
              value={values.username}
              onChange={handleChange}
            />
            {errors.username && <p className={fieldErrorClasses}>{errors.username}</p>}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label htmlFor="signup-contact" className={labelClasses}>
              Contact Number
            </label>
            <input
              id="signup-contact"
              name="contact"
              type="tel"
              placeholder="09171234567"
              autoComplete="tel"
              inputMode="numeric"
              className={inputClasses}
              value={values.contact}
              onChange={handleChange}
            />
            {errors.contact && <p className={fieldErrorClasses}>{errors.contact}</p>}
          </div>
          <div>
            <label htmlFor="signup-age" className={labelClasses}>
              Age
            </label>
            <input
              id="signup-age"
              name="age"
              type="text"
              placeholder="22"
              inputMode="numeric"
              className={inputClasses}
              value={values.age}
              onChange={handleChange}
            />
            {errors.age && <p className={fieldErrorClasses}>{errors.age}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="signup-password" className={labelClasses}>
            Password
          </label>
          <input
            id="signup-password"
            name="password"
            type="password"
            placeholder="Enter your password"
            autoComplete="new-password"
            className={inputClasses}
            value={values.password}
            onChange={handleChange}
          />
          <p className="mt-2 text-xs leading-5 text-zinc-500">
            Password must be at least 8 characters.
          </p>
          {errors.password && <p className={fieldErrorClasses}>{errors.password}</p>}
        </div>

        <div>
          <label htmlFor="confirm-password" className={labelClasses}>
            Confirm Password
          </label>
          <input
            id="confirm-password"
            name="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            autoComplete="new-password"
            className={inputClasses}
            value={values.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && <p className={fieldErrorClasses}>{errors.confirmPassword}</p>}
        </div>

        <label className="flex items-start gap-3 text-zinc-400 cursor-pointer hover:text-yellow-500 transition pt-2">
          <input
            type="checkbox"
            name="agreed"
            checked={values.agreed}
            onChange={handleChange}
            className="h-5 w-5 rounded border-zinc-600 accent-yellow-500 cursor-pointer mt-0.5"
          />
          <span className="text-xs leading-relaxed">
            I agree to Team Pendragon&apos;s <span className="text-yellow-500 font-black">Terms of Service</span> and <span className="text-yellow-500 font-black">Privacy Policy</span>
          </span>
        </label>

        <Button
          type="submit"
          className="w-full bg-yellow-500 !text-black border-none h-14 text-lg font-black uppercase skew-x-[-10deg] shadow-[8px_8px_0_0_#000] transition duration-300 hover:bg-white hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
          disabled={!isFormValid}
        >
          Claim Your Spot
        </Button>

        <div className="flex items-center gap-3 text-xs uppercase text-zinc-500">
          <span className="block h-px flex-1 bg-zinc-700"></span>
          <span>Or</span>
          <span className="block h-px flex-1 bg-zinc-700"></span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button
            type="button"
            className="h-12 bg-zinc-900 !text-white border border-zinc-700 font-black uppercase tracking-[0.18em] hover:border-yellow-500 hover:bg-zinc-800 transition"
          >
            Google
          </Button>
          <Button
            type="button"
            className="h-12 bg-zinc-900 !text-white border border-zinc-700 font-black uppercase tracking-[0.18em] hover:border-yellow-500 hover:bg-zinc-800 transition"
          >
            Apple
          </Button>
        </div>
      </form>

      <div className="text-center text-zinc-400">
        Already in the system?{' '}
        <Link to="/signin" className="font-black text-yellow-500 hover:text-yellow-400 transition">
          Log In Here
        </Link>
      </div>
    </div>
  );
};

export default SignUpPage;
