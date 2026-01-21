// GitHub Alert Markdown Parser
// This script converts GitHub-style alerts (>[!TYPE]) to styled HTML

document.addEventListener('DOMContentLoaded', function() {
  // Alert pattern regex - matches [!NOTE], [!TIP], [!IMPORTANT], [!WARNING], [!CAUTION]
  const ALERT_PATTERN = /^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]/i;
  
  // Find all blockquotes
  const blockquotes = document.querySelectorAll('blockquote');
  
  blockquotes.forEach(function(blockquote) {
    const firstChild = blockquote.firstElementChild;
    if (!firstChild) return;
    
    const text = firstChild.textContent;
    
    // Check for alert patterns like [!IMPORTANT], [!NOTE], etc.
    const alertMatch = text.match(ALERT_PATTERN);
    
    if (alertMatch) {
      const alertType = alertMatch[1].toLowerCase();
      
      // Add alert classes
      blockquote.classList.add('markdown-alert', `markdown-alert-${alertType}`);
      
      // Create title element
      const titleText = alertType.charAt(0).toUpperCase() + alertType.slice(1);
      const title = document.createElement('p');
      title.className = 'markdown-alert-title';
      title.textContent = titleText;
      
      // Remove the [!TYPE] marker from the first paragraph
      firstChild.textContent = text.replace(ALERT_PATTERN, '').replace(/^\s+/, '');
      
      // Insert title at the beginning
      blockquote.insertBefore(title, blockquote.firstChild);
    }
  });
});
