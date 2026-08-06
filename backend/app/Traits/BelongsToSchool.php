<?php

namespace App\Traits;

use App\Models\School;
use Illuminate\Database\Eloquent\Builder;

trait BelongsToSchool
{
    protected static function bootBelongsToSchool()
    {
        static::addGlobalScope('school', function (Builder $builder) {
            if (app()->has('current_school_id')) {
                $schoolId = app('current_school_id');
                if ($schoolId) {
                    $builder->where($builder->getModel()->getTable() . '.school_id', $schoolId);
                }
            }
        });

        static::creating(function ($model) {
            if (app()->has('current_school_id')) {
                $schoolId = app('current_school_id');
                if ($schoolId && !$model->school_id) {
                    $model->school_id = $schoolId;
                }
            }
        });
    }

    public function school()
    {
        return $this->belongsTo(School::class);
    }
}
