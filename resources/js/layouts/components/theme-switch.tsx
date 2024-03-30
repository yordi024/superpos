import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "./theme-provider";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function ThemeSwitch() {
  const { theme, setTheme } = useTheme();

  /* Update theme-color meta tag
   * when theme is updated */
  useEffect(() => {
    const themeColor = theme === "dark" ? "#020817" : "#fff";
    const metaThemeColor = document.querySelector("meta[name='theme-color']");
    metaThemeColor && metaThemeColor.setAttribute("content", themeColor);
  }, [theme]);

  return (
    <Button
      size="icon"
      variant="ghost"
      className="h-9 w-9 rounded-full"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {theme === "light" ? <MoonIcon size={20} /> : <SunIcon size={20} />}
    </Button>
  );
}
