import GreenButton from "./GreenButton";
import DisabledButton from "./DisabledButton";
import React, { useState } from "react";
import BreakLine from "./BreakLine";

export default function OrderSummary({ selected, success, isCardCorrect }) {
  const [termsAccepted, setTermsAccepted] = useState(false);

  return (
    <div className="flex flex-col gap-5">
      <div>
        <label className="flex flex-row w-full gap-6">
          <input
            className="w-14"
            type="checkbox"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            required
          />
          <span className="opacity-70 text-text font-normal">
            I am 13 years of age or older and agree to the terms of the Steam
            Subscriber Agreement and the Valve Privacy Policy.
          </span>
        </label>
      </div>
      <BreakLine />
      <p className="hidden text-text opacity-50 font-normal lg:block">
        You are purchasing a digital license for this product. For full terms,
        see purchase policy.
        <br />
        <br />
        By clicking "Place Order" below, I represent that I am over 18 and an
        authorized user of this payment method, I agree to the End User License
        Agreement.
      </p>
      <div>
        {selected != null && termsAccepted && isCardCorrect ? (
          <GreenButton
            onClick={success}
            type={"submit"}
            form={"card-details"}
            width={"100%"}
            height={"58px"}
            weight={800}
            text={"PLACE ORDER"}
          />
        ) : (
          <DisabledButton
            width={"100%"}
            height={"58px"}
            title={"PLACE ORDER"}
          />
        )}
      </div>
    </div>
  );
}
