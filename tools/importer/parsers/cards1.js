/* global WebImporter */
export default function parse(element, { document }) {
  // Define the block name
  const blockName = 'Cards';

  // Initialize rows with the header row containing the block name
  const rows = [
    [blockName],
  ];

  // Extract all cards dynamically from the HTML
  const cards = element.querySelectorAll('.header-wrapper nav li.nav-drop');

  cards.forEach((card) => {
    const title = card.querySelector('a')?.textContent || '';
    const description = [...card.querySelectorAll('ul li a')].map((link) => link.textContent).join(', ');

    rows.push([
      title,
      description,
    ]);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the generated table
  element.replaceWith(table);
}