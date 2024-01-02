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
      "start_url" => "/?source=pwa",
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
end