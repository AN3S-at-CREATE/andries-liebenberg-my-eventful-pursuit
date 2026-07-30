#!/usr/bin/env bash
# Deletes all branches that were consolidated into main via PR #313.
# Run this from a local clone of AN3S-at-CREATE/andries-liebenberg-my-eventful-pursuit
# with push/delete rights (or push access via a PAT with `repo` scope).
#
# Usage:
#   ./delete-old-branches.sh            # dry run - just prints what would be deleted
#   ./delete-old-branches.sh --yes      # actually deletes
#
# Branch list source: branches-to-delete.txt (258 branches - the 26 cherry-picked
# "winners" now merged into main, 32 stale/no-op branches, and 200 duplicate/superseded
# branches). main itself and the already-deleted PR branch
# claude/consolidate-main-branches-o9wbbx are not included.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BRANCH_LIST="$SCRIPT_DIR/branches-to-delete.txt"
REMOTE="${REMOTE:-origin}"
BATCH_SIZE=40

if [[ ! -f "$BRANCH_LIST" ]]; then
  echo "Error: $BRANCH_LIST not found (expected alongside this script)." >&2
  exit 1
fi

DRY_RUN=1
if [[ "${1:-}" == "--yes" ]]; then
  DRY_RUN=0
fi

mapfile -t ALL_BRANCHES < "$BRANCH_LIST"
echo "Loaded ${#ALL_BRANCHES[@]} branches to delete from $REMOTE."

if [[ "$DRY_RUN" -eq 1 ]]; then
  echo
  echo "DRY RUN — no branches will be deleted. Re-run with --yes to actually delete."
  echo "First 10 branches that would be deleted:"
  printf '  %s\n' "${ALL_BRANCHES[@]:0:10}"
  echo "  ... and $(( ${#ALL_BRANCHES[@]} - 10 )) more"
  exit 0
fi

total=${#ALL_BRANCHES[@]}
i=0
while [[ $i -lt $total ]]; do
  batch=("${ALL_BRANCHES[@]:i:BATCH_SIZE}")
  refspecs=()
  for b in "${batch[@]}"; do
    refspecs+=(":refs/heads/$b")
  done
  echo "Deleting batch $((i / BATCH_SIZE + 1)) (${#batch[@]} branches)..."
  git push "$REMOTE" "${refspecs[@]}"
  i=$(( i + BATCH_SIZE ))
done

echo "Done. Deleted $total branches from $REMOTE."
