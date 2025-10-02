import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import btnBck from "../assets/button-back.png";
import btnPro from "../assets/button-proceed.png";
import { div } from "@tensorflow/tfjs";
import RotatingStack from "./RotatingStack";

const FormLogic = ({ className = "" }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", location: "" });
  const [error, setError] = useState({ name: "", location: "" });
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [dots, setDots] = useState("");
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    const raw = localStorage.getItem("phaseOne");
    if (raw) {
      const saved = JSON.parse(raw);
      if (saved.name && !saved.location) {
        setForm({ name: "", location: "" });
        setStep(0);
      }
    } else {
      setForm({ name: "", location: "" });
      setStep(0);
    }
  }, []);
  // dot animation
  useEffect(() => {
    if (!loading) return;
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 300);
    return () => clearInterval(interval);
  }, [loading]);

  const validate = (key, val) => {
    if (!val.trim()) return "Required";
    if (!/^[A-Za-z\s]+$/.test(val)) return "Letters & Spaces Only";
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((form) => ({ ...form, [name]: value }));
    setError((error) => ({ ...error, [name]: validate(name, value) }));
  };

  const handleKeyDown = async (e) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    const field = step === 0 ? "name" : "location";
    const err = validate(field, form[field]);
    if (err) {
      setError((prev) => ({ ...prev, [field]: err }));
      return;
    }
    if (step === 0) {
      localStorage.setItem("phaseOneName", form.name);
      setForm((prev) => ({ ...prev, location: "" }));
      setStep(1);
    } else if (step === 1) {
      setLoading(true);
      localStorage.setItem("phaseOne", JSON.stringify(form));
      await fetch(
        "https://us-central1-frontend-simplified.cloudfunctions.net/skinstricPhaseOne",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );
      await sleep(2000);

      setLoading(false);
      setStep(2);
    }
  };

  return (
    <>
      <form
        className={`${className} p-6
        flex flex-col items-center text-center
`}
      >
        <h1 className="text-xl font-roobert font-extralight text-[#1A1B1C] text-center">
          Click To Type
        </h1>
        <input
          key={step}
          autoComplete="off"
          spellCheck={false}
          autoCorrect="off"
          name={step === 0 ? "name" : "location"}
          value={step === 0 ? form.name : form.location}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={
            step === 0 ? "Introduce Yourself" : "Where Are You From?"
          }
          className="w-screen py-4 md:py-6
          leading-normal resize-none border-none outline-none
          bg-transparent font-roobert text-3xl sm:text-4xl
          text-center placeholder:underline placeholder:text-black placeholder:text-center
          placeholder:-translate-y-1/2"
        />
        {error[step === 0 ? "name" : "location"] && (
          <p className="text-red-500 text-sm">
            {error[step === 0 ? "name" : "location"]}
          </p>
        )}
      </form>

      {/* loading */}

      {step === 1 && loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white z-40 text-center">
          <RotatingStack>
            <p className="text-lg md:text-2xl font-semibold text-gray-800">
              Processing Submission
              <br />
              <span className="inline-block w-[3ch] text-center text-4xl md:text-5xl font-semibold text-gray-700 tracking-widest">
                {dots}
              </span>
            </p>
          </RotatingStack>
        </div>
      )}

      <div className="w-[300px] flex justify-between">
        <Link
          to={"/home"}
          className="fixed bottom-4 left-4 flex items-center justify-center "
        >
          <img src={btnBck} alt="Back button" />
        </Link>
      </div>
      {step === 2 && !loading && (
        <>
          <div className="fixed inset-0 flex items-center justify-center bg-white z-40 text-center">
            <RotatingStack>
              <div className="px-4 text-center">
                <p className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6">
                  <span className="block">Thank you!</span>
                  <span className="block mt-8 font-light">
                    Proceed to the next step.
                  </span>
                </p>
              </div>
            </RotatingStack>
          </div>
          <Link
            to={"/phaseTwo"}
            className="fixed bottom-4 right-4 flex items-center justify-center z-50"
          >
            <img src={btnPro} alt="Proceed button" />
          </Link>
        </>
      )}
    </>
  );
};

export default FormLogic;
