import frappe
from frappe.model.document import Document

# ── Preset Templates ─────────────────────────────────────────────────────────
TEMPLATES = {
    "business": {
        "navbar_bg": "#1E3A8A", "navbar_text_color": "#ffffff", "navbar_accent_color": "#72C02C",
        "sidebar_bg": "#f2f6fc", "sidebar_text_color": "#2c3e6b",
        "sidebar_active_bg": "#1E3A8A", "sidebar_active_text": "#ffffff", "sidebar_hover_bg": "#dce8f7",
        "btn_primary_bg": "#2B4EAF", "btn_primary_text": "#ffffff", "btn_primary_hover": "#1E3A8A",
        "body_bg": "#ffffff", "content_bg": "#ffffff",
        "heading_color": "#1E3A8A", "link_color": "#2B4EAF",
        "section_color": "#2B4EAF", "section_border_color": "#72C02C",
        "field_focus_color": "#2B4EAF", "font_family": "'Inter', sans-serif",
    },
    "hospital": {
        "navbar_bg": "#0d6e6e", "navbar_text_color": "#ffffff", "navbar_accent_color": "#4fc3a1",
        "sidebar_bg": "#f0faf8", "sidebar_text_color": "#1a4a4a",
        "sidebar_active_bg": "#0d6e6e", "sidebar_active_text": "#ffffff", "sidebar_hover_bg": "#cceee8",
        "btn_primary_bg": "#0d6e6e", "btn_primary_text": "#ffffff", "btn_primary_hover": "#094f4f",
        "body_bg": "#f8fdfc", "content_bg": "#ffffff",
        "heading_color": "#0d6e6e", "link_color": "#0d8c8c",
        "section_color": "#0d6e6e", "section_border_color": "#4fc3a1",
        "field_focus_color": "#0d8c8c", "font_family": "'Nunito', sans-serif",
    },
    "audit": {
        "navbar_bg": "#1a1a2e", "navbar_text_color": "#e8e8f0", "navbar_accent_color": "#f0a500",
        "sidebar_bg": "#f5f5f0", "sidebar_text_color": "#2a2a3e",
        "sidebar_active_bg": "#1a1a2e", "sidebar_active_text": "#ffffff", "sidebar_hover_bg": "#e8e8e0",
        "btn_primary_bg": "#1a1a2e", "btn_primary_text": "#ffffff", "btn_primary_hover": "#0d0d1e",
        "body_bg": "#fafaf8", "content_bg": "#ffffff",
        "heading_color": "#1a1a2e", "link_color": "#c08000",
        "section_color": "#1a1a2e", "section_border_color": "#f0a500",
        "field_focus_color": "#f0a500", "font_family": "'IBM Plex Sans', sans-serif",
    },
    "erpnext": {
        "navbar_bg": "#2490ef", "navbar_text_color": "#ffffff", "navbar_accent_color": "#ff9f40",
        "sidebar_bg": "#f0f7ff", "sidebar_text_color": "#1a3a5c",
        "sidebar_active_bg": "#2490ef", "sidebar_active_text": "#ffffff", "sidebar_hover_bg": "#d0e8fc",
        "btn_primary_bg": "#2490ef", "btn_primary_text": "#ffffff", "btn_primary_hover": "#1870c0",
        "body_bg": "#ffffff", "content_bg": "#ffffff",
        "heading_color": "#1a3a5c", "link_color": "#2490ef",
        "section_color": "#2490ef", "section_border_color": "#ff9f40",
        "field_focus_color": "#2490ef", "font_family": "'Inter', sans-serif",
    },
    "government": {
        "navbar_bg": "#14532d", "navbar_text_color": "#ffffff", "navbar_accent_color": "#fbbf24",
        "sidebar_bg": "#f0fdf4", "sidebar_text_color": "#14532d",
        "sidebar_active_bg": "#14532d", "sidebar_active_text": "#ffffff", "sidebar_hover_bg": "#d1fae5",
        "btn_primary_bg": "#15803d", "btn_primary_text": "#ffffff", "btn_primary_hover": "#14532d",
        "body_bg": "#ffffff", "content_bg": "#ffffff",
        "heading_color": "#14532d", "link_color": "#15803d",
        "section_color": "#14532d", "section_border_color": "#fbbf24",
        "field_focus_color": "#15803d", "font_family": "'DM Sans', sans-serif",
    },
    "retail": {
        "navbar_bg": "#7c3aed", "navbar_text_color": "#ffffff", "navbar_accent_color": "#f59e0b",
        "sidebar_bg": "#faf5ff", "sidebar_text_color": "#3b1c6e",
        "sidebar_active_bg": "#7c3aed", "sidebar_active_text": "#ffffff", "sidebar_hover_bg": "#ede9fe",
        "btn_primary_bg": "#7c3aed", "btn_primary_text": "#ffffff", "btn_primary_hover": "#6d28d9",
        "body_bg": "#ffffff", "content_bg": "#ffffff",
        "heading_color": "#5b21b6", "link_color": "#7c3aed",
        "section_color": "#7c3aed", "section_border_color": "#f59e0b",
        "field_focus_color": "#7c3aed", "font_family": "'Poppins', sans-serif",
    },
    "tech_startup": {
        "navbar_bg": "#0f172a", "navbar_text_color": "#e2e8f0", "navbar_accent_color": "#38bdf8",
        "sidebar_bg": "#f8fafc", "sidebar_text_color": "#1e293b",
        "sidebar_active_bg": "#0f172a", "sidebar_active_text": "#38bdf8", "sidebar_hover_bg": "#e2e8f0",
        "btn_primary_bg": "#0ea5e9", "btn_primary_text": "#ffffff", "btn_primary_hover": "#0284c7",
        "body_bg": "#ffffff", "content_bg": "#ffffff",
        "heading_color": "#0f172a", "link_color": "#0ea5e9",
        "section_color": "#0f172a", "section_border_color": "#38bdf8",
        "field_focus_color": "#0ea5e9", "font_family": "'DM Sans', sans-serif",
    },
}


class PainterSettings(Document):
    def on_update(self):
        # When template is selected (not 'custom'), apply preset values
        if self.active_template and self.active_template != "custom":
            preset = TEMPLATES.get(self.active_template, {})
            for field, value in preset.items():
                self.set(field, value)
            # Reset back to custom so it stays editable
            self.db_set("active_template", "custom")
        frappe.cache().delete_key("painter_settings")


@frappe.whitelist()
def get_settings():
    """Called by JS on every page load — returns theme vars as JSON."""
    cached = frappe.cache().get_value("painter_settings")
    if cached:
        return cached

    try:
        doc = frappe.get_single("Painter Settings")
        settings = {
            "navbar_bg": doc.navbar_bg or "#1E3A8A",
            "navbar_text_color": doc.navbar_text_color or "#ffffff",
            "navbar_accent_color": doc.navbar_accent_color or "#72C02C",
            "sidebar_bg": doc.sidebar_bg or "#f2f6fc",
            "sidebar_text_color": doc.sidebar_text_color or "#2c3e6b",
            "sidebar_active_bg": doc.sidebar_active_bg or "#1E3A8A",
            "sidebar_active_text": doc.sidebar_active_text or "#ffffff",
            "sidebar_hover_bg": doc.sidebar_hover_bg or "#dce8f7",
            "sidebar_width": doc.sidebar_width or "240px",
            "btn_primary_bg": doc.btn_primary_bg or "#2B4EAF",
            "btn_primary_text": doc.btn_primary_text or "#ffffff",
            "btn_primary_hover": doc.btn_primary_hover or "#1E3A8A",
            "btn_radius": doc.btn_radius or "6px",
            "body_bg": doc.body_bg or "#ffffff",
            "content_bg": doc.content_bg or "#ffffff",
            "heading_color": doc.heading_color or "#1E3A8A",
            "link_color": doc.link_color or "#2B4EAF",
            "font_family": doc.font_family or "system-ui, sans-serif",
            "font_size": doc.font_size or "14px",
            "section_color": doc.section_color or "#2B4EAF",
            "section_border_color": doc.section_border_color or "#72C02C",
            "field_border_color": doc.field_border_color or "#d0dbe8",
            "field_focus_color": doc.field_focus_color or "#2B4EAF",
            "label_color": doc.label_color or "#4a6080",
            "hide_help_button": doc.hide_help_button or 0,
            "hide_search_bar": doc.hide_search_bar or 0,
            "custom_css": doc.custom_css or "",
            "custom_app_name": doc.custom_app_name or "",
            "custom_logo": doc.custom_logo or "",
        }
        frappe.cache().set_value("painter_settings", settings, expires_in_sec=300)
        return settings
    except Exception:
        return {}
