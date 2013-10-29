function get_all_recipients() {
    addr_to = gMsgCompose.compFields.to;
    addr_cc = gMsgCompose.compFields.cc;
    addr_bcc = gMsgCompose.compFields.bcc;
    recipients = (gMsgCompose.compFields.splitRecipients(addr_to, false, {}).concat(
	gMsgCompose.compFields.splitRecipients(addr_cc, false, {})).concat(
	    gMsgCompose.compFields.splitRecipients(addr_bcc, false, {})));
    return recipients;
}

function check_addrs() {
    elements = document.getElementsByClassName("textbox-addressingWidget");
    recipients = get_all_recipients()

    for (index in recipients) {
	if (recipients[index].indexOf("foo.com") > 0) {
	    elements[index].style.background = "#FF9900";
	} else {
	    elements[index].style.background = null;
	}
    }
}

window.setTimeout(function(e) {
    mhtb = document.getElementById('MsgHeadersToolbar');
    mhtb.oninput = function() { check_addrs(); };
}, 1000);
