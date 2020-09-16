<?php


namespace Tests\Feature;


use Illuminate\Http\UploadedFile;
use Tests\TestCase;

class UploadFileTest extends TestCase
{
    public function testBasic()
    {
        $path = storage_path('testdata/shorter.geojson');
        $contents = file_get_contents($path);
        $file = UploadedFile::fake() -> createWithContent('file.geojson', $contents);

        $response = $this->post('/api/upload_file', ['json' => $file]);

        $response->assertStatus(200);
        $response -> assertHeader('content-type', 'application/json');
    }
}
