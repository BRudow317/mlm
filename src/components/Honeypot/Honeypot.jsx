import React from 'react';

export { Honeypot, useHoneypot };

/**
 * Custom hook for honeypot bot detection
 * @param {function} onBotDetected - Optional callback when bot is detected
 * @returns {object} { honeypotValue, handleHoneypotChange, isBotDetected }
 */
function useHoneypot(onBotDetected) {
    const [honeypotValue, setHoneypotValue] = React.useState("");
    const [isBotDetected, setIsBotDetected] = React.useState(false);

    const handleHoneypotChange = React.useCallback((e) => {
        const value = e.target.value;
        setHoneypotValue(value);

        // If any value is entered, it's a bot
        if (value.trim() !== "") {
            setIsBotDetected(true);
            if (onBotDetected) {
                onBotDetected(value);
            }
        } else {
            setIsBotDetected(false);
        }
    }, [onBotDetected]);

    return {
        honeypotValue,
        handleHoneypotChange,
        isBotDetected,
    };
}

/**
 * Honeypot component - invisible field that should remain empty for legitimate users
 * Bots will often auto-fill this field, allowing us to detect and block them
 *
 * @param {string} value - Controlled value from parent (optional, for controlled mode)
 * @param {function} onChange - Change handler from parent (optional, for controlled mode)
 * @param {string} fieldName - Name attribute for the field (default: "website")
 */
function Honeypot({ value, onChange, fieldName = "website" }) {
    return (
        <input
            type="text"
            name={fieldName}
            value={value || ""}
            onChange={onChange}
            style={{
                position: 'absolute',
                left: '-9999px',
                width: '1px',
                height: '1px',
                opacity: 0,
                pointerEvents: 'none',
            }}
            tabIndex="-1"
            autoComplete="off"
            aria-hidden="true"
        />
    );
}