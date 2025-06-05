/* global WebImporter */
export default function parse(element, { document }) {
  // Step into the content root
  let blockContent = element;
  const heroWrapper = element.querySelector(':scope > .hero-wrapper');
  if (heroWrapper) blockContent = heroWrapper;
  const heroBlock = blockContent.querySelector(':scope > .hero.block');
  if (heroBlock) blockContent = heroBlock;
  let contentDiv = blockContent.querySelector(':scope > div');
  if (contentDiv && contentDiv.children.length === 1 && contentDiv.firstElementChild.tagName === 'DIV') {
    contentDiv = contentDiv.firstElementChild;
  }
  if (contentDiv) blockContent = contentDiv;

  // Find the picture paragraph (image row)
  let imageRow = '';
  const picture = blockContent.querySelector('p > picture');
  if (picture && picture.parentElement.tagName === 'P') {
    imageRow = picture.parentElement;
  }

  // Find heading(s), and any additional content (for the third row)
  const contentCell = [];
  // Heading (if present)
  const heading = blockContent.querySelector('h1, h2, h3, h4, h5, h6');
  if (heading) contentCell.push(heading);
  // Any additional content after the heading
  let foundHeading = false;
  for (const child of blockContent.children) {
    if (child === heading) {
      foundHeading = true;
      continue;
    }
    if (foundHeading) {
      if (!(child.tagName === 'P' && child.textContent.trim() === '')) {
        contentCell.push(child);
      }
    }
  }

  // If no heading and no extra content, leave the content cell empty
  const contentRow = contentCell.length > 0 ? contentCell : '';

  // Build rows exactly as in the example: header, image, content
  const rows = [];
  rows.push(['Hero']);
  rows.push([imageRow ? imageRow : '']);
  rows.push([contentRow]);
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
