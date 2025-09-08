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
                    "bg-secondary" => "#f3f6fb",
                    "text" => "#1e293b",
                    "text-muted" => "#64748b",
                    "accent" => "#7c3aed",
                ],
                'active' => true,
            ],
            [
                'name' => 'Sombre',
                'colors' => [
                    "bg" => "#1f1f2f",
                    "bg-secondary" => "#2a2a3f",
                    "text" => "#f9f9f9",
                    "text-muted" => "#9ca3af",
                    "accent" => "#7c3aed",
                ],
                'active' => false,
            ],
            [
                'name' => 'Vert',
                'colors' => [
                    "bg" => "#ecfdf5",
                    "bg-secondary" => "#d1fae5",
                    "text" => "#065f46",
                    "text-muted" => "#10b981",
                    "accent" => "#34d399",
                ],
                'active' => false,
            ],
            [
                'name' => 'Chaud',
                'colors' => [
                    "bg" => "#fff7ed",
                    "bg-secondary" => "#ffedd5",
                    "text" => "#7c2d12",
                    "text-muted" => "#9a3412",
                    "accent" => "#f97316",
                ],
                'active' => false,
            ],
        ];

        foreach ($themes as $theme) {
            Theme::create($theme);
        }
    }
}
