/* global WebImporter */
export default function parse(element, { document }) {
  // Get the main columns block (the first child of columns-wrapper)
  const columnsBlock = element.querySelector(':scope > .columns.block');
  if (!columnsBlock) return;

  // Get the two main rows (each is a direct child <div> of columns.block)
  const rowDivs = Array.from(columnsBlock.children).filter(div => div.tagName === 'DIV');
  if (rowDivs.length !== 2) return;

  // --- First visual row ---
  // Left cell: text, list, button
  const row1Left = rowDivs[0].children[0];
  // Right cell: image
  const row1Right = rowDivs[0].children[1];

  // --- Second visual row ---
  // Left cell: image
  const row2Left = rowDivs[1].children[0];
  // Right cell: text, button
  const row2Right = rowDivs[1].children[1];

  // Defensive: ensure all cells exist
  if (!row1Left || !row1Right || !row2Left || !row2Right) return;

  // Helper: gather all child nodes as array (not just elements)
  const getCellContent = (node) => Array.from(node.childNodes);

  // For image cells, reference the <picture> or <img> element directly
  const getImageCell = (node) => {
    const pic = node.querySelector('picture,img');
    return pic || node;
  };

  // Compose table rows
  const headerRow = ['Columns (columns3)'];
  const row1 = [getCellContent(row1Left), getImageCell(row1Right)];
  const row2 = [getImageCell(row2Left), getCellContent(row2Right)];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    row1,
    row2,
  ], document);

  element.replaceWith(table);
}
