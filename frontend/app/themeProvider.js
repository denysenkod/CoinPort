// Import the ThemeProvider component from next-themes for handling theme switching.
import { ThemeProvider } from 'next-themes';

// Define and export a functional component named Providers_theme.
// It receives props for 'attribute' and 'children' to configure the theme and render child components respectively.
export default function Providers_theme ({ attribute, children }) {
  return (
    // The ThemeProvider wraps child components to provide them with theme context.
    // defaultTheme="system" uses the system's theme preference (light or dark) as the default.
    // enableSystem={true} allows the theme to automatically switch based on the system's theme.
    // The 'attribute' prop is used to determine how themes are applied (e.g., class name on the body element).
    <ThemeProvider defaultTheme="system" enableSystem={true} attribute={attribute}>
      {children} {/* Renders child components within the theme context. */}
    </ThemeProvider>
  )
}
