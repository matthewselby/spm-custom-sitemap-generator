let urls = [];

function normalizeUrl(input) {
    // Remove any existing protocol
    let cleanUrl = input.replace(/^https?:\/\//, '');

    // Remove any leading slashes
    cleanUrl = cleanUrl.replace(/^\/+/, '');

    return {
        protocol: 'https://',
        path: cleanUrl
    };
}

function isValidUrlPath(path) {
    // Basic validation for the path part (without protocol)
    if (!path || path.trim() === '') return false;

    // Check if it looks like a valid domain/path
    const urlPattern = /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*(\/.*)*/;
    return urlPattern.test(path);
}

function getFullUrl(urlObj) {
    return urlObj.protocol + urlObj.path;
}

function showMessage(message, type) {
    const container = document.getElementById('messageContainer');
    const messageClass = type === 'error' ? 'error-message' : 'success-message';
    container.innerHTML = `<div class="message ${messageClass}">${message}</div>`;

    setTimeout(() => {
        container.innerHTML = '';
    }, type === 'error' ? 5000 : 3000);
}

function addUrl() {
    const input = document.getElementById('urlInput');
    const inputValue = input.value.trim();

    if (!inputValue) {
        showMessage('Please enter a URL', 'error');
        return;
    }

    const urlObj = normalizeUrl(inputValue);

    if (!isValidUrlPath(urlObj.path)) {
        showMessage('Please enter a valid URL (e.g., example.com or example.com/page)', 'error');
        return;
    }

    const fullUrl = getFullUrl(urlObj);
    const existingUrl = urls.find(u => getFullUrl(u) === fullUrl);
    if (existingUrl) {
        showMessage('This URL has already been added', 'error');
        return;
    }

    if (urls.length >= 50000) {
        showMessage('Maximum of 50,000 URLs allowed per sitemap', 'error');
        return;
    }

    urls.push(urlObj);
    input.value = '';
    updateDisplay();
}

function removeUrl(index) {
    urls.splice(index, 1);
    updateDisplay();
}

function updateProtocol(index, newProtocol) {
    if (urls[index]) {
        urls[index].protocol = newProtocol;
        updateDisplay();
    }
}

function updateDisplay() {
    // Update URL count
    document.getElementById('urlCount').textContent = urls.length;

    // Update sitemap size estimate
    const sitemapXml = generateSitemapXml();
    const sizeInBytes = new Blob([sitemapXml]).size;
    const sizeInKB = (sizeInBytes / 1024).toFixed(1);
    document.getElementById('sitemapSize').textContent = sizeInKB + ' KB';

    // Update SPM coverage estimate
    const maxSpmTests = 20; // SPM tests up to 20 URLs
    const coveragePercent = urls.length === 0 ? 0 : Math.min(100, Math.round((Math.min(urls.length, maxSpmTests) / Math.max(urls.length, maxSpmTests)) * 100));
    document.getElementById('spmCoverage').textContent = coveragePercent + '%';

    // Update URL list
    const urlListDiv = document.getElementById('urlList');
    if (urls.length === 0) {
        urlListDiv.innerHTML = '';
    } else {
        urlListDiv.innerHTML = urls.map((urlObj, index) => `
            <div class="url-item">
                <div class="url-content">
                    <select class="protocol-select" onchange="updateProtocol(${index}, this.value)">
                        <option value="https://" ${urlObj.protocol === 'https://' ? 'selected' : ''}>https://</option>
                        <option value="http://" ${urlObj.protocol === 'http://' ? 'selected' : ''}>http://</option>
                    </select>
                    <span class="url-text">${urlObj.path}</span>
                </div>
                <button onclick="removeUrl(${index})" class="btn btn-danger">Remove</button>
            </div>
        `).join('');
    }

    // Update button states
    const hasUrls = urls.length > 0;
    document.getElementById('generateBtn').disabled = !hasUrls;
    document.getElementById('clearBtn').disabled = !hasUrls;
}

function escapeXml(text) {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}

function generateSitemapXml() {
    const currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format

    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    urls.forEach(urlObj => {
        const fullUrl = getFullUrl(urlObj);
        xml += '  <url>\n';
        xml += `    <loc>${escapeXml(fullUrl)}</loc>\n`;
        xml += `    <lastmod>${currentDate}</lastmod>\n`;
        xml += '  </url>\n';
    });

    xml += '</urlset>';
    return xml;
}

function generateSitemap() {
    if (urls.length === 0) {
        showMessage('Please add at least one URL before generating the sitemap', 'error');
        return;
    }

    try {
        const sitemapXml = generateSitemapXml();
        const blob = new Blob([sitemapXml], { type: 'application/xml' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'spm-custom-sitemap.xml';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        const urlsMessage = urls.length === 1 ? '1 URL' : `${urls.length} URLs`;
        const coverageNote = urls.length <= 20
            ? 'SPM will test all your URLs plus the homepage.'
            : `SPM will test your homepage plus 19 random URLs from your ${urls.length} total URLs.`;

        showMessage(`Sitemap generated successfully! Downloaded with ${urlsMessage}. ${coverageNote}`, 'success');
    } catch (error) {
        showMessage('Error generating sitemap. Please try again.', 'error');
        console.error('Sitemap generation error:', error);
    }
}

function clearAll() {
    if (urls.length === 0) return;

    if (confirm('Are you sure you want to remove all URLs? This cannot be undone.')) {
        urls = [];
        updateDisplay();
        showMessage('All URLs cleared successfully!', 'success');
    }
}

// Handle Enter key in input field
document.getElementById('urlInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addUrl();
    }
});

// Initialize display
updateDisplay();