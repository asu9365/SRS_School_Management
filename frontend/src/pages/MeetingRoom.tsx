import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { echo } from '../lib/echo';
import { Video, Mic, MicOff, VideoOff, PhoneOff, User } from 'lucide-react';
import { useAuthStore } from '../lib/authStore';
import MeetingNotesPanel from '../components/MeetingNotesPanel';
import api from '../lib/api';

export default function MeetingRoom() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuthStore();
    
    const localVideoRef = useRef<HTMLVideoElement>(null);
    const remoteVideoRef = useRef<HTMLVideoElement>(null);
    
    const [localStream, setLocalStream] = useState<MediaStream | null>(null);
    const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
    const peerConnection = useRef<RTCPeerConnection | null>(null);
    
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoOff, setIsVideoOff] = useState(false);
    const [participants, setParticipants] = useState<any[]>([]);
    
    const isTeacher = user?.roles?.some((r: any) => r.name === 'Teacher' || r.name === 'Admin' || r.name === 'Principal');

    useEffect(() => {
        if (!user || !id) return;
        
        const initWebRTC = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                setLocalStream(stream);
                if (localVideoRef.current) {
                    localVideoRef.current.srcObject = stream;
                }
                
                setupPeerConnection(stream);
                joinMeetingChannel();
            } catch (error) {
                console.error("Error accessing media devices.", error);
                alert("Failed to access camera and microphone.");
            }
        };

        initWebRTC();

        return () => {
            localStream?.getTracks().forEach(track => track.stop());
            peerConnection.current?.close();
            echo.leave(`meeting.${id}`);
        };
    }, [id, user]);

    const setupPeerConnection = (stream: MediaStream) => {
        const pc = new RTCPeerConnection({
            iceServers: [
                { urls: 'stun:stun.l.google.com:19302' },
                { urls: 'stun:stun1.l.google.com:19302' },
            ]
        });

        stream.getTracks().forEach(track => {
            pc.addTrack(track, stream);
        });

        pc.ontrack = (event) => {
            setRemoteStream(event.streams[0]);
            if (remoteVideoRef.current) {
                remoteVideoRef.current.srcObject = event.streams[0];
            }
        };

        pc.onicecandidate = (event) => {
            if (event.candidate) {
                sendSignal({ type: 'ice-candidate', candidate: event.candidate });
            }
        };

        peerConnection.current = pc;
    };

    const joinMeetingChannel = () => {
        echo.join(`meeting.${id}`)
            .here((users: any[]) => {
                setParticipants(users);
                // If there are other users already in the room, initiate call
                if (users.length > 1) {
                    initiateCall();
                }
            })
            .joining((newUser: any) => {
                setParticipants(prev => [...prev, newUser]);
                // We let the newly joined user initiate the call, or we can do it
            })
            .leaving((leftUser: any) => {
                setParticipants(prev => prev.filter(p => p.id !== leftUser.id));
            })
            .listen('.WebRTCSignal', async (event: any) => {
                const signal = event.payload;
                if (!peerConnection.current) return;
                
                // Ignore our own signals if they somehow echo back (they shouldn't via PresenceChannel, but just in case)
                if (signal.senderId === user?.id) return;
                
                try {
                    if (signal.type === 'offer') {
                        await peerConnection.current.setRemoteDescription(new RTCSessionDescription(signal.offer));
                        const answer = await peerConnection.current.createAnswer();
                        await peerConnection.current.setLocalDescription(answer);
                        sendSignal({ type: 'answer', answer });
                    } else if (signal.type === 'answer') {
                        await peerConnection.current.setRemoteDescription(new RTCSessionDescription(signal.answer));
                    } else if (signal.type === 'ice-candidate') {
                        await peerConnection.current.addIceCandidate(new RTCIceCandidate(signal.candidate));
                    }
                } catch (e) {
                    console.error("Error handling WebRTC signal", e);
                }
            });
    };

    const initiateCall = async () => {
        if (!peerConnection.current) return;
        try {
            const offer = await peerConnection.current.createOffer();
            await peerConnection.current.setLocalDescription(offer);
            sendSignal({ type: 'offer', offer });
        } catch (e) {
            console.error("Error creating offer", e);
        }
    };

    const sendSignal = async (payload: any) => {
        try {
            await api.post(`/appointments/${id}/signal`, {
                payload: {
                    ...payload,
                    senderId: user?.id
                }
            });
        } catch (e) {
            console.error("Error sending signal", e);
        }
    };

    const toggleMute = () => {
        if (localStream) {
            localStream.getAudioTracks()[0].enabled = isMuted;
            setIsMuted(!isMuted);
        }
    };

    const toggleVideo = () => {
        if (localStream) {
            localStream.getVideoTracks()[0].enabled = isVideoOff;
            setIsVideoOff(!isVideoOff);
        }
    };

    const endCall = () => {
        navigate('/dashboard');
    };

    return (
        <div className="min-h-[calc(100vh-64px)] bg-gray-950 text-white flex flex-col md:flex-row">
            {/* Main Video Area */}
            <div className="flex-1 p-4 flex flex-col relative">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold font-outfit">Virtual PTM</h1>
                    <div className="flex items-center gap-2 bg-gray-800 px-3 py-1 rounded-full">
                        <User size={16} />
                        <span className="text-sm">{participants.length} Participant(s)</span>
                    </div>
                </div>
                
                <div className="flex-1 relative bg-gray-900 rounded-xl overflow-hidden border border-gray-800 flex items-center justify-center min-h-[400px]">
                    {/* Remote Video (Main) */}
                    {remoteStream ? (
                        <video 
                            ref={remoteVideoRef} 
                            autoPlay 
                            playsInline 
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="text-gray-500 text-center">
                            <User size={64} className="mx-auto mb-4 opacity-50" />
                            <p>Waiting for others to join...</p>
                        </div>
                    )}
                    
                    {/* Local Video (PiP) */}
                    <div className="absolute bottom-4 right-4 w-32 md:w-48 aspect-video bg-gray-800 rounded-lg overflow-hidden border-2 border-gray-700 shadow-xl">
                        <video 
                            ref={localVideoRef} 
                            autoPlay 
                            playsInline 
                            muted 
                            className="w-full h-full object-cover transform -scale-x-100"
                        />
                        {(isVideoOff || isMuted) && (
                            <div className="absolute top-2 left-2 flex gap-1">
                                {isMuted && <div className="bg-red-500 p-1 rounded-full"><MicOff size={10} className="text-white" /></div>}
                                {isVideoOff && <div className="bg-red-500 p-1 rounded-full"><VideoOff size={10} className="text-white" /></div>}
                            </div>
                        )}
                    </div>
                </div>
                
                {/* Controls */}
                <div className="h-20 mt-4 flex items-center justify-center gap-4 bg-gray-900 rounded-xl border border-gray-800">
                    <button 
                        onClick={toggleMute}
                        className={`p-4 rounded-full ${isMuted ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-700 hover:bg-gray-600'} transition`}
                    >
                        {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
                    </button>
                    <button 
                        onClick={toggleVideo}
                        className={`p-4 rounded-full ${isVideoOff ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-700 hover:bg-gray-600'} transition`}
                    >
                        {isVideoOff ? <VideoOff size={24} /> : <Video size={24} />}
                    </button>
                    <button 
                        onClick={endCall}
                        className="p-4 rounded-full bg-red-600 hover:bg-red-700 transition px-8 flex items-center gap-2 font-bold"
                    >
                        <PhoneOff size={20} />
                        <span className="hidden sm:inline">End Call</span>
                    </button>
                </div>
            </div>

            {/* Right Sidebar for Notes (Only for Teachers) */}
            {isTeacher && (
                <div className="w-full md:w-96 border-t md:border-t-0 md:border-l border-gray-800 bg-gray-900 flex flex-col max-h-[500px] md:max-h-none overflow-y-auto">
                    <MeetingNotesPanel appointmentId={id as string} />
                </div>
            )}
        </div>
    );
}
