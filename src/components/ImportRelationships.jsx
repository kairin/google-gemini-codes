import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Visualizes import relationships for pages/components using file-relationships.json
export default function ImportRelationships({ pageFiles }) {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch('/src/data/file-relationships.json')
      .then(res => res.json())
      .then(setData);
  }, []);
  if (!data) return <div>Loading import relationships…</div>;
  function renderTree(file, seen = new Set()) {
    if (seen.has(file)) return null;
    seen.add(file);
    const rel = data[file] || {};
    return (
      <li>
        <span className="font-mono text-blue-800">{file}</span>
        {(rel.imports && rel.imports.length > 0) && (
          <ul className="ml-4 border-l border-gray-200 pl-2">
            {rel.imports.map((imp, i) => (
              <React.Fragment key={imp + i}>
                {renderTree(imp.replace(/^@\//, ''), seen)}
              </React.Fragment>
            ))}
          </ul>
        )}
      </li>
    );
  }
  return (
    <div className="my-8">
      <h2 className="text-xl font-bold mb-4">Page → Component Import Relationships</h2>
      <ul className="space-y-2">
        {pageFiles.map(f => renderTree(f))}
      </ul>
      <p className="text-xs text-gray-500 mt-4">(Shows direct and indirect imports for each page, based on file-relationships.json)</p>
    </div>
  );
}

ImportRelationships.propTypes = {
  pageFiles: PropTypes.arrayOf(PropTypes.string).isRequired,
};
