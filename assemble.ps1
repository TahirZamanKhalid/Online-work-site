# ==============================================================================
# Helper Script to Assemble parts/ into index.html
# Run this script anytime you edit any file in the parts/ directory.
# ==============================================================================

$headerPart   = Get-Content -Path "parts/header.html" -Raw
$heroPart     = Get-Content -Path "parts/hero.html" -Raw
$servicesPart = Get-Content -Path "parts/services.html" -Raw
$orderPart    = Get-Content -Path "parts/order.html" -Raw
$contactPart  = Get-Content -Path "parts/contact.html" -Raw
$footerPart   = Get-Content -Path "parts/footer.html" -Raw

$template = @"
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Premier Academic & Content Writing Services. Thesis, Dissertations, Essays, Assignments, SEO Blog Posts, and Editing by PhD Experts. 100% Original, AI-Free, and Turnitin Guaranteed.">
  <title>ThesisExperts360 | Premier Academic Writing & Blog Services</title>
  
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>

$headerPart

$heroPart

$servicesPart

$orderPart

$contactPart

$footerPart

  <script src="js/main.js"></script>
</body>
</html>
"@

Set-Content -Path "index.html" -Value $template -Encoding UTF8
Write-Host "Successfully compiled parts/ into index.html!" -ForegroundColor Green
