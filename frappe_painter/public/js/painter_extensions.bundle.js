/**
 * Frappe Painter — Advanced UI Engine Extension
 * Adds: Theme Switcher Modal, User Menu Sidebar, Workspace Background Image,
 *       Quick Edit pencil icons, Filter display enhancements, Sticky headers
 */
(function () {
    "use strict";

    // ── Theme Switcher Modal ─────────────────────────────────────────────────
    function buildThemeSwitcherCSS() {
        return `
/* ── THEME SWITCHER MODAL ──────────────────────────── */
#fp-theme-switcher-overlay {
    position: fixed; inset: 0; z-index: 9999;
    background: rgba(0,0,0,.5);
    display: flex; align-items: center; justify-content: center;
    backdrop-filter: blur(4px); -webkit-backdrop-filter: blur(4px);
    animation: fp-fadein 0.18s ease;
}
#fp-theme-switcher-modal {
    background: #fff; border-radius: 12px;
    box-shadow: 0 24px 80px rgba(0,0,0,.2);
    width: min(780px, 96vw); max-height: 85vh;
    display: flex; flex-direction: column; overflow: hidden;
}
#fp-theme-switcher-modal .fp-tsm-header {
    display: flex; align-items: center; justify-content: space-between;
    padding: 20px 24px 16px; border-bottom: 1px solid #f0f0f0;
}
#fp-theme-switcher-modal .fp-tsm-title {
    font-size: 16px; font-weight: 700; color: #1a1a2e; margin: 0;
}
#fp-theme-switcher-modal .fp-tsm-close {
    background: none; border: none; cursor: pointer;
    color: #666; font-size: 20px; padding: 4px 8px; border-radius: 6px;
    transition: background 0.15s;
}
#fp-theme-switcher-modal .fp-tsm-close:hover { background: #f5f5f5; }
#fp-theme-switcher-modal .fp-tsm-body {
    padding: 20px 24px; overflow-y: auto; flex: 1;
}
#fp-theme-switcher-modal .fp-tsm-grid {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px;
}
@media (max-width: 560px) {
    #fp-theme-switcher-modal .fp-tsm-grid { grid-template-columns: repeat(2, 1fr); }
}
#fp-theme-switcher-modal .fp-tsm-card {
    border: 2px solid #e8e8e8; border-radius: 10px; padding: 14px 14px 10px;
    cursor: pointer; transition: border-color 0.15s, box-shadow 0.15s, transform 0.15s;
    text-align: center; background: #fafafa;
}
#fp-theme-switcher-modal .fp-tsm-card:hover {
    border-color: var(--fp-navbar-accent, #1A237E);
    box-shadow: 0 4px 16px rgba(0,0,0,.1); transform: translateY(-2px);
}
#fp-theme-switcher-modal .fp-tsm-card.fp-active {
    border-color: var(--fp-navbar-accent, #1A237E);
    background: rgba(var(--fp-accent-rgb, 26,35,126),.06);
}
#fp-theme-switcher-modal .fp-tsm-card-name {
    font-size: 12px; font-weight: 600; color: #333; margin-bottom: 8px;
}
#fp-theme-switcher-modal .fp-tsm-swatches {
    display: flex; gap: 4px; justify-content: center; align-items: center; flex-wrap: wrap;
}
#fp-theme-switcher-modal .fp-tsm-swatch {
    width: 18px; height: 18px; border-radius: 50%;
    border: 2px solid rgba(255,255,255,.8);
    box-shadow: 0 1px 3px rgba(0,0,0,.25);
    display: inline-block; flex-shrink: 0;
}
#fp-theme-switcher-modal .fp-tsm-applying {
    font-size: 11px; color: #888; margin-top: 6px;
}

/* ── USER MENU SIDEBAR ─────────────────────────────── */
#fp-user-menu-sidebar {
    position: fixed; top: 0; right: 0; bottom: 0;
    width: 280px; z-index: 9998;
    background: #fff; box-shadow: -8px 0 40px rgba(0,0,0,.15);
    display: flex; flex-direction: column;
    transform: translateX(100%);
    transition: transform 0.28s cubic-bezier(0.4,0,0.2,1);
    overflow: hidden;
}
#fp-user-menu-sidebar.fp-open { transform: translateX(0); }
#fp-user-menu-sidebar .fp-ums-backdrop {
    position: fixed; inset: 0; z-index: -1; background: rgba(0,0,0,.3);
    opacity: 0; transition: opacity 0.28s;
}
#fp-user-menu-sidebar.fp-open .fp-ums-backdrop { opacity: 1; }
#fp-user-menu-sidebar .fp-ums-header {
    display: flex; align-items: center; justify-content: space-between;
    padding: 16px 20px; border-bottom: 1px solid #f0f0f0;
}
#fp-user-menu-sidebar .fp-ums-title {
    font-size: 14px; font-weight: 700; color: #1a1a2e;
}
#fp-user-menu-sidebar .fp-ums-close {
    background: none; border: none; cursor: pointer;
    color: #666; font-size: 18px; padding: 4px; border-radius: 6px;
}
#fp-user-menu-sidebar .fp-ums-close:hover { background: #f5f5f5; }
#fp-user-menu-sidebar .fp-ums-profile {
    padding: 20px; display: flex; align-items: center; gap: 14px;
    background: var(--fp-sidebar-act-bg, #1A237E); color: #fff;
}
#fp-user-menu-sidebar .fp-ums-avatar {
    width: 44px; height: 44px; border-radius: 50%;
    background: rgba(255,255,255,.25); display: flex;
    align-items: center; justify-content: center;
    font-size: 18px; font-weight: 700; flex-shrink: 0;
    overflow: hidden;
}
#fp-user-menu-sidebar .fp-ums-avatar img { width: 100%; height: 100%; object-fit: cover; }
#fp-user-menu-sidebar .fp-ums-info { flex: 1; min-width: 0; }
#fp-user-menu-sidebar .fp-ums-name {
    font-weight: 700; font-size: 14px; color: #fff;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
#fp-user-menu-sidebar .fp-ums-email {
    font-size: 11px; color: rgba(255,255,255,.75); margin-top: 2px;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
#fp-user-menu-sidebar .fp-ums-nav { flex: 1; overflow-y: auto; padding: 8px 0; }
#fp-user-menu-sidebar .fp-ums-item {
    display: flex; align-items: center; gap: 12px;
    padding: 10px 20px; cursor: pointer; color: #333;
    font-size: 13.5px; font-weight: 500;
    transition: background 0.12s; text-decoration: none;
    border: none; background: none; width: 100%; text-align: left;
}
#fp-user-menu-sidebar .fp-ums-item:hover { background: #f5f7fa; color: #1a1a2e; }
#fp-user-menu-sidebar .fp-ums-item svg { opacity: 0.55; flex-shrink: 0; }
#fp-user-menu-sidebar .fp-ums-divider {
    height: 1px; background: #f0f0f0; margin: 4px 0;
}
#fp-user-menu-sidebar .fp-ums-item.fp-danger { color: #c0392b; }
#fp-user-menu-sidebar .fp-ums-item.fp-danger:hover { background: #fff5f5; }
#fp-user-menu-sidebar .fp-ums-item.fp-danger svg { opacity: 0.7; }

/* Workspace background image */
.fp-workspace-bg .layout-main-section-wrapper,
.fp-workspace-bg .layout-main,
.fp-workspace-bg body {
    position: relative;
}
`;
    }

    // ── User Menu Sidebar ────────────────────────────────────────────────────
    let _ums = null;
    let _umsBackdrop = null;

    function iconSvg(path, size) {
        size = size || 16;
        return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${path}</svg>`;
    }

    const ICONS = {
        profile: '<circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>',
        settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
        session: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 3H8a2 2 0 0 0-2 2v2h12V5a2 2 0 0 0-2-2z"/>',
        reload: '<polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>',
        website: '<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
        apps: '<rect x="2" y="2" width="9" height="9" rx="1"/><rect x="13" y="2" width="9" height="9" rx="1"/><rect x="2" y="13" width="9" height="9" rx="1"/><rect x="13" y="13" width="9" height="9" rx="1"/>',
        fullwidth: '<path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>',
        theme: '<circle cx="12" cy="12" r="10"/><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>',
        logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>',
        palette: '<circle cx="13.5" cy="6.5" r="1.5"/><circle cx="17.5" cy="10.5" r="1.5"/><circle cx="8.5" cy="7.5" r="1.5"/><circle cx="6.5" cy="12.5" r="1.5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>',
    };

    function setupUserMenuSidebar(s) {
        // Remove existing
        const existing = document.getElementById("fp-user-menu-sidebar");
        if (existing) existing.remove();

        if (!s.enable_user_menu_sidebar) return;

        // Build sidebar
        const sidebar = document.createElement("div");
        sidebar.id = "fp-user-menu-sidebar";

        const backdrop = document.createElement("div");
        backdrop.className = "fp-ums-backdrop";
        backdrop.addEventListener("click", closeUserMenu);
        sidebar.appendChild(backdrop);
        _umsBackdrop = backdrop;

        // Header
        const header = document.createElement("div");
        header.className = "fp-ums-header";
        header.innerHTML = `<span class="fp-ums-title">User Menu</span>
            <button class="fp-ums-close" aria-label="Close">&times;</button>`;
        header.querySelector(".fp-ums-close").addEventListener("click", closeUserMenu);
        sidebar.appendChild(header);

        // Profile section
        const profile = document.createElement("div");
        profile.className = "fp-ums-profile";
        profile.id = "fp-ums-profile";
        sidebar.appendChild(profile);

        // Nav
        const nav = document.createElement("nav");
        nav.className = "fp-ums-nav";
        nav.id = "fp-ums-nav";
        sidebar.appendChild(nav);

        document.body.appendChild(sidebar);
        _ums = sidebar;

        // Intercept navbar user avatar click
        interceptUserMenuClick(s);
    }

    function populateUserMenu(s) {
        const profile = document.getElementById("fp-ums-profile");
        const nav = document.getElementById("fp-ums-nav");
        if (!profile || !nav) return;

        // Get user info from frappe session
        const user = frappe.session && frappe.session.user || "Administrator";
        const fullName = (frappe.boot && frappe.boot.user && frappe.boot.user.fullname) || user;
        const email = (frappe.boot && frappe.boot.user && frappe.boot.user.email) || user;
        const userImage = (frappe.boot && frappe.boot.user && frappe.boot.user.image) || "";
        const initial = fullName.charAt(0).toUpperCase();

        profile.innerHTML = `
            <div class="fp-ums-avatar">
                ${userImage
                    ? `<img src="${userImage}" alt="${fullName}">`
                    : `<span>${initial}</span>`}
            </div>
            <div class="fp-ums-info">
                <div class="fp-ums-name">${fullName}</div>
                <div class="fp-ums-email">${email}</div>
            </div>`;

        const items = [
            { label: "My Profile", icon: "profile", action: () => frappe.set_route("Form", "User", user) },
            { label: "My Settings", icon: "settings", action: () => frappe.set_route("Form", "User", user) },
            { label: "Session Defaults", icon: "session", action: () => frappe.set_route("Form", "Session Default") },
            { divider: true },
            { label: "Reload", icon: "reload", action: () => location.reload() },
            { label: "View Website", icon: "website", action: () => window.open("/", "_blank") },
            { label: "Apps", icon: "apps", action: () => window.open("/apps", "_blank") },
            { divider: true },
            { label: "Toggle Full Width", icon: "fullwidth", action: () => { document.body.classList.toggle("full-width"); } },
            { label: "Toggle Theme", icon: "theme", action: () => { frappe.call({ method: "frappe.client.get_value", args: { doctype: "User", filters: { name: user }, fieldname: "desk_theme" }, callback: function(r) {} }); } },
        ];

        if (s.enable_theme_switcher) {
            items.push({ label: "Theme Switcher", icon: "palette", action: () => { closeUserMenu(); openThemeSwitcher(); } });
        }

        items.push({ divider: true });
        items.push({ label: "Log out", icon: "logout", action: () => frappe.app.logout(), danger: true });

        nav.innerHTML = "";
        items.forEach(function(item) {
            if (item.divider) {
                const divider = document.createElement("div");
                divider.className = "fp-ums-divider";
                nav.appendChild(divider);
                return;
            }
            const btn = document.createElement("button");
            btn.className = "fp-ums-item" + (item.danger ? " fp-danger" : "");
            btn.innerHTML = `${iconSvg(ICONS[item.icon] || "", 16)}<span>${item.label}</span>`;
            btn.addEventListener("click", function() {
                closeUserMenu();
                setTimeout(item.action, 50);
            });
            nav.appendChild(btn);
        });
    }

    function openUserMenu(s) {
        if (!_ums) return;
        populateUserMenu(s);
        _ums.classList.add("fp-open");
        document.body.style.overflow = "hidden";
    }

    function closeUserMenu() {
        if (!_ums) return;
        _ums.classList.remove("fp-open");
        document.body.style.overflow = "";
    }

    function interceptUserMenuClick(s) {
        // Use event delegation - intercept clicks on the navbar user image/avatar
        document.addEventListener("click", function(e) {
            const target = e.target.closest(".navbar-user, .dropdown-toggle[data-toggle='dropdown'], .nav-item.dropdown");
            if (target && target.closest(".navbar")) {
                // Check if it's the user dropdown (has avatar or user name)
                if (target.querySelector("img.avatar-medium, .avatar.avatar-medium, [class*='avatar']") ||
                    target.classList.contains("navbar-user")) {
                    e.preventDefault();
                    e.stopPropagation();
                    openUserMenu(s);
                }
            }
        }, true);

        document.addEventListener("keydown", function(e) {
            if (e.key === "Escape") closeUserMenu();
        });
    }

    // ── Theme Switcher ───────────────────────────────────────────────────────
    let _themeSwitcherOpen = false;

    function openThemeSwitcher() {
        if (_themeSwitcherOpen) return;
        _themeSwitcherOpen = true;

        const overlay = document.createElement("div");
        overlay.id = "fp-theme-switcher-overlay";

        const modal = document.createElement("div");
        modal.id = "fp-theme-switcher-modal";

        modal.innerHTML = `
            <div class="fp-tsm-header">
                <h3 class="fp-tsm-title">Choose Theme</h3>
                <button class="fp-tsm-close" aria-label="Close">&times;</button>
            </div>
            <div class="fp-tsm-body">
                <div class="fp-tsm-grid" id="fp-tsm-grid">
                    <div style="grid-column:1/-1;text-align:center;padding:24px;color:#999;font-size:13px;">
                        Loading themes…
                    </div>
                </div>
            </div>`;

        overlay.appendChild(modal);
        document.body.appendChild(overlay);

        modal.querySelector(".fp-tsm-close").addEventListener("click", closeThemeSwitcher);
        overlay.addEventListener("click", function(e) {
            if (e.target === overlay) closeThemeSwitcher();
        });
        document.addEventListener("keydown", handleThemeSwitcherKey);

        // Load themes
        frappe.call({
            method: "frappe_painter.frappe_painter.doctype.painter_theme.painter_theme.get_all_themes",
            freeze: false,
            callback: function(r) {
                const themes = (r && r.message) || [];
                renderThemeCards(themes);
            },
            error: function() {
                renderThemeCards([]);
            }
        });
    }

    function renderThemeCards(themes) {
        const grid = document.getElementById("fp-tsm-grid");
        if (!grid) return;

        if (!themes.length) {
            // Try to install presets automatically
            frappe.call({
                method: "frappe_painter.frappe_painter.doctype.painter_theme.painter_theme.install_preset_themes",
                callback: function(r) {
                    frappe.call({
                        method: "frappe_painter.frappe_painter.doctype.painter_theme.painter_theme.get_all_themes",
                        callback: function(r2) {
                            renderThemeCards((r2 && r2.message) || []);
                        }
                    });
                }
            });
            grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:24px;color:#999;">Installing themes…</div>`;
            return;
        }

        grid.innerHTML = "";
        themes.forEach(function(theme) {
            const card = document.createElement("div");
            card.className = "fp-tsm-card";
            card.setAttribute("data-theme", theme.theme_name);

            // Swatches: primary, secondary/sidebar_active, accent, body, content
            const swatchColors = [
                theme.navbar_bg || theme.primary_color,
                theme.sidebar_active_bg || theme.secondary_color,
                theme.accent_color || theme.primary_color,
                theme.body_bg || "#f5f5f5",
                theme.content_bg || "#ffffff",
                theme.btn_primary_bg || theme.primary_color,
            ].filter(Boolean);

            const swatchesHtml = swatchColors.map(c =>
                `<span class="fp-tsm-swatch" style="background:${c}"></span>`
            ).join("");

            card.innerHTML = `
                <div class="fp-tsm-card-name">${theme.theme_name}</div>
                <div class="fp-tsm-swatches">${swatchesHtml}</div>
                <div class="fp-tsm-applying" id="fp-tsm-applying-${theme.theme_name.replace(/\s+/g,'_')}"></div>`;

            card.addEventListener("click", function() {
                applyNamedTheme(theme.theme_name);
            });

            grid.appendChild(card);
        });
    }

    function applyNamedTheme(themeName) {
        // Visual feedback
        document.querySelectorAll("#fp-tsm-grid .fp-tsm-card").forEach(c => c.classList.remove("fp-active"));
        const activeCard = document.querySelector(`#fp-tsm-grid [data-theme="${themeName}"]`);
        if (activeCard) {
            activeCard.classList.add("fp-active");
            const applyEl = activeCard.querySelector(".fp-tsm-applying");
            if (applyEl) applyEl.textContent = "Applying…";
        }

        frappe.call({
            method: "frappe_painter.frappe_painter.doctype.painter_theme.painter_theme.apply_theme",
            args: { theme_name: themeName },
            freeze: false,
            callback: function(r) {
                if (r && r.message && r.message.success) {
                    // Clear cache and reload theme
                    try { localStorage.removeItem("fp_theme_v6"); } catch(_) {}
                    if (window.frappe_painter) {
                        window.frappe_painter.reload();
                    }
                    setTimeout(function() {
                        closeThemeSwitcher();
                        frappe.show_alert({ message: `Theme "${themeName}" applied!`, indicator: "green" }, 3);
                    }, 400);
                }
            }
        });
    }

    function closeThemeSwitcher() {
        _themeSwitcherOpen = false;
        const overlay = document.getElementById("fp-theme-switcher-overlay");
        if (overlay) overlay.remove();
        document.removeEventListener("keydown", handleThemeSwitcherKey);
    }

    function handleThemeSwitcherKey(e) {
        if (e.key === "Escape") closeThemeSwitcher();
    }

    // ── Workspace Background Image ───────────────────────────────────────────
    function applyWorkspaceBg(s) {
        const styleId = "fp-workspace-bg-style";
        let tag = document.getElementById(styleId);

        if (!s.workspace_bg_image) {
            if (tag) tag.remove();
            return;
        }

        if (!tag) {
            tag = document.createElement("style");
            tag.id = styleId;
            document.head.appendChild(tag);
        }

        tag.textContent = `
/* ── WORKSPACE BACKGROUND IMAGE ───────────────────── */
.desk-body[data-route="Workspaces"] .layout-main-section-wrapper,
.page-container[data-page-route="Workspaces"] {
    background-image: url('${s.workspace_bg_image}') !important;
    background-size: cover !important;
    background-position: center !important;
    background-repeat: no-repeat !important;
    background-attachment: fixed !important;
}
.desk-body[data-route="Workspaces"] .widget-group,
.desk-body[data-route="Workspaces"] .widget.shortcut-widget-box {
    background: rgba(255,255,255,0.92) !important;
    backdrop-filter: blur(4px) !important;
    -webkit-backdrop-filter: blur(4px) !important;
    border-radius: 12px !important;
}
/* Also catch ERPNext workspace page */
[data-route="Workspaces"] .layout-main-section {
    background: transparent !important;
}`;
    }

    // ── Enhanced List View Features ──────────────────────────────────────────
    function enhanceListView() {
        // Quick Edit pencil icon injection
        observeListRows();
    }

    function observeListRows() {
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(m) {
                m.addedNodes.forEach(function(node) {
                    if (node.nodeType === 1) {
                        injectPencilIcons(node);
                    }
                });
            });
        });
        observer.observe(document.body, { childList: true, subtree: true });
        injectPencilIcons(document.body);
    }

    function injectPencilIcons(root) {
        // Only inject in list views, not already processed rows
        root.querySelectorAll(".list-row:not([data-fp-pencil]) .level-item.list-row-col:first-child .list-id").forEach(function(idEl) {
            const row = idEl.closest(".list-row");
            if (!row || row.dataset.fpPencil) return;
            row.dataset.fpPencil = "1";

            const pencil = document.createElement("span");
            pencil.className = "fp-quick-edit-pencil";
            pencil.title = "Quick Edit";
            pencil.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;margin-right:4px;color:#e74c3c;cursor:pointer;"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`;

            pencil.addEventListener("click", function(e) {
                e.preventDefault();
                e.stopPropagation();
                const link = idEl.querySelector("a") || idEl;
                const href = link.href || "";
                const match = href.match(/\/([^\/]+)\/([^\/]+)$/);
                if (match) {
                    const [, doctype, name] = match;
                    frappe.set_route("Form", decodeURIComponent(doctype), decodeURIComponent(name));
                } else {
                    link.click && link.click();
                }
            });

            idEl.insertBefore(pencil, idEl.firstChild);
        });
    }

    // ── Inject extra CSS for extended features ───────────────────────────────
    function injectExtensionCSS() {
        const styleId = "fp-extension-style";
        if (document.getElementById(styleId)) return;

        const style = document.createElement("style");
        style.id = styleId;
        style.textContent = buildThemeSwitcherCSS();
        document.head.appendChild(style);
    }

    // ── Add Theme Switcher to navbar ─────────────────────────────────────────
    function addThemeSwitcherToNavbar(s) {
        if (!s.enable_theme_switcher) return;

        // Add as an icon button in the navbar if not via user menu sidebar
        const existing = document.getElementById("fp-navbar-theme-btn");
        if (existing || s.enable_user_menu_sidebar) return;

        const navbar = document.querySelector(".navbar .navbar-right, .navbar .navbar-nav");
        if (!navbar) return;

        const btn = document.createElement("li");
        btn.id = "fp-navbar-theme-btn";
        btn.className = "nav-item";
        btn.style.cssText = "display:flex;align-items:center;cursor:pointer;";
        btn.title = "Choose Theme";
        btn.innerHTML = `<a class="nav-link" style="display:flex;align-items:center;padding:0 10px;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="opacity:.85;">
                <circle cx="13.5" cy="6.5" r="1.5"/><circle cx="17.5" cy="10.5" r="1.5"/>
                <circle cx="8.5" cy="7.5" r="1.5"/><circle cx="6.5" cy="12.5" r="1.5"/>
                <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>
            </svg>
        </a>`;
        btn.addEventListener("click", openThemeSwitcher);
        navbar.insertBefore(btn, navbar.firstChild);
    }

    // ── Main init ─────────────────────────────────────────────────────────────
    function initExtensions(s) {
        injectExtensionCSS();
        applyWorkspaceBg(s);
        setupUserMenuSidebar(s);
        addThemeSwitcherToNavbar(s);
        enhanceListView();
    }

    // ── Hook into frappe_painter ─────────────────────────────────────────────
    function waitForPainterAndHook() {
        // Hook into frappe lifecycle
        function tryHook() {
            // After painter loads, also run extensions
            const origLoadTheme = window._fp_load_theme_orig;
            if (frappe && frappe.call) {
                // Load our settings alongside painter settings
                frappe.call({
                    method: "frappe_painter.frappe_painter.doctype.painter_settings.painter_settings.get_settings",
                    freeze: false,
                    callback: function(r) {
                        if (r && r.message && r.message.is_enabled) {
                            initExtensions(r.message);
                        }
                    }
                });
            }
        }

        $(document).on("page-change", tryHook);
        frappe.after_ajax(function() { tryHook(); });
        $(function() { setTimeout(tryHook, 200); });
    }

    // Expose public API for theme switcher
    window.fp_extensions = {
        openThemeSwitcher: openThemeSwitcher,
        closeThemeSwitcher: closeThemeSwitcher,
        installPresets: function() {
            frappe.call({
                method: "frappe_painter.frappe_painter.doctype.painter_theme.painter_theme.install_preset_themes",
                callback: function(r) {
                    frappe.show_alert({ message: "Preset themes installed!", indicator: "green" }, 3);
                }
            });
        }
    };

    waitForPainterAndHook();

})();