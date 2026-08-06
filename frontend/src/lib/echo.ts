import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

// @ts-ignore
window.Pusher = Pusher;

import api from './api';

export const echo = new Echo({
    broadcaster: 'reverb',
    key: import.meta.env.VITE_REVERB_APP_KEY ?? 'gofaf3akxhzqhhfdteg7',
    wsHost: import.meta.env.VITE_REVERB_HOST ?? 'localhost',
    wsPort: import.meta.env.VITE_REVERB_PORT ?? 8081,
    wssPort: import.meta.env.VITE_REVERB_PORT ?? 8081,
    forceTLS: (import.meta.env.VITE_REVERB_SCHEME ?? 'http') === 'https',
    enabledTransports: ['ws', 'wss'],
    authorizer: (channel: any, options: any) => {
        return {
            authorize: (socketId: any, callback: any) => {
                api.post('/broadcasting/auth', {
                    socket_id: socketId,
                    channel_name: channel.name
                })
                .then(response => {
                    callback(false, response.data);
                })
                .catch(error => {
                    callback(true, error);
                });
            }
        };
    },
});
