

 












/** Initialize BDS Object **/
// initialize bds namespace
var BDS = (function (bds) {
    /** costants **/
    var app = 'bds';
	bds.offset = 0;
	

    bds.getAppPath = function(){
        return '/' + app;
    }
    
    bds.getDate = function(date) {
		var localTime = date.getTime();
		var localOffset = date.getTimezoneOffset() * 60000; // offset should be converted to milliseconds.
		var utc = localTime + localOffset;
		var offset = 0;
		
		return bdsDate = new Date(utc + offset);
	}
    return bds;
}(BDS || {}))


// Javascript validation routines for Biscom Delivery Server

// Focus on the specified element, if possible.
function focusElement(el) {
	var focusSucceeded = false;

	if (el == null) {
		return focusSucceeded;
	}

	try {
		// Ensure the element is enabled, visible and the focus method is present
		var canFocus = !el.disabled
					&& el.style.display != 'none'
					&& el.style.visibility != 'hidden'
					&& el.focus;
		if (canFocus) {
			el.focus();
			focusSucceeded = true;
		}
	} catch (err) {
		// Ignore error. May want to show error in debug mode later.
	}
	
	return focusSucceeded;
} 

/*
 * Checks for the correct version of JRE and 
 * displays/hides the applet element depending on it
 * Author: Fahim Hasan
 * Used in:
 * deliveryCreateQuickWithApplet.jsp
 * deliveryView.jsp
 * deliveryViewFullWithApplet.jsp
 * downloadProgress.jsp
 * packageCreateWithApplet.jsp
 * uploadProgress.jsp
 */
function initializeAppletContainer() {
	// alert(PluginDetect);
	var jreVersion = PluginDetect.getVersion('Java');
	// alert(jreVersion);
	if (jreVersion != null && jreVersion >= '1,5'){
		try {
			document.getElementById('jreNotFound').style.display='none';
			document.getElementById('jreLink').style.display='none';
			document.getElementById('appletContainer').style.display='block';
		} catch(err) {
		    // alert(err);
	        document.getElementById('jreNotFound').style.display='block';
	        document.getElementById('jreLink').style.display='block';
		    document.getElementById('appletContainer').style.display='none';
		}
	} else {
	    document.getElementById('jreNotFound').style.display='block';
	    document.getElementById('jreLink').style.display='block';
		document.getElementById('appletContainer').style.display='none';
	}
}

/*
 * Checks for the correct version of JRE and 
 * displays/hides the applet element depending on it
 * Author: Fahim Hasan
 * Used in:
 * deliveryPrintPreview.jsp
 * deliveryViewFull.jsp
 * deliveryViewNS.jsp
 * viewComplianceDelivery.jsp
 * viewComplianceDeliverySummary.jsp
 * viewComplianceReplyDelivery.jsp
 */
function initializeAppletElements() {
	var jreVersion = PluginDetect.getVersion('Java');
	var appletElement = document.getElementById('appletButton')

	if (jreVersion != null && jreVersion >= '1,5'){
		// Everythings fine, do nothing
	}
	else{
		if(appletElement != null) appletElement.style.display='none';
	}
}

/*
 * Checks for the correct version of JRE and 
 * displays/hides the applet element depending on it
 * Author: Ariful Ahsan
 * Used in:
 *deliveryView.jsp
 *deliveryViewFull.jsp
 *deliveryViewFullWithApplet.jsp
 *deliveryViewNS.jsp
 *viewComplianceDelivery.jsp
 *viewComplianceDeliverySummary.jsp
 *viewCompliancePackageSummary.jsp
 */
 function initializeAppletElementsByName() {
	var jreVersion = PluginDetect.getVersion('Java');
	var appletElement = document.getElementsByName('appletButton');
	if (jreVersion != null && jreVersion >= '1,5'){
		// Everythings fine, do nothing
	}
	else{
		// Need to hide the elements
		// hide button
            for(i=0; i< appletElement.length; i++)
            {
                appletElement[i].style.display='none';
            }
	}
}

/*
 * Checks for the correct version of JRE and 
 * returns y/n depending on it
 * Author: Ariful Ahsan
 * Used in:
 *viewComplianceDeliveries.jsp
 *viewCompliancePackages.jsp
 */
 function useApplet() {
	var jreVersion = PluginDetect.getVersion('Java');
	if (jreVersion != null && jreVersion >= '1,5'){
		return "y";
	}
	else{
		return "n";
	}
}

/*
 * Checks for the correct version of JRE and hides the applet elements 
 * but shows the checkboxs and save to package button
 * Author: Ariful Ahsan
 * Used in:
 *deliveryView.jsp
 */
function showSaveToPackElements(){
	var useApplet = (document.getElementById('useApplet').value == 'y');
	var useAppletParam = (document.getElementById('useAppletParam').value == 'y');
	
	var jreVersion = PluginDetect.getVersion('Java');
	if((useAppletParam) || (jreVersion != null && jreVersion >= '1,5' && useApplet))
	{
		// hide nonAppletElement
		var nonAppletElement = document.getElementById('nonAppletElement');
		nonAppletElement.style.display = 'none';
	}else {
	
		// hide appletElement
		var appletElement = document.getElementById('appletElement');
		appletElement.style.display = 'none';
		
		
		// hide download button
		var appletElement = document.getElementsByName('appletButton');
		for(i=0; i<appletElement.length; i++)
		{
			appletElement[i].style.display='none';
		}
	}
}

/*
 * Checks for the correct version of JRE and 
 * displays/hides the applet element depending on it
 * Author: Fahim Hasan
 * Used in:
 * packageView.jsp
 * viewCompliancePackage.jsp
 * viewCompliancePackageSummary.jsp
 * viewComplianceWorkspace.jsp
 * viewComplianceWorkspaceSummary.jsp
 */
function initializeAppletURL(macAppletUser) {
	var jreVersion = PluginDetect.getVersion('Java');
	var appletElement = document.getElementById('appletURL')
	var nonAppletElement = document.getElementById('nonAppletURL');
	var appletHrefElement = document.getElementById('appletDownloadURL');

    var macSafari7 = isMacOS() && isSafari7();
    // alert("macSafari7: " + macSafari7);
    // alert("macAppletUser: " + macAppletUser);
	
	if (jreVersion != null && jreVersion >= '1,5' && (!macSafari7 || (macSafari7 && macAppletUser))) {
		if(nonAppletElement != null) {
			nonAppletElement.style.display='none';
		}
	}
	else{
		if(appletElement != null && nonAppletElement != null) {
			appletElement.style.display='none';
		}
		if(appletHrefElement != null){
			appletHrefElement.style.display='none';
		}
	}
}

    function isChromeVerGreaterThan43() {
        // Chrome version less than 43
        var chromeGrt = false;
        if(PluginDetect.browser.isChrome && PluginDetect.browser.verChrome>'43') {
            chromeGrt = true;
        }

        return chromeGrt;
    }


    function initializeApplet(macAppletUser) {
        var jreVersion = PluginDetect.getVersion('Java');
        var appletElements = document.getElementsByName('appletURL')
        var nonAppletElements = document.getElementsByName('nonAppletURL');
        var macSafari7 = isMacOS() && isSafari7();

        for(i=0;i<appletElements.length;i++) {
            if (!isChromeVerGreaterThan43() && jreVersion != null && jreVersion >= '1,5' && (!macSafari7 || (macSafari7 && macAppletUser))) {
                // Both elements exist means applet is enabled, so hide nonApplet element; except for MacOS and Safari7+
                if (appletElements[i] != null && nonAppletElements[i] != null) {
                    nonAppletElements[i].style.display='none';
                }
                // Else JRE exists, but applet is not enabled and applet element isn't present, so do nothing
            }
            else {
                if (appletElements[i] != null) {
                    appletElements[i].style.display='none';
                }
            }
        }
    }

    function isJavaSupported() {
        var isJavaSupported = false;
        var jreVersion = PluginDetect.getVersion('Java');

        if (jreVersion != null && jreVersion >= '1,5') {
            var isJavaSupported = true;
        }

        return isJavaSupported;
    }

	function initializeAppletRdURLs(macAppletUser) {
		var jreVersion = PluginDetect.getVersion('Java');
		var appletElements = document.getElementsByName('appletRdURL')
		var nonAppletElements = document.getElementsByName('nonAppletRdURL');
		var macSafari7 = isMacOS() && isSafari7();

		for(i=0;i<appletElements.length;i++) {
			if (!isChromeVerGreaterThan43() && jreVersion != null && jreVersion >= '1,5' && (!macSafari7 || (macSafari7 && macAppletUser))) {
				if(nonAppletElements[i] != null) {
					nonAppletElements[i].style.display='none';
				}
			}
			else {
				if(appletElements[i] != null) {
					appletElements[i].style.display='none';
				}
			}
   		}	
	}
	
	function initializeAppletSdURLs(macAppletUser) {
		var jreVersion = PluginDetect.getVersion('Java');
		var appletElements = document.getElementsByName('appletSdURL')
		var nonAppletElements = document.getElementsByName('nonAppletSdURL');
		var macSafari7 = isMacOS() && isSafari7();

		for(i=0;i<appletElements.length;i++) {
			if (!isChromeVerGreaterThan43() && jreVersion != null && jreVersion >= '1,5' && (!macSafari7 || (macSafari7 && macAppletUser))) {
				if(nonAppletElements[i] != null) {
					nonAppletElements[i].style.display='none';
				}
			}
			else {
				if(appletElements[i] != null) {
					appletElements[i].style.display='none';
				}
			}
   		}	
	}

	function initializeAppletDvURLs(macAppletUser) {
		var jreVersion = PluginDetect.getVersion('Java');
		var appletElements = document.getElementsByName('appletDvURL')
		var nonAppletElements = document.getElementsByName('nonAppletDvURL');
		var macSafari7 = isMacOS() && isSafari7();

		for(i=0;i<appletElements.length;i++) {
			if (!isChromeVerGreaterThan43() && jreVersion != null && jreVersion >= '1,5' && (!macSafari7 || (macSafari7 && macAppletUser))) {
				if(nonAppletElements[i] != null) {
					nonAppletElements[i].style.display='none';
				}
			}
			else {
				if(appletElements[i] != null) {
					appletElements[i].style.display='none';
				}
			}
   		}	
	}
	

/*
 * Checks for the correct version of JRE and
 * displays/hides the applet download buttons depending on it
 * Author: Sajib
 * Used in:
 * deliveryView.jsp
 * deliveryViewFullWithApplet.jsp
 * viewCompliancePackage.jsp
 * viewComplianceDelivery.jsp
 * viewComplianceWorkspace.jsp
 */
function initializeAppletButtons(macAppletUser) {
	var jreVersion = PluginDetect.getVersion('Java');
	var appletDownloadButton = document.getElementById('appletDownloadButton');
	var appletFileSiteButton = document.getElementById('appletFileSiteButton');
//	var appletCheckBoxHeader = document.getElementById('appletCheckBoxHeader');		//we need the checkbox for multiple files download as zip
//  var documentIdArray = document.getElementsByName('documentIdArray');

    var macSafari7 = isMacOS() && isSafari7();
    // alert("macSafari7: " + macSafari7);
    // alert("macAppletUser: " + macAppletUser);

	if (jreVersion != null && jreVersion >= '1,5' && (!macSafari7 || (macSafari7 && macAppletUser))) {
        // do nothing
	}
	else {
		if(appletDownloadButton != null) {
			appletDownloadButton.style.display='none';
		}
		if(appletFileSiteButton != null) {
			appletFileSiteButton.style.display='none';
		}
//		if(!window.disableAppletInitialization){
//            if(appletCheckBoxHeader != null) {
//                appletCheckBoxHeader.style.display='none';
//            }
//        }
	}

    /*
   	for(i=0; i < documentIdArray.length; i++) {
		if (jreVersion != null && jreVersion >= '1,5' && (!macSafari7 || (macSafari7 && macAppletUser))) {
            // do nothing
		}
		else {
            if(!window.disableAppletInitialization){
                if(documentIdArray[i] != null) {
                    documentIdArray[i].style.display='none';
                }
			}
        }
   	}
   	*/
}


/*
 * Checks for the correct version of JRE and
 * displays/hides the applet download buttons depending on it
 * Author: Sajib
 * Used in:
 * packageView.jsp
 */
function initializeAppletPackageButtons(macAppletUser) {
	var jreVersion = PluginDetect.getVersion('Java');
	var appletDownloadButton = document.getElementById('appletDownloadButton');
	var appletFileSiteButton = document.getElementById('appletFileSiteButton');

    var macSafari7 = isMacOS() && isSafari7();
    // alert("macSafari7: " + macSafari7);
    // alert("macAppletUser: " + macAppletUser);

	if (jreVersion != null && jreVersion >= '1,5' && (!macSafari7 || (macSafari7 && macAppletUser))) {
        // do nothing
	}
	else {
		if(appletDownloadButton != null) {
			appletDownloadButton.style.display='none';
		}
		if(appletFileSiteButton != null) {
			appletFileSiteButton.style.display='none';
		}
	}

}


/*
 * Checks for the correct version of JRE and
 * displays/hides the applet download buttons depending on it
 * Author: Sajib
 * Used in:
 * viewComplianceReplyDelivery.jsp
 */
function initializeAppletButtonsReplyThread(macAppletUser) {
	var jreVersion = PluginDetect.getVersion('Java');
	var appletDownloadButtons = document.getElementsByName('appletDownloadButton');
	var appletFileSiteButtons = document.getElementsByName('appletFileSiteButton');
//	var appletCheckBoxHeaders = document.getElementsByName('appletCheckBoxHeader');		// We need the checkbox to select multiple files and download as zip
//	var replyDocumentIdArray = document.getElementsByName('replyDocumentIdArray');

    var macSafari7 = isMacOS() && isSafari7();
    // alert("macSafari7: " + macSafari7);
    // alert("macAppletUser: " + macAppletUser);

	for(i=0; i < appletDownloadButtons.length; i++) {
		if (jreVersion != null && jreVersion >= '1,5' && (!macSafari7 || (macSafari7 && macAppletUser))) {
            // do nothing
		}
		else {
			if(appletDownloadButtons[i] != null) {
				appletDownloadButtons[i].style.display='none';
			}
			if(appletFileSiteButtons[i] != null) {
				appletFileSiteButtons[i].style.display='none';
			}
//			if(!window.disableAppletInitialization){
//                if(appletCheckBoxHeaders[i] != null) {
//                    appletCheckBoxHeaders[i].style.display='none';
//                }
//            }
		}
   	}

/*
   	for(i=0; i < replyDocumentIdArray.length; i++) {
		if (jreVersion != null && jreVersion >= '1,5' && (!macSafari7 || (macSafari7 && macAppletUser))) {
            // do nothing
		}
		else {
			if(replyDocumentIdArray[i] != null) {
				replyDocumentIdArray[i].style.display='none';
			}
        }
   	}
*/
}


/*
 * String formatting utility for building strings similiar to C#. 
 * We can use it to populate params messages with params from application.properties by javascript
 */
String.format = function( text )
{
    //check if there are two arguments in the arguments list
    if ( arguments.length <= 1 )
    {
        //if there are not 2 or more arguments there's nothing to replace
        //just return the original text
        return text;
    }
    //decrement to move to the second argument in the array
    var tokenCount = arguments.length - 1;
    for( var token = 0; token < tokenCount; token++ )
    {
        //iterate through the tokens and replace their placeholders from the original text in order
        text = text.replace( new RegExp( "\\{" + token + "\\}", "gi" ), arguments[ token + 1 ] );
    }
    return text;
};

/*
 * Enable or disable the notification email address field depending on the value of the,
 * notifyOnDeliveryViewSetting and notifyOnFileDownloadSetting
 * Used in: delivery create and update related pages where we have the above mentioned fields
 */

  function toggleNotify() {
    if ((document.forms[0].notifyOnDeliveryViewSetting.value == 'NO') 
    	&& (document.forms[0].notifyOnFileDownloadSetting.value == 'NO')){
		document.forms[0].notificationEmails.disabled = true;    	
    } else {
		document.forms[0].notificationEmails.disabled = false;    	
    }
  } 


/*
 * Validates a password
 * Author: Fahim Hasan
 * Param details:
 * upperCase: Defines whether uppercase letters should be present in the password
 * lowerCase: Defines whether lowercase letters should be present in the password
 * numerals: Defines whether digits should be present in the password
 * symbols: Defines whether non-alphanumeric characters should be present in the password
 * allowedList: Contains the list of allowed chars for the the password
 * message: The list of error messages
 * password: The string to validate
 */
function checkPassword(password1, password2, min, max, upperCase, lowerCase, numeral, symbol, allowedList, message){
    var upperCaseFlag = false;
	var lowerCaseFlag = false;
	var numeralFlag = false;
	var symbolFlag = false;
	var errorMessageHeader = "";
	var errorMessage = "";
    var totalMatchedSymbolChars = 0;
    var symbolMatched = true;
    var totalProblem = 0;

	if (password1 != password2) {
		errorMessage += "\n - " + 'Passwords do not match';
		totalProblem++;
	}
	if ((password1.length < min) || (password2.length < min) || (password1.length > max) || (password2.length > max)) {
		errorMessage += "\n - " + String.format("Passwords must be between {0} and {1} characters long", min, max);
		totalProblem++;
	}

	if(upperCase == true && password1.match(/[A-Z]/)) upperCaseFlag = true; // If uppercase letter is required, test if present in password
	if(lowerCase == true && password1.match(/[a-z]/)) lowerCaseFlag = true;
	if(numeral == true && password1.match(/\d+/)) numeralFlag = true;
	if(symbol == true && password1.match(/[^a-zA-Z0-9]/)) symbolFlag = true;

    if(upperCase == true && upperCaseFlag == false) {
        errorMessage += "\n " + message["upperCase"]; // If uppercase is required and not found..
        totalProblem++;
    }
    if(lowerCase == true && lowerCaseFlag == false) {
        errorMessage += "\n " + message["lowerCase"];
        totalProblem++;
    }
    if(numeral == true && numeralFlag == false) {
        errorMessage += "\n " + message["digit"];
        totalProblem++;
    }
    if(symbol == true && symbolFlag == false && allowedList.length == 0) {
        errorMessage += "\n " + message["nonAlphaNumeric"];
        totalProblem++;
    }
    // If the allowed list is defined, check whether the password contains only allowed chars
    if(allowedList.length > 0 && symbol == true){
        for(var i=0; i<password1.length; ++i){
            if( (password1.charAt(i) >= 'A' && password1.charAt(i) <= 'Z') ||
                (password1.charAt(i) >= 'a' && password1.charAt(i) <= 'z') ||
                (password1.charAt(i) >= '0' && password1.charAt(i) <= '9') )
                continue; // Skip alphanumeric chars
            if(allowedList.indexOf(password1.charAt(i)) == -1){
                symbolMatched = false;
                break;
            }
            if(allowedList.indexOf(password1.charAt(i)) >= 0){
                totalMatchedSymbolChars ++;
            }
        }
        if(!symbolMatched || totalMatchedSymbolChars == 0) {
            errorMessage += "\n " + message["allowed"];
            errorMessage = errorMessage.substring(0, errorMessage.length - 12);
            if(allowedList.Length == 1) {
                errorMessage += " " + message["character"];
            }
            else {
                errorMessage += " " + message["characters"];
            }
            errorMessage += " " + allowedList;
            totalProblem++;
        }
    }
    if(totalProblem > 0){
        if(totalProblem > 1) {
            errorMessageHeader = 'The password does not meet the following requirements:';
        }
        else {
            errorMessageHeader = 'The password does not meet the following requirement:';
        }
        errorMessage = errorMessageHeader + errorMessage;
        alert(errorMessage);
        return false;
    }
    return true;
}

function checkEmailMatch (email1, email2) {
	var error="";
	if (email1.value == "") {
	   error = "\n - " + 'Email address must be entered.';
	   alert(error);
	   return false;
	}

    var emailFilter=/^.+@.+\..{1,100}$/;
    var testVal = emailFilter.test(email1.value);
    if (!(emailFilter.test(email1.value))) {
       error = "\n - " + 'The Email Address field is not valid';
       alert(error);
	   return false;
    } else {
		//test email for illegal characters
		var illegalChars= /[\(\)\<\>\,\;\:\\\"\[\]]/
		if (email1.value.match(illegalChars)) {
			error = "\n - " + 'The Email Address field contains illegal characters';
			alert(error);
	        return false;
		}
    }
    if (email1.value != email2.value){
        error = "\n - " + 'Confirm email address does not match';
        alert(error);
	    return false;
    }
	return true;
}

// Checks whether the parameter is a non negative integer
function isNonNegativeInteger(val){
     if(val == null) return false;
     if (val.length == 0) return false;
     for (var i = 0; i < val.length; ++i){
     	var ch = val.charAt(i);
 		if (ch < '0' || ch > '9') return false;
     }
     return true;
}

// Checks whether the parameter is a positive integer.
//function isPositiveInteger(val){
//     if(val == null) return false;
//     if (val.length == 0) return false;
//
//	 var flag = false;
//
//     for (var i = 0; i < val.length; ++i){
//     	var ch = val.charAt(i);
//		if(ch > '0' && ch <= '9') flag = true;
// 		if (ch < '1' || ch > '9' ){
//			if (ch != '0') return false;
//			else if(flag == false) return false;
//		}
//     }
//     return true;
//}

function isPositiveInteger(val) {
	if(val == null) { 
		return false;
	}
	if (val.length == 0) {
		return false;
	}
	
	// if not a number e.g '2asd9'
	if(isNaN(val)) { 
		return false; 
	}
	
	var flag = false;

	// special case: if val = '+5', omit the + sign
	if(val.charAt(0) == '+') { 
		val = val.substr(1);
	}
	
	if(isNonNegativeInteger(val)) {
		var tmp = parseInt(val);
		if(tmp > 0) flag = true;
	}
	
	return flag;
}

// Check whether the parameter is a positive integer with value > param2
function isGreater(val1, val2){
	if(isNonNegativeInteger(val1) == false) return false;
	val1 = parseInt(val1, 10);
	val2 = parseInt(val2, 10);
	if(val1 > val2) return true;
}

// Check whether val1 > val2 
function isGreater2(val1, val2){
	if(!isPositiveInteger(val1) || !isPositiveInteger(val2)) return false;
	val1 = parseInt(val1, 10);
	val2 = parseInt(val2, 10);
	return (val1 > val2);
}

// Check whether the float value val1 > val2
function isGreaterFloat(val1, val2){
	val1 = parseFloat(val1);
	val2 = parseFloat(val2);
	return (val1 > val2);
}

// Checks whether the parameter is a non negative integer, null allowed
function checkValueAllowedEmpty(val){
     if(val == null) return true;

	 var value = trimWhitespace(val);
     if (value.length == 0) return true;

	 var retval = isNonNegativeInteger(value);
     return retval;
}

//Checks if a value is empty or not
function isEmptyValue(val) {
	if(val == null) return true;
	
	var value = trimWhitespace(val);
	if (value.length == 0) return true;
	
	return false;
}

// Function to validate inactivityPeriod
function isValidInactivityPeriod() {
	if (isEmpty(document.serverConfigForm.inactivityPeriod)) {
		return true;
	} else {
		return (isGreater2(document.serverConfigForm.inactivityPeriod.value, "29"));
	}
}

// Validate daysBeforeFirstWarning
function isValidDaysBeforeFirstWarning() {
	var inactivityPeriod = document.serverConfigForm.inactivityPeriod.value;
	var daysBeforeFirstWarning = document.serverConfigForm.daysBeforeFirstWarning.value;
	if (isEmpty(document.serverConfigForm.daysBeforeFirstWarning)) {
		return true;
	} else {
		if (isEmpty(document.serverConfigForm.inactivityPeriod)) {
			return isPositiveInteger(daysBeforeFirstWarning);			
		} else {
			if(isPositiveInteger(daysBeforeFirstWarning) == false) {
				return false;
			}
			return ((parseInt(inactivityPeriod) == parseInt(daysBeforeFirstWarning)) || isGreater2(inactivityPeriod, daysBeforeFirstWarning));
		}
	}
}

// Validate daysBeforeFinalWarning
function isValidDaysBeforeFinalWarning() {
	var daysBeforeFirstWarning = document.serverConfigForm.daysBeforeFirstWarning.value;
	var daysBeforeFinalWarning = document.serverConfigForm.daysBeforeFinalWarning.value;
	
	if (isEmpty(document.serverConfigForm.daysBeforeFinalWarning)) {
		return true;
	} else {
		if (isEmpty(document.serverConfigForm.daysBeforeFirstWarning)) {
			return false;
		}
		return (isGreater2(daysBeforeFirstWarning, daysBeforeFinalWarning));
	}
}

// Called from adminServerConfig.jsp->process(), validates several fields 
function validateFields(){
	var i, j;
	
	if (isEmpty(document.serverConfigForm.administratorEmail)) {
		alert('The Administrator Email field must be entered');
		document.serverConfigForm.administratorEmail.focus();
		return false;
	}
	
	var requireTermsOfService = document.serverConfigForm.requireTermsOfService[0].checked;
	if (requireTermsOfService && isEmptyValue(document.serverConfigForm.termsOfService.value)) {
		alert('The terms of service must be entered');
		document.serverConfigForm.termsOfService.focus();
		return false;
	}
	
	var enableRecaptcha = document.serverConfigForm.enableRecaptcha[0].checked;
	if (enableRecaptcha && (isEmptyValue(document.serverConfigForm.recaptchaPublicKey.value) || isEmptyValue(document.serverConfigForm.recaptchaPrivateKey.value))) {
		alert('The reCAPTCHA public and private keys should not be empty ');
		if(isEmptyValue(document.serverConfigForm.recaptchaPublicKey.value)){
			document.serverConfigForm.recaptchaPublicKey.focus();
		} else {
			document.serverConfigForm.recaptchaPrivateKey.focus();
		}
		return false;
	}
	
	var allowProxy = document.serverConfigForm.allowProxy[0].checked;
	if (allowProxy) {

		if(isEmptyValue(document.serverConfigForm.proxyHost.value)){
			alert('The proxy host should not be empty ');
			document.serverConfigForm.proxyHost.focus();
			return false;
		} else if(isEmptyValue(document.serverConfigForm.proxyPort.value)){
			alert('The proxy port should not be empty ');
			document.serverConfigForm.proxyPort.focus();
			return false;
		} else if(!isEmptyValue(document.serverConfigForm.proxyPort.value)){
			if(!isNonNegativeInteger(document.serverConfigForm.proxyPort.value)){
				alert('Invalid value entered for proxy port');
				document.serverConfigForm.proxyPort.focus();
		  		return false;
			}
		} 
		
		if(!isEmptyValue(document.serverConfigForm.proxyPassword.value)){
			if(isEmptyValue(document.serverConfigForm.proxyConfirmPassword.value)){
				alert('Please enter the proxy password to confirm');
				document.serverConfigForm.proxyConfirmPassword.focus();
		  		return false;
			} else if(document.serverConfigForm.proxyConfirmPassword.value != document.serverConfigForm.proxyPassword.value) {
				alert('Confirm proxy password does not match ');
				document.serverConfigForm.proxyConfirmPassword.focus();
		  		return false;
			} else if(isEmptyValue(document.serverConfigForm.proxyUsername.value)){
				alert('The proxy username is empty ');
				document.serverConfigForm.proxyUsername.focus();
		  		return false;
		  	}
		} else if(!isEmptyValue(document.serverConfigForm.proxyConfirmPassword.value) 
					|| !isEmptyValue(document.serverConfigForm.proxyUsername.value)){
				// but the proxy password field is empty
				alert('The proxy password is empty');
				document.serverConfigForm.proxyPassword.focus();
		  		return false;
		}
		
	}
	
	if(!isValidInactivityPeriod()) {
		alert('You cannot specify an expiration value less than 30 days');
		document.serverConfigForm.inactivityPeriod.focus();
  		return false;
	}
	
	if(!isValidDaysBeforeFirstWarning()) {
		alert('Send first warning message before (in days) can be up to the inactivity period');
		document.serverConfigForm.daysBeforeFirstWarning.focus();
  		return false;
	}
	if(!isValidDaysBeforeFinalWarning()) {
		alert('Send final warning message before (in days) cannot be greater than or equal to the inactivity period or Send first warning message before (in days)');
		document.serverConfigForm.daysBeforeFirstWarning.focus();
  		return false;
	}
	if(!checkValueAllowedEmpty(document.serverConfigForm.daysToDeleteExpiredUsers.value)){
		alert('Invalid value entered for delete expired users after (in days)');
		document.serverConfigForm.daysToDeleteExpiredUsers.focus();
  		return false;
	}
	if(!isValidIPList(document.serverConfigForm.intranet.value)){
		alert('Invalid value entered for intranet');
		return false;
	}
	if(!isNonNegativeInteger(document.serverConfigForm.sessionTimeout.value)){
		alert('Invalid value entered for session timeout');
  		return false;
	}
	if(!isGreater(document.serverConfigForm.sessionTimeout.value, 0)){
		alert('Minimum allowed session timeout value is 1');
  		return false;
	}
	if(!isEmpty(document.serverConfigForm.deliveryExpirationDays)){
		if(!isNonNegativeInteger(document.serverConfigForm.deliveryExpirationDays.value)){
			alert('Invalid value entered for delivery expiration days');
	  		return false;
		}
	}
	
	
	if(!checkValueAllowedEmpty(document.serverConfigForm.logoWidth.value)){
		alert('Invalid value entered for logo width');
  		return false;
	}
	if(!checkValueAllowedEmpty(document.serverConfigForm.logoHeight.value)){
		alert('Invalid value entered for logo height');
  		return false;
	}
	if(!isNonNegativeInteger(document.serverConfigForm.passwordExpirationDays.value)){
		alert('Invalid value entered for password expiration days');
  		return false;
	}
	if(!isNonNegativeInteger(document.serverConfigForm.passwordExpirationWarningDays.value)){
		alert('Invalid value entered for password expiration warning days');
  		return false;
	}
	if(!isEmpty(document.serverConfigForm.autoPackageDeletionDays)){
		if(!isNonNegativeInteger(document.serverConfigForm.autoPackageDeletionDays.value)){
		alert('Invalid value entered for auto package deletion days');
	  		return false;
		}
	}
	
	if(isPositiveInteger(document.serverConfigForm.deliveryExpirationDays.value) && isPositiveInteger(document.serverConfigForm.autoPackageDeletionDays.value)){
		// Converting the strings into integer
		if((document.serverConfigForm.deliveryExpirationDays.value - 0) > (document.serverConfigForm.autoPackageDeletionDays.value - 0)){
			alert('The value of "Delivery expires after" field should be less than or equal to the value of the "Package deletes after" field in the Package Settings section.');
  			return false;
		}
	}
	
	if(!isNonNegativeInteger(document.serverConfigForm.autoPackageDelReminderDays.value)){
		alert('Invalid value entered for auto package deletion reminder days');
  		return false;
	}
	
	// check if package auto delete reminder date(in days) is less than auto delete date(in days)
	if((document.serverConfigForm.autoPackageDelReminderDays.value- 0) >= (document.serverConfigForm.autoPackageDeletionDays.value- 0) && document.serverConfigForm.autoPackageDelReminderDays.value- 0 != 0){
		alert('The value of "Package deletes after" field should be greater than the value of the "Alert for deletion" field in the Package Settings section.');
  		return false;
	}

	if((document.serverConfigForm.autoPackageDel2ndReminderDays.value- 0) >= (document.serverConfigForm.autoPackageDeletionDays.value- 0) && document.serverConfigForm.autoPackageDel2ndReminderDays.value- 0 != 0){
		alert('The value of "Package deletes after" field should be greater than the value of the "Second alert for deletion" field in the Package Settings section.');
  		return false;
	}

	if((document.serverConfigForm.autoPackageDel2ndReminderDays.value- 0) >= (document.serverConfigForm.autoPackageDelReminderDays.value- 0) && document.serverConfigForm.autoPackageDel2ndReminderDays.value- 0 != 0){
		alert('The value of "Second alert for deletion" field should be less than the value of the "Alert for deletion" field in the Package Settings section.');
  		return false;
	}

	
	if(!isEmpty(document.serverConfigForm.autoWorkspaceDeletionDays)){
		if(!isNonNegativeInteger(document.serverConfigForm.autoWorkspaceDeletionDays.value)){
		alert('Invalid value entered for auto workspace deletion days');
	  		return false;
		}
	}
		
	if(!isNonNegativeInteger(document.serverConfigForm.autoWorkspaceDelReminderDays.value)){
		alert('Invalid value entered for auto workspace deletion reminder days');
  		return false;
	}
	
	// check if package auto delete reminder date(in days) is less than auto delete date(in days)
	if((document.serverConfigForm.autoWorkspaceDelReminderDays.value- 0) >= (document.serverConfigForm.autoWorkspaceDeletionDays.value- 0) && document.serverConfigForm.autoWorkspaceDelReminderDays.value- 0 != 0){
		alert('The value of "Workspace deletes after" field should be greater than the value of the "Alert for deletion" field in the Workspace Settings section.');
  		return false;
	}

	if((document.serverConfigForm.autoWorkspaceDel2ndReminderDays.value- 0) >= (document.serverConfigForm.autoWorkspaceDeletionDays.value- 0) && document.serverConfigForm.autoWorkspaceDel2ndReminderDays.value- 0 != 0){
		alert('The value of "Workspace deletes after" field should be greater than the value of the "Second alert for deletion" field in the Workspace Settings section.');
  		return false;
	}

	if((document.serverConfigForm.autoWorkspaceDel2ndReminderDays.value- 0) >= (document.serverConfigForm.autoWorkspaceDelReminderDays.value- 0) && document.serverConfigForm.autoWorkspaceDel2ndReminderDays.value- 0 != 0){
		alert('The value of "Second alert for deletion" field should be less than the value of the "Alert for deletion" field in the Workspace Settings section.');
  		return false;
	}
	
	
	if(!isNonNegativeInteger(document.serverConfigForm.passwordResetAttemptsMax.value)){
		alert('Invalid value entered for maximum password reset attempts');
  		return false;
	}
	if(!isNonNegativeInteger(document.serverConfigForm.passwordLengthMin.value)){
		alert('Invalid value entered for minimum password length');
  		return false;
	}
	if(!isGreater(document.serverConfigForm.passwordLengthMin.value, 0)){
		alert('Minimum allowed password length is 1');
  		return false;
	}
	if(!isNonNegativeInteger(document.serverConfigForm.passwordLengthMax.value)){
		alert('Invalid value entered for maximum password length');
  		return false;
	}
	
	// SSL and TLS validation
	// Mail server port number could be empty and must be positive integer number.
	if(!isEmptyValue(document.serverConfigForm.mailServerPortNo.value) && 
		(!isPositiveInteger(document.serverConfigForm.mailServerPortNo.value) || document.serverConfigForm.mailServerPortNo.value == 0)) {
		alert('A positive integer value is required in the notification mail server port number.');
		document.serverConfigForm.mailServerPortNo.focus();
		return false;
	}
	// Mail server port number must be entered when encrypted connection type SSL or TLS is selected.
	if(document.serverConfigForm.encryptedConnection.selectedIndex > 0 && isEmptyValue(document.serverConfigForm.mailServerPortNo.value)) {
		alert('Port number must be entered when encrypted connection type SSL or TLS is selected.');
		document.serverConfigForm.mailServerPortNo.focus();
		return false;
	}
	
	document.serverConfigForm.sessionTimeout.value = parseInt(document.serverConfigForm.sessionTimeout.value, 10);
	document.serverConfigForm.deliveryExpirationDays.value = parseInt(document.serverConfigForm.deliveryExpirationDays.value, 10);
	
	if (trimWhitespace(document.serverConfigForm.logoWidth.value).length > 0) {
		document.serverConfigForm.logoWidth.value = parseInt(document.serverConfigForm.logoWidth.value, 10);
	}
	if (trimWhitespace(document.serverConfigForm.logoHeight.value).length > 0) {
		document.serverConfigForm.logoHeight.value = parseInt(document.serverConfigForm.logoHeight.value, 10);
	}
	
	document.serverConfigForm.logonAttemptsMax.value = parseInt(document.serverConfigForm.logonAttemptsMax.value, 10);
	document.serverConfigForm.passwordExpirationDays.value = parseInt(document.serverConfigForm.passwordExpirationDays.value, 10);		
	document.serverConfigForm.passwordExpirationWarningDays.value = parseInt(document.serverConfigForm.passwordExpirationWarningDays.value, 10);		
	document.serverConfigForm.autoPackageDeletionDays.value = parseInt(document.serverConfigForm.autoPackageDeletionDays.value, 10);
	document.serverConfigForm.autoPackageDelReminderDays.value = parseInt(document.serverConfigForm.autoPackageDelReminderDays.value, 10);		

	document.serverConfigForm.passwordResetAttemptsMax.value = parseInt(document.serverConfigForm.passwordResetAttemptsMax.value, 10);		
	i = parseInt(document.serverConfigForm.passwordLengthMin.value, 10);
	j = parseInt(document.serverConfigForm.passwordLengthMax.value, 10);
	document.serverConfigForm.passwordLengthMin.value = i;
	document.serverConfigForm.passwordLengthMax.value = j;
	
	if(i > 50 || j > 50){
		alert('Password length cannot be greater than 50');
  		return false;
  	}
	if(i > j){
		alert('Minimum password length cannot be greater than maximum password length');
  		return false;
	}
	var str = document.serverConfigForm.customHelpUrl.value;
	str = str.replace(/ /g, "");
	if((str.indexOf("\">") != -1) || (str.indexOf("\'>") != -1)){
		alert('Illegal text entered for custom help URL');
		return false;
	}
	
	return true;
}

function frameBuster() {
	if (top.frames.length != 0) {
   		top.location=self.document.location;
	}
}

function gotoUrl(url) {
	location.href=url;
}

function textCounter(field, max) {
	if (field.value.length > max)
		field.value = field.value.substring(0, max);
}

// Get the current time and format it as HH:MM:SS AM|PM
function getCurrentTime() {
	var now = new Date();
	var hours = now.getHours();
	var ampm = "AM";
	if (hours > 12) {
		hours = hours - 12;
		ampm = "PM";
	}
	var minutes = now.getMinutes();
	if (minutes < 10) {
		// minutes below 10 are sent back as "1, 2, 3, ... 9"
		minutes = "0" + minutes;
	}

	var seconds = now.getSeconds();
	if (seconds < 10) {
		// seconds below 10 are sent back as "1, 2, 3, ... 9"
		seconds = "0" + seconds;
	}

	var currentTime = "(" + hours + ":" + minutes + ":" + seconds + " " + ampm + ")";
	return currentTime;
}

// Remove leading and trailing whitespace from a string
function trimWhitespace(string) {
	if (string == null) {
		return '';
	}

   var newString  = '';
   var substring  = '';
   beginningFound = false;

   // copy characters over to a new string
   // retain whitespace characters if they are between other characters
   for (var i = 0; i < string.length; i++) {

      // copy non-whitespace characters
      if (string.charAt(i) != ' ' && string.charCodeAt(i) != 9) {

         // if the temporary string contains some whitespace characters, copy them first
         if (substring != '') {
            newString += substring;
            substring = '';
         }
         newString += string.charAt(i);
         if (beginningFound == false) beginningFound = true;
      }

      // hold whitespace characters in a temporary string if they follow a non-whitespace character
      else if (beginningFound == true) substring += string.charAt(i);
   }
   return newString;
}

/* Cookie Functions */


// For now, the username is the email address -- so read the stored email and insert into the username field.
function cookieReadUsername(emailAddress, domainName) {
	var allCookies = document.cookie;
	var pos = allCookies.indexOf("email=");
	if (pos != -1) {
		var start = pos + 6;
		var end = allCookies.indexOf(";", start);
		if (end == -1) {
			end = allCookies.length;
		}
		var value = unescape(allCookies.substring(start, end));
		var domainNameValue = "";
		var setChecked = false;
		if (value.length > 0) {
			// Get the stored domain name
			var storedDomainName = "";
			pos = allCookies.indexOf("domain=");
			if (pos != -1) {
				start = pos + 7;
				end = allCookies.indexOf(";", start);
				if (end == -1) {
					end = allCookies.length;
				}
				storedDomainName = unescape(allCookies.substring(start, end));
			}

			// If the username is not null, then the remember me checkbox was checked
			// previously, so check it again.
			// If the user is coming from a delivery notification link, must first
			// check to see if the delivery user is the same as the "saved" user in
			// cookie. If so, then set the rememberMe checkbox to true, otherwise set it to false.
			// Domain name follows the same logic. Use stored domain name for all cases except
			// when coming from delivery notification link.
			if ((arguments.length > 0) && (emailAddress.length > 0) && (emailAddress.toLowerCase() != value.toLowerCase())) {
				setChecked = false;
				document.forms[0].username.value = emailAddress;
				domainNameValue = domainName;
			} else {
				setChecked = true;
				document.forms[0].username.value = value;
				domainNameValue = storedDomainName;
			}
		}
		
		// Set the domain name if the domain field is displayed
		if (document.forms[0].displayDomainName.value == "Y") {
			document.forms[0].domain.value = domainNameValue;
		}

		// Set the checkbox value
		document.forms[0].elements["rememberMe"].checked = setChecked;
		if ((value.length > 0) || (emailAddress.length > 0)) {
			// If username is filled in, then focus on the password field.
			var focusControl = document.forms[0].elements["password"];
			if (focusControl.type != "hidden" && !focusControl.disabled) {
				focusControl.focus();
			}
		}

	}
}


// Store the username as the "email address" for now -- because we are storing the email address from the registration page
function cookieStoreUsername() {
	var addSecureFlag = false;
	var expiresDate = new Date(2050, 11, 31);
	var username = document.forms[0].username.value;
	if (addSecureFlag) {
	    document.cookie = "email=" + escape(username) + ";secure; expires=" + expiresDate;
	} else {
        document.cookie = "email=" + escape(username) + "; expires=" + expiresDate;
	}

	// Store the domain value
	var domainName = "";
	if (document.forms[0].displayDomainName.value == "Y") {
		domainName = document.forms[0].domain.value;
	}
	if (addSecureFlag) {
	    document.cookie = "domain=" + escape(domainName) + ";secure; expires=" + expiresDate;
	} else {
	    document.cookie = "domain=" + escape(domainName) + "; expires=" + expiresDate;
	}
}

function cookieStoreEmail() {
    var addSecureFlag = false;
	var expiresDate = new Date(2050, 11, 31);
	var email = document.forms[0].email.value;
	if(addSecureFlag) {
	    document.cookie = "email=" + escape(email) + ";secure; expires=" + expiresDate;
	} else {
	    document.cookie = "email=" + escape(email) + "; expires=" + expiresDate;
	}
}

function cookieRemoveEmail() {
	var expiresDate = new Date(1999, 12, 31);
	document.cookie = "email=; expires=" + expiresDate;
	document.cookie = "domain=; expires=" + expiresDate;
}

function cookieStoreSecureCheckbox() {
	var addSecureFlag = false;
	var expiresDate = new Date(2010, 11, 31);
	var secureChecked = "unchecked";
	if (document.forms[0].secure.checked) {
		secureChecked = "checked";
	}
	if(addSecureFlag) {
	    document.cookie = "secureChecked=" + secureChecked + ";secure; expires=" + expiresDate;
	} else {
	    document.cookie = "secureChecked=" + secureChecked + "; expires=" + expiresDate;
	}
}

function cookieReadSecureCheckbox() {
	var allCookies = document.cookie;
	var pos = allCookies.indexOf("secureChecked=");
	if (pos != -1) {
		var start = pos + 14;
		var end = allCookies.indexOf(";", start);
		if (end == -1) {
			end = allCookies.length;
		}
		var value = allCookies.substring(start, end);
		if (value == 'checked') {
			document.forms[0].secure.checked = true;
		} else {
			document.forms[0].secure.checked = false;
		}
	}
}



function cookieReadEmail() {
	var allCookies = document.cookie;
	var pos = allCookies.indexOf("email=");
	if (pos != -1) {
		var start = pos + 6;
		var end = allCookies.indexOf(";", start);
		if (end == -1) {
			end = allCookies.length;
		}
		var value = unescape(allCookies.substring(start, end));
		document.forms[0].email.value = value;
		if (value.length > 0) {
			var focusControl = document.forms[0].elements["password"];
			if (focusControl.type != "hidden" && !focusControl.disabled) {
				focusControl.focus();
			}
		}
	}
}

function getCookie(name)
{
	var re = new RegExp(name + "=([^;]+)");
	var value = re.exec(document.cookie);
	return (value != null) ? unescape(value[1]) : null;
}

/*
 * This utility method will get the localized message for the scan statuses.
*/
function getScanStatusText(statusCode) {
	
	if( statusCode == "cancelled" ) {
		return "Canceled";	
			
	} else if(statusCode == "completed" ) {
		return "Completed";	
			
	} else if(statusCode == "not-ready" ) {
		return "Not ready";	
			
	} else if(statusCode == "pending" ) {
		return "Pending";
				
	} else if(statusCode == "scanning" ) {
		return "Scanning";	
			
	} else if(statusCode == "skipped" ) {
		return "Skipped";
				
	} else if(statusCode == "stopped" ) {
		return "Stopped";
				
	} else if(statusCode == "waiting" ) {
		return "Waiting";	

	} else if(statusCode == "pending-li" ) {
		return "License expires";	

	} else if(statusCode == "pending-in" ) {
		return "Initialization error";	

	} else if(statusCode == "pending-tm" ) {
		return "Temporary file error";	
			
	} else {
		return "Unknown: "+statusCode;
	}
	
}

/**
 * This method will deliver a localized message for an outcome.
 * To get a more generic message, please use the getGenericOutcomeText() method.
 * Author: Mukit
 */
function getScanOutcomeText(outcomeVal) {
	
	var outcomeText = "Undefined";
	
	if(outcomeVal == 11) {
		outcomeText = "Aborted";
	} else if(outcomeVal == 0) {
		outcomeText = "Clean";
	}else if(outcomeVal == 4) {
		outcomeText = "Cleaned";
	}else if(outcomeVal == 12) {
		outcomeText = "Encrypted archive";
	}else if(outcomeVal == 3) {
		outcomeText = "Failed";
	}else if(outcomeVal == 1) {
		outcomeText = "Infected";
	}else if(outcomeVal == 100) {
		outcomeText = "Not completed";
	}else if(outcomeVal == 10) {
		outcomeText = "Not scanned";
	}
	
	return outcomeText;
}

/**
 * This method will deliver a generic message for a group of similar outcomes.
 * To get a more specific message, please use the getScanOutcomeText() method.
 * Author: Mukit
 */
function getGenericOutcomeText(outcomeVal) {
	
	var outcomeText = "Undefined";
	
	if(outcomeVal == 11) {
		outcomeText = "Unable to scan";
	} else if(outcomeVal == 0) {
		outcomeText = "Clean";
	}else if(outcomeVal == 4) {
		outcomeText = "Cleaned";
	}else if(outcomeVal == 12) {
		outcomeText = "Unable to scan";
	}else if(outcomeVal == 3) {
		outcomeText = "Unable to scan";
	}else if(outcomeVal == 1) {
		outcomeText = "Infected";
	}else if(outcomeVal == 100) {
		outcomeText = "Unable to scan";
	}else if(outcomeVal == 10) {
		outcomeText = "Unable to scan";
	}
	
	return outcomeText;
}

/* Validation Functions */

function isValidPositiveNumber(x) { 
	var anum=/(^\d+$)|(^\d+\.\d+$)/
	if (anum.test(x))
		testresult=true
	else{
		testresult=false
	}
	return (testresult)
}
 
function isValidPositiveNumber2(x) { 
	var anum=/(^\d+$)|(^\d+\.\d+$)/
	if (anum.test(x) && x>0)
		testresult=true
	else{
		testresult=false
	}
	return (testresult)
}

/* Validation positive number 2 decimal place */
function isValidPositiveWith2DecimalPlace(x) {
	var anum=/(^\d+$)|(^\d+\.\d{1,2}$)|(^\.\d{1,2}$)/
	if (anum.test(x) && x>0)
		testresult=true
	else{
		testresult=false
	}
	return (testresult)
}

function isEmpty(aTextField) {

	if (aTextField == null || (aTextField.value == null || aTextField.value.length == 0)) {
		return true;
	} else if (aTextField.value != null || aTextField.value.length != 0) {
	    var str = aTextField.value;
	    if( str.match(/^\s*$/) ) return true;
	} else {
		return false;
	}
}

function validatePassword(p1, p2) {
/*
	if ((p1.value.length < 1) && (p2.value.length < 1)) {
		alert('Passwords cannot be blank');
		return false;
	}
*/
	if (p1.value != p2.value)	{
		alert('Passwords do not match');
		return false;
	}
	return true;
}


function isValidPassword(password1, password2, min, max) {
	var msg = "";

	if (password1 != password2) {
		msg += "\n - " + 'Passwords do not match';
	}
	if ((password1.length < min) || (password2.length < min) || (password1.length > max) || (password2.length > max)) {
		msg += "\n - " + String.format("Passwords must be between {0} and {1} characters long", min, max);
	}

	return msg;
}

// Check that an email address is valid based on RFC 821 (?)
function isValidEmail(address) {
   if (address != '' && address.search) {
      if (address.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) != -1) return true;
      else return false;
   }

   // allow empty strings to return true - screen these with either a 'required' test or a 'length' test
   else return true;
}

// Check that an email address has the form something@something.something
// This is a stricter standard than RFC 821 (?) which allows addresses like postmaster@localhost
function isValidEmailStrict(address) {
   if (isValidEmail(address) == false) return false;
   var domain = address.substring(address.indexOf('@') + 1);
   if (domain.indexOf('.') == -1) return false;
   if (domain.indexOf('.') == 0 || domain.indexOf('.') == domain.length - 1) return false;
   return true;
}

function checkEmail (strng) {
	var error="";
	if (strng == "") {
	   error = "\n - " + 'Email address must be entered.';
	}

    var emailFilter=/^.+@.+\..{1,100}$/;
    if (!(emailFilter.test(strng))) {
       error = "\n - " + 'The Email Address field is not valid';
    } else {
		//test email for illegal characters
		var illegalChars= /[\(\)\<\>\,\;\:\\\"\[\]]/
		if (strng.match(illegalChars)) {
			error = "\n - " + 'The Email Address field contains illegal characters';
		}
    }
	return error;
}



function getInvalidEmails(strEmails) {
    var invalid = null;
    if (strEmails != null) {
    	var inData = strEmails.value;
    	if (inData.length != 0) {
		    /* extract all valid recognizable emails */
		    var emails = inData.match(/([a-zA-Z'0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
	    	/* and the remainings */
		    var remains = inData;
		    if (emails != null) {
				for (var i=0; i<emails.length; i++) {
					remains = remains.replace(emails[i], "");
				}
		    }
		    /* whether remains contain potential characters to be an email */
		    invalid = remains.match(/[^\s|,;]+/gi);
		}
    }
    return invalid;
}



function validateAdminUserCreate(theForm, min_password_length, max_password_length) {
	var msg = "";
	if (theForm.email.value.length == 0) {
		msg += "\n - " + 'An email address must be entered';
	} else {
		msg += checkEmail(theForm.email.value);
	}
	
	if(theForm.displayName.value.length == 0) {
		msg += "\n - " + 'Please enter Display as';
	}

	if(theForm.generatePassword.checked == false){
		msg += isValidPassword(theForm.password1.value, theForm.password2.value, min_password_length, max_password_length);
	}

	if (msg != "") {
		msg = 'The following problems occurred:' + msg;
		alert(msg);
		return false;
	} else {
		// warn if no role is selected
		if (!(getFieldValue(theForm.roleRecipient, false)) 
			&& !(getFieldValue(theForm.roleSender, false)) 
			&& !(getFieldValue(theForm.roleLimitedSender, false)) 
			&& !(getFieldValue(theForm.roleReport, false)) 
			&& !(getFieldValue(theForm.roleCompliance, false)) 
			&& !(getFieldValue(theForm.anyAdminRole, false))
			) {
			return confirm('No role selected for the user. Are you sure you want to continue?');
		}else{
		return true;
		}
	}
}

function validateAdminUserPasswordReset(theForm, min_password_length, max_password_length) {
	var msg = "";

	if(theForm.generatePassword.checked == false){
		msg += isValidPassword(theForm.password1.value, theForm.password2.value, min_password_length, max_password_length);
	}
	if (msg != "") {
		msg = 'The following problems occurred while updating user:' + msg;
		alert(msg);
		return false;
	} else {
		return true;
	}
}

function validateUserPasswordReset(theForm, min_password_length, max_password_length) {
	var msg = "";

	msg += isValidPassword(theForm.password1.value, theForm.password2.value, min_password_length, max_password_length);

	if (msg != "") {
		msg = 'The following problems occurred:' + msg;
		alert(msg);
		return false;
	} else {
		return true;
	}
}

function confirmEmail(email1,email2){
	var msg = "";
	if(email1.toLowerCase()!=email2.toLowerCase()){
		msg += "\n - " + 'Confirm email address does not match';
	}
	return msg;
}

function validateUserRegister(theForm, min_password_length, max_password_length) {
	var msg = "";

	if (theForm.email.value.length == 0) {
		msg += "\n - " + 'Email address must be entered.';
	} else {
		if(checkEmail(theForm.email.value)!=""){
			msg += checkEmail(theForm.email.value);
		} else {
			msg += confirmEmail(theForm.email.value, theForm.email2.value);
		}
	}

	if(theForm.displayName.value.length == 0) {
		msg += "\n - " + 'Please enter Display as';
	}

	msg += isValidPassword(theForm.password1.value, theForm.password2.value, min_password_length, max_password_length);
	
	if(theForm.recaptcha_response_field != null && theForm.recaptcha_response_field.value.length == 0){
		msg += "\n - " + 'The image verification code must be entered';
	}
	
	if (theForm.predefinedQ.value == "false"){
		var question = theForm.questions.value;
		var answer = theForm.answers.value;
		var hint = theForm.hints.value;
		
		if((question.toLowerCase() == answer.toLowerCase()) && (question !="")){
			msg += "\n - " + 'Password reset question and answer should not be the same.';
		}else if((question.toLowerCase() == hint.toLowerCase()) && (question !="")){
			msg += "\n - " + 'Password reset question and hint should not be the same.';
		}else if((answer.toLowerCase() == hint.toLowerCase()) && (answer !="")){
			msg += "\n - " + 'Answer of password reset question and hint should not be the same.';
		}
	}else if(theForm.predefinedQ.value == "true"){
		var question = theForm.predefinedQ.options[theForm.predefinedQ.selectedIndex].value;
		var answer = theForm.answers.value;
		var hint = theForm.hints.value;
		
		if((question.toLowerCase() == answer.toLowerCase()) && (question !="")){
			msg += "\n - " + 'Password reset question and answer should not be the same.';
		}else if((question.toLowerCase() == hint.toLowerCase()) && (question !="")){
			msg += "\n - " + 'Password reset question and hint should not be the same.';
		}else if((answer.toLowerCase() == hint.toLowerCase()) && (answer !="")){
			msg += "\n - " + 'Answer of password reset question and hint should not be the same.';
		}
	}

	if (msg != "") {
		msg = 'The following registration problems occurred:' + msg;
		alert(msg);
		return false;
	} else {
		return true;
	}
}

function validateExternalAuthSourceCreate(theForm){
	var msg = "";
	var domainNameGiven = false;

	if (theForm.sourceName.value.length == 0) {
		msg += "\n - " + 'Authentication source name must be entered.';
	} 

	if (theForm.realm.value.length == 0) {
		msg += "\n - " + 'Realm must be entered.';
	}
	
	if (theForm.port.value.length == 0) {		
		msg += "\n - " + 'Port must be entered.';
	} else if( !isValidPositiveNumber2(theForm.port.value)){
		msg += "\n - " + 'Invalid value entered for port.';
	}
	
	if (theForm.adConnectorHost.value.length == 0) {
		msg += "\n - " + 'Connector host must be entered.';
	}
	
	if (theForm.adConnectorPort.value.length == 0) {
		msg += "\n - " + 'Connector port must be entered.';
	}else if( !isValidPositiveNumber2(theForm.adConnectorPort.value)){
		msg += "\n - " + 'Connector port must be positive non zero number.';
	}
	
	if ((theForm.winPreDomain1.value.length != 0) || (theForm.winPreDomain2.value.length != 0) || (theForm.winPreDomain3.value.length != 0)
		|| (theForm.winPreDomain4.value.length != 0) || (theForm.winPreDomain5.value.length != 0))
		domainNameGiven = true;

	if ((domainNameGiven == true) && (theForm.domainName.value.length == 0)) {
		msg += "\n - " + 'Map to domain name must be entered.';
	}
	
	if (msg != "") {
		msg = 'The following problems occurred: ' +msg;
		alert(msg);
		return false;
	} else {
		return true;
	}
}


function validateCreateLDAPAuthenticationSource(theForm){
	var msg = "";

	if (theForm.sourceName.value.length == 0) {
		msg += "\n - " + 'Authentication source name must be entered.';
	} 
	
	if (theForm.server.value.length == 0) {
		msg += "\n - " + 'LDAP server must be entered.';
	} 
	
	if (theForm.portId.value.length == 0) {
		msg += "\n - " + 'LDAP port must be entered.';
	}  else if( !isValidPositiveNumber2(theForm.portId.value)){
		msg += "\n - " + 'Invalid value entered for LDAP port.';
	}
	
	if (theForm.baseDNs.value.length == 0) {
		msg += "\n - " + 'Base DNS must be entered.';
	} 
	
	if (theForm.usernameAttribute.value.length == 0) {
		msg += "\n - " + 'Username attribute must be entered.';
	} 
	
	if (theForm.groupMembershipAttribute.value.length == 0) {
		msg += "\n - " + 'Group membership attribute must be entered.';
	} 
	
	if (theForm.emailAddress.value.length == 0) {
		msg += "\n - " + 'Email address must be entered.';
	} 

	if (msg != "") {
		msg = 'The following problems occurred: ' +msg;
		alert(msg);
		return false;
	} else {
		return true;
	}
}

function validateCreateSamlSSOAuthenticationSource(theForm){
	var msg = "";

	if (theForm.sourceName.value.length == 0) {
		msg += "\n - " + 'Authentication source name must be entered.';
	} 

	if (theForm.samlRoleAttribute.value.length == 0) {
		msg += "\n - " + 'Single Sign-on authentication source saml role attribute must be entered.';
	}

    if (theForm.idpLoginUrl.value.length == 0) {
        msg += "\n - " + 'Single Sign-on authentication source identity provider login url must be entered.';
    }

	if(theForm.configurationType.value.length == 0) {

		msg += "\n - " + 'Single Sign-on authentication source saml configuration type must be entered.';

	} else {

		if('Manual' == theForm.configurationType.value) {
			if (theForm.issuer.value.length == 0) {
				msg += "\n - " + 'Single Sign-on authentication source issuer must be entered.';
			}

			if (theForm.idpLogoutUrl.value.length == 0) {
				msg += "\n - " + 'Single Sign-on authentication source identity provider logout url must be entered.';
			}

		} else if('Metadata' == theForm.configurationType.value) {
			if (theForm.metadata.value.length == 0) {
				msg += "\n - " + 'Single Sign-on authentication source metadata must be entered.';
			}
		}
	}


	if (theForm.emailAddress.value.length == 0) {
		msg += "\n - " + 'Email address must be entered.';
	}

	if (msg != "") {
		msg = 'The following problems occurred:' +msg;
		alert(msg);
		return false;
	} else {
		return true;
	}
}


function validateAdminUserUpdate(theForm) {

}

function validatePackageCreate(theForm, latestDeliveryExpirationDate) {

	var why = "";
	
	// Check for auto deletion date after latest delivery expiration date
	if (!isEmpty(theForm.autoPackageDeletionDate) && latestDeliveryExpirationDate.length != 0) {
		var d1 = strtodate(theForm.autoPackageDeletionDate.value);
		var d2 = strtodate(latestDeliveryExpirationDate);
		if (d2 > d1) {
			why += 'At least one delivery for this package is scheduled to expire after the value specified for the "Auto delete date" field. Do you still want to set the "Auto delete date" to this value?';
			x = confirm (why);
			
			if(x){} else return x;
		} 
	}
	
	why = "";
	
	var restrictedFiles = "";
	
	if (isEmpty(theForm.packageName)) {
	 	why += "\n - " + 'Package name must be entered';
	}

	// Check for auto deletion date before the deletion reminder date
	if (!isEmpty(theForm.autoPackageDeletionDate) && !isEmpty(theForm.autoPackageDelReminderDate)) {
		var d1 = strtodate(theForm.autoPackageDeletionDate.value);
		var d2 = strtodate(theForm.autoPackageDelReminderDate.value);
		if (d2 > d1) {
			why += "\n - " +'The "Auto delete date" is before the "Alert for deletion"';
		} 
	}

	// check to see if current date occurs before the auto deletion date
    if(!isEmptyValue(latestDeliveryExpirationDate)){
       var d1 = new Date().getTime();
       var d2 = strtodate(latestDeliveryExpirationDate);

       if(d1>d2){
          why += "\n - " + 'The auto package deletion date occurs before the current date.';
          firstInvalidField = (firstInvalidField == null)? theForm.dateExpires : firstInvalidField;
       }
    }

    // check to see if current date occurs before the auto deletion reminder date
    if(!isEmpty(theForm.autoPackageDelReminderDate)){
       var d1 = new Date().getTime();
       var d2 = strtodate(theForm.autoPackageDelReminderDate.value);

       if(d1>d2){
          why += "\n - " + 'The auto package deletion reminder date occurs before the current date.';
          firstInvalidField = (firstInvalidField == null)? theForm.dateExpires : firstInvalidField;
       }
    }


    // Check to see if the 2nd reminder date occurs before the deletion date
    if(theForm.autoPackageDeletionDate && !isEmpty(theForm.autoPackageDel2ndReminderDate) && !isEmptyValue(latestDeliveryExpirationDate)){
        var d1 = strtodate(theForm.autoPackageDel2ndReminderDate.value);
        var d2 = strtodate(latestDeliveryExpirationDate);

        if(d1 > d2){
            why += "\n - " + 'The workspace auto deletion date occurs before the second alert for deletion date.';
            firstInvalidField = (firstInvalidField == null)? theForm.dateExpires : firstInvalidField;
        }
    }

     // check to see if current date occurs before the auto deletion 2nd reminder date
     if(!isEmpty(theForm.autoPackageDel2ndReminderDate)){
        var d1 = new Date().getTime();
        var d2 = strtodate(theForm.autoPackageDel2ndReminderDate.value);

        if(d1>d2){
           why += "\n - " + 'The package second alert for deletion date occurs before the current date.';
           firstInvalidField = (firstInvalidField == null)? theForm.dateExpires : firstInvalidField;
        }
     }


     // check to see if auto deletion 2nd reminder date is less than reminder date
     if(!isEmpty(theForm.autoPackageDelReminderDate) && !isEmpty(theForm.autoPackageDel2ndReminderDate)){
        var d1 = strtodate(theForm.autoPackageDelReminderDate.value);
        var d2 = strtodate(theForm.autoPackageDel2ndReminderDate.value);

        if(d1>d2){
           why += "\n - " + 'The workspace second alert for deletion date occurs before the alert for deletion date.';
           firstInvalidField = (firstInvalidField == null)? theForm.dateExpires : firstInvalidField;
        }
     }
	
	if (! isEmpty(theForm.owners)) {
//		var invalid = getInvalidEmails(theForm.owners);
//		if (invalid != null) {
//	 		why += "\n - " + 'Please correct or remove the following invalid email addresses:';
//	 		for (var i=0; i<invalid.length; i++) {
//	 			why += "\n" + invalid[i];
//	 		}
//		}
	}

	restrictedFiles = checkRestrictedFilesJS(theForm);
	
	if (restrictedFiles != "") {
		why += restrictedFiles;
	}
	
	if (why != "") {
		why = 'There are problems with your package:' + why;
		alert(why);
		return false;
	} else {
		return true;
	}
}


function validateWorkspaceCreate(theForm, currentAutoWorkspaceDeletionDate) {

	var why = "";
    var restrictedFiles = "";
    firstInvalidField = null;

    if (isEmpty(theForm.workspaceName)) {
    		why += "\n - " + 'Workspace name can not be blank';
    		firstInvalidField = (firstInvalidField == null)? theForm.workspaceName : firstInvalidField;
    }

    // Check to see if the reminder date occurs before the deletion date
    if(theForm.autoWorkspaceDeletionDate && !isEmpty(theForm.autoWorkspaceDelReminderDate) && !isEmptyValue(currentAutoWorkspaceDeletionDate)){
        var d1 = strtodate(theForm.autoWorkspaceDelReminderDate.value);
        var d2 = strtodate(currentAutoWorkspaceDeletionDate);

        if(d1 > d2){
            why += "\n - " + 'The workspace auto deletion date occurs before the alert for deletion date.';
            firstInvalidField = (firstInvalidField == null)? theForm.dateExpires : firstInvalidField;
        }
    }

    // check to see if current date occurs before the auto deletion date
    if(!isEmptyValue(currentAutoWorkspaceDeletionDate)){
        var d1 = new Date().getTime();
        var d2 = strtodate(currentAutoWorkspaceDeletionDate);

        if(d1>d2){
           why += "\n - " + 'The workspace auto deletion date occurs before the current date.';
           firstInvalidField = (firstInvalidField == null)? theForm.dateExpires : firstInvalidField;
        }
    }

    // check to see if current date occurs before the auto deletion reminder date
     if(!isEmpty(theForm.autoWorkspaceDelReminderDate)){
        var d1 = new Date().getTime();
        var d2 = strtodate(theForm.autoWorkspaceDelReminderDate.value);

        if(d1>d2){
           why += "\n - " + 'The workspace alert for deletion date occurs before the current date.';
           firstInvalidField = (firstInvalidField == null)? theForm.dateExpires : firstInvalidField;
        }
     }



    // Check to see if the 2nd reminder date occurs before the deletion date
    if(theForm.autoWorkspaceDeletionDate && !isEmpty(theForm.autoWorkspaceDel2ndReminderDate) && !isEmptyValue(currentAutoWorkspaceDeletionDate)){
        var d1 = strtodate(theForm.autoWorkspaceDel2ndReminderDate.value);
        var d2 = strtodate(currentAutoWorkspaceDeletionDate);

        if(d1 > d2){
            why += "\n - " + 'The workspace auto deletion date occurs before the second alert for deletion date.';
            firstInvalidField = (firstInvalidField == null)? theForm.dateExpires : firstInvalidField;
        }
    }

     // check to see if current date occurs before the auto deletion 2nd reminder date
     if(!isEmpty(theForm.autoWorkspaceDel2ndReminderDate)){
        var d1 = new Date().getTime();
        var d2 = strtodate(theForm.autoWorkspaceDel2ndReminderDate.value);

        if(d1>d2){
           why += "\n - " + 'The workspace second alert for deletion date occurs before the current date.';
           firstInvalidField = (firstInvalidField == null)? theForm.dateExpires : firstInvalidField;
        }
     }


     // check to see if auto deletion 2nd reminder date is less than reminder date
     if(!isEmpty(theForm.autoWorkspaceDelReminderDate) && !isEmpty(theForm.autoWorkspaceDel2ndReminderDate)){
        var d1 = strtodate(theForm.autoWorkspaceDelReminderDate.value);
        var d2 = strtodate(theForm.autoWorkspaceDel2ndReminderDate.value);

        if(d1>d2){
           why += "\n - " + 'The workspace second alert for deletion date occurs before the alert for deletion date.';
           firstInvalidField = (firstInvalidField == null)? theForm.dateExpires : firstInvalidField;
        }
     }


    restrictedFiles = checkRestrictedFilesJS(theForm);

    if (restrictedFiles != "") {
    		why += restrictedFiles;
    }

    if (why != "") {
        why = 'There are problems with your workspace:' + why;
    	alert(why);
    	return false;
    } else {
    	return true;
    }


}

function validateWorkspaceEditInfo(theForm, currentAutoPackageDeletionDate) {

	var why = "";
    var restrictedFiles = "";
    firstInvalidField = null;

    if (isEmpty(theForm.packageName)) {
    		why += "\n - " + 'Workspace name can not be blank';
    		firstInvalidField = (firstInvalidField == null)? theForm.packageName : firstInvalidField;
    }

    // Check to see if the reminder date occurs before the deletion date
    if(theForm.autoPackageDeletionDate && !isEmpty(theForm.autoPackageDelReminderDate) && !isEmptyValue(currentAutoPackageDeletionDate)){
        var d1 = strtodate(theForm.autoPackageDelReminderDate.value);
        var d2 = strtodate(currentAutoPackageDeletionDate);

        if(d1 > d2){
            why += "\n - " + 'The workspace auto deletion date occurs before the alert for deletion date.';
            firstInvalidField = (firstInvalidField == null)? theForm.dateExpires : firstInvalidField;
        }
    }

    // check to see if current date occurs before the auto deletion date
    if(!isEmptyValue(currentAutoPackageDeletionDate)){
        var d1 = new Date().getTime();
        var d2 = strtodate(currentAutoPackageDeletionDate);

        if(d1>d2){
           why += "\n - " + 'The workspace auto deletion date occurs before the current date.';
           firstInvalidField = (firstInvalidField == null)? theForm.dateExpires : firstInvalidField;
        }
    }

    // check to see if current date occurs before the auto deletion reminder date
     if(!isEmpty(theForm.autoPackageDelReminderDate)){
        var d1 = new Date().getTime();
        var d2 = strtodate(theForm.autoPackageDelReminderDate.value);

        if(d1>d2){
           why += "\n - " + 'The workspace alert for deletion date occurs before the current date.';
           firstInvalidField = (firstInvalidField == null)? theForm.dateExpires : firstInvalidField;
        }
     }

    // Check to see if the 2nd reminder date occurs before the deletion date
    if(theForm.autoPackageDeletionDate && !isEmpty(theForm.autoPackageDel2ndReminderDate) && !isEmptyValue(currentAutoPackageDeletionDate)){
        var d1 = strtodate(theForm.autoPackageDel2ndReminderDate.value);
        var d2 = strtodate(currentAutoPackageDeletionDate);

        if(d1 > d2){
            why += "\n - " + 'The workspace auto deletion date occurs before the second alert for deletion date.';
            firstInvalidField = (firstInvalidField == null)? theForm.dateExpires : firstInvalidField;
        }
    }

     // check to see if current date occurs before the auto deletion 2nd reminder date
     if(!isEmpty(theForm.autoPackageDel2ndReminderDate)){
        var d1 = new Date().getTime();
        var d2 = strtodate(theForm.autoPackageDel2ndReminderDate.value);

        if(d1>d2){
           why += "\n - " + 'The workspace second alert for deletion date occurs before the current date.';
           firstInvalidField = (firstInvalidField == null)? theForm.dateExpires : firstInvalidField;
        }
     }


     // check to see if auto deletion 2nd reminder date is less than reminder date
     if(!isEmpty(theForm.autoPackageDelReminderDate) && !isEmpty(theForm.autoPackageDel2ndReminderDate)){
        var d1 = strtodate(theForm.autoPackageDelReminderDate.value);
        var d2 = strtodate(theForm.autoPackageDel2ndReminderDate.value);

        if(d1>d2){
           why += "\n - " + 'The workspace second alert for deletion date occurs before the alert for deletion date.';
           firstInvalidField = (firstInvalidField == null)? theForm.dateExpires : firstInvalidField;
        }
     }




    restrictedFiles = checkRestrictedFilesJS(theForm);

    if (restrictedFiles != "") {
    		why += restrictedFiles;
    }

    if (why != "") {
        why = 'There are problems with your workspace:' + why;
    	alert(why);
    	return false;
    } else {
    	return true;
    }


}

// Check to see if the user enters any restricted characters or not
function validateGroupCreate(theForm, invalidGroupNameMsg) {
	var msg = "";
	var value = theForm.groupName.value;
	
	if (value.length == 0) {
		msg = "\n - " + 'Group name cannot be empty';
		alert(msg);
		return false;
 	}
 	
	if ((value.indexOf('\\') > -1) || (value.indexOf('/') > -1)
			|| (value.indexOf('<') > -1) || (value.indexOf('>') > -1)
			|| (value.indexOf('[') > -1) || (value.indexOf(']') > -1)
			|| (value.indexOf(':') > -1) || (value.indexOf(';') > -1)
			|| (value.indexOf('|') > -1) || (value.indexOf('=') > -1)
			|| (value.indexOf(',') > -1) || (value.indexOf('+') > -1)
			|| (value.indexOf('*') > -1) || (value.indexOf('?') > -1) || (value.indexOf('@') > -1)) {
	 	msg = invalidGroupNameMsg;
		alert(msg);
		return false;
	}

	return true;
}


// Check to see if the user has selected any files to delete
function validatePackageDeleteFiles(theForm) {
	var docIdArray = theForm.documentIdArray;
	var atLeastOneSelected = false;

	if (typeof docIdArray.length != "number") {
		// Only one checkbox -- check for that
		if (docIdArray.checked == true) {
			atLeastOneSelected = true;
		}
	} else {
		// More than one checkbox -- can loop through array
		for (var i=0; i < docIdArray.length ; i++ ) {
			if (docIdArray[i].checked == true) {
				atLeastOneSelected = true;
			}
		}
	}
	if (!atLeastOneSelected) {
		alert('Please select at least one file to delete to continue');
	}

	return atLeastOneSelected;
}

// Check to see if the user has selected at least one check box
function checkAtLeastOne(checkboxes, msg) {
	var atLeastOneSelected = false;

	if (typeof checkboxes.length != "number") {
		// Only one checkbox -- check for that
		if (checkboxes.checked == true) {
			atLeastOneSelected = true;
		}
	} else {
		// More than one checkbox -- can loop through array
		for (var i=0; i < checkboxes.length ; i++ ) {
			if (checkboxes[i].checked == true) {
				atLeastOneSelected = true;
			}
		}
	}
	if (!atLeastOneSelected) {
		alert(msg);
	}

	return atLeastOneSelected;
}

// Check to see if the user has selected at least one check box of the external auth sources
function checkAtLeastOneAuthSrc(checkboxes1, checkboxes2, checkboxes3, msg) {

	var atLeastOneSelectedAuthSrc = false;
	var atLeastOneSelectedAuthSrc1 = false;
	var atLeastOneSelectedAuthSrc2 = false;
	var atLeastOneSelectedAuthSrc3 = false;

	// for 1st auth sources
	if(checkboxes1 != null)
	{
		if (typeof checkboxes1.length != "number") {
			// Only one checkbox -- check for that
			if (checkboxes1.checked == true) {
				atLeastOneSelectedAuthSrc1 = true;
			}
		} else {
			// More than one checkbox -- can loop through array
			for (var i=0; i < checkboxes1.length ; i++ ) {
				if (checkboxes1[i].checked == true) {
					atLeastOneSelectedAuthSrc1 = true;
				}
			}
		}
	}

	// for 2nd auth sources
	if(checkboxes2 != null)
	{
		if (typeof checkboxes2.length != "number") {
			// Only one checkbox -- check for that
			if (checkboxes2.checked == true) {
				atLeastOneSelectedAuthSrc2 = true;
			}
		} else {
			// More than one checkbox -- can loop through array
			for (var i=0; i < checkboxes2.length ; i++ ) {
				if (checkboxes2[i].checked == true) {
					atLeastOneSelectedAuthSrc2 = true;
				}
			}
		}
	}

	// for 3rd auth sources
    if(checkboxes3 != null)
    {
    	if (typeof checkboxes3.length != "number") {
    		// Only one checkbox -- check for that
    		if (checkboxes3.checked == true) {
    			atLeastOneSelectedAuthSrc3 = true;
    		}
    	} else {
    		// More than one checkbox -- can loop through array
    		for (var i=0; i < checkboxes3.length ; i++ ) {
    			if (checkboxes3[i].checked == true) {
    				atLeastOneSelectedAuthSrc3 = true;
    			}
    		}
    	}
    }
	
	if (!atLeastOneSelectedAuthSrc1 && !atLeastOneSelectedAuthSrc2 && !atLeastOneSelectedAuthSrc3) {
		alert(msg);
	} else {
		atLeastOneSelectedAuthSrc = true;
	}

	return atLeastOneSelectedAuthSrc;
}


// Check to see if Dropdown Box is empty
function validateDropdownBox(dItem, msg) {
	if (dItem.selectedIndex == -1) {
		alert(msg);
		return false;
	} else {
		return true;
	}
}

/**
 * The firstInvalidField variable keep track of the first invalid field in validateDelivery() method
 * and it's can be get by getFirstInvalidField() method.
 * Author #Mukit
 */
var firstInvalidField = null;

function getFirstInvalidField(){
	return firstInvalidField;
}

function validateDelivery(theForm, currentPackageAutoDeletionDate) {
	var why = "";
	var restrictedFiles = "";
	firstInvalidField = null;
	if (isEmpty(theForm.recipientsTo) && isEmpty(theForm.recipientsCc) && isEmpty(theForm.recipientsBcc)) {
	 	why += "\n - " + 'At least one email must be entered';
	 	firstInvalidField = (firstInvalidField == null)? theForm.recipientsTo : firstInvalidField;
	} else {
//		var invalidTo = getInvalidEmails(theForm.recipientsTo);
//		if (invalidTo != null) {
//	 		why += "\n - " + 'Please correct or remove the following invalid recipient email addresses in the To field:';
//	 		for (var i=0; i<invalidTo.length; i++) {
//	 			why += "\n" + invalidTo[i];
//	 		}
//		}
//		var invalidCc = getInvalidEmails(theForm.recipientsCc);
//		if (invalidCc != null) {
//	 		why += "\n - " + 'Please correct or remove the following invalid recipient email addresses in the Cc field:';
//	 		for (var i=0; i<invalidCc.length; i++) {
//	 			why += "\n" + invalidCc[i];
//	 		}
//		}
//		var invalidBcc = getInvalidEmails(theForm.recipientsBcc);
//		if (invalidBcc != null) {
//	 		why += "\n - " + 'Please correct or remove the following invalid recipient email addresses in the Bcc field:';
//	 		for (var i=0; i<invalidBcc.length; i++) {
//	 			why += "\n" + invalidBcc[i];
//	 		}
//		}
	}
	

	if (isEmpty(theForm.name)) {
		why += "\n - " + 'A subject must be entered';
		firstInvalidField = (firstInvalidField == null)? theForm.name : firstInvalidField;
	}

	if (theForm.password1.value != theForm.password2.value) {
		why += "\n - " + 'Passwords do not match';
                firstInvalidField = (firstInvalidField == null)? theForm.password1 : firstInvalidField;
	}

	// Check whether payment amount is correct for required payment delivery
	if ((theForm.requiresPayment != null) && (theForm.requiresPayment.checked == true)) {
		if(!isValidPositiveWith2DecimalPlace(theForm.amount.value)){
			why += "\n - " + 'Please enter a valid payment amount';
		}else if(isGreaterFloat(theForm.amount.value , 10000)){
			why += "\n - " + 'Please enter a payment amount not more than 10000';
		}
	}

	// Check notification email addresses
	if (!isEmpty(theForm.notificationEmails)) {
		var invalidNotificationEmails = getInvalidEmails(theForm.notificationEmails);
		if (invalidNotificationEmails != null) {
			why += "\ - " + 'Please correct or remove the following invalid email notification addresses:';
	 		for (var i=0; i<invalidNotificationEmails.length; i++) {
	 			why += "\n" + invalidNotificationEmails[i];
	 		}
	 		firstInvalidField = (firstInvalidField == null)? theForm.notificationEmails : firstInvalidField;
		}
	}

	// Check for expiration date before available date
	if (!isEmpty(theForm.dateAvailable) && !isEmpty(theForm.dateExpires)) {
		var d1 = strtodate(theForm.dateAvailable.value);
		var d2 = strtodate(theForm.dateExpires.value);
		if (d1 > d2) {
			why += "\n - " + 'Expiration date occurs before available date';
			firstInvalidField = (firstInvalidField == null)? theForm.dateAvailable : firstInvalidField;
		}
	}
	
	// Check for auto package deletion date before delivery available date
	if (!isEmpty(theForm.dateAvailable) && !isEmptyValue(currentPackageAutoDeletionDate)) {
		var d1 = strtodate(theForm.dateAvailable.value);
		var d2 = strtodate(currentPackageAutoDeletionDate);
		if (d1 > d2) {
			//why += "\n - " + 'Expiration date occurs before available date';
			why += "\n - " + String.format('This delivery will be automatically deleted by the system on {0}. Please set the "Date available" field to an earlier date.', currentPackageAutoDeletionDate);
			firstInvalidField = (firstInvalidField == null)? theForm.dateAvailable : firstInvalidField;
		}
	}

	// This block works if the delivery creation form doesn't contain the auto  deletion date field
	if (!theForm.autoPackageDeletionDate && (!isEmpty(theForm.dateExpires) && !isEmptyValue(currentPackageAutoDeletionDate))) {
		var d1 = strtodate(theForm.dateExpires.value);
		var d3 = strtodate(currentPackageAutoDeletionDate);
		
		if((currentPackageAutoDeletionDate.length > 0) && (d1 > d3)){
			why += "\n - " + String.format('This delivery will be automatically deleted by the system on {0}. Please set the "Date expires" field to an earlier date.', currentPackageAutoDeletionDate);
			firstInvalidField = (firstInvalidField == null)? theForm.dateExpires : firstInvalidField;
		}
		
	}
	
	// Check for package auto deletion date before expiration date
	if (theForm.autoPackageDeletionDate && (!isEmpty(theForm.dateExpires) && !isEmptyValue(currentPackageAutoDeletionDate))) {
		var d1 = strtodate(theForm.dateExpires.value);
		var d2 = strtodate(currentPackageAutoDeletionDate);
		
		if (d1 > d2) {
			why += "\n - " + String.format('This delivery will be automatically deleted by the system on {0}. Please set the "Date expires" field to an earlier date.', theForm.autoPackageDeletionDate.value);
			firstInvalidField = (firstInvalidField == null)? theForm.dateExpires : firstInvalidField;
		}
	}
	
	restrictedFiles = checkRestrictedFilesJS(theForm);
	
	if (restrictedFiles != "") {
		why += restrictedFiles;
	} 
									
	if (why != "") {
		why = 'There are problems with your delivery:' + why;
		alert(why);
		return false;
	} else {
		return true;
	}
}

/* Check for restricted files to be uploaded in a form
	Author - Shahed
*/
function checkRestrictedFilesJS(theForm) {
	var restrictedFiles = "";
	if(bypassUser != "true") {
		for (var i=0; i<theForm.length; i++) {
			if (theForm.elements[i].type && theForm.elements[i].type == "file" && 
				matchesWildcard(theForm.elements[i].value, extUploadingPat, false)) {
				restrictedFiles += "\n - \"" + theForm.elements[i].value + "\"";
			}
		}
	}
	if (restrictedFiles != "") {
		restrictedFiles = "\n" + 'The following file types are restricted and cannot be uploaded:' + restrictedFiles;
		restrictedFiles += "\n" + 'Please remove the above filenames from your request and submit again.';
	}
	return restrictedFiles;
}
 
function toggleLayer(whichLayer) {
	if (document.getElementById) {
		// this is the way the standards work
		var style2 = document.getElementById(whichLayer).style;
		var display = style2.display.toLowerCase();
		style2.display = (display == "block") ? "none" : "block";
	}
	else if (document.all) {
		// this is the way old msie versions work
		var style2 = document.all[whichLayer].style;
		var display = style2.display.toLowerCase();
		style2.display = (display == "block") ? "none" : "block";
	}
	else if (document.layers) {
		// this is the way nn4 works
		var style2 = document.layers[whichLayer].style;
		var display = style2.display.toLowerCase();
		style2.display = (display == "block") ? "none" : "block";
	}
}

function showLayer(whichLayer) {
	if (document.getElementById) {
		// this is the way the standards work
		var style2 = document.getElementById(whichLayer).style;
		style2.display = "block";
	}
	else if (document.all) {
		// this is the way old msie versions work
		var style2 = document.all[whichLayer].style;
		style2.display = "block";
	}
	else if (document.layers) {
		// this is the way nn4 works
		var style2 = document.layers[whichLayer].style;
		style2.display = "block";
	}
}

function hideLayer(whichLayer) {
	if (document.getElementById) {
		// this is the way the standards work
		var style2 = document.getElementById(whichLayer).style;
		style2.display = "none";
	}
	else if (document.all) {
		// this is the way old msie versions work
		var style2 = document.all[whichLayer].style;
		style2.display = "none";
	}
	else if (document.layers) {
		// this is the way nn4 works
		var style2 = document.layers[whichLayer].style;
		style2.display = "none";
	}
}


/////////////////// Preview
function fdsEscape(str) {
	var retval = '';
	var i;
	var c;
	for (i = 0; i < str.length; i++) {
		c = str.charAt(i);
		if (c == '<') {
			retval += '&lt;';
		} else if (c == '>') {
			retval += '&gt;';
		} else if (c == '&') {
			retval += '&amp;';
		} else if (c == '\'' ) {
			retval += '&#39;';
		} else if (c == '"') {
			retval += '&quot;';
		} else {
			retval += c;
		}
	}
	return(retval);
}

function displayPreview(htmlContent, message, permanentMessage, srcDelivery, isHtmlMail) {
    var re = new RegExp ('\n', 'gi') ;
	message = message.replace(re, '<br>');

    htmlContent += message;

	if (isHtmlMail) {
    	htmlContent += "</div>\n<hr>\n";
        htmlContent += "<br>\n";
    	htmlContent += "</td>\n</tr>\n";
    	htmlContent += "</table>\n";

    	htmlContent += '<div align="center"><!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" style="height:30pt;v-text-anchor:middle;width:200pt;" arcsize="10%" stroke="f" fillcolor="#428bca"><w:anchorlock/><center style="color:#ffffff;font-family:sans-serif;font-size:13pt;font-weight:bold;">View delivery</center></v:roundrect><![endif]-->';
        htmlContent += '<!--[if !mso]> <!--><table cellspacing="0" cellpadding="0"><tr><td align="center" width="200" height="40" bgcolor="#428bca" style="-webkit-border-radius: 5px; -moz-border-radius: 5px; border-radius: 5px; color: #ffffff; display: block;"><span style="color: #ffffff; font-size:16px; font-weight: bold; font-family:sans-serif; text-decoration: none; line-height:40px; width:100%; display:inline-block">View delivery</span></td></tr></table><!-- <![endif]--></div>';
	} else {
	    htmlContent += "</div>\n";
        htmlContent += "<br>\n";
    	htmlContent += "</td>\n</tr>\n";
    	htmlContent += "</table>\n";

		htmlContent += "<br>\n";
		htmlContent += "<table><tr>\n";
    	htmlContent += "<td>Sender</td><td> :  " + fdsEscape(srcDelivery.senderInfo.value) + "\n";
    	htmlContent += "<br></td></tr><tr><td>\n";

    	htmlContent += "Link</td><td> :  " + fdsEscape(srcDelivery.deliveryLink.value) + "\n";
    	htmlContent += "<br></td></tr><tr><td></td><td>\n";
    	htmlContent += "  * The URL link in this preview is an example only -- it is not the actual link sent to recipients\n";
    	htmlContent += "<br>\n";
    	htmlContent += "<br></td></tr><tr><td>\n";

        var to = fdsEscape(srcDelivery.recipientsTo.value).trim();
        if (to.charAt(to.length - 1) == ";") {
            to = to.substring(0, to.length - 1);
        }
    	htmlContent += "Sent To</td><td> :  " + to + "\n";
        htmlContent += "<br></td></tr></table>\n";
	}

	// footer
	htmlContent += "<tr><td><br>" + permanentMessage + "</td></tr>\n";
	htmlContent += "</table>\n";
	htmlContent += "</body>\n";
	htmlContent += "</html>\n";

    dialog = bootbox.alert({
      title: 'Delivery Preview Notification',
      className: "sft-modal",
      message: htmlContent,
      buttons: {
                    ok: {
                        label: "Close",
                        className: "btn btn-default input-sm",
                        callback: function () {
                        }
                    }
                },
      onEscape: function() {}
    });
}

function previewDelivery(appName, allowReachTextEditor)
{
	var srcDelivery = document.forms[0];

    /*
	// put focus on the new popup window
	preWin = window.open('', 'Delivery Preview Notification', 'height=400,width=550,resizable,scrollbars,status');
	preWin.focus();
	var preDoc = preWin.document;
    */

	var htmlContent = "<html>\n";

	var subjectLine = fdsEscape(srcDelivery.name.value);

	htmlContent += "<head>\n<title>" + subjectLine + "</title>\n";
	
	htmlContent += "<link rel='stylesheet' href='/" + appName + "/stylesheets/bootstrap.css'>\n";
	htmlContent += "<link rel='stylesheet' href='/" + appName + "/stylesheets/app.css'>\n";

	// onlbur will close the popup window
	htmlContent += "</head>\n<body>\n"; // onblur='window.close()'>\n";

	htmlContent += "<table width='100%' cellspacing='10'>\n";
//	htmlContent += "<tr><td class='noteblack' align='right'><a href='javascript:hideDeliveryPreviewModal()'>Close</a></td>\n";
	htmlContent += "<tr><td>\n";
	htmlContent += "<table width='100%' class='preview'>\n";
	htmlContent += "<tr>\n";
	htmlContent += "<td><b>From: </b></td>\n";
	htmlContent += "<td>" + fdsEscape(srcDelivery.fromAddress.value) +"</td>\n";
	htmlContent += "</tr>\n";
	htmlContent += "<tr>\n";
	htmlContent += "<td><b>To: </b></td>\n";
	htmlContent += "<td>" + fdsEscape(srcDelivery.recipientsToInput.value) +"</td>\n";
	htmlContent += "</tr>\n";
	htmlContent += "<tr>\n";
	htmlContent += "<td><b>Cc: </b></td>\n";
	htmlContent += "<td>" + fdsEscape(srcDelivery.recipientsCc.value) +"</td>\n";
	htmlContent += "</tr>\n";
	htmlContent += "<tr>\n";
	htmlContent += "<td><b>Bcc: </b></td>\n";
	htmlContent += "<td>" + fdsEscape(srcDelivery.recipientsBcc.value) +"</td>\n";
	htmlContent += "</tr>\n";
	htmlContent += "<tr>\n";
	htmlContent += "<td><b>Subject:&nbsp;</b></td>\n";
	htmlContent += "<td>" + subjectLine + "</td>\n";
	htmlContent += "</tr>\n"

	htmlContent += "<tr>\n<td colspan='2'>\n<hr>\n";

	htmlContent += "<div style='position: relative; overflow: auto; max-height: 20em;'>\n";

	// message body
	var message = fdsEscape(srcDelivery.message.value);
	var permanentMessage = (srcDelivery && srcDelivery.permanentMessage) ? fdsEscape(srcDelivery.permanentMessage.value)  : "";

	if(allowReachTextEditor && allowReachTextEditor == true) {
	    message = CKEDITOR.instances.notificationMsg.getData();
	    permanentMessage = CKEDITOR.instances.permanentMsg.getData();

	    $.ajax('./MessagePreview.do?method=cleanupMessage', {
            type: 'POST',
            data: { message: message, permanentMessage: permanentMessage },
            success: function (data, status, xhr) {
                var o = JSON.parse(data);
                if (o.rc == 0) {
                    displayPreview(htmlContent, o.cleanMessage, o.cleanPermanentMessage, srcDelivery, allowReachTextEditor);
                } else {
                    displayPreview(htmlContent, message, permanentMessage, srcDelivery, allowReachTextEditor);
                }
            },
            error: function (jqXhr, textStatus, errorMessage) {
                displayPreview(htmlContent, message, permanentMessage, srcDelivery, allowReachTextEditor);
            }
        });
	} else {
		var re = new RegExp ('\n', 'gi') ;
		message = message.replace(re, '<br>');
		permanentMessage = permanentMessage.replace(re, '<br>');
		displayPreview(htmlContent, message, permanentMessage, srcDelivery, allowReachTextEditor);
	}
}

var dialog;

function openJsp(jspURL, title) {

	// put focus on the new popup window
    dialog = bootbox.alert({
      title: title,
      message: '<iframe id="contactIFrame" width="100%" height="580" src="'+ jspURL +'" style="border: 0px; padding:15px;"></iframe>'
    });
 }

function moreLess(layer, text) {
	var obj;
	obj = document.getElementById(layer);
	if (obj != null && obj.style.display == "none") { obj.style.display = "block"; }
	else { obj.style.display = "none"; }
	obj = document.getElementById(text);
	if (obj != null && obj.innerHTML == "+") { obj.innerHTML = "-"; }
	else { obj.innerHTML = "+"; }
}

function toggleSelect(arr, value) {
	if (arr) {
		if (typeof arr.length == "number") {
			for (var i = 0; i < arr.length; i ++) {
				if (! arr[i].disabled) {	// no op on disabled
					arr[i].checked = value;
				}
			}
		} else {
			if (! arr.disabled) {	// no op on disabled
				arr.checked = value;
			}
		}
	}
}

function toggleButton(docs, dirs, btn) {
    var documentIds = [];
    var directoryIds = [];

    // docs
    if (docs) {
        if (docs.length) {
            for (var i = 0; i < docs.length; i++) {
                var input = docs[i];
                if (input.checked) {
                    documentIds.push(input.value);
                }
            }
        } else {
            if (docs.checked) {
                documentIds.push(docs.value);
            }
        }
    }

    // dirs
    if (dirs) {
        if (dirs.length) {
            for (var i = 0; i < dirs.length; i++) {
                var input = dirs[i];
                if (input.checked) {
                    directoryIds.push(input.value);
                }
            }
        } else {
            if (dirs.checked) {
                directoryIds.push(dirs.value);
            }
        }
    }

	// If any directory selected disable forward button
	if(directoryIds.length > 0) {
		//  do nothing
//	} else if(documentIds.length < 1) {
		//  do nothing
    } else {
    	document.getElementById(btn).disabled = false;
    }
}

function uncheckCheckAll(checkAll, value) {
	if (checkAll && !value) {
		checkAll.checked = value;
	}
}



// Take in the two sizes (shrunk and expanded) and toggle the size between the two sizes
function resizeDeliveryField(form, element, rows_shrunk, rows_expanded) {
	if (element == form.recipientsTo) {
		form.recipientsTo.rows = (form.recipientsTo.rows == rows_shrunk)?rows_expanded:rows_shrunk;
	} else if (element == form.recipientsCc) {
		form.recipientsCc.rows = (form.recipientsCc.rows == rows_shrunk)?rows_expanded:rows_shrunk;
	} else if (element == form.recipientsBcc) {
		form.recipientsBcc.rows = (form.recipientsBcc.rows == rows_shrunk)?rows_expanded:rows_shrunk;
	} else if (element == form.name) {
		form.name.rows = (form.name.rows == rows_shrunk)?rows_expanded:rows_shrunk;
	} else if (element == form.secureMessage) {
		form.secureMessage.rows = (form.secureMessage.rows == rows_shrunk)?rows_expanded:rows_shrunk;
	} else if (element == form.message) {
		form.message.rows = (form.message.rows == rows_shrunk)?rows_expanded:rows_shrunk;
	}

}

///////////////AJAX
// Timestamp of cart that page was last updated with
var lastUpdateTime = 0;
var req;

/*
 * Returns a new XMLHttpRequest object, or false if the browser
 * doesn't support it
 */
function newXMLHttpRequest() {
	var xmlreq = false;

	// Create XMLHttpRequest object in non-Microsoft browsers
	if (window.XMLHttpRequest) {	/* if (typeof XMLHttpRequest != 'undefined') { */
		xmlreq = new XMLHttpRequest();
	} else if (window.ActiveXObject) {
		try {
			// Try to create XMLHttpRequest in later versions of Internet Explorer
			xmlreq = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e1) {
			// Failed to create required ActiveXObject
			try {
				// Try version supported by older versions of Internet Explorer
				xmlreq = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e2) {
				// Unable to create an XMLHttpRequest by any means
				xmlreq = false;
			}
		}
	}

	return xmlreq;
}

//var reqMessage;

/*
 * Returns a function that waits for the specified XMLHttpRequest
 * to complete, then passes it XML response to the given handler function.
 *
 * req - The XMLHttpRequest whose state is changing
 * responseXmlHandler - Function to pass the XML response to
 */
function getReadyStateHandler_ob(req, responseXmlHandler, id, v1, v2, v3) {
	//reqMessage += "state: " + req.readyState + "\n";
	// If the request's status is "complete"
	if (req.readyState == 4) {
		// Check that we received a successful response from the server
		if (req.status == 200) {
			/* alert(req.getAllResponseHeaders()); */
			// Pass the XML payload of the response to the handler function.
			responseXmlHandler(id, v2, v3);
			//alert(reqMessage);
		} else {
			// An HTTP problem has occurred
			alert("HTTP error "+req.status+": "+req.statusText);
		}
	} else if (req.readyState == 1) {
		document.getElementById(id).innerHTML = v1;
	}
}

/*
 * Adds the specified item to the shopping cart, via Ajax call
 * itemCode - product code of the item to add
 */
function processStatus_ob(method, svrName, id, v1, v2, v3) {
	var url = "/" + svrName + "/AdminProcessSubmit.do?method=" + method;
	req = newXMLHttpRequest();

	//alert(req);
	//reqMessage = "";

	// Open a connection to the server
	req.open("POST", url, true);

	req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

	// Return an anonymous function that listens to the XMLHttpRequest instance
	req.onreadystatechange = function() { getReadyStateHandler_ob(req, updateProcessStatus_ob, id, v1, v2, v3); };

	// Send the request
	req.send(null);
}

/*
 * Update shopping-cart area of page to reflect contents of cart
 * described in XML document.
 */
function updateProcessStatus_ob(id, v2, v3) {
	var contact = req.responseXML.getElementsByTagName("contact")[0];
	var generated = contact.getAttribute("generated");
	if (generated > lastUpdateTime) {
		var tagName, content, value;
		for (var i=0; i<contact.childNodes.length; i++) {
			if (contact.childNodes[i].firstChild) {
				tagName = contact.childNodes[i].tagName;
				value = contact.childNodes[i].firstChild.nodeValue;
				if (tagName.match("id")) {
					content = document.getElementById(id);
					if (content != null) {
						if (value.match("1")) {
							content.innerHTML = v2;
						} else {
							content.innerHTML = v3;
						}
					}
				} else {
					content = document.getElementById(tagName);
					if (content != null) {
						content.innerHTML = value;
					}
				}
			}
		}
		lastUpdateTime = generated;
	} else {
		//alert('Generated: ' + generated + "\n" + 'Last:' + lastUpdateTime);
	}
}

//////////////////////////////////////////////// new
function startStopIcons(bStartClickable, bStopClickable, mthdName, svrName, idTimer, idOperations) {
	var opContent = "";
	if (bStartClickable) {
		opContent += "<a href=\"javascript:processStatus('" + mthdName + "', '" + svrName + "', '" + idTimer + "', '" + idOperations + "');\">\n";
	}
	opContent += "<img src='/" + svrName + "/images/misc/icon-misc-start";
	if (! bStartClickable) {
		opContent += "_d";
	}
	opContent += ".gif' border=0 alt='Start' title='Start'>\n";
	if (bStartClickable) {
		opContent += "</a>\n";
	}

	opContent += "&nbsp;&nbsp;\n";

	if (bStopClickable) {
		opContent += "<a href=\"javascript:processStatus('" + mthdName + "', '" + svrName + "', '" + idTimer + "', '" + idOperations + "');\">\n";
	}
	opContent += "<img src='/" + svrName + "/images/misc/icon-misc-stop";
	if (! bStopClickable) {
		opContent += "_d";
	}
	opContent += ".gif' border=0 alt='Stop' title='Stop'>\n";
	if (bStopClickable) {
		opContent += "</a>\n";
	}
	return opContent;
}

/*
 * Returns a function that waits for the specified XMLHttpRequest
 * to complete, then passes it XML response to the given handler function.
 *
 * req - The XMLHttpRequest whose state is changing
 * responseXmlHandler - Function to pass the XML response to
 */
function getReadyStateHandler(req, responseXmlHandler, mthdName, svrName, idTimer, idOperations) {
	if (req.readyState == 4) {
		if (req.status == 200) {
			responseXmlHandler(mthdName, svrName, idTimer, idOperations);
		} else {
			alert("HTTP error "+req.status+": "+req.statusText);
		}
	} else if (req.readyState == 1) {
		document.getElementById(idTimer).innerHTML = "<img src='/" + svrName + "/images/misc/icon-misc-indicator.gif' border=0 title='please wait...' alt='please wait...'>";
		document.getElementById(idOperations).innerHTML = startStopIcons(false, false, mthdName, svrName, idTimer, idOperations);
	}
}

function processStatus(mthdName, svrName, idTimer, idOperations) {
	var url = "/" + svrName + "/AdminProcessSubmit.do";
	var token = document.getElementById("asp_token").value;
	params = "method=" + mthdName + "&org.apache.struts.taglib.html.TOKEN=" + token;
	req = newXMLHttpRequest();
	req.open("POST", url, true);
	req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	//req.setRequestHeader("Content-length", params.length);
	req.onreadystatechange = function() { getReadyStateHandler(req, updateProcessStatus, mthdName, svrName, idTimer, idOperations); };
	// alert(url);
	req.send(params);
}

function updateProcessStatus(mthdName, svrName, idTimer, idOperations) {
	var contact = req.responseXML.getElementsByTagName("contact")[0];
	token = req.responseXML.getElementsByTagName("token")[0].childNodes[0].nodeValue;
	document.getElementById("asp_token").value = token;
	
	var generated = contact.getAttribute("generated");
	if (generated > lastUpdateTime) {
		var tagName, content, value;
		for (var i=0; i<contact.childNodes.length; i++) {
			if (contact.childNodes[i].firstChild) {
				tagName = contact.childNodes[i].tagName;
				value = contact.childNodes[i].firstChild.nodeValue;
				if (tagName.match("id")) {
					content = document.getElementById(idOperations);
					if (content != null) {
						if (value.match("1")) {
							content.innerHTML = startStopIcons(false, true, mthdName, svrName, idTimer, idOperations);
						} else {
							content.innerHTML = startStopIcons(true, false, mthdName, svrName, idTimer, idOperations);
						}
					}
				} else {
					content = document.getElementById(tagName);
					if (content != null) {
						content.innerHTML = value;
					}
				}
			}
		}
		lastUpdateTime = generated;
	} else {
		// alert('Generated: ' + generated + "\n" + 'Last:' + lastUpdateTime);
	}
}

function showHide(sectionID) {
	if (document.all || document.getElementById) {
		var section, sectionLink;
		if (document.all) {
			section = document.all(sectionID + 'XZ');
			sectionLink = document.all(sectionID).getElementsByTagName("a").item(0);
		} else {
			section = document.getElementById(sectionID + 'XZ');
			sectionLink = document.getElementById(sectionID).getElementsByTagName("a").item(0);
		}

		if (section.style.display == "none") {
			section.style.display = "block";
			sectionLink.blur();
			sectionLink.className = "z";
		} else {
			section.style.display = "none";
			sectionLink.blur();
			sectionLink.className = "x";
		}
	} else { // Browser is Netscape 4
		return false;
	}
}

/* Hide one section and show another
	Author : Shahed
*/
function showHideSection(sectionID) {
	if (document.all || document.getElementById) {
		var sectionShow, sectionHide;
		if (document.all) {
			sectionShow = document.all(sectionID + 'XZ');
			sectionHide = document.all(sectionID);

		} else {
			sectionShow = document.getElementById(sectionID + 'XZ');
			sectionHide = document.getElementById(sectionID);
		}

		if(sectionShow) {
		    sectionShow.style.display = "block";
		}
		if(sectionHide) {
		    sectionHide.style.display = "none";
		}

	} else { // Browser is Netscape 4
		return false
	}
}

/* Transfer focus to specific field
	Author : Arif
*/
function getFocus(filedId, appletFieldId){
	try{
		// success to focus on non applet field means it was visible
		document.getElementById(filedId).focus();
	}catch(err){
		// error means non applet elements are hidden then send focus to applet element
		document.getElementById(appletFieldId).focus();
	}
}

/* String trim method for javascript
	Author : Shahed
*/
String.prototype.trim = function () {
    return this.replace(/^\s*/, "").replace(/\s*$/, "");
}

/* String trim method for javascript
	Author : Shahed
*/
function startsWith(str1, str2) {
	var subSection = str1.substring(0,str2.length);
	
	if(subSection == str2 )
		return true;
	else
		return false;
}

/* Convert wildcards to javascript regular expression
	Author : Shahed
*/
function convertWildcardToRegex(wildPattern) {
	var PATTERN_STAR = /\*/g; 	// Javascript does not support look behind, so matching star will not be used like (\?<!\\)\* which is used in java.
	var PATTERN_STAR_BEGIN = /^\*/g;
	var PATTERN_QUESTION = /\?/g;	// Javascript does not support look behind, so matching star will not be used like (\?<!\\\\)\\? which is used in java.
	var PATTERN_QUESTION_BEGIN = /^\?/g;
	var PATTERN_DOT = /\./g;
	var PATTERN_DOLLAR = /\$/g;
	var PATTERN_OPEN_BRACE = /\{/g;
	var PATTERN_CLOSE_BRACE = /\}g/;
	var PATTERN_OPEN_PARENTHESIS = /\(/g;
	var PATTERN_CLOSE_PARENTHESIS = /\)/g;

	var regex = wildPattern;
	regex = regex.replace(PATTERN_DOT, "\\.");
	regex = regex.replace(PATTERN_DOLLAR, "\\\\$");
	regex = regex.replace(PATTERN_DOLLAR, "\\{");
	regex = regex.replace(PATTERN_CLOSE_BRACE, "\\}");
	regex = regex.replace(PATTERN_OPEN_PARENTHESIS, "\\(");
	regex = regex.replace(PATTERN_CLOSE_PARENTHESIS, "\\)");
	regex = regex.replace(PATTERN_STAR, ".*");
	regex = regex.replace(PATTERN_STAR_BEGIN, ".*");
	regex = regex.replace(PATTERN_QUESTION, ".?");
	regex = regex.replace(PATTERN_QUESTION_BEGIN, ".?");

	return regex;
}

/* Compares a string with a given pattern or patterns
	Author : Shahed
*/
function matchesWildcard(inp1, inp2, caseSensitive) {
	if ((!inp1) || (!inp2)) {
		//alert("Invalid Input");
		return false;
	}

	var cmpStr = (caseSensitive) ? inp1 : inp1.toLowerCase();
	var cmpPatternList = (caseSensitive) ? inp2 : inp2.toLowerCase();

	//var DELIMETER_AND = "(?i)\\s+AND\\s+";
	var DELIMETER_AND = /\s+AND\s+/i;
	var DELIBETER_COMMA = ",";
	var START_WITH_NOT = "NOT ";
	
	var expressions = cmpPatternList.split(DELIBETER_COMMA);

	for (var i = 0; i < expressions.length; i++) {
		var expression = expressions[i].trim();
		
		if (expression.length > 0) {
			var patterns = expression.split(DELIMETER_AND);
			var isMatch = true;

			for (var j = 0; j < patterns.length; j++) {
				var pattern = patterns[j].trim();
				var isApplyNot = false;
				
				// Check if the string starts with "not"
				var callingPattern = "";
				if (startsWith(pattern, START_WITH_NOT) || startsWith(pattern, START_WITH_NOT.toLowerCase())) {
					isApplyNot = true;
					callingPattern = pattern.substring(4).trim();
				} else {
					callingPattern = pattern;
				}
				var regex = convertWildcardToRegex(callingPattern);
				// Check if the string matches the pattern
					//var result = cmpStr.match(regex);
					//if (isApplyNot) {
					//	result = !result;
					//}
					//if (!result || !(result == cmpStr)) {
					//	isMatch = false; // Missmatch for one pattern, thats why turn "isMatch" to false
					//	break;
					//}
				var result = cmpStr.match(regex);
				var boolResult = false;
				
				if (result != null && (result == cmpStr)) {
					boolResult = true;	
				}

				if (isApplyNot) {
					boolResult = !boolResult;
				}
				
				if (!boolResult) {
					isMatch = false; // Missmatch for one pattern, thats why turn "isMatch" to false
					break;
				}
			}
			if (isMatch) {
				//document.write("Pattern matches<BR>");
				//alert(msg);
				//inp1.value = "";
				return true;
			}
		}
	}
	//document.write("Didn't find matched pattern!<BR>");
	return false;
}

function getFieldValue(field, defaultValue) {
	if (field == null) {
		return defaultValue;
	} else {
		return field.checked;
	}
}

/**
 * Checks the validity of IP address
 * 
 * @param ip address with subnet mask like 122.32.34.32/32
 * @return true if IP is valid
 */
function isValidIP (ipValue) {
	
	var ipPattern = /^((?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\/(([0-9])|([0-2][0-9])|(3[0-2])))$/;
	var ipArray = ipValue.match(ipPattern);
	// ipArray[0] contains full ip address
	
	if (ipArray == null ){
		return false;
		}
	
	// ip address can not start with 0
	else if(ipArray[1]==0){
		return false;
		}
		
	// check each segment, whether exceeds 255
	else {
		for (i = 1; i < 5; i++) {
			thisSegment = ipArray[i];
			if (isGreater(thisSegment,255)) {
				return false;
			}
	   }
	   // check the subnet mask, whether it greater than 32
	   if(isGreater(ipArray[5],32)) return false;
	   // check it is 0 (zero) which is invalid
	   if(parseInt(ipArray[5],10)==0) return false;
	}	
	
	// all checking passed so valid ip address
	return true;
}	// end of function isValidIP(ipValue)

/**
 * Checks if the IP array list is valid
 * 
 * @param ipArrayStr(comma separated multiple ip) like 122.32.34.32/32,122.32.24.12/64
 * @return true if the array list is valid
 */
function isValidIPList(ipArrayStr) {
	
	var ipArraySpace = ipArrayStr.split(" ");
	// first spliting with space
	for (var i = 0 ; i < ipArraySpace.length ; i++){
		// now spliting with comma
		var ipArrayComma = ipArraySpace[i].split(",");
		for(var j = 0 ; j < ipArrayComma.length ; j++){
			if(ipArrayComma[j]!="" && !isValidIP(ipArrayComma[j]))	return false;
		}
	}
	
	return true;
}

/*
 * Toggles height of Rich Text Editor
 */
function toggleImageAndRTE(rteName, imagename, shrunk, expanded) {
	swapExpandShrinkImages(imagename);
	var rteObject = document.getElementById(rteName);
	rteObject.style.height = (rteObject.style.height == shrunk)?expanded:shrunk;
}

/*
 * Confirm the remove sender access from a package 
 */
function confirmSenerAccessRemoval(){
	return confirm('Are you sure you want to remove yourself as a sender?');
}

function addInputSubmitEvent(form, input) {
	if(form != null && input != null ){
	    input.onkeydown = function(e) {
	        e = e || window.event;
	        if (e.keyCode == 13 || e.keyCode == 3) {
	            form.submit();
	            return false;
	        }
	    };
    }
}

function toggleExtendedSearchPanel(panel, icon){
	if($(icon).hasClass('glyphicon-filter')){
		$(panel).slideDown('slow');
		$(icon).removeClass('glyphicon-filter');
		$(icon).addClass('glyphicon-filter-remove');
	}else if($(icon).hasClass('glyphicon-filter-remove')){
		$(panel).slideUp('slow');
		$(icon).removeClass('glyphicon-filter-remove');
		$(icon).addClass('glyphicon-filter');
	}
}

function toggleSearchFilters(){

	toggleLayer('sfsLayer');
	
	// chage the hidden field value
	sfsTextBox = document.getElementsByName("sfs")[0];
	if(sfsTextBox.value=="y"){
		sfsTextBox.value="n";
	}else{
		sfsTextBox.value="y";
	}
	
	
	// for paging
	var pagingUrlPrev = "";
	var pagingUrlNow = "";
	var pagingUrlArray = document.getElementsByName("paging");
	for( i =0; i < pagingUrlArray.length ; i++) {
		pagingUrlPrev = pagingUrlArray[i].href; 
		pagingUrlNow = pagingUrlPrev.replace("&sfs=y","&sfs=n");
		pagingUrlNow = (pagingUrlPrev == pagingUrlNow) ? pagingUrlPrev.replace("&sfs=n","&sfs=y") : pagingUrlNow;
		pagingUrlArray[i].href = pagingUrlNow;
	}
	
	// for sorting
	var sortingUrlPrev = "";
	var sortingUrlNow = "";
	var sortingUrlArray = document.getElementsByName("sorting");
	for( i =0; i < sortingUrlArray.length ; i++) {
		sortingUrlPrev = sortingUrlArray[i].href; 
		sortingUrlNow = sortingUrlPrev.replace("&sfs=y","&sfs=n");
		sortingUrlNow = (sortingUrlPrev == sortingUrlNow) ? sortingUrlPrev.replace("&sfs=n","&sfs=y") : sortingUrlNow;
		sortingUrlArray[i].href = sortingUrlNow;
	}
	
	var showHideSF = document.getElementById("showHideSF");
	showSFL = 'Show filters';
	hideSFL = 'Hide filters';
	
	if(showHideSF.innerHTML ==  showSFL){
		showHideSF.innerHTML = hideSFL;
	}else{
		showHideSF.innerHTML = showSFL;
	}
}

// conditionals to test the current image and swap accordingly 
	function swapImages(imagename) {
		if (imagename.src == mouseOverImage.src) 	{
			imagename.src = mouseOutImage.src
		} else {	
			imagename.src = mouseOverImage.src
		}
	}

/*
 * Checks for the correct version of JRE and hides elements accordingly
 * Author: Ariful Ahsan
 * Used in:
 *deliveryView.jsp
 */
function toggleAppletElements()
{
	// to show/hide download applet button and checkbox
	initializeAppletElementsByName();
	
	var useApplet = (document.getElementById('useApplet').value == 'y');
	var useAppletParam = (document.getElementById('useAppletParam').value == 'y');
	
	var jreVersion = PluginDetect.getVersion('Java');
	if((useAppletParam) || (jreVersion != null && jreVersion >= '1,5' && useApplet))
	{
		// hide nonAppletElement
		var nonAppletElement = document.getElementById('nonAppletElement');
		nonAppletElement.style.display = 'none';
	}else {
	
		// hide appletElement
		var appletElement = document.getElementById('appletElement');
		appletElement.style.display = 'none';
	}		
}

  //var req;

function notificationStatus(mthdName, svrName, packageId, deliveryId, recipientId, rowID) {

	var token = document.getElementById("rda_token").value;
	var url = "/" + svrName + "/ReportPredefinedDeliveryAccessNotification.do?method=" + mthdName + "&packageId=" + packageId + "&deliveryId=" + deliveryId+ "&recipientId=" + recipientId + "&org.apache.struts.taglib.html.TOKEN=" + token; 
	var req;
	if (window.XMLHttpRequest) { // Non-IE browsers
  		req = new XMLHttpRequest();
	} else if (window.ActiveXObject) { // IE
  		req = new ActiveXObject("Microsoft.XMLHTTP");
	}
	req.open("POST", url, true);
	req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	req.onreadystatechange = function() { 
	//alert(req.readyState);
		if (req.readyState == 4) { // Complete
	      if (req.status == 200) { // OK response
	      //alert(packageID+deliveryID+reciverID+rowID);
	      isTokenValid = req.responseXML.getElementsByTagName("isTokenValid")[0].childNodes[0].nodeValue;
	      if(isTokenValid == 'y') {
		      document.getElementById("accessrow"+rowID).innerHTML = 'Notification resubmitted';
		      document.getElementById("notifyrow"+rowID).innerHTML = 'Notification scheduled';
	      } else {
	      	document.getElementById("accessrow"+rowID).innerHTML = "Already submitted";
	      }
	      
	      //alert(deliveryID);
	      //alert(reciverID);
	      //alert(rowID);
	      //alert(req.status);
	      } else {
	        document.getElementById("accessrow"+rowID).innerHTML = "Failed";
	        //alert(req.status);
	      }
	    }
    };
	//alert(url);
	//alert(rowID);
	req.send(null);
}


function buttonAction(deliveryArrayStr, packageArrayStr, reciverArrayStr, rowArrayStr){
	var deliveryArraySpace = deliveryArrayStr.split(" ");
	var packageArraySpace = packageArrayStr.split(" ");
	var reciverArraySpace = reciverArrayStr.split(" ");
	var rowArraySpace = rowArrayStr.split(" ");
	// first spliting with space
	for (var i = 0 ; i < deliveryArraySpace.length ; i++){
		// now spliting with comma
		var deliveryArrayComma = deliveryArraySpace[i].split(",");
		var packageArrayComma = packageArraySpace[i].split(",");
		var reciverArrayComma = reciverArraySpace[i].split(",");
		var rowArrayComma = rowArraySpace[i].split(",");
	}
		//var j=1;
		//alert( deliveryArrayComma.length);
		for(var j = 0 ; j < deliveryArrayComma.length-1 ; j++){
			notificationStatus('sendNotification','bds',packageArrayComma[j],deliveryArrayComma[j],reciverArrayComma[j],rowArrayComma[j]);
			//alert(j);
		}
	
}

function getDeliveryAccessSelectedCheckbox(buttonGroup) {
   // Go through all the check boxes. return an array of all the ones
   // that are selected (their position numbers). if no boxes were checked,
   // returned array will be empty (length will be zero)
   var retArr = new Array();
   var lastElement = 0;
   if (buttonGroup[0]) { // if the button group is an array (one check box is not an array)
      for (var i=0; i<buttonGroup.length; i++) {
         if (buttonGroup[i].checked) {
            retArr.length = lastElement;
            retArr[lastElement] = i;
            lastElement++;
            buttonGroup[i].checked = false;           
         }
      }
   } else { // There is only one check box (it's not an array)
      if (buttonGroup.checked) { // if the one check box is checked
         retArr.length = lastElement;
         retArr[lastElement] = 0; // return zero as the only array value
      }
   }
   return retArr;
} // Ends the "getSelectedCheckbox" function

function getDeliveryAccessSelectedCheckboxValue(buttonGroup) {
   // return an array of values selected in the check box group. if no boxes
   // were checked, returned array will be empty (length will be zero)
   var retArr = new Array(); // set up empty array for the return values
   var selectedItems = getDeliveryAccessSelectedCheckbox(buttonGroup);
   if (selectedItems.length != 0) { // if there was something selected
      retArr.length = selectedItems.length;
      for (var i=0; i<selectedItems.length; i++) {
         if (buttonGroup[selectedItems[i]]) { // Make sure it's an array
            retArr[i] = buttonGroup[selectedItems[i]].value;
            var arrStr=retArr[i];
            var spiltArray = arrStr.split(",");		
			notificationStatus('sendNotification','bds',spiltArray[0],spiltArray[1],spiltArray[2],spiltArray[3]);	
         } else { // It's not an array (there's just one check box and it's selected)
            retArr[i] = buttonGroup.value;// return that value
            var arrStr=retArr[i];
            var spiltArray = arrStr.split(",");		
			notificationStatus('sendNotification','bds',spiltArray[0],spiltArray[1],spiltArray[2],spiltArray[3]);	
         }
      }
   }
   return retArr;
} // Ends the "getSelectedCheckBoxValue" function


// function returns the populated display name
function populateDisplayName(fName, lName, emailAddr){

	displayName = "";
	if(!isEmptyValue(fName)){
		displayName = fName;
	}

	if(!isEmptyValue(lName)){
		if(!isEmptyValue(fName)){
			displayName = fName + " " + lName;
		} else {
			displayName = lName;
		}
	}

	if(isEmptyValue(displayName) && !isEmptyValue(emailAddr)){
		displayName = emailAddr;
	}

	return displayName;
}

// used to change the user display name field
function resetDisplayName(){
	e = document.getElementById('emailAddr').value;
	f = document.getElementById('fName').value;
	l = document.getElementById('lName').value;
	dpVal = document.getElementById('displayName').value;
	dpValPopulated = populateDisplayName(f,l,e);
	
	if((dpVal == dpValPopulated) || !dpValChngdByUsr){
		document.getElementById('displayName').value = dpValPopulated;
		dpValChngdByUsr = false;
	} 
}

// invoked onchange of display name field
function recheckDisplayName(){
	e = document.getElementById('emailAddr').value;
	f = document.getElementById('fName').value;
	l = document.getElementById('lName').value;
	dpVal = document.getElementById('displayName').value;
	dpValPopulated = populateDisplayName(f,l,e);
	
	if(isEmptyValue(dpVal)){
		document.getElementById('displayName').value = dpValPopulated;
		dpValChngdByUsr = false;
	} else if(dpVal == dpValPopulated){
		dpValChngdByUsr = false;
	} else {
		dpValChngdByUsr = true;
	}
}

// Capslock detector in login page
function capsLockNotifierLogin(passwordField){
    var $passwordMatchedInfoContainer = $("<div id='capsLockOnInfo' class='custom-popover-signin right-top-arrow'>");
    $passwordMatchedInfoContainer.append('<div id="matched" class="invalid"> Caps lock is on </div>');

    $('body').append($passwordMatchedInfoContainer);

    var offset = $(passwordField).offset();
    var left = offset.left + $(passwordField).outerWidth() + 14;
    $("#capsLockOnInfo").css("z-index", "10");
    $("#capsLockOnInfo").offset({top: offset.top, left: left});
    $("#capsLockOnInfo").hide();

    $("#password").keypress(function(e) {
                    var s = String.fromCharCode( e.which );
                    if (s.toUpperCase() === s && s.toLowerCase() !== s && !e.shiftKey) {
                        $("#capsLockOnInfo").show();
                    } else {
                        $("#capsLockOnInfo").hide();
                    }
                }).blur(function (e){
                    $("#capsLockOnInfo").hide();
                });
}

// Get Delimiter character for email separator  which is selected by the admin

function getDelimiterChaaracters()
{
	var delimCharArray = new Array(",", "\n");
	return delimCharArray;
}	

// Ensures numbers only input field, removes non-number characters
function isNumberKey(evt){
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}

// detects the browser and OS
function detectBrowserAndOS() {

        // detect browser
        var nVer = navigator.appVersion;
        var nAgt = navigator.userAgent;
        var browserName  = navigator.appName;
        var fullVersion  = '' + parseFloat(navigator.appVersion);
        var majorVersion = parseInt(navigator.appVersion, 10);
        var nameOffset, verOffset, ix;

        // In Opera, the true version is after "Opera" or after "Version"
        if ((verOffset = nAgt.indexOf("Opera")) != -1) {
            browserName = "Opera";
            fullVersion = nAgt.substring(verOffset + 6);
            if ((verOffset = nAgt.indexOf("Version")) != -1) {
                fullVersion = nAgt.substring(verOffset + 8);
            }
        }

        // In MSIE, the true version is after "MSIE" in userAgent
        else if ((verOffset = nAgt.indexOf("MSIE")) != -1) {
            browserName = "Microsoft Internet Explorer";
            fullVersion = nAgt.substring(verOffset + 5);
        }

        // In Chrome, the true version is after "Chrome"
        else if ((verOffset = nAgt.indexOf("Chrome")) != -1) {
            browserName = "Chrome";
            fullVersion = nAgt.substring(verOffset + 7);
        }

        // In Safari, the true version is after "Safari" or after "Version"
        else if ((verOffset = nAgt.indexOf("Safari")) != -1) {
            browserName = "Safari";
            fullVersion = nAgt.substring(verOffset + 7);
            if ((verOffset=nAgt.indexOf("Version")) != -1) {
                fullVersion = nAgt.substring(verOffset + 8);
            }
        }

        // In Firefox, the true version is after "Firefox"
        else if ((verOffset = nAgt.indexOf("Firefox")) != -1) {
            browserName = "Firefox";
            fullVersion = nAgt.substring(verOffset + 8);
        }

        // In most other browsers, "name/version" is at the end of userAgent
        else if ( (nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/')) ) {
            browserName = nAgt.substring(nameOffset, verOffset);
            fullVersion = nAgt.substring(verOffset + 1);
            if (browserName.toLowerCase() == browserName.toUpperCase()) {
                browserName = navigator.appName;
            }
        }

        // trim the fullVersion string at semicolon/space if present
        if ((ix = fullVersion.indexOf(";")) != -1) {
           fullVersion = fullVersion.substring(0, ix);
        }
        if ((ix = fullVersion.indexOf(" ")) != -1) {
           fullVersion=fullVersion.substring(0, ix);
        }

        majorVersion = parseInt('' + fullVersion, 10);
        if (isNaN(majorVersion)) {
            fullVersion  = '' + parseFloat(navigator.appVersion);
            majorVersion = parseInt(navigator.appVersion, 10);
        }

        // detect OS
        var OSName="Unknown OS";
        if (navigator.appVersion.indexOf("Win") != -1)
            OSName = "Windows";
        if (navigator.appVersion.indexOf("Mac") != -1)
            OSName = "MacOS";
        if (navigator.appVersion.indexOf("X11") != -1)
            OSName = "UNIX";
        if (navigator.appVersion.indexOf("Linux") != -1)
            OSName = "Linux";

        alert("Browser name  = " + browserName + "\n"
            + "Full version  = " + fullVersion + "\n"
            + "Major version = " + majorVersion + "\n"
            + "Operating System = " + OSName);
}


// detects if Safari 7 and MacOS is used
function isSafari7() {
        var nVer = navigator.appVersion;
        var nAgt = navigator.userAgent;
        var browserName  = navigator.appName;
        var fullVersion  = '' + parseFloat(navigator.appVersion);
        var majorVersion = parseInt(navigator.appVersion, 10);
        var nameOffset, verOffset, ix;

        // In Safari, the true version is after "Safari" or after "Version"
        if ((verOffset = nAgt.indexOf("Safari")) != -1) {
            browserName = "Safari";
            fullVersion = nAgt.substring(verOffset + 7);
            if ((verOffset = nAgt.indexOf("Version")) != -1) {
                fullVersion = nAgt.substring(verOffset + 8);
            }
        }

        // trim the fullVersion string at semicolon/space if present
        if ((ix = fullVersion.indexOf(";")) != -1) {
           fullVersion = fullVersion.substring(0, ix);
        }
        if ((ix = fullVersion.indexOf(" ")) != -1) {
           fullVersion = fullVersion.substring(0, ix);
        }

        majorVersion = parseInt('' + fullVersion, 10);
        if (isNaN(majorVersion)) {
            fullVersion  = '' + parseFloat(navigator.appVersion);
            majorVersion = parseInt(navigator.appVersion, 10);
        }


       if(browserName === "Safari") {
            if(majorVersion >= 7) {
                // alert("Safari 7 +");
                return true;

            } else {
                // alert("Safari");
            }

       } else {
           // alert("Other browser");
       }

       return false;
}


function isMacOS() {
    var OSName="Unknown OS";
    if (navigator.appVersion.indexOf("Mac") != -1) {
        OSName = "MacOS";
    }

    if(OSName === "MacOS") {
        // alert("Mac");
        return true;
    } else {
        // alert("Other OS");
        return false;
    }
}


    // ** date range picker related functions ** //

    function chooseDateRangeReportForm(documentForm) {
        var startDateStr = documentForm.from.value;
        var endDateStr = documentForm.to.value;
        if(startDateStr.length <= 0 && endDateStr.length <= 0) {
            startDateStr =  moment().subtract(7, 'days');
            endDateStr =  moment();
        }
	    $(document).ready(function() {
		    $('#dateRangeInput').daterangepicker({
                timePicker: true,
                format: 'MM/DD/YYYY h:mm A',
                timePickerIncrement: 10,
				startDate: startDateStr,
				endDate: endDateStr
            });
		});
    }

    function clearDateRangeReportForm(documentForm) {
        documentForm.fromtodate.value = "";
        documentForm.from.value = "";
        documentForm.to.value = "";
    }

	function processReportForm(documentForm) {
	    var reportDateRangeStr = "";
        var fromDateStr = "";
        var toDateStr = "";
	    if(documentForm.fromtodate.value != null) {
	        reportDateRangeStr = documentForm.fromtodate.value;
	    }
        if (reportDateRangeStr != null && reportDateRangeStr.length > 0) {
            var subStrArray =  reportDateRangeStr.split(" - ");
            fromDateStr =  subStrArray[0];
            toDateStr =  subStrArray[1];
        }
        documentForm.from.value = fromDateStr;
        documentForm.to.value = toDateStr;
	    return true;
	}

	function clearField(id){
		$('#' + id).val("");
	}

	function dateSelector(dateFieldId){
		var datePickerSettings = {
			startDate: new Date(),
			todayHighlight: true,
			autoclose: true
			,
            assumeNearbyYear: true,
            keyboardNavigation: false
		};

		$('#' + dateFieldId).datepicker(datePickerSettings);
	}

	function availableExpireDateSelector(availableId, expiresId){
		var datePickerSettings = {
			startDate: new Date(),
			todayHighlight: true,
			autoclose: true
			,
             assumeNearbyYear: true,
             keyboardNavigation: false
			};

		var expireDateValue;

		$('#' + availableId).datepicker(datePickerSettings).on('hide', function(ev){
			if(ev.date){
				$('#' + expiresId).datepicker("setStartDate", ev.date);

				if(expireDateValue){
					if(ev.date.valueOf() > expireDateValue.valueOf()){
						expireDateValue = ev.date;
						$('#' + expiresId).val($('#' + availableId).val());
					}
				}
			}
		}).data('datepicker');

		$('#' + expiresId).datepicker(datePickerSettings).on('hide', function(ev) {
			if(ev.date){
				expireDateValue = ev.date;
			}
		}).data('datepicker');
	}

	function fromToDateSelector(fromId, toId){
		var toDateValue;

		var datePickerSettings = {
			endDate: new Date(),
			todayHighlight: true,
			autoclose: true
			,
             assumeNearbyYear: true,
             keyboardNavigation: false
			};

		$('#' + fromId).datepicker(datePickerSettings).on('hide', function(ev){
			if(ev.date){
				$('#' + toId).datepicker("setStartDate", ev.date);

				if(toDateValue){
					if(ev.date.valueOf() > toDateValue.valueOf()){
						toDateValue = ev.date;
						$('#' + toId).val($('#' + fromId).val());
					}
				}
			}
		}).data('datepicker');

		$('#' + toId).datepicker(datePickerSettings).on('hide', function(ev) {
			if(ev.date){
				toDateValue = ev.date;
			}else{
				$('#' + toId).val($('#' + fromId).val());
			}
		}).data('datepicker');
	}

	function extendedSearchPanelBehaviorHandler(extendedSearchPanelId, sfsId, slideIcon){
	 	$('#' + extendedSearchPanelId).change(function(){
			if(isDirty(this)){
				$('#' + sfsId).val('y');
				$('#' + slideIcon).addClass('has-more-active-filters');
			}
			else{
				$('#' + sfsId).val('n');
				$('#' + slideIcon).removeClass('has-more-active-filters');
			}
		});

		if($('#' + sfsId).val() == 'y'){
			$('#' + extendedSearchPanelId).slideDown('slow');
			$('#' + slideIcon).addClass('glyphicon-filter-remove');
			$('#' + slideIcon).addClass('has-more-active-filters');
		}else{
			$('#' + slideIcon).addClass('glyphicon-filter');
			$('#' + slideIcon).removeClass('has-more-active-filters');
		}
	}

	function clearForm(form) {
  		var elements = form.elements;

  		console.log(elements);

  		for(i=0; i<elements.length; i++) {
  			fieldType = elements[i].type.toLowerCase();
  			switch(fieldType) {
    			case "text":
    			case "password":
    			case "textarea":
					elements[i].value = "";
      				break;

                case "hidden":
					if(elements[i].attributes['clearOnFormClear'] && (elements[i].attributes['clearOnFormClear'].value == 'y') ){
						elements[i].value = "";
					}
      				break;

    			case "radio":
    			case "checkbox":
        			if (elements[i].checked) {
          				elements[i].checked = false;
      				}
      				break;

    			case "select-one":
    			case "select-multi":
    				if(elements[i].attributes['dsi']){
						elements[i].selectedIndex = elements[i].attributes['dsi'].value;
					}else{
						elements[i].selectedIndex = -1;
					}
      				break;

    			default:
      				break;
  			}
		}

		form.submit();
	}

	function isDirty(rootElement){
		$elements = $('input, select', rootElement);

		for(i=0; i<$elements.length; i++){
			fieldType = $elements[i].type;
			switch(fieldType) {
				case "text":
				case "password":
				case "textarea":
					if($elements[i].value != ""){
						return true;
					}
					break;

				case "radio":
				case "checkbox":
					if($elements[i].checked){
						return true;
					}
					break;

				case "select-one":
				case "select-multi":
					if($elements[i].attributes['dsi']){
						if($elements[i].attributes['dsi'].value != $elements[i].selectedIndex){
							return true;
						}
					}else{
						if($elements[i].selectedIndex >= 1){
							return true;
						}
					}
					break;

				default:
					break;
			}
		}
		return false;
	}

    function hideContactsModal() {
        parent.dialog.modal('hide');
    }

    function hideDeliveryPreviewModal() {
        parent.dialog.modal('hide');
    }

    function getDelimiterSeparatedValue(selectedValues, delimiter){
        alert($('#recipientsToInput').tokenInput("get"));
        var text = "";
        for	(index = 0; index < selectedValues.length; index++) {
            text += selectedValues[index].id;
            text += delimiter;
        }
    }

    function showHostnameSuccess(hostname) {
            bootbox.dialog({
            title: "Biscom Secure File Transfer",
            message: "Resolved hostname: " + hostname,
            buttons: {
                main: {
                    label: "Ok",
                    className: "btn-primary",
                    callback: function() {
                    }
                }
            },
            onEscape: function() {}
        });
    }

    function showHostnameFailed() {
            bootbox.dialog({
            title: "Biscom Secure File Transfer",
            message: "Unable to resolve hostname, please try again later",
            buttons: {
                main: {
                    label: "Ok",
                    className: "btn-primary",
                    callback: function() {
                    }
                }
            },
            onEscape: function() {}
        });
    }


     // ** end: date range picker related functions ** //

	function urlX(url) { return url; }

	function idX(id) { return id; }

	function getSanitizedMessage(elementId) {
		var message = html_sanitize(Base64.decode(document.getElementById(elementId).value), urlX, idX);
		if(!message) {
			message = '[No message]';
		}
		return message;
	}

	function sanitizeAllMessages(className) {
	    var messageContainers = $('.'+className);

	    for(i=0; i<messageContainers.length; i++) {
	        messageContainer = messageContainers[i];

	        var message = messageContainer.getAttribute("message");
	        if(message) {
	            
	            message = Base64.decode(message);
	        }

	        if(!message) {
                message = '[No message]';
            }

            messageContainer.innerHTML = message;
	    }
	}

	function makePlainTextAllMessages(className) {
        var messageContainers = document.getElementsByClassName(className);

        for(i=0; i<messageContainers.length; i++) {
            messageContainer = messageContainers[i];

            // var message = $(messageContainer).text();
            var message = messageContainer.innerHTML;

            if(messageContainer.tagName == "TEXTAREA") {
                message = messageContainer.value.replace(/<(.|\n)*?>/g, '');
            }

            if(!message) {
                message = '[No message]';
            }

            messageContainer.innerHTML = message;
        }
	}     // ** end: date range picker related functions ** //


var DOWNLOAD_AS_ZIP_TYPES = {
    WORKSPACE: 'workspace',
    PACKAGE: 'package',
    DELIVERY: 'delivery',
    REPLY: 'reply',
 }


function downloadAsZip(inputs, type, targetId, isCompliance){

    var documentIds = [];
    if (inputs) {
        if (inputs.length) {
            for(var i = 0; i < inputs.length; i++){
                var input = inputs[i];
                if(input.checked){
                    documentIds.push(input.value);
                }
            }
        } else {
            if(inputs.checked){
                documentIds.push(inputs.value);
            }
        }
    }
    if(documentIds.length < 1){
        alert('Please select at least one file to download');
        return;
    }
    documentIds = documentIds.join(',');

    var isComplianceStr = "";
    if(isCompliance){
        isComplianceStr = "y";
    }
    var formId =  'downloadAsZipForm'+type;
    var form = $('#'+formId);
    if(form.size() < 1){
        var form = $('<form id="'+formId+'" method="post"></form>');
        form.attr('action', '/bds/FileSystem.do?method=downloadAsZip&type='+type+'&targetId='+targetId+'&isCompliance='+isComplianceStr);
        var docIdsField = $('<input type="hidden" name="documentIds" value="'+documentIds+'"/>');
        form.append(docIdsField);
        $('body').append(form);
    } else {
        var docIdsField = $('input[name=documentIds]', form);
        docIdsField.val(documentIds);
    }
    form.submit();
}


function downloadAsZipNS(inputs, trackingId, p1, deliveryId){
    var documentIds = [];
    if (inputs) {
        if (inputs.length) {
            for(var i = 0; i < inputs.length; i++){
                var input = inputs[i];
                if(input.checked){
                    documentIds.push(input.value);
                }
            }
        } else {
            if(inputs.checked){
                documentIds.push(inputs.value);
            }
        }
    }
    if(documentIds.length < 1){
        alert('Please select at least one file to download');
        return;
    }

    documentIds = documentIds.join(',');

    var form = $('#downloadAsZipFormNS');
    if(form.size() < 1){
        var form = $('<form id="downloadAsZipFormNS" method="post"></form>');
        form.attr('action', '/bds/Login.do?id='+trackingId+'&p1='+p1+'&deliveryId='+deliveryId+'&downloadDocument=true');
        var docIdsField = $('<input type="hidden" name="documentIds" value="'+documentIds+'"/>');
        form.append(docIdsField);
        $('body').append(form);
    } else {
        var docIdsField = $('input[name=documentIds]', form);
        docIdsField.val(documentIds);
    }
    form.submit();
}


function downloadAsZipFromPackage(inputs, packageId){
    return downloadAsZip(inputs, DOWNLOAD_AS_ZIP_TYPES.PACKAGE, packageId, false);
}

function downloadAsZipFromPackageByCompliance(inputs, packageId){
    return downloadAsZip(inputs, DOWNLOAD_AS_ZIP_TYPES.PACKAGE, packageId, true);
}

function downloadAsZipFromDelivery(inputs, deliveryId){
    return downloadAsZip(inputs, DOWNLOAD_AS_ZIP_TYPES.DELIVERY, deliveryId, false);
}

function downloadAsZipFromDeliveryByCompliance(inputs, deliveryId){
    return downloadAsZip(inputs, DOWNLOAD_AS_ZIP_TYPES.DELIVERY, deliveryId, true);
}

function downloadAsZipFromReply(inputs, deliveryId){
    return downloadAsZip(inputs, DOWNLOAD_AS_ZIP_TYPES.REPLY, deliveryId, false);
}

function downloadAsZipFromReplyByCompliance(inputs, deliveryId){
    return downloadAsZip(inputs, DOWNLOAD_AS_ZIP_TYPES.REPLY, deliveryId, true);
}

function downloadAsZipFromWorkspace(documentIdArray, directoryIdArray, packageId) {
    var documentIds = [];
    var directoryIds = [];
    if (documentIdArray && documentIdArray.length) {
        for (var i = 0; i < documentIdArray.length; i++) {
            var input = documentIdArray[i];
            if (input.checked) {
                documentIds.push(input.value);
            }
        }
    } else {
        if (documentIdArray && documentIdArray.checked) {
            documentIds.push(documentIdArray.value);
        }
    }
    if (directoryIdArray && directoryIdArray.length) {
        for (var i = 0; i < directoryIdArray.length; i++) {
            var input = directoryIdArray[i];
            if (input.checked) {
                directoryIds.push(input.value);
            }
        }
    } else {
        if (directoryIdArray && directoryIdArray.checked) {
            directoryIds.push(directoryIdArray.value);
        }
    }
    if ((documentIds.length + directoryIds.length) < 1) {
        alert('Please select at least one file or folder to download');
        return;
    }

    documentIds = documentIds.join(',');
    directoryIds = directoryIds.join(',');

    var form = $('#downloadAsZipFormWorspace');
    if(form.size() < 1){
        var form = $('<form id="downloadAsZipFormWorkspace" method="post"></form>');
        form.attr('action', '/bds/FileSystem.do?method=downloadAsZip&type=workspace&targetId='+packageId);
        var docIdsField = $('<input type="hidden" name="documentIds" value="'+documentIds+'"/>');
        var dirIdsField = $('<input type="hidden" name="directoryIds" value="'+directoryIds+'"/>');
        form.append(docIdsField);
        form.append(dirIdsField);
        $('body').append(form);
    } else {
        var docIdsField = $('input[name=documentIds]', form);
        var dirIdsField = $('input[name=directoryIds]', form);
        docIdsField.val(documentIds);
        dirIdsField.val(directoryIds);
    }
    form.submit();
}
function truncateLongText(text, length, end) {
    if (isNaN(length))
      length = 10;

    if (end === undefined)
      end = "...";

    if(text == undefined)
      text = "";

    if (text.length <= length) {
      return text;
    } else if ((text.length - length) < end.length) {
      return String(text).substring(0, text.length - end.length - (text.length - length)) + end;
    } else {
        return String(text).substring(0, length - end.length) + end;
    }
}

function emailHTMLWarning(){
    var val1 = document.getElementsByName('emailEnableHtmlMode')[0].checked;
    var val2 = document.getElementsByName('emailEnableHtmlMode')[1].checked;
    var text = 'Warning:\n\nEnabling or Disabling HTML mode for emails will change how notification messages look and will reformat existing default notification messages, secure messages, and footer messages.\n\nThis should be an one-time change made with a full understanding that existing message text formatting will change. Existing default messages should be reviewed and updated after making this change.\n\nFor HTML mode support in SFT Outlook Add-ins, version 5.1.1000 or above of the Add-in is required.\n\nClick OK to proceed with this change.';
	if ( confirm(text) == false){
		document.getElementsByName('emailEnableHtmlMode')[0].checked = val2;
		document.getElementsByName('emailEnableHtmlMode')[1].checked = val1;
	};
}

function getPasswordRuleMessages(minLength, maxLength, allowedList){
    var passwordRulesMessage = new Array();
    passwordRulesMessage["header"] = "Your password must have:";;
    passwordRulesMessage["upperCase"] = "At least one uppercase letter";;
    passwordRulesMessage["lowerCase"] = "At least one lowercase letter";
    passwordRulesMessage["digit"] = "At least one number";
    passwordRulesMessage["minMaxLength"] = String.format("Between {0} and {1} characters long", minLength, maxLength);
    passwordRulesMessage["nonAlphaNumeric"] =  "At least one non-alphanumeric character";
    passwordRulesMessage["allowed"] = String.format("At least one of the following {0}: {1}", allowedList.length > 0 ? "characters"  : "character", '<span style="margin-left:25px">' + allowedList + '<span>');
    return passwordRulesMessage;
}

function getPasswordStrengthTexts(){
    var strengthTexts = new Array();
    strengthTexts["weak"] = "Weak";
    strengthTexts["average"] = "Average";
    strengthTexts["strong"] = "Strong";

    return strengthTexts;
}

function getPasswordMatchTexts(){
    var passwordMatchTexts = new Array();
    passwordMatchTexts["matched"] = "Passwords match";
    passwordMatchTexts["notMatched"] = "Passwords do not match";

    return passwordMatchTexts;
}

function forwardFiles(inputs, docType, packageId) {
    var url = '/bds/DeliveryCreateQuick.do?method=getCreateSetup';
    var documentIds = [];
    if (inputs) {
        if (inputs.length) {
            for (var i = 0; i < inputs.length; i++) {
                var input = inputs[i];
                if (input.checked) {
                    documentIds.push(input.value);
                }
            }
        } else {
            if (inputs.checked) {
                documentIds.push(inputs.value);
            }
        }
    }
    if (documentIds.length < 1) {
        alert('Please select one or more files to send.');
        return;
    }
    documentIds = documentIds.join(',');
    window.location.href = url + "&docType=" + docType + "&filesToForward=" + documentIds+"&packageId="+packageId;
}

function checkedDirectoryCount(inputs) {
    var directoryIds = [];
    if (inputs) {
        if (inputs.length) {
            for (var i = 0; i < inputs.length; i++) {
                var input = inputs[i];
                if (input.checked) {
                    directoryIds.push(input.value);
                }
            }
        } else {
            if (inputs.checked) {
                directoryIds.push(inputs.value);
            }
        }
    }
    return directoryIds.length;
}

function forwardFilesWithoutFolders(docInputs, dirInputs, docType, packageId) {
    if(checkedDirectoryCount(dirInputs) > 0) {
		alert('You cannot forward folders to a delivery. Only files may be forwarded.');
    } else {
		forwardFiles(docInputs, docType, packageId);
	}
}

function getSizeWithUnit(lv) {

    var gB = 1024 * 1024 * 1024;
    var mB = 1024 * 1024;
    var kB = 1024;
    var sizeunit_gigabytes = "GB";
    var sizeunit_megabytes = "MB";
    var sizeunit_kilobytes = "KB";
    var sizeunit_bytes = "bytes";
    var sizeunit_byte = "byte";

    var result = "";

    var unit = sizeunit_bytes;

    if (lv == 1 || lv == 0) {
        unit = sizeunit_byte;
        result = lv + " " + unit;
    } else if (lv < kB) {
        unit = sizeunit_bytes;
        result = lv + " " + unit;
    } else if (lv >= gB) {
        lv /= gB;
        unit = sizeunit_gigabytes;
        result = lv.toFixed(2) + " " + unit;
    } else if (lv >= mB) {
        lv /= mB;
        unit = sizeunit_megabytes;
        result = lv.toFixed(2) + " " + unit;
    } else if (lv >= kB) {
        lv /= kB;
        unit = sizeunit_kilobytes;
        result = lv.toFixed(2) + " " + unit;
    }
    return result;
}

function getMfaMessage(key) {
    var value = key;
    var map = {
        'page.login.mfa.general.unexpected' : 'An unexpected error has occurred. Please try again later.',
        'msg.invalid.mfa.code' : 'The code you entered is not valid.',
        'msg.mobile.number.not.found' : 'Your account does not have an associated mobile phone number required for multi-factor authentication. Please contact the system administrator for more information.',
        'msg.invalid.credentials' : 'Invalid credentials found for MFA.',
        'msg.send.mfa.code' : 'Additional security is required for your account. Use the button below to send a code through SMS to your mobile phone.',
    };
    value = map[key];
    return value;
}
