from . import __version__ as app_version

app_name = "sayaab"
app_title = "Sayaab"
app_publisher = "Tech Ventures"
app_description = "This is clothing Bussiness Application"
app_email = "safdar211@gmail.com"
app_license = "MIT"

# Includes in <head>
# ------------------
# include js, css files in header of desk.html
# app_include_css = "/assets/sayaab/css/sayaab.css"
# app_include_js = "/assets/sayaab/js/serial_reader.js"

# include js, css files in header of web template
# web_include_css = "/assets/sayaab/css/sayaab.css"
# web_include_js = "/assets/sayaab/js/sayaab.js"

# include custom scss in every website theme (without file extension ".scss")
# website_theme_scss = "sayaab/public/scss/website"

# include js, css files in header of web form
# webform_include_js = {"Invoice": "public/js/serial_reader.js"}
# webform_include_css = {"doctype": "public/css/doctype.css"}

# include js in page
# page_js = {"page" : "public/js/file.js"}
# page_js = {"point-of-sale" : "public/js/serial_reader.js"}
# include js in doctype views
# doctype_js = {"Invoice" : "public/js/serial_reader.js"}
# doctype_list_js = {"doctype" : "public/js/doctype_list.js"}
# doctype_tree_js = {"doctype" : "public/js/doctype_tree.js"}
# doctype_calendar_js = {"doctype" : "public/js/doctype_calendar.js"}

# Home Pages
# ----------

# application home page (will override Website Settings)
# home_page = "login"

# website user home page (by Role)
# role_home_page = {
#	"Role": "home_page"
# }

# Generators
# ----------

# automatically create page for each record of this doctype
# website_generators = ["Web Page"]

# Jinja
# ----------

# add methods and filters to jinja environment
# jinja = {
#	"methods": "sayaab.utils.jinja_methods",
#	"filters": "sayaab.utils.jinja_filters"
# }

# Installation
# ------------

# before_install = "sayaab.install.before_install"
# after_install = "sayaab.install.after_install"

# Uninstallation
# ------------

# before_uninstall = "sayaab.uninstall.before_uninstall"
# after_uninstall = "sayaab.uninstall.after_uninstall"

# Desk Notifications
# ------------------
# See frappe.core.notifications.get_notification_config

# notification_config = "sayaab.notifications.get_notification_config"

# Permissions
# -----------
# Permissions evaluated in scripted ways

# permission_query_conditions = {
#	"Event": "frappe.desk.doctype.event.event.get_permission_query_conditions",
# }
#
# has_permission = {
#	"Event": "frappe.desk.doctype.event.event.has_permission",
# }

# DocType Class
# ---------------
# Override standard doctype classes

# override_doctype_class = {
#	"ToDo": "custom_app.overrides.CustomToDo"
# }

# Document Events
# ---------------
# Hook on document methods and events

# doc_events = {
#	"*": {
#		"on_update": "method",
#		"on_cancel": "method",
#		"on_trash": "method"
#	}
# }

# Scheduled Tasks
# ---------------

# scheduler_events = {
#	"all": [
#		"sayaab.tasks.all"
#	],
#	"daily": [
#		"sayaab.tasks.daily"
#	],
#	"hourly": [
#		"sayaab.tasks.hourly"
#	],
#	"weekly": [
#		"sayaab.tasks.weekly"
#	],
#	"monthly": [
#		"sayaab.tasks.monthly"
#	],
# }

# Testing
# -------

# before_tests = "sayaab.install.before_tests"

# Overriding Methods
# ------------------------------
#
# override_whitelisted_methods = {
#	"frappe.desk.doctype.event.event.get_events": "sayaab.event.get_events"
# }
#
# each overriding function accepts a `data` argument;
# generated from the base implementation of the doctype dashboard,
# along with any modifications made in other Frappe apps
# override_doctype_dashboards = {
#	"Task": "sayaab.task.get_dashboard_data"
# }

# exempt linked doctypes from being automatically cancelled
#
# auto_cancel_exempted_doctypes = ["Auto Repeat"]

# Ignore links to specified DocTypes when deleting documents
# -----------------------------------------------------------

# ignore_links_on_delete = ["Communication", "ToDo"]

# Request Events
# ----------------
# before_request = ["sayaab.utils.before_request"]
# after_request = ["sayaab.utils.after_request"]

# Job Events
# ----------
# before_job = ["sayaab.utils.before_job"]
# after_job = ["sayaab.utils.after_job"]

# User Data Protection
# --------------------

# user_data_fields = [
#	{
#		"doctype": "{doctype_1}",
#		"filter_by": "{filter_by}",
#		"redact_fields": ["{field_1}", "{field_2}"],
#		"partial": 1,
#	},
#	{
#		"doctype": "{doctype_2}",
#		"filter_by": "{filter_by}",
#		"partial": 1,
#	},
#	{
#		"doctype": "{doctype_3}",
#		"strict": False,
#	},
#	{
#		"doctype": "{doctype_4}"
#	}
# ]

# Authentication and authorization
# --------------------------------

# auth_hooks = [
#	"sayaab.auth.validate"
# ]
required_apps = ["erpnext"]