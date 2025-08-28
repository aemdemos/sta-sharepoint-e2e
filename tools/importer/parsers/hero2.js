/* global WebImporter */
export default function parse(element, { document }) {
  // Find the inner content area
  let heroBlock = element.querySelector('.hero.block');
  if (!heroBlock) heroBlock = element;

  // The actual hero content is within heroBlock > div > div
  let innerContent = heroBlock.querySelector('div > div');
  if (!innerContent) innerContent = heroBlock;

  // Find <picture> with image
  let picture = innerContent.querySelector('picture');
  // Find main heading
  let heading = innerContent.querySelector('h1, h2, h3, h4, h5, h6');

  // Find all <p> except the one containing the <picture>
  const allParagraphs = Array.from(innerContent.querySelectorAll('p'));
  let textParagraphs = allParagraphs.filter(p => !p.contains(picture) && p.textContent.trim());

  // Compose text cell for row 3: heading, then non-image paragraphs
  const textCellElements = [];
  if (heading) textCellElements.push(heading);
  textParagraphs.forEach(p => textCellElements.push(p));

  const headerRow = ['Hero (hero2)'];
  const imageRow = [picture ? picture : ''];
  const textRow = [textCellElements.length ? textCellElements : ''];

  const table = WebImporter.DOMUtils.createTable([headerRow, imageRow, textRow], document);
  element.replaceWith(table);
}