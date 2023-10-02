Param(
	[Parameter(Mandatory = $false)]
	[string]$TargetRepo,
	[Parameter(Mandatory = $false)]
	[string]$TargetClientId,
	[Parameter(Mandatory = $false)]
	[string]$TargetClientSecret,
	[Parameter(Mandatory = $false)]
	[string]$SourcePath = "/Root",
	[Parameter(Mandatory = $false)]
	[string]$TargetPath = "/",
	[Parameter(Mandatory = $false)]
	[string]$PATFile = ".\secret-local.json",
	[Parameter(Mandatory = $false)]
	[string]$execFile = ".\tools\SnIO.exe",
	[Parameter(Mandatory = $false)] 
	[bool]$CtdOnly = $False,
	[Parameter(Mandatory = $false)]
	[bool]$PrepareTool = $False
)

# install snio tool
if ($PrepareTool -or -not (Test-Path $execFile -PathType Leaf)) {
    .\scripts\install-snio.ps1
}

# PATFile format
# {
# 	"repositorywriter": {
#		"url": "http://example.cloud",
# 		"authentication": {
# 			"clientid": "your_client_id_here",
# 			"clientsecret": "your_client_secret_here"
# 		}
# 	}
# }

if ($PATFile -and -not (Test-Path $PATFile -PathType Leaf)) {
	$PATFile = $null
}

# if PATFile is set, read json with client and secret from file
if ($PATFile) {
	Write-Output "Loading configuration from $PATFile..."
	$PAT = Get-Content $PATFile | ConvertFrom-Json

	if (-not $TargetRepo) { $TargetRepo = $PAT.repositorywriter.url	}
	if (-not $TargetClientId) {	$TargetClientId = $PAT.repositorywriter.authentication.clientid }
	if (-not $TargetClientSecret) { $TargetClientSecret = $PAT.repositorywriter.authentication.clientsecret }
} else {
	Write-Output "No config file provided."
}

# content structure
if ($SourcePath -like "/Root*") {
    $SourcePath = Join-Path "./package" $SourcePath
}

$RawPath = $SourcePath

if ($CtdOnly) {
	# currently CTDs can be loadon only from the local folder
	$RawPath = "./package/Root/System/Schema/ContentTypes"
	$TargetPath = "/Root/System/Schema"
}

$SourcePath = Resolve-Path -Path $RawPath

# .\tools\SnIO.exe IMPORT --DISPLAY:LEVEL Verbose `
# 	-SOURCE -PATH $SourcePath `
# 	-TARGET $TargetRepo -PATH $TargetPath -CLIENTID $TargetClientId -CLIENTSECRET $TargetClientSecret

$params = "IMPORT", "--DISPLAY:LEVEL", "Verbose", "eol",
	"-SOURCE", "-PATH", $SourcePath, "eol",
	"-TARGET", $TargetRepo, "-PATH", $TargetPath, "eol",
	"-CLIENTID", $TargetClientId, "-CLIENTSECRET", $TargetClientSecret

Write-Output "$execFile $($params -replace "eol", "$($eolChar)`r`n`t")"
& $execFile $($params | where-object {$_ -ne "eol"})
	