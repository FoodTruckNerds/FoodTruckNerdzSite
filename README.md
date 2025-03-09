# FoodTruckNerdz Website

This is the official homepage for the FoodTruckNerdz App's website implementation.

FoodTruckNerdz is a service to track food trucks and provide bookmarking to customers of those food trucks. Our companion App for Android and iOS allows food trucks to report their location with a Check-In and a background service that monitors their location during service hours.

# How to run locally

## How to set up Tailwind.css

Tailwind is available through 2 main ways: inclusion in the <head> tag via a CDN link or via download to the folder locally.

### Option A: borrow Tailwind from public CDNs

Simply include this in the <head> tag of the HTML file: `<script src="https://cdn.tailwindcss.com"></script>`

Importing from CDN is good for testing and drafting. Final production should use downloaded Tailwind.

### Option B: download and setup Tailwind locally

> Installing Tailwind locally is better for final production.

Use these instructions (reproduced below): https://tailwindcss.com/docs/installation/tailwind-cli

1. Install Node.js
2. Reboot VSCode if opened
3. Open a terminal in the root directory
4. Install via one of the methods below

#### CLI (for use with raw HTML, CSS, JS)

1. Run `npm install tailwindcss @tailwindcss/cli`
2. Copy `@import "tailwindcss";` to the top of your style.css file to be able to use Tailwind directly in your CSS styles,
   then you can build your own complex classes or components using Tailwind, and mix and match with regular CSS.
3. Build the Tailwind CSS file using the CLI interface:
   `npx @tailwind/cli -i ./styles.css -o ./tailwind/styles.css`
   IMPORTANT: This file has to be rebuilt every time you change your 'styles.css'. You can use the --watch flag to make the command keep
   listening for changes. It will stay running in the terminal:
   `npx @tailwind/cli -i ./styles.css -o ./tailwind/styles.css --watch`
4. Start using Tailwind in your HTML: https://tailwindcss.com/docs/styling-with-utility-classes

#### Vite (for frameworks like Laravel, SvelteKit, React Router, Nuxt, SolidJS, etc)

See [instructions](https://tailwindcss.com/docs/installation/tailwind-cli).

#### PostCSS (for frameworks like Next.js and Angular)

See [instructions](https://tailwindcss.com/docs/installation/tailwind-cli).