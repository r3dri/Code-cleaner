const CONFIG = {
    maxSize: 5 * 1024 * 1024,
    allowedExtensions: ['py', 'js', 'ts', 'java', 'c', 'cs', 'cpp', 'h', 'go', 'rs', 'php', 'rb', 'sql', 'html', 'css', 'txt'],
    currentLevel: 'medium',
    previewLines: 20
};

let currentFileName = 'cleaned_code.txt';
let originalText = '';
let cleanedText = ''; 
let showFullPreview = false;

const fileInput = document.getElementById('fileInput');
const dropZoneInner = document.getElementById('dropZoneInner');
const pasteBtn = document.getElementById('pasteBtn');
const processBtn = document.getElementById('processBtn');
const errorMessage = document.getElementById('errorMessage');
const resultsArea = document.getElementById('resultsArea');
const controls = document.getElementById('controls');
const originalCodeEl = document.getElementById('originalCode');
const cleanedCodeEl = document.getElementById('cleanedCode');
const themeToggle = document.getElementById('themeToggle');
const htmlEl = document.documentElement;
const previewArea = document.getElementById('previewArea');
const previewCode = document.getElementById('previewCode');
const fileInfo = document.getElementById('fileInfo');
const clearPreviewBtn = document.getElementById('clearPreviewBtn');
const showFullBtn = document.getElementById('showFullBtn');

function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        htmlEl.classList.remove('dark');
    } else {
        htmlEl.classList.add('dark');
    }
}

themeToggle.addEventListener('click', () => {
    if (htmlEl.classList.contains('dark')) {
        htmlEl.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    } else {
        htmlEl.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    }
});

document.getElementById('currentYear').textContent = new Date().getFullYear();

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

function getLineWord(count) {
    const lastDigit = count % 10;
    const lastTwoDigits = count % 100;
    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) return 'строк';
    if (lastDigit === 1) return 'строка';
    if (lastDigit >= 2 && lastDigit <= 4) return 'строки';
    return 'строк';
}

function escapeHTML(str) {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function showPreview() {
    const lines = originalText.split('\n');
    const totalLines = lines.length;
    
    fileInfo.textContent = `${currentFileName} (${formatFileSize(originalText.length)}, ${totalLines} ${getLineWord(totalLines)})`;
    
    if (showFullPreview || totalLines <= CONFIG.previewLines) {
        previewCode.innerHTML = addLineNumbers(originalText);
        showFullBtn.classList.add('hidden');
    } else {
        const previewLines = lines.slice(0, CONFIG.previewLines).join('\n');
        previewCode.innerHTML = addLineNumbers(previewLines) + `<div class="code-line"><span class="line-number"></span><span class="line-content" style="color: var(--muted); font-style: italic;">... ещё ${totalLines - CONFIG.previewLines} строк</span></div>`;
        showFullBtn.classList.remove('hidden');
        showFullBtn.textContent = 'Показать весь код';
    }
    
    previewArea.classList.remove('hidden');
    previewArea.style.display = 'block';
}

function addLineNumbers(code) {
    const lines = code.split('\n');
    return lines.map((line, index) => {
        const lineNumber = index + 1;
        return `<div class="code-line"><span class="line-number">${lineNumber}</span><span class="line-content">${escapeHTML(line) || ' '}</span></div>`;
    }).join('');
}

function clearPreview() {
    originalText = '';
    currentFileName = 'cleaned_code.txt';
    showFullPreview = false;
    
    previewArea.classList.add('hidden');
    previewArea.style.display = 'none';
    controls.classList.add('hidden');
    controls.style.display = 'none';
    resultsArea.classList.add('hidden');
    resultsArea.style.display = 'none';
    
    fileInput.value = '';
}

function showError(msg) {
    errorMessage.textContent = msg;
    errorMessage.classList.remove('hidden');
    errorMessage.style.display = 'block';
    controls.classList.add('hidden');
    controls.style.display = 'none';
    resultsArea.classList.add('hidden');
    resultsArea.style.display = 'none';
    previewArea.classList.add('hidden');
    previewArea.style.display = 'none';
}

function hideError() {
    errorMessage.classList.add('hidden');
    errorMessage.style.display = 'none';
}

function showControls() {
    controls.classList.remove('hidden');
    controls.style.display = 'flex';
    resultsArea.classList.add('hidden');
    resultsArea.style.display = 'none';
}

function removeEmojis(text) {
    const emojiRegex = /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{FE00}-\u{FE0F}]|[\u{1F900}-\u{1F9FF}]|[\u{1FA00}-\u{1FA6F}]|[\u{1FA70}-\u{1FAFF}]|[\u{231A}-\u{231B}]|[\u{23E9}-\u{23F3}]|[\u{23F8}-\u{23FA}]|[\u{25AA}-\u{25AB}]|[\u{25B6}]|[\u{25C0}]|[\u{25FB}-\u{25FE}]|[\u{2614}-\u{2615}]|[\u{2648}-\u{2653}]|[\u{267F}]|[\u{2693}]|[\u{26A1}]|[\u{26AA}-\u{26AB}]|[\u{26BD}-\u{26BE}]|[\u{26C4}-\u{26C5}]|[\u{26CE}]|[\u{26D4}]|[\u{26EA}]|[\u{26F2}-\u{26F3}]|[\u{26F5}]|[\u{26FA}]|[\u{26FD}]|[\u{2702}]|[\u{2705}]|[\u{2708}-\u{270D}]|[\u{270F}]/gu;
    const matches = text.match(emojiRegex);
    const count = matches ? matches.length : 0;
    return { text: text.replace(emojiRegex, ''), count };
}

function isPreprocessorDirective(line) {
    return /^\s*#\s*(include|define|undef|if|ifdef|ifndef|else|elif|endif|error|warning|line|pragma)\b/i.test(line);
}

function cleanCode(text, level) {
    let lines = text.split('\n');
    let cleanedLines = [];
    let commentsRemoved = 0;
    let printsRemoved = 0;
    let removalInfo = [];

    const aiPhrases = /(?:вот|here|hope|let me|please|обратите|код|code|example|пример|привет|hello|hi|конечно|sure|вот ваш|your code|объясн|explain|ниже|below|предлагаю|suggest|рекомендую|recommend|важно|important|примечани|note|обратите внимани)/i;

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        let trimmed = line.trim();
        let wasRemoved = false;
        let removalType = 'none';
        let removedText = '';

        const removeEmojisEnabled = document.getElementById('removeEmojisToggle').checked;
        if (removeEmojisEnabled) {
            const before = line;
            const emojiResult = removeEmojis(line);
            line = emojiResult.text;
            if (before !== line) {
                removedText += ' [эмодзи]';
                removalType = 'partial';
            }
        }

        if (isPreprocessorDirective(line)) {
            cleanedLines.push(line);
            removalInfo.push({ type: 'none', removedText: '', originalLine: lines[i] });
            continue;
        }

        const lineCommentMatch = line.match(/^(\s*)(\/\/|#)(.*)/);
        const inlineCommentMatch = line.match(/^(.+?)(\s*)(\/\/|#)(.*)/);
        
        const blockCommentMatch = line.match(/^(\s*)(\/\*[\s\S]*?\*\/)(\s*)$/);
        const inlineBlockMatch = line.match(/^(.+?)(\s*\/\*[\s\S]*?\*\/\s*)$/);
        
        const htmlCommentMatch = line.match(/^(\s*)(<!--[\s\S]*?-->)(\s*)$/);
        const inlineHtmlMatch = line.match(/^(.+?)(\s*<!--[\s\S]*?-->\s*)$/);

        if (lineCommentMatch && aiPhrases.test(lineCommentMatch[3])) {
            wasRemoved = true;
            removalType = 'full';
            removedText = trimmed;
            commentsRemoved++;
            line = null;
        }
        else if (inlineCommentMatch && aiPhrases.test(inlineCommentMatch[4])) {
            removedText = inlineCommentMatch[2] + inlineCommentMatch[3] + inlineCommentMatch[4];
            line = inlineCommentMatch[1];
            removalType = 'partial';
            commentsRemoved++;
        }
        else if (blockCommentMatch && aiPhrases.test(blockCommentMatch[2])) {
            wasRemoved = true;
            removalType = 'full';
            removedText = trimmed;
            commentsRemoved++;
            line = null;
        }
        else if (inlineBlockMatch && aiPhrases.test(inlineBlockMatch[2])) {
            removedText = inlineBlockMatch[2];
            line = inlineBlockMatch[1];
            removalType = 'partial';
            commentsRemoved++;
        }
        else if (htmlCommentMatch && aiPhrases.test(htmlCommentMatch[2])) {
            wasRemoved = true;
            removalType = 'full';
            removedText = trimmed;
            commentsRemoved++;
            line = null;
        }
        else if (inlineHtmlMatch && aiPhrases.test(inlineHtmlMatch[2])) {
            removedText = inlineHtmlMatch[2];
            line = inlineHtmlMatch[1];
            removalType = 'partial';
            commentsRemoved++;
        }

        if (!wasRemoved && (level === 'medium' || level === 'high')) {
            const printRegex = /^\s*(?:(?:console\.log|print|echo|System\.out\.println|fmt\.Println|puts|var_dump|debug_print)\s*\([^)]*\)|cout\s*<<\s*[^;]*)\s*;?\s*$/;
            if (printRegex.test(line) && /[-=_*]{3,}/.test(line)) {
                wasRemoved = true;
                removalType = 'full';
                removedText = trimmed;
                printsRemoved++;
                line = null;
            }
        }

        if (!wasRemoved && level === 'high' && line !== null) {
            const startLineComment = line.match(/^(\s*)(\/\/|#)(.*)/);
            if (startLineComment && !isPreprocessorDirective(line)) {
                wasRemoved = true;
                removalType = 'full';
                removedText = trimmed;
                commentsRemoved++;
                line = null;
            }
            else {
                const endLineComment = line.match(/^(.+?)(\s*)(\/\/|#)(.*)/);
                if (endLineComment) {
                    const codePart = endLineComment[1];
                    const quotesBefore = (codePart.match(/(?<!\\)"/g) || []).length + (codePart.match(/(?<!\\)'/g) || []).length;
                    if (quotesBefore % 2 === 0) {
                        removedText = endLineComment[2] + endLineComment[3] + endLineComment[4];
                        line = codePart;
                        removalType = 'partial';
                        commentsRemoved++;
                    }
                }
            }
            
            if (line !== null) {
                const blockOnly = line.match(/^(\s*)(\/\*[\s\S]*?\*\/)(\s*)$/);
                if (blockOnly) {
                    wasRemoved = true;
                    removalType = 'full';
                    removedText = trimmed;
                    commentsRemoved++;
                    line = null;
                } else {
                    const inlineBlock = line.match(/^(.+?)(\s*)(\/\*[\s\S]*?\*\/)(\s*)$/);
                    if (inlineBlock) {
                        removedText = inlineBlock[2] + inlineBlock[3] + inlineBlock[4];
                        line = inlineBlock[1];
                        removalType = 'partial';
                        commentsRemoved++;
                    }
                }
            }
            
            if (line !== null) {
                const htmlOnly = line.match(/^(\s*)(<!--[\s\S]*?-->)(\s*)$/);
                if (htmlOnly) {
                    wasRemoved = true;
                    removalType = 'full';
                    removedText = trimmed;
                    commentsRemoved++;
                    line = null;
                } else {
                    const inlineHtml = line.match(/^(.+?)(\s*)(<!--[\s\S]*?-->)(\s*)$/);
                    if (inlineHtml) {
                        removedText = inlineHtml[2] + inlineHtml[3] + inlineHtml[4];
                        line = inlineHtml[1];
                        removalType = 'partial';
                        commentsRemoved++;
                    }
                }
            }
        }

        if (line !== null) {
            cleanedLines.push(line);
            removalInfo.push({ type: removalType, removedText: removedText, originalLine: lines[i] });
        } else {
            removalInfo.push({ type: 'full', removedText: removedText, originalLine: lines[i] });
        }
    }

    let cleaned = cleanedLines.join('\n');
    cleaned = cleaned.replace(/\n{3,}/g, '\n\n').trim();

    return { cleaned, commentsRemoved, printsRemoved, removalInfo };
}
function renderOriginalWithDiff(originalText, removalInfo) {
    const lines = originalText.split('\n');
    let html = '';
    let removalIndex = 0;

    for (let i = 0; i < lines.length; i++) {
        const lineNumber = i + 1;
        const line = lines[i];
        const info = removalInfo[removalIndex];

        if (!info) {
            html += `<div class="code-line"><span class="line-number">${lineNumber}</span><span class="line-content">${escapeHTML(line) || ' '}</span></div>`;
            continue;
        }

        if (info.type === 'full') {
            html += `<div class="code-line line-removed"><span class="line-number">${lineNumber}</span><span class="line-content">${escapeHTML(line) || ' '}</span></div>`;
            removalIndex++;
        } else if (info.type === 'partial') {
            const originalLine = info.originalLine;
            const removedPart = info.removedText;
            
            const removedIndex = originalLine.indexOf(removedPart.trim());
            
            if (removedIndex >= 0) {
                const beforeRemoved = originalLine.substring(0, removedIndex);
                const removed = originalLine.substring(removedIndex, removedIndex + removedPart.trim().length);
                const afterRemoved = originalLine.substring(removedIndex + removedPart.trim().length);
                
                html += `<div class="code-line"><span class="line-number">${lineNumber}</span><span class="line-content">${escapeHTML(beforeRemoved)}<span class="removed-part">${escapeHTML(removed)}</span>${escapeHTML(afterRemoved)}</span></div>`;
            } else {
                html += `<div class="code-line line-changed"><span class="line-number">${lineNumber}</span><span class="line-content">${escapeHTML(line) || ' '}</span></div>`;
            }
            removalIndex++;
        } else {
            html += `<div class="code-line"><span class="line-number">${lineNumber}</span><span class="line-content">${escapeHTML(line) || ' '}</span></div>`;
            removalIndex++;
        }
    }

    return html;
}

function addLineNumbersSimple(code) {
    const lines = code.split('\n');
    return lines.map((line, index) => {
        return `<div class="code-line"><span class="line-number">${index + 1}</span><span class="line-content">${escapeHTML(line) || ' '}</span></div>`;
    }).join('');
}

function handleFile(file) {
    hideError();
    
    const ext = file.name.split('.').pop().toLowerCase();
    if (!CONFIG.allowedExtensions.includes(ext)) {
        showError(`Данный формат файла не поддерживается. Поддерживаемые форматы: .${CONFIG.allowedExtensions.join(', .')}`);
        return;
    }

    if (file.size > CONFIG.maxSize) {
        showError(`Размер файла превышает допустимый лимит (5 МБ).`);
        return;
    }

    currentFileName = file.name;
    const reader = new FileReader();
    
    reader.onload = (e) => {
        originalText = e.target.result;
        showFullPreview = false;
        showPreview();
        showControls();
    };
    
    reader.onerror = () => {
        showError('Ошибка при чтении файла.');
    };
    
    reader.readAsText(file);
}

function processCode(text, level) {
    try {
        const startTime = performance.now();
        
        const result = cleanCode(text, level);
        
        const endTime = performance.now();
        const timeTaken = ((endTime - startTime) / 1000).toFixed(3);

        cleanedText = result.cleaned;

        originalCodeEl.innerHTML = renderOriginalWithDiff(text, result.removalInfo);
        
        cleanedCodeEl.innerHTML = addLineNumbersSimple(result.cleaned);
        
        document.getElementById('statTime').textContent = `⏱ ${timeTaken} сек`;
        document.getElementById('statComments').textContent = `💬 Комментариев удалено: ${result.commentsRemoved}`;
        document.getElementById('statPrints').textContent = `🖨 Выводов удалено: ${result.printsRemoved}`;
        
        const removeEmojisEnabled = document.getElementById('removeEmojisToggle').checked;
        const statEmojis = document.getElementById('statEmojis');
        const statEmojisCount = document.getElementById('statEmojisCount');
        
        if (removeEmojisEnabled) {
            const emojiResult = removeEmojis(text);
            if (emojiResult.count > 0) {
                statEmojis.classList.remove('hidden');
                statEmojisCount.classList.remove('hidden');
                statEmojisCount.textContent = `😀 Эмодзи удалено: ${emojiResult.count}`;
            } else {
                statEmojis.classList.add('hidden');
                statEmojisCount.classList.add('hidden');
            }
        } else {
            statEmojis.classList.add('hidden');
            statEmojisCount.classList.add('hidden');
        }

        resultsArea.classList.remove('hidden');
        resultsArea.style.display = 'flex';
        
        if (window.innerWidth < 768) {
            resultsArea.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    } catch (error) {
        console.error('Ошибка при обработке кода:', error);
        showError('Произошла ошибка при обработке кода. Попробуйте ещё раз.');
    }
}

dropZoneInner.addEventListener('click', (e) => {
    if (e.target === pasteBtn || pasteBtn.contains(e.target)) {
        return;
    }
    fileInput.click();
});

fileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) handleFile(e.target.files[0]);
});

dropZoneInner.addEventListener('drop', (e) => {
    const files = e.dataTransfer.files;
    if (files.length > 0) handleFile(files[0]);
});

pasteBtn.addEventListener('click', async (e) => {
    e.stopPropagation();
    try {
        const text = await navigator.clipboard.readText();
        if (text.trim()) {
            currentFileName = 'clipboard_code.txt';
            originalText = text;
            showFullPreview = false;
            showPreview();
            showControls();
            hideError();
        } else {
            showError('Буфер обмена пуст или не содержит текст.');
        }
    } catch (err) {
        showError('Не удалось получить доступ к буферу обмена.');
    }
});

clearPreviewBtn.addEventListener('click', clearPreview);

showFullBtn.addEventListener('click', () => {
    showFullPreview = true;
    showPreview();
});

document.querySelectorAll('.seg-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.seg-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        CONFIG.currentLevel = btn.dataset.level;
    });
});

processBtn.addEventListener('click', () => {
    if (!originalText) return;
    processCode(originalText, CONFIG.currentLevel);
});

document.getElementById('copyBtn').addEventListener('click', () => {
    navigator.clipboard.writeText(cleanedText).then(() => {
        const btn = document.getElementById('copyBtn');
        const originalHTML = btn.innerHTML;
        btn.innerHTML = `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Скопировано!`;
        setTimeout(() => { btn.innerHTML = originalHTML; }, 2000);
    });
});

document.getElementById('downloadBtn').addEventListener('click', () => {
    const blob = new Blob([cleanedText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = currentFileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});

initTheme();