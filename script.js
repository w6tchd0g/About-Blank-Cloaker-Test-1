// ==============================================
// About Blank Cloaker - Simplified Implementation
// ==============================================

// Constants
const DEBUG_MODE = true; // Enable debug logs

// Utility Functions
function log(message) {
    if (DEBUG_MODE) {
        console.log(`[About Blank Cloaker] ${message}`);
    }
}

function showAlert(message) {
    alert(`[About Blank Cloaker] ${message}`);
}

function isValidUrl(url) {
    try {
        new URL(url);
        return true;
    } catch (error) {
        return false;
    }
}

// Function to Open Link in About:Blank Tab
function openLinkInTab() {
    const link = document.getElementById('linkInput').value.trim();

    if (!link) {
        showAlert('Please paste a valid link.');
        return;
    }

    if (!isValidUrl(link)) {
        showAlert('Invalid URL. Please enter a valid link.');
        return;
    }

    log(`Opening link in About:Blank tab: ${link}`);

    // Open a new tab with about:blank
    const newTab = window.open('about:blank', '_blank');

    if (!newTab) {
        showAlert('Popup blocked! Please allow popups for this site.');
        return;
    }

    // Create an iframe inside the new tab
    const iframe = newTab.document.createElement('iframe');
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    iframe.src = link;

    // Append the iframe to the new tab's body
    newTab.document.body.style.margin = '0';
    newTab.document.body.appendChild(iframe);

    // Handle iframe loading errors
    iframe.onload = () => {
        try {
            // Check if the iframe content is accessible
            if (iframe.contentWindow.location.href === 'about:blank') {
                throw new Error('Blocked or failed to load');
            }
        } catch (error) {
            log(`Failed to load iframe: ${error.message}`);
            showAlert('This website cannot be displayed in an iframe.');
        }
    };
}

// Function to Open This Site in About:Blank
function openThisSiteInAboutBlank() {
    const currentUrl = window.location.href;
    log(`Opening this site in About:Blank: ${currentUrl}`);

    // Open a new tab with about:blank
    const newTab = window.open('about:blank', '_blank');

    if (!newTab) {
        showAlert('Popup blocked! Please allow popups for this site.');
        return;
    }

    // Create an iframe inside the new tab
    const iframe = newTab.document.createElement('iframe');
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    iframe.src = currentUrl;

    // Append the iframe to the new tab's body
    newTab.document.body.style.margin = '0';
    newTab.document.body.appendChild(iframe);

    // Handle iframe loading errors
    iframe.onload = () => {
        try {
            // Check if the iframe content is accessible
            if (iframe.contentWindow.location.href === 'about:blank') {
                throw new Error('Blocked or failed to load');
            }
        } catch (error) {
            log(`Failed to load iframe: ${error.message}`);
            showAlert('This website cannot be displayed in an iframe.');
        }
    };
}

// Event Listeners
document.getElementById('linkInput').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        openLinkInTab();
    }
});

// Debugging
log('About Blank Cloaker initialized.');