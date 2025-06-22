import React, { useState } from 'react';
import PropTypes from 'prop-types';

function TreeNode({ node, depth = 0 }) {
  const [expanded, setExpanded] = useState(depth < 1); // Root expanded by default
  if (!node) return null;
  if (Array.isArray(node)) return node.map((n, i) => <TreeNode node={n} key={i} depth={depth} />);
  const isDir = node.type === 'directory' || node.contents || node.children;
  const children = node.contents || node.children || [];
  return (
    <li style={{ marginLeft: depth * 16 }}>
      <span
        style={{ fontWeight: isDir ? 'bold' : 'normal', cursor: isDir ? 'pointer' : 'default' }}
        onClick={() => isDir && setExpanded(e => !e)}
        title={isDir ? (expanded ? 'Collapse' : 'Expand') : node.name}
      >
        {isDir ? (expanded ? '📂' : '📁') : '📄'} {node.name || node.type}
      </span>
      {isDir && expanded && children.length > 0 && (
        <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
          {children.map((child, i) => <TreeNode node={child} key={i} depth={depth + 1} />)}
        </ul>
      )}
    </li>
  );
}

TreeNode.propTypes = {
  node: PropTypes.any,
  depth: PropTypes.number,
};

export default function TreeMap({ tree }) {
  if (!tree) return <div>No tree data.</div>;
  const dirs = Object.keys(tree);
  return (
    <div className="tree-map-container p-4 bg-gray-50 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Site File Tree & Relationships</h2>
      {dirs.map(dir => (
        <div className="mb-6" key={dir}>
          <h3 className="text-lg font-semibold mb-2">{dir}/</h3>
          <ul className="tree-list">
            <TreeNode node={tree[dir]} />
          </ul>
        </div>
      ))}
      <p className="text-xs text-gray-500 mt-4">(Click folders to expand/collapse. More relationship features can be added.)</p>
    </div>
  );
}

TreeMap.propTypes = {
  tree: PropTypes.object.isRequired,
};
