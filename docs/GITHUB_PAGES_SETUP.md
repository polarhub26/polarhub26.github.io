# Free GitHub Pages setup

> **[GUIDE: GITHUB-PAGES]** GitHub hosts the compiled site for free. The included
> workflow performs the build, so you upload source code rather than the `dist` folder.

## Choose the address

- Root address with no repository path: create a repository named exactly
  `YOUR-GITHUB-USERNAME.github.io`.
- Normal project address: use any repository name; the URL will include
  `/repository-name/`.

The project uses relative asset paths, so either option works.

## Upload using the GitHub website

1. Create a new public GitHub repository. Do not add another README or `.gitignore`.
2. Unzip this package on your computer.
3. On the repository page select **Add file → Upload files**.
4. Upload the contents of the folder, including `.github`.
5. Commit the files to the `main` branch.
6. Open **Settings → Pages**.
7. Under **Build and deployment**, set Source to **GitHub Actions**.
8. Open the **Actions** tab and wait for `Deploy Polar Hub to GitHub Pages` to finish.
9. Return to **Settings → Pages** for the public URL.

## Upload using Git

```bash
git init
git add .
git commit -m "Create Polar Hub website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```

Then choose **GitHub Actions** under the repository's Pages settings.

## Update the website code

Edit locally, run `npm run check` and `npm run build`, then commit and push.
GitHub will publish automatically. Sheet-only content updates do not require a push.

## Common problems

- Blank page: confirm `.github/workflows/deploy.yml` was uploaded and the Action passed.
- Sheet content missing: check `public/runtime-config.js` contains the `/exec` URL.
- Old Apps Script behavior: deploy a **New version** under Manage deployments.
- Missing images: use public HTTPS image links or add approved assets to `public/assets`.
- Custom domain: optional, not required, and domain registration normally costs money.
