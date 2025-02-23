<?php
$songsDir = "songs/";
$songs = [];

if (is_dir($songsDir)) {
    $files = scandir($songsDir);
    foreach ($files as $file) {
        if (pathinfo($file, PATHINFO_EXTENSION) == "mp3") {
            $songs[] = [
                "title" => pathinfo($file, PATHINFO_FILENAME),
                "src" => $songsDir . $file
            ];
        }
    }
}

header('Content-Type: application/json');
echo json_encode($songs);
?>