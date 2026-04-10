function toggleBibtex(id) {
  var el = document.getElementById('bibtex-' + id);
  if (el.style.display === 'none') {
    el.style.display = 'block';
  } else {
    el.style.display = 'none';
  }
}

function copyToClipboard(id) {
  var text = document.getElementById(id).innerText;
  navigator.clipboard.writeText(text).then(function() {
    alert('BibTeX copied to clipboard!');
  }, function(err) {
    console.error('Could not copy text: ', err);
  });
}

function downloadRIS(data) {
  var authors = data.authors.split(';').map(function(a) {
    return 'AU  - ' + a.trim();
  }).join('\r\n');

  var risContent = [
    'TY  - JOUR',
    'TI  - ' + data.title,
    authors,
    'PY  - ' + data.year,
    'JO  - ' + data.journal,
    data.doi ? 'DO  - ' + data.doi : '',
    'ER  - '
  ].filter(Boolean).join('\r\n');

  var blob = new Blob([risContent], { type: 'application/x-research-info-systems' });
  var url = window.URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.setAttribute('hidden', '');
  a.setAttribute('href', url);
  a.setAttribute('download', data.title.replace(/[^a-z0-9]/gi, '_').toLowerCase() + '.ris');
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
