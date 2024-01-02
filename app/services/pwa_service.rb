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
         "sha256_cert_fingerprints" => ["BD:93:B2:9C:E7:03:56:AD:8A:DC:72:D7:8C:47:0F:AD:A7:25:58:9F:F0:1D:43:FE:B4:EE:4A:E7:A0:ED:92:DA"] }
      }]
  end
end