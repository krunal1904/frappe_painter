import frappe

@frappe.whitelist()
def switch_theme(theme):
    if theme in ["light", "dark", "automatic", "frappe_painter"]:
        frappe.db.set_value("User", frappe.session.user, "desk_theme", theme)
    return theme
