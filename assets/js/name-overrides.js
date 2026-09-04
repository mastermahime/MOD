(() => {
  const FROM = 'Strategic Sword';
  const TO = 'Strategies Sword';

  const replaceText = (value) => typeof value === 'string' ? value.split(FROM).join(TO) : value;

  const updateSearch = () => {
    if (!Array.isArray(window.WIKI_SEARCH)) return;
    window.WIKI_SEARCH.forEach(item => {
      if (!item) return;
      if (typeof item.title === 'string') item.title = replaceText(item.title);
      if (typeof item.desc === 'string') item.desc = replaceText(item.desc);
    });
  };

  const processElement = (el) => {
    if (!el || el.nodeType !== 1) return;
    ['title','aria-label','alt'].forEach(attr => {
      if (el.hasAttribute?.(attr)) el.setAttribute(attr, replaceText(el.getAttribute(attr)));
    });
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node => {
      if (node.nodeValue && node.nodeValue.includes(FROM)) node.nodeValue = replaceText(node.nodeValue);
    });
  };

  const run = () => {
    document.title = replaceText(document.title);
    updateSearch();
    processElement(document.body);
  };

  const start = () => {
    run();
    const observer = new MutationObserver(records => {
      updateSearch();
      records.forEach(record => {
        if (record.type === 'characterData' && record.target?.nodeValue?.includes(FROM)) {
          record.target.nodeValue = replaceText(record.target.nodeValue);
          return;
        }
        record.addedNodes.forEach(node => {
          if (node.nodeType === 3 && node.nodeValue?.includes(FROM)) node.nodeValue = replaceText(node.nodeValue);
          else if (node.nodeType === 1) processElement(node);
        });
      });
    });
    observer.observe(document.documentElement, { childList: true, subtree: true, characterData: true });
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})();