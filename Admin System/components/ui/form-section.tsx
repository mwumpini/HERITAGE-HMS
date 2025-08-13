import type { ReactNode } from "react"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

interface FormSectionProps {
  title: string
  description?: string
  children: ReactNode
  className?: string
  required?: boolean
  icon?: ReactNode
}

export function FormSection({ title, description, children, className, required = false, icon }: FormSectionProps) {
  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center space-x-2">
        {icon && <div className="text-muted-foreground">{icon}</div>}
        <div className="flex-1">
          <h3 className="text-lg font-semibold flex items-center">
            {title}
            {required && <span className="text-destructive ml-1">*</span>}
          </h3>
          {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
        </div>
      </div>
      <Separator />
      <div className="space-y-4">{children}</div>
    </div>
  )
}

interface FormFieldGroupProps {
  children: ReactNode
  columns?: 1 | 2 | 3 | 4
  className?: string
}

export function FormFieldGroup({ children, columns = 2, className }: FormFieldGroupProps) {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  }

  return <div className={cn("grid gap-4", gridCols[columns], className)}>{children}</div>
}
