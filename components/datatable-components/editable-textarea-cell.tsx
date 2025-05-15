"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateActionPlanEntry } from "@/lib/api/action-plans"

interface EditableTextareaProps {
  value: string
  rowId: number
  field: string
  className?: string
  rows?: number
}

const EditableTextarea: React.FC<EditableTextareaProps> = ({ value, rowId, field, className, rows = 1 }) => {
  const queryClient = useQueryClient()
  const [currentValue, setCurrentValue] = useState(value)
  const [isFocused, setIsFocused] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // This effect ensures the component's state stays in sync with props
  useEffect(() => {
    // Only update if not currently being edited to prevent overriding user input
    if (!isFocused) {
      setCurrentValue(value)
    }
  }, [value, isFocused])

  const updateEntryMutation = useMutation({
    mutationFn: ({ id, ...data }: { id: number; [key: string]: any }) => updateActionPlanEntry(id, data),
    onMutate: async ({ id, ...newData }) => {
      await queryClient.cancelQueries({ queryKey: ["action-plan-entries"] })

      const previousEntries = queryClient.getQueryData<any>(["action-plan-entries"])

      // Create a deep copy of the previous entries to avoid reference issues
      const previousEntriesCopy = previousEntries ? JSON.parse(JSON.stringify(previousEntries)) : null

      queryClient.setQueryData(["action-plan-entries"], (old: any) => {
        if (!old) return old
        return old.map((entry: any) => (entry.id === id ? { ...entry, ...newData } : entry))
      })

      return { previousEntries: previousEntriesCopy }
    },
    onError: (_err, _variables, context) => {
      if (context?.previousEntries) {
        queryClient.setQueryData(["action-plan-entries"], context.previousEntries)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["action-plan-entries"] })
    },
  })

  // Auto-resize textarea height
  useEffect(() => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = "auto"
      textarea.style.height = textarea.scrollHeight + "px"
    }
  }, [currentValue])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentValue(e.target.value)
  }

  const handleBlur = () => {
    setIsFocused(false)
    if (currentValue !== value) {
      updateEntryMutation.mutate({ id: rowId, [field]: currentValue })
    }
  }

  const handleFocus = () => {
    setIsFocused(true)
  }

  return (
    <textarea
      ref={textareaRef}
      className={className}
      value={currentValue} // Use controlled component pattern instead of defaultValue
      rows={rows}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={(e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault()
          textareaRef.current?.blur()
        }
      }}
      onInput={(e) => {
        const target = e.target as HTMLTextAreaElement
        target.style.height = "auto"
        target.style.height = target.scrollHeight + "px"
      }}
    />
  )
}

export default EditableTextarea
