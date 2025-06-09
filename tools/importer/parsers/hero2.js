/* global WebImporter */
export default function parse(element, { document }) {
  // Find the hero block (structure assumption as described)
  let heroContent = element.querySelector('.hero.block');
  if (!heroContent) heroContent = element; // fallback in case structure varies
  
  // Find the innermost content wrapper: usually two nested divs inside .hero.block
  let inner = heroContent.querySelector('div > div') || heroContent.querySelector('div') || heroContent;

  // Find the hero image (picture tag inside a p)
  let picture = inner.querySelector('picture');
  let imgRow;
  if (picture) {
    imgRow = [picture];
  } else {
    imgRow = [''];
  }

  // Gather content nodes for the third row:
  // All headings and non-empty paragraphs except the paragraph containing the picture
  let contentNodes = [];
  const childNodes = Array.from(inner.childNodes);
  childNodes.forEach(node => {
    if (node.nodeType === 1) {
      // skip the <p> containing the <picture>
      if (node.tagName.toLowerCase() === 'p' && node.querySelector('picture')) return;
      // skip empty paragraphs
      if (node.tagName.toLowerCase() === 'p' && node.innerHTML.trim() === '') return;
      // include headings and non-empty paragraphs
      if (/^h[1-6]$/.test(node.tagName.toLowerCase()) || node.tagName.toLowerCase() === 'p') {
        contentNodes.push(node);
      }
    }
  });
  let contentRow = contentNodes.length > 0 ? [contentNodes] : [''];

  // Table header row must exactly match the example: 'Hero'
  const cells = [
    ['Hero'],
    imgRow,
    contentRow,
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
