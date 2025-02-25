import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

// Attach Pusher to the window object (Laravel Echo requires this)
window.Pusher = Pusher;

const token = localStorage.getItem('token');
// Configure Laravel Echo with Pusher
const echo = new Echo({
  broadcaster: 'pusher',
  key: '4d66eb51d1471d2f42bb', 
  cluster: 'us2', 
  encrypted: true,
  authEndpoint: "http://127.0.0.1:8000/broadcasting/auth",
        auth: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
});

export default echo;
