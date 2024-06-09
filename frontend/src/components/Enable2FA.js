import React, { useState } from 'react';
import axios from 'axios';

const Enable2FA = () => {
    const [qrCodeUrl, setQrCodeUrl] = useState(null);
    const [message, setMessage] = useState('');

    const enable2FA = async () => {
        try {
            const { data } = await axios.post('/api/2fa/enable', {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('userInfo')?.token}`,
                },
            });
            setQrCodeUrl(data.qrCodeUrl);
            setMessage('2FA enabled. Scan the QR code with your authenticator app.');
        } catch (error) {
            setMessage('Error enabling 2FA');
        }
    };

    return (
        <div className="enable-2fa">
            <h3>Enable Two-Factor Authentication (2FA)</h3>
            {message && <p>{message}</p>}
            {qrCodeUrl ? (
                <img src={qrCodeUrl} alt="QR Code" />
            ) : (
                <button onClick={enable2FA}>Enable 2FA</button>
            )}
        </div>
    );
};

export default Enable2FA;
