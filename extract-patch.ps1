# extract-patch.ps1 - fixed version
$patchFile = "cloudhop-spectrum.patch"
if (-not (Test-Path $patchFile)) {
  Write-Error "Patch file '$patchFile' not found in current folder."
  exit 1
}

$lines = Get-Content -Path $patchFile -Encoding UTF8

$writing = $false
$currentPath = $null
$buffer = @()
$created = @()

foreach ($line in $lines) {
  # detect "Add File: <path>" anywhere on the line
  if ($line -match 'Add File:\s*(.+)$') {
    # flush previous file if any
    if ($writing -and $currentPath) {
      $content = $buffer | ForEach-Object {
        if ($_ -like '+*') { $_.Substring(1) } else { $_ }
      }
      $dir = Split-Path $currentPath -Parent
      if ($dir -and -not (Test-Path $dir)) { New-Item -ItemType Directory -Force -Path $dir | Out-Null }
      $content -join "`r`n" | Set-Content -Path $currentPath -Encoding UTF8
      $created += $currentPath
    }

    $currentPath = $matches[1].Trim()
    $buffer = @()
    $writing = $true
    continue
  }

  if ($writing) {
    # consider a line containing "End Patch" to close the file block
    if ($line -match 'End Patch') {
      if ($currentPath) {
        $content = $buffer | ForEach-Object {
          if ($_ -like '+*') { $_.Substring(1) } else { $_ }
        }
        $dir = Split-Path $currentPath -Parent
        if ($dir -and -not (Test-Path $dir)) { New-Item -ItemType Directory -Force -Path $dir | Out-Null }
        $content -join "`r`n" | Set-Content -Path $currentPath -Encoding UTF8
        $created += $currentPath
      }
      # reset
      $writing = $false
      $currentPath = $null
      $buffer = @()
      continue
    } else {
      $buffer += $line
    }
  }
}

# flush if file ended without explicit End Patch
if ($writing -and $currentPath -and $buffer.Count -gt 0) {
  $content = $buffer | ForEach-Object {
    if ($_ -like '+*') { $_.Substring(1) } else { $_ }
  }
  $dir = Split-Path $currentPath -Parent
  if ($dir -and -not (Test-Path $dir)) { New-Item -ItemType Directory -Force -Path $dir | Out-Null }
  $content -join "`r`n" | Set-Content -Path $currentPath -Encoding UTF8
  $created += $currentPath
}

if ($created.Count -eq 0) {
  Write-Output "No files were created — the patch format may be different than expected."
} else {
  Write-Output "Created/overwrote files:"
  foreach ($c in $created) { Write-Output (" - " + $c) }
}