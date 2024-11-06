import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Computer, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

// TODO: Add an indicator showing what theme your currently on.
export default function ModeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          {theme === "light" ? <Sun /> : <Moon />}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
          <DropdownMenuRadioItem
            value="light"
            className="flex items-center gap-2"
          >
            <Sun size={14} />
            Light
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            value="dark"
            className="flex items-center gap-2"
          >
            <Moon size={14} />
            Dark
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            value="system"
            className="flex items-center gap-2"
          >
            <Computer size={14} />
            System
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
