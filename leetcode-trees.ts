class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

// 100. Same Tree
function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
  if (p === null && q === null) return true;

  if (p === null || q === null) return false;

  if (p.val !== q.val) return false;

  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}

// 543. Diameter of Binary Tree
function diameterOfBinaryTree(root: TreeNode | null): number {
  let best = 0;
  function height(node: TreeNode | null): number {
    if (node === null) return 0;

    const lh = height(node.left);
    const rh = height(node.right);

    best = Math.max(best, lh + rh);

    return 1 + Math.max(lh, rh);
  }

  height(root);
  return best;
}
