import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  console.log('asd',twMerge(clsx(inputs)))
  return twMerge(clsx(inputs))
}
