/* global WebImporter */
export default function parse(element, { document }) {
  // Find the .hero-wrapper inside the section
  const heroWrapper = element.querySelector('.hero-wrapper');
  // Then find the .hero.block within the wrapper
  const heroBlock = heroWrapper ? heroWrapper.querySelector('.hero.block') : null;
  // The content is usually inside .hero.block > div > div
  let contentDiv = null;
  if (heroBlock) {
    const innerDiv = heroBlock.querySelector('div');
    if (innerDiv) {
      contentDiv = innerDiv.querySelector('div') || innerDiv;
    } else {
      contentDiv = heroBlock;
    }
  } else {
    contentDiv = element;
  }

  // Get the picture element if present
  const picture = contentDiv.querySelector('picture');
  
  // Collect all elements that are NOT the picture (headings, paragraphs, etc)
  const textNodes = [];
  Array.from(contentDiv.children).forEach((child) => {
    // Don't include the <p> that wraps the <picture>, or the <picture> directly
    if (
      child.tagName.toLowerCase() === 'picture' ||
      (child.querySelector && child.querySelector('picture'))
    ) {
      return;
    }
    // If the <p> wrapping <picture> also has no content, skip
    if (child.tagName.toLowerCase() === 'p' && child.children.length === 0 && child.textContent.trim() === '') {
      return;
    }
    textNodes.push(child);
  });

  // If no textNodes found, but there are text elements inside the contentDiv, add them
  if (textNodes.length === 0) {
    const extras = Array.from(contentDiv.querySelectorAll('h1, h2, h3, h4, h5, h6, p')).filter(e => !e.querySelector('picture'));
    if (extras.length) textNodes.push(...extras);
  }

  // Compose table rows
  const cells = [
    ['Hero'],
    [picture ? picture : ''],
    [textNodes.length === 1 ? textNodes[0] : textNodes]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
