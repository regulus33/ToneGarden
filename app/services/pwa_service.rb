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
         "sha256_cert_fingerprints" => ["93:33:7D:0F:F2:55:E1:08:EC:52:9D:D9:FB:81:6C:B8:63:EE:2E:AD:9E:04:A7:82:37:E2:8E:9A:5A:75:06:B7"] }
      }]
  end
end