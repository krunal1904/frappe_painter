import frappe
from frappe.model.document import Document

# New-field defaults applied to every template that doesn't override them
_NEW_FIELD_DEFAULTS = {
    "btn_style": "default",
    "btn_hover_animation": "none",
    "nav_style": "sidebar",
    "layout_density": "comfortable",
    "page_width_mode": "full",
    "grid_menu_bg": "#1E3A8A",
    "grid_menu_card_style": "glass",
    "list_view_style": "default",
    "list_sticky_header": 0,
    "list_alternating_rows": 0,
    "list_row_style": "default",
    "form_layout": "default",
    "form_section_style": "default",
    "field_style": "default",
    "enable_glassmorphism": 0,
    "card_hover_effect": "none",
    "enable_page_animations": 0,
    "scrollbar_style": "thin",
    "workspace_style": "default",
    "shortcut_style": "default",
    "enable_rtl": 0,
}

TEMPLATES = {
    "business": {
        "navbar_bg": "#1E3A8A", "navbar_text_color": "#ffffff", "navbar_accent_color": "#72C02C",
        "navbar_height": "56px",
        "sidebar_bg": "#f2f6fc", "sidebar_text_color": "#2c3e6b",
        "sidebar_active_bg": "#1E3A8A", "sidebar_active_text": "#ffffff", "sidebar_hover_bg": "#dce8f7",
        "btn_primary_bg": "#2B4EAF", "btn_primary_text": "#ffffff", "btn_primary_hover": "#1E3A8A",
        "btn_secondary_bg": "#f4f5f6", "btn_secondary_text": "#333333", "btn_radius": "6px",
        "body_bg": "#f0f2f5", "content_bg": "#ffffff", "card_bg": "#ffffff",
        "card_border_color": "#e8eaed", "card_shadow": 1,
        "heading_color": "#1E3A8A", "text_color": "#333333", "link_color": "#2B4EAF",
        "section_head_color": "#2B4EAF", "section_border_color": "#72C02C",
        "field_bg": "#ffffff", "field_border_color": "#d0dbe8",
        "field_focus_color": "#2B4EAF", "label_color": "#4a6080",
        "table_header_bg": "#f4f5f6", "table_header_text": "#333333",
        "table_row_hover": "#f0f4ff", "table_border_color": "#e8eaed",
        "widget_bg": "#ffffff", "widget_border_color": "#e8eaed", "widget_shadow": 1,
        "number_card_bg": "#ffffff", "number_card_text": "#1E3A8A",
        "font_family": "'Inter', sans-serif", "font_size": "14px",
        "border_radius_sm": "4px", "border_radius_md": "8px", "border_radius_lg": "12px",
        "transition_speed": "normal (0.2s)",
        "login_bg_color": "#f0f4f8", "login_box_bg": "#ffffff", "login_box_shadow": 1,
        "login_btn_bg": "#1E3A8A", "login_btn_text": "#ffffff", "login_box_position": "center",
    },
    "hospital": {
        "navbar_bg": "#0d6e6e", "navbar_text_color": "#ffffff", "navbar_accent_color": "#4fc3a1",
        "navbar_height": "56px",
        "sidebar_bg": "#f0faf8", "sidebar_text_color": "#1a4a4a",
        "sidebar_active_bg": "#0d6e6e", "sidebar_active_text": "#ffffff", "sidebar_hover_bg": "#cceee8",
        "btn_primary_bg": "#0d6e6e", "btn_primary_text": "#ffffff", "btn_primary_hover": "#094f4f",
        "btn_secondary_bg": "#e8f7f5", "btn_secondary_text": "#0d6e6e", "btn_radius": "8px",
        "body_bg": "#f5fdfb", "content_bg": "#ffffff", "card_bg": "#ffffff",
        "card_border_color": "#b2e0d6", "card_shadow": 1,
        "heading_color": "#0d6e6e", "text_color": "#1a2a2a", "link_color": "#0d8c8c",
        "section_head_color": "#0d6e6e", "section_border_color": "#4fc3a1",
        "field_bg": "#f8fffd", "field_border_color": "#b2e0d6",
        "field_focus_color": "#0d8c8c", "label_color": "#1a4a4a",
        "table_header_bg": "#e0f7f2", "table_header_text": "#0d6e6e",
        "table_row_hover": "#f0faf8", "table_border_color": "#c0e8e0",
        "widget_bg": "#ffffff", "widget_border_color": "#b2e0d6", "widget_shadow": 1,
        "number_card_bg": "#f0faf8", "number_card_text": "#0d6e6e",
        "font_family": "'Nunito', sans-serif", "font_size": "14px",
        "border_radius_sm": "6px", "border_radius_md": "10px", "border_radius_lg": "16px",
        "transition_speed": "normal (0.2s)",
        "login_bg_color": "#e6f7f4", "login_box_bg": "#ffffff", "login_box_shadow": 1,
        "login_btn_bg": "#0d6e6e", "login_btn_text": "#ffffff", "login_box_position": "center",
        "btn_style": "rounded", "card_hover_effect": "lift", "enable_page_animations": 1,
    },
    "audit": {
        "navbar_bg": "#1a1a2e", "navbar_text_color": "#e8e8f0", "navbar_accent_color": "#f0a500",
        "navbar_height": "56px",
        "sidebar_bg": "#f5f5f0", "sidebar_text_color": "#2a2a3e",
        "sidebar_active_bg": "#1a1a2e", "sidebar_active_text": "#ffffff", "sidebar_hover_bg": "#e8e8e0",
        "btn_primary_bg": "#1a1a2e", "btn_primary_text": "#ffffff", "btn_primary_hover": "#0d0d1e",
        "btn_secondary_bg": "#f0f0e8", "btn_secondary_text": "#1a1a2e", "btn_radius": "4px",
        "body_bg": "#f2f2ec", "content_bg": "#ffffff", "card_bg": "#ffffff",
        "card_border_color": "#d8d8cc", "card_shadow": 0,
        "heading_color": "#1a1a2e", "text_color": "#2a2a3e", "link_color": "#c08000",
        "section_head_color": "#1a1a2e", "section_border_color": "#f0a500",
        "field_bg": "#fafaf8", "field_border_color": "#c8c8bc",
        "field_focus_color": "#f0a500", "label_color": "#3a3a4e",
        "table_header_bg": "#e8e8e0", "table_header_text": "#1a1a2e",
        "table_row_hover": "#f0f0e8", "table_border_color": "#d0d0c8",
        "widget_bg": "#ffffff", "widget_border_color": "#d8d8cc", "widget_shadow": 0,
        "number_card_bg": "#fafaf8", "number_card_text": "#1a1a2e",
        "font_family": "'IBM Plex Sans', sans-serif", "font_size": "14px",
        "border_radius_sm": "2px", "border_radius_md": "4px", "border_radius_lg": "6px",
        "transition_speed": "fast (0.1s)",
        "login_bg_color": "#e8e8dc", "login_box_bg": "#ffffff", "login_box_shadow": 0,
        "login_btn_bg": "#1a1a2e", "login_btn_text": "#ffffff", "login_box_position": "left",
        "layout_density": "compact", "list_view_style": "compact", "list_alternating_rows": 1,
    },
    "erpnext": {
        "navbar_bg": "#2490ef", "navbar_text_color": "#ffffff", "navbar_accent_color": "#ff9f40",
        "navbar_height": "56px",
        "sidebar_bg": "#f0f7ff", "sidebar_text_color": "#1a3a5c",
        "sidebar_active_bg": "#2490ef", "sidebar_active_text": "#ffffff", "sidebar_hover_bg": "#d0e8fc",
        "btn_primary_bg": "#2490ef", "btn_primary_text": "#ffffff", "btn_primary_hover": "#1870c0",
        "btn_secondary_bg": "#f0f7ff", "btn_secondary_text": "#1a3a5c", "btn_radius": "6px",
        "body_bg": "#f0f4f8", "content_bg": "#ffffff", "card_bg": "#ffffff",
        "card_border_color": "#d0e0f0", "card_shadow": 1,
        "heading_color": "#1a3a5c", "text_color": "#333333", "link_color": "#2490ef",
        "section_head_color": "#2490ef", "section_border_color": "#ff9f40",
        "field_bg": "#ffffff", "field_border_color": "#d0e0f0",
        "field_focus_color": "#2490ef", "label_color": "#1a3a5c",
        "table_header_bg": "#e8f3ff", "table_header_text": "#1a3a5c",
        "table_row_hover": "#f0f7ff", "table_border_color": "#d0e0f0",
        "widget_bg": "#ffffff", "widget_border_color": "#d0e0f0", "widget_shadow": 1,
        "number_card_bg": "#f0f7ff", "number_card_text": "#2490ef",
        "font_family": "'Inter', sans-serif", "font_size": "14px",
        "border_radius_sm": "4px", "border_radius_md": "8px", "border_radius_lg": "12px",
        "transition_speed": "normal (0.2s)",
        "login_bg_color": "#e8f3ff", "login_box_bg": "#ffffff", "login_box_shadow": 1,
        "login_btn_bg": "#2490ef", "login_btn_text": "#ffffff", "login_box_position": "center",
    },
    "government": {
        "navbar_bg": "#14532d", "navbar_text_color": "#ffffff", "navbar_accent_color": "#fbbf24",
        "navbar_height": "56px",
        "sidebar_bg": "#f0fdf4", "sidebar_text_color": "#14532d",
        "sidebar_active_bg": "#14532d", "sidebar_active_text": "#ffffff", "sidebar_hover_bg": "#d1fae5",
        "btn_primary_bg": "#15803d", "btn_primary_text": "#ffffff", "btn_primary_hover": "#14532d",
        "btn_secondary_bg": "#f0fdf4", "btn_secondary_text": "#14532d", "btn_radius": "4px",
        "body_bg": "#f0fdf4", "content_bg": "#ffffff", "card_bg": "#ffffff",
        "card_border_color": "#bbf7d0", "card_shadow": 0,
        "heading_color": "#14532d", "text_color": "#1a2e1a", "link_color": "#15803d",
        "section_head_color": "#14532d", "section_border_color": "#fbbf24",
        "field_bg": "#ffffff", "field_border_color": "#bbf7d0",
        "field_focus_color": "#15803d", "label_color": "#14532d",
        "table_header_bg": "#dcfce7", "table_header_text": "#14532d",
        "table_row_hover": "#f0fdf4", "table_border_color": "#bbf7d0",
        "widget_bg": "#ffffff", "widget_border_color": "#bbf7d0", "widget_shadow": 0,
        "number_card_bg": "#f0fdf4", "number_card_text": "#14532d",
        "font_family": "'DM Sans', sans-serif", "font_size": "14px",
        "border_radius_sm": "2px", "border_radius_md": "4px", "border_radius_lg": "8px",
        "transition_speed": "fast (0.1s)",
        "login_bg_color": "#dcfce7", "login_box_bg": "#ffffff", "login_box_shadow": 0,
        "login_btn_bg": "#14532d", "login_btn_text": "#ffffff", "login_box_position": "center",
        "list_sticky_header": 1, "list_row_style": "accent_left",
    },
    "retail": {
        "navbar_bg": "#7c3aed", "navbar_text_color": "#ffffff", "navbar_accent_color": "#f59e0b",
        "navbar_height": "64px",
        "sidebar_bg": "#faf5ff", "sidebar_text_color": "#3b1c6e",
        "sidebar_active_bg": "#7c3aed", "sidebar_active_text": "#ffffff", "sidebar_hover_bg": "#ede9fe",
        "btn_primary_bg": "#7c3aed", "btn_primary_text": "#ffffff", "btn_primary_hover": "#6d28d9",
        "btn_secondary_bg": "#f5f3ff", "btn_secondary_text": "#7c3aed", "btn_radius": "999px",
        "body_bg": "#faf5ff", "content_bg": "#ffffff", "card_bg": "#ffffff",
        "card_border_color": "#ddd6fe", "card_shadow": 1,
        "heading_color": "#5b21b6", "text_color": "#1e1b4b", "link_color": "#7c3aed",
        "section_head_color": "#7c3aed", "section_border_color": "#f59e0b",
        "field_bg": "#fdf4ff", "field_border_color": "#ddd6fe",
        "field_focus_color": "#7c3aed", "label_color": "#5b21b6",
        "table_header_bg": "#f5f3ff", "table_header_text": "#5b21b6",
        "table_row_hover": "#fdf4ff", "table_border_color": "#ddd6fe",
        "widget_bg": "#ffffff", "widget_border_color": "#ddd6fe", "widget_shadow": 1,
        "number_card_bg": "#faf5ff", "number_card_text": "#7c3aed",
        "font_family": "'Poppins', sans-serif", "font_size": "14px",
        "border_radius_sm": "8px", "border_radius_md": "14px", "border_radius_lg": "20px",
        "transition_speed": "normal (0.2s)",
        "login_bg_color": "#f5f3ff", "login_box_bg": "#ffffff", "login_box_shadow": 1,
        "login_btn_bg": "#7c3aed", "login_btn_text": "#ffffff", "login_box_position": "right",
        "btn_style": "pill", "nav_style": "grid_menu", "grid_menu_bg": "#7c3aed",
        "grid_menu_card_style": "glass", "card_hover_effect": "lift", "enable_page_animations": 1,
        "workspace_style": "card_grid", "shortcut_style": "large_icons",
    },
    "tech_startup": {
        "navbar_bg": "#0f172a", "navbar_text_color": "#e2e8f0", "navbar_accent_color": "#38bdf8",
        "navbar_height": "56px",
        "sidebar_bg": "#f8fafc", "sidebar_text_color": "#1e293b",
        "sidebar_active_bg": "#0f172a", "sidebar_active_text": "#38bdf8", "sidebar_hover_bg": "#e2e8f0",
        "btn_primary_bg": "#0ea5e9", "btn_primary_text": "#ffffff", "btn_primary_hover": "#0284c7",
        "btn_secondary_bg": "#f1f5f9", "btn_secondary_text": "#1e293b", "btn_radius": "6px",
        "body_bg": "#f1f5f9", "content_bg": "#ffffff", "card_bg": "#ffffff",
        "card_border_color": "#e2e8f0", "card_shadow": 1,
        "heading_color": "#0f172a", "text_color": "#334155", "link_color": "#0ea5e9",
        "section_head_color": "#0f172a", "section_border_color": "#38bdf8",
        "field_bg": "#ffffff", "field_border_color": "#cbd5e1",
        "field_focus_color": "#0ea5e9", "label_color": "#475569",
        "table_header_bg": "#f1f5f9", "table_header_text": "#0f172a",
        "table_row_hover": "#f8fafc", "table_border_color": "#e2e8f0",
        "widget_bg": "#ffffff", "widget_border_color": "#e2e8f0", "widget_shadow": 1,
        "number_card_bg": "#f8fafc", "number_card_text": "#0ea5e9",
        "font_family": "'DM Sans', sans-serif", "font_size": "14px",
        "border_radius_sm": "4px", "border_radius_md": "8px", "border_radius_lg": "12px",
        "transition_speed": "fast (0.1s)",
        "login_bg_color": "#0f172a", "login_box_bg": "#1e293b", "login_box_shadow": 1,
        "login_btn_bg": "#0ea5e9", "login_btn_text": "#ffffff", "login_box_position": "right",
        "btn_style": "rounded", "btn_hover_animation": "glow", "nav_style": "minimal_sidebar",
        "list_view_style": "modern", "form_section_style": "card", "card_hover_effect": "glow",
        "enable_page_animations": 1, "scrollbar_style": "modern",
    },
    "dark": {
        "navbar_bg": "#0d1117", "navbar_text_color": "#c9d1d9", "navbar_accent_color": "#58a6ff",
        "navbar_height": "56px",
        "sidebar_bg": "#161b22", "sidebar_text_color": "#c9d1d9",
        "sidebar_active_bg": "#1f6feb", "sidebar_active_text": "#ffffff", "sidebar_hover_bg": "#21262d",
        "btn_primary_bg": "#238636", "btn_primary_text": "#ffffff", "btn_primary_hover": "#2ea043",
        "btn_secondary_bg": "#21262d", "btn_secondary_text": "#c9d1d9", "btn_radius": "6px",
        "body_bg": "#0d1117", "content_bg": "#161b22", "card_bg": "#161b22",
        "card_border_color": "#30363d", "card_shadow": 1,
        "heading_color": "#f0f6fc", "text_color": "#c9d1d9", "link_color": "#58a6ff",
        "section_head_color": "#58a6ff", "section_border_color": "#238636",
        "field_bg": "#0d1117", "field_border_color": "#30363d",
        "field_focus_color": "#58a6ff", "label_color": "#8b949e",
        "table_header_bg": "#161b22", "table_header_text": "#c9d1d9",
        "table_row_hover": "#21262d", "table_border_color": "#30363d",
        "widget_bg": "#161b22", "widget_border_color": "#30363d", "widget_shadow": 1,
        "number_card_bg": "#161b22", "number_card_text": "#58a6ff",
        "font_family": "'DM Sans', sans-serif", "font_size": "14px",
        "border_radius_sm": "6px", "border_radius_md": "8px", "border_radius_lg": "12px",
        "transition_speed": "fast (0.1s)",
        "login_bg_color": "#0d1117", "login_box_bg": "#161b22", "login_box_shadow": 1,
        "login_btn_bg": "#238636", "login_btn_text": "#ffffff", "login_box_position": "center",
        "btn_style": "rounded", "btn_hover_animation": "glow",
        "list_view_style": "modern", "list_alternating_rows": 1,
        "form_section_style": "card", "field_style": "outlined",
        "enable_glassmorphism": 1, "card_hover_effect": "glow",
        "enable_page_animations": 1, "scrollbar_style": "modern",
        "workspace_style": "card_grid",
    },
}

# Apply defaults so every template has all new fields
for _tname, _tdata in TEMPLATES.items():
    for _k, _v in _NEW_FIELD_DEFAULTS.items():
        _tdata.setdefault(_k, _v)

TRANSITION_MAP = {
    "none": "0s",
    "fast (0.1s)": "0.1s",
    "normal (0.2s)": "0.2s",
    "slow (0.4s)": "0.4s",
}


class PainterSettings(Document):
    def on_update(self):
        template = self.active_template
        if template and template != "custom":
            preset = TEMPLATES.get(template, {})
            if preset:
                for field, value in preset.items():
                    frappe.db.set_value("Painter Settings", "Painter Settings", field, value)
        frappe.cache().delete_key("painter_settings")


@frappe.whitelist()
def get_settings():
    """Called by JS on every page load."""
    cached = frappe.cache().get_value("painter_settings")
    if cached:
        return cached

    try:
        doc = frappe.get_single("Painter Settings")

        if not doc.is_enabled:
            return {"is_enabled": 0}

        trans = TRANSITION_MAP.get(doc.transition_speed or "normal (0.2s)", "0.2s")

        settings = {
            "is_enabled": 1,
            # Navbar
            "navbar_bg":            doc.navbar_bg or "#1E3A8A",
            "navbar_text_color":    doc.navbar_text_color or "#ffffff",
            "navbar_accent_color":  doc.navbar_accent_color or "#72C02C",
            "navbar_height":        doc.navbar_height or "56px",
            "hide_help_button":     doc.hide_help_button or 0,
            "hide_search_bar":      doc.hide_search_bar or 0,
            # Sidebar
            "sidebar_bg":           doc.sidebar_bg or "#f2f6fc",
            "sidebar_text_color":   doc.sidebar_text_color or "#2c3e6b",
            "sidebar_active_bg":    doc.sidebar_active_bg or "#1E3A8A",
            "sidebar_active_text":  doc.sidebar_active_text or "#ffffff",
            "sidebar_hover_bg":     doc.sidebar_hover_bg or "#dce8f7",
            "sidebar_width":        doc.sidebar_width or "240px",
            "sidebar_hide":         doc.sidebar_hide or 0,
            # Buttons
            "btn_primary_bg":       doc.btn_primary_bg or "#2B4EAF",
            "btn_primary_text":     doc.btn_primary_text or "#ffffff",
            "btn_primary_hover":    doc.btn_primary_hover or "#1E3A8A",
            "btn_secondary_bg":     doc.btn_secondary_bg or "#f4f5f6",
            "btn_secondary_text":   doc.btn_secondary_text or "#333333",
            "btn_radius":           doc.btn_radius or "6px",
            "btn_style":            doc.btn_style or "default",
            "btn_hover_animation":  doc.btn_hover_animation or "none",
            # Body
            "body_bg":              doc.body_bg or "#f0f2f5",
            "content_bg":           doc.content_bg or "#ffffff",
            "card_bg":              doc.card_bg or "#ffffff",
            "card_border_color":    doc.card_border_color or "#e8eaed",
            "card_shadow":          doc.card_shadow or 0,
            "heading_color":        doc.heading_color or "#1E3A8A",
            "text_color":           doc.text_color or "#333333",
            "link_color":           doc.link_color or "#2B4EAF",
            "font_family":          doc.font_family or "system-ui, sans-serif",
            "font_size":            doc.font_size or "14px",
            # Tables
            "table_header_bg":      doc.table_header_bg or "#f4f5f6",
            "table_header_text":    doc.table_header_text or "#333333",
            "table_row_hover":      doc.table_row_hover or "#f0f4ff",
            "table_border_color":   doc.table_border_color or "#e8eaed",
            "hide_like_comment":    doc.hide_like_comment or 0,
            # Forms
            "section_head_color":   doc.section_head_color or "#2B4EAF",
            "section_border_color": doc.section_border_color or "#72C02C",
            "field_bg":             doc.field_bg or "#ffffff",
            "field_border_color":   doc.field_border_color or "#d0dbe8",
            "field_focus_color":    doc.field_focus_color or "#2B4EAF",
            "label_color":          doc.label_color or "#4a6080",
            # Widgets
            "widget_bg":            doc.widget_bg or "#ffffff",
            "widget_border_color":  doc.widget_border_color or "#e8eaed",
            "widget_shadow":        doc.widget_shadow or 0,
            "number_card_bg":       doc.number_card_bg or "#ffffff",
            "number_card_text":     doc.number_card_text or "#1E3A8A",
            # Advanced
            "border_radius_sm":     doc.border_radius_sm or "4px",
            "border_radius_md":     doc.border_radius_md or "8px",
            "border_radius_lg":     doc.border_radius_lg or "12px",
            "transition":           trans,
            "custom_css":           doc.custom_css or "",
            # Branding
            "custom_app_name":      doc.custom_app_name or "",
            "custom_logo":          doc.custom_logo or "",
            "favicon_url":          doc.favicon_url or "",
            # Login
            "login_bg_type":        doc.login_bg_type or "color",
            "login_bg_color":       doc.login_bg_color or "#f0f4f8",
            "login_bg_image":       doc.login_bg_image or "",
            "login_box_position":   doc.login_box_position or "center",
            "login_box_bg":         doc.login_box_bg or "#ffffff",
            "login_box_shadow":     doc.login_box_shadow or 0,
            "login_title":          doc.login_title or "",
            "login_subtitle":       doc.login_subtitle or "",
            "login_btn_bg":         doc.login_btn_bg or "#1E3A8A",
            "login_btn_text":       doc.login_btn_text or "#ffffff",
            # Layout & Nav
            "nav_style":            doc.nav_style or "sidebar",
            "layout_density":       doc.layout_density or "comfortable",
            "page_width_mode":      doc.page_width_mode or "full",
            # Grid Menu
            "grid_menu_bg":         doc.grid_menu_bg or "#1E3A8A",
            "grid_menu_card_style": doc.grid_menu_card_style or "glass",
            # List View
            "list_view_style":      doc.list_view_style or "default",
            "list_sticky_header":   doc.list_sticky_header or 0,
            "list_alternating_rows": doc.list_alternating_rows or 0,
            "list_row_style":       doc.list_row_style or "default",
            # Form Layout
            "form_layout":          doc.form_layout or "default",
            "form_section_style":   doc.form_section_style or "default",
            "field_style":          doc.field_style or "default",
            # Effects
            "enable_glassmorphism": doc.enable_glassmorphism or 0,
            "card_hover_effect":    doc.card_hover_effect or "none",
            "enable_page_animations": doc.enable_page_animations or 0,
            "scrollbar_style":      doc.scrollbar_style or "thin",
            # Workspace
            "workspace_style":      doc.workspace_style or "default",
            "shortcut_style":       doc.shortcut_style or "default",
            # RTL
            "enable_rtl":           doc.enable_rtl or 0,
        }
        frappe.cache().set_value("painter_settings", settings, expires_in_sec=300)
        return settings
    except Exception:
        return {}
