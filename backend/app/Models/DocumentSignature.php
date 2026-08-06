<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DocumentSignature extends Model
{
    use HasFactory;

    protected $fillable = [
        'document_id',
        'signed_by',
        'signed_at',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'signed_at' => 'datetime',
        ];
    }

    public function document()
    {
        return $this->belongsTo(Document::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'signed_by');
    }
}
