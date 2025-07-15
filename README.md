# EV-SOAR System

This is a secure EV charging platform, built with Next.js, React, and Supabase.

## Features

-   **User Authentication**: Secure sign-up, login, and password recovery using Supabase Auth.
-   **Admin Panel**: Dedicated dashboard for administrators to manage users and system health.
-   **Dashboard**: User-specific dashboard to view charging sessions and vehicle information.
-   **Threat Monitoring**: Displays real-time and historical threat incidents.
-   **Analytics**: Visualizations of charging data and system performance.
-   **Responsive Design**: Optimized for various screen sizes using Tailwind CSS and Shadcn UI.

## Getting Started

### 1. Clone the repository

\`\`\`bash
git clone <repository-url>
cd ev-soar-system
\`\`\`

### 2. Install dependencies

\`\`\`bash
npm install
# or
yarn install
\`\`\`

### 3. Set up Supabase

1.  **Create a new Supabase project**: Go to [Supabase](https://supabase.com/) and create a new project.
2.  **Get your API keys**:
    *   Navigate to `Project Settings` > `API`.
    *   Copy your `Project URL` and `anon public` key.
    *   Copy your `service_role` key (secret).
3.  **Configure Environment Variables**: Create a `.env.local` file in the root of your project and add the following:

    \`\`\`
    NEXT_PUBLIC_SUPABASE_URL="YOUR_SUPABASE_PROJECT_URL"
    NEXT_PUBLIC_SUPABASE_ANON_KEY="YOUR_SUPABASE_ANON_KEY"
    SUPABASE_SERVICE_ROLE_KEY="YOUR_SUPABASE_SERVICE_ROLE_KEY"
    \`\`\`
    **Note**: The `SUPABASE_SERVICE_ROLE_KEY` is a powerful key and should only be used on the server-side.

4.  **Enable Email Authentication**: In your Supabase project, go to `Authentication` > `Settings` and ensure `Email Sign-in` is enabled.
5.  **Configure Email Templates (Optional but Recommended)**:
    *   In Supabase, navigate to `Authentication` > `Email Templates`.
    *   Set the `Site URL` to your application's URL (e.g., `http://localhost:3000` for local development, or your Vercel deployment URL).
    *   For the `Password Reset` template, ensure the `Confirmation URL` is set to `${SITE_URL}/reset-password`.
    *   For `Email Confirm`, ensure the `Confirmation URL` is set to `${SITE_URL}/auth/confirm`.

### 4. Run the development server

\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 5. Register Admin Account

To use the admin panel, you need to register the designated admin email:
1.  Navigate to `http://localhost:3000/register`.
2.  Sign up with the email `harshaltapre27@yahoo.com` and a password of your choice.
3.  **Crucially, check your email inbox (including spam/junk folders) for a confirmation email from Supabase and click the verification link.** This step is essential for the account to be active.
4.  Once confirmed, you can log in as an admin from `http://localhost:3000/login` by selecting the "Admin" radio button.

## Project Structure

-   `app/`: Next.js App Router pages and API routes.
    -   `(app)/`: Protected routes for authenticated users (dashboard, settings, etc.).
    -   `api/auth/`: Authentication API routes (login, register, forgot/reset password).
    -   `login/`, `register/`, `forgot-password/`, `reset-password/`: Public authentication pages.
-   `components/`: Reusable React components, including Shadcn UI components.
-   `lib/supabase/`: Supabase client setup for server and client components.
-   `public/`: Static assets.
-   `styles/`: Global CSS.

## Learn More

To learn more about Next.js, take a look at the following resources:

-   [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
-   [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
