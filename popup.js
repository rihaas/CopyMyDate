// CopyMyDate - Chrome Extension
// Version 2.0.0

// 30+ Common Date Formats
const DATE_FORMATS = [
    { label: "MM/dd/yyyy", value: "MM/dd/yyyy", example: "10/26/2025" },
    { label: "dd/MM/yyyy", value: "dd/MM/yyyy", example: "26/10/2025" },
    { label: "yyyy-MM-dd", value: "yyyy-MM-dd", example: "2025-10-26" },
    { label: "yyyy/MM/dd", value: "yyyy/MM/dd", example: "2025/10/26" },
    { label: "dd-MM-yyyy", value: "dd-MM-yyyy", example: "26-10-2025" },
    { label: "MM-dd-yyyy", value: "MM-dd-yyyy", example: "10-26-2025" },
    { label: "MMMM dd, yyyy", value: "MMMM dd, yyyy", example: "October 26, 2025" },
    { label: "MMM dd, yyyy", value: "MMM dd, yyyy", example: "Oct 26, 2025" },
    { label: "dd MMMM yyyy", value: "dd MMMM yyyy", example: "26 October 2025" },
    { label: "dd MMM yyyy", value: "dd MMM yyyy", example: "26 Oct 2025" },
    { label: "EEEE, MMMM dd, yyyy", value: "EEEE, MMMM dd, yyyy", example: "Sunday, October 26, 2025" },
    { label: "EEE, MMM dd, yyyy", value: "EEE, MMM dd, yyyy", example: "Sun, Oct 26, 2025" },
    { label: "yyyy-MM-dd HH:mm:ss", value: "yyyy-MM-dd HH:mm:ss", example: "2025-10-26 14:30:45" },
    { label: "dd/MM/yyyy HH:mm:ss", value: "dd/MM/yyyy HH:mm:ss", example: "26/10/2025 14:30:45" },
    { label: "MM/dd/yyyy hh:mm:ss a", value: "MM/dd/yyyy hh:mm:ss a", example: "10/26/2025 02:30:45 PM" },
    { label: "yyyy-MM-dd'T'HH:mm:ss", value: "yyyy-MM-dd'T'HH:mm:ss", example: "2025-10-26T14:30:45" },
    { label: "HH:mm:ss", value: "HH:mm:ss", example: "14:30:45" },
    { label: "hh:mm:ss a", value: "hh:mm:ss a", example: "02:30:45 PM" },
    { label: "HH:mm", value: "HH:mm", example: "14:30" },
    { label: "hh:mm a", value: "hh:mm a", example: "02:30 PM" },
    { label: "MMMM dd, yyyy hh:mm a", value: "MMMM dd, yyyy hh:mm a", example: "October 26, 2025 02:30 PM" },
    { label: "MMM dd, yyyy HH:mm", value: "MMM dd, yyyy HH:mm", example: "Oct 26, 2025 14:30" },
    { label: "dd-MMM-yyyy", value: "dd-MMM-yyyy", example: "26-Oct-2025" },
    { label: "dd.MM.yyyy", value: "dd.MM.yyyy", example: "26.10.2025" },
    { label: "yyyy.MM.dd", value: "yyyy.MM.dd", example: "2025.10.26" },
    { label: "yyyyMMdd", value: "yyyyMMdd", example: "20251026" },
    { label: "ddMMyyyy", value: "ddMMyyyy", example: "26102025" },
    { label: "MM/dd/yy", value: "MM/dd/yy", example: "10/26/25" },
    { label: "dd/MM/yy", value: "dd/MM/yy", example: "26/10/25" },
    { label: "yy-MM-dd", value: "yy-MM-dd", example: "25-10-26" },
    { label: "MMMM dd, yyyy HH:mm:ss", value: "MMMM dd, yyyy HH:mm:ss", example: "October 26, 2025 14:30:45" },
    { label: "dd/MM/yyyy hh:mm a", value: "dd/MM/yyyy hh:mm a", example: "26/10/2025 02:30 PM" },
];

/**
 * Custom date formatting function
 * Formats a date object according to the specified format string
 * @param {Date} date - The date to format
 * @param {string} formatStr - The format string
 * @returns {string} - The formatted date string
 */
function formatDate(date, formatStr) {
    const pad = (num) => String(num).padStart(2, '0');
    
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                        'July', 'August', 'September', 'October', 'November', 'December'];
    const monthShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const hours12 = hours % 12 || 12;
    
    let result = formatStr;
    
    // Replace patterns (order matters!)
    result = result.replace('yyyy', String(year));
    result = result.replace('yy', String(year).slice(-2));
    result = result.replace('MMMM', monthNames[month - 1]);
    result = result.replace('MMM', monthShort[month - 1]);
    result = result.replace('MM', pad(month));
    result = result.replace('dd', pad(day));
    result = result.replace('EEEE', dayNames[date.getDay()]);
    result = result.replace('EEE', dayShort[date.getDay()]);
    result = result.replace('HH', pad(hours));
    result = result.replace('hh', pad(hours12));
    result = result.replace('mm', pad(minutes));
    result = result.replace('ss', pad(seconds));
    result = result.replace(' a', ' ' + ampm);
    result = result.replace("'T'", 'T');
    
    return result;
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Get DOM elements
    const formattedTimeEl = document.getElementById('formatted-time');
    const copyButton = document.getElementById('copy-button');
    const copyButtonText = document.getElementById('copy-button-text');
    const radioGroup = document.getElementById('radio-group');
    const copyIcon = document.getElementById('copy-icon');
    const checkIcon = document.getElementById('check-icon');
    const searchInput = document.getElementById('search-input');

    // State variables
    let currentTime = new Date();
    let selectedFormat = '';
    let isCopied = false;
    let copyTimeout;
    let updateInterval;

    // Load saved format from chrome storage
    chrome.storage.sync.get(['selectedFormat'], (result) => {
        selectedFormat = result.selectedFormat || DATE_FORMATS[0].value;
        renderRadioButtons();
        updateTime();
        startTimer();
    });

    /**
     * Render radio buttons for format selection
     * @param {string} searchTerm - Optional search term to filter formats
     */
    function renderRadioButtons(searchTerm = '') {
        radioGroup.innerHTML = '';
        
        const filteredFormats = DATE_FORMATS.filter(format => 
            format.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
            format.example.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (filteredFormats.length === 0) {
            radioGroup.innerHTML = '<div class="no-results">No formats found</div>';
            return;
        }

        filteredFormats.forEach(formatOption => {
            const item = document.createElement('div');
            item.className = 'radio-item';

            const label = document.createElement('label');
            
            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = 'format';
            radio.value = formatOption.value;
            radio.checked = selectedFormat === formatOption.value;
            radio.addEventListener('change', (e) => {
                selectedFormat = e.target.value;
                chrome.storage.sync.set({ selectedFormat });
                updateTime();
            });

            const contentDiv = document.createElement('div');
            contentDiv.className = 'format-content';

            const labelSpan = document.createElement('span');
            labelSpan.className = 'format-label';
            labelSpan.textContent = formatOption.label;

            const exampleSpan = document.createElement('span');
            exampleSpan.className = 'format-example';
            exampleSpan.textContent = formatOption.example;

            contentDiv.appendChild(labelSpan);
            contentDiv.appendChild(exampleSpan);

            label.appendChild(radio);
            label.appendChild(contentDiv);
            item.appendChild(label);
            radioGroup.appendChild(item);
        });
    }

    /**
     * Update the displayed time with current date/time
     */
    function updateTime() {
        currentTime = new Date();
        try {
            formattedTimeEl.textContent = formatDate(currentTime, selectedFormat);
        } catch (e) {
            formattedTimeEl.textContent = 'Invalid Format';
        }
    }

    /**
     * Start the timer to update time every second
     */
    function startTimer() {
        updateInterval = setInterval(updateTime, 1000);
    }

    /**
     * Handle copy button click
     * Copies the formatted date to clipboard
     */
    function handleCopy() {
        if (isCopied) return;
        
        try {
            const formatted = formatDate(currentTime, selectedFormat);
            navigator.clipboard.writeText(formatted);

            isCopied = true;
            copyButtonText.textContent = 'Copied!';
            copyIcon.classList.add('hidden');
            checkIcon.classList.remove('hidden');

            clearTimeout(copyTimeout);
            copyTimeout = setTimeout(() => {
                isCopied = false;
                copyButtonText.textContent = 'Copy';
                copyIcon.classList.remove('hidden');
                checkIcon.classList.add('hidden');
            }, 2000);
        } catch (e) {
            formattedTimeEl.textContent = 'Copy Failed';
            console.error("Failed to copy:", e);
        }
    }

    // Event Listeners
    copyButton.addEventListener('click', handleCopy);

    searchInput.addEventListener('input', (e) => {
        renderRadioButtons(e.target.value);
    });

    // Keyboard shortcut listener (Ctrl+Shift+C or Cmd+Shift+C)
    document.addEventListener('keydown', (event) => {
        if ((event.metaKey || event.ctrlKey) && event.shiftKey && event.key.toLowerCase() === 'c') {
            event.preventDefault();
            handleCopy();
        }
    });

    // Listen for extension command (from manifest)
    if (chrome.commands) {
        chrome.commands.onCommand.addListener((command) => {
            if (command === "copy-date") {
                handleCopy();
            }
        });
    }

    // Cleanup on window close
    window.addEventListener('beforeunload', () => {
        clearInterval(updateInterval);
        clearTimeout(copyTimeout);
    });
});
