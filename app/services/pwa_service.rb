class PwaService
  def self.manifest
    {
      "short_name" => "Tone Garden",
      "name" => "Tone Garden: binaural beat maker",
      "display" => "standalone",
      "icons" => [
        {
          "src" => "/logo_white.svg",
          "type" => "image/svg+xml",
          "sizes" => "48x48 72x72 96x96 128x128 256x256",
          "purpose" => "any"
        },
      ],
      "start_url" => "/",
      "background_color" => "#8126FF",
      "display" => "standalone",
      "scope" => "/",
      "theme_color" => "#2605FF",
      "description" => "",
      "screenshots" => [
        {
          "src" => "/images/screenshot1.png",
          "type" => "image/png",
          "sizes" => "540x720"
        },
        {
          "src" => "/splash_screen_list.png",
          "type" => "image/png",
          "sizes" => "1881x921"
        }
      ]
    }
  end

  def self.assetlinks
      [{
         "relation" => ["delegate_permission/common.handle_all_urls"],
         "target" => { "namespace": "android_app", "package_name": "com.tonegarden",
         "sha256_cert_fingerprints" => [
           "81:8F:9E:69:9E:B5:37:C5:F1:32:A1:B2:A8:90:EA:BA:31:85:E2:16:04:58:0A:71:26:2F:68:7B:2C:67:69:2F",
         ] }

      }]
  end
end