<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Theme;

class ThemeSeeder extends Seeder
{
    public function run(): void
    {
        $themes = [
            [
                'name' => 'Clair',
                'colors' => [
                    "bg" => "#ffffff",
                    "bg_secondary" => "#f3f6fb",
                    "text" => "#1e293b",
                    "text_muted" => "#64748b",
                    "accent" => "#7c3aed",
                ],
                'active' => true,
            ],
            [
                'name' => 'Sombre',
                'colors' => [
                    "bg" => "#1f1f2f",
                    "bg_secondary" => "#2a2a3f",
                    "text" => "#f9f9f9",
                    "text_muted" => "#9ca3af",
                    "accent" => "#7c3aed",
                ],
                'active' => false,
            ],
            [
                'name' => 'Vert',
                'colors' => [
                    "bg" => "#ecfdf5",
                    "bg_secondary" => "#d1fae5",
                    "text" => "#065f46",
                    "text_muted" => "#10b981",
                    "accent" => "#059669",
                ],
                'active' => false,
            ],
            [
                'name' => 'Chaud',
                'colors' => [
                    "bg" => "#fff7ed",
                    "bg_secondary" => "#ffedd5",
                    "text" => "#7c2d12",
                    "text_muted" => "#9a3412",
                    "accent" => "#f97316",
                ],
                'active' => false,
            ],
            [
                'name' => 'Lavande',
                'colors' => [
                    "bg" => "#f4f0fc",
                    "bg_secondary" => "#e2d6f8",
                    "text" => "#4b0082",
                    "text_muted" => "#8661b0",
                    "accent" => "#7c3aed",
                ],
                'active' => false,
            ],
            [
                'name' => 'Fuchsia',
                'colors' => [
                    "bg" => "#fff0f6",
                    "bg_secondary" => "#ffd6e8",
                    "text" => "#9d174d",
                    "text_muted" => "#d46c91",
                    "accent" => "#ec4899",
                ],
                'active' => false,
            ],
        ];

        foreach ($themes as $theme) {
            Theme::create($theme);
        }
    }
}
