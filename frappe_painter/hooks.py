app_name = "frappe_painter"
app_title = "Frappe Painter"
app_publisher = "Your Company"
app_description = "No-code UI theme customizer for Frappe/ERPNext. Style your desk from a single settings page — colors, fonts, templates, and more."
app_email = "admin@yourcompany.com"
app_license = "MIT"
app_version = "1.0.0"

# Inject CSS + JS into every Desk page
app_include_css = "/assets/frappe_painter/css/painter.css"
app_include_js  = "/assets/frappe_painter/js/painter.js"

# Allow saving custom theme name to user profile
override_whitelisted_methods = {
    "frappe.core.doctype.user.user.switch_theme": "frappe_painter.overrides.theme.switch_theme"
}

# Expose API to fetch theme settings (called by JS on page load)
doc_events = {}
