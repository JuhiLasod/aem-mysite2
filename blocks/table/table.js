async function createTable(jsonURL) {
  const resp = await fetch(jsonURL);
  if (!resp.ok) return null;
  const json = await resp.json();

  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');

  // Create Headers from the first row of data
  const keys = Object.keys(json.data[0]);
  const headerRow = document.createElement('tr');
  keys.forEach((key) => {
    const th = document.createElement('th');
    th.textContent = key;
    headerRow.append(th);
  });
  thead.append(headerRow);

  // Create Rows
  json.data.forEach((row) => {
    const tr = document.createElement('tr');
    keys.forEach((key) => {
      const td = document.createElement('td');
      td.textContent = row[key];
      tr.append(td);
    });
    tbody.append(tr);
  });

  table.append(thead, tbody);
  return table;
}

export default async function decorate(block) {
  const link = block.querySelector('a');
  if (link && link.href.endsWith('.json')) {
    const tableElement = await createTable(link.href);
    if (tableElement) {
      block.replaceChildren(tableElement);
    }
  }
}
