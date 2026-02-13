# Planning Guide

A comprehensive technical specification viewer for the Prompt Vault - an Apache Spark-based system for managing, organizing, versioning, and analyzing AI prompts at scale.

**Experience Qualities**:
1. **Professional** - The interface should feel like enterprise-grade technical documentation with clear hierarchy and precise information architecture
2. **Comprehensive** - Every aspect of the Spark-based system should be thoroughly documented with code examples, schemas, and implementation details
3. **Accessible** - Complex technical content should be navigable and digestible through thoughtful organization and visual design

**Complexity Level**: Light Application (multiple features with basic state)
- This is an interactive technical documentation viewer that presents a comprehensive Spark architecture specification. It includes navigation between sections, code syntax highlighting, collapsible sections, and an organized view of complex technical content.

## Essential Features

**Section Navigation**
- Functionality: Navigate between different sections of the technical specification (Data Model, Ingestion, Processing, Storage, etc.)
- Purpose: Allow users to quickly jump to relevant sections of the documentation
- Trigger: Clicking on navigation items in a sidebar or tab interface
- Progression: User clicks section → Content area smoothly transitions → Selected section becomes active in navigation → User can read content
- Success criteria: All sections are accessible, navigation state is clear, transitions are smooth

**Code Snippet Display**
- Functionality: Display PySpark code examples with proper syntax highlighting and formatting
- Purpose: Provide clear, readable code examples that users can reference or copy
- Trigger: Code blocks are automatically formatted when section is viewed
- Progression: Section loads → Code blocks render with syntax highlighting → User can read and copy code
- Success criteria: Code is properly formatted, readable, and includes language indicators

**Collapsible Content Sections**
- Functionality: Allow users to expand/collapse detailed subsections within each major section
- Purpose: Reduce cognitive load by allowing progressive disclosure of detailed information
- Trigger: Clicking on section headers or expand/collapse controls
- Progression: User clicks header → Section expands/collapses with animation → Icon updates to reflect state → Content is revealed/hidden
- Success criteria: Smooth animations, clear affordances, state persistence during session

**Schema Visualization**
- Functionality: Present the Spark StructType schema in a clear, hierarchical format
- Purpose: Help users understand the data model structure at a glance
- Trigger: Viewing the Data Model section
- Progression: Section loads → Schema displays in structured table/tree format → Field types and descriptions are clear
- Success criteria: Schema is easy to scan, field relationships are clear, data types are prominent

**Search/Filter Capability**
- Functionality: Quick search within the documentation content
- Purpose: Enable rapid location of specific topics, functions, or code examples
- Trigger: Typing in search input field
- Progression: User types query → Results highlight or filter in real-time → User clicks result → View scrolls/navigates to relevant section
- Success criteria: Fast response, accurate results, clear highlighting

## Edge Case Handling

- **Empty Search Results**: Display helpful message suggesting alternative search terms or browsing navigation
- **Long Code Blocks**: Implement horizontal scrolling with clear scroll indicators to prevent layout breaks
- **Mobile Viewing**: Collapse navigation into hamburger menu, ensure code blocks are horizontally scrollable
- **Deep Linking**: Support URL fragments for direct linking to specific sections
- **Print Mode**: Ensure document formats properly when printed or exported to PDF

## Design Direction

The design should evoke a sense of **technical precision and modern enterprise software**. Think of a blend between GitHub documentation, Stripe's API docs, and DataBricks notebooks - clean, professional, with excellent use of space and typography to make dense technical content digestible. The interface should feel like a premium developer tool with attention to detail in code presentation and information hierarchy.

## Color Selection

A sophisticated technical documentation palette with strong contrast and clear semantic meaning.

- **Primary Color**: Deep indigo `oklch(0.35 0.12 270)` - Represents the analytical, data-driven nature of Spark and big data processing
- **Secondary Colors**: 
  - Slate gray `oklch(0.45 0.02 240)` for secondary UI elements and navigation
  - Warm amber `oklch(0.75 0.15 65)` for code highlights and interactive elements
- **Accent Color**: Electric cyan `oklch(0.65 0.20 200)` - For CTAs, active states, and important highlights that demand attention
- **Foreground/Background Pairings**:
  - Background (Light cream `oklch(0.98 0.01 85)`): Dark text `oklch(0.20 0.02 260)` - Ratio 14.8:1 ✓
  - Primary (Deep indigo `oklch(0.35 0.12 270)`): White text `oklch(1 0 0)` - Ratio 8.2:1 ✓
  - Accent (Electric cyan `oklch(0.65 0.20 200)`): Dark text `oklch(0.20 0.02 260)` - Ratio 5.8:1 ✓
  - Code blocks (Dark `oklch(0.18 0.02 260)`): Light cyan text `oklch(0.85 0.08 180)` - Ratio 12.1:1 ✓

## Font Selection

Typography should communicate technical precision while maintaining excellent readability for extended reading sessions.

- **Primary Font**: **JetBrains Mono** for all code blocks - optimized for code with excellent character distinction
- **Secondary Font**: **Inter** for body text and UI - clean, modern, highly legible
- **Accent Font**: **Space Grotesk** for headings - geometric and technical feel with personality

**Typographic Hierarchy**:
- H1 (Page Title): Space Grotesk Bold/36px/tight leading/-0.02em tracking
- H2 (Section Titles): Space Grotesk Semibold/28px/tight leading
- H3 (Subsection Titles): Space Grotesk Medium/22px/normal leading
- Body Text: Inter Regular/16px/1.7 line-height
- Code Inline: JetBrains Mono Regular/14px/mono spacing
- Code Blocks: JetBrains Mono Regular/14px/1.5 line-height/mono spacing
- Captions: Inter Regular/14px/muted color

## Animations

Animations should reinforce the sense of navigating through structured, layered information - like drilling down into a data structure or expanding a schema definition.

- **Section Transitions**: Smooth fade + slight vertical slide (200ms ease-out) when switching between major sections
- **Accordion Expansions**: Height animation with easing (250ms ease-in-out) for collapsible content
- **Code Block Appearance**: Subtle fade-in (150ms) when scrolling into view
- **Navigation Highlights**: Active indicator slides smoothly (200ms ease-out) between nav items
- **Search Results**: Gentle highlight pulse (300ms) when focusing on search matches
- **Hover States**: Micro-interactions on buttons and links (100ms) for immediate feedback

## Component Selection

- **Components**:
  - **Tabs**: For top-level section navigation between major documentation areas
  - **Accordion**: For collapsible subsections within each major section
  - **Card**: To contain code examples and important callout information
  - **ScrollArea**: For long code blocks and content sections with fixed heights
  - **Separator**: To create clear visual breaks between content sections
  - **Badge**: To tag code languages, version indicators, and section labels
  - **Input**: For search functionality with icon integration
  - **Button**: For copy-to-clipboard actions on code blocks

- **Customizations**:
  - Custom syntax highlighting for PySpark code using proper color tokens
  - Custom table component for schema visualization with alternating row styles
  - Custom heading anchor links for deep linking within documentation
  - Custom breadcrumb navigation for hierarchical location awareness

- **States**:
  - **Navigation Items**: Default (muted), Hover (accent background), Active (primary color + left border)
  - **Accordion Headers**: Default (subtle background), Hover (slightly darker), Expanded (accent color icon)
  - **Code Blocks**: Always include language badge, copy button appears on hover
  - **Search Input**: Default (border), Focus (accent border + shadow), Filled (subtle background)

- **Icon Selection**:
  - **Database** icon for Data Model section
  - **Download** icon for Data Ingestion
  - **Gear** icon for Processing & Management
  - **Archive** icon for Storage & Persistence
  - **Code** icon for Example Code
  - **MagnifyingGlass** icon for search
  - **Copy** icon for copy-to-clipboard
  - **CaretRight/Down** icons for accordion expand/collapse

- **Spacing**:
  - Section padding: 8 (2rem) for major sections
  - Card padding: 6 (1.5rem) for contained content
  - List item spacing: 4 (1rem) between items
  - Code block margin: 6 (1.5rem) top and bottom
  - Heading margins: 8 (2rem) top, 4 (1rem) bottom

- **Mobile**:
  - Navigation collapses to sheet/drawer from left edge
  - Code blocks use horizontal scroll with momentum
  - Reduce heading sizes by 20% on mobile
  - Increase touch targets to minimum 44px
  - Stack schema table rows vertically with field name as header
