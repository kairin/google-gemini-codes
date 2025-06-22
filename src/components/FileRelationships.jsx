import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';

// Load the relationships JSON at runtime
async function fetchRelationships() {
  const res = await fetch('/src/data/file-relationships.json');
  return res.json();
}

export default function FileRelationships() {
  const [data, setData] = useState(null);
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState({});

  React.useEffect(() => {
    fetchRelationships().then(setData);
  }, []);

  const files = useMemo(() => {
    if (!data) return [];
    return Object.keys(data).sort();
  }, [data]);

  const filteredFiles = useMemo(() => {
    if (!search) return files;
    return files.filter(f => f.toLowerCase().includes(search.toLowerCase()));
  }, [files, search]);

  function toggle(file) {
    setExpanded(e => ({ ...e, [file]: !e[file] }));
  }

  function renderLinks(file) {
    if (!data[file]) return null;
    const { imports, links } = data[file];
    return (
      <ul className="ml-4">
        {imports.length === 0 && links.length === 0 && (
          <li className="text-gray-500">No imports or links</li>
        )}
        {imports.map((imp, idx) => (
          <li key={`imp-${idx}`} className="text-green-700">
            <b>import:</b> <span className="font-mono">{imp}</span>
          </li>
        ))}
        {links.map((l, idx) => (
          <li key={`link-${idx}`} className="text-purple-700">
            <b>link:</b> <span className="font-mono">{l}</span>
          </li>
        ))}
      </ul>
    );
  }

  if (!data) return <div>Loading file relationships…</div>;

  return (
    <div className="my-8">
      <input
        type="text"
        placeholder="Search files…"
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="border px-2 py-1 mb-4 w-full max-w-md"
      />
      <ul>
        {filteredFiles.map(file => (
          <li key={file} className="mb-4">
            <button
              className="font-mono text-blue-700 cursor-pointer underline"
              onClick={() => toggle(file)}
              aria-expanded={!!expanded[file]}
            >
              {file}
            </button>
            {expanded[file] && renderLinks(file)}
          </li>
        ))}
      </ul>
    </div>
  );
}

FileRelationships.propTypes = {
  // No props
};
