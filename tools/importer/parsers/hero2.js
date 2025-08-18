/* global WebImporter */
export default function parse(element, { document }) {
  // Step 1: Navigate to the content wrapper
  // The structure: section.hero-container > .hero-wrapper > .hero.block > div > div > [content]
  let contentDiv = element;
  // Traverse down to the innermost content div
  // The HTML is deeply nested: <div> <div> <div> <div> <div> [content] </div> </div> </div> </div> </div>
  for (let i = 0; i < 4; i++) {
    if (contentDiv && contentDiv.firstElementChild && contentDiv.firstElementChild.tagName === 'DIV') {
      contentDiv = contentDiv.firstElementChild;
    }
  }
  // Defensive: check if we need to go one more level
  if (contentDiv && contentDiv.firstElementChild && contentDiv.firstElementChild.tagName === 'DIV') {
    contentDiv = contentDiv.firstElementChild;
  }

  // Step 2: Extract image (from <picture> inside <p>) and text content
  let imageEl = null;
  let textRows = [];
  Array.from(contentDiv.children).forEach(child => {
    // Find the image row
    if (
      child.tagName === 'P' && child.querySelector('picture') && child.querySelector('img')
    ) {
      imageEl = child.querySelector('picture');
    }
    // Gather text rows (headings/subheadings/CTA/paragraphs)
    // Only skip elements that are entirely empty (after removing whitespace)
    if (
      child.tagName.match(/^H[1-6]$/) ||
      (child.tagName === 'P' && child.textContent.trim() !== '')
    ) {
      textRows.push(child);
    }
  });

  // Step 3: Construct table cells according to block guidelines
  // - First row: header ['Hero']
  // - Second row: background image (can be empty)
  // - Third row: title, subheading, CTA, etc. (can be empty)
  const cells = [
    ['Hero'],
    [imageEl ? imageEl : ''],
    [textRows.length > 0 ? textRows : '']
  ];

  // Step 4: Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
