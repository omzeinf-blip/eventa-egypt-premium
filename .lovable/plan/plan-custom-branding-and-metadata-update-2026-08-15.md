# Plan: Custom Branding and Metadata Update

Remove all Lovable branding and update the website with a new custom "E" logo, favicon, and metadata.

## Branding Changes
- Generate a custom "E" favicon (32x32) and logo (512x512) image with a white "E" on a dark background with the primary purple accent.
- Replace the `Ticket` icon in the Navbar and Footer with the new "E" logo.
- Update the website metadata (Open Graph and Twitter) to use the new logo image.

## Technical Details
- **Assets**: Create `public/favicon.ico` and `public/logo.png`.
- **Root Route**: Update `src/routes/__root.tsx` head metadata:
    - Add `og:image` and `twitter:image` pointing to the new logo.
    - Ensure title and description are consistent.
- **Components**:
    - `src/components/Navbar.tsx`: Replace `Ticket` icon with a stylized "E" text or local image.
    - `src/components/Footer.tsx`: Replace `Ticket` icon with the same "E" branding.
- **Privacy**: Remove the `lovable-error-reporting.ts` call from `__root.tsx` if appropriate, though it's technically a developer tool. The user asked to remove "all visible Lovable branding", which usually implies UI and metadata. I will remove the import and calls to `reportLovableError` to be thorough.

## Visual Requirements
- Modern, bold, geometric "E".
- White "E" on a dark background.
- Primary accent color (purple) included in the logo design.
