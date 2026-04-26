import { useCallback, useRef, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { flushSync } from "react-dom"
import { useTheme } from "@/hooks/useTheme.ts";

interface AnimatedThemeTogglerProps extends React.ComponentPropsWithoutRef<"button"> {
  duration?: number
}

export const AnimatedThemeToggler = ({
  duration = 400,
  ...props
}: AnimatedThemeTogglerProps) => {
  const [isDark, setIsDark] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const { themeMode , toggleTheme } = useTheme()

  const _toggleTheme = useCallback(async () => {
    if (!buttonRef.current) return

    await document.startViewTransition(() => {
      flushSync(() => {
        toggleTheme()
        setIsDark( themeMode==="dark")
        document.documentElement.classList.toggle("dark")
      })
    }).ready

    const { top, left, width, height } =
      buttonRef.current.getBoundingClientRect()
    const x = left + width / 2
    const y = top + height / 2
    const maxRadius = Math.hypot(
      Math.max(left, window.innerWidth - left),
      Math.max(top, window.innerHeight - top)
    )

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      }
    )
  }, [isDark, duration])

  const darkStyle = {
    color : "#000000",
    background : "#ffffff",
  }

  const lightStyle = {
    color : "#ffffff",
    background : "#000000",
  }

  return (
    <button
      ref={buttonRef}
      style={ themeMode === "dark" ? lightStyle :  darkStyle }
      onClick={_toggleTheme}
      {...props}
    >
      {isDark ? <Sun /> : <Moon />}
    </button>
  )
}
