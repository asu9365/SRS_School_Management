<?php

$models = [
    'User', 'Student', 'Teacher', 'Appointment', 
    'Attendance', 'Assessment', 'Mark', 'Notice', 
    'Update', 'Homework', 'Message', 'Notification'
];

foreach ($models as $model) {
    $path = __DIR__ . '/app/Models/' . $model . '.php';
    if (!file_exists($path)) continue;

    $content = file_get_contents($path);

    // If already has trait, skip
    if (strpos($content, 'use BelongsToSchool;') !== false) {
        continue;
    }

    // Add use App\Traits\BelongsToSchool;
    if (strpos($content, 'use App\Traits\BelongsToSchool;') === false) {
        // Insert after namespace or other uses
        $content = preg_replace('/namespace App\\\\Models;/', "namespace App\\Models;\n\nuse App\\Traits\\BelongsToSchool;", $content);
    }

    // Add use BelongsToSchool; inside the class
    $content = preg_replace('/class '.$model.'( extends [a-zA-Z0-9_\\\\]+)?( implements [a-zA-Z0-9_\\\, ]+)?\s*\{/', "$0\n    use BelongsToSchool;\n", $content);

    file_put_contents($path, $content);
    echo "Updated $model\n";
}
