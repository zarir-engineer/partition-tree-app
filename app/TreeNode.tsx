// TreeNode.tsx
const TreeNode = ({ node, updateValue, addSubNode }: any) => {
  return (
    <div style={{ marginLeft: "20px", borderLeft: "1px solid #ccc", paddingLeft: "10px" }}>
      <input
        type="number"
        className="form-control d-inline w-25"
        value={Math.round(node.value)}
        onChange={(e) => updateValue(node, parseFloat(e.target.value))}
        step="1"
      />
      {node !== node.children && (
        <div className="mt-2">
          <button className="btn btn-success mx-1" onClick={() => addSubNode(node)} disabled={node.children && node.children.length >= 2}>
            ➕ Add Sub-Node
          </button>
          {node.children?.map((child: any, index: number) => (
            <TreeNode key={index} node={child} updateValue={updateValue} addSubNode={addSubNode} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TreeNode;
