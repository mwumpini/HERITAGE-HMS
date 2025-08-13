"use client"

import { useState, type ReactNode } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ChevronLeft, ChevronRight, Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface Step {
  id: string
  title: string
  description?: string
  content: ReactNode
  isValid?: boolean
}

interface MultiStepFormProps {
  steps: Step[]
  onComplete: () => void
  onCancel?: () => void
  className?: string
  title?: string
  description?: string
}

export function MultiStepForm({ steps, onComplete, onCancel, className, title, description }: MultiStepFormProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set())

  const progress = ((currentStep + 1) / steps.length) * 100
  const isLastStep = currentStep === steps.length - 1
  const isFirstStep = currentStep === 0
  const canProceed = steps[currentStep]?.isValid !== false

  const handleNext = () => {
    if (canProceed && !isLastStep) {
      setCompletedSteps((prev) => new Set([...prev, currentStep]))
      setCurrentStep((prev) => prev + 1)
    } else if (isLastStep && canProceed) {
      setCompletedSteps((prev) => new Set([...prev, currentStep]))
      onComplete()
    }
  }

  const handlePrevious = () => {
    if (!isFirstStep) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const handleStepClick = (stepIndex: number) => {
    // Allow navigation to completed steps or the next step
    if (completedSteps.has(stepIndex) || stepIndex <= currentStep + 1) {
      setCurrentStep(stepIndex)
    }
  }

  return (
    <Card className={cn("w-full max-w-4xl mx-auto", className)}>
      <CardHeader className="pb-4">
        {title && <CardTitle className="text-2xl">{title}</CardTitle>}
        {description && <CardDescription>{description}</CardDescription>}

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>
              Step {currentStep + 1} of {steps.length}
            </span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Step Navigation */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center space-x-2 overflow-x-auto">
            {steps.map((step, index) => (
              <button
                key={step.id}
                onClick={() => handleStepClick(index)}
                className={cn(
                  "flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap",
                  index === currentStep
                    ? "bg-primary text-primary-foreground"
                    : completedSteps.has(index)
                      ? "bg-green-100 text-green-700 hover:bg-green-200"
                      : index < currentStep
                        ? "bg-muted text-muted-foreground hover:bg-muted/80"
                        : "bg-muted/50 text-muted-foreground cursor-not-allowed",
                )}
                disabled={!completedSteps.has(index) && index > currentStep + 1}
              >
                {completedSteps.has(index) ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-current/20 text-xs">
                    {index + 1}
                  </span>
                )}
                <span className="hidden sm:inline">{step.title}</span>
              </button>
            ))}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Current Step Content */}
        <div className="min-h-[400px]">
          <div className="mb-4">
            <h3 className="text-lg font-semibold">{steps[currentStep]?.title}</h3>
            {steps[currentStep]?.description && (
              <p className="text-sm text-muted-foreground mt-1">{steps[currentStep].description}</p>
            )}
          </div>

          <div className="space-y-4">{steps[currentStep]?.content}</div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex space-x-2">
            {onCancel && (
              <Button variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            )}
            <Button variant="outline" onClick={handlePrevious} disabled={isFirstStep}>
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
          </div>

          <Button
            onClick={handleNext}
            disabled={!canProceed}
            className={isLastStep ? "bg-green-600 hover:bg-green-700" : ""}
          >
            {isLastStep ? (
              <>
                <Check className="h-4 w-4 mr-2" />
                Complete
              </>
            ) : (
              <>
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
