// Copyright (c) 2024, Tech Ventures and contributors
// For license information, please see license.txt

frappe.ui.form.on('Invoice', {
    onload: function (frm) {

        // Wait until the DOM is fully loaded
        $(document).ready(function () {
            // Fetch the item list from the Item Doctype
            frappe.call({
                method: 'frappe.client.get_list',
                args: {
                    doctype: 'Item',
                    fields: ['item_code', 'image'], // Add any additional fields you need
                    limit_page_length: 100 // Adjust the limit as needed
                },
                callback: function (response) {
                    if (response.message && response.message.length) {
                        var itemsList = `<ul style="list-style: none;">`;
                        response.message.forEach(function (item) {
                            itemsList += `<li style="border: solid 1.5px #2490ef; border-radius: 8px; padding: 8px; margin-bottom: 8px; " item_code="${item.item_code}">
                                ${item.item_code} 
                                <img src="${item.image}" width="100" height="100">
                            </li>`;
                        });
                        itemsList += `</ul>`;

                        // Insert the items list into the form or another element
                        $('.section-body .col-sm-6').eq(0).find('form').append('<div style="overflow-y: auto;" class="items-list">' + itemsList + '</div>');

                        // Use event delegation to handle clicks on dynamically added list items
                        $(document).on('click', '.items-list li', function () {
                            var itemCode = $(this).attr('item_code');
                            addItemToChildTable(frm, itemCode);
                        });
                    } else {
                        $('.section-body .col-sm-6').eq(0).find('form').append('<p>No items found.</p>');
                    }
                }
            });
        });
    }
});

// Function to add item to the child table
// Function to add item to the child table
function addItemToChildTable(frm, itemCode) {
    var child_table_field = 'invoice_item'; // Replace with your actual field name

    // Log the fields to verify the child table field


    // Ensure the child table field exists and is accessible
    if (frm.fields_dict[child_table_field]) {
        // Check if the child table field is initialized in the form's document
        if (!frm.doc[child_table_field]) {
            frm.doc[child_table_field] = [];
        }

        // Check if the item code is already in the child table
        var existingItem = frm.doc[child_table_field].find(row => row.item === itemCode);

        if (!existingItem) {
            // Add a new row to the child table
            var new_row = frm.add_child(child_table_field, {item: itemCode, qty: frm.doc.quantity || 1});
            frm.refresh_field(child_table_field); // Refresh the child table to show the new row
        } else {
            frappe.msgprint(__('Item already exists in the list.'));
        }
    } else {
        frappe.msgprint(__('Child table field is not defined.'));
    }
}

$(document).ready(function () {
    $('.form-control').css({
        'border': 'solid 2px #2490ef'
    });
    $('.control-value.like-disabled-input').css({
        'border': 'solid 2px #2490ef'
    });
    $('.row.form-section.card-section.visible-section').css({
        'background-color': '#8beec6',
        'border-radius': '8px'
    });
    $('#page-Invoice').css({
        'background-color': '#c9f1e1'
    });
 $('.page-head.flex').css({
        'background-color': '#c9f1e1'
    });
 $('.navbar.navbar-expand.sticky-top').css({
        'background-color': '#64a8ec',
     'color':'#ffffff'
    });
 $('.page-head.flex.drop-shadow').css({
        'background-color': '#4becab'
    });
 $('.form-grid').css({
        'background-color': '#64a8ec'
    });
 $('.data-row.row').css({
        'background-color': '#64a8ec'
    });


});