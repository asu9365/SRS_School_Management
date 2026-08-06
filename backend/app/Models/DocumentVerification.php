<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DocumentVerification extends Model
{
    use HasFactory;

    protected $fillable = [
        'enquiry_id',
        'document_name',
        'verified_by',
        'is_valid',
    ];

    protected function casts(): array
    {
        return [
            'is_valid' => 'boolean',
        ];
    }

    public function enquiry()
    {
        return $this->belongsTo(AdmissionEnquiry::class, 'enquiry_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'verified_by');
    }
}
