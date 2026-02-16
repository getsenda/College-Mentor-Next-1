/**
 * Centralized application colors for careers module
 * Based on Accent Blue theme (#186BBF)
 */

export const appColors = {
  // Primary Accent Blue Colors
  ocean: {
    darkest: '#0D4A7A', // Deep Blue
    dark: '#125A9F',    // Dark Blue
    primary: '#186BBF', // Accent Blue (Primary)
    light: '#4A8FD4',   // Light Blue
    lightest: '#B8D4F0', // Very light blue
  },
  // Gold Accent
  gold: '#D4AF37',
  // Gradient Colors
  gradients: {
    primary: 'from-[#186BBF] to-[#125A9F]', // Accent Blue to Dark Blue
    hero: 'from-[#125A9F] to-[#0D4A7A]',    // Dark Blue to Deep Blue
    accent: 'from-[#B8D4F0] to-[#4A8FD4]',  // Very light blue to Light Blue
    light: 'from-[#B8D4F0] to-[#4A8FD4]',   // Very light blue to Light Blue
    dark: 'from-[#0D4A7A] to-[#125A9F]',    // Deep Blue to Dark Blue
  },
  // Background Colors
  backgrounds: {
    light: '#B8D4F0',           // Very light blue
    lightAlt: '#4A8FD4',        // Light Blue
    dark: '#0D4A7A',            // Deep Blue
    darkAlt: '#125A9F',         // Dark Blue
    card: 'rgba(74, 143, 212, 0.1)',  // Light Blue with opacity
    cardDark: 'rgba(24, 107, 191, 0.1)', // Accent Blue with opacity
  },
  // Text Colors
  text: {
    primary: '#0D4A7A',         // Deep Blue
    secondary: '#125A9F',       // Dark Blue
    light: '#186BBF',           // Accent Blue
    white: '#FFFFFF',
    gray: '#6B7280',
    dark: '#111827',
  },
  // Border Colors
  borders: {
    light: 'rgba(24, 107, 191, 0.2)',
    medium: 'rgba(24, 107, 191, 0.3)',
    dark: 'rgba(18, 90, 159, 0.5)',
  },
  // Badge Colors
  badges: {
    success: 'bg-[#B8D4F0] text-[#0D4A7A] border-[#186BBF]',
    info: 'bg-[#B8D4F0] text-[#0D4A7A] border-[#186BBF]',
    warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    urgent: 'bg-red-100 text-red-800 border-red-200',
    trending: 'bg-orange-100 text-orange-800 border-orange-200',
  },
  // Category Colors
  categories: {
    Technology: 'bg-[#B8D4F0] text-[#0D4A7A] border-[#186BBF]',
    Medical: 'bg-red-100 text-red-800 border-red-200',
    Engineering: 'bg-[#B8D4F0] text-[#0D4A7A] border-[#186BBF]',
    Management: 'bg-purple-100 text-purple-800 border-purple-200',
    Design: 'bg-pink-100 text-pink-800 border-pink-200',
    Law: 'bg-orange-100 text-orange-800 border-orange-200',
    Arts: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    Tourism: 'bg-teal-100 text-teal-800 border-teal-200',
  },
  // Additional Colors
  teal: {
    darkest: '#003B46',
    dark: '#07575B',
    medium: '#66A5AD',
    light: '#C4DFE6',
  },
  // Background Colors
  notebook: {
    bg: '#FEFEFE',
    line: '#B8D4F0',
  },
  // Accent Colors
  accent: {
    orange: '#FF6B35',
    orange500: '#F97316',
    orange600: '#EA580C',
    red: '#DC2626',
  },
  // Button Colors
  buttons: {
    primary: '#186BBF',
    primaryHover: '#125A9F',
    orange: '#FF6B35',
    orangeHover: '#EA580C',
  },
  // Green Variant Colors
  green: {
    accent: '#00C798',      // Accent Green
    secondary: '#E8F5E8',   // Secondary Green
    dark: '#00A67E',        // Dark Green (for hover states)
    light: '#B8E6D6',       // Light Green
    lightest: '#F0FDF4',    // Lightest Green
  },
  // Green Variant Gradients
  greenGradients: {
    primary: 'from-[#00C798] to-[#00A67E]',  // Accent Green to Dark Green
    light: 'from-[#E8F5E8] to-[#B8E6D6]',    // Secondary Green to Light Green
    accent: 'from-[#00C798] to-[#E8F5E8]',   // Accent Green to Secondary Green
  },
} as const;

export type AppColors = typeof appColors;

// Helper functions to generate Tailwind classes from appColors
export const getTailwindClasses = {
  bg: {
    oceanDarkest: `bg-[${appColors.ocean.darkest}]`,
    oceanDark: `bg-[${appColors.ocean.dark}]`,
    oceanPrimary: `bg-[${appColors.ocean.primary}]`,
    oceanLight: `bg-[${appColors.ocean.light}]`,
    oceanLightest: `bg-[${appColors.ocean.lightest}]`,
    tealDarkest: `bg-[${appColors.teal.darkest}]`,
    tealDark: `bg-[${appColors.teal.dark}]`,
    tealMedium: `bg-[${appColors.teal.medium}]`,
    tealLight: `bg-[${appColors.teal.light}]`,
    notebook: `bg-[${appColors.notebook.bg}]`,
    greenAccent: `bg-[${appColors.green.accent}]`,
    greenSecondary: `bg-[${appColors.green.secondary}]`,
    greenDark: `bg-[${appColors.green.dark}]`,
    greenLight: `bg-[${appColors.green.light}]`,
    greenLightest: `bg-[${appColors.green.lightest}]`,
  },
  text: {
    oceanDarkest: `text-[${appColors.ocean.darkest}]`,
    oceanDark: `text-[${appColors.ocean.dark}]`,
    oceanPrimary: `text-[${appColors.ocean.primary}]`,
    oceanLight: `text-[${appColors.ocean.light}]`,
    oceanLightest: `text-[${appColors.ocean.lightest}]`,
    tealDarkest: `text-[${appColors.teal.darkest}]`,
    tealDark: `text-[${appColors.teal.dark}]`,
    tealMedium: `text-[${appColors.teal.medium}]`,
    tealLight: `text-[${appColors.teal.light}]`,
    greenAccent: `text-[${appColors.green.accent}]`,
    greenSecondary: `text-[${appColors.green.secondary}]`,
    greenDark: `text-[${appColors.green.dark}]`,
  },
  border: {
    oceanDarkest: `border-[${appColors.ocean.darkest}]`,
    oceanDark: `border-[${appColors.ocean.dark}]`,
    oceanPrimary: `border-[${appColors.ocean.primary}]`,
    oceanLight: `border-[${appColors.ocean.light}]`,
    oceanLightest: `border-[${appColors.ocean.lightest}]`,
    tealLight: `border-[${appColors.teal.light}]`,
    greenAccent: `border-[${appColors.green.accent}]`,
    greenSecondary: `border-[${appColors.green.secondary}]`,
    greenDark: `border-[${appColors.green.dark}]`,
  },
  gradient: {
    primary: `from-[${appColors.ocean.primary}] to-[${appColors.ocean.dark}]`,
    greenPrimary: `from-[${appColors.green.accent}] to-[${appColors.green.dark}]`,
    greenLight: `from-[${appColors.green.secondary}] to-[${appColors.green.light}]`,
    greenAccent: `from-[${appColors.green.accent}] to-[${appColors.green.secondary}]`,
  },
};

