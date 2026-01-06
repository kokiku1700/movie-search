"use client";

import PwFindForm from "@/components/PwFindForm";
import PwFindResult from "@/components/PwFindResult";
import { useState } from "react";

export default function PWFind () {
    const [step, setStep] = useState<"identify" | "results">("identify")
    const [findState, setFindState] = useState<boolean | null>(null);
    const [err, setErr] = useState("");

    return (
        <>
            {step === "identify" && <PwFindForm setStep={setStep} setFindState={setFindState} />}
            {step === "results" && <PwFindResult setStep={setStep} findState={findState} />}
        </>
    );
}