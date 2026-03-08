// Frappe Painter — Painter Theme form/list enhancements

frappe.ui.form.on("Painter Theme", {
    refresh(frm) {
        if (!frm.is_new()) {
            frm.add_custom_button(__("Apply This Theme"), function () {
                frappe.call({
                    method: "frappe_painter.frappe_painter.doctype.painter_theme.painter_theme.apply_theme",
                    args: { theme_name: frm.doc.theme_name },
                    freeze: true,
                    freeze_message: __("Applying theme…"),
                    callback: function (r) {
                        if (r && r.message && r.message.success) {
                            try { localStorage.removeItem("fp_theme_v6"); } catch (_) {}
                            if (window.frappe_painter) window.frappe_painter.reload();
                            frappe.show_alert({
                                message: __("Theme '{0}' applied successfully!", [frm.doc.theme_name]),
                                indicator: "green",
                            }, 4);
                        }
                    },
                });
            }, __("Actions")).addClass("btn-primary");

            frm.add_custom_button(__("Open Theme Switcher"), function () {
                if (window.fp_extensions && window.fp_extensions.openThemeSwitcher) {
                    window.fp_extensions.openThemeSwitcher();
                } else {
                    frappe.msgprint(__("Theme Switcher is not enabled. Enable it in Painter Settings."));
                }
            }, __("Actions"));
        }
    },
});

// List view — add "Apply" button to list row actions
frappe.listview_settings["Painter Theme"] = {
    onload(listview) {
        listview.page.add_action_item(__("Install Preset Themes"), function () {
            frappe.call({
                method: "frappe_painter.frappe_painter.doctype.painter_theme.painter_theme.install_preset_themes",
                freeze: true,
                freeze_message: __("Installing preset themes…"),
                callback: function (r) {
                    if (r && r.message) {
                        frappe.show_alert({
                            message: __("{0} themes installed/updated.", [r.message.installed.length]),
                            indicator: "green",
                        }, 4);
                        listview.refresh();
                    }
                },
            });
        });
    },

    get_indicator(doc) {
        if (doc.is_dark_theme) return [__("Dark"), "blue", "is_dark_theme,=,1"];
        return [__("Light"), "green", "is_dark_theme,=,0"];
    },
};