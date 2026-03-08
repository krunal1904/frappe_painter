/**
 * Frappe Painter — Runtime Theme Engine
 * Fetches settings from Painter Settings DocType and injects CSS variables
 */

(function () {
    "use strict";

    const CACHE_KEY = "frappe_painter_theme";
    const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

    function hexToRgb(hex) {
        const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return r ? `${parseInt(r[1], 16)}, ${parseInt(r[2], 16)}, ${parseInt(r[3], 16)}` : "0,0,0";
    }

    function applyTheme(s) {
        // Build the complete CSS string with all variables + overrides
        const css = `
/* ── Frappe Painter: Injected Theme ── */
:root {
    --painter-navbar-bg:          ${s.navbar_bg};
    --painter-navbar-text:        ${s.navbar_text_color};
    --painter-navbar-accent:      ${s.navbar_accent_color};
    --painter-sidebar-bg:         ${s.sidebar_bg};
    --painter-sidebar-text:       ${s.sidebar_text_color};
    --painter-sidebar-active-bg:  ${s.sidebar_active_bg};
    --painter-sidebar-active-text:${s.sidebar_active_text};
    --painter-sidebar-hover-bg:   ${s.sidebar_hover_bg};
    --painter-sidebar-width:      ${s.sidebar_width};
    --painter-btn-bg:             ${s.btn_primary_bg};
    --painter-btn-text:           ${s.btn_primary_text};
    --painter-btn-hover:          ${s.btn_primary_hover};
    --painter-btn-radius:         ${s.btn_radius};
    --painter-body-bg:            ${s.body_bg};
    --painter-content-bg:         ${s.content_bg};
    --painter-heading:            ${s.heading_color};
    --painter-link:               ${s.link_color};
    --painter-font:               ${s.font_family};
    --painter-font-size:          ${s.font_size};
    --painter-section-color:      ${s.section_color};
    --painter-section-border:     ${s.section_border_color};
    --painter-field-border:       ${s.field_border_color};
    --painter-field-focus:        ${s.field_focus_color};
    --painter-field-focus-rgb:    ${hexToRgb(s.field_focus_color)};
    --painter-label:              ${s.label_color};
}

/* ── NAVBAR ── */
.navbar, header.navbar, .navbar.navbar-expand {
    background-color: var(--painter-navbar-bg) !important;
    border-bottom: 3px solid var(--painter-navbar-accent) !important;
    box-shadow: 0 2px 8px rgba(0,0,0,.15) !important;
}
.navbar .nav-link, .navbar a.nav-link, .navbar .navbar-brand,
.navbar .navbar-text, .navbar .dropdown-toggle {
    color: var(--painter-navbar-text) !important;
    opacity: 1 !important;
}
.navbar .nav-link:hover, .navbar .dropdown-toggle:hover { opacity: .8 !important; }
.navbar .search-bar .form-control, .navbar .awesomplete input {
    background: rgba(255,255,255,.15) !important;
    border-color: rgba(255,255,255,.25) !important;
    color: var(--painter-navbar-text) !important;
    border-radius: 6px !important;
}
.navbar .search-bar .form-control::placeholder { color: rgba(255,255,255,.55) !important; }
.navbar svg, .navbar .notifications-icon svg { stroke: var(--painter-navbar-text) !important; fill: none !important; }
${s.hide_help_button ? ".navbar .help-link, .navbar [data-label='Help'] { display:none !important; }" : ""}
${s.hide_search_bar ? ".navbar .search-bar { display:none !important; }" : ""}

/* ── SIDEBAR ── */
.desk-sidebar, .layout-side-section {
    background-color: var(--painter-sidebar-bg) !important;
    border-right: 1px solid color-mix(in srgb, var(--painter-sidebar-active-bg) 20%, transparent) !important;
    width: var(--painter-sidebar-width) !important;
    min-width: var(--painter-sidebar-width) !important;
}
.desk-sidebar .standard-sidebar-item span,
.desk-sidebar .sidebar-item a { color: var(--painter-sidebar-text) !important; font-weight: 500 !important; }
.desk-sidebar .standard-sidebar-item { border-radius: 6px !important; margin: 1px 6px !important; position: relative; }
.desk-sidebar .standard-sidebar-item:hover { background: var(--painter-sidebar-hover-bg) !important; }
.desk-sidebar .standard-sidebar-item.selected,
.desk-sidebar .standard-sidebar-item.active { background: var(--painter-sidebar-active-bg) !important; }
.desk-sidebar .standard-sidebar-item.selected span,
.desk-sidebar .standard-sidebar-item.active span { color: var(--painter-sidebar-active-text) !important; font-weight: 600 !important; }
.desk-sidebar .standard-sidebar-item.selected svg,
.desk-sidebar .standard-sidebar-item.active svg { stroke: var(--painter-sidebar-active-text) !important; }
.desk-sidebar .standard-sidebar-item.selected::after {
    content: ""; position: absolute; right: 0; top: 20%; height: 60%; width: 3px;
    background: var(--painter-navbar-accent); border-radius: 3px 0 0 3px;
}

/* ── BODY & TYPOGRAPHY ── */
body, .page-container { background-color: var(--painter-body-bg) !important; font-family: var(--painter-font) !important; font-size: var(--painter-font-size) !important; }
.page-head, .page-body { background-color: var(--painter-content-bg) !important; }
.title-text, h1.title-text { color: var(--painter-heading) !important; font-weight: 700 !important; }
a:not(.btn):not(.nav-link):not(.navbar-brand):not(.dropdown-item) { color: var(--painter-link) !important; }

/* ── BUTTONS ── */
.btn-primary { background-color: var(--painter-btn-bg) !important; border-color: var(--painter-btn-hover) !important; color: var(--painter-btn-text) !important; border-radius: var(--painter-btn-radius) !important; }
.btn-primary:hover, .btn-primary:focus { background-color: var(--painter-btn-hover) !important; box-shadow: 0 2px 8px rgba(0,0,0,.2) !important; }

/* ── FORM SECTIONS ── */
.section-head, .form-section .section-head {
    color: var(--painter-section-color) !important; font-weight: 600 !important;
    border-bottom: 2px solid var(--painter-section-border) !important; padding-bottom: 5px !important;
}
.frappe-control label.control-label { color: var(--painter-label) !important; font-size: 12px !important; font-weight: 600 !important; }
.frappe-control .form-control, .frappe-control input, .frappe-control textarea, .frappe-control select {
    border-color: var(--painter-field-border) !important; border-radius: 5px !important;
}
.frappe-control .form-control:focus, .frappe-control input:focus, .frappe-control textarea:focus {
    border-color: var(--painter-field-focus) !important;
    box-shadow: 0 0 0 3px rgba(var(--painter-field-focus-rgb), .12) !important;
}

/* ── TABS ── */
.nav-tabs .nav-link { color: color-mix(in srgb, var(--painter-sidebar-active-bg) 60%, #888) !important; border: none !important; border-bottom: 2px solid transparent !important; }
.nav-tabs .nav-link.active { color: var(--painter-heading) !important; border-bottom: 2px solid var(--painter-btn-bg) !important; font-weight: 700 !important; background: transparent !important; }

/* ── LIST VIEW ── */
.list-row:hover { border-left: 3px solid var(--painter-navbar-accent) !important; background: color-mix(in srgb, var(--painter-btn-bg) 5%, white) !important; }

/* ── WIDGETS / CARDS ── */
.widget.shortcut-widget-box { border-top: 3px solid var(--painter-btn-bg) !important; border-radius: 8px !important; transition: all .2s ease !important; }
.widget.shortcut-widget-box:hover { border-top-color: var(--painter-navbar-accent) !important; box-shadow: 0 6px 20px rgba(0,0,0,.1) !important; transform: translateY(-2px) !important; }

/* ── MODALS ── */
.modal-header { background-color: var(--painter-sidebar-active-bg) !important; border-radius: 8px 8px 0 0 !important; }
.modal-header .modal-title { color: var(--painter-sidebar-active-text) !important; font-weight: 600 !important; }
.modal-header .btn-modal-close { color: var(--painter-sidebar-active-text) !important; }
.modal-content { border-radius: 8px !important; box-shadow: 0 10px 40px rgba(0,0,0,.15) !important; }

/* ── SCROLLBAR ── */
::-webkit-scrollbar { width: 5px; height: 5px; }
::-webkit-scrollbar-thumb { background: color-mix(in srgb, var(--painter-btn-bg) 40%, #ccc); border-radius: 4px; }
::-webkit-scrollbar-thumb:hover { background: var(--painter-btn-bg); }

/* ── CUSTOM CSS ── */
${s.custom_css || ""}
        `.trim();

        // Inject or update style tag
        let tag = document.getElementById("frappe-painter-style");
        if (!tag) {
            tag = document.createElement("style");
            tag.id = "frappe-painter-style";
            document.head.appendChild(tag);
        }
        tag.textContent = css;

        // Custom app name
        if (s.custom_app_name) {
            document.querySelectorAll(".navbar-brand .app-name, .navbar .app-name").forEach(el => {
                el.textContent = s.custom_app_name;
            });
        }

        // Custom logo
        if (s.custom_logo) {
            document.querySelectorAll(".navbar-brand img, .navbar .app-logo img").forEach(el => {
                el.src = s.custom_logo;
                el.style.maxHeight = "36px";
            });
        }
    }

    function loadTheme() {
        // Try cache first
        try {
            const cached = localStorage.getItem(CACHE_KEY);
            if (cached) {
                const { ts, data } = JSON.parse(cached);
                if (Date.now() - ts < CACHE_TTL) {
                    applyTheme(data);
                    return;
                }
            }
        } catch (_) {}

        // Fetch fresh from server
        frappe.call({
            method: "frappe_painter.doctype.painter_settings.painter_settings.get_settings",
            callback: function (r) {
                if (r.message) {
                    applyTheme(r.message);
                    try {
                        localStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), data: r.message }));
                    } catch (_) {}
                }
            }
        });
    }

    // Apply on load and on every page change
    $(document).on("page-change", loadTheme);
    frappe.after_ajax(loadTheme);
    $(loadTheme);

    // Expose globally so Settings page can trigger live preview
    window.frappe_painter = { reload: loadTheme, clearCache: () => localStorage.removeItem(CACHE_KEY) };

})();
