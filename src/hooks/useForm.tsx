import { useState } from "react";

export function useForm(steps : any){
    const [currentStep,setCurrentStep] = useState(0);

    function changeStep(i : number){
        if(i < 0 || i >= steps.length) return 

        setCurrentStep(i);
    }

    return {
        currentStep,
        currentComponent : steps[currentStep],
        changeStep
    }
}