cd installer-src
Get-ChildItem -Recurse -File -Include *.js,*.ts,*.svelte,*.json,*.html,*.md,*.css | ForEach-Object {
    $content = Get-Content $_.FullName -Raw -Encoding UTF8
    if ($content -match "Equicord|nightcord|Nightcord|NIGHTCORD") {
        $content = $content -replace "Equicord", "Saifcord"
        $content = $content -replace "equicord", "saifcord"
        $content = $content -replace "Nightcord", "Saifcord"
        $content = $content -replace "nightcord", "saifcord"
        $content = $content -replace "NIGHTCORD", "SAIFCORD"
        Set-Content $_.FullName -Value $content -Encoding UTF8 -NoNewline
        Write-Host "✅ Fixed: $($_.Name)"
    }
}
cd ..