# Changelog
<!--
  Purpose:
  - Track project change history over time.
  - Record date, summary, and key files touched for each change set.
  - Keep entries append-only (do not delete past entries).
-->

## 2024-06-09
- Rebranded template from Panda SaaS starter to CoreCRM.
- Updated all visible landing page surfaces and components for CoreCRM (brand, copy, CTA).
- Updated call-to-action throughout to "Get Started", "View Demo", and CRM-specific actions.
- Revised hero, features, benefits, testimonials, pricing, contact, team info, and footer sections to reflect an internal CRM positioning and owner info (Chirag Dodiya, hi@chirag.co).
- Navigation layout and meta details refreshed for CRM context.
- Updated footer social and contact links.
- Updated defaultHomeContent, all landing sections, and UI for CoreCRM story.

**Files updated**:  
- app/page.tsx  
- content/home.ts  
- components/layout/navbar.tsx  
- components/home/LayoutFooterSection.tsx  
- CHANGELOG.md  

## 2024-06-09
- Added tenant-scoped contacts table in Drizzle schema for CRM Contacts feature.
- Updated migration journal for contacts table.
- Added Contacts navigation entry in dashboard sidebar (AddressBook icon).
- Contacts CRUD routes and dashboard scaffolding planned.

**Files updated**:
- lib/db/schema.ts
- drizzle/meta/_journal.json
- components/dashboard/sidebar-nav.tsx

## 2024-06-09
- Fixed bug: AddressBook icon import for Contacts sidebar nav did not exist in lucide-react. Replaced with valid Contact icon.
  
**Files updated**:
- components/dashboard/sidebar-nav.tsx