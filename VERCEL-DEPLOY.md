Vercel deployment & Gmail SMTP setup

Overview
- This project includes an API at `/api/contact` that sends email via Gmail SMTP using Nodemailer.
- Before deployment you must configure Vercel environment variables (GMAIL_USER, GMAIL_PASS, etc.).

1) Create a Gmail App Password
- Enable 2-Step Verification for your Google account.
- Visit: Google Account → Security → App passwords.
- Create a new app password (name it e.g. `Vercel Contact`) and copy the 16-character password.

- NOTE: The API currently defaults the recipient to `piyushverma198601986@gmail.com`. You can override this by setting the `GMAIL_TO` environment variable in Vercel.

2) Add environment variables (recommended via Vercel Dashboard)
- Go to Vercel Dashboard → Your Project → Settings → Environment Variables → Add.
- Add the following values (set `Environment` to `Production`):
  - `GMAIL_USER` = your.email@gmail.com
  - `GMAIL_PASS` = the 16-character App Password
  - `GMAIL_TO` = (optional) recipient email; defaults to `piyushverma198601986@gmail.com` if not set
  - `GMAIL_FROM_NAME` = (optional) e.g. "Portfolio Contact"

3) (Optional) Add env vars with Vercel CLI
- Install CLI if needed: `npm i -g vercel`
- Login: `vercel login`
- Add vars (this will prompt you to paste each value):
  ```powershell
  vercel env add GMAIL_USER production
  vercel env add GMAIL_PASS production
  vercel env add GMAIL_TO production
  vercel env add GMAIL_FROM_NAME production
  ```

4) Deploy
- Using VS Code Vercel extension: open the Command Palette → "Vercel: Deploy" (or follow extension UI).
- Or use CLI: `vercel --prod` (the first `vercel` run will guide you to link the project).

5) Test
- After deployment visit `https://<your-deployment>/contact.html` and submit the form.
- If successful the site will show the success state and an email will be delivered to `GMAIL_TO`.

6) Troubleshooting
- Missing env vars: API will return 500 with a message about SMTP credentials.
- Authentication errors: confirm you used an App Password and that `GMAIL_USER` matches the account.
- Check Vercel Function logs: Vercel Dashboard → Functions → select the function → view logs.

7) Alternatives / Next steps
- For higher reliability and volume, use SendGrid/Postmark/Sendinblue (I can convert the function).
- For spam protection, add reCAPTCHA and server-side validation.

If you want, I can now guide you through setting the Vercel env vars interactively, or provide the exact commands to run in your terminal — tell me whether you prefer Dashboard (web UI) or CLI and whether you want me to proceed to deploy now.