/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: get direct child divs (for robustness)
  const topDivs = Array.from(element.querySelectorAll(':scope > div'));
  // Find the hero-wrapper
  let heroWrapper = topDivs.find(div => div.classList.contains('hero-wrapper'));
  if (!heroWrapper) return;

  // Find the .hero.block inside heroWrapper
  let heroBlock = heroWrapper.querySelector('.hero.block');
  if (!heroBlock) return;

  // The inner content is in a div structure: .hero.block > div > div
  // Let's find that
  let innerContainer = heroBlock.querySelector('div > div');
  if (!innerContainer) {
    // fallback: just take heroBlock itself
    innerContainer = heroBlock;
  }

  // The picture (background image) is usually the first element inside innerContainer
  let picture = innerContainer.querySelector('picture');
  let imageCell = '';
  if (picture) {
    // Reference the picture node directly (do not clone)
    imageCell = picture;
  }

  // Now, content (heading, paragraph, etc.) is after the image
  // We'll collect all siblings after <picture>'s parent (should be inside a <p> possibly)
  let contentCell = [];
  let imageParent = picture ? picture.parentElement : null;
  if (imageParent && innerContainer.contains(imageParent)) {
    let node = imageParent.nextElementSibling;
    while (node) {
      // Only add it if it has visible text or is a heading/paragraph
      if (
        node.tagName.match(/^H[1-6]$/) ||
        node.tagName === 'P' ||
        node.textContent.trim() !== ''
      ) {
        contentCell.push(node);
      }
      node = node.nextElementSibling;
    }
  } else {
    // fallback: collect all h1-h6 and p inside innerContainer, skip ones containing <picture>
    contentCell = Array.from(innerContainer.children).filter(el => {
      if (el.querySelector && el.querySelector('picture')) return false;
      if (el.tagName.match(/^H[1-6]$/) || el.tagName === 'P') return true;
      return false;
    });
  }
  // If nothing found, ensure one empty string
  if (!contentCell.length) {
    contentCell = [''];
  }

  // Build the table: 1 column, 3 rows
  const cells = [
    ['Hero'],
    [imageCell],
    [contentCell]
  ];

  // Create the table and replace the original section
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
