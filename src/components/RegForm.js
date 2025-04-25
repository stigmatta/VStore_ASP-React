import LabelInput from "./LabelInput";
import FormGreenButton from "./FormGreenButton";
import Checkbox from "./Checkbox";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import { useRef, useState } from "react";
import axios from "axios";

export default function RegForm({ setModalVisible, setFormVisible }) {
  const captchaRef = useRef(null);
  const [captchaError, setCaptchaError] = useState(false);
  const [uniqueError, setUniqueError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const onSubmit = async () => {
    const captchaValue = captchaRef.current.getValue();
    const { email, password } = getValues();
    const data = { email, password };

    console.log("Sending data:", data);

    if (!captchaValue) {
      setCaptchaError(true);
      return;
    }
    setCaptchaError(false);

    try {
      await axios.post("https://localhost:7192/api/register", data);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setUniqueError("Email is already in use.");
        return;
      }
    }

    setFormVisible(false);
    setModalVisible(true);
  };

  return (
    <div className="my-auto">
      <h1 className="l:ml-11 mx-auto my-0 w-fit text-formTitle font-extrabold l:mx-0">
        Create an account
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="formInput p-11 max-w-[90%] flex flex-col items-center l:items-baseline l:flex-row gap-16"
      >
        <div name="first-col" className="flex flex-col">
          <LabelInput
            label="EMAIL"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
                message: "Please enter a valid email address",
              },
            })}
            error={errors.email?.message || uniqueError}
          />
          <LabelInput
            mt="1rem"
            label="PASSWORD"
            type="password"
            {...register("password", {
              required: "Password is required",
              pattern: {
                value: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])\w{8,20}$/,
                message:
                  "8–20 characters with upper, lower, number. Underscore allowed.",
              },
            })}
            error={errors.password?.message}
          />
          <Checkbox
            {...register("checkbox", { required: "Checkbox is required" })}
            error={errors.checkbox?.message}
          />
          <div className="mt-6 w-full">
            <ReCAPTCHA
              sitekey="6LdSNQsrAAAAAPxct6mgv8rSnBE8rC9UpMivQA5R"
              size="normal"
              ref={captchaRef}
            />
            {captchaError && (
              <span className="text-red-500 text-sm mt-1">
                ReCAPTCHA is required
              </span>
            )}
          </div>

          <div className="mt-7 w-full">
            <FormGreenButton
              weight="800"
              size="1.125rem"
              text="SIGN IN"
              height="5.18rem"
              className="w-full"
              type="submit"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
