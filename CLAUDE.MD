# Casa de Dios Website - Development Guide

This document provides context and guidelines for AI assistants (like Claude) working on the Iglesia Pentecostal Casa de Dios website.

## Project Overview

A modern church website built with Next.js and Sanity CMS to serve the members and visitors of Iglesia Pentecostal Casa de Dios. The site provides information about the church, its ministries, events, and enables online giving and prayer requests.

**Project Owner:** Jonathan Contreras (jonathansaulcontreras@gmail.com)

## Tech Stack

- **Framework:** Next.js 16.1+ (App Router with React 19)
- **Language:** TypeScript 5.8+
- **Styling:** Tailwind CSS 4.0+
- **CMS:** Sanity 5.5+ (Standalone Studio)
- **UI Components:** Lucide React (icons)
- **Date Handling:** date-fns 4.1+
- **Environment Variables:** @t3-oss/env-nextjs with Zod validation

## Project Structure

```
casa-de-dios-website/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── _components/        # Shared components (Header, Footer)
│   │   ├── about/              # About Us page
│   │   ├── contact/            # Contact page
│   │   ├── events/             # Events listing page
│   │   ├── give/               # Online giving page
│   │   ├── ministries/         # Ministries page
│   │   ├── prayer-request/     # Prayer request submission
│   │   └── studio/[[...tool]]/ # Embedded Sanity Studio (deprecated)
│   └── lib/
│       └── sanity/             # Sanity client and queries
│           ├── client.ts       # Sanity client configuration
│           ├── queries.ts      # GROQ queries
│           └── types.ts        # TypeScript types
├── sanity/                     # Standalone Sanity Studio
│   ├── schemaTypes/            # Content schemas
│   │   ├── announcement.ts     # Announcements
│   │   ├── event.ts            # Events
│   │   ├── leadership.ts       # Church leadership
│   │   ├── ministry.ts         # Ministries
│   │   └── prayerRequest.ts    # Prayer requests
│   ├── sanity.config.ts        # Studio configuration
│   └── deskStructure.ts        # Custom desk structure
├── public/                     # Static assets
└── package.json                # Root dependencies
```

## Sanity Configuration

**Project ID:** `qisvzbm2`
**Dataset:** `production`

### Content Types

1. **announcement** - Church-wide announcements with title, content, and display dates
2. **event** - Events with title, date, time, location, description, and images
3. **leadership** - Church leadership profiles with name, title, bio, and photo
4. **ministry** - Ministry information with name, description, and contact details
5. **prayerRequest** - Prayer submissions (not publicly displayed)

### Studio Deployment

The Sanity Studio is configured as a **standalone deployment** (not embedded in Next.js):
- Configuration: `sanity/sanity.config.ts`
- Deploy command: `npx sanity deploy` (run from `/sanity` directory)
- No basePath configured (previously used `/studio` when embedded)

## Development Commands

```bash
# Development
npm run dev              # Start Next.js dev server (Turbo mode)
npm run typecheck        # Run TypeScript compiler check
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint issues
npm run format:check     # Check Prettier formatting
npm run format:write     # Apply Prettier formatting

# Production
npm run build            # Build for production
npm run preview          # Build and start preview server
npm start                # Start production server

# Quality Checks
npm run check            # Run both lint and typecheck

# Sanity
npm run sanity:manage    # Open Sanity management dashboard
cd sanity && npx sanity deploy  # Deploy standalone studio
```

## Key Development Guidelines

### 1. Type Safety
- All components and functions must use TypeScript
- Run `npm run typecheck` before committing
- Types for Sanity documents are in `src/lib/sanity/types.ts`
- Use proper type annotations, avoid `any`

### 2. Code Quality
- Run `npm run check` before commits (runs lint + typecheck)
- Use Prettier for consistent formatting
- Follow ESLint rules (Next.js config)
- Keep components small and focused

### 3. Sanity Integration
- All queries are centralized in `src/lib/sanity/queries.ts`
- Use the Sanity client from `src/lib/sanity/client.ts`
- Never hardcode content - fetch from Sanity
- Images use `@sanity/image-url` for optimization
- Use GROQ query syntax (not raw API calls)

### 4. Component Patterns
- Server Components by default (App Router)
- Use 'use client' only when needed (interactivity, hooks)
- Shared components go in `src/app/_components/`
- Page-specific components can go in `src/app/[page]/_components/`

### 5. Styling
- Tailwind CSS 4.0+ utility classes
- Mobile-first responsive design
- Use Tailwind's design tokens (colors, spacing, etc.)
- Avoid inline styles

### 6. Environment Variables
- Managed with `@t3-oss/env-nextjs` and Zod
- Variables defined in `src/env.js` (if present)
- Sanity credentials should be in `.env.local`

### 7. Git Workflow
- Main branch: `main`
- Check git status before making changes
- Write clear, descriptive commit messages
- Test builds before pushing (`npm run build`)

## Recent Changes

Based on recent commits:
- ✅ Isolated Sanity Studio from site layout
- ✅ Fixed TypeScript build errors in announcement schema
- ✅ Removed prayer request display from public pages
- ✅ Added standalone Sanity Studio deployment support
- ✅ Updated events page to show only upcoming events
- ✅ Created LayoutWrapper to conditionally render Header/Footer

## Common Tasks

### Adding a New Page
1. Create `src/app/[page-name]/page.tsx`
2. Add route to Header navigation if needed
3. Create any required Sanity queries in `src/lib/sanity/queries.ts`
4. Test responsive design at multiple breakpoints

### Adding a New Sanity Schema
1. Create schema file in `sanity/schemaTypes/[name].ts`
2. Export from `sanity/schemaTypes/index.ts`
3. Add TypeScript type to `src/lib/sanity/types.ts`
4. Create queries in `src/lib/sanity/queries.ts`
5. Deploy schema: `cd sanity && npx sanity deploy`

### Updating Existing Content Type
1. Modify schema in `sanity/schemaTypes/[name].ts`
2. Update TypeScript type in `src/lib/sanity/types.ts`
3. Update queries if field names changed
4. Deploy schema changes
5. Test in Studio and on frontend

### Styling Updates
1. Use Tailwind utility classes
2. Reference existing components for patterns
3. Test mobile, tablet, and desktop views
4. Run `npm run format:write` to format changes

## Debugging Tips

- Check browser console for runtime errors
- Use TypeScript errors as guides (`npm run typecheck`)
- Verify Sanity queries in Vision tool (Studio)
- Check network tab for failed API requests
- Use React DevTools for component debugging

## Important Considerations

### Layout Rendering
- The LayoutWrapper component conditionally renders Header/Footer
- Studio routes do NOT show the main site layout
- Check route path when adding new pages

### Prayer Requests
- Prayer request submissions are stored in Sanity
- They are NOT displayed publicly on the site
- Only church staff can view them in the Studio

### Image Optimization
- Use Sanity's image pipeline for all CMS images
- Import from `@sanity/image-url` (not `@sanity/image-url/lib/types/types`)
- Configure image dimensions and quality appropriately

### Events Display
- Events page shows only upcoming events
- Past events are filtered out
- Event dates use date-fns for formatting

## Testing Checklist

Before marking work complete:
- [ ] TypeScript compiles (`npm run typecheck`)
- [ ] ESLint passes (`npm run lint`)
- [ ] Code is formatted (`npm run format:check`)
- [ ] Production build succeeds (`npm run build`)
- [ ] Test on mobile viewport
- [ ] Test navigation between pages
- [ ] Verify Sanity content displays correctly
- [ ] Check browser console for errors

## Package Management

**Package Manager:** npm 11.4.2 (specified in package.json)
- Always use `npm` commands (not yarn or pnpm)
- Run `npm install` after pulling changes
- Lock file: `package-lock.json`

## Additional Notes

- This is a bilingual church (Spanish/English) - consider i18n in future
- Online giving integrates with external service
- Contact form submissions may integrate with email service
- Studio is separately deployable from the main website
