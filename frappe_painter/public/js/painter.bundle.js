/**
 * Frappe Painter v6 — Advanced UI/UX Engine
 * Modular CSS builder architecture
 */
(function () {
    "use strict";

    const CACHE_KEY = "fp_theme_v6";
    const CACHE_TTL = 60 * 1000;

    // ── Utilities ────────────────────────────────────────────────────────────
    function hex2rgb(hex) {
        if (!hex) return "0,0,0";
        const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return r ? `${parseInt(r[1],16)},${parseInt(r[2],16)},${parseInt(r[3],16)}` : "0,0,0";
    }

    function shadow(on) {
        return on ? "0 2px 12px rgba(0,0,0,.08), 0 1px 3px rgba(0,0,0,.06)" : "none";
    }

    function clearCache() {
        try { localStorage.removeItem(CACHE_KEY); } catch(_) {}
    }

    // ── CSS Builder: Base (navbar, sidebar, body, typography) ────────────────
    function buildBaseCSS(s) {
        const trans = s.transition || "0.2s";
        const hasTrans = trans !== "0s";

        const sidebarCSS = s.sidebar_hide
            ? `.desk-sidebar, .layout-side-section { display:none !important; }
               .layout-main { margin-left: 0 !important; }`
            : `
.desk-sidebar,
.layout-side-section {
    background-color: var(--fp-sidebar-bg) !important;
    width: var(--fp-sidebar-w) !important;
    min-width: var(--fp-sidebar-w) !important;
    border-right: 1px solid rgba(0,0,0,.06) !important;
    ${hasTrans ? `transition: width var(--fp-trans) ease !important;` : ""}
}
.desk-sidebar .standard-sidebar-item,
.desk-sidebar .sidebar-item {
    border-radius: var(--fp-radius-sm) !important;
    margin: 1px 6px !important;
    ${hasTrans ? `transition: background-color var(--fp-trans) ease !important;` : ""}
}
.desk-sidebar .standard-sidebar-item span,
.desk-sidebar .sidebar-item a,
.desk-sidebar .sidebar-item-label {
    color: var(--fp-sidebar-text) !important;
    font-weight: 500 !important;
}
.desk-sidebar .standard-sidebar-item:hover,
.desk-sidebar .sidebar-item:hover { background: var(--fp-sidebar-hover) !important; }
.desk-sidebar .standard-sidebar-item.selected,
.desk-sidebar .standard-sidebar-item.active,
.desk-sidebar .sidebar-item.active {
    background: var(--fp-sidebar-act-bg) !important;
    box-shadow: inset -3px 0 0 var(--fp-navbar-accent) !important;
}
.desk-sidebar .standard-sidebar-item.selected span,
.desk-sidebar .standard-sidebar-item.active span,
.desk-sidebar .sidebar-item.active a {
    color: var(--fp-sidebar-act-text) !important;
    font-weight: 600 !important;
}
.desk-sidebar .standard-sidebar-item.selected svg,
.desk-sidebar .standard-sidebar-item.active svg { stroke: var(--fp-sidebar-act-text) !important; }
.desk-sidebar .sidebar-group-title,
.desk-sidebar .module-title,
.desk-sidebar .sidebar-section-title {
    color: var(--fp-label) !important;
    font-size: 11px !important;
    font-weight: 700 !important;
    letter-spacing: 0.08em !important;
    text-transform: uppercase !important;
    padding: 14px 12px 4px !important;
}`;

        const densityMap = {
            compact:     { navH: "44px", spacing: "4px", fs: "12.5px" },
            comfortable: { navH: null,   spacing: "8px", fs: null },
            cozy:        { navH: "64px", spacing: "14px", fs: "15px" },
        };
        const density = densityMap[s.layout_density] || densityMap.comfortable;
        const densityCSS = s.layout_density && s.layout_density !== "comfortable" ? `
/* Layout density: ${s.layout_density} */
.navbar, header.navbar { min-height: ${density.navH || s.navbar_height} !important; }
.frappe-card, .layout-main-section-wrapper { padding: ${density.spacing} !important; }
${density.fs ? `body, .page-container { font-size: ${density.fs} !important; }` : ""}
` : "";

        return `
/* ═══════════════════════════════════════════════════
   FRAPPE PAINTER v6 — Generated Theme CSS
   ═══════════════════════════════════════════════════ */

/* ── GOOGLE FONTS ─────────────────────────────────── */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&family=DM+Sans:wght@400;500;600;700&family=Nunito:wght@400;600;700&family=IBM+Plex+Sans:wght@400;500;600;700&family=Roboto:wght@400;500;700&family=Open+Sans:wght@400;600;700&display=swap');

/* ── CSS VARIABLES ────────────────────────────────── */
:root {
    --fp-navbar-bg:         ${s.navbar_bg};
    --fp-navbar-text:       ${s.navbar_text_color};
    --fp-navbar-accent:     ${s.navbar_accent_color};
    --fp-navbar-h:          ${s.navbar_height};
    --fp-sidebar-bg:        ${s.sidebar_bg};
    --fp-sidebar-text:      ${s.sidebar_text_color};
    --fp-sidebar-act-bg:    ${s.sidebar_active_bg};
    --fp-sidebar-act-text:  ${s.sidebar_active_text};
    --fp-sidebar-hover:     ${s.sidebar_hover_bg};
    --fp-sidebar-w:         ${s.sidebar_width};
    --fp-btn-bg:            ${s.btn_primary_bg};
    --fp-btn-text:          ${s.btn_primary_text};
    --fp-btn-hover:         ${s.btn_primary_hover};
    --fp-btn-sec-bg:        ${s.btn_secondary_bg};
    --fp-btn-sec-text:      ${s.btn_secondary_text};
    --fp-btn-r:             ${s.btn_radius};
    --fp-body-bg:           ${s.body_bg};
    --fp-content-bg:        ${s.content_bg};
    --fp-card-bg:           ${s.card_bg};
    --fp-card-border:       ${s.card_border_color};
    --fp-heading:           ${s.heading_color};
    --fp-text:              ${s.text_color};
    --fp-link:              ${s.link_color};
    --fp-font:              ${s.font_family};
    --fp-font-size:         ${s.font_size};
    --fp-th-bg:             ${s.table_header_bg};
    --fp-th-text:           ${s.table_header_text};
    --fp-tr-hover:          ${s.table_row_hover};
    --fp-table-border:      ${s.table_border_color};
    --fp-sec-head:          ${s.section_head_color};
    --fp-sec-border:        ${s.section_border_color};
    --fp-field-bg:          ${s.field_bg};
    --fp-field-border:      ${s.field_border_color};
    --fp-field-focus:       ${s.field_focus_color};
    --fp-field-focus-rgb:   ${hex2rgb(s.field_focus_color)};
    --fp-label:             ${s.label_color};
    --fp-widget-bg:         ${s.widget_bg};
    --fp-widget-border:     ${s.widget_border_color};
    --fp-num-card-bg:       ${s.number_card_bg};
    --fp-num-card-text:     ${s.number_card_text};
    --fp-radius-sm:         ${s.border_radius_sm};
    --fp-radius-md:         ${s.border_radius_md};
    --fp-radius-lg:         ${s.border_radius_lg};
    --fp-trans:             ${trans};
    --fp-card-shadow:       ${shadow(s.card_shadow)};
    --fp-widget-shadow:     ${shadow(s.widget_shadow)};
    --fp-grid-bg:           ${s.grid_menu_bg || s.navbar_bg};
}

/* ── BASE ─────────────────────────────────────────── */
body, .page-container, .main-section {
    font-family: var(--fp-font) !important;
    font-size:   var(--fp-font-size) !important;
    color:       var(--fp-text) !important;
    background:  var(--fp-body-bg) !important;
}

/* ── NAVBAR ───────────────────────────────────────── */
.navbar, header.navbar, .navbar.navbar-expand {
    background-color: var(--fp-navbar-bg) !important;
    border-bottom: 3px solid var(--fp-navbar-accent) !important;
    min-height: var(--fp-navbar-h) !important;
    box-shadow: 0 2px 10px rgba(0,0,0,.15) !important;
    ${hasTrans ? `transition: background-color var(--fp-trans) ease !important;` : ""}
}
.navbar .nav-link, .navbar a.nav-link, .navbar .navbar-brand,
.navbar .navbar-text, .navbar .dropdown-toggle, .navbar-toggler,
.navbar .indicator-pill, .navbar .notifications-icon, .navbar .help-link {
    color: var(--fp-navbar-text) !important;
    opacity: 1 !important;
}
.navbar .nav-link:hover { opacity: 0.8 !important; }
.navbar svg, .navbar use { stroke: var(--fp-navbar-text) !important; }
.navbar .search-bar .form-control, .navbar .awesomplete input, .navbar .search-input {
    background: rgba(255,255,255,.15) !important;
    border: 1px solid rgba(255,255,255,.25) !important;
    color: var(--fp-navbar-text) !important;
    border-radius: var(--fp-radius-sm) !important;
}
.navbar .search-bar .form-control::placeholder { color: rgba(255,255,255,.55) !important; }
.navbar .dropdown-menu {
    border-radius: var(--fp-radius-md) !important;
    box-shadow: 0 8px 30px rgba(0,0,0,.15) !important;
    border: 1px solid var(--fp-card-border) !important;
}
${s.hide_help_button ? ".navbar .help-link, .navbar [data-label='Help'], .navbar-help { display:none !important; }" : ""}
${s.hide_search_bar ? ".navbar .search-bar, .navbar .search-box { display:none !important; }" : ""}

/* ── SIDEBAR ──────────────────────────────────────── */
${sidebarCSS}

/* ── PAGE / CONTENT ───────────────────────────────── */
.page-wrapper, .page-content, .layout-main-section, .frappe-app > .page-wrapper {
    background: var(--fp-body-bg) !important;
}
.page-head, .page-head-content {
    background: var(--fp-content-bg) !important;
    border-bottom: 1px solid var(--fp-card-border) !important;
    border-radius: var(--fp-radius-md) var(--fp-radius-md) 0 0 !important;
}
.layout-main-section-wrapper, .page-content .page-form, .frappe-card {
    background: var(--fp-content-bg) !important;
    border: 1px solid var(--fp-card-border) !important;
    border-radius: var(--fp-radius-md) !important;
    box-shadow: var(--fp-card-shadow) !important;
}

/* ── TYPOGRAPHY ───────────────────────────────────── */
.title-text, h1.title-text, .page-title .title-text {
    color: var(--fp-heading) !important;
    font-weight: 700 !important;
    font-family: var(--fp-font) !important;
}
h1,h2,h3,h4,h5,h6 { color: var(--fp-heading) !important; font-family: var(--fp-font) !important; }
a:not(.btn):not(.nav-link):not(.navbar-brand):not(.dropdown-item):not(.sidebar-item) {
    color: var(--fp-link) !important;
    ${hasTrans ? `transition: opacity var(--fp-trans) ease !important;` : ""}
}
a:not(.btn):not(.nav-link):hover { opacity: 0.8 !important; }

/* ── TABLES ───────────────────────────────────────── */
.datatable .dt-header .dt-cell, .list-row-head, .dt-header .dt-cell--header {
    background: var(--fp-th-bg) !important;
    color: var(--fp-th-text) !important;
    font-weight: 600 !important;
    font-size: 11.5px !important;
    text-transform: uppercase !important;
    letter-spacing: 0.04em !important;
    border-bottom: 2px solid var(--fp-table-border) !important;
}
.datatable .dt-row:hover .dt-cell, .list-row:hover { background: var(--fp-tr-hover) !important; }
.datatable .dt-cell, .list-row {
    border-bottom: 1px solid var(--fp-table-border) !important;
    ${hasTrans ? `transition: background var(--fp-trans) ease !important;` : ""}
}
${s.hide_like_comment ? ".list-row-activity, .timeline-actions, .comment-box .comment-input-header .actions { display:none !important; }" : ""}

/* ── TABS ─────────────────────────────────────────── */
.nav-tabs .nav-link {
    border: none !important;
    border-bottom: 2px solid transparent !important;
    background: transparent !important;
    color: var(--fp-label) !important;
    border-radius: 0 !important;
    ${hasTrans ? `transition: all var(--fp-trans) ease !important;` : ""}
}
.nav-tabs .nav-link.active, .nav-tabs .nav-link:hover {
    color: var(--fp-heading) !important;
    border-bottom-color: var(--fp-btn-bg) !important;
    font-weight: 600 !important;
    background: transparent !important;
}

/* ── MODAL ────────────────────────────────────────── */
.modal-content {
    border-radius: var(--fp-radius-lg) !important;
    border: none !important;
    box-shadow: 0 20px 60px rgba(0,0,0,.2) !important;
    overflow: hidden !important;
}
.modal-header {
    background-color: var(--fp-sidebar-act-bg) !important;
    border-bottom: none !important;
    padding: 16px 20px !important;
}
.modal-header .modal-title { color: var(--fp-sidebar-act-text) !important; font-weight: 600 !important; font-size: 16px !important; }
.modal-header .btn-modal-close, .modal-header .close { color: var(--fp-sidebar-act-text) !important; opacity: 0.8 !important; }
.modal-body { background: var(--fp-content-bg) !important; padding: 20px !important; }
.modal-footer { background: var(--fp-content-bg) !important; border-top: 1px solid var(--fp-card-border) !important; }

/* ── BREADCRUMB ───────────────────────────────────── */
.breadcrumb-item a { color: var(--fp-link) !important; font-weight: 500 !important; }
.breadcrumb-item.active { color: var(--fp-heading) !important; font-weight: 600 !important; }

/* ── INDICATORS / BADGES ──────────────────────────── */
.indicator-pill, .badge {
    border-radius: 999px !important;
    font-weight: 600 !important;
    font-size: 11px !important;
}

/* ── DROPDOWN ─────────────────────────────────────── */
.dropdown-menu, ul.awesomplete > li {
    border-radius: var(--fp-radius-md) !important;
    border: 1px solid var(--fp-card-border) !important;
    box-shadow: 0 8px 30px rgba(0,0,0,.1) !important;
}
.dropdown-item:hover, ul.awesomplete > li[aria-selected="true"] {
    background: var(--fp-sidebar-hover) !important;
    color: var(--fp-heading) !important;
}

/* ── MISC ─────────────────────────────────────────── */
.desk-sidebar-item { border-radius: var(--fp-radius-sm) !important; }
.layout-main-section { background: transparent !important; }
.workspace-header, .workspace-title { color: var(--fp-heading) !important; }
.page-footer { border-top: 1px solid var(--fp-card-border) !important; }
.alert-success { border-left: 4px solid var(--fp-navbar-accent) !important; }
.alert-info { border-left: 4px solid var(--fp-btn-bg) !important; }

/* ── WIDGETS ──────────────────────────────────────── */
.widget, .shortcut-widget-box, .widget-group .widget {
    background: var(--fp-widget-bg) !important;
    border: 1px solid var(--fp-widget-border) !important;
    border-radius: var(--fp-radius-md) !important;
    box-shadow: var(--fp-widget-shadow) !important;
    ${hasTrans ? `transition: all var(--fp-trans) ease !important;` : ""}
}
.widget .widget-title, .shortcut-widget-box .widget-title { color: var(--fp-heading) !important; font-weight: 600 !important; }
.number-card, .number-card .number-card-container {
    background: var(--fp-num-card-bg) !important;
    border-radius: var(--fp-radius-md) !important;
    border: 1px solid var(--fp-widget-border) !important;
    box-shadow: var(--fp-widget-shadow) !important;
}
.number-card .number-card-title, .number-card .number-card-label { color: var(--fp-label) !important; font-weight: 600 !important; font-size: 12px !important; }
.number-card .number { color: var(--fp-num-card-text) !important; font-size: 2rem !important; font-weight: 700 !important; }

/* ── DENSITY ──────────────────────────────────────── */
${densityCSS}
`.trim();
    }

    // ── CSS Builder: Buttons ─────────────────────────────────────────────────
    function buildButtonCSS(s) {
        const trans = s.transition || "0.2s";
        const hasTrans = trans !== "0s";
        const btnRgb = hex2rgb(s.btn_primary_bg);

        // Shape styles
        const shapeMap = {
            default:  `border-radius: var(--fp-btn-r) !important;`,
            rounded:  `border-radius: 8px !important;`,
            pill:     `border-radius: 999px !important;`,
            outlined: `border-radius: var(--fp-btn-r) !important; background: transparent !important; border: 2px solid var(--fp-btn-bg) !important; color: var(--fp-btn-bg) !important;`,
            ghost:    `border-radius: var(--fp-btn-r) !important; background: transparent !important; border: none !important; color: var(--fp-btn-bg) !important; box-shadow: none !important;`,
            gradient: `border-radius: var(--fp-btn-r) !important; background: linear-gradient(135deg, var(--fp-btn-bg), var(--fp-navbar-accent)) !important; border: none !important;`,
            elevated: `border-radius: var(--fp-btn-r) !important; box-shadow: 0 4px 14px rgba(${btnRgb},.4) !important; border: none !important;`,
        };
        const shapeCSS = shapeMap[s.btn_style] || shapeMap.default;

        // Hover animations
        const hoverAnim = {
            none:  "",
            scale: `transform: scale(1.04) !important;`,
            glow:  `box-shadow: 0 0 0 4px rgba(${btnRgb},.3), 0 4px 12px rgba(${btnRgb},.35) !important;`,
            slide: `background-position: right center !important; background-size: 200% auto !important;`,
        };
        const hoverExtra = hoverAnim[s.btn_hover_animation] || "";

        return `
/* ── BUTTONS ──────────────────────────────────────── */
.btn-primary, .btn-primary.btn {
    background-color: var(--fp-btn-bg) !important;
    border-color: var(--fp-btn-hover) !important;
    color: var(--fp-btn-text) !important;
    font-weight: 500 !important;
    ${shapeCSS}
    ${hasTrans ? `transition: all var(--fp-trans) ease !important;` : ""}
}
${s.btn_style === "gradient" ? `.btn-primary {
    background: linear-gradient(135deg, var(--fp-btn-bg) 0%, var(--fp-navbar-accent) 100%) !important;
    background-size: 200% auto !important;
}` : ""}
.btn-primary:hover, .btn-primary:focus, .btn-primary.active {
    background-color: var(--fp-btn-hover) !important;
    border-color: var(--fp-btn-hover) !important;
    transform: translateY(-1px) !important;
    ${hoverExtra}
}
.btn-primary:active { transform: translateY(0) !important; }

.btn-secondary, .btn-default, .btn.btn-default {
    background-color: var(--fp-btn-sec-bg) !important;
    color: var(--fp-btn-sec-text) !important;
    border: 1px solid var(--fp-card-border) !important;
    font-weight: 500 !important;
    ${shapeMap[s.btn_style] ? shapeCSS.split(";")[0] + ";" : "border-radius: var(--fp-btn-r) !important;"}
    ${hasTrans ? `transition: all var(--fp-trans) ease !important;` : ""}
}
.btn-secondary:hover, .btn-default:hover {
    filter: brightness(0.96) !important;
    box-shadow: 0 2px 8px rgba(0,0,0,.08) !important;
}

/* ── FORM SECTION HEADS / FIELD LABELS / INPUTS ───── */
.section-head, .form-section .section-head, .section-head .label-area {
    color: var(--fp-sec-head) !important;
    font-weight: 600 !important;
    font-size: calc(var(--fp-font-size) + 1px) !important;
    border-bottom: 2px solid var(--fp-sec-border) !important;
    padding-bottom: 6px !important;
    margin-bottom: 12px !important;
}
.frappe-control label.control-label, .frappe-control .label, .control-label {
    color: var(--fp-label) !important;
    font-size: 11.5px !important;
    font-weight: 600 !important;
    letter-spacing: 0.02em !important;
    text-transform: uppercase !important;
}
.frappe-control .form-control,
.frappe-control input:not([type="checkbox"]):not([type="radio"]),
.frappe-control textarea, .frappe-control select, .input-with-feedback {
    background: var(--fp-field-bg) !important;
    border: 1px solid var(--fp-field-border) !important;
    border-radius: var(--fp-radius-sm) !important;
    color: var(--fp-text) !important;
    ${hasTrans ? `transition: border-color var(--fp-trans) ease, box-shadow var(--fp-trans) ease !important;` : ""}
}
.frappe-control .form-control:focus,
.frappe-control input:focus,
.frappe-control textarea:focus,
.frappe-control select:focus {
    border-color: var(--fp-field-focus) !important;
    box-shadow: 0 0 0 3px rgba(var(--fp-field-focus-rgb),.15) !important;
    outline: none !important;
}
`.trim();
    }

    // ── CSS Builder: List View ────────────────────────────────────────────────
    function buildListViewCSS(s) {
        let css = "";

        if (s.list_view_style === "modern") {
            css += `
/* List View: modern */
.list-row {
    border-radius: var(--fp-radius-sm) !important;
    margin: 2px 0 !important;
    border: 1px solid var(--fp-table-border) !important;
    border-left: 3px solid var(--fp-btn-bg) !important;
}
.list-row:hover {
    box-shadow: 0 2px 8px rgba(0,0,0,.08) !important;
    transform: translateX(2px) !important;
    border-left-color: var(--fp-navbar-accent) !important;
    padding-left: 12px !important;
}
`;
        } else if (s.list_view_style === "cards") {
            css += `
/* List View: cards */
.list-row {
    border-radius: var(--fp-radius-md) !important;
    margin: 4px 0 !important;
    border: 1px solid var(--fp-card-border) !important;
    box-shadow: 0 1px 4px rgba(0,0,0,.06) !important;
    padding: 10px 14px !important;
    background: var(--fp-card-bg) !important;
}
.list-row:hover {
    box-shadow: 0 4px 16px rgba(0,0,0,.1) !important;
    border-color: rgba(${hex2rgb(s.btn_primary_bg)},.3) !important;
}
`;
        } else if (s.list_view_style === "compact") {
            css += `
/* List View: compact */
.list-row { padding: 4px 8px !important; min-height: 28px !important; }
.list-row .list-subject { font-size: 12.5px !important; }
`;
        } else if (s.list_view_style === "minimal") {
            css += `
/* List View: minimal */
.list-row { border-bottom: 1px solid var(--fp-table-border) !important; border-left: none !important; padding: 8px 4px !important; }
.list-row-head { border-bottom: 2px solid var(--fp-btn-bg) !important; }
`;
        } else {
            // default — accent left on hover
            css += `
.list-row:hover {
    border-left: 3px solid var(--fp-navbar-accent) !important;
    padding-left: 12px !important;
}
`;
        }

        if (s.list_sticky_header) {
            css += `
/* Sticky list header */
.list-row-head { position: sticky !important; top: 0 !important; z-index: 10 !important; background: var(--fp-th-bg) !important; }
`;
        }

        if (s.list_alternating_rows) {
            css += `
/* Alternating rows */
.list-row:nth-child(even) { background: rgba(${hex2rgb(s.table_header_bg)}, 0.5) !important; }
`;
        }

        if (s.list_row_style === "bordered") {
            css += `
.list-row { border: 1px solid var(--fp-table-border) !important; margin: 2px 0 !important; border-radius: var(--fp-radius-sm) !important; }
`;
        } else if (s.list_row_style === "horizontal") {
            css += `
.list-row { border-bottom: 1px solid var(--fp-table-border) !important; border-left: none !important; border-top: none !important; border-right: none !important; }
`;
        } else if (s.list_row_style === "accent_left") {
            css += `
.list-row { border-left: 3px solid var(--fp-btn-bg) !important; }
.list-row:hover { border-left-color: var(--fp-navbar-accent) !important; }
`;
        }

        return css.trim();
    }

    // ── CSS Builder: Form Layout ──────────────────────────────────────────────
    function buildFormCSS(s) {
        let css = "";

        if (s.form_layout === "compact") {
            css += `
/* Form: compact */
.frappe-control { margin-bottom: 8px !important; }
.section-body .row { margin-bottom: 4px !important; }
`;
        } else if (s.form_layout === "card") {
            css += `
/* Form: card layout */
.form-layout .form-page { padding: 16px !important; }
`;
        }

        if (s.form_section_style === "card") {
            css += `
/* Form sections: card */
.form-section, .section-body {
    background: var(--fp-card-bg) !important;
    border: 1px solid var(--fp-card-border) !important;
    border-radius: var(--fp-radius-md) !important;
    padding: 16px !important;
    margin-bottom: 12px !important;
    box-shadow: var(--fp-card-shadow) !important;
}
.section-head, .form-section .section-head {
    border-bottom: none !important;
    margin-bottom: 12px !important;
    background: var(--fp-content-bg) !important;
    padding: 8px 12px !important;
    border-radius: var(--fp-radius-sm) var(--fp-radius-sm) 0 0 !important;
}
`;
        } else if (s.form_section_style === "colored_header") {
            css += `
/* Form sections: colored header */
.section-head, .form-section .section-head {
    background: var(--fp-sidebar-act-bg) !important;
    color: var(--fp-sidebar-act-text) !important;
    padding: 8px 12px !important;
    border-radius: var(--fp-radius-sm) !important;
    border-bottom: none !important;
}
`;
        } else if (s.form_section_style === "underline") {
            css += `
/* Form sections: underline */
.section-head, .form-section .section-head {
    border-bottom: 2px solid var(--fp-btn-bg) !important;
    padding-bottom: 4px !important;
}
`;
        } else if (s.form_section_style === "filled") {
            css += `
/* Form sections: filled */
.section-head, .form-section .section-head {
    background: rgba(${hex2rgb(s.btn_primary_bg)}, 0.08) !important;
    border-left: 4px solid var(--fp-btn-bg) !important;
    padding: 6px 12px !important;
    border-radius: 0 var(--fp-radius-sm) var(--fp-radius-sm) 0 !important;
    border-bottom: none !important;
}
`;
        }

        if (s.field_style === "outlined") {
            css += `
/* Field style: outlined */
.frappe-control .form-control,
.frappe-control input:not([type="checkbox"]):not([type="radio"]),
.frappe-control textarea, .frappe-control select {
    border: 2px solid var(--fp-field-border) !important;
    border-radius: var(--fp-radius-sm) !important;
}
.frappe-control .form-control:focus, .frappe-control input:focus,
.frappe-control textarea:focus, .frappe-control select:focus {
    border-color: var(--fp-field-focus) !important;
    border-width: 2px !important;
}
`;
        } else if (s.field_style === "filled") {
            css += `
/* Field style: filled */
.frappe-control .form-control,
.frappe-control input:not([type="checkbox"]):not([type="radio"]),
.frappe-control textarea, .frappe-control select {
    background: rgba(${hex2rgb(s.field_focus_color)}, 0.06) !important;
    border: none !important;
    border-bottom: 2px solid var(--fp-field-border) !important;
    border-radius: var(--fp-radius-sm) var(--fp-radius-sm) 0 0 !important;
}
`;
        } else if (s.field_style === "underline") {
            css += `
/* Field style: underline */
.frappe-control .form-control,
.frappe-control input:not([type="checkbox"]):not([type="radio"]),
.frappe-control textarea, .frappe-control select {
    background: transparent !important;
    border: none !important;
    border-bottom: 1px solid var(--fp-field-border) !important;
    border-radius: 0 !important;
    padding-left: 0 !important;
}
.frappe-control .form-control:focus, .frappe-control input:focus {
    border-bottom: 2px solid var(--fp-field-focus) !important;
    box-shadow: none !important;
}
`;
        }

        return css.trim();
    }

    // ── CSS Builder: Effects ─────────────────────────────────────────────────
    function buildEffectsCSS(s) {
        let css = "";
        const btnRgb = hex2rgb(s.btn_primary_bg);
        const cardBgRgb = hex2rgb(s.card_bg || "#ffffff");

        if (s.enable_glassmorphism) {
            css += `
/* Glassmorphism */
.navbar, header.navbar {
    background: rgba(${hex2rgb(s.navbar_bg)}, 0.85) !important;
    backdrop-filter: blur(12px) saturate(1.4) !important;
    -webkit-backdrop-filter: blur(12px) saturate(1.4) !important;
}
.frappe-card, .layout-main-section-wrapper, .widget, .shortcut-widget-box {
    background: rgba(${cardBgRgb}, 0.75) !important;
    backdrop-filter: blur(8px) !important;
    -webkit-backdrop-filter: blur(8px) !important;
}
.modal-content {
    background: rgba(${cardBgRgb}, 0.9) !important;
    backdrop-filter: blur(20px) !important;
    -webkit-backdrop-filter: blur(20px) !important;
}
`;
        }

        if (s.card_hover_effect === "lift") {
            css += `
/* Card hover: lift */
.widget:hover, .shortcut-widget-box:hover, .frappe-card:hover {
    transform: translateY(-4px) !important;
    box-shadow: 0 12px 32px rgba(0,0,0,.14) !important;
}
`;
        } else if (s.card_hover_effect === "glow") {
            css += `
/* Card hover: glow */
.widget:hover, .shortcut-widget-box:hover, .frappe-card:hover {
    box-shadow: 0 0 0 2px rgba(${btnRgb},.25), 0 8px 24px rgba(${btnRgb},.15) !important;
    border-color: rgba(${btnRgb},.4) !important;
}
`;
        } else if (s.card_hover_effect === "scale") {
            css += `
/* Card hover: scale */
.widget:hover, .shortcut-widget-box:hover {
    transform: scale(1.02) !important;
    box-shadow: 0 8px 24px rgba(0,0,0,.12) !important;
}
`;
        } else if (s.card_hover_effect === "border_accent") {
            css += `
/* Card hover: border accent */
.widget:hover, .shortcut-widget-box:hover, .frappe-card:hover {
    border-color: var(--fp-btn-bg) !important;
    border-width: 2px !important;
    box-shadow: none !important;
}
`;
        } else {
            // default widget hover
            css += `
.widget:hover, .shortcut-widget-box:hover {
    box-shadow: 0 8px 24px rgba(0,0,0,.12) !important;
    transform: translateY(-2px) !important;
    border-color: rgba(${btnRgb},.3) !important;
}
.widget.shortcut-widget-box { border-top: 3px solid var(--fp-btn-bg) !important; }
.widget.shortcut-widget-box:hover { border-top-color: var(--fp-navbar-accent) !important; }
`;
        }

        if (s.enable_page_animations) {
            css += `
/* Page animations */
.layout-main-section-wrapper { animation: fp-fadein 0.22s ease both !important; }
.list-row { animation: fp-fadein 0.15s ease both !important; }
.frappe-card { animation: fp-fadein 0.2s ease both !important; }
.desk-sidebar .standard-sidebar-item,
.desk-sidebar .sidebar-item { animation: fp-slidein 0.18s ease both !important; }
`;
        }

        // Scrollbar styles
        if (s.scrollbar_style === "none") {
            css += `
::-webkit-scrollbar { display: none !important; }
* { scrollbar-width: none !important; }
`;
        } else if (s.scrollbar_style === "thin") {
            css += `
::-webkit-scrollbar { width: 5px; height: 5px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: rgba(0,0,0,.18); border-radius: 4px; }
::-webkit-scrollbar-thumb:hover { background: var(--fp-btn-bg); }
`;
        } else if (s.scrollbar_style === "modern") {
            css += `
::-webkit-scrollbar { width: 8px; height: 8px; }
::-webkit-scrollbar-track { background: var(--fp-body-bg); border-radius: 4px; }
::-webkit-scrollbar-thumb { background: var(--fp-field-border); border-radius: 4px; border: 2px solid var(--fp-body-bg); }
::-webkit-scrollbar-thumb:hover { background: var(--fp-btn-bg); }
`;
        } else {
            // default browser scrollbar — no override
        }

        return css.trim();
    }

    // ── CSS Builder: Workspace ────────────────────────────────────────────────
    function buildWorkspaceCSS(s) {
        let css = "";

        if (s.workspace_style === "card_grid") {
            css += `
/* Workspace: card grid */
.widget-group .widget-group-body { display: grid !important; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)) !important; gap: 12px !important; }
.widget { width: auto !important; }
`;
        } else if (s.workspace_style === "minimal") {
            css += `
/* Workspace: minimal */
.widget { border: none !important; box-shadow: none !important; background: transparent !important; }
.widget:hover { background: var(--fp-sidebar-hover) !important; border: none !important; }
`;
        }

        if (s.shortcut_style === "large_icons") {
            css += `
/* Shortcuts: large icons */
.shortcut-widget-box { min-height: 96px !important; display: flex !important; flex-direction: column !important; align-items: center !important; justify-content: center !important; }
.shortcut-widget-box .widget-icon { width: 40px !important; height: 40px !important; margin-bottom: 8px !important; }
.shortcut-widget-box .widget-title { font-size: 12px !important; text-align: center !important; }
`;
        } else if (s.shortcut_style === "icon_only") {
            css += `
/* Shortcuts: icon only */
.shortcut-widget-box { width: 56px !important; height: 56px !important; min-height: unset !important; display: flex !important; align-items: center !important; justify-content: center !important; }
.shortcut-widget-box .widget-title { display: none !important; }
.shortcut-widget-box .widget-icon { width: 28px !important; height: 28px !important; }
`;
        } else if (s.shortcut_style === "list") {
            css += `
/* Shortcuts: list style */
.shortcut-widget-box { display: flex !important; align-items: center !important; padding: 8px 12px !important; }
.shortcut-widget-box .widget-icon { margin-right: 10px !important; flex-shrink: 0 !important; }
`;
        }

        return css.trim();
    }

    // ── CSS Builder: Navigation Mode ──────────────────────────────────────────
    function buildNavModeCSS(s) {
        if (!s.nav_style || s.nav_style === "sidebar") return "";

        if (s.nav_style === "minimal_sidebar") {
            return `
/* Nav: minimal sidebar (icons only) */
.desk-sidebar, .layout-side-section {
    width: 60px !important;
    min-width: 60px !important;
    overflow: hidden !important;
}
.desk-sidebar .standard-sidebar-item span,
.desk-sidebar .sidebar-item-label,
.desk-sidebar .sidebar-group-title,
.desk-sidebar .module-title {
    display: none !important;
}
.desk-sidebar .standard-sidebar-item,
.desk-sidebar .sidebar-item {
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    padding: 10px 0 !important;
    margin: 2px 6px !important;
    border-radius: var(--fp-radius-sm) !important;
}
.desk-sidebar svg { width: 20px !important; height: 20px !important; }
.desk-sidebar:hover {
    width: var(--fp-sidebar-w) !important;
    min-width: var(--fp-sidebar-w) !important;
    overflow: visible !important;
}
.desk-sidebar:hover .standard-sidebar-item span,
.desk-sidebar:hover .sidebar-item-label { display: inline !important; }
.desk-sidebar:hover .standard-sidebar-item,
.desk-sidebar:hover .sidebar-item { justify-content: flex-start !important; padding: 8px 12px !important; }
`.trim();
        }

        if (s.nav_style === "top_bar") {
            return `
/* Nav: top bar (hide sidebar) */
.desk-sidebar, .layout-side-section { display: none !important; }
.layout-main { margin-left: 0 !important; }
`.trim();
        }

        if (s.nav_style === "grid_menu") {
            return `
/* Nav: grid menu (sidebar hidden, FAB handles navigation) */
.desk-sidebar, .layout-side-section { display: none !important; }
.layout-main { margin-left: 0 !important; }
`.trim();
        }

        return "";
    }

    // ── CSS Builder: Page Width ───────────────────────────────────────────────
    function buildPageWidthCSS(s) {
        const widthMap = {
            full:      null,
            contained: "1200px",
            wide:      "1600px",
            narrow:    "900px",
        };
        const maxW = widthMap[s.page_width_mode];
        if (!maxW) return "";
        return `
/* Page width: ${s.page_width_mode} */
.layout-main { max-width: ${maxW} !important; margin-left: auto !important; margin-right: auto !important; }
`.trim();
    }

    // ── CSS Builder: RTL ──────────────────────────────────────────────────────
    function buildRTLCSS(s) {
        if (!s.enable_rtl) return "";
        return `
/* RTL */
.desk-sidebar, .layout-side-section { right: 0 !important; left: auto !important; border-right: none !important; border-left: 1px solid rgba(0,0,0,.06) !important; }
.layout-main { margin-left: 0 !important; margin-right: var(--fp-sidebar-w) !important; }
.desk-sidebar .standard-sidebar-item.selected,
.desk-sidebar .standard-sidebar-item.active { box-shadow: inset 3px 0 0 var(--fp-navbar-accent) !important; }
.list-row:hover { border-left: none !important; border-right: 3px solid var(--fp-navbar-accent) !important; padding-left: 0 !important; padding-right: 12px !important; }
`.trim();
    }

    // ── CSS Builder: Login ────────────────────────────────────────────────────
    function buildLoginCSS(s) {
        if (!document.querySelector(".login-content, .for-login, #page-login")) return "";

        const pos = s.login_box_position || "center";
        const bgStyle = s.login_bg_type === "image" && s.login_bg_image
            ? `background: url('${s.login_bg_image}') center center / cover no-repeat !important;`
            : s.login_bg_type === "gradient"
            ? `background: linear-gradient(135deg, ${s.navbar_bg}, ${s.btn_primary_bg}) !important;`
            : `background-color: ${s.login_bg_color} !important;`;

        return `
/* ── LOGIN ────────────────────────────────────────── */
body.login-page, .login-content { ${bgStyle} }
.for-login, #page-login {
    ${bgStyle}
    min-height: 100vh !important;
    display: flex !important;
    align-items: center !important;
    justify-content: ${pos === "left" ? "flex-start" : pos === "right" ? "flex-end" : "center"} !important;
    padding: 0 ${pos !== "center" ? "80px" : "0"} !important;
}
.login-main, .login-form-container {
    background: ${s.login_box_bg} !important;
    border-radius: var(--fp-radius-lg, 12px) !important;
    box-shadow: ${s.login_box_shadow ? "0 20px 60px rgba(0,0,0,.2)" : "none"} !important;
    padding: 40px !important;
    min-width: 380px !important;
}
.for-login h2, .login-content h1, .login-main .title { color: ${s.heading_color} !important; font-family: var(--fp-font, sans-serif) !important; }
.for-login .btn-login, .login-form .btn-primary {
    background-color: ${s.login_btn_bg} !important;
    color: ${s.login_btn_text} !important;
    border-color: ${s.login_btn_bg} !important;
    border-radius: var(--fp-btn-r, 6px) !important;
    width: 100% !important;
    padding: 10px !important;
    font-weight: 600 !important;
}
.for-login .btn-login:hover, .login-form .btn-primary:hover { filter: brightness(0.9) !important; }
`.trim();
    }

    // ── Grid Menu (FAB + overlay) ─────────────────────────────────────────────
    function setupGridMenu(s) {
        // Remove existing
        const existing = document.getElementById("fp-grid-menu-fab");
        if (existing) existing.remove();
        const existingOverlay = document.getElementById("fp-grid-menu-overlay");
        if (existingOverlay) existingOverlay.remove();

        if (s.nav_style !== "grid_menu") return;

        const bgColor = s.grid_menu_bg || s.navbar_bg || "#1E3A8A";
        const cardStyle = s.grid_menu_card_style || "glass";

        // Create FAB button
        const fab = document.createElement("button");
        fab.id = "fp-grid-menu-fab";
        fab.setAttribute("aria-label", "Open App Menu");
        fab.innerHTML = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
            <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
        </svg>`;
        Object.assign(fab.style, {
            position: "fixed",
            bottom: "28px",
            right: "28px",
            width: "52px",
            height: "52px",
            borderRadius: "50%",
            background: bgColor,
            color: "#fff",
            border: "none",
            cursor: "pointer",
            zIndex: "9998",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 20px rgba(0,0,0,.3)",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
        });
        fab.addEventListener("mouseenter", () => { fab.style.transform = "scale(1.1)"; });
        fab.addEventListener("mouseleave", () => { fab.style.transform = "scale(1)"; });

        // Create overlay
        const overlay = document.createElement("div");
        overlay.id = "fp-grid-menu-overlay";
        Object.assign(overlay.style, {
            position: "fixed",
            inset: "0",
            zIndex: "9997",
            background: `rgba(${hex2rgb(bgColor)}, 0.96)`,
            display: "none",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            paddingTop: "80px",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            overflow: "auto",
        });

        // Search bar
        const searchWrap = document.createElement("div");
        Object.assign(searchWrap.style, { marginBottom: "24px", width: "min(460px, 90vw)" });
        const searchInput = document.createElement("input");
        searchInput.type = "text";
        searchInput.placeholder = "Search apps...";
        searchInput.setAttribute("aria-label", "Search apps");
        Object.assign(searchInput.style, {
            width: "100%",
            padding: "10px 16px",
            borderRadius: "999px",
            border: "none",
            fontSize: "15px",
            outline: "none",
            background: "rgba(255,255,255,.15)",
            color: "#fff",
        });
        searchInput.addEventListener("input", filterCards);
        searchWrap.appendChild(searchInput);
        overlay.appendChild(searchWrap);

        // Card grid container
        const grid = document.createElement("div");
        grid.id = "fp-grid-menu-cards";
        Object.assign(grid.style, {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
            gap: "16px",
            width: "min(720px, 90vw)",
            maxHeight: "calc(100vh - 200px)",
            overflowY: "auto",
        });
        overlay.appendChild(grid);

        // Populate cards from sidebar links
        function populateCards() {
            grid.innerHTML = "";
            const links = document.querySelectorAll(".desk-sidebar .standard-sidebar-item a, .desk-sidebar .sidebar-item a");
            const seen = new Set();
            links.forEach(function(a) {
                const label = (a.querySelector("span") || a).textContent.trim();
                const href = a.href || "#";
                if (!label || seen.has(label)) return;
                seen.add(label);
                const card = document.createElement("a");
                card.href = href;
                card.textContent = label;
                card.setAttribute("data-label", label.toLowerCase());
                Object.assign(card.style, {
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "90px",
                    padding: "14px 10px",
                    borderRadius: "12px",
                    color: "#fff",
                    fontSize: "12px",
                    fontWeight: "600",
                    textDecoration: "none",
                    textAlign: "center",
                    lineHeight: "1.3",
                    transition: "transform 0.15s ease, background 0.15s ease",
                    cursor: "pointer",
                    ...(cardStyle === "glass" ? {
                        background: "rgba(255,255,255,.12)",
                        border: "1px solid rgba(255,255,255,.2)",
                        backdropFilter: "blur(8px)",
                    } : cardStyle === "solid" ? {
                        background: "rgba(255,255,255,.2)",
                        border: "none",
                    } : cardStyle === "outline" ? {
                        background: "transparent",
                        border: "1.5px solid rgba(255,255,255,.5)",
                    } : { // flat
                        background: "transparent",
                        border: "none",
                    }),
                });
                card.addEventListener("mouseenter", () => { card.style.transform = "scale(1.06)"; card.style.background = "rgba(255,255,255,.22)"; });
                card.addEventListener("mouseleave", () => { card.style.transform = "scale(1)"; card.style.background = cardStyle === "glass" ? "rgba(255,255,255,.12)" : cardStyle === "solid" ? "rgba(255,255,255,.2)" : "transparent"; });
                card.addEventListener("click", closeMenu);
                grid.appendChild(card);
            });

            // If no sidebar links found, show placeholder
            if (grid.children.length === 0) {
                const placeholder = document.createElement("div");
                placeholder.style.cssText = "color:rgba(255,255,255,.6);text-align:center;grid-column:1/-1;padding:40px;";
                placeholder.textContent = "Navigate to a module page to see app shortcuts here.";
                grid.appendChild(placeholder);
            }
        }

        function filterCards() {
            const q = (searchInput.value || "").toLowerCase();
            Array.from(grid.querySelectorAll("a[data-label]")).forEach(function(card) {
                card.style.display = (card.dataset.label || "").includes(q) ? "flex" : "none";
            });
        }

        function openMenu() {
            populateCards();
            overlay.style.display = "flex";
            searchInput.value = "";
            setTimeout(() => searchInput.focus(), 50);
            fab.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;
        }

        function closeMenu() {
            overlay.style.display = "none";
            fab.innerHTML = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>`;
        }

        fab.addEventListener("click", function() {
            if (overlay.style.display === "none") openMenu(); else closeMenu();
        });

        // Close on Escape
        document.addEventListener("keydown", function(e) {
            if (e.key === "Escape" && overlay.style.display !== "none") closeMenu();
        });

        // Close on overlay background click
        overlay.addEventListener("click", function(e) {
            if (e.target === overlay) closeMenu();
        });

        document.body.appendChild(fab);
        document.body.appendChild(overlay);
    }

    // ── Apply branding ────────────────────────────────────────────────────────
    function applyBranding(s) {
        if (s.custom_app_name) {
            document.querySelectorAll(".navbar-brand span, .navbar-brand .brand-name, [data-app-name]")
                .forEach(el => { el.textContent = s.custom_app_name; });
        }
        if (s.custom_logo) {
            document.querySelectorAll(".navbar-brand img, .app-logo")
                .forEach(el => { el.src = s.custom_logo; el.style.maxHeight = "36px"; });
        }
        if (s.favicon_url) {
            let fav = document.querySelector("link[rel*='icon']");
            if (!fav) { fav = document.createElement("link"); fav.rel = "icon"; document.head.appendChild(fav); }
            fav.href = s.favicon_url;
        }
    }

    // ── Apply login text ──────────────────────────────────────────────────────
    function applyLoginText(s) {
        if (!document.querySelector(".login-content, .for-login, #page-login")) return;
        if (s.login_title) {
            const titleEl = document.querySelector(".for-login h2, .login-content h1, #login-title");
            if (titleEl) titleEl.textContent = s.login_title;
        }
        if (s.login_subtitle) {
            const subEl = document.querySelector(".for-login p.sub-title, .login-subtitle");
            if (subEl) subEl.textContent = s.login_subtitle;
        }
    }

    // ── Main applyTheme ───────────────────────────────────────────────────────
    function applyTheme(s) {
        if (!s || !s.is_enabled) {
            const tag = document.getElementById("fp-theme-style");
            if (tag) tag.remove();
            const oldTag = document.getElementById("fp-style");
            if (oldTag) oldTag.remove();
            return;
        }

        const css = [
            buildBaseCSS(s),
            buildButtonCSS(s),
            buildListViewCSS(s),
            buildFormCSS(s),
            buildEffectsCSS(s),
            buildWorkspaceCSS(s),
            buildNavModeCSS(s),
            buildPageWidthCSS(s),
            buildRTLCSS(s),
            buildLoginCSS(s),
            s.custom_css || "",
        ].filter(Boolean).join("\n\n");

        let tag = document.getElementById("fp-theme-style");
        if (!tag) {
            tag = document.createElement("style");
            tag.id = "fp-theme-style";
            document.head.appendChild(tag);
        }
        tag.textContent = css;

        // RTL on html element
        if (s.enable_rtl) {
            document.documentElement.setAttribute("dir", "rtl");
        } else {
            document.documentElement.removeAttribute("dir");
        }

        setupGridMenu(s);
        applyBranding(s);
        applyLoginText(s);

        document.body.style.backgroundColor = s.body_bg;
    }

    // ── Load theme from cache or server ──────────────────────────────────────
    function loadTheme(force) {
        if (!force) {
            try {
                const raw = localStorage.getItem(CACHE_KEY);
                if (raw) {
                    const { ts, data } = JSON.parse(raw);
                    if (Date.now() - ts < CACHE_TTL) {
                        applyTheme(data);
                        return;
                    }
                }
            } catch(_) {}
        }

        frappe.call({
            method: "frappe_painter.frappe_painter.doctype.painter_settings.painter_settings.get_settings",
            freeze: false,
            callback: function(r) {
                if (r && r.message !== undefined) {
                    const data = r.message;
                    applyTheme(data);
                    try {
                        localStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), data: data }));
                    } catch(_) {}
                }
            }
        });
    }

    // ── Lifecycle hooks ──────────────────────────────────────────────────────
    $(document).on("page-change", function() { loadTheme(); });
    frappe.after_ajax(function() { loadTheme(); });
    $(function() { loadTheme(true); });

    $(document).on("frappe.form.save", function(e, frm) {
        if (frm && frm.doctype === "Painter Settings") {
            clearCache();
            setTimeout(function() { loadTheme(true); }, 300);
        }
    });

    if (frappe.ui && frappe.ui.form && frappe.ui.form.on) {
        frappe.ui.form.on("Painter Settings", "after_save", function() {
            clearCache();
            setTimeout(function() { loadTheme(true); }, 300);
        });
    }

    // ── Public API ───────────────────────────────────────────────────────────
    window.frappe_painter = {
        reload: function() { clearCache(); loadTheme(true); },
        clearCache: clearCache,
        disable: function() {
            const tag = document.getElementById("fp-theme-style");
            if (tag) tag.remove();
        }
    };

})();
