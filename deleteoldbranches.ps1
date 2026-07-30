<#
.SYNOPSIS
  Deletes all branches that were consolidated into main via PR #313.

.DESCRIPTION
  Run this from a local clone of AN3S-at-CREATE/andries-liebenberg-my-eventful-pursuit
  with push/delete rights (or push access via a PAT with `repo` scope).

  Branch list source: branches-to-delete.txt (258 branches - the 26 cherry-picked
  "winners" now merged into main, 32 stale/no-op branches, and 200 duplicate/superseded
  branches). main itself and the already-deleted PR branch
  claude/consolidate-main-branches-o9wbbx are not included.

.PARAMETER Yes
  Actually perform the deletion. Without this switch, the script only prints
  what it would delete (dry run).

.PARAMETER Remote
  Git remote name to delete branches from. Defaults to "origin".

.EXAMPLE
  ./delete-old-branches.ps1
  Dry run - lists what would be deleted.

.EXAMPLE
  ./delete-old-branches.ps1 -Yes
  Actually deletes all 258 branches, in batches of 40.
#>

param(
    [switch]$Yes,
    [string]$Remote = "origin",
    [int]$BatchSize = 40
)

$ErrorActionPreference = "Stop"

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$branchListPath = Join-Path $scriptDir "branches-to-delete.txt"

if (-not (Test-Path $branchListPath)) {
    Write-Error "Error: $branchListPath not found (expected alongside this script)."
    exit 1
}

$allBranches = Get-Content $branchListPath | Where-Object { $_.Trim() -ne "" }
Write-Host "Loaded $($allBranches.Count) branches to delete from $Remote."

if (-not $Yes) {
    Write-Host ""
    Write-Host "DRY RUN — no branches will be deleted. Re-run with -Yes to actually delete."
    Write-Host "First 10 branches that would be deleted:"
    $allBranches | Select-Object -First 10 | ForEach-Object { Write-Host "  $_" }
    $remaining = $allBranches.Count - 10
    if ($remaining -gt 0) {
        Write-Host "  ... and $remaining more"
    }
    exit 0
}

$total = $allBranches.Count
$batchNum = 1
for ($i = 0; $i -lt $total; $i += $BatchSize) {
    $end = [Math]::Min($i + $BatchSize, $total) - 1
    $batch = $allBranches[$i..$end]
    $refspecs = $batch | ForEach-Object { ":refs/heads/$_" }

    Write-Host "Deleting batch $batchNum ($($batch.Count) branches)..."
    & git push $Remote @refspecs
    if ($LASTEXITCODE -ne 0) {
        Write-Error "git push failed for batch $batchNum (exit code $LASTEXITCODE)."
        exit $LASTEXITCODE
    }
    $batchNum++
}

Write-Host "Done. Deleted $total branches from $Remote."
