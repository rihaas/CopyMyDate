document.addEventListener('DOMContentLoaded', () => {
    // This is using the dateFns object from the date-fns.min.js file
    const { format } = dateFns;

    const predefinedFormats = [
        { label: "MM/dd/yyyy", value: "MM/dd/yyyy" },
        { label: "yyyy-MM-dd HH:mm:ss", value: "yyyy-MM-dd HH:mm:ss" },
        { label: "dd/MM/yyyy HH:mm:ss", value: "dd/MM/yyyy HH:mm:ss" },
    ];

    const formattedTimeEl = document.getElementById('formatted-time');
    const copyButton = document.getElementById('copy-button');
    const copyButtonText = document.getElementById('copy-button-text');
    const radioGroup = document.getElementById('radio-group');
    const copyIcon = document.getElementById('copy-icon');
    const checkIcon = document.getElementById('check-icon');

    let currentTime = new Date();
    let selectedFormat = '';
    let isCopied = false;
    let copyTimeout;

    // Load saved format from chrome storage
    chrome.storage.sync.get(['selectedFormat'], (result) => {
        selectedFormat = result.selectedFormat || predefinedFormats[0].value;
        renderRadioButtons();
        updateTime();
    });

    function renderRadioButtons() {
        radioGroup.innerHTML = '';
        predefinedFormats.forEach(formatOption => {
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

            const span = document.createElement('span');
            span.className = 'format-label';
            span.textContent = formatOption.label;

            label.appendChild(radio);
            label.appendChild(span);
            item.appendChild(label);
            radioGroup.appendChild(item);
        });
    }

    function updateTime() {
        currentTime = new Date();
        try {
            formattedTimeEl.textContent = format(currentTime, selectedFormat);
        } catch (e) {
            formattedTimeEl.textContent = 'Invalid Format';
        }
    }

    function handleCopy() {
        if (isCopied) return;
        
        try {
            const formatted = format(currentTime, selectedFormat);
            navigator.clipboard.writeText(formatted);

            isCopied = true;
            copyButtonText.textContent = 'Copied!';
            copyIcon.classList.add('hidden');
            checkIcon.classList.remove('hidden');

            // Revert after 2 seconds
            clearTimeout(copyTimeout);
            copyTimeout = setTimeout(() => {
                isCopied = false;
                copyButtonText.textContent = 'Copy';
                copyIcon.classList.remove('hidden');
                checkIcon.classList.add('hidden');
            }, 2000);
        } catch (e) {
            formattedTimeEl.textContent = 'Invalid Format';
            console.error("Failed to copy:", e);
        }
    }

    // Update time every second
    setInterval(updateTime, 1000);

    // Event Listeners
    copyButton.addEventListener('click', handleCopy);

    // Keyboard shortcut listener
    document.addEventListener('keydown', (event) => {
        // For macOS, check metaKey. For Windows/Linux, check ctrlKey.
        if (event.metaKey && event.shiftKey && event.key.toLowerCase() === 'c') {
            event.preventDefault();
            handleCopy();
        }
    });

    // We can also listen for a command from the manifest, if defined.
    if (chrome.commands) {
        chrome.commands.onCommand.addListener((command) => {
            if (command === "copy_datetime") {
                handleCopy();
            }
        });
    }
});
