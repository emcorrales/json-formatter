const inputTextarea = document.getElementById('input');
const outputTextarea = document.getElementById('output');
const messageBox = document.getElementById('message');
const indentInput = document.getElementById('indent');

function formatJSON() {
    const input = inputTextarea.value.trim();
    
    if (!input) {
        showMessage('Please enter some JSON', 'error');
        return;
    }

    try {
        const parsed = JSON.parse(input);
        const indent = parseInt(indentInput.value) || 2;
        const formatted = JSON.stringify(parsed, null, indent);
        
        outputTextarea.value = formatted;
        inputTextarea.classList.remove('error');
        showMessage('JSON formatted successfully!', 'success');
    } catch (error) {
        inputTextarea.classList.add('error');
        showMessage(`Invalid JSON: ${error.message}`, 'error');
    }
}

function copyToClipboard() {
    const output = outputTextarea.value;
    
    if (!output) {
        showMessage('Nothing to copy', 'error');
        return;
    }

    navigator.clipboard.writeText(output).then(() => {
        showMessage('Copied to clipboard!', 'success');
    }).catch(() => {
        showMessage('Failed to copy', 'error');
    });
}

function clearAll() {
    inputTextarea.value = '';
    outputTextarea.value = '';
    inputTextarea.classList.remove('error');
    messageBox.classList.remove('show');
}

function showMessage(text, type) {
    messageBox.textContent = text;
    messageBox.className = `message ${type} show`;
    
    setTimeout(() => {
        messageBox.classList.remove('show');
    }, 4000);
}

// Allow Enter + Cmd/Ctrl to format
inputTextarea.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        formatJSON();
    }
});

// Auto-format when pasting
inputTextarea.addEventListener('paste', () => {
    setTimeout(() => {
        if (inputTextarea.value.trim()) {
            formatJSON();
        }
    }, 10);
});
