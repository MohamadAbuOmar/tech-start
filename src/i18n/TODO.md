# Components Requiring Translation

## Contact Pages
- [x] /app/(Front)/Contact-us/page.tsx
  - "Get in Touch" heading
  - Help text message
  - Address and contact info

- [x] /components/Contact-us/contact-form.tsx
  - Form labels (Name, Email, Subject, Message)
  - Placeholders
  - Submit button text
  - Success/error messages

## About Pages
- [x] /components/who-we-are/about-hero.tsx
  - "About Us" label
  - "GET TO KNOW US" heading
  - "Who We Are" heading
  - Project description
  - Innovation/Customer/Global sections

- [x] /components/who-we-are/who-we-are.tsx
  - Project Scale & Scope section
  - Focus Areas section
  - Development Goals section

## Partners
- [x] /components/shared/Clients/PartnersPage.tsx
  - "Our Trusted Partners" heading
  - Partner descriptions
  - Partner labels

## Complaints & FAQs
- [x] /components/submit-complaint/guidelines.tsx
  - "Guidelines for Submitting a Complaint" heading
  - All guidelines text
  - Contact information
  - Important notes

- [x] /components/faq-section/faq-section.tsx
  - "Let's answer some questions" text
  - "FAQs" heading
  - Note: Already has bilingual support for questions/answers

## Translation Strategy
1. Use LanguageContext for dynamic text switching
2. Create language-specific content objects
3. Ensure RTL support for Arabic text
4. Update server actions to return language-specific data
5. Add language toggle in navbar

## Notes
- All changes should only affect frontend routes under (front)
- Admin section should remain unchanged
- Avoid duplicating files
- Test all changes thoroughly
