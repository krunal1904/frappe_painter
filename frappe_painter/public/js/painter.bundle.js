/**
 * Frappe Painter v5 — Comprehensive UI/UX Theme Engine
 * Covers: Navbar, Sidebar, Buttons, Body, Tables, Forms, Widgets,
 *         Login Page, Cards, Typography, Animations, Custom CSS
 */
(function () {
    "use strict";

    const CACHE_KEY = "fp_theme_v5";
    const CACHE_TTL = 60 * 1000; // 1 min — fast feedback after saves

    // ── Utilities ────────────────────────────────────────────────────────────
    function hex2rgb(hex) {
        if (!hex) return "0,0,0";
        const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return r ? `${parseInt(r[1],16)},${parseInt(r[2],16)},${parseInt(r[3],16)}` : "0,0,0";
    }

    function shadow(on) {
        return on ? "0 2px 12px rgba(0,0,0,.08), 0 1px 3px rgba(0,0,0,.06)" : "none";
    }

    function shadow_lg(on) {
        return on ? "0 4px 24px rgba(0,0,0,.10), 0 2px 6px rgba(0,0,0,.07)" : "none";
    }

    function clearCache() {
        try { localStorage.removeItem(CACHE_KEY); } catch(_) {}
    }

    // ── Build full CSS string from settings ──────────────────────────────────
    function buildCSS(s) {
        const trans = s.transition || "0.2s";
        const hasTrans = trans !== "0s";

        return `
/* ═══════════════════════════════════════════════════
   FRAPPE PAINTER v5 — Generated Theme CSS
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
}

/* ── BASE RESET / GLOBAL ──────────────────────────── */
body,
.page-container,
.main-section {
    font-family: var(--fp-font) !important;
    font-size:   var(--fp-font-size) !important;
    color:       var(--fp-text) !important;
    background:  var(--fp-body-bg) !important;
}

/* ── NAVBAR ───────────────────────────────────────── */
.navbar,
header.navbar,
.navbar.navbar-expand {
    background-color: var(--fp-navbar-bg) !important;
    border-bottom: 3px solid var(--fp-navbar-accent) !important;
    min-height: var(--fp-navbar-h) !important;
    box-shadow: 0 2px 10px rgba(0,0,0,.15) !important;
    ${hasTrans ? `transition: background-color var(--fp-trans) ease !important;` : ""}
}
.navbar .nav-link,
.navbar a.nav-link,
.navbar .navbar-brand,
.navbar .navbar-text,
.navbar .dropdown-toggle,
.navbar-toggler,
.navbar .indicator-pill,
.navbar .notifications-icon,
.navbar .help-link {
    color: var(--fp-navbar-text) !important;
    opacity: 1 !important;
}
.navbar .nav-link:hover { opacity: 0.8 !important; }
.navbar svg,
.navbar use { stroke: var(--fp-navbar-text) !important; }

/* Navbar search */
.navbar .search-bar .form-control,
.navbar .awesomplete input,
.navbar .search-input {
    background: rgba(255,255,255,.15) !important;
    border: 1px solid rgba(255,255,255,.25) !important;
    color: var(--fp-navbar-text) !important;
    border-radius: var(--fp-radius-sm) !important;
}
.navbar .search-bar .form-control::placeholder { color: rgba(255,255,255,.55) !important; }

/* Navbar dropdown */
.navbar .dropdown-menu {
    border-radius: var(--fp-radius-md) !important;
    box-shadow: 0 8px 30px rgba(0,0,0,.15) !important;
    border: 1px solid var(--fp-card-border) !important;
}

${s.hide_help_button ? ".navbar .help-link, .navbar [data-label='Help'], .navbar-help { display:none !important; }" : ""}
${s.hide_search_bar ? ".navbar .search-bar, .navbar .search-box { display:none !important; }" : ""}

/* ── SIDEBAR ──────────────────────────────────────── */
${s.sidebar_hide ? ".desk-sidebar, .layout-side-section { display:none !important; } .layout-main { margin-left: 0 !important; }" : `
.desk-sidebar,
.layout-side-section {
    background-color: var(--fp-sidebar-bg) !important;
    width: var(--fp-sidebar-w) !important;
    min-width: var(--fp-sidebar-w) !important;
    border-right: 1px solid rgba(0,0,0,.06) !important;
    ${hasTrans ? `transition: width var(--fp-trans) ease !important;` : ""}
}

/* Sidebar items */
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
    font-size: calc(var(--fp-font-size) - 0px) !important;
}
.desk-sidebar .standard-sidebar-item:hover,
.desk-sidebar .sidebar-item:hover {
    background: var(--fp-sidebar-hover) !important;
}
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
.desk-sidebar .standard-sidebar-item.active svg {
    stroke: var(--fp-sidebar-act-text) !important;
}

/* Sidebar section headers */
.desk-sidebar .sidebar-group-title,
.desk-sidebar .module-title,
.desk-sidebar .sidebar-section-title {
    color: var(--fp-label) !important;
    font-size: 11px !important;
    font-weight: 700 !important;
    letter-spacing: 0.08em !important;
    text-transform: uppercase !important;
    padding: 14px 12px 4px !important;
}
`}

/* ── PAGE / CONTENT AREA ──────────────────────────── */
.page-wrapper,
.page-content,
.layout-main-section,
.frappe-app > .page-wrapper {
    background: var(--fp-body-bg) !important;
}
.page-head,
.page-head-content {
    background: var(--fp-content-bg) !important;
    border-bottom: 1px solid var(--fp-card-border) !important;
    border-radius: var(--fp-radius-md) var(--fp-radius-md) 0 0 !important;
}
.layout-main-section-wrapper,
.page-content .page-form,
.frappe-card {
    background: var(--fp-content-bg) !important;
    border: 1px solid var(--fp-card-border) !important;
    border-radius: var(--fp-radius-md) !important;
    box-shadow: var(--fp-card-shadow) !important;
}

/* ── TITLE / HEADINGS ─────────────────────────────── */
.title-text,
h1.title-text,
.page-title .title-text {
    color: var(--fp-heading) !important;
    font-weight: 700 !important;
    font-family: var(--fp-font) !important;
}
h1,h2,h3,h4,h5,h6 {
    color: var(--fp-heading) !important;
    font-family: var(--fp-font) !important;
}
a:not(.btn):not(.nav-link):not(.navbar-brand):not(.dropdown-item):not(.sidebar-item) {
    color: var(--fp-link) !important;
    ${hasTrans ? `transition: opacity var(--fp-trans) ease !important;` : ""}
}
a:not(.btn):not(.nav-link):hover { opacity: 0.8 !important; }

/* ── BUTTONS ──────────────────────────────────────── */
.btn-primary,
.btn-primary.btn {
    background-color: var(--fp-btn-bg) !important;
    border-color: var(--fp-btn-hover) !important;
    color: var(--fp-btn-text) !important;
    border-radius: var(--fp-btn-r) !important;
    font-weight: 500 !important;
    ${hasTrans ? `transition: all var(--fp-trans) ease !important;` : ""}
}
.btn-primary:hover,
.btn-primary:focus,
.btn-primary.active {
    background-color: var(--fp-btn-hover) !important;
    border-color: var(--fp-btn-hover) !important;
    box-shadow: 0 4px 12px rgba(${hex2rgb(s.btn_primary_bg)},.35) !important;
    transform: translateY(-1px) !important;
}
.btn-primary:active { transform: translateY(0) !important; }

.btn-secondary,
.btn-default,
.btn.btn-default {
    background-color: var(--fp-btn-sec-bg) !important;
    color: var(--fp-btn-sec-text) !important;
    border: 1px solid var(--fp-card-border) !important;
    border-radius: var(--fp-btn-r) !important;
    font-weight: 500 !important;
    ${hasTrans ? `transition: all var(--fp-trans) ease !important;` : ""}
}
.btn-secondary:hover,
.btn-default:hover {
    filter: brightness(0.96) !important;
    box-shadow: 0 2px 8px rgba(0,0,0,.08) !important;
}

/* ── FORM SECTIONS ────────────────────────────────── */
.section-head,
.form-section .section-head,
.section-head .label-area {
    color: var(--fp-sec-head) !important;
    font-weight: 600 !important;
    font-size: calc(var(--fp-font-size) + 1px) !important;
    border-bottom: 2px solid var(--fp-sec-border) !important;
    padding-bottom: 6px !important;
    margin-bottom: 12px !important;
}

/* ── FIELD LABELS ─────────────────────────────────── */
.frappe-control label.control-label,
.frappe-control .label,
.control-label {
    color: var(--fp-label) !important;
    font-size: 11.5px !important;
    font-weight: 600 !important;
    letter-spacing: 0.02em !important;
    text-transform: uppercase !important;
}

/* ── INPUTS ───────────────────────────────────────── */
.frappe-control .form-control,
.frappe-control input:not([type="checkbox"]):not([type="radio"]),
.frappe-control textarea,
.frappe-control select,
.input-with-feedback {
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

/* ── TABS ─────────────────────────────────────────── */
.nav-tabs .nav-link {
    border: none !important;
    border-bottom: 2px solid transparent !important;
    background: transparent !important;
    color: var(--fp-label) !important;
    border-radius: 0 !important;
    ${hasTrans ? `transition: all var(--fp-trans) ease !important;` : ""}
}
.nav-tabs .nav-link.active,
.nav-tabs .nav-link:hover {
    color: var(--fp-heading) !important;
    border-bottom-color: var(--fp-btn-bg) !important;
    font-weight: 600 !important;
    background: transparent !important;
}

/* ── TABLES ───────────────────────────────────────── */
.datatable .dt-header .dt-cell,
.list-row-head,
.dt-header .dt-cell--header {
    background: var(--fp-th-bg) !important;
    color: var(--fp-th-text) !important;
    font-weight: 600 !important;
    font-size: 11.5px !important;
    text-transform: uppercase !important;
    letter-spacing: 0.04em !important;
    border-bottom: 2px solid var(--fp-table-border) !important;
}
.datatable .dt-row:hover .dt-cell,
.list-row:hover {
    background: var(--fp-tr-hover) !important;
}
.datatable .dt-cell,
.list-row {
    border-bottom: 1px solid var(--fp-table-border) !important;
    ${hasTrans ? `transition: background var(--fp-trans) ease !important;` : ""}
}
.list-row:hover {
    border-left: 3px solid var(--fp-navbar-accent) !important;
    padding-left: 12px !important;
}
${s.hide_like_comment ? ".list-row-activity, .timeline-actions, .comment-box .comment-input-header .actions { display:none !important; }" : ""}

/* ── WIDGETS ──────────────────────────────────────── */
.widget,
.shortcut-widget-box,
.widget-group .widget {
    background: var(--fp-widget-bg) !important;
    border: 1px solid var(--fp-widget-border) !important;
    border-radius: var(--fp-radius-md) !important;
    box-shadow: var(--fp-widget-shadow) !important;
    ${hasTrans ? `transition: all var(--fp-trans) ease !important;` : ""}
}
.widget:hover,
.shortcut-widget-box:hover {
    box-shadow: 0 8px 24px rgba(0,0,0,.12) !important;
    transform: translateY(-2px) !important;
    border-color: rgba(${hex2rgb(s.btn_primary_bg)},.3) !important;
}
.widget .widget-title,
.shortcut-widget-box .widget-title {
    color: var(--fp-heading) !important;
    font-weight: 600 !important;
}
/* Widget top accent stripe */
.widget.shortcut-widget-box { border-top: 3px solid var(--fp-btn-bg) !important; }
.widget.shortcut-widget-box:hover { border-top-color: var(--fp-navbar-accent) !important; }

/* Number Cards */
.number-card,
.number-card .number-card-container {
    background: var(--fp-num-card-bg) !important;
    border-radius: var(--fp-radius-md) !important;
    border: 1px solid var(--fp-widget-border) !important;
    box-shadow: var(--fp-widget-shadow) !important;
}
.number-card .number-card-title,
.number-card .number-card-label {
    color: var(--fp-label) !important;
    font-weight: 600 !important;
    font-size: 12px !important;
}
.number-card .number {
    color: var(--fp-num-card-text) !important;
    font-size: 2rem !important;
    font-weight: 700 !important;
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
.modal-header .modal-title {
    color: var(--fp-sidebar-act-text) !important;
    font-weight: 600 !important;
    font-size: 16px !important;
}
.modal-header .btn-modal-close,
.modal-header .close {
    color: var(--fp-sidebar-act-text) !important;
    opacity: 0.8 !important;
}
.modal-body { background: var(--fp-content-bg) !important; padding: 20px !important; }
.modal-footer { background: var(--fp-content-bg) !important; border-top: 1px solid var(--fp-card-border) !important; }

/* ── BREADCRUMB ───────────────────────────────────── */
.breadcrumb-container .breadcrumb,
.page-head .breadcrumb { margin-bottom: 0 !important; }
.breadcrumb-item a { color: var(--fp-link) !important; font-weight: 500 !important; }
.breadcrumb-item.active { color: var(--fp-heading) !important; font-weight: 600 !important; }

/* ── INDICATORS / BADGES ──────────────────────────── */
.indicator-pill,
.badge {
    border-radius: 999px !important;
    font-weight: 600 !important;
    font-size: 11px !important;
    letter-spacing: 0.02em !important;
}

/* ── SCROLLBAR ────────────────────────────────────── */
::-webkit-scrollbar { width: 5px; height: 5px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: rgba(0,0,0,.18); border-radius: 4px; }
::-webkit-scrollbar-thumb:hover { background: var(--fp-btn-bg); }

/* ── DROPDOWN / AWESOMPLETE ───────────────────────── */
.dropdown-menu,
ul.awesomplete > li {
    border-radius: var(--fp-radius-md) !important;
    border: 1px solid var(--fp-card-border) !important;
    box-shadow: 0 8px 30px rgba(0,0,0,.1) !important;
}
.dropdown-item:hover,
ul.awesomplete > li[aria-selected="true"] {
    background: var(--fp-sidebar-hover) !important;
    color: var(--fp-heading) !important;
}

/* ── CARD / DESK HOME ─────────────────────────────── */
.desk-sidebar-item { border-radius: var(--fp-radius-sm) !important; }
.layout-main-section { background: transparent !important; }

/* ── WORKSPACE HEADER ─────────────────────────────── */
.workspace-header,
.workspace-title { color: var(--fp-heading) !important; }

/* ── FOOTER ───────────────────────────────────────── */
.page-footer { border-top: 1px solid var(--fp-card-border) !important; }

/* ── TOASTS & ALERTS ──────────────────────────────── */
.alert-success { border-left: 4px solid var(--fp-navbar-accent) !important; }
.alert-info { border-left: 4px solid var(--fp-btn-bg) !important; }

/* ── CUSTOM CSS ───────────────────────────────────── */
${s.custom_css || ""}
        `.trim();
    }

    // ── Apply theme ──────────────────────────────────────────────────────────
    function applyTheme(s) {
        if (!s || !s.is_enabled) {
            // Remove painter CSS if disabled
            const tag = document.getElementById("fp-style");
            if (tag) tag.remove();
            return;
        }

        const css = buildCSS(s);
        let tag = document.getElementById("fp-style");
        if (!tag) {
            tag = document.createElement("style");
            tag.id = "fp-style";
            document.head.appendChild(tag);
        }
        tag.textContent = css;

        // Custom app name
        if (s.custom_app_name) {
            document.querySelectorAll(".navbar-brand span, .navbar-brand .brand-name, [data-app-name]")
                .forEach(el => { el.textContent = s.custom_app_name; });
        }

        // Custom logo
        if (s.custom_logo) {
            document.querySelectorAll(".navbar-brand img, .app-logo")
                .forEach(el => { el.src = s.custom_logo; el.style.maxHeight = "36px"; });
        }

        // Favicon
        if (s.favicon_url) {
            let fav = document.querySelector("link[rel*='icon']");
            if (!fav) { fav = document.createElement("link"); fav.rel = "icon"; document.head.appendChild(fav); }
            fav.href = s.favicon_url;
        }

        // Apply body background directly too (belt + suspenders)
        document.body.style.backgroundColor = s.body_bg;
    }

    // ── Apply login page theme ───────────────────────────────────────────────
    function applyLoginTheme(s) {
        if (!s || !s.is_enabled) return;

        // Check if we're on login page
        if (!document.querySelector(".login-content, .for-login, #page-login")) return;

        const pos = s.login_box_position || "center";
        const bgStyle = s.login_bg_type === "image" && s.login_bg_image
            ? `background: url('${s.login_bg_image}') center center / cover no-repeat !important;`
            : s.login_bg_type === "gradient"
            ? `background: linear-gradient(135deg, ${s.navbar_bg}, ${s.btn_primary_bg}) !important;`
            : `background-color: ${s.login_bg_color} !important;`;

        const loginCSS = `
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
.for-login h2, .login-content h1, .login-main .title {
    color: ${s.heading_color} !important;
    font-family: var(--fp-font, sans-serif) !important;
}
${s.login_title ? `.for-login h2::after { content: "${s.login_title}" !important; }` : ""}
.for-login .btn-login,
.login-form .btn-primary {
    background-color: ${s.login_btn_bg} !important;
    color: ${s.login_btn_text} !important;
    border-color: ${s.login_btn_bg} !important;
    border-radius: var(--fp-btn-r, 6px) !important;
    width: 100% !important;
    padding: 10px !important;
    font-weight: 600 !important;
}
.for-login .btn-login:hover,
.login-form .btn-primary:hover {
    filter: brightness(0.9) !important;
}
        `.trim();

        let tag = document.getElementById("fp-login-style");
        if (!tag) {
            tag = document.createElement("style");
            tag.id = "fp-login-style";
            document.head.appendChild(tag);
        }
        tag.textContent = loginCSS;

        // Set login page title text
        if (s.login_title) {
            const titleEl = document.querySelector(".for-login h2, .login-content h1, #login-title");
            if (titleEl) titleEl.textContent = s.login_title;
        }
        if (s.login_subtitle) {
            const subEl = document.querySelector(".for-login p.sub-title, .login-subtitle");
            if (subEl) subEl.textContent = s.login_subtitle;
        }
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
                        applyLoginTheme(data);
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
                    const s = r.message;
                    applyTheme(s);
                    applyLoginTheme(s);
                    try {
                        localStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), data: s }));
                    } catch(_) {}
                }
            }
        });
    }

    // ── Lifecycle hooks ──────────────────────────────────────────────────────
    $(document).on("page-change", function() { loadTheme(); });
    frappe.after_ajax(function() { loadTheme(); });

    // Force fresh load on initial page render
    $(function() { loadTheme(true); });

    // When Painter Settings is saved in UI — clear cache & reload immediately
    $(document).on("frappe.form.save", function(e, frm) {
        if (frm && frm.doctype === "Painter Settings") {
            clearCache();
            setTimeout(function() { loadTheme(true); }, 300);
        }
    });

    // Also hook into frappe's document save event
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
            const tag = document.getElementById("fp-style");
            if (tag) tag.remove();
        }
    };

})();