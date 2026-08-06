<?php

namespace App\Services;

use App\Repositories\ClassRoomRepository;

class ClassService
{
    protected $classRoomRepository;

    public function __construct(ClassRoomRepository $classRoomRepository)
    {
        $this->classRoomRepository = $classRoomRepository;
    }

    public function listClasses()
    {
        return $this->classRoomRepository->getClassesWithSections();
    }

    public function createClass(array $data)
    {
        $classRoom = $this->classRoomRepository->create($data);

        // Add sections if provided
        if (!empty($data['sections'])) {
            foreach ($data['sections'] as $sectionData) {
                $classRoom->sections()->create([
                    'name' => $sectionData['name'],
                    'capacity' => $sectionData['capacity'] ?? 40,
                ]);
            }
        }

        return $classRoom->load('sections');
    }

    public function updateClass($id, array $data)
    {
        $classRoom = $this->classRoomRepository->update($id, $data);
        return $classRoom ? $classRoom->load('sections') : null;
    }

    public function deleteClass($id)
    {
        return $this->classRoomRepository->delete($id);
    }

    // --- Section Management ---

    public function addSection($classRoomId, array $data)
    {
        $classRoom = $this->classRoomRepository->find($classRoomId);
        if (!$classRoom) return null;

        return $classRoom->sections()->create([
            'name' => $data['name'],
            'capacity' => $data['capacity'] ?? 40,
        ]);
    }

    public function updateSection($sectionId, array $data)
    {
        $section = \App\Models\Section::find($sectionId);
        if ($section) {
            $section->update($data);
            return $section;
        }
        return null;
    }

    public function deleteSection($sectionId)
    {
        $section = \App\Models\Section::find($sectionId);
        return $section ? $section->delete() : false;
    }
}
