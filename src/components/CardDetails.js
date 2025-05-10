import React, { useEffect, useState } from "react";
import BreakLine from "./BreakLine";
import { useForm } from "react-hook-form";

export default function CardDetails({
  onValidityChange,
  setData,
  isSelected,
  setSaveMethod,
}) {
  const {
    register,
    formState: { errors, isValid },
    trigger,
    watch,
    getValues,
    setValue,
    reset,
  } = useForm({
    mode: "onChange",
  });

  const [cardNumber, cardName, cardExpiration, cardCvv] = watch([
    "cardNumber",
    "cardName",
    "cardExpiration",
    "cardCvv",
  ]);
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (!isSelected) {
        reset();
        return;
      }
      await trigger();
      onValidityChange(isValid);
      if (isValid) setData(getValues());
    }, 500);

    return () => clearTimeout(timer);
  }, [
    cardNumber,
    cardName,
    cardExpiration,
    cardCvv,
    isValid,
    onValidityChange,
    trigger,
  ]);

  const formatCardNumber = (value) => {
    const digitsOnly = value.replace(/\D/g, "");
    return digitsOnly.match(/.{1,4}/g)?.join(" ") || digitsOnly;
  };
  const checkExpiration = (value) => {
    const date = new Date(value);
    if (date < new Date()) return "Expiration date must be in the future";
    return true;
  };
  const formatCVV = (value) => {
    value.replace(/\D/g, "");
    if (value.length > 3) value = value.substring(0, 3);
    setValue("cardCvv", value);
  };
  return (
    <div className="flex flex-col">
      <BreakLine />
      <span className="my-5 font-normal">CARD DETAILS</span>
      <form
        id={"card-details"}
        className="flex flex-col gap-3 font-normal opacity-70 w-full"
      >
        <label className="gap-1 flex flex-col">
          <span>Card number</span>
          <input
            {...register("cardNumber", {
              required: "Card number is required",
              minLength: {
                value: 19,
                message: "Minimum length is 16 digits",
              },
              onChange: (e) => {
                e.target.value = formatCardNumber(e.target.value);
              },
            })}
            type="text"
            inputMode="numeric"
            maxLength={19}
            className="bg-gray-formInput rounded h-[44px] px-2"
          />
          {errors.cardNumber && (
            <span className="text-red-500 text-sm">
              {errors.cardNumber.message}
            </span>
          )}
        </label>

        <label className="gap-1 flex flex-col">
          <span>Name on card</span>
          <input
            {...register("cardName", {
              required: "Card name is required",
              minLength: {
                value: 5,
                message: "Minimum length is 6 characters",
              },
              pattern: {
                value: /^[a-zA-Z ]+$/,
                message: "Only letters and spaces allowed",
              },
            })}
            type={"text"}
            className="bg-gray-formInput rounded h-[44px] px-2"
          />
          {errors.cardName && (
            <span className="text-red-500 text-sm">
              {errors.cardName.message}
            </span>
          )}
        </label>

        <div className="flex flex-row w-full justify-between gap-3">
          <label className="gap-1 flex flex-col w-[47%]">
            <span>Expiration</span>
            <input
              {...register("cardExpiration", {
                required: "Card expiration is required",
                validate: checkExpiration,
                minLength: {
                  value: 5,
                  message: "Correct format is MM/YY",
                },
                onChange: (e) => {
                  checkExpiration(e.target.value);
                },
              })}
              type={"month"}
              className="bg-gray-formInput rounded h-[44px] px-2"
            />
            {errors.cardExpiration && (
              <span className="text-red-500 text-sm">
                {errors.cardExpiration.message}
              </span>
            )}
          </label>

          <label className="gap-1 flex flex-col w-[47%]">
            <span>CVV</span>
            <input
              type={"text"}
              className="bg-gray-formInput rounded h-[44px] px-2"
              {...register("cardCvv", {
                required: "Card CVV is required",
                pattern: {
                  value: /^[0-9]{3}$/,
                  message: "CVV must be 3 digits",
                },
                onChange: (e) => {
                  formatCVV(e.target.value);
                },
              })}
            />
            {errors.cardCvv && (
              <span className="text-red-500 text-sm">
                {errors.cardCvv.message}
              </span>
            )}
          </label>
        </div>

        <label className="flex gap-3 mt-4 p-0">
          <input
            type={"checkbox"}
            onChange={(e) => setSaveMethod(e.target.checked)}
            className="w-8"
          />
          <span className="text-text">
            Save this payment method for future purchase?
          </span>
        </label>
        <p className="text-subtext">
          By choosing to save your payment information, this payment method will
          be selected as the default for all purchases made using Epic Games
          payment, including purchases in Fortnite, Rocket League, Fall Guys and
          the Epic Games Store. You can delete your saved payment information
          anytime on this payment screen or by logging in to your Epic Games
          account, and selecting payment management in your account settings
        </p>
      </form>
    </div>
  );
}
