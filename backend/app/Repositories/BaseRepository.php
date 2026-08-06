<?php

namespace App\Repositories;

use Illuminate\Database\Eloquent\Model;

abstract class BaseRepository
{
    /**
     * @var Model
     */
    protected $model;

    /**
     * Get all records.
     */
    public function all()
    {
        return $this->model->all();
    }

    /**
     * Find a record by ID.
     */
    public function find($id)
    {
        return $this->model->find($id);
    }

    /**
     * Create a new record.
     */
    public function create(array $data)
    {
        return $this->model->create($data);
    }

    /**
     * Update an existing record.
     */
    public function update($id, array $data)
    {
        $record = $this->find($id);
        if ($record) {
            $record->update($data);
            return $record;
        }
        return null;
    }

    /**
     * Delete a record by ID.
     */
    public function delete($id)
    {
        return $this->model->destroy($id);
    }

    /**
     * Get query builder.
     */
    public function query()
    {
        return $this->model->newQuery();
    }
}
