# ThesisExperts360 - Modular Single Page Website

A high-converting, single-page academic writing and digital content website inspired by **ThesisExperts360**, built ready for one-click upload to **Hostinger**.

Built as a **modular One-Pager divided into clean, separate parts** with modern glassmorphism, floating animations, and zero mentions of discounts or pricing.

---

## 📁 Modular Project Structure

```text
Online working website/
├── parts/
│   ├── header.html       # iLovePDF-style Header (Home, Mega Dropdown SERVICES ▾, Popover Contact & Order buttons)
│   ├── hero.html         # Hero section, value points, Glowing Book 3D card & Quick Inquiry widget
│   ├── services.html     # 4 to 5 cards per row grid (10 academic & content services) + Floating Books banner
│   ├── order.html        # Stacked Top & Bottom Order section (Top: Live Supervisor Preview | Bottom: Booking form)
│   ├── contact.html      # Contact channels, Isometric Study Desk workspace preview & Consultation request
│   └── footer.html       # Student Mind 3D CTA banner, site footer & floating WhatsApp button
├── images/
│   ├── academic-advisor.jpg # PhD Supervisor portrait with live online ripple indicator (Order top card)
│   ├── glowing-book.jpg     # 3D Glowing Book with mortarboard, atom & lightbulb (Hero showcase card)
│   ├── floating-books.jpg   # 3D Floating Books library illustration (Services spotlight banner)
│   ├── study-desk.jpg       # 3D Isometric Study Desk workspace (Contact active desk card)
│   └── student-mind.jpg     # 3D Student Mind Focus illustration (Footer CTA banner)
├── index.php             # PHP One-Pager for Hostinger (dynamically includes all parts)
├── index.html            # Static HTML One-Pager (works locally in any browser or static hosting)
├── assemble.ps1          # One-click helper script to compile parts/ into index.html
├── css/
│   └── style.css         # Glassmorphism, float animations, stacked order layout & responsive grid
├── js/
│   └── main.js           # Mega dropdown, action popovers, live preview sync & WhatsApp dispatch
└── README.md             # This guide
```

---

## 💎 Key Enhancements Built

1. **Stacked (Top & Bottom) Order Layout (`parts/order.html`)**:
   - **Top Card**: Glassmorphic live specification card featuring your PhD Academic Supervisor avatar with a green pulsating online indicator dot, 6 real-time parameter chips (Service, Level, Urgency, Length, Format, Topic), and guarantee badges.
   - **Bottom Card**: Comprehensive assignment configuration form with topic, subject discipline, pages, citation style, rubrics, and client details.
2. **5-in-a-Row Service Cards (`parts/services.html`)**:
   - Styled after the modern iLovePDF grid (4 to 5 cards per row) with vibrant icon badges. Clicking any card automatically selects the service and smoothly scrolls to the order form.
3. **Streamlined Header & Action Popovers (`parts/header.html`)**:
   - Direct service links moved inside the `SERVICES ▾` mega-dropdown.
   - `Contact ▾` button triggers an interactive popover offering WhatsApp and Email channels.
   - Red `Order Now ▾` button triggers a direct action popover to order via WhatsApp or via the Website booking form.
4. **Smooth Animations & Glassmorphism Across the Entire Site**:
   - Floating physics (`@keyframes floatSlow`, `@keyframes floatSlowReverse`), ripple dots, and frosted glass cards (`backdrop-filter: blur(16px)`).
   - All 5 user-provided 3D artwork assets are placed in respective sections.
5. **Strict Constraint Followed**:
   - **Zero** mentions of discount, pricing, dollar signs, or rates per page across all files.

---

## 🚀 How to Upload to Hostinger

### Option 1: Native PHP Deployment (Recommended)
1. In your **Hostinger hPanel**, navigate to **File Manager** and open `public_html`.
2. Upload the `parts/` folder, `images/` folder, `css/` folder, `js/` folder, and `index.php`.
3. Hostinger natively serves `index.php`, pulling all components from `parts/` automatically.

### Option 2: Static HTML Deployment
Upload `index.html`, `images/`, `css/`, and `js/` to `public_html`.
If you ever edit any file in `parts/`, run `.\assemble.ps1` in PowerShell to re-compile `index.html` instantly.
