import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import btnBck from "../assets/button-back.png";
import btnPro from "../assets/button-proceed.png";

const FormLogic = ({ className = "" }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", location: "" });
  const [error, setError] = useState({ name: "", location: "" });
  const [step, setStep] = useState(0);
  const prompts = ["Introduce Yourself", "Where Are You From?"];
  const [loading, setLoading] = useState(false);
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
    <form className={`${className} flex flex-col items-center`}>
      <h1 className="text-xl font-roobert font-extralight text-[#1A1B1C] z-20 tracking-tighter">
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
        placeholder={step === 0 ? "Introduce Yourself" : "Where Are You From?"}
        className="w-[350px] h-[150px] p-4 resize-none
         border-none outline-none ring-0
         bg-transparent
        font-roobert font-normal text-4xl z-10
        tracking-tighter whitespace-nowrap text-center 
        placeholder:underline placeholder:text-black"
      />
      {error[step === 0 ? "name" : "location"] && (
        <p className="text-red-500 text-sm">
          {" "}
          {error[step === 0 ? "name" : "location"]}{" "}
        </p>
      )}
      {step === 1 && loading && (
        <p className="mt-2 text-gray-600">Loading... </p>
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
        <Link
          to={"/phaseTwo"}
          className="fixed bottom-4 right-4 flex items-center justify-center"
        >
          <img src={btnPro} alt="Proceed button" />
        </Link>
      )}
    </form>
  );
};

export default FormLogic;
