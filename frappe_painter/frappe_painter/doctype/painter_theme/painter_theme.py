import frappe
from frappe.model.document import Document


# Predefined named themes matching Kanak-style theme switcher palette
PRESET_THEMES = [
    {
        "theme_name": "Indigo Night",
        "primary_color": "#1A237E",
        "secondary_color": "#283593",
        "accent_color": "#7986CB",
        "navbar_bg": "#1A237E",
        "navbar_text_color": "#ffffff",
        "sidebar_bg": "#f3f4f9",
        "sidebar_text_color": "#1A237E",
        "sidebar_active_bg": "#1A237E",
        "sidebar_active_text": "#ffffff",
        "body_bg": "#f0f2f8",
        "content_bg": "#ffffff",
        "card_bg": "#ffffff",
        "btn_primary_bg": "#1A237E",
        "btn_primary_text": "#ffffff",
        "is_dark_theme": 0,
        "font_family": "'Inter', sans-serif",
        "border_radius": "rounded",
    },
    {
        "theme_name": "Dark Blue",
        "primary_color": "#0A1E3F",
        "secondary_color": "#1a3460",
        "accent_color": "#4e88d8",
        "navbar_bg": "#0A1E3F",
        "navbar_text_color": "#e8edf5",
        "sidebar_bg": "#0d2550",
        "sidebar_text_color": "#c5d5ea",
        "sidebar_active_bg": "#4e88d8",
        "sidebar_active_text": "#ffffff",
        "body_bg": "#0a1628",
        "content_bg": "#0f2040",
        "card_bg": "#0f2040",
        "btn_primary_bg": "#4e88d8",
        "btn_primary_text": "#ffffff",
        "is_dark_theme": 1,
        "font_family": "'DM Sans', sans-serif",
        "border_radius": "rounded",
    },
    {
        "theme_name": "Ocean Teal",
        "primary_color": "#004D4F",
        "secondary_color": "#00696b",
        "accent_color": "#4fc3a1",
        "navbar_bg": "#004D4F",
        "navbar_text_color": "#ffffff",
        "sidebar_bg": "#e8f8f7",
        "sidebar_text_color": "#004D4F",
        "sidebar_active_bg": "#004D4F",
        "sidebar_active_text": "#ffffff",
        "body_bg": "#f0fdfc",
        "content_bg": "#ffffff",
        "card_bg": "#ffffff",
        "btn_primary_bg": "#004D4F",
        "btn_primary_text": "#ffffff",
        "is_dark_theme": 0,
        "font_family": "'Nunito', sans-serif",
        "border_radius": "rounded",
    },
    {
        "theme_name": "Coffee Brown",
        "primary_color": "#3E2723",
        "secondary_color": "#5d4037",
        "accent_color": "#a1887f",
        "navbar_bg": "#3E2723",
        "navbar_text_color": "#fbe9e7",
        "sidebar_bg": "#fdf3ef",
        "sidebar_text_color": "#3E2723",
        "sidebar_active_bg": "#3E2723",
        "sidebar_active_text": "#fbe9e7",
        "body_bg": "#fdf5f0",
        "content_bg": "#ffffff",
        "card_bg": "#ffffff",
        "btn_primary_bg": "#5d4037",
        "btn_primary_text": "#ffffff",
        "is_dark_theme": 0,
        "font_family": "'Poppins', sans-serif",
        "border_radius": "rounded",
    },
    {
        "theme_name": "Dark Green",
        "primary_color": "#0B3D2E",
        "secondary_color": "#145a3e",
        "accent_color": "#4caf82",
        "navbar_bg": "#0B3D2E",
        "navbar_text_color": "#e8f5f0",
        "sidebar_bg": "#f0faf5",
        "sidebar_text_color": "#0B3D2E",
        "sidebar_active_bg": "#0B3D2E",
        "sidebar_active_text": "#ffffff",
        "body_bg": "#f0fdf6",
        "content_bg": "#ffffff",
        "card_bg": "#ffffff",
        "btn_primary_bg": "#0B3D2E",
        "btn_primary_text": "#ffffff",
        "is_dark_theme": 0,
        "font_family": "'DM Sans', sans-serif",
        "border_radius": "rounded",
    },
    {
        "theme_name": "Royal Purple",
        "primary_color": "#3F1D5C",
        "secondary_color": "#6a1e9e",
        "accent_color": "#ba68c8",
        "navbar_bg": "#3F1D5C",
        "navbar_text_color": "#f5e9fc",
        "sidebar_bg": "#faf3ff",
        "sidebar_text_color": "#3F1D5C",
        "sidebar_active_bg": "#3F1D5C",
        "sidebar_active_text": "#ffffff",
        "body_bg": "#fdf8ff",
        "content_bg": "#ffffff",
        "card_bg": "#ffffff",
        "btn_primary_bg": "#6a1e9e",
        "btn_primary_text": "#ffffff",
        "is_dark_theme": 0,
        "font_family": "'Poppins', sans-serif",
        "border_radius": "pill",
    },
    {
        "theme_name": "Rose Pink",
        "primary_color": "#7B1E3A",
        "secondary_color": "#ad2d55",
        "accent_color": "#f06292",
        "navbar_bg": "#7B1E3A",
        "navbar_text_color": "#fce8ee",
        "sidebar_bg": "#fff3f6",
        "sidebar_text_color": "#7B1E3A",
        "sidebar_active_bg": "#7B1E3A",
        "sidebar_active_text": "#ffffff",
        "body_bg": "#fff8fa",
        "content_bg": "#ffffff",
        "card_bg": "#ffffff",
        "btn_primary_bg": "#ad2d55",
        "btn_primary_text": "#ffffff",
        "is_dark_theme": 0,
        "font_family": "'Poppins', sans-serif",
        "border_radius": "pill",
    },
    {
        "theme_name": "Charcoal Grey",
        "primary_color": "#1E1E1E",
        "secondary_color": "#333333",
        "accent_color": "#6c757d",
        "navbar_bg": "#1E1E1E",
        "navbar_text_color": "#e0e0e0",
        "sidebar_bg": "#f5f5f5",
        "sidebar_text_color": "#333333",
        "sidebar_active_bg": "#333333",
        "sidebar_active_text": "#ffffff",
        "body_bg": "#f0f0f0",
        "content_bg": "#ffffff",
        "card_bg": "#ffffff",
        "btn_primary_bg": "#333333",
        "btn_primary_text": "#ffffff",
        "is_dark_theme": 0,
        "font_family": "'IBM Plex Sans', sans-serif",
        "border_radius": "sharp",
    },
    {
        "theme_name": "Sunset Orange",
        "primary_color": "#8A2D05",
        "secondary_color": "#d44000",
        "accent_color": "#ff7043",
        "navbar_bg": "#8A2D05",
        "navbar_text_color": "#fff3ee",
        "sidebar_bg": "#fff8f5",
        "sidebar_text_color": "#8A2D05",
        "sidebar_active_bg": "#8A2D05",
        "sidebar_active_text": "#ffffff",
        "body_bg": "#fff5f0",
        "content_bg": "#ffffff",
        "card_bg": "#ffffff",
        "btn_primary_bg": "#d44000",
        "btn_primary_text": "#ffffff",
        "is_dark_theme": 0,
        "font_family": "'Inter', sans-serif",
        "border_radius": "rounded",
    },
    {
        "theme_name": "Crimson Red",
        "primary_color": "#7D0000",
        "secondary_color": "#b71c1c",
        "accent_color": "#ef5350",
        "navbar_bg": "#7D0000",
        "navbar_text_color": "#ffebee",
        "sidebar_bg": "#fff5f5",
        "sidebar_text_color": "#7D0000",
        "sidebar_active_bg": "#7D0000",
        "sidebar_active_text": "#ffffff",
        "body_bg": "#fff8f8",
        "content_bg": "#ffffff",
        "card_bg": "#ffffff",
        "btn_primary_bg": "#b71c1c",
        "btn_primary_text": "#ffffff",
        "is_dark_theme": 0,
        "font_family": "'Roboto', sans-serif",
        "border_radius": "rounded",
    },
    {
        "theme_name": "Lime Fresh",
        "primary_color": "#2E7D32",
        "secondary_color": "#388e3c",
        "accent_color": "#8bc34a",
        "navbar_bg": "#2E7D32",
        "navbar_text_color": "#f1f8e9",
        "sidebar_bg": "#f4fce4",
        "sidebar_text_color": "#2E7D32",
        "sidebar_active_bg": "#2E7D32",
        "sidebar_active_text": "#ffffff",
        "body_bg": "#f9ffe8",
        "content_bg": "#ffffff",
        "card_bg": "#ffffff",
        "btn_primary_bg": "#388e3c",
        "btn_primary_text": "#ffffff",
        "is_dark_theme": 0,
        "font_family": "'Nunito', sans-serif",
        "border_radius": "rounded",
    },
    {
        "theme_name": "Sky Blue",
        "primary_color": "#0277BD",
        "secondary_color": "#0288d1",
        "accent_color": "#29b6f6",
        "navbar_bg": "#0277BD",
        "navbar_text_color": "#e1f5fe",
        "sidebar_bg": "#e8f4fd",
        "sidebar_text_color": "#0277BD",
        "sidebar_active_bg": "#0277BD",
        "sidebar_active_text": "#ffffff",
        "body_bg": "#f0f8ff",
        "content_bg": "#ffffff",
        "card_bg": "#ffffff",
        "btn_primary_bg": "#0288d1",
        "btn_primary_text": "#ffffff",
        "is_dark_theme": 0,
        "font_family": "'Inter', sans-serif",
        "border_radius": "rounded",
    },
]


class PainterTheme(Document):
    def before_save(self):
        pass


@frappe.whitelist()
def get_all_themes():
    """Return all named themes for the theme switcher modal."""
    themes = frappe.get_all(
        "Painter Theme",
        fields=["name", "theme_name", "primary_color", "secondary_color",
                "accent_color", "navbar_bg", "navbar_text_color",
                "sidebar_bg", "sidebar_text_color", "sidebar_active_bg",
                "sidebar_active_text", "body_bg", "content_bg", "card_bg",
                "btn_primary_bg", "btn_primary_text", "is_dark_theme",
                "workspace_bg_image", "font_family", "border_radius", "custom_css"],
        order_by="theme_name asc",
    )
    return themes


@frappe.whitelist()
def apply_theme(theme_name):
    """Apply a named Painter Theme to the global Painter Settings."""
    theme = frappe.get_doc("Painter Theme", theme_name)

    radius_map = {
        "sharp": {"sm": "2px", "md": "4px", "lg": "6px"},
        "rounded": {"sm": "4px", "md": "8px", "lg": "12px"},
        "pill": {"sm": "8px", "md": "14px", "lg": "999px"},
    }
    radii = radius_map.get(theme.border_radius or "rounded", radius_map["rounded"])

    settings = frappe.get_single("Painter Settings")
    settings.navbar_bg = theme.navbar_bg or theme.primary_color
    settings.navbar_text_color = theme.navbar_text_color or "#ffffff"
    settings.navbar_accent_color = theme.accent_color or theme.secondary_color or theme.primary_color
    settings.sidebar_bg = theme.sidebar_bg or "#f5f5f5"
    settings.sidebar_text_color = theme.sidebar_text_color or "#333333"
    settings.sidebar_active_bg = theme.sidebar_active_bg or theme.primary_color
    settings.sidebar_active_text = theme.sidebar_active_text or "#ffffff"
    settings.sidebar_hover_bg = _lighten(theme.sidebar_active_bg or theme.primary_color, 0.9)
    settings.body_bg = theme.body_bg or "#f5f5f5"
    settings.content_bg = theme.content_bg or "#ffffff"
    settings.card_bg = theme.card_bg or "#ffffff"
    settings.btn_primary_bg = theme.btn_primary_bg or theme.primary_color
    settings.btn_primary_text = theme.btn_primary_text or "#ffffff"
    settings.btn_primary_hover = theme.secondary_color or theme.primary_color
    settings.heading_color = theme.primary_color
    settings.link_color = theme.primary_color
    settings.section_head_color = theme.primary_color
    settings.section_border_color = theme.accent_color or theme.secondary_color or theme.primary_color
    settings.field_focus_color = theme.primary_color
    settings.number_card_text = theme.primary_color
    settings.border_radius_sm = radii["sm"]
    settings.border_radius_md = radii["md"]
    settings.border_radius_lg = radii["lg"]
    if theme.font_family:
        settings.font_family = theme.font_family
    if theme.workspace_bg_image:
        settings.workspace_bg_image = theme.workspace_bg_image
    if theme.custom_css:
        settings.custom_css = theme.custom_css

    settings.save(ignore_permissions=True)
    frappe.cache().delete_key("painter_settings")
    return {"success": True, "theme": theme_name}


def _lighten(hex_color, factor=0.9):
    """Return a lighter version of a hex color for hover states."""
    try:
        hex_color = hex_color.lstrip("#")
        r, g, b = int(hex_color[0:2], 16), int(hex_color[2:4], 16), int(hex_color[4:6], 16)
        r = int(r + (255 - r) * factor)
        g = int(g + (255 - g) * factor)
        b = int(b + (255 - b) * factor)
        return f"#{r:02x}{g:02x}{b:02x}"
    except Exception:
        return "#f0f0f0"


@frappe.whitelist()
def install_preset_themes():
    """Install the 12 built-in preset themes (idempotent)."""
    installed = []
    for theme_data in PRESET_THEMES:
        if not frappe.db.exists("Painter Theme", theme_data["theme_name"]):
            doc = frappe.get_doc({"doctype": "Painter Theme", **theme_data})
            doc.insert(ignore_permissions=True)
            installed.append(theme_data["theme_name"])
        else:
            # Update existing to keep in sync
            doc = frappe.get_doc("Painter Theme", theme_data["theme_name"])
            for k, v in theme_data.items():
                if k != "theme_name":
                    setattr(doc, k, v)
            doc.save(ignore_permissions=True)
            installed.append(theme_data["theme_name"])
    frappe.db.commit()
    return {"installed": installed}