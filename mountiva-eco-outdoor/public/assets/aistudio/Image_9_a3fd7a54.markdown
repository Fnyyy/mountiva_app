---
name: Eco-Alpine Vibrant
colors:
  surface: '#f9f9ff'
  surface-dim: '#d4daea'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f1f3ff'
  surface-container: '#e8eeff'
  surface-container-high: '#e3e8f9'
  surface-container-highest: '#dde2f3'
  on-surface: '#161c27'
  on-surface-variant: '#414844'
  inverse-surface: '#2a303d'
  inverse-on-surface: '#ecf0ff'
  outline: '#717973'
  outline-variant: '#c1c8c2'
  surface-tint: '#3f6653'
  primary: '#012d1d'
  on-primary: '#ffffff'
  primary-container: '#1b4332'
  on-primary-container: '#86af99'
  inverse-primary: '#a5d0b9'
  secondary: '#116c4a'
  on-secondary: '#ffffff'
  secondary-container: '#a1f4c8'
  on-secondary-container: '#1b724f'
  tertiary: '#382100'
  on-tertiary: '#ffffff'
  tertiary-container: '#553500'
  on-tertiary-container: '#dd9832'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#c1ecd4'
  primary-fixed-dim: '#a5d0b9'
  on-primary-fixed: '#002114'
  on-primary-fixed-variant: '#274e3d'
  secondary-fixed: '#a1f4c8'
  secondary-fixed-dim: '#86d7ad'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#ffddb6'
  tertiary-fixed-dim: '#ffb959'
  on-tertiary-fixed: '#2a1800'
  on-tertiary-fixed-variant: '#643f00'
  background: '#f9f9ff'
  on-background: '#161c27'
  surface-variant: '#dde2f3'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '800'
    lineHeight: 48px
    letterSpacing: -0.03em
  display-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '800'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 22px
    fontWeight: '700'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: 0em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0em
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0em
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
    letterSpacing: 0.01em
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 18px
    letterSpacing: 0.02em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.04em
  label-sm:
    fontFamily: Inter
    fontSize: 10px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.06em
  stat-counter:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 28px
    letterSpacing: -0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-tablet: 1.5rem
  margin: 1rem
  margin-tablet: 2rem
  margin-desktop: 3rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

This design system expresses a vibrant, grounded outdoor spirit curated for young Indonesian adventurers navigating trails and circular eco-actions. The aesthetic balances rugged mountain utility with energetic gamification—moving past dry ecological metrics into an inspiring, high-agency social experience.

The visual style blends **Modern Organic Tactility** with **Clean Contemporary SaaS**. Interfaces rely on lush organic greens paired with punchy sunrise accents, wide breathable margins, crisp card containers, and tactile feedback. Micro-interactions and interface modules evoke physical outdoor gear: weather-sealed modularity, high legibility in direct sunlight, and vivid progress milestones that celebrate environmental stewardship on and off the trail.

## Colors

The palette grounds the interface in Indonesian highlands and volcanic trails while delivering high-contrast data visualization for outdoor mobile viewability:

- **Primary (`#1B4332`)**: Dense canopy green serving as the anchor for primary navigation, high-priority buttons, top app bars, and deep branded backgrounds.
- **Secondary (`#40916C`)**: Vibrant leaf emerald for active progress, verified trail stations, positive eco-actions, and interactive toggles.
- **Tertiary (`#E9A23B`)**: Mountain sunrise amber dedicated to the gamification loop—powering streak flares, summit badges, rank progression, and circular economy token balances.
- **Neutral (`#1A202C`)**: Deep charcoal slate replacing stark black to ensure soft, natural reading contrast across elevations, captions, and topographic line details.
- **Background & Canvas**: Default canvas sits at `#F4F6F4` (mist white), providing an organic, low-glare surface that softens visual fatigue compared to pure white.

## Typography

The type system blends the energetic curves of **Plus Jakarta Sans** with the utilitarian precision of **Inter**:

- **Plus Jakarta Sans** leads all display headlines, section banners, and card titles. Its open apertures and modern Indonesian design heritage project optimism, approachability, and youth culture.
- **Inter** handles data-dense labels, metric cards, status chips, and tabular values (kilograms of waste gathered, elevation gains, carbon offsets, and token tallies).
- **Tabular Figures & Metrics**: Stat counters and numeric telemetry always employ tabular numbers to prevent horizontal layout shifting during real-time GPS tracking or metric recalculation.

## Layout & Spacing

The layout is built on a mobile-first fluid grid optimized for single-hand trail operation and quick glanceability:

- **Mobile (Base)**: Single-column flow with `1rem` outer canvas padding (`margin`) and `1rem` column gutters. Interactive touch zones stay centered or anchored within the bottom screen half to support thumb reach while trekking.
- **Tablet / Responsive**: Fluid 6-to-8 column layout scaling to `1.5rem` gutters and `2rem` outer margins. Content groups into two distinct panels: Map/Trail preview on the left, Gamified Stats & Circular Exchange on the right.
- **Rhythm**: Spacing enforces an 8pt baseline cadence (`space-xs` = 4px, `space-sm` = 8px, `space-md` = 16px, `space-lg` = 24px, `space-xl` = 32px) maintaining consistent horizontal and vertical gaps throughout nested cards and status groups.

## Elevation & Depth

Visual depth follows a **Tonal Layering with Ambient Moss Shadows** model, avoiding muddy gray drop shadows in favor of ambient, trail-inspired lighting:

- **Level 0 (Canvas)**: `#F4F6F4` flat background surface.
- **Level 1 (Cards & Containers)**: `#FFFFFF` resting on canvas, enclosed by a 1px soft outline (`rgba(27, 67, 50, 0.08)`) and a delicate ambient shadow (`0 4px 12px rgba(27, 67, 50, 0.04)`).
- **Level 2 (Floating Action Chips & Active Trail Widgets)**: `#FFFFFF` or `#1B4332`, elevated with `0 8px 24px rgba(27, 67, 50, 0.12)` to clearly hover above mapping tiles and scroll layers.
- **Level 3 (Modals, Reward Sheets & Bottom Drawers)**: High-altitude presentation with `0 16px 36px rgba(26, 32, 44, 0.18)` and an organic frosted backdrop blur (`backdrop-filter: blur(12px)` over a 40% tinted canvas).

## Shapes

The shape system adopts smooth, welcoming curves that convey friendliness and ergonomics:

- **Primary Cards & Containers**: Bound to `1rem` base roundedness, scaling to `1.5rem` (`rounded-xl`) on hero campaign cards and trail summary panels.
- **Pill Geometry**: Reserved strictly for badges, status chips, floating action buttons, and segmented controls (`rounded-full` / 9999px), offering high tactile affordance and thumb-friendly visual clarity.
- **Inputs & Progress Tracks**: Employ `0.75rem` curvature to feel integrated with the overarching card architecture while keeping corners crisp enough for legible text alignment.

## Components

### Buttons & Interactive Controls
- **Primary CTA**: `#1B4332` solid fill, white text, 48px minimum touch height, `0.75rem` corner radius, subtle hover shift with an amber rim accent on focus.
- **Gamified Eco-Action CTA**: `#E9A23B` solid amber fill with dark `#1A202C` text for claimable rewards, deposit confirmations, and streak check-ins.
- **Secondary / Ghost**: Transparent fill with a 1.5px border of `#40916C` and matching text.

### Gamified Metric Chips & Status Badges
- **Eco-Points Chip**: Pill-shaped container (`rounded-full`) with a `#FEF6E9` background, `#E9A23B` spark icon, and bold `#1A202C` Inter label displaying point counters.
- **Verified Pos Badge**: Deep `#1B4332` container, `#52B788` verification checkmark, and crisp white `label-sm` text.
- **Waste Tracker Chip**: Soft emerald tint (`#E8F5EE`), `#40916C` text, paired with dynamic kilogram counters.

### Progress Bars
- **Multi-tiered Track**: 8px and 12px height options featuring a muted background (`#E2E8F0`), populated by an active gradient from `#40916C` into `#52B788`.
- **Milestone Pins**: Amber circular flags placed directly on the progress line representing checkpoints, summit tiers, or reward unlocking stages.

### Input Fields
- Enclosed white surfaces with a 1.5px border (`rgba(27, 67, 50, 0.15)`), shifting to `#40916C` with an active 3px ambient ring on focus.
- Micro-labels positioned above inputs in `label-md` uppercase styling for immediate legibility under harsh daylight.

### Cards & Modular Containers
- Standard padding set to `1rem` (`space-md`), high-contrast typographic hierarchy with a bold title, metadata chip row, and an inline reward or completion footer.
- Circular economy marketplace cards prioritize large photo previews, item durability tags, deposit fee badges, and quick-claim bottom sheets.