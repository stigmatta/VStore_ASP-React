import GrayButton from "./GrayButton";
import QrCode from "../images/qr_code.png";
import { Link, useNavigate } from "react-router-dom";
import LabelInput from "./LabelInput";
import FormGreenButton from "./FormGreenButton";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";

export default function LoginForm() {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/Main");
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();
  const [invalidInput, setInvalidInput] = useState("");

  const onSubmit = async () => {
    console.log("Submitting...");
    const { username, password } = getValues();
    const data = { username, password };
    try {
      await axios.post("https://localhost:7192/api/login", data);
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 400) {
        setInvalidInput("Incorrect username or password");
        return;
      }
    }
    console.log("Logged in");
    handleRedirect();
  };
  return (
    <div>
      <h1
        className="mx-auto my-0 w-fit text-formTitle font-extrabold
                   l:mx-0"
      >
        Log in
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="formInput p-11 mt-0 l:mt-11 scale-90 md:scale-100 min-w-[90%] flex flex-col items-center l:items-baseline l:flex-row gap-16"
      >
        <div name="first-col" className="flex flex-col">
          <LabelInput
            {...register("username", {
              required: "Username is required",
              minLength: {
                value: 5,
                message: "Minimum length is 5 characters",
              },
              maxLength: {
                value: 15,
                message: "Maximum length is 15 characters",
              },
              pattern: {
                value: /^[a-zA-Z0-9_]+$/,
                message: "Only letters, numbers and underscores",
              },
            })}
            label="SIGN IN WITH ACCOUNT NAME"
            error={errors.username?.message}
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
            error={errors.password?.message || invalidInput}
          />
          <div className="flex gap-9 mt-9">
            <FormGreenButton
              weight="800"
              size="1.125rem"
              text="SIGN IN"
              height="5.18rem"
              type="submit"
            ></FormGreenButton>
            <GrayButton
              opacity={0.8}
              px="2rem"
              text="Help, I can`t log in"
              flexGrow="1"
              height="5.18rem"
            ></GrayButton>
          </div>

          <div className="w-full mt-4 flex flex-col justify-center text-center">
            <label className="opacity-70">No account?</label>
            <Link
              className="opacity-70 underline underline-offset-2"
              to="/Registration"
            >
              Create a new one!
            </Link>
          </div>
        </div>
        <div
          name="second-col"
          className="flex order-first l:order-last flex-col w-56 text-center items-center gap-4"
        >
          <label className="text-green w-fit">SIGN IN WITH QRCODE</label>
          <img alt="qrcode" className="h-56 w-full" src={QrCode}></img>
          <p className="opacity-70 font-light text-wrap">
            Use out app or other means to scan this QRcode and log in into your
            account
          </p>
        </div>
      </form>
    </div>
  );
}
