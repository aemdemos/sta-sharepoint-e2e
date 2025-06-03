/* global WebImporter */
export default function parse(element, { document }) {
  // Correct header row
  const headerRow = ['Columns (columns3)'];

  // Extracting columns content
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Safely handling first content block
  const firstContentBlock = columns[0];
  const columnText = firstContentBlock?.querySelector('p') || null;
  const list = firstContentBlock?.querySelector('ul') || null;
  const button = firstContentBlock?.querySelector('a.button') || null;

  // Safely handling first image block
  const firstImageBlock = columns[1]?.querySelector('img') || null;

  // Safely handling second content block
  const secondContentBlock = columns[2];
  const secondImage = secondContentBlock?.querySelector('img') || null;
  const secondText = secondContentBlock?.querySelector('p') || null;
  const secondButton = secondContentBlock?.querySelector('a.button.secondary') || null;

  // Constructing cells for table without placeholder text
  const cells = [
    headerRow,
    [
      [columnText, list, button].filter(Boolean),
      firstImageBlock,
    ],
    [
      secondImage,
      [secondText, secondButton].filter(Boolean),
    ],
  ];

  // Create table and replace element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}