Add-Type -AssemblyName System.Drawing
$bitmap = [System.Drawing.Bitmap]::new(1200, 630)
$graphics = [System.Drawing.Graphics]::FromImage($bitmap)
$graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$graphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
$graphics.Clear([System.Drawing.ColorTranslator]::FromHtml('#F6E9DA'))
$navy = [System.Drawing.SolidBrush]::new([System.Drawing.ColorTranslator]::FromHtml('#004156'))
$orange = [System.Drawing.SolidBrush]::new([System.Drawing.ColorTranslator]::FromHtml('#FF5739'))
$brandFont = [System.Drawing.Font]::new('Segoe UI', 23, [System.Drawing.FontStyle]::Bold)
$headingFont = [System.Drawing.Font]::new('Segoe UI', 60, [System.Drawing.FontStyle]::Bold)
$detailFont = [System.Drawing.Font]::new('Segoe UI', 24)
$graphics.FillRectangle($orange, 72, 66, 12, 34)
$graphics.DrawString('LATAM LEAP', $brandFont, $navy, 102, 62)
$graphics.DrawString('Tu negocio está para más.', $headingFont, $navy, [System.Drawing.RectangleF]::new(65, 175, 1070, 210))
$graphics.DrawString('Da el salto.', $headingFont, $orange, 65, 335)
$graphics.DrawString('Webs, tiendas y soluciones a medida.', $detailFont, $navy, 72, 477)
$graphics.DrawString('latamleap.com  |  Argentina', $detailFont, $navy, 72, 538)
$bitmap.Save((Join-Path (Get-Location) 'public/og-latamleap.png'), [System.Drawing.Imaging.ImageFormat]::Png)
$detailFont.Dispose(); $headingFont.Dispose(); $brandFont.Dispose(); $orange.Dispose(); $navy.Dispose(); $graphics.Dispose(); $bitmap.Dispose()
