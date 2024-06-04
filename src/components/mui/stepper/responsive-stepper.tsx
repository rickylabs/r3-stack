"use client";

import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import Typography from '@mui/material/Typography';
import MobileStepper from '@mui/material/MobileStepper';
import useMediaQuery from '@mui/material/useMediaQuery';
import {Stack, StepButton, useTheme} from '@mui/material';
import LoadingButton from "@mui/lab/LoadingButton";

export type StepContentProps = {
    id: string | number
    title: string;
    content: string | React.ReactNode;
    nextDisabled?: boolean
    loadingNext?: boolean
    hideNext?: boolean
    setWarningMessage?: (message: string) => void
    setErrorMessage?: (message: string) => void
};

interface MobileBarProps {
    position?: "relative" | "absolute"
    left?: number
    right?: number
    bottom?: number
}

interface StepperProps {
    paddingBottom?: number
}

type ResponsiveStepperProps = {
    steps: StepContentProps[];
    onComplete: () => void
    finishDisabled?: boolean
    loadingFinish?: boolean
    stepperProps?: StepperProps
    mobileBarProps?: MobileBarProps
};

enum StepperButtonText {
    BACK = "Précédent",
    NEXT = "Suivant",
    FINISH = "Commander"
}

type StepperButtonProps = {
    activeStep: number
    steps: StepContentProps[]
    handleBack: () => void
    handleNext: () => void
    handleFinish: () => void
    finishDisabled?: boolean
    children: React.ReactNode
}

const StepperButton = ({
   activeStep,
   steps,
   //handleBack,
   handleNext,
   handleFinish,
   finishDisabled,
   children
}: StepperButtonProps) => {

    return (
        <LoadingButton
            loading={steps[activeStep]?.loadingNext ?? false}
            disabled={activeStep === steps.length - 1 ? finishDisabled ?? false : steps[activeStep]?.nextDisabled ?? false}
            onClick={activeStep === steps.length - 1 ? handleFinish : handleNext}
            variant="contained"
            sx={{ml: {xs:"unset", md:"auto"}, display: steps[activeStep]?.hideNext ? "none" : "block"}}
            size="large"
        >
            {children}
        </LoadingButton>
    )
}

const ResponsiveStepper: React.FC<ResponsiveStepperProps> = ({steps, onComplete, mobileBarProps, stepperProps, finishDisabled}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        if (activeStep === steps.length - 1 ) {
            return
        }

        if(activeStep === steps.length - 1 ? finishDisabled ?? false : steps[activeStep]?.nextDisabled ?? false){
            return
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStep = (step: number) => () => {
        if(step > activeStep){
            if (activeStep === steps.length - 1 ) {
                return
            }

            if(activeStep === steps.length - 1 ? finishDisabled ?? false : steps[activeStep]?.nextDisabled ?? false){
                return
            }
        }

        setActiveStep(step);
    };
/*
    const handleReset = () => {
        setActiveStep(0);
    };
*/

    const handleFinish = () => {
        onComplete()
    };

    if (isMobile) {
        return (
            <Stack height="100%" width="100%">
                <Typography>{`${activeStep + 1}. ${steps[activeStep]?.title ?? ""}`}</Typography>
                <Box sx={{minHeight: 255, width: '100%', p: 0, pb: stepperProps?.paddingBottom ?? 20, pt: 4}}>
                    {steps.map((step, index) => (
                        <Box key={index} sx={{display: activeStep === index ? 'block' : 'none'}}>
                            {step.content}
                        </Box>
                    ))}
                </Box>
                <MobileStepper
                    variant="text"
                    steps={steps.length}
                    position="bottom"
                    activeStep={activeStep}
                    sx={{
                        position: mobileBarProps?.position ?? "fixed",
                        bottom: mobileBarProps?.bottom ?? 35,
                        left: mobileBarProps?.left ?? 10,
                        right: mobileBarProps?.right ?? 20,
                        background: "var(--mui-palette-card-main)",
                        backdropFilter: "blur(4px)",
                        borderRadius: 8,
                        px:1
                    }}
                    nextButton={
                        <StepperButton
                            activeStep={activeStep}
                            steps={steps}
                            handleBack={handleBack}
                            handleNext={handleNext}
                            handleFinish={handleFinish}
                            finishDisabled={finishDisabled}
                        >
                            {activeStep === steps.length - 1 ? StepperButtonText.FINISH : StepperButtonText.NEXT}
                        </StepperButton>
                    }
                    backButton={
                        <LoadingButton size="small" onClick={handleBack} disabled={activeStep === 0}>
                            {StepperButtonText.BACK}
                        </LoadingButton>
                    }
                />
            </Stack>
        );
    }

    return (
        <Stack>
            <Stepper activeStep={activeStep}>
                {steps.map((step, index) => (
                    <Step key={step.title}>
                        <StepButton color="inherit" onClick={handleStep(index)}>
                            {step.title}
                        </StepButton>
                    </Step>
                ))}
            </Stepper>
            <Box py={4} height="100%">
                {steps.map((step, index) => (
                    <Box key={index} sx={{display: activeStep === index ? 'block' : 'none'}}>
                        {step.content}
                    </Box>
                ))}
            </Box>
            <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                sx={{
                    position: 'absolute',
                    bottom: 0,
                    p: 2,
                    left: 0,
                    right: 0,
                    background: "var(--mui-palette-card-main)",
                    backdropFilter: "blur(4px)"
                }}
            >
                <LoadingButton
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{mr: 1}}
                >
                    {StepperButtonText.BACK}
                </LoadingButton>
                <Box sx={{flex: '1 1 auto'}} flexGrow={1}/>
                <StepperButton
                    activeStep={activeStep}
                    steps={steps}
                    handleBack={handleBack}
                    handleNext={handleNext}
                    handleFinish={handleFinish}
                    finishDisabled={finishDisabled}
                >
                    {activeStep === steps.length - 1 ? StepperButtonText.FINISH : StepperButtonText.NEXT}
                </StepperButton>
            </Stack>
        </Stack>
    );
};

export default ResponsiveStepper;
