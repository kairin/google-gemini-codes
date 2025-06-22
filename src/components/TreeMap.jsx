import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

function TreeNode({ node, depth = 0, relPath, relationships, highlightSet, onHover, onLeave, nodeRefs }) {
  const [expanded, setExpanded] = useState(depth < 1);
  const ref = useRef(null);
  if (!node) return null;
  if (Array.isArray(node)) return node.map((n, i) => (
    <TreeNode node={n} key={i} depth={depth} relPath={relPath} relationships={relationships} highlightSet={highlightSet} onHover={onHover} onLeave={onLeave} nodeRefs={nodeRefs} />
  ));
  const isDir = node.type === 'directory' || node.contents || node.children;
  const children = node.contents || node.children || [];
  const thisPath = relPath ? `${relPath}/${node.name}` : node.name;
  const isHighlighted = highlightSet && highlightSet.has(thisPath);
  // Register ref for this file node
  useEffect(() => {
    if (!isDir && nodeRefs && ref.current) {
      nodeRefs.current[thisPath] = ref.current;
    }
  }, [isDir, nodeRefs, thisPath]);
  return (
    <li className={`relative flex items-center group ${isHighlighted ? 'bg-yellow-100/80' : ''} rounded transition-colors duration-150`} style={{ marginLeft: depth * 16 }}>
      <span
        ref={!isDir ? ref : undefined}
        className={`px-1 py-0.5 rounded cursor-pointer select-none transition-colors duration-150 ${isDir ? 'font-bold text-blue-700 group-hover:bg-blue-50' : 'font-mono text-gray-800 group-hover:bg-gray-100'} ${isHighlighted ? 'ring-2 ring-yellow-300' : ''}`}
        style={{
          position: 'relative',
          zIndex: 2,
        }}
        onClick={() => isDir && setExpanded(e => !e)}
        onMouseEnter={() => !isDir && onHover && onHover(thisPath)}
        onMouseLeave={() => !isDir && onLeave && onLeave()}
        title={isDir ? (expanded ? 'Collapse' : 'Expand') : thisPath}
        tabIndex={0}
        onKeyDown={e => { if (isDir && (e.key === 'Enter' || e.key === ' ')) setExpanded(v => !v); }}
        aria-expanded={isDir ? expanded : undefined}
        aria-label={thisPath}
      >
        {isDir ? (expanded ? '📂' : '📁') : '📄'} {node.name || node.type}
      </span>
      {isDir && expanded && children.length > 0 && (
        <ul className="list-none pl-2 border-l border-gray-200 ml-2">
          {children.map((child, i) => (
            <TreeNode
              node={child}
              key={i}
              depth={depth + 1}
              relPath={thisPath}
              relationships={relationships}
              highlightSet={highlightSet}
              onHover={onHover}
              onLeave={onLeave}
              nodeRefs={nodeRefs}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

TreeNode.propTypes = {
  node: PropTypes.any,
  depth: PropTypes.number,
  relPath: PropTypes.string,
  relationships: PropTypes.object,
  highlightSet: PropTypes.instanceOf(Set),
  onHover: PropTypes.func,
  onLeave: PropTypes.func,
};

export default function TreeMap() {
  const [tree, setTree] = useState(null);
  const [relationships, setRelationships] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [highlightSet, setHighlightSet] = useState(null);
  const nodeRefs = useRef({});
  const [activeFile, setActiveFile] = useState(null);

  useEffect(() => {
    const base = import.meta.env.BASE_URL || '/';
    const treePath = `${base}src/data/site-tree.json`;
    const relPath = `${base}src/data/file-relationships.json`;
    Promise.all([
      fetch(treePath).then(res => { if (!res.ok) throw new Error('Failed to fetch site-tree.json'); return res.json(); }),
      fetch(relPath).then(res => { if (!res.ok) throw new Error('Failed to fetch file-relationships.json'); return res.json(); })
    ])
      .then(([treeData, relData]) => {
        setTree(treeData);
        setRelationships(relData);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  function handleHover(filePath) {
    if (!relationships) return;
    setActiveFile(filePath);
    // Highlight all files this file imports/links to
    const rel = relationships[filePath.replace(/^src\//, '')] || relationships[filePath] || {};
    const highlight = new Set();
    if (rel.imports) rel.imports.forEach(i => highlight.add(i.replace(/^@\//, '')));
    if (rel.links) rel.links.forEach(l => highlight.add(l.replace(/^@\//, '')));
    // Also highlight the hovered file itself
    highlight.add(filePath.replace(/^src\//, ''));
    setHighlightSet(highlight);
  }
  function handleLeave() {
    setHighlightSet(null);
    setActiveFile(null);
  }

  if (loading) return <div>Loading site tree…</div>;
  if (error) return (
    <div className="text-red-600 bg-red-50 border border-red-200 p-4 rounded">
      <b>Error loading site tree or relationships:</b> {error}
      <div className="mt-2 text-sm text-gray-700">
        <ul className="list-disc ml-4">
          <li>Check that <code>src/data/site-tree.json</code> and <code>src/data/file-relationships.json</code> exist and are valid JSON.</li>
          <li>Try running the content/index generator scripts again.</li>
          <li>See <code>README.md</code> or <code>DOCUMENTATION.md</code> for troubleshooting.</li>
        </ul>
      </div>
    </div>
  );
  if (!tree) return <div>No tree data. Please check your content index scripts.</div>;
  const dirs = Object.keys(tree);
  // SVG relationship lines
  function RelationshipSVG() {
    if (!activeFile || !relationships) return null;
    const rel = relationships[activeFile.replace(/^src\//, '')] || relationships[activeFile] || {};
    const targets = [...(rel.imports || []), ...(rel.links || [])];
    const fromEl = nodeRefs.current[activeFile];
    if (!fromEl) return null;
    const svgLines = [];
    const fromRect = fromEl.getBoundingClientRect();
    const containerRect = fromEl.closest('.tree-map-container').getBoundingClientRect();
    const fromX = fromRect.left + fromRect.width;
    const fromY = fromRect.top + fromRect.height / 2;
    targets.forEach((target, i) => {
      const toEl = nodeRefs.current[target.replace(/^@\//, '')];
      if (!toEl) return;
      const toRect = toEl.getBoundingClientRect();
      const toX = toRect.left;
      const toY = toRect.top + toRect.height / 2;
      svgLines.push(
        <line
          key={i}
          x1={fromX - containerRect.left}
          y1={fromY - containerRect.top}
          x2={toX - containerRect.left}
          y2={toY - containerRect.top}
          stroke="#b04ae0"
          strokeWidth={2}
          markerEnd="url(#arrowhead)"
        />
      );
    });
    return (
      <svg
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      >
        <defs>
          <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
            <polygon points="0 0, 8 3, 0 6" fill="#b04ae0" />
          </marker>
        </defs>
        {svgLines}
      </svg>
    );
  }
  return (
    <div className="tree-map-container p-4 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 relative overflow-x-auto">
      <RelationshipSVG />
      <h2 className="text-2xl font-extrabold mb-6 text-blue-900 dark:text-blue-200 tracking-tight">Site File Tree & Relationships</h2>
      <div className="space-y-8">
        {dirs.map(dir => (
          <div className="mb-6" key={dir}>
            <h3 className="text-lg font-semibold mb-2 text-blue-700 dark:text-blue-300">{dir}/</h3>
            <ul className="tree-list space-y-1">
              <TreeNode
                node={tree[dir]}
                relPath={dir}
                relationships={relationships}
                highlightSet={highlightSet}
                onHover={handleHover}
                onLeave={handleLeave}
                nodeRefs={nodeRefs}
              />
            </ul>
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-500 mt-6">(Hover files to highlight and draw arrows to their imports/links. Folders are blue, files are gray. Keyboard accessible.)</p>
    </div>
  );
}

TreeMap.propTypes = {
  tree: PropTypes.object.isRequired,
};
