# S Wave Seasonal Alert Bar — App Plan

## Goal
Help merchants launch seasonal announcements fast (holiday promos, shipping cutoffs, new arrivals) with theme-ready alert bars and simple scheduling.

## MVP (Phase 1)
- Create alert bars with title, optional message, and optional CTA button.
- Placement options: top banner, bottom banner, or inline announcement block.
- Targeting: sitewide, product pages, or collection pages.
- Scheduling: start/end date + timezone-aware display.
- Theme editor app block with basic styling controls.
- Basic analytics: views, clicks, conversions (via add-to-cart click proxy).

## Configuration
- Content: headline, body text, CTA label + URL.
- Style controls: background, text color, CTA color, font size, padding.
- Behavior: sticky vs static, dismissible toggle, hide after dismiss (cookie).

## Data Model (MVP)
- AlertBar: id, name, status, scope (sitewide/product/collection), schedule, style, cta, createdAt.
- AlertEvent: alertId, eventType (view/click/dismiss), timestamp.

## Technical Notes
- Embedded admin UI with Polaris.
- Frontend injection via App Block + script tag for storefront rendering.
- Store config in Prisma (SQLite for dev; Postgres later).

## Next Steps
1. Define admin settings UI screens + form flow.
2. Build App Block UI skeleton + storefront rendering stub.
3. Wire basic analytics events.
