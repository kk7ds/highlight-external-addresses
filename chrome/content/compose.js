/* Copyright 2013 Dan Smith <mailwarn+source@danplanet.com> */

function is_addressee(element) {
    if (!element.id)
	return false;
    label_id = element.id.replace("Col2", "Col1");
    label = document.getElementById(label_id);
    return ((label.value == "addr_to") ||
	    (label.value == "addr_cc") ||
	    (label.value == "addr_bcc"))
}

function is_mixed_orgs(recipients, my_org) {
    found_mine = false;
    found_other = false;
    for (index in recipients) {
	recipient = recipients[index];
	if (!is_addressee(recipient))
	    continue;
	if (recipient.value.indexOf(my_org) >= 0)
	    found_mine = true;
	else
	    found_other = true;
    }

    return found_mine && found_other;
}

function detect_my_org() {
    return gCurrentIdentity.email.split('@')[1];
}

function check_addrs() {
    elements = document.getElementsByClassName("textbox-addressingWidget");
    my_org = detect_my_org();

    org_color = not_org_color = null;
    if (is_mixed_orgs(elements, my_org)) {
	not_org_color = "#FF9900";
    }

    for (index in elements) {
	element = elements[index];
	if (!is_addressee(element))
	    continue;

	if (element.value.indexOf(my_org) == -1) {
	    elements[index].style.background = not_org_color;
	} else {
	    elements[index].style.background = org_color;
	}
    }
}

window.setTimeout(function(e) {
    check_addrs();
    mhtb = document.getElementById('MsgHeadersToolbar');
    mhtb.oninput = function() { check_addrs(); };
}, 1000);
