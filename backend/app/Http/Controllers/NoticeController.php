<?php

namespace App\Http\Controllers;

use App\Services\CommunicationService;
use App\Repositories\NoticeRepository;
use Illuminate\Http\Request;

class NoticeController extends Controller
{
    protected $communicationService;
    protected $noticeRepository;

    public function __construct(CommunicationService $communicationService, NoticeRepository $noticeRepository)
    {
        $this->communicationService = $communicationService;
        $this->noticeRepository = $noticeRepository;
    }

    /**
     * Get notices with category, priority, and date checks.
     */
    public function index(Request $request)
    {
        $filters = $request->only(['category', 'priority']);
        $notices = $this->noticeRepository->getFilteredNotices($filters);

        return response()->json($notices);
    }

    /**
     * Create/Publish notice.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'category' => 'nullable|string',
            'priority' => 'nullable|in:low,medium,high,critical',
            'target_roles' => 'nullable|array',
            'publish_date' => 'nullable|date',
            'expiry_date' => 'nullable|date|after:publish_date',
            'file' => 'nullable|file|max:10240', // 10MB max
        ]);

        $data = $request->all();
        if ($request->hasFile('file')) {
            $data['attachment_path'] = $request->file('file')->store('notice-attachments', 'public');
        }

        $result = $this->communicationService->createNotice($data);

        return response()->json($result['data'], 201);
    }

    /**
     * View notice.
     */
    public function show($id)
    {
        $notice = $this->noticeRepository->find($id);
        if (!$notice) {
            return response()->json(['success' => false, 'message' => 'Notice not found.'], 404);
        }
        return response()->json($notice);
    }

    /**
     * Update notice.
     */
    public function update(Request $request, $id)
    {
        $notice = $this->noticeRepository->find($id);
        if (!$notice) {
            return response()->json(['success' => false, 'message' => 'Notice not found.'], 404);
        }

        $request->validate([
            'title' => 'sometimes|string|max:255',
            'content' => 'sometimes|string',
            'category' => 'nullable|string',
            'priority' => 'nullable|in:low,medium,high,critical',
            'target_roles' => 'nullable|array',
            'publish_date' => 'nullable|date',
            'expiry_date' => 'nullable|date|after:publish_date',
        ]);

        $notice->update($request->all());

        return response()->json($notice);
    }

    /**
     * Archive/Delete notice.
     */
    public function destroy($id)
    {
        $notice = $this->noticeRepository->find($id);
        if (!$notice) {
            return response()->json(['success' => false, 'message' => 'Notice not found.'], 404);
        }

        $notice->delete();

        return response()->json(null, 204);
    }
}
